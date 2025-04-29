<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pago extends Model
{
    protected $fillable = ['pedido_id', 'metodo', 'monto', 'confirmado'];

    public function pedido()
    {
        return $this->belongsTo(Pedido::class);
    }
}
