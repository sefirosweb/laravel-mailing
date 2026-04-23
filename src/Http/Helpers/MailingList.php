<?php

declare(strict_types=1);

namespace Sefirosweb\LaravelMailing\Http\Helpers;

use Sefirosweb\LaravelMailing\Http\Models\MailingList as ModelsMailingList;

class MailingList
{
    /**
     * @return list<string>
     */
    public static function get(string $code): array
    {
        if (config('app.env') !== 'production') {
            $to = config('laravel-mailing.stage_to');
            return [$to];
        }

        $mailingList = ModelsMailingList::with('users:email', 'groups:to')
            ->where('code', $code)
            ->first();

        if ($mailingList === null) {
            return [];
        }

        $mailingList = $mailingList->toArray();
        $users = array_column($mailingList['users'], 'email');
        $groups = array_column($mailingList['groups'], 'to');

        return array_values(array_unique(array_merge($users, $groups)));
    }
}
