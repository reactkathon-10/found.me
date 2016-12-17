<?php

//// Routes
//$app->get('/[{name}]', function ($request, $response, $args) {
//    // Sample log message
//    $this->logger->info("Slim-Skeleton '/' route");
//
//    // Render index view
//    return $this->renderer->render($response, 'index.phtml', $args);
//});

$app->get('/users', function ($request, $response, $args) {
    $sth = $this->db->prepare("SELECT * FROM user ORDER BY id");
    $sth->execute();
    $todos = $sth->fetchAll();
    return $this->response->withJson($todos);
});


// Add a new user
$app->post('/user', function ($request, $response) {
    $input = $request->getParsedBody();

    var_dump($input);
    exit;
    $sql = "INSERT INTO tasks (task) VALUES (:task)";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("task", $input['task']);
    $sth->execute();
    $input['id'] = $this->db->lastInsertId();
    return $this->response->withJson($input);
});

// Add a new user
$app->get('/user/[{code}]', function ($request, $response, $args) {
    $code = trim($args['code']);
    $sth = $this->db->prepare("SELECT * FROM user WHERE user_code=:code");
    $sth->bindParam("code", $code);
    $sth->execute();
    $todos = $sth->fetchObject();
    return $this->response->withJson($todos);
});

