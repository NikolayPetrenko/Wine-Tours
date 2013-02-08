<?php
class Application_Model_Spokens extends Zend_Db_Table_Abstract 
{
	protected $_name = 'spokens';
	
	public function getSpoken($id)
	{
		$id = (int)$id;
		$row = $this->fetchRow('id = ' . $id);
		if (!$row) {
			throw new Exception("Count not find row $id");
		}
		return $row->toArray();
	}
		
	public function getSpokenById($id)
	{
		$res = $this->select()
					->from($this->_name)
					->where('id = ?', $id)
					;
		
		return $this->fetchRow($res);		
	}
	
	public function getSpokens()
	{
		$res = $this->select()
					->from($this->_name)
					;
		
		return $this->fetchAll($res);		
	}
}