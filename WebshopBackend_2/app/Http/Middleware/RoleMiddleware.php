<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles)
    /*{
        $user = Auth::user();

        if (!$user || ($role === 'admin' && !$user->isAdmin()) || ($role === 'superadmin' && !$user->isSuperAdmin())) {
            return response()->json(['error' => 'Nincs jogosultsága ehhez a művelethez!'], 403);
        }

        return $next($request);
    } */

    {
        $user = Auth::user();
        \Log::info('User Role: ' . $user->role); 
       

        // Ellenőrzi, hogy a felhasználó szerepe benne van-e a megadott szerepkörök között
        if (!$user || !in_array($user->role, $roles)) {
            return response()->json(['error' => 'Nincs jogosultsága ehhez a művelethez!'], 403);
            
        }
        
        return $next($request);
    }
}
