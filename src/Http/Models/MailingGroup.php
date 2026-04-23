<?php

namespace Sefirosweb\LaravelMailing\Http\Models;

use DateTime;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MailingGroup extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'to',
        'description'
    ];

    public function getUpdatedAtAttribute($date)
    {
        return $date ? (new DateTime($date))->format('Y-m-d H:i:s') : null;
    }

    public function getCreatedAtAttribute($date)
    {
        return $date ? (new DateTime($date))->format('Y-m-d H:i:s') : null;
    }
}
