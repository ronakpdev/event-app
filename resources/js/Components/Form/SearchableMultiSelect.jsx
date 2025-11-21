import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

const baseStyles = {
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    control: (base, state) => ({
        ...base,
        borderColor: state.isFocused ? '#6366f1' : '#d1d5db',
        boxShadow: state.isFocused ? '0 0 0 1px #6366f1' : 'none',
        '&:hover': {
            borderColor: '#6366f1',
        },
    }),
};

const formatLabel = (value) =>
    typeof value === 'string'
        ? value
              .replace(/_/g, ' ')
              .replace(/\b\w/g, (letter) => letter.toUpperCase())
        : value;

export default function SearchableMultiSelect({
    label,
    options = [],
    selected = [],
    onChange,
    placeholder = 'Select options',
    isCreatable = false,
}) {
    const Component = isCreatable ? CreatableSelect : Select;

    const formattedOptions = options.map((option) =>
        typeof option === 'string'
            ? { value: option, label: formatLabel(option) }
            : option,
    );

    const value = (selected || []).map((valueItem) => {
        if (typeof valueItem === 'object') {
            return valueItem;
        }
        const existing =
            formattedOptions.find((opt) => opt.value === valueItem) || null;
        return existing || { value: valueItem, label: formatLabel(valueItem) };
    });

    const handleChange = (items) => {
        if (!items || items.length === 0) {
            onChange([]);
            return;
        }
        onChange(items.map((item) => item.value));
    };

    return (
        <div className="relative">
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <Component
                className="mt-1 text-sm"
                classNamePrefix="searchable-multi-select"
                options={formattedOptions}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                isMulti
                menuPortalTarget={
                    typeof window !== 'undefined' ? document.body : null
                }
                styles={baseStyles}
                noOptionsMessage={() => 'No results found'}
            />
        </div>
    );
}

