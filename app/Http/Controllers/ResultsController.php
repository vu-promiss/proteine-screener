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
      if (!$request->has('answers')) {
          return response()->json(['error' => 'Data incomplete'], 400);
      }
      
      if (!$request->has('unique_id')) {
          return response()->json(['error' => 'Unique_id missing'], 400);
      }
      
      if (!$result = $result->where('unique_id', $request->unique_id)->first()){
        return response()->json(['error' => 'Unique_id not found'], 400);
      }

      $result->answers = json_encode($request->answers);
      $result->save();
    }
  
    public function export(Result $result)
    {
        $result = $result->all();
        $this->createCsv($result, 'proteinScreenerResults');
    }
    
    /**
    * A function to generate a CSV for a given model collection.
    *
    * @param Collection $modelCollection
    * @param $tableName
    */
    private function createCsv(Collection $modelCollection, $tableName){

        $csv = Writer::createFromFileObject(new SplTempFileObject());

        // This creates header columns in the CSV file - probably not needed in some cases.
        //$csv->insertOne(Schema::getColumnListing($tableName));

        foreach ($modelCollection as $data){
          $row = $data->toArray();
          $answers = json_decode($row['answers']);
          if(is_object($answers)){
            $csv->insertOne( (array) $answers);
          }
        }

        $csv->output($tableName . '.csv');

    }

    //
}
