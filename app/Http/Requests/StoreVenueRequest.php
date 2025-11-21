<?php

namespace App\Http\Requests;

use App\Constants\VenueConstants;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreVenueRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        // Set default values for nullable fields before validation
        $this->merge([
            'avg_ratings' => $this->avg_ratings ?? 0.00,
            'accessibility' => $this->accessibility ?? [],
            'tags' => $this->tags ?? [],
            'layout' => $this->layout ?? [],
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'state' => ['required', 'string', 'max:255'],
            'capacity' => ['required', 'integer', 'min:1'],
            'accessibility' => ['nullable', 'array'],
            'accessibility.*' => [Rule::in(VenueConstants::ACCESSIBILITY_OPTIONS)],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['string'],
            'layout' => ['nullable', 'array'],
            'layout.*' => [Rule::in(VenueConstants::LAYOUT_OPTIONS)],
            'avg_ratings' => ['nullable', 'numeric', 'min:0', 'max:5'],
            'latitude' => ['nullable', 'numeric', 'between:-90,90'],
            'longitude' => ['nullable', 'numeric', 'between:-180,180'],
        ];
    }
}
