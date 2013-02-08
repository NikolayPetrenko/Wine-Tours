<?php 
class Application_Model_Emails extends Zend_Db_Table_Abstract 
{
	protected $_name = 'emails';
	
	public function getTemplateById($id)
	{
		$res = $this->select()
					->from($this->_name)
					->where('id = ?', $id)
					;
		return $this->fetchRow($res);
	}
	
	public function getTemplates()
	{
		$res = $this->select()
					->from($this->_name)
					;
		return $this->fetchAll($res);
	}
	
	public function updateTemplate($content, $id)
	{
		$data = array(
						'content'=> $content
				);
		$this->update($data, 'id = '. $id);	
	}
}