<?php

namespace App\Controller;

use MartynBiz\Slim3Controller\Controller;

/**
 * Description of AuthenController
 *
 * @author vien  <vienpham202@gmail.com>
 */
class AuthController extends Controller {

    /**
     */
    public function login() {
        $jsonString = $this->request->getBody();

        // begin validating inputs  
        $arrayInput = json_decode($jsonString, true);
        // var_dump($arrayInput);
        if (is_array($arrayInput) == false) {
            return $this->response->withJson(array('status' => "error"
                        , "message" => "input data is not json format "));
        }
        if (isset($arrayInput["email"]) == false || trim($arrayInput["email"]) == "") {
            return $this->response->withJson(array('status' => "error"
                        , "message" => "Email is required !"));
        }
        if (isset($arrayInput["password"]) == false || trim($arrayInput["password"]) == "") {
            return $this->response->withJson(array('status' => "error"
                        , "message" => "Password is required !"));
        }
        // clean input data
        $email = trim($arrayInput["email"]);
        $password = trim($arrayInput["password"]);

        /**
         * Data Access Block
         */
        $db = $this->get('db');
        $sth = $db->prepare("SELECT * FROM user WHERE email=:email and password=:password");

        $sth->bindParam(":email", $email);
        // hash password
        $password = md5($password);
        $sth->bindParam(":password", $password);

        $sth->execute();
        $user = $sth->fetchObject();
        /**
         * End block
         */
        //define response data structure.
        $resultData = array("status" => "sucesss", "data" => array("user" => array(), "token" => ""), "msg" => "");
        if ($user) {

            /**
             * Begin creating new token
             */
            $sql = "INSERT INTO token (user_id,token,crt_date,exp_date) VALUES (:user_id,:token,:crt_date,:exp_date)";
            $db = $this->get('db');
            $sth = $db->prepare($sql);

            //generate token
            $current = date('Y-m-d H:i:s');
            $secret = "fly-team" . $current . $email;
            $token = md5($secret);
            // bind parameter
            $sth->bindParam(":user_id", $user->{"id"});
            $sth->bindParam(":token", $token);
            $sth->bindParam(":crt_date", $current);
            $nextMonth = date('Y-m-d H:i:s', strtotime("+1 month"));
            $sth->bindParam(":exp_date", $nextMonth);
            //execute to save token.
            $sth->execute();
            /**
             * End creating new token
             */
            unset($user->{"password"});
            unset($user->{"user_code"});

            // set response data
            $resultData["data"]["user"] = $user;
            $resultData["data"]["token"] = $token;
        } else {
            $resultData["msg"] = "Wrong username or password";
        }
        return $this->response->withJson($resultData);
    }

    public function show($token) {
        
    }

}
