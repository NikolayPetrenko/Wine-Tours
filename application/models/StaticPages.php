<?php 
class Application_Model_StaticPages extends Zend_Db_Table_Abstract 
{
	protected $_name = 'static_pages';
	
	public function getPageById($id)
	{
		$res = $this->select()
					->from($this->_name)
					->where('id = ?', $id)
					;
		return $this->fetchRow($res);
	}
	
	public function getAllPages()
	{
		$res = $this	->select()
					->from($this->_name)
					;
		return $this->fetchAll($res);
	}
	
	public function updatePage($id, $text)
	{
		$data = array('text' => $text);
		
		$where['id = ?'] = (int)$id;
		$this->update($data, $where);
	}
}