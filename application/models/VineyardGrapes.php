<?php
class Application_Model_VineyardGrapes extends Zend_Db_Table_Abstract
{
	protected $_name = 'vineyard_grapes';
	
	public function getVineyard_grapes($id)
	{
		$id = (int)$id;
		$row = $this->fetchRow('id = ' . $id);
		if (!$row) {
			throw new Exception("Count not find row $id");
		}
		return $row->toArray();
	}
	
	public function addVineyardGrape($vineyard, $grape)
	{
		$data = array(
			'vineyard'	=> $vineyard, 
			'grape'		=> $grape
		);
		$this->insert($data);
	}

	public function deleteGrapesByVineyardId($vineyard)
	{
		$this->delete('vineyard = ' . $vineyard);
	}
}