<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Policies\CartItemPolicy;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Request;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        RateLimiter::for('login', function (Request $request) {
            return Limit::perMinutes(1, 3)->by($request->input('email') ?: $request->ip());
        });
    }

    protected $policies = [
        CartItem::class => CartItemPolicy::class,
    ];
    
}
