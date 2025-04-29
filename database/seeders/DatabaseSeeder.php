<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Opcional: eliminar este usuario de prueba si no lo usás
        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // Seeders principales
        $this->call([
            AdminUsersSeeder::class,
            ServicioSeeder::class,
        ]);
    }
}
