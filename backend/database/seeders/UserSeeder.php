<?php

namespace Database\Seeders; 
use Illuminate\Database\Seeder; 
use Illuminate\Support\Facades\Hash; 
use App\Models\User;

    class UserSeeder extends Seeder
    {
        /**
         * Run the database seeds.
         */
        public function run(): void
        {
            // User Biasa
            User::create([
                'name' => 'Test User',
                'email' => 'user@example.com',
                'password' => Hash::make('password'),
                'role' => 'user',
            ]);

            // User Admin
            User::create([
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]);
        }
    }
    

