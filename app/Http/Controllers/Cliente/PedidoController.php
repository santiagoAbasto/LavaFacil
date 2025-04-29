<?php

namespace App\Http\Controllers\Cliente;

use App\Http\Controllers\Controller;
use App\Models\Servicio;
use App\Models\Pedido;
use App\Models\DetallePedido;
use App\Models\Pago;
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
            'fecha_recojo' => 'required|date',
            'servicios' => 'required|array|min:1',
            'servicios.*.id' => 'required|integer|exists:servicios,id',
            'servicios.*.cantidad' => 'required|integer|min:1',
            'metodo_pago' => 'required|in:efectivo,qr,transferencia',
            'monto' => 'required|numeric|min:1',
        ]);

        DB::transaction(function () use ($request) {
            $pedido = Pedido::create([
                'user_id' => Auth::id(),
                'estado' => 'pendiente',
                'fecha_recojo' => $request->fecha_recojo,
                'total' => 0, // provisional, se actualizará luego
            ]);

            $total = 0;

            foreach ($request->servicios as $s) {
                $servicio = Servicio::find($s['id']);
                $subtotal = $servicio->precio * $s['cantidad'];
                $total += $subtotal;

                DetallePedido::create([
                    'pedido_id' => $pedido->id,
                    'servicio_id' => $servicio->id,
                    'cantidad' => $s['cantidad'],
                    'subtotal' => $subtotal,
                ]);
            }

            $pedido->update(['total' => $total]);

            // Registrar el pago
            Pago::create([
                'pedido_id' => $pedido->id,
                'metodo' => $request->metodo_pago,
                'monto' => $request->monto,
                'confirmado' => true,
            ]);
        });

        return redirect()->route('cliente.servicios')->with('success', 'Pedido y pago registrados correctamente.');
    }

    public function index()
    {
        $pedidos = Pedido::with('detallePedidos.servicio', 'pago')
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Cliente/Pedidos', [
            'pedidos' => $pedidos,
        ]);
    }
}
