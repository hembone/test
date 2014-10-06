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

	public function get($table)
	{

	}

	public function get_by_id($table, $id)
	{

	}

	public function insert($table, $id, $data)
	{

	}

	public function update($table, $id, $data)
	{

	}

	public function update_by_id($table, $id, $data)
	{

	}

	public function query($query)
	{

	}

}
?>
