<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\RoleMiddleware;
use App\Http\Middleware\EnsureProfileIsComplete;

return Application::configure(basePath: dirname(__DIR__))

    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->api('throttle:api');
        $middleware->api(\Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class);
    
         $middleware->alias([

        'ensure.profile.complete' => EnsureProfileIsComplete::class,
        'role' => RoleMiddleware::class,
        

            
        ]);
    })
    

    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
