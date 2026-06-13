<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class ClienteSeeder extends Seeder
{
    public function run(): void
    {
        $nombres = [
            'Carlos Mendoza', 'María Fernández', 'José García', 'Ana Rodríguez',
            'Luis Martínez', 'Rosa López', 'Juan Pérez', 'Carmen Torres',
            'Pedro Sánchez', 'Sofía Ramírez', 'Diego Morales', 'Valentina Ortiz',
            'Andrés Castillo', 'Gabriela Herrera', 'Fernando Vargas', 'Paula Ríos',
            'Ricardo Guzmán', 'Daniela Paredes', 'Sergio Fuentes', 'Camila Delgado',
            'Javier Peña', 'Luciana Molina', 'Gustavo Rivas', 'Fernanda Aguilar',
            'Hugo Navarro', 'Ximena Cerezo', 'Pablo Soto', 'Regina Bustos',
            'Óscar Medina', 'Alejandra Quiroga', 'Ramiro Cárdenas', 'Julieta Vaca',
            'Marco Antelo', 'Patricia Suárez', 'Fabián Lora', 'Natalia Ocampo',
            'Eduardo Cordero', 'Andrea Padilla', 'Miguel Ángel Roca', 'Katherine Soliz',
            'Adrián Hurtado', 'Brenda Montaño', 'Iván Beltrán', 'Estefanía Cuéllar',
            'Cristian Franco', 'Mónica Urquiza', 'Emilio Pinto', 'Cecilia Medrano',
            'Raúl Sandoval', 'Tania Quintero',
        ];

        $ciudades = [
            'Santa Cruz', 'La Paz', 'Cochabamba', 'Sucre', 'Tarija',
        ];

        $calles = [
            'Av. San Martín', 'Calle Bolívar', 'Av. Cristo Redentor', 'Calle 21',
            'Av. Beni', 'Calle Suárez', 'Av. Irala', 'Calle Murillo',
            'Av. Ejército Nacional', 'Calle Linares', 'Av. Monseñor Rivero',
            'Calle Ingavi', 'Av. Cañoto', 'Calle Junín', 'Av. Busch',
        ];

        $clientes = [];

        for ($i = 0; $i < 50; $i++) {
            $nombre = $nombres[$i];
            $email = strtolower(str_replace(' ', '.', $nombre)) . '@gmail.com';
            $telefono = '7' . str_pad(mt_rand(1000000, 9999999), 7, '0', STR_PAD_LEFT);

            $clientes[] = [
                'name' => $nombre,
                'email' => $email,
                'password' => Hash::make('password123'),
                'rol' => 'cliente',
                'telefono' => $telefono,
                'direccion' => $calles[array_rand($calles)] . ' #' . mt_rand(100, 9999) . ', ' . $ciudades[array_rand($ciudades)],
                'created_at' => now()->subDays(mt_rand(1, 365)),
                'updated_at' => now(),
            ];
        }

        foreach ($clientes as $data) {
            User::updateOrCreate(
                ['email' => $data['email']],
                $data
            );
        }
    }
}
