<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\User;
use App\Models\Venue;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    protected $model = Event::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDateTime = $this->faker->dateTimeBetween('now', '+1 year');
        $endDateTime = (clone $startDateTime)->modify('+' . $this->faker->numberBetween(1, 8) . ' hours');

        return [
            'user_id' => User::factory(),
            'title' => $this->faker->sentence(3),
            'venue_id' => Venue::factory(),
            'start_datetime' => $startDateTime,
            'end_datetime' => $endDateTime,
        ];
    }
}
