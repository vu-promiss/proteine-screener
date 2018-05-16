<?php

namespace App\Http\Controllers;

use App\Models\Result;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Collection;
use League\Csv\Writer;
//use Illuminate\Support\Facades\Schema;
use SplTempFileObject;

class ResultsController extends Controller
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

    public function store(Request $request, Result $result){

      // dd($result);
      if ( ! $request->has('answers')) {
          return response()->json(['error' => 'Data incomplete'], 400);
          $result->answers = json_encode($request->answers);
      }

      if ( ! $request->has('unique_id')) {
          return response()->json(['error' => 'Unique_id missing'], 400);
      }

      if ( ! $result = $result->where('unique_id', $request->unique_id)->first()){
        return response()->json(['error' => 'Unique_id not found'], 400);
      }

      if ($request->has('reg_id')) {
          if ($result->where('reg_id', $request->reg_id)->first()){
            return response()->json(['error' => 'Session ID already used'], 400);
          }
          $result->reg_id = $request->reg_id;
      }
      
      if ($request->has('pred_prob')) {
          $result->pred_prob = floatval($request->pred_prob);
      }

      $result->save();
    }

    public function export(Result $result)
    {
        $result = $result->all();
        $this->createCsv($result, 'proteinScreenerResults');
    }

    public function stats(Result $result)
    {
        $completedCount = $result->where('answers', 'NOT LIKE', 'null')->count();
        $incompleteCount = $result->where('answers', 'LIKE', 'null')->count();
        return response()->json([
          'completed' => $completedCount,
          'incomplete' => $incompleteCount,
        ]);
    }

    /**
    * A function to generate a CSV for a given model collection.
    *
    * @param Collection $modelCollection
    * @param $tableName
    */
    private function createCsv(Collection $modelCollection, $tableName){

        $csv = Writer::createFromFileObject(new SplTempFileObject());
        $csv->setDelimiter(';');

        $header = false;
        foreach ($modelCollection as $data){
          $row = $data->toArray();
          $answers = json_decode($row['answers']);
          if (is_object($answers)) {
            // Add additional Data
            $answers->start = $row['created_at'];
            $answers->finish = $row['updated_at'];
            $answers->unique_id = $row['unique_id'];
            $answers->reg_id = $row['reg_id'];

            if (!$header) {
              $header = $csv->insertOne( array_keys( (array) $answers));
            }
            $csv->insertOne( (array) $answers);
          }
        }
        $csv->output($tableName . '.csv');

    }

    //
}
