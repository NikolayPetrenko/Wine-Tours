<?php
class Application_Model_VineyardSpokens extends Zend_Db_Table_Abstract
{
	protected $_name = 'vineyard_spokens';
	
	public function getVineyard_spokens($id)
	{
		$id = (int)$id;
		$row = $this->fetchRow('id = ' . $id);
		if (!$row) {
			throw new Exception("Count not find row $id");
		}
		return $row->toArray();
	}
	
	public function getSpokenByVineardId($vineyard)
	{
		$res = $this->select()
					->setIntegrityCheck(false)
					->from(array('v_sp' => 'vineyard_spokens'), array())
					->join(array('s' => 'spokens'), 'v_sp.spoken = s.id', array('spoken' => 'name'))
					->where('v_sp.vineyard = ?', $vineyard)
					;
		
		return $this->fetchAll($res)->toArray();
	}

	public function addVineyardSpoken($vineyard, $spoken)
	{
		$data = array(
			'vineyard'	=> $vineyard, 
			'spoken'	=> $spoken
		);
		$this->insert($data);
	}
	
	public function deleteSpokensByVineyardId($vineyard)
	{
		$this->delete('vineyard = ' . $vineyard);
	}	
}