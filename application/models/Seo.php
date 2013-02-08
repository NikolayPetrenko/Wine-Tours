<?php 
class Application_Model_Seo extends Zend_Db_Table_Abstract 
{
	protected $_name = 'seo';
	
	public function getSeoById($id)
	{
		$res = $this->select()
					->from($this->_name)
					->where('id = ?', $id)
					;
		return $this->fetchRow($res);
	}
	
	public function getAllSeo()
	{
		$res = $this	->select()
					->from($this->_name)
					;
		return $this->fetchAll($res);
	}
	
	public function updateSeo($data)
	{
		$where['id = ?'] = (int)$data['id'];
		$this->update($data, $where);
	}
}