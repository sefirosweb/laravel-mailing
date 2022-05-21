<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mailing_group_mailing_list', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('mailing_group_id')->nullable();
            $table->foreign('mailing_group_id')->references('id')->on('mailing_groups');
            $table->unsignedBigInteger('mailing_list_id')->nullable();
            $table->foreign('mailing_list_id')->references('id')->on('mailing_lists');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mailing_group_mailing_list');
    }
};
