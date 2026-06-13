<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminUsersSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            ['name' => 'Santy', 'email' => 'santy19abasto@gmail.com', 'password' => 'admin123', 'rol' => 'super_admin'],
            ['name' => 'Deimar', 'email' => 'deimaralexr@gmail.com', 'password' => 'admin1234', 'rol' => 'admin'],
            ['name' => 'Rinaldo', 'email' => 'rinaldo@admin.com', 'password' => '123456', 'rol' => 'admin'],
        ];

        foreach ($users as $data) {
            User::updateOrCreate(
                ['email' => $data['email']],
                [
                    'name' => $data['name'],
                    'password' => Hash::make($data['password']),
                    'rol' => $data['rol'],
                ]
            );
        }
    }
}
