<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mailing_list_user', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users');
            $table->unsignedBigInteger('mailing_list_id')->nullable();
            $table->foreign('mailing_list_id')->references('id')->on('mailing_lists');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mailing_list_user');
    }
};
