<?php 
class Application_Model_AlternativeSearch extends Zend_Db_Table_Abstract 
{
	protected $_name = 'alternative_search';
	
	public function isIpExist($search, $ip)
	{
		$res = $this->select()
					->from($this->_name)
					->where('ip = ?', $ip)
					->where('name = ?', $search)
					;
		if($this->fetchRow($res)) {
			return true;
		} else {
			return false;
		}		
	}
	
	public function getWordForSearch($name)
	{
		$res = $this	->select()
					->from($this->_name, array('name', 'id', 'ip', 'COUNT(name) AS count'))
					->where('name LIKE ?', '%'.$name.'%')
					->orWhere('MATCH(name) AGAINST(?)', $name.'*')
					->order('count DESC')
					->limit('5')
					->group('name')
					;
		return $this->fetchAll($res);
	}

	public function addSearch($name, $ip)
	{
		$data = array(
					 'name'	=> $name,
					 'ip'	=> $ip,
				);
		$this->insert($data);
	}
}