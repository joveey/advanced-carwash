<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CarType;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CarTypeController extends Controller
{
    /**
     * Menampilkan semua data tipe mobil.
     */
    public function index()
    {
        return CarType::all();
    }

    /**
     * Menyimpan tipe mobil baru ke database.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:car_types',
            'price_multiplier' => 'required|numeric|min:0',
        ]);

        $carType = CarType::create($validatedData);

        return response()->json($carType, 201);
    }

    /**
     * Menampilkan satu data tipe mobil spesifik.
     */
    public function show(CarType $carType)
    {
        return $carType;
    }

    /**
     * Memperbarui data tipe mobil.
     */
    public function update(Request $request, CarType $carType)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('car_types')->ignore($carType->id)],
            'price_multiplier' => 'required|numeric|min:0',
        ]);

        $carType->update($validatedData);

        return response()->json($carType);
    }

    /**
     * Menghapus data tipe mobil.
     */
    public function destroy(CarType $carType)
    {
        $carType->delete();

        return response()->json(null, 204);
    }
}