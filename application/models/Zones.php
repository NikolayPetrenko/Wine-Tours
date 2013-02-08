<?php 
class Application_Model_Zones extends Zend_Db_Table_Abstract 
{
	protected $_name = 'time_zone';
	
	public function getZone($id)
	{
		$id = (int)$id;
		$row = $this->fetchRow('id = ' . $id);
		if (!$row) {
			throw new Exception("Count not find row $id");
		}
		return $row->toArray();
	}
}