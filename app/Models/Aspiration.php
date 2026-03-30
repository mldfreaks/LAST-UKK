<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class Aspiration extends Model
{
    protected $fillable = [
        'student_id',
        'category_id',
        'description',
        'image_path',
        'status',
        'feedback',
        'repair_progress',
    ];

    protected $appends = [
        'image_url',
    ];

    public function getImageUrlAttribute(): ?string
    {
        return $this->image_path ? Storage::disk('public')->url($this->image_path) : null;
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
