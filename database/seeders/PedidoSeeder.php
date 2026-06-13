<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Pedido;
use App\Models\DetallePedido;
use App\Models\User;
use App\Models\Servicio;

class PedidoSeeder extends Seeder
{
    public function run(): void
    {
        $clientes = User::where('rol', 'cliente')->get();
        $servicios = Servicio::all();

        if ($clientes->isEmpty() || $servicios->isEmpty()) {
            return;
        }

        $estados = ['pendiente', 'en_proceso', 'entregado'];

        for ($i = 0; $i < 200; $i++) {
            $cliente = $clientes->random();
            $servicio = $servicios->random();
            $cantidad = mt_rand(1, 5);
            $subtotal = $servicio->precio * $cantidad;

            $diasAtras = mt_rand(1, 180);
            $fechaRecojo = now()->subDays($diasAtras);
            $estado = $estados[array_rand($estados)];

            $pedido = Pedido::create([
                'user_id' => $cliente->id,
                'estado' => $estado,
                'fecha_recojo' => $fechaRecojo->format('Y-m-d'),
                'hora_recojo' => sprintf('%02d:%02d', mt_rand(8, 18), mt_rand(0, 3) * 15),
                'direccion_recojo' => $cliente->direccion ?? 'Av. Principal #100',
                'notas' => mt_rand(0, 3) > 0 ? '' : 'Sin cambio suelto',
                'fecha_entrega' => $estado === 'entregado' ? $fechaRecojo->addDays(mt_rand(1, 3))->format('Y-m-d') : null,
                'total' => $subtotal,
                'created_at' => $fechaRecojo,
                'updated_at' => $fechaRecojo,
            ]);

            DetallePedido::create([
                'pedido_id' => $pedido->id,
                'servicio_id' => $servicio->id,
                'cantidad' => $cantidad,
                'subtotal' => $subtotal,
            ]);
        }
    }
}
