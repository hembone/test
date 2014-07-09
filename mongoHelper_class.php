<?php
class mongoHelper {

	function __construct() {
		$dbhost = DBHOST;
		$dbname = DBNAME;
		$dbuser = DBUSER;
		$dbpass = DBPASS;
		//$conn = new MongoClient("mongodb://".$dbhost, array("username"=>$dbuser, "password"=>$dbpass));
		$conn = new MongoClient("mongodb://".$dbhost);
		$this->db = $conn->$dbname;
	}

	private function parse_cursor($cursor) {
		$count = $cursor->count();
		$result = [];
		if($count > 0) {
			foreach($cursor as $id=>$value) {
			    $result[] = $value;
			}
		} else {
			$result = false;
		}
		return $result;
	}

	public function get($col, $filter=array(), $fields=array()) {
		$col = $this->db->$col;
		$cursor = $col->find($filter, $fields);
		return $this->parse_cursor($cursor);
	}

	public function get_by_id($col, $id, $fields=array()) {
		$col = $this->db->$col;
		$item = $col->findOne(array('_id' => new MongoId($id)), $fields);
		return $item;
	}

	public function upsert($col, $filter=array(), $update=array()) {
		$col = $this->db->$col;
		return $col->update($filter, $update, array("upsert" => true));
	}

	public function upsert_by_id($col, $id, $update=array()) {
		$col = $this->db->$col;
		return $col->update(array('_id' => new MongoId($id)), $update, array("upsert" => true));
	}

	public function delete() {
		$col = $this->db->$col;
	}

}
?>