<?php

$router->get('/', function () use ($router) {
  return 'Protein Screener Backend';
});

//$router->get('/results', 'ResultsController@store');


$router->post('/store-results', 'ResultsController@store');
$router->get('/export', 'ResultsController@export');
