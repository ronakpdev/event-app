import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ event }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Event Details
                    </h2>
                    <Link
                        href={route('events.edit', event.id)}
                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                    >
                        Edit Event
                    </Link>
                </div>
            }
        >
            <Head title={event.title} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-gray-700">Venue</h4>
                                    <p className="text-sm text-gray-900">
                                        {event.venue.name} - {event.venue.city}, {event.venue.state}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Capacity: {event.venue.capacity}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-gray-700">Start Date & Time</h4>
                                    <p className="text-sm text-gray-900">
                                        {new Date(event.start_datetime).toLocaleString()}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-gray-700">End Date & Time</h4>
                                    <p className="text-sm text-gray-900">
                                        {new Date(event.end_datetime).toLocaleString()}
                                    </p>
                                </div>

                                {event.venue.tags && event.venue.tags.length > 0 && (
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-700">Tags</h4>
                                        <div className="mt-1 flex flex-wrap gap-2">
                                            {event.venue.tags.map((tag, index) => (
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

                                <div className="pt-4">
                                    <Link
                                        href={route('events.index')}
                                        className="text-indigo-600 hover:text-indigo-800"
                                    >
                                        ← Back to Events
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

