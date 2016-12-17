<?php

/**
 * Description of UserControllder
 *
 * @author vien  <vienpham202@gmail.com>
 */
class UserController {

    protected $ci;

    //Constructor
    public function __construct(ContainerInterface $ci) {
        $this->ci = $ci;
    }

    public function method1($request, $response, $args) {
        //your code
        //to access items in the container... $this->ci->get('');
    }

    public function method2($request, $response, $args) {
        //your code
        //to access items in the container... $this->ci->get('');
    }

    public function method3($request, $response, $args) {
        //your code
        //to access items in the container... $this->ci->get('');
    }

}
