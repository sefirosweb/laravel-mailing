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
     * @return \Illuminate\Http\Response
     */
    public function get()
    {
        return response()->json(['success' => true, 'data' => MailingList::all()]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\MailingListRequest $request
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
     * @param  \Illuminate\Http\MailingListRequest $request
     * @param  Sefirosweb\LaravelMailing\Http\Models\AccessList $accessList
     * @return \Illuminate\Http\Response
     */
    public function update(MailingListRequest $request, MailingList $mailingList)
    {
        $accessList = MailingList::findOrFail($request->id);
        $accessList->update($request->all());
        return response()->json(['success' => true]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Sefirosweb\LaravelMailing\Http\Models\AccessList $accessList
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $mailingList = MailingList::findOrFail($request->id);
        $mailingList->delete();
        return response()->json(['success' => true]);
    }

    // CRUD relationship with users
    public function get_array_users()
    {
        $users = User::select([
            'id AS value',
            'name AS name',
        ])->get();
        return response()->json(['data' => $users]);
    }

    public function get_users(Request $request)
    {
        $mailingList = MailingList::with('users:id,name,email')->findOrFail($request->primaryKeyId);
        return response()->json(['success' => true, 'data' => $mailingList->users]);
    }

    public function add_user(Request $request)
    {
        $mailingList = MailingList::findOrFail($request->primaryKeyId);
        $mailingList->users()->syncWithoutDetaching($request->name['value']);
        return response()->json(['success' => true]);
    }

    public function delete_user(Request $request)
    {
        $mailingList = MailingList::findOrFail($request->primaryKeyId);
        $mailingList->users()->detach($request->idDataField);
        return response()->json(['success' => true]);
    }

    // CRUD relationship with groups
    public function get_array_groups()
    {
        $users = MailingGroup::select([
            'id AS value',
            'name AS name',
        ])->get();
        return response()->json(['data' => $users]);
    }

    public function get_groups(Request $request)
    {
        $mailingList = MailingList::with('groups:id,name,to')->findOrFail($request->primaryKeyId);
        return response()->json(['success' => true, 'data' => $mailingList->groups]);
    }

    public function add_group(Request $request)
    {
        $mailingList = MailingList::findOrFail($request->primaryKeyId);
        $mailingList->groups()->syncWithoutDetaching($request->name);
        return response()->json(['success' => true]);
    }

    public function delete_group(Request $request)
    {
        $mailingList = MailingList::findOrFail($request->primaryKeyId);
        $mailingList->groups()->detach($request->id);
        return response()->json(['success' => true]);
    }
}
