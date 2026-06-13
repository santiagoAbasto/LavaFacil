<?php

namespace App\Http\Controllers\Cliente;

use App\Http\Controllers\Controller;
use App\Models\Pedido;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $pedidos = Pedido::where('user_id', $user->id);
        $total = (clone $pedidos)->count();
        $enProceso = (clone $pedidos)->where('estado', 'en_proceso')->count();
        $entregados = (clone $pedidos)->where('estado', 'entregado')->count();
        $pendientes = (clone $pedidos)->where('estado', 'pendiente')->count();

        $ultimoPedido = Pedido::with('detallePedidos.servicio')
            ->where('user_id', $user->id)
            ->latest()
            ->first();

        return Inertia::render('Cliente/Dashboard', [
            'stats' => [
                'total' => $total,
                'en_proceso' => $enProceso,
                'entregados' => $entregados,
                'pendientes' => $pendientes,
            ],
            'ultimoPedido' => $ultimoPedido,
        ]);
    }
}
