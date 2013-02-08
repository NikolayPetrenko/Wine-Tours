<?php
class Application_Model_Corrects extends Custom_DbFilter
{
	protected $_name = 'corrects';

	public function newCorrect($listing, $loc_y, $loc_z, $individuals, $visits, $groups, $appointment, $spoken, $tasting,  $tour, $sales, $workshops, $restaurant, $accommodation, $weddings, $seminars, $vintage, $comment)
	{
		$data = array(
					'listing' => $listing,
					'loc_y' => $loc_y,
					'loc_z' => $loc_z,
					'individuals' => $individuals,
					'visits' => $visits,
					'groups' => $groups,
					'appointment' => $appointment,
					'spoken' => !empty($spoken) ? serialize($spoken) : '',
					'tasting' => $tasting,
					'tour' => $tour,
					'sales' => $sales,
					'workshops' => $workshops,
					'restaurant' => $restaurant,
					'accommodation' => $accommodation,
					'weddings' => $weddings,
					'seminars' => $seminars,
					'vintage' => !empty($vintage) ? serialize($vintage) : '',
					'user' => Zend_Auth::getInstance()->getIdentity()->id,
					'comment' => $comment,
					'status' => 0
				);

		$this->insert($data);
	}
	
	public function getCorrectsByPartner()
	{
		$this	->_query
				->setIntegrityCheck(false)
				->from(array('cor' => 'corrects'), array())
				->join(array('v' => 'vineyards'), 'cor.listing = v.id', array())
				->join(array('par' => 'partners'), 'par.region = v.ass_region', array())
				->where('par.user = ?', Zend_Auth::getInstance()->getIdentity()->id)
				;
		return $this->_getAll();
	}
	
	public function getCorrectsByUser()
	{
		$this	->_query
				->setIntegrityCheck(false)
				->from(array('cor' => 'corrects'), array())
				->join(array('v' => 'vineyards'), 'cor.listing = v.id', array())
				->where('v.user = ?', Zend_Auth::getInstance()->getIdentity()->id)
				;
		return $this->_getAll();
	}
	
	public function getCorrects()
	{
		$this	->_query
				->from($this->_name)
				;
		return $this->_getAll();
	}
	
	public function addFilterByStatus($status)
	{
		$this->_query ->where('status = ?', $status);
		return $this;
	}
	
	public function addFilterByStatusUser($status)
	{
		$this->_query ->where('cor.status = ?', $status);
		return $this;
	}
		
	public function correctByListing($listing)
	{
		$res = $this->select()
					->from($this->_name)
					->where('listing = ?', $listing)
					;
		return $this->fetchRow($res);
	}
	
	public function correctById($id)
	{
		$res = $this->select()
					->from($this->_name)
					->where('id = ?', $id)
					;
		return $this->fetchRow($res);
	}
	
	public function updateStatus($id, $status)
	{
		$data = array('status' => $status);
		
		$where['id = ?'] = (int)$id;
		$this->update($data, $where);
	}
//	
//	public function deleteCorrect($id)
//	{
//		$this->delete('id = ' . $id);
//	}	
}