<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Servicio extends Model
{
    use HasFactory;

    protected $fillable = ['nombre', 'precio', 'requiere_peso'];

    public function detallePedidos()
    {
        return $this->hasMany(DetallePedido::class);
    }
}
