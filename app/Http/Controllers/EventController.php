<?php

namespace App\Http\Controllers;

use App\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
  public function index()
    {
      $event = Event::where('is_completed', false)
      ->orderBy('created_at', 'desc')
      ->withCount(['tickets' => function ($query) {
        $query->where('is_completed', false);
      }])
      ->get();


      return $event->toJson();
    }

    public function store(Request $request)
    {
      $validatedData = $request->validate([
        'name' => 'required',
        'description' => 'required',
      ]);

      $event = Event::create([
        'name' => $validatedData['name'],
        'description' => $validatedData['description'],
      ]);

      return response()->json('Event created!');
    }

    public function show($id)
    {
      $event = Event::with(['tickets' => function ($query) {
        $query->where('is_completed', false);
      }])->find($id);

      return $event->toJson();
    }

    public function markAsCompleted(Event $event)
    {
      $event->is_completed = true;
      $event->update();

      return response()->json('Event updated!');
    }
}
