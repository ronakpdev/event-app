<?php

namespace App\Http\Controllers;

use App\Constants\VenueConstants;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Models\Event;
use App\Models\Venue;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = Event::with(['venue', 'user'])
            ->where('user_id', auth()->id());

        // Apply filters
        if ($request->filled('venue_ids') && is_array($request->venue_ids)) {
            $query->whereIn('venue_id', $request->venue_ids);
        } elseif ($request->filled('venue_id')) {
            // Backward compatibility with single venue_id
            $query->where('venue_id', $request->venue_id);
        }

        if ($request->filled('start_date')) {
            $query->whereDate('start_datetime', '>=', $request->start_date);
        }

        if ($request->filled('end_date')) {
            $query->whereDate('end_datetime', '<=', $request->end_date);
        }

        if ($request->filled('tags') && is_array($request->tags)) {
            $query->whereHas('venue', function ($q) use ($request) {
                $q->where(function ($subQuery) use ($request) {
                    foreach ($request->tags as $tag) {
                        $subQuery->orWhereJsonContains('tags', $tag);
                    }
                });
            });
        } elseif ($request->filled('tag')) {
            // Backward compatibility with single tag
            $query->whereHas('venue', function ($q) use ($request) {
                $q->whereJsonContains('tags', $request->tag);
            });
        }

        if ($request->filled('min_capacity')) {
            $query->whereHas('venue', function ($q) use ($request) {
                $q->where('capacity', '>=', $request->min_capacity);
            });
        }

        if ($request->filled('accessibility') && is_array($request->accessibility)) {
            $query->whereHas('venue', function ($q) use ($request) {
                $q->where(function ($subQuery) use ($request) {
                    foreach ($request->accessibility as $accessibility) {
                        $subQuery->orWhereJsonContains('accessibility', $accessibility);
                    }
                });
            });
        } elseif ($request->filled('accessibility')) {
            // Backward compatibility with single accessibility
            $query->whereHas('venue', function ($q) use ($request) {
                $q->whereJsonContains('accessibility', $request->accessibility);
            });
        }

        $events = $query->latest('start_datetime')->paginate(15);

        // Get all unique tags from venues
        $allTags = Venue::whereNotNull('tags')
            ->get()
            ->pluck('tags')
            ->flatten()
            ->unique()
            ->sort()
            ->values()
            ->toArray();

        return Inertia::render('Events/Index', [
            'events' => $events,
            'filters' => $request->only(['venue_ids', 'venue_id', 'start_date', 'end_date', 'tags', 'tag', 'min_capacity', 'accessibility']),
            'venues' => Venue::orderBy('name')->get(['id', 'name']),
            'availableTags' => $allTags,
            'accessibilityOptions' => VenueConstants::ACCESSIBILITY_OPTIONS,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Events/Create', [
            'venues' => Venue::orderBy('name')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEventRequest $request)
    {
        Event::create([
            ...$request->validated(),
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('events.index')
            ->with('success', 'Event created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event): Response
    {
        $event->load(['venue', 'user']);

        return Inertia::render('Events/Show', [
            'event' => $event,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event): Response
    {
        $this->authorize('update', $event);

        return Inertia::render('Events/Edit', [
            'event' => $event->load('venue'),
            'venues' => Venue::orderBy('name')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEventRequest $request, Event $event)
    {
        $this->authorize('update', $event);

        $event->update($request->validated());

        return redirect()->route('events.index')
            ->with('success', 'Event updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        $this->authorize('delete', $event);

        $event->delete();

        return redirect()->route('events.index')
            ->with('success', 'Event deleted successfully.');
    }
}
