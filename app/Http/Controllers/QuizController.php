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
          // todo: check if reg_id is already in db
          $result->reg_id = $request->reg_id;
      }
      
      // Generate unique_id
      $result->unique_id = md5($_SERVER['REMOTE_ADDR'] . time());
      $result->save();
      
      return response()->json(['unique_id' => $result->unique_id]);
    }
  
}
