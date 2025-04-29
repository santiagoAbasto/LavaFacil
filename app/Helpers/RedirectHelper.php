<?php

namespace App\Helpers;

class RedirectHelper
{
    public static function redirectByRole($user)
    {
        return match ($user->rol) {
            'admin' => '/admin/dashboard',
            'cliente' => '/cliente/dashboard',
            default => '/',
        };
    }
}
