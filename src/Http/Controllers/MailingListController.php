<?php

namespace Sefirosweb\LaravelMailing\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Sefirosweb\LaravelMailing\Http\Models\MailingGroup;
use Sefirosweb\LaravelMailing\Http\Models\MailingList;
use Sefirosweb\LaravelMailing\Http\Requests\MailingListRequest;

class MailingListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function get(Request $request)
    {
        $query = MailingList::query();

        if ($request->status === 'all') {
            $query->withTrashed();
        } else  if ($request->status === 'deleted') {
            $query->onlyTrashed();
        }

        $data = $query->get();

        return response()->json(['success' => true, 'data' => $data]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Sefirosweb\LaravelMailing\Http\Requests\MailingListRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(MailingListRequest $request)
    {
        MailingList::create($request->all());
        return response()->json(['success' => true]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Sefirosweb\LaravelMailing\Http\Requests\MailingListRequest $request
     * @return \Illuminate\Http\Response
     */
    public function update(MailingListRequest $request)
    {
        $accessList = MailingList::withTrashed()->findOrFail($request->mailing_lists_id);
        $accessList->update($request->all());
        return response()->json(['success' => true]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $mailingList = MailingList::withTrashed()->findOrFail($request->mailing_lists_id);
        if (!$mailingList->deleted_at) {
            $mailingList->delete();
        } else {
            $mailingList->restore();
        }
        return response()->json(['success' => true]);
    }

    /**
     * Get list of users in array
     *
     * @return \Illuminate\Http\Response
     */
    public function get_array_users()
    {
        $users = User::select([
            'id',
            'id AS value',
            'name AS name',
        ])->get();
        return response()->json(['data' => $users]);
    }

    /**
     * Get list of users of current Mailing List
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function get_users(Request $request)
    {
        $mailingList = MailingList::with('users:id,name,email')->findOrFail($request->mailing_lists_id);
        return response()->json(['success' => true, 'data' => $mailingList->users]);
    }

    /**
     * Add user into Mailing List
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function add_user(Request $request)
    {
        $mailingList = MailingList::findOrFail($request->mailing_lists_id);
        $mailingList->users()->syncWithoutDetaching($request->user_id);
        return response()->json(['success' => true]);
    }

    /**
     * Remove use of Mailing List
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function delete_user(Request $request)
    {
        $mailingList = MailingList::findOrFail($request->mailing_lists_id);
        $mailingList->users()->detach($request->user_id);
        return response()->json(['success' => true]);
    }

    /**
     * Get list of groups in array
     *
     * @return \Illuminate\Http\Response
     */
    public function get_array_groups()
    {
        $users = MailingGroup::select([
            'id',
            'id AS value',
            'name AS name',
        ])->get();
        return response()->json(['data' => $users]);
    }

    /**
     * Get groups of Mailing List
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function get_groups(Request $request)
    {
        $mailingList = MailingList::with('groups:id,name,to')->findOrFail($request->mailing_lists_id);
        return response()->json(['success' => true, 'data' => $mailingList->groups]);
    }

    /**
     * Add group into Mailing List
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function add_group(Request $request)
    {
        $mailingList = MailingList::findOrFail($request->mailing_lists_id);
        $mailingList->groups()->syncWithoutDetaching($request->mailing_groups_id);
        return response()->json(['success' => true]);
    }

    /**
     * Remove group of Mailing List
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function delete_group(Request $request)
    {
        $mailingList = MailingList::findOrFail($request->mailing_lists_id);
        $mailingList->groups()->detach($request->mailing_groups_id);
        return response()->json(['success' => true]);
    }
}
