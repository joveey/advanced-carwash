<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ServiceController extends Controller
{
    /**
     * Menampilkan semua data layanan.
     */
    public function index()
    {
        return Service::all();
    }

    /**
     * Menyimpan layanan baru ke database.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:services',
            'description' => 'nullable|string',
            'base_price' => 'required|numeric|min:0',
        ]);

        $service = Service::create($validatedData);

        return response()->json($service, 201);
    }

    /**
     * Menampilkan satu data layanan spesifik.
     */
    public function show(Service $service)
    {
        return $service;
    }

    /**
     * Memperbarui data layanan.
     */
    public function update(Request $request, Service $service)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('services')->ignore($service->id)],
            'description' => 'nullable|string',
            'base_price' => 'required|numeric|min:0',
        ]);

        $service->update($validatedData);

        return response()->json($service);
    }

    /**
     * Menghapus data layanan.
     */
    public function destroy(Service $service)
    {
        $service->delete();

        return response()->json(null, 204);
    }
}