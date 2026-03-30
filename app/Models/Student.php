<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Student extends Authenticatable
{
    protected $fillable = [
        'nis',
        'name',
        'class',
    ];

    public function aspirations(): HasMany
    {
        return $this->hasMany(Aspiration::class);
    }
}
