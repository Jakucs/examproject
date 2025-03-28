<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureProfileIsComplete
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        
        $user = $request->user();
        
        // Ellenőrizze, hogy a szükséges mezők kitöltésre kerültek-e
        if (is_null($user->last_name) ||
            is_null($user->first_name) ||
            is_null($user->phone_number) || 
            is_null($user->postal_code) || 
            is_null($user->city) ||
            is_null($user->street) ||
            is_null($user->house_number) ||
            is_null($user->birth_date)) {
                
            return response()->json(['message' => 'Kérjük töltse ki az adatait, hogy leadhassa a rendelést!'], 400);
        }
        


        return $next($request);
    }
}
