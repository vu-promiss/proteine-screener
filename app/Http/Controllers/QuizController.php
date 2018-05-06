<?php

namespace App\Http\Controllers;

use App\Models\Result;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }
    
    public function init(Request $request, Result $result){

      if ($request->has('reg_id')) {
          if ($result->where('reg_id', $request->reg_id)->first()){
            return response()->json(['error' => 'Session ID already used'], 400);
          }
          else{
            $result->reg_id = $request->reg_id;
          }
      }

      
      // Generate unique_id
      $result->unique_id = md5($_SERVER['REMOTE_ADDR'] . time());
      $result->save();
      
      return response()->json(['unique_id' => $result->unique_id]);
    }
  
}
