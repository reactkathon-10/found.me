<?php

/**
 * Description of BaseModel
 *
 * @author vien  <vienpham202@gmail.com>
 */
class BaseModel {

    protected $db;

    public function __construct($db) {
        $this->db = $db;
    }

}
