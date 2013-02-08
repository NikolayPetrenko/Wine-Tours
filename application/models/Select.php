<?php
class Application_Model_Select extends Custom_DbFilter
{
	protected $_name = 'wines';
	
	public function getResult($limit, $offset = false)
	{
			$this	->_query
					->setIntegrityCheck(false)
					->from('all')
					->limit($limit, $offset)
					->order('type DESC')
					->group('name')
					;
		return $this->_getAll();
	}
	
	public function getResultCount()
	{
			$this	->_query
					->setIntegrityCheck(false)
					->from('all', array('COUNT(*) as count'))
					->distinct('name')
//					->group('name')
					;
		return $this->_getAll();
	}
	
	public function addFilterByRegion($reg)
	{
		$this ->_query
			   ->where('region = ?', $reg)
			   ->orWhere('pid = ?', $reg)
			   ;
		return $this;
	}
	
	public function addFilterByCountry($code)
	{
		$this->_query ->where('country = ?', $code);
		return $this;
	}
	
	public function addFilterByVineyardWine()
	{
		$this->_query 
			   ->where('type != ?', 'region')
			   ;
		return $this;
	}
	
	public function addFilterByWine()
	{
		$this->_query ->where('type != ?', 'wine');
		return $this;
	}
	
	public function addFilterByClaim($claim)
	{
		$this->_query 
			   ->where('claim != ?', $claim)
			   ;
		return $this;
	}
		
	public function addFilterByStatus($status)
	{
		$this->_query 
			   ->where('status != ?', $status)
			   ;
		return $this;
	}
		
	public function addFilterByNotVineyard()
	{
		$this->_query ->where('type != ?', 'vin');
		return $this;
	}
	
	public function addFilterByReg()
	{
		$this->_query ->where('type != ?', 'region');
		return $this;
	}

	public function addFilterName($name)
	{
//		$this->_query->where('name LIKE ?', '%'.$name.'%');
		$this->_query->where( "name LIKE '%".$name."%'" . " OR " . "country_name LIKE '%".$name."%'" . " OR " . "region_name LIKE '%".$name."%'");
		return $this;
	}
	
	public function addFilterByVineyard()
	{
		$this->_query ->where('type != ?', 'vin');
		return $this;
	}
	
	public function addFilterByContinent($id)
	{
		$this->_query ->where('continent = ?', $id);
		return $this;
	}	
}