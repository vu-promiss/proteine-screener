<?php

$router->get('/', function () use ($router) {
    return $router->app->version();
});

//$router->get('/results', 'ResultsController@store');


$router->post('/api/results', 'ResultsController@store');
$router->get('/api/export', 'ResultsController@export');
