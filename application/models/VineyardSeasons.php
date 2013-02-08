<?php
class Application_Model_VineyardSeasons extends Zend_Db_Table_Abstract
{
	protected $_name = 'vineyard_seasons';
	
	public function getVineyard_seasons($id)
	{
		$id = (int)$id;
		$row = $this->fetchRow('id = ' . $id);
		if (!$row) {
			throw new Exception("Count not find row $id");
		}
		return $row->toArray();
	}
	
	public function addVineyardSeason($vineyard, $season)
	{
		$data = array(
			'vineyard'	=> $vineyard, 
			'season'	=> $season
		);
		
		$this->insert($data);
	}

	public function deleteSeasonsByVineyardId($vineyard)
	{
		$this->delete('vineyard = ' . $vineyard);
	}	
}