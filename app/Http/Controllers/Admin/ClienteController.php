<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;

class ClienteController extends Controller
{
    public function index()
    {
        $clientes = User::where('rol', 'cliente')->get();

        return Inertia::render('Admin/GestionarClientes', [
            'clientes' => $clientes,
        ]);
    }
}
