<?php
class Application_Model_Seasons extends Zend_Db_Table_Abstract 
{
	protected $_name = 'seasons';
	
	public function getSeason($id)
	{
		$id = (int)$id;
		$row = $this->fetchRow('id = ' . $id);
		if (!$row) {
			throw new Exception("Count not find row $id");
		}
		return $row->toArray();
	}
	
	public function getSeasonByVineyardId($vineyard)
	{
		$res = $this->select()
					->setIntegrityCheck(false)
					->from(array('s' => 'seasons'), array('*'))
					->join(array('v_s' => 'vineyard_seasons'), 'v_s.season = s.id', array())
					->where('v_s.vineyard = ?', $vineyard)
					;
		return $this->fetchAll($res);		
	}

	public function addSeason($name, $appointment, $date1, $date2, $weeks, $time1, $time2, $notes)
	{
		$data = array(
			'name'	=> $name, 
			'appointment' => $appointment, 
			'date1'	=> strtotime($date1), 
			'date2'	=> strtotime($date2), 
			'weeks'	=> $weeks, 
			'time1'	=> $time1, 
			'time2'	=> $time2, 
			'notes'	=> $notes
		);
		
		$this->insert($data);
	}	
}