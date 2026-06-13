<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Application;
use Inertia\Inertia;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Cliente\ServicioController;
use App\Http\Controllers\Cliente\DashboardController as ClienteDashboardController;
use App\Http\Controllers\Cliente\PedidoController as ClientePedidoController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\PedidoController as AdminPedidoController;
use App\Http\Controllers\Admin\ClienteController as AdminClienteController;
use App\Http\Controllers\Admin\ReporteController as AdminReporteController;
use App\Http\Controllers\SuperAdmin\DashboardController as SuperAdminDashboardController;
use App\Http\Controllers\SuperAdmin\UserController as SuperAdminUserController;

Route::get('/', function () {
    if (Auth::check()) {
        $user = Auth::user();

        return match ($user->rol) {
            'super_admin' => redirect()->route('super-admin.dashboard'),
            'admin' => redirect()->route('admin.dashboard'),
            'cliente' => redirect()->route('cliente.dashboard'),
            default => redirect()->route('welcome'),
        };
    }

    return Inertia::render('WelcomeDashboard');
})->name('welcome');

require __DIR__.'/auth.php';

Route::middleware(['auth', 'verified'])->group(function () {

    Route::middleware('role:cliente')->prefix('cliente')->name('cliente.')->group(function () {
        Route::get('/', [ClienteDashboardController::class, 'index'])->name('dashboard');
        Route::get('/servicios', [ServicioController::class, 'index'])->name('servicios');
        Route::get('/pedido/crear', [ClientePedidoController::class, 'create'])->name('pedido.create');
        Route::post('/pedido', [ClientePedidoController::class, 'store'])->name('pedido.store');
        Route::get('/pedidos', [ClientePedidoController::class, 'index'])->name('pedidos');
    });

    Route::middleware('role:admin,super_admin')->prefix('admin')->name('admin.')->group(function () {
        Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');
        Route::get('/pedidos', [AdminPedidoController::class, 'index'])->name('pedidos');
        Route::put('/pedidos/{id}/estado', [AdminPedidoController::class, 'actualizarEstado'])->name('pedidos.actualizarEstado');
        Route::post('/pedidos/{id}/pago', [AdminPedidoController::class, 'registrarPago'])->name('pedidos.registrarPago');
        Route::get('/clientes', [AdminClienteController::class, 'index'])->name('clientes');
        Route::get('/reportes', [AdminReporteController::class, 'index'])->name('reportes');
    });

    Route::middleware('role:super_admin')->prefix('super-admin')->name('super-admin.')->group(function () {
        Route::get('/', [SuperAdminDashboardController::class, 'index'])->name('dashboard');
        Route::get('/usuarios', [SuperAdminUserController::class, 'index'])->name('usuarios');
        Route::post('/usuarios', [SuperAdminUserController::class, 'store'])->name('usuarios.store');
        Route::put('/usuarios/{id}', [SuperAdminUserController::class, 'update'])->name('usuarios.update');
        Route::delete('/usuarios/{id}', [SuperAdminUserController::class, 'destroy'])->name('usuarios.destroy');
    });

    Route::prefix('profile')->name('profile.')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
    });
});
