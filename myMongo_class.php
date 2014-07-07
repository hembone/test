<?php
class myMongo {

	function __construct() {
		$this->dbhost = 'localhost';
		$this->dbname = 'test';
		$this->dbuser = '';
		$this->dbpass = '';
    }
	
	private function connect() {
		//return 'hi';
		return new MongoClient("mongodb://localhost", array("username" => $this->dbuser, "password" => $this->dbpass));
		//return new MongoClient("mongodb://".$this->dbuser.":".$this->dbpass."@".$this->dbhost);
	}

	public function query() {
		$conn = $this->connect();
		return $conn;
    }

}
?>