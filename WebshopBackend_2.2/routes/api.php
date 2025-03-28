<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\AuthController; 
use App\Http\Middleware\RoleMiddleware; 
use App\Http\Controllers\OrderController;  
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\EnsureProfileIsComplete;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::apiResource('products', ProductController::class); // Viktornak: ugyanazokat a route-okat használja u.n. route model binding 

// Regisztráció, bejelentkezés, kijelentkezés
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

// User
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/cart', [CartController::class, 'addToCart']);
    Route::get('/cart', [CartController::class, 'viewCart']);
    Route::delete('/cart/{cartItem}', [CartController::class, 'destroy']);
});

// Admin műveletek
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{product}', [ProductController::class, 'update']);
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);
});

// Szuperadmin műveletek
Route::middleware(['auth:sanctum', 'role:superadmin'])->group(function () {
    Route::post('/set-admin', [AuthController::class, 'setAdmin']);
    Route::get('/users', [AuthController::class, 'listUsers']);
    Route::delete('/users/{id}', [AuthController::class, 'deleteUser']);
    Route::post('/revoke-admin', [AuthController::class, 'revokeAdmin']);// Admin jogosultság visszavonása
});


    


// Kosár
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::put('/cart/{cartItem}', [CartController::class, 'update']);
    Route::delete('/cart/{cartItem}', [CartController::class, 'destroy']);
    Route::delete('/cart', [CartController::class, 'clear']);
    Route::get('/cart-item-count', [CartController::class, 'getCartItemCount']);
});

//Orders

Route::middleware('auth:sanctum')->get('/orders', [OrderController::class, 'getOrders']);
Route::middleware('auth:sanctum')->put('/orders/{id}/status', [OrderController::class, 'updateOrderStatus']);
Route::middleware(['auth:sanctum', 'ensure.profile.complete'])->post('/order', [OrderController::class, 'store']); 


//Profile
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::put('/profile/password', [ProfileController::class, 'updatePassword']);
    Route::delete('/profile', [ProfileController::class, 'deleteAccount']);
});


