import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SearchableSelect from '@/Components/Form/SearchableSelect';
import SearchableMultiSelect from '@/Components/Form/SearchableMultiSelect';
import EventFormModal from './Components/EventFormModal';
import EventDetailModal from './Components/EventDetailModal';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

export default function Index({ events, filters, venues, availableTags, accessibilityOptions }) {
    const [tagsOpen, setTagsOpen] = useState(false);
    const [accessibilityOpen, setAccessibilityOpen] = useState(false);
    const [showEventModal, setShowEventModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [showEventDetailModal, setShowEventDetailModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const tagsRef = useRef(null);
    const accessibilityRef = useRef(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (tagsRef.current && !tagsRef.current.contains(event.target)) {
                setTagsOpen(false);
            }
            if (accessibilityRef.current && !accessibilityRef.current.contains(event.target)) {
                setAccessibilityOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const filterForm = useForm({
        venue_ids: Array.isArray(filters?.venue_ids) ? filters.venue_ids : filters?.venue_id ? [filters.venue_id] : [],
        start_date: filters?.start_date || '',
        end_date: filters?.end_date || '',
        tags: Array.isArray(filters?.tags) ? filters.tags : filters?.tag ? [filters.tag] : [],
        min_capacity: filters?.min_capacity || '',
        accessibility: Array.isArray(filters?.accessibility)
            ? filters.accessibility
            : filters?.accessibility
              ? [filters.accessibility]
              : [],
    });

    const eventForm = useForm({
        title: '',
        venue_id: '',
        start_datetime: '',
        end_datetime: '',
    });

    const handleFilter = (e) => {
        e.preventDefault();
        filterForm.get(route('events.index'), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        filterForm.setData({
            venue_ids: [],
            start_date: '',
            end_date: '',
            tags: [],
            min_capacity: '',
            accessibility: [],
        });
        setTagsOpen(false);
        setAccessibilityOpen(false);
        router.get(route('events.index'));
    };

    const toggleTag = (tag) => {
        const currentTags = filterForm.data.tags || [];
        if (currentTags.includes(tag)) {
            filterForm.setData('tags', currentTags.filter((t) => t !== tag));
        } else {
            filterForm.setData('tags', [...currentTags, tag]);
        }
    };

    const toggleAccessibility = (option) => {
        const currentAccessibility = filterForm.data.accessibility || [];
        if (currentAccessibility.includes(option)) {
            filterForm.setData('accessibility', currentAccessibility.filter((a) => a !== option));
        } else {
            filterForm.setData('accessibility', [...currentAccessibility, option]);
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this event?')) {
            router.delete(route('events.destroy', id), { preserveScroll: true });
        }
    };

    const openCreateModal = () => {
        setEditingEvent(null);
        eventForm.reset();
        setShowEventModal(true);
    };

    const formatDateTimeForInput = (value) => {
        if (!value) return '';
        const date = new Date(value);
        const offset = date.getTimezoneOffset() * 60000;
        return new Date(date.getTime() - offset).toISOString().slice(0, 16);
    };

    const openEditModal = (event) => {
        setEditingEvent(event);
        eventForm.setData({
            title: event.title || '',
            venue_id: event.venue_id || '',
            start_datetime: formatDateTimeForInput(event.start_datetime),
            end_datetime: formatDateTimeForInput(event.end_datetime),
        });
        setShowEventModal(true);
    };

    const closeEventModal = () => {
        setShowEventModal(false);
        setEditingEvent(null);
        eventForm.reset();
    };

    const openViewModal = (event) => {
        setSelectedEvent(event);
        setShowEventDetailModal(true);
    };

    const closeViewModal = () => {
        setSelectedEvent(null);
        setShowEventDetailModal(false);
    };

    const submitEvent = (e) => {
        e.preventDefault();
        if (editingEvent) {
            eventForm.put(route('events.update', editingEvent.id), {
                preserveScroll: true,
                onSuccess: () => {
                    closeEventModal();
                    router.reload({ only: ['events'] });
                },
            });
        } else {
            eventForm.post(route('events.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    closeEventModal();
                    router.reload({ only: ['events'] });
                },
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        My Events
                    </h2>
                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                    >
                        Create Event
                    </button>
                </div>
            }
        >
            <Head title="Events" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 relative">
                    {/* Filters */}
                    <div className="mb-6 bg-white shadow-sm sm:rounded-lg overflow-visible">
                        <div className="p-6 overflow-visible">
                            <form onSubmit={handleFilter} className="space-y-4 relative">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 relative">
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700">Venues</label>
                                        <SearchableMultiSelect
                                            options={venues.map(v => ({ value: v.id, label: v.name }))}
                                            selected={filterForm.data.venue_ids || []}
                                            onChange={(selected) => filterForm.setData('venue_ids', selected)}
                                            placeholder="Select venues"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Start Date
                                        </label>
                                        <input
                                            type="date"
                                            value={filterForm.data.start_date}
                                            onChange={(e) => filterForm.setData('start_date', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            End Date
                                        </label>
                                        <input
                                            type="date"
                                            value={filterForm.data.end_date}
                                            onChange={(e) => filterForm.setData('end_date', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 relative">
                                    <div className="relative" ref={tagsRef}>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Tags
                                        </label>
                                        <div className="relative">
                                            <button
                                                type="button"
                                                onClick={() => setTagsOpen(!tagsOpen)}
                                                className="mt-1 flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-left text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            >
                                                <span>
                                                    {filterForm.data.tags && filterForm.data.tags.length > 0
                                                        ? `${filterForm.data.tags.length} selected`
                                                        : 'Select tags'}
                                                </span>
                                                <svg
                                                    className={`h-4 w-4 text-gray-400 transition-transform ${tagsOpen ? 'rotate-180' : ''}`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                            {tagsOpen && (
                                                <div className="absolute z-[100] mt-1 w-full rounded-md border border-gray-300 bg-white shadow-xl">
                                                    <div className="max-h-60 overflow-auto p-2">
                                                        {availableTags && availableTags.length > 0 ? (
                                                            availableTags.map((tag) => (
                                                                <label
                                                                    key={tag}
                                                                    className="flex items-center px-2 py-1 hover:bg-gray-100 cursor-pointer"
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={filterForm.data.tags?.includes(tag) || false}
                                                                        onChange={() => toggleTag(tag)}
                                                                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                    />
                                                                    <span className="ml-2 text-sm text-gray-700">{tag}</span>
                                                                </label>
                                                            ))
                                                        ) : (
                                                            <p className="px-2 py-1 text-sm text-gray-500">No tags available</p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Min Capacity
                                        </label>
                                        <input
                                            type="number"
                                            value={filterForm.data.min_capacity}
                                            onChange={(e) => filterForm.setData('min_capacity', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>

                                    <div className="relative" ref={accessibilityRef}>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Accessibility
                                        </label>
                                        <div className="relative">
                                            <button
                                                type="button"
                                                onClick={() => setAccessibilityOpen(!accessibilityOpen)}
                                                className="mt-1 flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-left text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            >
                                                <span>
                                                    {filterForm.data.accessibility && filterForm.data.accessibility.length > 0
                                                        ? `${filterForm.data.accessibility.length} selected`
                                                        : 'Select accessibility'}
                                                </span>
                                                <svg
                                                    className={`h-4 w-4 text-gray-400 transition-transform ${accessibilityOpen ? 'rotate-180' : ''}`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                            {accessibilityOpen && (
                                                <div className="absolute z-[100] mt-1 w-full rounded-md border border-gray-300 bg-white shadow-xl">
                                                    <div className="max-h-60 overflow-auto p-2">
                                                        {accessibilityOptions && accessibilityOptions.length > 0 ? (
                                                            accessibilityOptions.map((option) => (
                                                                <label
                                                                    key={option}
                                                                    className="flex items-center px-2 py-1 hover:bg-gray-100 cursor-pointer"
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={filterForm.data.accessibility?.includes(option) || false}
                                                                        onChange={() => toggleAccessibility(option)}
                                                                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                    />
                                                                    <span className="ml-2 text-sm text-gray-700">
                                                                        {option.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                                    </span>
                                                                </label>
                                                            ))
                                                        ) : (
                                                            <p className="px-2 py-1 text-sm text-gray-500">No options available</p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                                    >
                                        Filter
                                    </button>
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300"
                                    >
                                        Clear
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Events List */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {events.data.length === 0 ? (
                                <p className="text-center text-gray-500">No events found.</p>
                            ) : (
                                <div className="space-y-4">
                                    {events.data.map((event) => (
                                        <div
                                            key={event.id}
                                            className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
                                        >
                                            <div className="flex-1">
                                                <button
                                                    type="button"
                                                    onClick={() => openViewModal(event)}
                                                    className="text-left text-lg font-semibold text-indigo-600 hover:text-indigo-800"
                                                >
                                                    {event.title}
                                                </button>
                                                <p className="text-sm text-gray-600">
                                                    {event.venue.name} - {event.venue.city}, {event.venue.state}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(event.start_datetime).toLocaleString()} - {new Date(event.end_datetime).toLocaleString()}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => openViewModal(event)}
                                                    className="rounded-md border border-gray-300 px-3 py-1 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                                                    title="View details"
                                                >
                                                    <span className="sr-only">View</span>
                                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => openEditModal(event)}
                                                    className="rounded-md bg-indigo-600 px-3 py-1 text-sm font-semibold text-white hover:bg-indigo-500"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(event.id)}
                                                    className="rounded-md bg-red-600 px-3 py-1 text-sm font-semibold text-white hover:bg-red-500"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {events.links && events.links.length > 3 && (
                                <div className="mt-6 flex justify-center">
                                    <nav className="flex gap-2">
                                        {events.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url || '#'}
                                                className={`px-3 py-2 rounded-md text-sm font-medium ${
                                                    link.active
                                                        ? 'bg-indigo-600 text-white'
                                                        : 'bg-white text-gray-700 hover:bg-gray-50'
                                                } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </nav>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <EventFormModal
                show={showEventModal}
                onClose={closeEventModal}
                onSubmit={submitEvent}
                form={eventForm}
                venues={venues}
                editingEvent={editingEvent}
            />

            <EventDetailModal
                show={showEventDetailModal}
                event={selectedEvent}
                onClose={closeViewModal}
            />
        </AuthenticatedLayout>
    );
}

