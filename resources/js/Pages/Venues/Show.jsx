import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ venue }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Venue Details
                    </h2>
                    <Link
                        href={route('venues.edit', venue.id)}
                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                    >
                        Edit Venue
                    </Link>
                </div>
            }
        >
            <Head title={venue.name} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{venue.name}</h3>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-gray-700">Location</h4>
                                    <p className="text-sm text-gray-900">
                                        {venue.city}, {venue.state}
                                    </p>
                                    {venue.latitude && venue.longitude && (
                                        <p className="text-sm text-gray-600">
                                            Coordinates: {venue.latitude}, {venue.longitude}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-gray-700">Capacity</h4>
                                    <p className="text-sm text-gray-900">{venue.capacity} people</p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-gray-700">Average Rating</h4>
                                    <p className="text-sm text-gray-900">{venue.avg_ratings}/5</p>
                                </div>

                                {venue.tags && venue.tags.length > 0 && (
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-700">Tags</h4>
                                        <div className="mt-1 flex flex-wrap gap-2">
                                            {venue.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center rounded-md bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {venue.accessibility && venue.accessibility.length > 0 && (
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-700">Accessibility Features</h4>
                                        <div className="mt-1 flex flex-wrap gap-2">
                                            {venue.accessibility.map((feature, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center rounded-md bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800"
                                                >
                                                    {feature.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {venue.layout && venue.layout.length > 0 && (
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-700">Available Layouts</h4>
                                        <div className="mt-1 flex flex-wrap gap-2">
                                            {venue.layout.map((layout, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center rounded-md bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                                                >
                                                    {layout.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <h4 className="text-sm font-medium text-gray-700">Total Events</h4>
                                    <p className="text-sm text-gray-900">{venue.events_count || 0}</p>
                                </div>

                                <div className="pt-4">
                                    <Link
                                        href={route('venues.index')}
                                        className="text-indigo-600 hover:text-indigo-800"
                                    >
                                        ← Back to Venues
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

