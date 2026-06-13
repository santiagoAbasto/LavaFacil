<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pedidos', function (Blueprint $table) {
            $table->string('hora_recojo')->nullable()->after('fecha_recojo');
            $table->string('direccion_recojo')->nullable()->after('hora_recojo');
            $table->text('notas')->nullable()->after('direccion_recojo');
        });
    }

    public function down(): void
    {
        Schema::table('pedidos', function (Blueprint $table) {
            $table->dropColumn(['hora_recojo', 'direccion_recojo', 'notas']);
        });
    }
};
