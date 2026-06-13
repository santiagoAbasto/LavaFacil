<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pedido;
use App\Models\Pago;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PedidoController extends Controller
{
    public function index(Request $request)
    {
        $estado = $request->input('estado');

        $query = Pedido::with('cliente', 'detallePedidos.servicio', 'pago')
            ->orderBy('created_at', 'desc');

        if ($estado) {
            $query->where('estado', $estado);
        }

        $pedidos = $query->get();

        return Inertia::render('Admin/Pedidos', [
            'pedidos' => $pedidos,
            'estadoActual' => $estado,
        ]);
    }

    public function actualizarEstado(Request $request, $id)
    {
        $pedido = Pedido::findOrFail($id);

        $transiciones = [
            'pendiente' => 'en_proceso',
            'en_proceso' => 'entregado',
        ];

        if (isset($transiciones[$pedido->estado])) {
            $nuevoEstado = $transiciones[$pedido->estado];
            $pedido->estado = $nuevoEstado;

            if ($nuevoEstado === 'entregado') {
                $pedido->fecha_entrega = now();
            }

            $pedido->save();
        }

        return redirect()->route('admin.pedidos')->with('success', 'Estado del pedido actualizado.');
    }

    public function registrarPago(Request $request, $id)
    {
        $request->validate([
            'metodo' => 'required|in:efectivo,qr,transferencia',
            'monto' => 'required|numeric|min:1',
        ]);

        $pedido = Pedido::findOrFail($id);

        Pago::create([
            'pedido_id' => $pedido->id,
            'metodo' => $request->metodo,
            'monto' => $request->monto,
            'confirmado' => true,
        ]);

        return redirect()->route('admin.pedidos')->with('success', 'Pago registrado correctamente.');
    }
}
