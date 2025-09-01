<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TestController extends Controller
{
    /**
     * Sebuah method sederhana untuk testing API.
     */
    public function index()
    {
        return response()->json([
            'message' => 'Hello from Laravel API!'
        ]);
    }
}