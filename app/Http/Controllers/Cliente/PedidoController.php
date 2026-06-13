<?php

namespace App\Http\Controllers\Cliente;

use App\Http\Controllers\Controller;
use App\Models\Servicio;
use App\Models\Pedido;
use App\Models\DetallePedido;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PedidoController extends Controller
{
    public function create()
    {
        $servicios = Servicio::all();

        return Inertia::render('Cliente/CrearPedido', [
            'servicios' => $servicios,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'servicio_id' => 'required|integer|exists:servicios,id',
            'cantidad' => 'required|integer|min:1',
            'fecha_recojo' => 'required|date',
            'hora_recojo' => 'nullable|string|max:10',
            'direccion_recojo' => 'required|string|max:255',
            'notas' => 'nullable|string|max:500',
        ]);

        DB::transaction(function () use ($request) {
            $servicio = Servicio::findOrFail($request->servicio_id);
            $subtotal = $servicio->precio * $request->cantidad;

            $pedido = Pedido::create([
                'user_id' => Auth::id(),
                'estado' => 'pendiente',
                'fecha_recojo' => $request->fecha_recojo,
                'hora_recojo' => $request->hora_recojo,
                'direccion_recojo' => $request->direccion_recojo,
                'notas' => $request->notas,
                'total' => $subtotal,
            ]);

            DetallePedido::create([
                'pedido_id' => $pedido->id,
                'servicio_id' => $servicio->id,
                'cantidad' => $request->cantidad,
                'subtotal' => $subtotal,
            ]);
        });

        return redirect()->route('cliente.pedidos')->with('success', 'Pedido creado correctamente.');
    }

    public function index()
    {
        $pedidos = Pedido::with('detallePedidos.servicio')
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Cliente/Pedidos', [
            'pedidos' => $pedidos,
        ]);
    }
}
