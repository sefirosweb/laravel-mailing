<?php

declare(strict_types=1);

namespace Sefirosweb\LaravelMailing\Http\Models;

use DateTime;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class MailingList extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'code',
        'description',
    ];

    public function users(): BelongsToMany
    {
        // Resolve the User class from config so hosts can swap out
        // App\Models\User without forking the package.
        $UserClass = config('laravel-mailing.User', \App\Models\User::class);

        // Pivot table name keeps the legacy `mailing_list_user` shape that
        // existing migrations created, regardless of the host's User class.
        return $this->belongsToMany($UserClass, 'mailing_list_user');
    }

    public function groups(): BelongsToMany
    {
        return $this->belongsToMany(MailingGroup::class);
    }

    public function getUpdatedAtAttribute($date)
    {
        return $date ? (new DateTime($date))->format('Y-m-d H:i:s') : null;
    }

    public function getCreatedAtAttribute($date)
    {
        return $date ? (new DateTime($date))->format('Y-m-d H:i:s') : null;
    }
}
