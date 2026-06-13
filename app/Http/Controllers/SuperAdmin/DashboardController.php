<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Pedido;
use App\Models\Pago;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalUsuarios = User::count();
        $totalClientes = User::where('rol', 'cliente')->count();
        $totalAdmins = User::where('rol', 'admin')->count();
        $totalPedidos = Pedido::count();
        $ingresosTotales = Pago::where('confirmado', true)->sum('monto');

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

        $usuariosRecientes = User::orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        $pedidosRecientes = Pedido::with('cliente')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        return Inertia::render('SuperAdmin/Dashboard', [
            'kpi' => [
                'totalUsuarios' => $totalUsuarios,
                'totalClientes' => $totalClientes,
                'totalAdmins' => $totalAdmins,
                'totalPedidos' => $totalPedidos,
                'ingresosTotales' => $ingresosTotales,
            ],
            'pedidosPorEstado' => $pedidosPorEstado,
            'ingresosPorMes' => $ingresosPorMes,
            'usuariosRecientes' => $usuariosRecientes,
            'pedidosRecientes' => $pedidosRecientes,
        ]);
    }
}
