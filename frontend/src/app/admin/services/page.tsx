'use client';

import { useAuth } from '@/hooks/useAuth';
import useSWR from 'swr';
import axios from '@/lib/axios';

// Definisikan tipe data untuk Service agar lebih aman
interface Service {
    id: number;
    name: string;
    description: string;
    base_price: string;
}

// Fungsi fetcher untuk SWR
const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function ServicesDashboard() {
    // Panggil useAuth untuk melindungi halaman ini
    const { user } = useAuth({ middleware: 'auth' });

    // Ambil data services menggunakan SWR
    const { data: services, error } = useSWR<Service[]>('/api/services', fetcher);

    if (error) return <div>Gagal memuat data</div>;
    if (!services) return <div>Memuat...</div>;
    if (!user) return <div>Memuat data pengguna...</div>; // Tampilan loading sementara user divalidasi

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manajemen Layanan</h1>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    + Tambah Layanan
                </button>
            </div>

            <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-700 text-left text-xs font-semibold uppercase tracking-wider">
                                Nama Layanan
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-700 text-left text-xs font-semibold uppercase tracking-wider">
                                Deskripsi
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-700 text-left text-xs font-semibold uppercase tracking-wider">
                                Harga Dasar
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service) => (
                            <tr key={service.id}>
                                <td className="px-5 py-5 border-b border-gray-700 text-sm">
                                    <p>{service.name}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-700 text-sm">
                                    <p>{service.description}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-700 text-sm">
                                    <p>Rp {parseFloat(service.base_price).toLocaleString('id-ID')}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}