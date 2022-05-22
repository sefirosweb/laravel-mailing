<?php

namespace Sefirosweb\LaravelMailing\Http\Helpers;

use Sefirosweb\LaravelMailing\Http\Models\MailingList as ModelsMailingList;

class MailingList
{
    public static function get($code)
    {
        if (config('app.env') !== 'production') {
            $to = config('laravel-mailing.stage_to');
            return [$to];
        }

        if (!$mailingList = ModelsMailingList::with('users:email', 'groups:to')->where('code', $code)->get()->first()) {
            return [];
        }

        $mailingList = $mailingList->toArray();
        $users = array_column($mailingList['users'], 'email');
        $groups = array_column($mailingList['groups'], 'to');

        $emailList = array_unique(array_merge($users, $groups));

        return $emailList;
    }
}
