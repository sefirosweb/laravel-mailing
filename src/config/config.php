<?php

declare(strict_types=1);

return [
    'prefix' => 'mailgroups',
    'middleware' => 'web',
    'stage_to' => env('MAIL_LIST_STAGE_TO', 'Create "MAIL_LIST_STAGE_TO" in .env with default mail'),

    /*
     * The Eloquent model used for the user side of the
     * mailing_list <-> user pivot. Override in the host's
     * config/laravel-mailing.php to swap out App\Models\User.
     */
    'User' => \App\Models\User::class,
];
