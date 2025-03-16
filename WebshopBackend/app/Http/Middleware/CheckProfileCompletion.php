<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckProfileCompletion
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user->first_name || !$user->last_name || !$user->phone_number || !$user->zip_code || !$user->city || !$user->street || !$user->house_number) {
            return response()->json(['error' => 'Nem tud rendelést leadni, mert nincsenek kitöltve a profiladatok.'], 400);
        }

        return $next($request);
    }
}
