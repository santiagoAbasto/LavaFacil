<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pedido;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PedidoController extends Controller
{
    /**
     * Mostrar todos los pedidos, con opción de filtrar por estado.
     */
    public function index(Request $request)
    {
        $estado = $request->input('estado'); // obtener el filtro desde la URL (?estado=...)

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

    /**
     * Actualizar el estado de un pedido.
     */
    public function actualizarEstado($id)
    {
        $pedido = Pedido::findOrFail($id);

        // Lógica: pendiente -> en_proceso -> entregado
        if ($pedido->estado === 'pendiente') {
            $pedido->estado = 'en_proceso';
        } elseif ($pedido->estado === 'en_proceso') {
            $pedido->estado = 'entregado';
        }

        $pedido->save();

        return redirect()->route('admin.pedidos')->with('success', 'Estado del pedido actualizado.');
    }
}

