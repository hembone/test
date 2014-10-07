<?php
class mysqlHelper
{

	function __construct()
	{
		$dbhost = MYSQL_HOST;
		$dbname = MYSQL_NAME;
		$dbuser = MYSQL_USER;
		$dbpass = MYSQL_PASS;

		$this->db = new PDO('mysql:host='.$dbhost.';dbname='.$dbname, $dbuser, $dbpass);
	}

	public function create_block($data)
	{
		$sql = 'INSERT INTO blocks (name, code) VALUES (:name, :code)';
		$sth = $this->db->prepare($sql);
		$sth->execute(array(
			':name'=>$data['name']
			,':code'=>$data['code']
		));
		return $this->db->lastInsertId();
	}

	public function update_block($data)
	{
		$sql = 'UPDATE blocks (name, code) VALUES (:name, :code) WHERE id = :id';
		$sth = $this->db->prepare($sql);
		$sth->execute(array(
			':name'=>$data['name']
			,':code'=>$data['code']
			,':id'=>$data['id']
		));

	}

	public function get_block_by_id($id)
	{
		$sql = 'SELECT * FROM blocks WHERE id = :id';
		$sth = $this->db->prepare($sql);
		$sth->execute(array(
			':id'=>$id
		));
		return $sth->fetch();
	}

}
?>
