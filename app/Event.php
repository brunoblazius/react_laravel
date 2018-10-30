<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
  protected $fillable = ['name', 'description'];

  public function tickets()
  {
    return $this->hasMany(Ticket::class);
  }
}
