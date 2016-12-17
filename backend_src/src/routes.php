<?php

//// Routes
// create resource method for Slim::resource($route, $name)
$app->group('/users', function () use ($app) {

    $controller = new App\Controller\UserController($app);
    // define actions
    $app->post('', $controller('post'));
    $app->get('/{code}', $controller('show'));
});

/**
 * Define routes and actions for Authentication : login, 
 */
$app->group('/auth', function () use ($app) {
    $controller = new App\Controller\AuthController($app);

    // define actions.
    $app->post('/login', $controller('login'));
    $app->get('/{token}', $controller('show'));
});

