<?php
class Application_Model_Cities extends Zend_Db_Table_Abstract 
{
	protected $_name = 'cities';
	
	public function getCity($id)
	{
		$id = (int)$id;
		$row = $this->fetchRow('id = ' . $id);
		if (!$row) {
			throw new Exception("Count not find row $id");
		}
		return $row->toArray();
	}
	
	public function isExist($name)
	{
		$res = $this->select()
					->from($this->_name)
					->where('name = ?', $name)
					;
		if($this->fetchRow($res)) {
			return $this->fetchRow($res)->toArray();
		} else {
			return false;
		}		
	}

	public function getCitiesByName($name)
	{
		$res = $this->select()
					->from($this->_name)
					->where('name LIKE ?', '%'.$name.'%')
					;
		return $this->fetchAll($res)->toArray();
	}
	
	public function addCity($name, $region)
	{
		$data = array(
						'name'		=> $name,
						'region'	=> $region,
					);
		$this->insert($data);
	}
}