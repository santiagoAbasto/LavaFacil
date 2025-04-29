<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Routing\Router;
use App\Http\Middleware\CheckRole;

class MiddlewareServiceProvider extends ServiceProvider
{
    /**
     * Inicializar middlewares personalizados.
     */
    public function boot(Router $router): void
    {
        // Alias para el middleware de control de roles
        $router->aliasMiddleware('role', CheckRole::class);
    }
}
