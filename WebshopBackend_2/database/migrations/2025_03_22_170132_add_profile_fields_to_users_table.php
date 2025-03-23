<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up()
{
    Schema::table('users', function (Blueprint $table) {
        $table->string('first_name')->nullable();
        $table->string('last_name')->nullable();
        $table->date('birth_date')->nullable();
        $table->string('phone_number')->nullable();
        $table->string('postal_code')->nullable();
        $table->string('city')->nullable();
        $table->string('street')->nullable();
        $table->string('house_number')->nullable();
        $table->string('floor')->nullable();
        $table->string('door')->nullable();
    });
}

public function down()
{
    Schema::table('users', function (Blueprint $table) {
        $table->dropColumn([
            'first_name', 'last_name', 'birth_date',
            'phone_number', 'postal_code', 'city',
            'street', 'house_number', 'floor', 'door'
        ]);
    });
}
};