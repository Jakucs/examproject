<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    // Profil adatainak lekérése
    public function getProfile()
    {
        return response()->json(Auth::user());
    }

    // Profil adatainak frissítése
    public function updateProfile(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'username' => 'required|string|unique:users,username,' . $user->id,
            'last_name' => 'nullable|string|max:255',
            'first_name' => 'nullable|string|max:255',
            'birth_date' => 'nullable|date',
            'phone_number' => 'nullable|string|max:20',
            'zip_code' => 'nullable|integer|max:9999',
            'city' => 'nullable|string|max:255',
            'street' => 'nullable|string|max:255',
            'house_number' => 'nullable|string|max:10',
            'floor' => 'nullable|integer|max:10',
            'door' => 'nullable|string|max:10',
        ]);

        $user->update($request->all());

        return response()->json(['message' => 'Profil frissítve!', 'user' => $user]);
    }

    // Jelszó módosítása
    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|min:6|confirmed',
        ]);

        if (!Hash::check($request->current_password, Auth::user()->password)) {
            return response()->json(['message' => 'A jelenlegi jelszó hibás'], 400);
        }

        Auth::user()->update(['password' => Hash::make($request->new_password)]);

        return response()->json(['message' => 'Jelszó sikeresen módosítva!']);
    }
}