<?php

namespace Database\Seeders;

use App\Models\Venue;
use Illuminate\Database\Seeder;

class VenueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 10,000 venues in chunks for better performance
        $chunkSize = 500;
        $totalVenues = 10000;

        $this->command->info("Creating {$totalVenues} venues...");

        for ($i = 0; $i < $totalVenues; $i += $chunkSize) {
            Venue::factory($chunkSize)->create();
            $this->command->info("Created " . min($i + $chunkSize, $totalVenues) . " venues...");
        }

        $this->command->info("Successfully created {$totalVenues} venues!");
    }
}
