'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import useSWR from 'swr';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';

// Definisikan tipe data agar lebih aman
interface Service {
    id: number;
    name: string;
    base_price: string;
}

interface CarType {
    id: number;
    name: string;
    price_multiplier: string;
}

// Fungsi fetcher umum untuk SWR
const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function CreateReservation() {
    // 1. Lindungi halaman ini, hanya untuk user yang sudah login
    const { user } = useAuth({ middleware: 'auth' });
    const router = useRouter();

    // 2. State untuk menampung input dari form
    const [serviceId, setServiceId] = useState<string>('');
    const [carTypeId, setCarTypeId] = useState<string>('');
    const [reservationTime, setReservationTime] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    // 3. Ambil data services dan carTypes dari API menggunakan SWR
// Ambil data services dan carTypes HANYA JIKA 'user' sudah ada
    const { data: services, error: servicesError } = useSWR<Service[]>(user ? '/api/services' : null, fetcher);
    const { data: carTypes, error: carTypesError } = useSWR<CarType[]>(user ? '/api/car-types' : null, fetcher);

    // Fungsi untuk menghandle submit form
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await axios.post('/api/reservations', {
                service_id: serviceId,
                car_type_id: carTypeId,
                reservation_time: reservationTime,
            });
            setSuccess('Reservasi berhasil dibuat! Anda akan dialihkan...');
            // Arahkan ke halaman riwayat setelah 2 detik
            setTimeout(() => {
                router.push('/reservations/history'); // Kita akan buat halaman ini nanti
            }, 2000);
        } catch (err: any) {
            if (err.response && err.response.status === 422) {
                // Menangani error validasi dari Laravel
                setError(Object.values(err.response.data.errors).join(', '));
            } else {
                setError('Terjadi kesalahan saat membuat reservasi.');
            }
        }
    };

    if (servicesError || carTypesError) return <div>Gagal memuat data. Coba refresh halaman.</div>;
    if (!services || !carTypes || !user) return <div>Memuat...</div>;

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <form onSubmit={handleSubmit} className="p-8 bg-gray-800 rounded-lg shadow-md w-full max-w-lg">
                <h2 className="text-3xl font-bold mb-6 text-center text-white">Buat Reservasi Baru</h2>
                
                {/* Notifikasi Sukses atau Error */}
                {error && <p className="bg-red-500 text-white p-3 rounded mb-4 text-center">{error}</p>}
                {success && <p className="bg-green-500 text-white p-3 rounded mb-4 text-center">{success}</p>}

                {/* Pilihan Layanan */}
                <div className="mb-4">
                    <label htmlFor="service" className="block mb-2 text-white">Pilih Layanan</label>
                    <select
                        id="service"
                        value={serviceId}
                        onChange={(e) => setServiceId(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none"
                    >
                        <option value="" disabled>-- Pilih salah satu --</option>
                        {services.map(service => (
                            <option key={service.id} value={service.id}>
                                {service.name} (Rp {parseFloat(service.base_price).toLocaleString('id-ID')})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Pilihan Tipe Mobil */}
                <div className="mb-4">
                    <label htmlFor="carType" className="block mb-2 text-white">Pilih Tipe Mobil</label>
                    <select
                        id="carType"
                        value={carTypeId}
                        onChange={(e) => setCarTypeId(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none"
                    >
                        <option value="" disabled>-- Pilih salah satu --</option>
                        {carTypes.map(carType => (
                            <option key={carType.id} value={carType.id}>
                                {carType.name} (Pengali Harga: x{carType.price_multiplier})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Pilihan Tanggal dan Waktu */}
                <div className="mb-6">
                    <label htmlFor="reservationTime" className="block mb-2 text-white">Pilih Tanggal & Waktu</label>
                    <input
                        type="datetime-local"
                        id="reservationTime"
                        value={reservationTime}
                        onChange={(e) => setReservationTime(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none"
                    />
                </div>

                <button type="submit" className="w-full py-3 bg-blue-600 rounded-md hover:bg-blue-700 text-white font-bold">
                    Pesan Sekarang
                </button>
            </form>
        </div>
    );
}

