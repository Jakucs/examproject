<?php


namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdatePasswordRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Engedélyezzük az összes bejelentkezett felhasználónak
    }

    public function rules(): array
    {
        return [
            "current_password" => "required|current_password",
            "password" => [
                "required",
                "min:8",
                "regex:/[a-z]/",
                "regex:/[A-Z]/",
                "regex:/[0-9]/"
            ],
            "confirm_password" => "required|same:password"
        ];
    }

    public function messages(): array
    {
        return [
            "current_password.required" => "A jelenlegi jelszó megadása kötelező.",
            "current_password.current_password" => "A jelenlegi jelszó hibás.",
            "password.required" => "Az új jelszó megadása kötelező.",
            "password.min" => "A jelszónak legalább 8 karakter hosszúnak kell lennie.",
            "password.regex" => "A jelszónak tartalmaznia kell kis- és nagybetűt, valamint számot.",
            "confirm_password.required" => "A jelszó megerősítése kötelező.",
            "confirm_password.same" => "A jelszavak nem egyeznek.",
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            "success" => false,
            "message" => "Adatbeviteli hiba",
            "errors" => $validator->errors()
        ], 422));
    }
}
