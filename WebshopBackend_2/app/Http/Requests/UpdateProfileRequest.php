<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;


class UpdateProfileRequest extends FormRequest
{
    
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'first_name' => 'nullable|regex:/^[\pL\s\-\']+$/u|max:25', //csak betűket, szóközt, kötőjelet és aposztrófot engedélyez
            'last_name' => 'nullable|regex:/^[\pL\s\-\']+$/u|max:25', //csak betűket, szóközt, kötőjelet és aposztrófot engedélyez
            'birth_date' => 'nullable|date', // 1990-01-01
            'phone_number' => 'nullable|string|regex:/^\+36\s\d{2}\s\d{3}\s\d{2}\s\d{2}$/', // +36 20 123 45 67
            'postal_code' => 'nullable|regex:/^\d{4}$/', // 1234
            'city' => 'nullable|regex:/^[\pL\s\.\-]+$/u|max:50', //csak betűket, szóközt, pontot és kötőjelet engedélyez
            'street' => 'nullable|regex:/^[\pL\s\.\-]+$/u|max:50', //csak betűket, szóközt, pontot és kötőjelet engedélyez
            'house_number' => 'nullable|string|max:4',
            'floor' => 'nullable|string|max:30',
            'door' => 'nullable|string|max:50',
        ];
    }
}
