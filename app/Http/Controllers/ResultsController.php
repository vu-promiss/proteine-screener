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
      
      if ($request->has('name')) {
          $result->answers = $request->input('name');
          $result->save();
      }
    }
    
    public function get(Result $result)
    {
       dd($result->all());
    }
    
    public function export(Result $result)
    {
        $result = $result->all();
        $this->createCsv($result, 'results');
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
            $csv->insertOne($data->toArray());
        }

        $csv->output($tableName . '.csv');

    }

    //
}
