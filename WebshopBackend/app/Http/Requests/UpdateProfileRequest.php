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
            "email" => "required|email|unique:users,email," . $this->user()->id, // Kivéve a saját emailt
            "first_name" => "nullable|string|max:255",
            "last_name" => "nullable|string|max:255",
            "birth_date" => "nullable|date|before:-18 years", // Legalább 18 éves legyen
            "phone_number" => "nullable|string|max:20|regex:/^(\+36|06)(20|30|70)\d{7}$/", // Magyar telefonszám ellenőrzés
            //szóközökkel +36 30 123 45 67"phone_number" => "nullable|string|max:20|regex:/^(\+36|06)(\s?\d{2}){1}(\s?\d{3}){1}(\s?\d{2}){1}(\s?\d{2}){1}$/",
            /**+36 30 728 11 67
            +36 307281167
            +36 30 728 1167
            06 30 728 11 67 **/
            "zip_code" => "nullable|string|max:10",
            "city" => "nullable|string|max:255",
            "street" => "nullable|string|max:255",
            "house_number" => "nullable|string|max:10",
            "floor" => "nullable|string|max:10",
            "door" => "nullable|string|max:10",
        ];

    
    }
    public function messages(): array
    {
    return [
        // Regisztrációs adatok
        "email.required" => "Az email cím megadása kötelező.",
        "email.email" => "Érvényes email címet adjon meg.",
        "email.unique" => "Ez az email cím már foglalt.",

        "first_name.string" => "A keresztnevet csak karakterek alkothatják.",
        "first_name.max" => "A keresztneved maximum 255 karakter lehet.",

        "last_name.string" => "A vezetéknév csak karakterek alkothatják.",
        "last_name.max" => "A vezetéknév maximum 255 karakter lehet.",

        "birth_date.date" => "A születési dátum érvénytelen formátumú.",
        "birth_date.before" => "Legalább 18 évesnek kell lenned, hogy regisztrálhass.",
        
        // Rendelési adatok
        "phone_number.regex" => "Kérjük, érvényes magyar telefonszámot adjon meg. (Pl. +36 30 123 4567)",
        
        "zip_code.max" => "Az irányítószám maximum 10 karakter hosszú lehet.",
        "city.max" => "A város neve maximum 255 karakter lehet.",
        "street.max" => "Az utca neve maximum 255 karakter lehet.",
        "house_number.max" => "A házszám maximum 10 karakter hosszú lehet.",
        "floor.max" => "Az emelet neve maximum 10 karakter lehet.",
        "door.max" => "Az ajtó maximum 10 karakter lehet.",
    ];
    }
}
