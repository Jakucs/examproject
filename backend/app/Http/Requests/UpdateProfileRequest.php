<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Carbon\Carbon;


class UpdateProfileRequest extends FormRequest
{
    
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'first_name' => 'nullable|regex:/^[\pL\s\-\']+$/u|max:25', //infonak: csak betűket, szóközt, kötőjelet és aposztrófot engedélyez
            'last_name' => 'nullable|regex:/^[\pL\s\-\']+$/u|max:25', //infonak: csak betűket, szóközt, kötőjelet és aposztrófot engedélyez
             'birth_date' => [
                'nullable',
                'date',
                'after_or_equal:1924-01-01',
                'before_or_equal:' . Carbon::now()->subYears(18)->format('Y-m-d'),
            ],          // 1990-01-01
            'phone_number' => 'nullable|string|regex:/^\+?[0-9\s-]{10,20}$/', // +36 20 123 4567 |+36-20-123-4567| 36201234567 |06 20 123 4567
            'postal_code' => 'nullable|regex:/^\d{4}$/', // 1234
            'city' => 'nullable|regex:/^[\pL\s\.\-]+$/u|max:50', //csak betűket, szóközt, pontot és kötőjelet engedélyez
            'street' => 'nullable|regex:/^[\pL\s\.\-]+$/u|max:50', //csak betűket, szóközt, pontot és kötőjelet engedélyez
            'house_number' => 'nullable|string|max:4',
            'floor' => 'nullable|string|max:30',
            'door' => 'nullable|string|max:50',
        ];
    }
    public function messages(): array
    {
        return [
            'birth_date.after_or_equal' => 'Kérem valós adatot adjon meg! A születési dátum nem lehet 1924.01.01 előtti.',
            'birth_date.before_or_equal' => 'Kérem valós adatot adjon meg! 18 év alatt nem lehet oldalunkon vásárolni!',
        ];
    }

}
