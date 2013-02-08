<?php 
class Application_Model_TopRegions extends Zend_Db_Table_Abstract 
{
	protected $_name = 'top_regions';
	
	public function isIpExist($region, $ip)
	{
		$res = $this->select()
					->from($this->_name)
					->where('ip = ?', $ip)
					->where('region = ?', $region)
					;
		if($this->fetchRow($res)) {
			return true;
		} else {
			return false;
		}
	}
	
	public function getTopRegions()
	{
		$res = $this	->select()
					->from($this->_name, array('region', 'continent', 'COUNT(region) AS count'))
					->group('region')
					->order('continent DESC')
					->order('count DESC')
//					->having('count > 3')
					->limit('40')
					;
		return $this->fetchAll($res);
	}
	
	public function getTopRegionsByContinent($continent)
	{
		$res = $this	->select()
					->setIntegrityCheck(false)
					->from(array('top' => $this->_name), array('region', 'continent', 'COUNT(top.region) AS count'))
					->join(array('reg' => 'ass_regions'), 'top.region = reg.id', array('alias', 'name'))
					->join(array('c' => 'countries'), 'c.code = reg.country', array('country_alias' =>'alias'))
					->where('top.continent = ?', $continent)
					->group('region')
					->order('count DESC')
					->having('top.continent = ?', $continent)
					->limit('7')
					;
		return $this->fetchAll($res)->toArray();
	}
	
	public function addRegion($region, $ip, $continent)
	{
		$data = array(
					 'region'	=> $region,
					 'ip'		=> $ip,
					 'continent' => $continent
				);
		$this->insert($data);
	}
}