<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Venue extends Model
{
    /** @use HasFactory<\Database\Factories\VenueFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'city',
        'state',
        'capacity',
        'accessibility',
        'tags',
        'layout',
        'avg_ratings',
        'latitude',
        'longitude',
    ];

    protected $casts = [
        'accessibility' => 'array',
        'tags' => 'array',
        'layout' => 'array',
        'avg_ratings' => 'decimal:2',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
    ];

    public function events(): HasMany
    {
        return $this->hasMany(Event::class);
    }
}
