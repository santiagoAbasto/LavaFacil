<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Middleware\CheckRole;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Registrar servicios de la aplicación.
     */
    public function register(): void
    {
        //
    }

    /**
     * Inicializar servicios de la aplicación.
     */
    public function boot(): void
    {
        // ✅ Prefetch de Vite para mejorar carga de assets
        Vite::prefetch(concurrency: 3);

        // ✅ Registrar middleware personalizado de roles
        app(Router::class)->aliasMiddleware('role', CheckRole::class);

        // ✅ Compartir usuario autenticado en todas las vistas de Inertia
        Inertia::share('auth', function () {
            return [
                'user' => Auth::user(),
            ];
        });

        // ✅ Compartir token CSRF en todas las vistas de Inertia
        Inertia::share('csrf_token', function () {
            return csrf_token();
        });
    }
}
