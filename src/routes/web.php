<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Sefirosweb\LaravelMailing\Http\Controllers\MailingGroupController;
use Sefirosweb\LaravelMailing\Http\Controllers\MailingListController;

// CRUD
Route::get('mailing_list', [MailingListController::class, 'get']);
Route::post('mailing_list', [MailingListController::class, 'store']);
Route::put('mailing_list', [MailingListController::class, 'update']);
Route::delete('mailing_list', [MailingListController::class, 'destroy']);

Route::get('mailing_list/users', [MailingListController::class, 'get_users']);
Route::post('mailing_list/users', [MailingListController::class, 'add_user']);
Route::delete('mailing_list/users', [MailingListController::class, 'delete_user']);
Route::get('mailing_list/users/get_array', [MailingListController::class, 'get_array_users']);

Route::get('mailing_list/groups', [MailingListController::class, 'get_groups']);
Route::post('mailing_list/groups', [MailingListController::class, 'add_group']);
Route::delete('mailing_list/groups', [MailingListController::class, 'delete_group']);
Route::get('mailing_list/groups/get_array', [MailingListController::class, 'get_array_groups']);

Route::get('mailing_group', [MailingGroupController::class, 'get']);
Route::post('mailing_group', [MailingGroupController::class, 'store']);
Route::put('mailing_group', [MailingGroupController::class, 'update']);
Route::delete('mailing_group', [MailingGroupController::class, 'destroy']);

Route::get('/', function () {
    return view('mailgroup::index');
});

Route::get('{any}', function () {
    return view('mailgroup::index');
})->where('any', '.*');
