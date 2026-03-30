<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Default Admin User
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@sekolah.edu',
            'password' => bcrypt('password'), // Or whatever default is 'password' usually for factories
        ]);

        // Default Categories
        $categories = [
            'Kebersihan',
            'Fasilitas Kelas',
            'Fasilitas Olahraga',
            'Layanan Kampus',
            'Lainnya',
        ];

        foreach ($categories as $cat) {
            \App\Models\Category::create(['name' => $cat]);
        }

        // Example Students
        \App\Models\Student::create([
            'nis' => '1234567890',
            'name' => 'John Doe',
            'class' => 'XII IPA 1',
        ]);

        \App\Models\Student::create([
            'nis' => '0987654321',
            'name' => 'Jane Smith',
            'class' => 'X IPS 2',
        ]);
    }
}
