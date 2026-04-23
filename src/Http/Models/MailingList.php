<?php

declare(strict_types=1);

namespace Sefirosweb\LaravelMailing\Http\Models;

use App\Models\User;
use DateTime;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class MailingList extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'code',
        'description'
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
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
