<?php 
class Application_Model_Claimes extends Zend_Db_Table_Abstract 
{
	protected $_name = 'claimes';
	
	public function getWordForSearch($name)
	{
		$res = $this	->select()
					->from($this->_name, array('name', 'id', 'ip', 'COUNT(name) AS count'))
					->where('name LIKE ?', '%'.$name.'%')
					->orWhere('MATCH(name) AGAINST(?)', $name.'*')
					->group('name')
					;
		return $this->fetchAll($res);
	}
	
	public function ClaimByUser($listing)
	{
		if(!Zend_Auth::getInstance()->hasIdentity())	return 1;
		$res = $this	->select()
					->from($this->_name)
					->where('user = ?', Zend_Auth::getInstance()->getIdentity()->id)
					->where('listing = ?', $listing)
					;
		if($this->fetchRow($res)) {
			return 1;
		} else {
			return 0;
		}
	}

	public function getClaimById($id)
	{
		$res = $this->select()
					->from($this->_name)
					->where('id = ?', $id)
					;
		return $this->fetchRow($res);
	}

	public function claimByListing($listing)
	{
		$res  = $this	->select()
					->from($this->_name)
					->where('listing = ?', $listing)
					->where('status != ?', 3)
					;
		
		return $this->fetchAll($res);
	}

	public function claimesByListing($listing)
	{
		$res  = $this	->select()
					->from($this->_name)
					->where('listing = ?', $listing)
					;
		
		return $this->fetchAll($res);
	}
	
	public function addClaim($name, $number, $position, $comment, $listing)
	{
		$data = array(
					 'name'	=> $name,
					 'position'=> $position,
					 'number'=> $number,
					 'comment'=> $comment,
					 'listing'=> $listing, 
					 'user' => Zend_Auth::getInstance()->getIdentity()->id
				);
		$this->insert($data);
	}

	public function deleteClaim($id)
	{
		$this->delete('id = ' . $id);
	}

	public function updateStatus($id, $status)
	{
		$data = array(
			'status' => $status
		);
		$this->update($data, 'id = '. (int)$id);
	}
}