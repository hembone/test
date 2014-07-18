<?php
class mongoHelper {

	function __construct() {
		$dbhost = MONGO_DBHOST;
		$dbname = MONGO_DBNAME;
		$dbuser = MONGO_DBUSER;
		$dbpass = MONGO_DBPASS;
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

	public function getById($col, $id, $fields=array()) {
		$col = $this->db->$col;
		$item = $col->findOne(array('_id' => new MongoId($id)), $fields);
		return $item;
	}

	public function insert($col, $data=array()) {
		$col = $this->db->$col;
		return $col->insert($data);
	}

	public function update($col, $filter=array(), $update=array()) {
		$col = $this->db->$col;
		return $col->update($filter, $update);
	}

	public function updateById($col, $id, $update=array()) {
		$col = $this->db->$col;
		return $col->update(array('_id' => new MongoId($id)), $update);
	}

	public function upsert($col, $filter=array(), $update=array()) {
		$col = $this->db->$col;
		return $col->update($filter, $update, array("upsert" => true));
	}

	public function geoNear($col, $lat, $lng, $filter=array(), $limit=1000) {
		$query = array(
			'geoNear' => $col
			,'near' => array(
				'type' => 'Point'
				,'coordinates' => array($lng, $lat)
			)
			,'maxDistance' => 321869
			,'spherical' => true
			,'query' => $filter
			,'num' => $limit
		);
		return $this->db->command($query);
	}

}
?>
