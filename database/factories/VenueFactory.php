<?php

namespace Database\Factories;

use App\Constants\VenueConstants;
use App\Models\Venue;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Venue>
 */
class VenueFactory extends Factory
{
    protected $model = Venue::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
        $states = ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'TX', 'CA', 'TX', 'CA'];

        $cityIndex = $this->faker->numberBetween(0, count($cities) - 1);

        return [
            'name' => $this->faker->company() . ' ' . $this->faker->randomElement(['Hall', 'Center', 'Theater', 'Arena', 'Convention Center', 'Auditorium']),
            'city' => $cities[$cityIndex],
            'state' => $states[$cityIndex],
            'capacity' => $this->faker->numberBetween(50, 10000),
            'accessibility' => $this->faker->randomElements(
                VenueConstants::ACCESSIBILITY_OPTIONS,
                $this->faker->numberBetween(0, 4)
            ),
            'tags' => $this->faker->randomElements(
                ['conference', 'wedding', 'concert', 'sports', 'corporate', 'exhibition', 'seminar', 'party'],
                $this->faker->numberBetween(1, 3)
            ),
            'layout' => $this->faker->randomElements(
                VenueConstants::LAYOUT_OPTIONS,
                $this->faker->numberBetween(1, 3)
            ),
            'avg_ratings' => $this->faker->randomFloat(2, 1, 5),
            'latitude' => $this->faker->latitude(),
            'longitude' => $this->faker->longitude(),
        ];
    }
}
