<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetallePedido extends Model
{
    protected $fillable = ['pedido_id', 'servicio_id', 'cantidad', 'subtotal'];

    public function pedido()
    {
        return $this->belongsTo(Pedido::class);
    }

    public function servicio()
    {
        return $this->belongsTo(Servicio::class);
    }
}
