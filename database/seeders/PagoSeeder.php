<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Pago;
use App\Models\Pedido;

class PagoSeeder extends Seeder
{
    public function run(): void
    {
        $metodos = ['efectivo', 'qr', 'transferencia'];
        $entregados = Pedido::where('estado', 'entregado')->get();

        foreach ($entregados as $pedido) {
            Pago::create([
                'pedido_id' => $pedido->id,
                'metodo' => $metodos[array_rand($metodos)],
                'monto' => $pedido->total,
                'confirmado' => true,
                'created_at' => $pedido->fecha_entrega
                    ? \Carbon\Carbon::parse($pedido->fecha_entrega)
                    : $pedido->updated_at,
                'updated_at' => $pedido->updated_at,
            ]);
        }
    }
}
