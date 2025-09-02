<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TestController;
use App\Http\Controllers\Api\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
   // Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    //layanan
    Route::apiResource('services', App\Http\Controllers\Api\ServiceController::class);

    //tipe mobil
    Route::apiResource('car-types', App\Http\Controllers\Api\CarTypeController::class);

    //reservasi
    Route::post('/reservations', [App\Http\Controllers\Api\ReservationController::class, 'store']);
    Route::get('/reservations', [App\Http\Controllers\Api\ReservationController::class, 'index']);

});