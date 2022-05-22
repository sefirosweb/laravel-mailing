<?php

namespace Sefirosweb\LaravelMailing\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Sefirosweb\LaravelMailing\Http\Models\MailingGroup;
use Sefirosweb\LaravelMailing\Http\Requests\MailingGroupRequest;

class MailingGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function get()
    {
        return response()->json(['success' => true, 'data' => MailingGroup::all()]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\MailingGroupRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(MailingGroupRequest $request)
    {
        MailingGroup::create($request->all());
        return response()->json(['success' => true]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\MailingGroupRequest $request
     * @param  Sefirosweb\LaravelMailing\Http\Models\AccessList $accessList
     * @return \Illuminate\Http\Response
     */
    public function update(MailingGroupRequest $request, MailingGroup $mailingList)
    {
        $accessList = MailingGroup::findOrFail($request->id);
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
        $mailingList = MailingGroup::findOrFail($request->id);
        $mailingList->delete();
        return response()->json(['success' => true]);
    }
}
