<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CarType;
use App\Models\Reservation;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReservationController extends Controller
{
    /**
     * Menampilkan riwayat reservasi milik pengguna yang sedang login.
     */
    public function index()
    {
        $reservations = Reservation::where('user_id', Auth::id())
            ->with(['service', 'carType']) // Mengambil data relasi
            ->latest() // Mengurutkan dari yang terbaru
            ->get();

        return response()->json($reservations);
    }

    /**
     * Menyimpan reservasi baru.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'service_id' => 'required|exists:services,id',
            'car_type_id' => 'required|exists:car_types,id',
            'reservation_time' => 'required|date|after:now',
        ]);

        // Ambil data service dan tipe mobil dari database
        $service = Service::findOrFail($validatedData['service_id']);
        $carType = CarType::findOrFail($validatedData['car_type_id']);

        // Hitung total harga
        $totalPrice = $service->base_price * $carType->price_multiplier;

        // Buat reservasi baru
        $reservation = Reservation::create([
            'user_id' => Auth::id(),
            'service_id' => $validatedData['service_id'],
            'car_type_id' => $validatedData['car_type_id'],
            'reservation_time' => $validatedData['reservation_time'],
            'total_price' => $totalPrice,
            'status' => 'pending', // Status awal
        ]);

        return response()->json($reservation, 201);
    }
}