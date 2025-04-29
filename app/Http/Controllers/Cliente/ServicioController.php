<?php

namespace App\Http\Controllers\Cliente;

use App\Http\Controllers\Controller;
use App\Models\Servicio;
use Inertia\Inertia;

class ServicioController extends Controller
{
    public function index()
    {
        $servicios = Servicio::all();

        return Inertia::render('Cliente/Servicios', [
            'servicios' => $servicios,
        ]);
    }
}
