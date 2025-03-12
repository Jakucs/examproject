<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    
    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'login' => 'required', // Elfogadunk emailt vagy felhasználónevet
            'password' => 'required',
        ];
    }
}
