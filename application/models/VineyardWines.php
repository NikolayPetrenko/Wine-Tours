<?php
class Application_Model_VineyardWines extends Zend_Db_Table_Abstract
{
	protected $_name = 'vineyard_wines';
	
	public function getVineyard_wines($id)
	{
		$id = (int)$id;
		$row = $this->fetchRow('id = ' . $id);
		if (!$row) {
			throw new Exception("Count not find row $id");
		}
		return $row->toArray();
	}
	
	public function addVineyardWine($vineyard, $wine)
	{
		$data = array(
			'vineyard'	=> $vineyard, 
			'wine'		=> $wine
		);
		$this->insert($data);
	}

	public function deleteWinesByVineyardId($vineyard)
	{
		$this->delete('vineyard = ' . $vineyard);
	}	
}