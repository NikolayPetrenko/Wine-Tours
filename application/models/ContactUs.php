<?php
class Application_Model_ContactUs extends Zend_Db_Table_Abstract
{
	protected $_name = 'contacts';
	
	public function addContact($name, $email, $subject, $comment)
	{
		$data = array(
			'name'		=> $name, 
			'email'		=> $email,
			'subject'	=> $subject,
			'comment'	=> $comment
		);
		
		$this->insert($data);
	}
	
	public function getContacts()
	{
		$res = $this->select()
					->from($this->_name)
					;
		return $this->fetchAll($res);
	}
	
	public function getContactById($id)
	{
		$res = $this->select()
					->from($this->_name)
					->where('id = ?', $id)
					;
		return $this->fetchRow($res);
	}	
}