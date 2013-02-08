<?php
class Application_Model_Grapes extends Zend_Db_Table_Abstract 
{
	protected $_name = 'grapes';
	
	public function getGrapes()
	{
		$res = $this	->select()
					->from($this->_name)
					->order('name ASC')				
					;
		return $this->fetchAll($res);
	}
	
	public function getGrapeById($id)
	{
		$res = $this	->select()
					->from($this->_name)
					->where('id = ?', $id)
					;
		return $this->fetchRow($res);
	}

	public function newGrape($name, $other_name, $characteristics)
	{
		$data = array(
						'name'			=> $name,
						'other_name'	=> $other_name,
						'characteristics'=> $characteristics, 
						'update'		=>time()
				);
		
		$this->insert($data);
	}
	
	public function deleteGrape($id)
	{
		$this->delete('id = ' . $id);
	}
}