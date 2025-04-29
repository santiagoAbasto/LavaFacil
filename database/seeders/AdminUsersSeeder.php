<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminUsersSeeder extends Seeder
{
    public function run(): void
    {
        $admins = [
            ['name' => 'Santy', 'email' => 'santy19abasto@gmail.com', 'password' => 'admin123'],
            ['name' => 'Deimar', 'email' => 'deimaralexr@gmail.com', 'password' => 'admin1234'],
            ['name' => 'Rinaldo', 'email' => 'Rinaldo@admin.com', 'password' => '123456'],
        ];

        foreach ($admins as $admin) {
            User::updateOrCreate(
                ['email' => $admin['email']],
                [
                    'name' => $admin['name'],
                    'password' => Hash::make($admin['password']),
                    'rol' => 'admin',
                ]
            );
        }
    }
}
