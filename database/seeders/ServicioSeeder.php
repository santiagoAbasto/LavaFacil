<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Servicio;

class ServicioSeeder extends Seeder
{
    public function run(): void
    {
        $servicios = [
            ['nombre' => 'Lavado común', 'precio' => 10.00, 'requiere_peso' => true],
            ['nombre' => 'Lavado delicado', 'precio' => 15.00, 'requiere_peso' => true],
            ['nombre' => 'Edredones', 'precio' => 25.00, 'requiere_peso' => false],
            ['nombre' => 'Planchado', 'precio' => 5.00, 'requiere_peso' => true],
        ];

        foreach ($servicios as $s) {
            Servicio::updateOrCreate(['nombre' => $s['nombre']], $s);
        }
    }
}
