<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pedido;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReporteController extends Controller
{
    public function index()
    {
        $pedidosPorEstado = Pedido::select('estado', DB::raw('count(*) as total'))
            ->groupBy('estado')
            ->pluck('total', 'estado');

        $pedidosPorDia = Pedido::select(DB::raw('DATE(fecha_recojo) as dia'), DB::raw('count(*) as total'))
            ->groupBy('dia')
            ->orderBy('dia')
            ->get();

        return Inertia::render('Admin/Reportes', [
            'pedidosPorEstado' => $pedidosPorEstado,
            'pedidosPorDia' => $pedidosPorDia,
        ]);
    }
}
