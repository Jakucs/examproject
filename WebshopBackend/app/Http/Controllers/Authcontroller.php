<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegisterRequest;
use Illuminate\Support\Facades\Auth;

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
        $fields = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

     
        if (!Auth::attempt(['email' => $fields['email'], 'password' => $fields['password']])) {
            return response()->json(['error' => 'Hibás bejelentkezési adatok'], 401);
        }
        

     
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

        
        if ($user->role === User::ROLE_ADMIN) {
            return response()->json(['message' => 'A felhasználó már admin.'], 400);
        }

        
        $user->role = User::ROLE_ADMIN;
        $user->save();

        return response()->json(['message' => 'Felhasználó Admin jogosultságot kapott.', 'user' => $user]);
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
       
       
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);
    
            if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
                $user = Auth::user();
                $token = $user->createToken('auth_token')->plainTextToken;
    
                return response()->json([
                    'access_token' => $token,
                    'token_type' => 'Bearer',
                ]);
            }
    
            return response()->json(['message' => 'Invalid credentials'], 401);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error logging in: ' . $e->getMessage()], 500);
        }
    }

}
