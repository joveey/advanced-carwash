<?php
namespace Database\Seeders;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\UserSeeder; // <-- TAMBAHKAN BARIS INI

    class DatabaseSeeder extends Seeder
    {
        /**
         * Seed the application's database.
         */
        public function run(): void
        {
            $this->call([
                UserSeeder::class,
                // tambahkan seeder lain di sini jika ada
            ]);
        }
    }
    

