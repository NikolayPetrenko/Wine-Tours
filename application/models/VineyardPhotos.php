<?php
class Application_Model_VineyardPhotos extends Zend_Db_Table_Abstract
{
	protected $_name = 'vineyard_photos';
	
	public function getVineyard_photos($id)
	{
		$id = (int)$id;
		$row = $this->fetchRow('id = ' . $id);
		if (!$row) {
			throw new Exception("Count not find row $id");
		}
		return $row->toArray();
	}
	
	public function addVineyardPhoto($vineyard, $photo)
	{
		$data = array(
			'vineyard'	=> $vineyard, 
			'photo'		=> $photo
		);
		$this->insert($data);
	}
	
	public function deletePhotosByVineyardId($vineyard)
	{
		$this->delete('vineyard = ' . $vineyard);
	}
}