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
        $time = new DateTime($date);
        return $time->format('Y-m-d H:i:s');
    }

    public function getCreatedAtAttribute($date)
    {
        $time = new DateTime($date);
        return $time->format('Y-m-d H:i:s');
    }
}
