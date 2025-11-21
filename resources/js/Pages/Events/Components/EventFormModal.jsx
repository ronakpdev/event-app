import Modal, { ModalHeader, ModalBody, ModalFooter } from '@/Components/UI/Modal';
import SearchableSelect from '@/Components/Form/SearchableSelect';

export default function EventFormModal({
    show,
    onClose,
    onSubmit,
    form,
    venues,
    editingEvent,
}) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="2xl">
            <form onSubmit={onSubmit}>
                <ModalHeader onClose={onClose}>
                    {editingEvent ? 'Edit Event' : 'Create Event'}
                </ModalHeader>
                <ModalBody>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={form.data.title}
                                onChange={(e) => form.setData('title', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                            {form.errors.title && (
                                <p className="mt-1 text-sm text-red-600">{form.errors.title}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Venue <span className="text-red-500">*</span>
                            </label>
                            <SearchableSelect
                                options={venues}
                                selected={form.data.venue_id}
                                onChange={(value) => form.setData('venue_id', value || '')}
                                placeholder="Select a venue"
                                displayField="name"
                                valueField="id"
                            />
                        </div>
                        {form.errors.venue_id && (
                            <p className="mt-1 text-sm text-red-600">{form.errors.venue_id}</p>
                        )}

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Start Date & Time <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="datetime-local"
                                    value={form.data.start_datetime}
                                    onChange={(e) => form.setData('start_datetime', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                                {form.errors.start_datetime && (
                                    <p className="mt-1 text-sm text-red-600">{form.errors.start_datetime}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    End Date & Time <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="datetime-local"
                                    value={form.data.end_datetime}
                                    onChange={(e) => form.setData('end_datetime', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                                {form.errors.end_datetime && (
                                    <p className="mt-1 text-sm text-red-600">{form.errors.end_datetime}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={form.processing}
                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50"
                    >
                        {form.processing
                            ? editingEvent
                                ? 'Updating...'
                                : 'Creating...'
                            : editingEvent
                                ? 'Update Event'
                                : 'Create Event'}
                    </button>
                </ModalFooter>
            </form>
        </Modal>
    );
}

