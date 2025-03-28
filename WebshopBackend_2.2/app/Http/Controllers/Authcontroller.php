<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegisterRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $validated = $request->validated();

       
        $userCount = User::count();

       
        $role = $userCount < 2 ? User::ROLE_SUPERADMIN : User::ROLE_USER;

      
        $user = User::create([
            "name" => $validated["name"],
            "email" => $validated["email"],
            "password" => Hash::make($validated["password"]),
            "role" => $role 
        ]);

        return response()->json([
            "success" => true,
            "message" => "Sikeres regisztráció",
            "user" => $user
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'login' => 'required',
            'password' => 'required'
        ]);
    
        
        $loginType = filter_var($request->login, FILTER_VALIDATE_EMAIL) ? 'email' : 'name';
    
        
        $key = 'login:' . $request->login; 
    
        
        if (RateLimiter::tooManyAttempts($key, 3)) {
            $seconds = RateLimiter::availableIn($key);
            return response()->json([
                'error' => "Túl sok sikertelen próbálkozás. Próbáld újra {$seconds} másodperc múlva."
            ], 429);
        }
    
        
        $credentials = [
            $loginType => $request->login,
            'password' => $request->password
        ];
    
        if (!Auth::attempt($credentials)) {
            RateLimiter::hit($key, 60); 
            return response()->json(['error' => 'Hibás bejelentkezési adatok'], 401);
        }
    
        
        RateLimiter::clear($key);
    
        
        $user = Auth::user();
        
        
        $user->tokens()->delete();
    
       
        $token = $user->createToken('sajatToken')->plainTextToken;
    
        return response()->json([
            'message' => 'Sikeres bejelentkezés!',
            'user' => $user,
            'token' => $token
        ], 200);

        
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            "message" => "Sikeres kijelentkezés"
        ], 200);
    }

    public function setAdmin(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

       
        $authUser = Auth::user();

       

        if (!$authUser || $authUser->role !== User::ROLE_SUPERADMIN) {
            return response()->json(['HIBA' => 'Nincs jogosultsága ehhez a művelethez!'], 403);
        }

      
        $user = User::find($request->user_id);

        if ($user->role === User::ROLE_SUPERADMIN) {
            return response()->json(['HIBA' => 'Szuperadmin jogosultság nem módosítható!'], 403);
        }

        if ($user->role === User::ROLE_ADMIN) {
            return response()->json(['message' => 'A felhasználó már admin.'], 400);
        }

        
        $user->role = User::ROLE_ADMIN;
        $user->save();

        return response()->json(['message' => 'Felhasználó Admin jogosultságot kapott.', 'user' => $user]);
    }
    public function revokeAdmin(Request $request)
    {
         $request->validate([
        'user_id' => 'required|exists:users,id',
         ]);

         $authUser = Auth::user();

    
        if (!$authUser || $authUser->role !== User::ROLE_SUPERADMIN) {
        return response()->json(['HIBA' => 'Nincs jogosultsága ehhez a művelethez!'], 403);
        }

        $user = User::find($request->user_id);

    
        if ($user->role === User::ROLE_USER) {
        return response()->json(['message' => 'A felhasználó már nem admin.'], 400);
        }

    
        if ($user->role === User::ROLE_SUPERADMIN) {
        return response()->json(['HIBA' => 'Szuperadmin jogosultság nem vonható vissza!'], 403);
        }

    
        $user->role = User::ROLE_USER;
        $user->save();

        return response()->json(['message' => 'Admin jogosultság visszavonva.', 'user' => $user]);
    }

    public function listUsers()
    {
    
    if (Auth::user()->role !== User::ROLE_SUPERADMIN) {
        return response()->json(['HIBA' => 'Nincs jogosultsága ehhez a művelethez!'], 403);
    }

    
    $users = User::select('id', 'name', 'email', 'role')->get();

    return response()->json($users);
    }

    public function deleteUser($id)
    {
        
        $authUser = Auth::user();

        
        if (!$authUser || $authUser->role !== User::ROLE_SUPERADMIN) {
            return response()->json(['HIBA' => 'Nincs jogosultsága ehhez a művelethez!'], 403);
        }

        
        $user = User::find($id);

        if (!$user) {
            return response()->json(['HIBA' => 'Felhasználó nem található.'], 404);
        }

        if ($user->role === User::ROLE_SUPERADMIN) {
            return response()->json(['HIBA' => 'Szuperadmin nem törölhető!'], 403);
        }

        
        $user->delete();

        return response()->json(['message' => 'Felhasználó törölve lett.']);
       
       
        
    }

}
