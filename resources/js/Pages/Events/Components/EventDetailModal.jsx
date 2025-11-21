import Modal, { ModalHeader, ModalBody, ModalFooter } from '@/Components/UI/Modal';

const formatLabel = (value) =>
    value.replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());

export default function EventDetailModal({ show, event, onClose }) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="2xl">
            {event && (
                <>
                    <ModalHeader onClose={onClose}>Event Details</ModalHeader>
                    <ModalBody>
                        <div className="space-y-6">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Title</p>
                                <p className="text-lg font-semibold text-gray-900">{event.title}</p>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Start</p>
                                    <p className="text-sm text-gray-900">
                                        {new Date(event.start_datetime).toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">End</p>
                                    <p className="text-sm text-gray-900">
                                        {new Date(event.end_datetime).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            {event.venue && (
                                <div className="space-y-2 rounded-lg border border-gray-200 p-4">
                                    <p className="text-sm font-medium text-gray-500">Venue</p>
                                    <p className="text-base font-semibold text-gray-900">
                                        {event.venue.name}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {event.venue.city}, {event.venue.state}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Capacity: {event.venue.capacity}
                                    </p>
                                </div>
                            )}

                            {event.venue?.tags && event.venue.tags.length > 0 && (
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Tags</p>
                                    <div className="flex flex-wrap gap-2">
                                        {event.venue.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {event.venue?.accessibility && event.venue.accessibility.length > 0 && (
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Accessibility</p>
                                    <div className="flex flex-wrap gap-2">
                                        {event.venue.accessibility.map((access) => (
                                            <span
                                                key={access}
                                                className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800"
                                            >
                                                {formatLabel(access)}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300"
                        >
                            Close
                        </button>
                    </ModalFooter>
                </>
            )}
        </Modal>
    );
}

