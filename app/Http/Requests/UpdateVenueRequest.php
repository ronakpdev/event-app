<?php

namespace App\Http\Requests;

use App\Constants\VenueConstants;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateVenueRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'city' => ['sometimes', 'required', 'string', 'max:255'],
            'state' => ['sometimes', 'required', 'string', 'max:255'],
            'capacity' => ['sometimes', 'required', 'integer', 'min:1'],
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
