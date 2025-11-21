<?php

namespace App\Http\Controllers;

use App\Constants\VenueConstants;
use App\Http\Requests\StoreVenueRequest;
use App\Http\Requests\UpdateVenueRequest;
use App\Models\Venue;
use Inertia\Inertia;
use Inertia\Response;

class VenueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $venues = Venue::withCount('events')
            ->latest()
            ->paginate(15);

        return Inertia::render('Venues/Index', [
            'venues' => $venues,
            'accessibilityOptions' => VenueConstants::ACCESSIBILITY_OPTIONS,
            'layoutOptions' => VenueConstants::LAYOUT_OPTIONS,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Venues/Create', [
            'accessibilityOptions' => VenueConstants::ACCESSIBILITY_OPTIONS,
            'layoutOptions' => VenueConstants::LAYOUT_OPTIONS,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVenueRequest $request)
    {
        Venue::create($request->validated());

        if ($request->wantsJson() || $request->expectsJson()) {
            return response()->json(['success' => true, 'message' => 'Venue created successfully.']);
        }

        return redirect()->route('venues.index')
            ->with('success', 'Venue created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Venue $venue): Response
    {
        $venue->loadCount('events');

        return Inertia::render('Venues/Show', [
            'venue' => $venue,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Venue $venue): Response
    {
        return Inertia::render('Venues/Edit', [
            'venue' => $venue,
            'accessibilityOptions' => VenueConstants::ACCESSIBILITY_OPTIONS,
            'layoutOptions' => VenueConstants::LAYOUT_OPTIONS,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVenueRequest $request, Venue $venue)
    {
        $venue->update($request->validated());

        if ($request->wantsJson() || $request->expectsJson()) {
            return response()->json(['success' => true, 'message' => 'Venue updated successfully.']);
        }

        return redirect()->route('venues.index')
            ->with('success', 'Venue updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Venue $venue)
    {
        $venue->delete();

        return redirect()->route('venues.index')
            ->with('success', 'Venue deleted successfully.');
    }
}
