<?php

declare(strict_types=1);

namespace Sefirosweb\LaravelMailing\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Sefirosweb\LaravelMailing\Http\Models\MailingGroup;
use Sefirosweb\LaravelMailing\Http\Models\MailingList;
use Sefirosweb\LaravelMailing\Http\Requests\MailingListRequest;

class MailingListController extends Controller
{
    /**
     * List mailing lists, with eager-loaded counts to avoid N+1
     * when the bundled UI renders the per-row badges.
     */
    public function get(Request $request)
    {
        $query = MailingList::query()->withCount(['users', 'groups']);

        if ($request->status === 'all') {
            $query->withTrashed();
        } else if ($request->status === 'deleted') {
            $query->onlyTrashed();
        }

        $data = $query->get();

        return response()->json(['success' => true, 'data' => $data]);
    }

    public function store(MailingListRequest $request)
    {
        MailingList::create($request->all());
        return response()->json(['success' => true]);
    }

    public function update(MailingListRequest $request)
    {
        $mailingList = MailingList::withTrashed()->findOrFail($request->mailing_lists_id);
        $mailingList->update($request->all());
        return response()->json(['success' => true]);
    }

    /**
     * Toggle soft-delete / restore for the requested mailing list.
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
     * Resolve the configured User model class. Falls back to
     * App\Models\User so existing hosts keep working without
     * publishing the config.
     */
    protected function userModel(): string
    {
        return config('laravel-mailing.User', \App\Models\User::class);
    }

    public function get_array_users()
    {
        $UserClass = $this->userModel();
        $users = $UserClass::query()
            ->select('id', 'name')
            ->selectRaw('id AS value')
            ->get();

        return response()->json(['data' => $users]);
    }

    public function get_users(Request $request)
    {
        $mailingList = MailingList::with('users:id,name,email')->findOrFail($request->mailing_lists_id);
        return response()->json(['success' => true, 'data' => $mailingList->users]);
    }

    public function add_user(Request $request)
    {
        $mailingList = MailingList::findOrFail($request->mailing_lists_id);
        $mailingList->users()->syncWithoutDetaching($request->user_id);
        return response()->json(['success' => true]);
    }

    public function delete_user(Request $request)
    {
        $mailingList = MailingList::findOrFail($request->mailing_lists_id);
        $mailingList->users()->detach($request->user_id);
        return response()->json(['success' => true]);
    }

    public function get_array_groups()
    {
        $groups = MailingGroup::select([
            'id',
            'id AS value',
            'name AS name',
            'to',
        ])->get();

        return response()->json(['data' => $groups]);
    }

    public function get_groups(Request $request)
    {
        $mailingList = MailingList::with('groups:id,name,to')->findOrFail($request->mailing_lists_id);
        return response()->json(['success' => true, 'data' => $mailingList->groups]);
    }

    public function add_group(Request $request)
    {
        $mailingList = MailingList::findOrFail($request->mailing_lists_id);
        $mailingList->groups()->syncWithoutDetaching($request->mailing_groups_id);
        return response()->json(['success' => true]);
    }

    public function delete_group(Request $request)
    {
        $mailingList = MailingList::findOrFail($request->mailing_lists_id);
        $mailingList->groups()->detach($request->mailing_groups_id);
        return response()->json(['success' => true]);
    }
}
