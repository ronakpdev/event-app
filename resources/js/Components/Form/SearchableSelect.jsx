import Select from 'react-select';

export default function SearchableSelect({
    label,
    options = [],
    selected,
    onChange,
    placeholder = 'Select an option',
    displayField = 'name',
    valueField = 'id',
}) {
    const formattedOptions = options.map((option) => ({
        value: option[valueField],
        label: option[displayField],
    }));

    const selectedOption = formattedOptions.find((option) => option.value === selected) || null;

    return (
        <div className="relative">
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <Select
                className="mt-1 text-sm"
                classNamePrefix="searchable-select"
                options={formattedOptions}
                value={selectedOption}
                onChange={(option) => onChange(option ? option.value : null)}
                placeholder={placeholder}
                isClearable
                menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    control: (base, state) => ({
                        ...base,
                        borderColor: state.isFocused ? '#6366f1' : '#d1d5db',
                        boxShadow: state.isFocused ? '0 0 0 1px #6366f1' : 'none',
                        '&:hover': {
                            borderColor: '#6366f1',
                        },
                    }),
                }}
                noOptionsMessage={() => 'No results found'}
            />
        </div>
    );
}

