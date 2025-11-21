import { useState, useEffect, useRef } from 'react';

export default function MultiselectDropdown({ 
    label, 
    options, 
    selected = [], 
    onChange, 
    placeholder = 'Select options',
    formatLabel = (option) => option.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleOption = (option) => {
        const currentSelected = selected || [];
        if (currentSelected.includes(option)) {
            onChange(currentSelected.filter(item => item !== option));
        } else {
            onChange([...currentSelected, option]);
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="mt-1 flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-left text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                    <span className={selected && selected.length > 0 ? 'text-gray-900' : 'text-gray-500'}>
                        {selected && selected.length > 0
                            ? `${selected.length} selected`
                            : placeholder}
                    </span>
                    <svg
                        className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {isOpen && (
                    <div className="absolute z-[100] mt-1 w-full rounded-md border border-gray-300 bg-white shadow-xl">
                        <div className="max-h-60 overflow-auto p-2">
                            {options && options.length > 0 ? (
                                options.map((option) => (
                                    <label
                                        key={option}
                                        className="flex items-center px-2 py-1 hover:bg-gray-100 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selected?.includes(option) || false}
                                            onChange={() => toggleOption(option)}
                                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">
                                            {formatLabel(option)}
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
    );
}

