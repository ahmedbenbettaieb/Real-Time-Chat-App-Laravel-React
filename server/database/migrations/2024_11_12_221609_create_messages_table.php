<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('conversationId');
            $table->foreign('conversationId')->references('id')->on('conversations')->onDelete('cascade');

            $table->unsignedBigInteger('senderId');
            $table->foreign('senderId')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('receiverId');
            $table->foreign('receiverId')->references('id')->on('users')->onDelete('cascade');
            $table->text('message');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('messages');
    }
}
