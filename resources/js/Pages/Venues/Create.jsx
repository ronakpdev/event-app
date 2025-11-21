import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({ accessibilityOptions, layoutOptions }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        city: '',
        state: '',
        capacity: '',
        accessibility: [],
        tags: '',
        layout: [],
        avg_ratings: '',
        latitude: '',
        longitude: '',
    });

    const [tagsInput, setTagsInput] = useState('');

    const submit = (e) => {
        e.preventDefault();
        const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag);
        post(route('venues.store'), {
            ...data,
            tags: tags.length > 0 ? tags : null,
        });
    };

    const toggleArrayItem = (arrayName, value) => {
        const currentArray = data[arrayName] || [];
        if (currentArray.includes(value)) {
            setData(arrayName, currentArray.filter(item => item !== value));
        } else {
            setData(arrayName, [...currentArray, value]);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create Venue
                </h2>
            }
        >
            <Head title="Create Venue" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            value={data.city}
                                            onChange={(e) => setData('city', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.city && (
                                            <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            State
                                        </label>
                                        <input
                                            type="text"
                                            value={data.state}
                                            onChange={(e) => setData('state', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.state && (
                                            <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Capacity
                                    </label>
                                    <input
                                        type="number"
                                        value={data.capacity}
                                        onChange={(e) => setData('capacity', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        min="1"
                                    />
                                    {errors.capacity && (
                                        <p className="mt-1 text-sm text-red-600">{errors.capacity}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Accessibility Options
                                    </label>
                                    <div className="mt-2 space-y-2">
                                        {accessibilityOptions.map((option) => (
                                            <label key={option} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={data.accessibility?.includes(option) || false}
                                                    onChange={() => toggleArrayItem('accessibility', option)}
                                                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                                <span className="ml-2 text-sm text-gray-700">
                                                    {option.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.accessibility && (
                                        <p className="mt-1 text-sm text-red-600">{errors.accessibility}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Tags (comma-separated)
                                    </label>
                                    <input
                                        type="text"
                                        value={tagsInput}
                                        onChange={(e) => setTagsInput(e.target.value)}
                                        placeholder="e.g., conference, wedding, concert"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.tags && (
                                        <p className="mt-1 text-sm text-red-600">{errors.tags}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Layout Options
                                    </label>
                                    <div className="mt-2 space-y-2">
                                        {layoutOptions.map((option) => (
                                            <label key={option} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={data.layout?.includes(option) || false}
                                                    onChange={() => toggleArrayItem('layout', option)}
                                                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                                <span className="ml-2 text-sm text-gray-700">
                                                    {option.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.layout && (
                                        <p className="mt-1 text-sm text-red-600">{errors.layout}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Average Ratings (0-5)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        max="5"
                                        value={data.avg_ratings}
                                        onChange={(e) => setData('avg_ratings', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.avg_ratings && (
                                        <p className="mt-1 text-sm text-red-600">{errors.avg_ratings}</p>
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
                                            value={data.latitude}
                                            onChange={(e) => setData('latitude', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.latitude && (
                                            <p className="mt-1 text-sm text-red-600">{errors.latitude}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Longitude
                                        </label>
                                        <input
                                            type="number"
                                            step="0.00000001"
                                            value={data.longitude}
                                            onChange={(e) => setData('longitude', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.longitude && (
                                            <p className="mt-1 text-sm text-red-600">{errors.longitude}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50"
                                    >
                                        {processing ? 'Creating...' : 'Create Venue'}
                                    </button>
                                    <Link
                                        href={route('venues.index')}
                                        className="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

