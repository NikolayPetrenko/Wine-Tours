<?php
class Application_Model_Partners extends Zend_Db_Table_Abstract
{
	protected $_name = 'partners';
	
	public function addPartner($user, $region)
	{
		$data = array(
			'user'	=> $user, 
			'region'=> $region
		);
		
		$this->insert($data);
	}
	
	public function isExistUser()
	{
		$res = $this	->select()
					->from($this->_name)
					->where('user = ?', Zend_Auth::getInstance()->getIdentity()->id )
					;
		if(count($this->fetchAll($res)) > 0){
			return true;
		}else{
			return false;
		}
	}

	public function getUserRegions($user)
	{
		$res = $this	->select()
					->setIntegrityCheck(false)
					->from(array('par' => 'partners'), array())
					->join(array('reg' => 'ass_regions'), 'par.region = reg.id', array('id'))
					->where('par.user = ?', $user)
					;
		return $this->fetchAll($res);
	}
	
	public function getRegionUsers($region)
	{
		$res = $this	->select()
					->setIntegrityCheck(false)
					->from(array('par' => 'partners'), array())
					->join(array('usr' => 'users'), 'par.user = usr.id', array('id', 'name', 'email'))
					->where('par.region = ?', $region)
					;
		return $this->fetchAll($res);
	}

	public function deleteByUser($user)
	{
		$this->delete('user = ' . $user);
	}

	public function deleteByRegion($region)
	{
		$this->delete('region = ' . $region);
	}	
}