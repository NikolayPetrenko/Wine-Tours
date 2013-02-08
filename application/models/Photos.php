<?php
class Application_Model_Photos extends Zend_Db_Table_Abstract 
{
	protected $_name = 'photos';
	
	public function getPhoto($id)
	{
		$id = (int)$id;
		$row = $this->fetchRow('id = ' . $id);
		if (!$row) {
			throw new Exception("Count not find row $id");
		}
		return $row->toArray();
	}
    
	public function updateUserStatus($reg_id)
	{
		$data = array('status' => 1);
		$where['reg_id = ?'] = (int)$reg_id;
		$where['status = ?'] = 0;
		if($this->update($data, $where) == TRUE) {
			return TRUE;
		}
	}

	public function getPhotosByVineyard($vineyard)
	{
		$res = $this	->select()
					->setIntegrityCheck(false)
					->from(array('photo' => 'photos'), array('*'))
					->join(array('v_ph' => 'vineyard_photos'), 'photo.id = v_ph.photo', array())
					->where('v_ph.vineyard = ?', $vineyard)
					;
		return $this->fetchAll($res);
	}

	public function addPhoto($name)
	{
		$data = array(
						'name' => $name
					);
		$this->insert($data);
	}
}	