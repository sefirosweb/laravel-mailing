<?php

use Illuminate\Support\Facades\Route;

Route::group([
    'namespace' => 'Sefirosweb\LaravelMailing\Http\Controllers'
], function () {
    // CRUD
    Route::get('mailing_list', 'MailingListController@get');
    Route::post('mailing_list', 'MailingListController@store');
    Route::put('mailing_list', 'MailingListController@update');
    Route::delete('mailing_list', 'MailingListController@destroy');

    Route::get('mailing_list/users', 'MailingListController@get_users');
    Route::post('mailing_list/users', 'MailingListController@add_user');
    Route::delete('mailing_list/users', 'MailingListController@delete_user');
    Route::get('mailing_list/users/get_array', 'MailingListController@get_array_users');

    Route::get('mailing_group', 'MailingGroupController@get');
    Route::post('mailing_group', 'MailingGroupController@store');
    Route::put('mailing_group', 'MailingGroupController@update');
    Route::delete('mailing_group', 'MailingGroupController@destroy');

    Route::get('/', function () {
        return view('mailgroup::index');
    });

    Route::get('{any}', function () {
        return view('mailgroup::index');
    })->where('any', '.*');
});
