<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Application;
use Inertia\Inertia;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Cliente\ServicioController;
use App\Http\Controllers\Cliente\PedidoController as ClientePedidoController;
use App\Http\Controllers\Admin\PedidoController as AdminPedidoController;

// 🌐 Página principal
Route::get('/', function () {
    if (Auth::check()) {
        $user = Auth::user();

        return match ($user->rol) {
            'admin' => redirect()->route('admin.dashboard'),
            'cliente' => redirect()->route('cliente.dashboard'),
            default => redirect()->route('welcome'),
        };
    }

    // Si no está autenticado, mostrar el Dashboard de bienvenida personalizado
    return Inertia::render('WelcomeDashboard');
})->name('welcome');

// 🔐 Rutas de autenticación (Fortify o Breeze)
require __DIR__.'/auth.php';

// ⚙️ Rutas protegidas por autenticación y verificación de email
Route::middleware(['auth', 'verified'])->group(function () {

    // 👤 Rutas para el Cliente
    Route::middleware('role:cliente')->prefix('cliente')->name('cliente.')->group(function () {
        Route::get('/', fn () => Inertia::render('Cliente/Dashboard'))->name('dashboard');

        Route::get('/servicios', [ServicioController::class, 'index'])->name('servicios');

        Route::get('/pedido/crear', [ClientePedidoController::class, 'create'])->name('pedido.create');
        Route::post('/pedido', [ClientePedidoController::class, 'store'])->name('pedido.store');

        Route::get('/pedidos', [ClientePedidoController::class, 'index'])->name('pedidos');
    });

    // 🛠️ Rutas para el Administrador
    Route::middleware('role:admin')->prefix('admin')->name('admin.')->group(function () {
        Route::get('/', fn () => Inertia::render('Admin/Dashboard'))->name('dashboard');

        Route::get('/pedidos', [AdminPedidoController::class, 'index'])->name('pedidos');
        Route::put('/pedidos/{id}/estado', [AdminPedidoController::class, 'actualizarEstado'])->name('pedidos.actualizarEstado');
    });

    // ⚙️ Perfil del Usuario (para cualquier rol)
    Route::prefix('profile')->name('profile.')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
    });
});
