import Modal, { ModalHeader, ModalBody, ModalFooter } from '@/Components/UI/Modal';

const formatLabel = (value) =>
    value.replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());

export default function VenueDetailModal({ show, venue, onClose }) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="3xl">
            {venue && (
                <>
                    <ModalHeader onClose={onClose}>Venue Details</ModalHeader>
                    <ModalBody>
                        <div className="space-y-6">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Name</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {venue.name}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Location</p>
                                    <p className="text-sm text-gray-900">
                                        {venue.city}, {venue.state}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Capacity</p>
                                    <p className="text-sm text-gray-900">
                                        {venue.capacity?.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Average Rating</p>
                                    <p className="text-sm text-gray-900">
                                        {venue.avg_ratings ?? 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Coordinates</p>
                                    <p className="text-sm text-gray-900">
                                        {venue.latitude ?? '--'}, {venue.longitude ?? '--'}
                                    </p>
                                </div>
                            </div>

                            {venue.tags && venue.tags.length > 0 && (
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Tags</p>
                                    <div className="flex flex-wrap gap-2">
                                        {venue.tags.map((tag) => (
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

                            {venue.accessibility && venue.accessibility.length > 0 && (
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Accessibility</p>
                                    <div className="flex flex-wrap gap-2">
                                        {venue.accessibility.map((item) => (
                                            <span
                                                key={item}
                                                className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800"
                                            >
                                                {formatLabel(item)}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {venue.layout && venue.layout.length > 0 && (
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Layouts</p>
                                    <div className="flex flex-wrap gap-2">
                                        {venue.layout.map((item) => (
                                            <span
                                                key={item}
                                                className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                                            >
                                                {formatLabel(item)}
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

