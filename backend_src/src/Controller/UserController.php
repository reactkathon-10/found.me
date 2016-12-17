<?php

namespace App\Controller;

use MartynBiz\Slim3Controller\Controller;

class UserController extends Controller {

    public function index() {

        return $this->response->withJson(array("sddsf"));
    }

    public function show($code) {
        $cleanCode = trim($code);

        /**
         * Block to retrive data
         * @todo: move the block to Model class
         */
        // get DB object(dependencies) in the $app 
        $db = $this->get('db');
        $sth = $db->prepare("SELECT * FROM user WHERE user_code=:code");
        $sth->bindParam("code", $cleanCode);
        $sth->execute();
        $user = $sth->fetchObject();
        /**
         * End block
         */
        //define response data structure.
        $resultData = array("status" => "success", "data" => array());
        if ($user != false) {
            unset($user->{"password"});
            $resultData["data"] = $user;
        }
        return $this->response->withJson($resultData);
    }

    public function create() {
        return $this->render('admin/example/create.html');
    }

    /**
     * Hanlde post request to create new user.
     * @return json string
     */
    public function post() {

        $jsonString = $this->request->getBody();

        // begin validating inputs  
        $arrayInput = json_decode($jsonString, true);
        if (is_array($arrayInput) == false) {
            return $this->response->withJson(array('status' => "error"
                        , "message" => "input data is not json format "));
        }
        //@todo validator more....
        // end validating
        $acceptFields = array("user_name" => "", "password" => "", "email" => "", "full_name" => "", "address" => "");
        foreach ($acceptFields as $key => $value) {
            if (isset($arrayInput[$key])) {
                $acceptFields[$key] = $arrayInput[$key];
            }
        }
        //$diffArray = array_diff_assoc($arrayInput, $acceptFields);
        // easy to check, add more missing fields.
        // validate user name and email whether exist or not.
        if ($acceptFields["user_name"] == false || $acceptFields["password"] == false ||
                $acceptFields["email"] == false || $acceptFields["full_name"] == false) {
            return $this->response->withJson(array('status' => "error"
                        , "message" => "input data is required some fields."));
        }

        // generate user code
        $acceptFields["user_code"] = md5(uniqid() . $acceptFields["user_name"]);
        // hash password
        $acceptFields["password"] = md5(trim($acceptFields["password"]));
        // var_dump($acceptFields);
        $fieldNames = array_keys($acceptFields);
        // build denote array which contains ":<field_name>"
        $denoteFieldName = array();
        foreach ($fieldNames as $fielName) {
            $denoteFieldName[] = ":" . $fielName;
        }
        $sql = "INSERT INTO user (" . implode(",", $fieldNames) . ") VALUES (" . implode(",", $denoteFieldName) . ") ";

        // prepare data to before insert
        // get DB object(dependencies) in the $app 
        $db = $this->get('db');
        $sth = $db->prepare($sql);
        foreach ($acceptFields as $key => $value) {
            $field = ":" . $key;
            $sth->bindParam($field, $acceptFields[$key]);
        }
        $sth->execute();
        $input['id'] = $db->lastInsertId();
        return $this->response->withJson($input);
    }

    public function edit($id) {
        return $this->render('admin/example/edit.html', array(
                        // data to pass to the view
        ));
    }

    public function update($id) {
        // handle update

        return $this->redirect('/admin/example/' . $id);
    }

}
