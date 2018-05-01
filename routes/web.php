<?php

$router->get('/', function () use ($router) {
  return 'Protein Screener Backend';
});

//$router->get('/results', 'ResultsController@store');

$router->post('/init-quiz', 'QuizController@init');
$router->post('/store-results', 'ResultsController@store');
$router->get('/export', 'ResultsController@export');
$router->get('/stats', 'ResultsController@stats');
