import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import VenueFormModal from './Components/VenueFormModal';
import VenueDetailModal from './Components/VenueDetailModal';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Index({ venues, accessibilityOptions, layoutOptions }) {
    const [showModal, setShowModal] = useState(false);
    const [editingVenue, setEditingVenue] = useState(null);
    const [showVenueDetailModal, setShowVenueDetailModal] = useState(false);
    const [selectedVenue, setSelectedVenue] = useState(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        city: '',
        state: '',
        capacity: '',
        accessibility: [],
        tags: [],
        layout: [],
        avg_ratings: '',
        latitude: '',
        longitude: '',
    });

    useEffect(() => {
        if (editingVenue) {
            setData({
                name: editingVenue.name || '',
                city: editingVenue.city || '',
                state: editingVenue.state || '',
                capacity: editingVenue.capacity || '',
                accessibility: editingVenue.accessibility || [],
                tags: editingVenue.tags || [],
                layout: editingVenue.layout || [],
                avg_ratings: editingVenue.avg_ratings || '',
                latitude: editingVenue.latitude || '',
                longitude: editingVenue.longitude || '',
            });
        } else {
            reset();
        }
    }, [editingVenue]);

    const openCreateModal = () => {
        setEditingVenue(null);
        reset();
        setShowModal(true);
    };

    const openEditModal = (venue) => {
        setEditingVenue(venue);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingVenue(null);
        reset();
    };

    const submit = (e) => {
        e.preventDefault();
        if (editingVenue) {
            put(route('venues.update', editingVenue.id), {
                preserveScroll: true,
                onSuccess: () => {
                    closeModal();
                    router.reload({ only: ['venues'] });
                },
            });
        } else {
            post(route('venues.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    closeModal();
                    router.reload({ only: ['venues'] });
                },
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this venue?')) {
            router.delete(route('venues.destroy', id), {
                preserveScroll: true,
                onSuccess: () => {
                    router.reload({ only: ['venues'] });
                },
            });
        }
    };

    const openViewModal = (venue) => {
        setSelectedVenue(venue);
        setShowVenueDetailModal(true);
    };

    const closeViewModal = () => {
        setSelectedVenue(null);
        setShowVenueDetailModal(false);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Venues
                    </h2>
                    <button
                        onClick={openCreateModal}
                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                    >
                        Create Venue
                    </button>
                </div>
            }
        >
            <Head title="Venues" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {venues.data.length === 0 ? (
                                <p className="text-center text-gray-500">No venues found.</p>
                            ) : (
                                <div className="space-y-4">
                                    {venues.data.map((venue) => (
                                        <div
                                            key={venue.id}
                                            className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
                                        >
                                            <div className="flex-1">
                                                <button
                                                    type="button"
                                                    onClick={() => openViewModal(venue)}
                                                    className="text-left text-lg font-semibold text-indigo-600 hover:text-indigo-800"
                                                >
                                                    {venue.name}
                                                </button>
                                                <p className="text-sm text-gray-600">
                                                    {venue.city}, {venue.state}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Capacity: {venue.capacity} | Rating: {venue.avg_ratings}/5 | Events: {venue.events_count}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => openViewModal(venue)}
                                                    className="rounded-md border border-gray-300 px-3 py-1 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                                                    title="View details"
                                                >
                                                    <span className="sr-only">View</span>
                                                    <svg
                                                        className="h-4 w-4"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                        />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => openEditModal(venue)}
                                                    className="rounded-md bg-indigo-600 px-3 py-1 text-sm font-semibold text-white hover:bg-indigo-500"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(venue.id)}
                                                    className="rounded-md bg-red-600 px-3 py-1 text-sm font-semibold text-white hover:bg-red-500"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {venues.links && venues.links.length > 3 && (
                                <div className="mt-6 flex justify-center">
                                    <nav className="flex gap-2">
                                        {venues.links.map((link, index) => (
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

            {/* Venue Modal */}
            <VenueFormModal
                show={showModal}
                onClose={closeModal}
                onSubmit={submit}
                form={{ data, setData, errors, processing }}
                accessibilityOptions={accessibilityOptions}
                layoutOptions={layoutOptions}
                editingVenue={editingVenue}
            />

            {/* Venue Details Modal */}
            <VenueDetailModal
                show={showVenueDetailModal}
                onClose={closeViewModal}
                venue={selectedVenue}
            />
        </AuthenticatedLayout>
    );
}
