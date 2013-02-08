<?php
class Application_Model_Modules extends Custom_DbFilter
{
	protected $_name = 'generation_modules';

	public function newModule($name, $email, $telephone, $peoples, $country, $region, $message)
	{
		$data = array(
					'name' => $name,
					'email' => $email,
					'telephone' => $telephone,
					'peoples' => $peoples,
					'country' => $country,
					'region' => $region,
					'message' => $message,
					'date'	 => time(), 
					'type' => 0
				);

		$this->insert($data);
	}
	
	public function getModules($date)
	{
		$res = $this->select()
					->from($this->_name)
					->order('type ASC')
					->order('date ' . $date)
					;
		return $this->fetchAll($res);
	}
	
	public function getModulesByType($date, $type)
	{
		$res = $this->select()
					->from($this->_name)
					->where('type = ?', $type)
					->order('date ' . $date)
					;
		return $this->fetchAll($res);
	}
	
	public function getModuleById($id)
	{
		$res = $this->select()
					->from($this->_name)
					->where('id = ?', $id)
					;
		return $this->fetchRow($res);
	}
	
	public function updateModule($id)
	{
		$data = array('type' => 1);
		
		$where['id = ?'] = (int)$id;
		$this->update($data, $where);
	}
	
	public function deleteModule($id)
	{
		$this->delete('id = ' . $id);
	}	
}