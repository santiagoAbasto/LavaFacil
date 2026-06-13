<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pedido;
use App\Models\User;
use App\Models\Pago;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalClientes = User::where('rol', 'cliente')->count();
        $totalPedidos = Pedido::count();
        $ingresos = Pago::where('confirmado', true)->sum('monto');
        $pendientes = Pedido::where('estado', 'pendiente')->count();
        $enProceso = Pedido::where('estado', 'en_proceso')->count();
        $entregados = Pedido::where('estado', 'entregado')->count();

        $pedidosRecientes = Pedido::with('cliente')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        $pedidosPorEstado = Pedido::select('estado', DB::raw('count(*) as total'))
            ->groupBy('estado')
            ->pluck('total', 'estado');

        $ingresosPorMes = Pago::select(
            DB::raw("to_char(created_at, 'YYYY-MM') as mes"),
            DB::raw('SUM(monto) as total')
        )
            ->where('confirmado', true)
            ->groupBy('mes')
            ->orderBy('mes')
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'kpi' => [
                'totalClientes' => $totalClientes,
                'totalPedidos' => $totalPedidos,
                'ingresos' => $ingresos,
                'pendientes' => $pendientes,
                'enProceso' => $enProceso,
                'entregados' => $entregados,
            ],
            'pedidosRecientes' => $pedidosRecientes,
            'pedidosPorEstado' => $pedidosPorEstado,
            'ingresosPorMes' => $ingresosPorMes,
        ]);
    }
}
