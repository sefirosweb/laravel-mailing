<?php

declare(strict_types=1);

// Test fixture: minimal App\Models\User stub for Testbench.
// The package's MailingList->users() belongsToMany points at App\Models\User
// which is provided by the host Laravel app in production, but not by
// Testbench's default skeleton.
namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    protected $guarded = [];

    protected $table = 'users';
}
