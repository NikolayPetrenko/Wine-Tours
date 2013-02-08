<?php
class Application_Model_Continents extends Zend_Db_Table_Abstract 
{
	protected $_name = 'continents';
	
	public function getContinent($id)
	{
		$res = $this	->select()
					->from($this->_name)
					->where('id = ?', $id )
					;
		return $this->fetchRow($res);
	}

	public function getAllContinents()
	{
		$res = $this	->select()
					->from($this->_name)
					;
		return $this->fetchAll($res);
	}


	public function getContinents($where)
	{
		$res = $this->select()
					->from($this->_name)
					;
		if($where === true) {
			$res ->join(array('c' => 'countries'), 'c.continent = continents.id', array())
						->joinRight(array('r' => 'ass_regions'), 'r.country = c.code', array())
						->order('name ASC')
						->distinct('r.name')
						;
		}
		
					
		return $this->fetchAll($res);

	}
}