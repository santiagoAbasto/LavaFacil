<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    protected $fillable = ['user_id', 'estado', 'fecha_recojo', 'fecha_entrega', 'total'];

    public function cliente()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function detallePedidos()
    {
        return $this->hasMany(DetallePedido::class);
    }

    public function pago()
    {
        return $this->hasOne(Pago::class);
    }
}
