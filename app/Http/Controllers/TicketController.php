<?php

namespace App\Http\Controllers;

use App\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
  public function store(Request $request)
    {
      $validatedData = $request->validate(['title' => 'required', 'type' => 'required']);

      $ticket = Ticket::create([
        'title' => $validatedData['title'],
        'type' => $validatedData['type'],
        'event_id' => $request->event_id,
      ]);
      return $ticket->toJson();
    }

    public function markAsCompleted(Ticket $ticket)
    {
      
      $ticket->is_completed = true;
      
      $up = Ticket::where('id', $ticket->id)->update([
        'is_completed' => true
      ]);
      var_dump($up);die;



      return response()->json('Ticket updated!');
    }
}
