import Modal, { ModalHeader, ModalBody, ModalFooter } from '@/Components/UI/Modal';
import SearchableMultiSelect from '@/Components/Form/SearchableMultiSelect';

export default function VenueFormModal({
    show,
    onClose,
    onSubmit,
    form,
    accessibilityOptions,
    layoutOptions,
    editingVenue,
}) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="3xl">
            <form onSubmit={onSubmit}>
                <ModalHeader onClose={onClose}>
                    {editingVenue ? 'Edit Venue' : 'Create Venue'}
                </ModalHeader>
                <ModalBody>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={form.data.name}
                                onChange={(e) => form.setData('name', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            {form.errors.name && (
                                <p className="mt-1 text-sm text-red-600">{form.errors.name}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    City <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={form.data.city}
                                    onChange={(e) => form.setData('city', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {form.errors.city && (
                                    <p className="mt-1 text-sm text-red-600">{form.errors.city}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    State <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={form.data.state}
                                    onChange={(e) => form.setData('state', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {form.errors.state && (
                                    <p className="mt-1 text-sm text-red-600">{form.errors.state}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Capacity <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                min="1"
                                value={form.data.capacity}
                                onChange={(e) => form.setData('capacity', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            {form.errors.capacity && (
                                <p className="mt-1 text-sm text-red-600">{form.errors.capacity}</p>
                            )}
                        </div>

                        <SearchableMultiSelect
                            label="Tags"
                            options={Array.from(new Set(form.data.tags || []))}
                            selected={form.data.tags || []}
                            onChange={(tags) => form.setData('tags', tags)}
                            placeholder="Type to add tags"
                            isCreatable
                        />
                        {form.errors.tags && (
                            <p className="mt-1 text-sm text-red-600">{form.errors.tags}</p>
                        )}

                        <SearchableMultiSelect
                            label="Accessibility Options"
                            options={accessibilityOptions}
                            selected={form.data.accessibility || []}
                            onChange={(selected) => form.setData('accessibility', selected)}
                            placeholder="Select accessibility options"
                        />
                        {form.errors.accessibility && (
                            <p className="mt-1 text-sm text-red-600">{form.errors.accessibility}</p>
                        )}

                        <SearchableMultiSelect
                            label="Layout Options"
                            options={layoutOptions}
                            selected={form.data.layout || []}
                            onChange={(selected) => form.setData('layout', selected)}
                            placeholder="Select layout options"
                        />
                        {form.errors.layout && (
                            <p className="mt-1 text-sm text-red-600">{form.errors.layout}</p>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Average Ratings (0-5)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                max="5"
                                value={form.data.avg_ratings}
                                onChange={(e) => form.setData('avg_ratings', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            {form.errors.avg_ratings && (
                                <p className="mt-1 text-sm text-red-600">{form.errors.avg_ratings}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Latitude
                                </label>
                                <input
                                    type="number"
                                    step="0.00000001"
                                    value={form.data.latitude}
                                    onChange={(e) => form.setData('latitude', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {form.errors.latitude && (
                                    <p className="mt-1 text-sm text-red-600">{form.errors.latitude}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Longitude
                                </label>
                                <input
                                    type="number"
                                    step="0.00000001"
                                    value={form.data.longitude}
                                    onChange={(e) => form.setData('longitude', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {form.errors.longitude && (
                                    <p className="mt-1 text-sm text-red-600">{form.errors.longitude}</p>
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
                            ? editingVenue
                                ? 'Updating...'
                                : 'Creating...'
                            : editingVenue
                                ? 'Update Venue'
                                : 'Create Venue'}
                    </button>
                </ModalFooter>
            </form>
        </Modal>
    );
}

