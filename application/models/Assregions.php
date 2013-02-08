<?php
class Application_Model_Assregions extends Custom_DbFilter
{
	protected $_searchIndexPath;
	protected $_name = 'ass_regions';

	public function __construct()
	{
		parent::__construct();
		$this->_searchIndexPath = APPLICATION_PATH . '/data/search-regions';
		set_time_limit(900);
		Zend_Search_Lucene_Analysis_Analyzer::setDefault(
				new Zend_Search_Lucene_Analysis_Analyzer_Common_Utf8_CaseInsensitive()
		);
	}

	public function isExistVineyard($id)
	{
		$res = $this	->select()
					->setIntegrityCheck(false)
					->from(array('reg' => $this->_name), array('count(reg.name) as cnt'))
					->join(array('vin' => 'vineyards'), 'reg.id = vin.ass_region', array())
					->where('vin.ass_region = ?', $id)
					;
		if($this->fetchRow($res)->cnt > 0) {
			return TRUE;
		} else {
			return FALSE;
		}
	}
	
	public function updateIndex()
	{
		$this->recursive_remove_directory($this->_searchIndexPath, TRUE);
		
		try {
			$index = Zend_Search_Lucene::create($this->_searchIndexPath);
		} catch (Zend_Search_Lucene_Exception $e) {
			echo "<p class=\"ui-bad-message\">Failed to create the search index: {$e->getMessage()}</p>";
		}
		
		try {
			$words = $this->fetchAll(
					$this	->select()
							->setIntegrityCheck(false)
							->from(array('r' => $this->_name), array('id', 'name', 'alias', 'pid', 'image', 'local_name', 'grapes'))
							->join(array('c' => 'countries'), 'c.code = r.country', array('country_alias' => 'alias', 'country_name' => 'name_en'))
							->group('name')
			);
			$i = 0;
			foreach ($words as $word) {
				$doc = new Zend_Search_Lucene_Document();
				$doc->addField(Zend_Search_Lucene_Field::keyword('id', $word['id'], 'UTF-8'));
				$doc->addField(Zend_Search_Lucene_Field::text('name', $word['name'], 'UTF-8'));
				$doc->addField(Zend_Search_Lucene_Field::text('alias', $word['alias'], 'UTF-8'));
				if(!empty($word['local_name'])) {
					$doc->addField(Zend_Search_Lucene_Field::text('local_name', $word['local_name'], 'UTF-8'));
				}
				$doc->addField(Zend_Search_Lucene_Field::text('country_name', $word['country_name'], 'UTF-8'));
				if(!empty($word['grapes'])) {
					$grapes = unserialize($word['grapes']);
					if(is_array($grapes)) {
						foreach ($grapes as $key => $value) {
							$doc->addField(Zend_Search_Lucene_Field::text('grapes' . $key, $value, 'UTF-8'));
						}
					}
				}
				$doc->addField(Zend_Search_Lucene_Field::binary('grapes_reg', $word['grapes'], 'UTF-8'));
				$doc->addField(Zend_Search_Lucene_Field::binary('pid', $word['pid'], 'UTF-8'));
				$doc->addField(Zend_Search_Lucene_Field::binary('ind', $word['id'], 'UTF-8'));
				$doc->addField(Zend_Search_Lucene_Field::binary('image', $word['image'], 'UTF-8'));
				$doc->addField(Zend_Search_Lucene_Field::binary('country_alias', $word['country_alias'], 'UTF-8'));
				$index->addDocument($doc);
			}
		} catch (Zend_Search_Lucene_Exception $e) {
			 echo "<p class=\"ui-bad-message\">Indexing errors: {$e->getMessage()}</p>";
		}
		
		$index->optimize();
		return;
//		echo "<p class=\"ui-good-message\">
//				The search index is recreated. Words added: {$i}. <br />
//				The index is optimized.</p>";
	}
	
	public function recursive_remove_directory($directory, $empty = FALSE)
	{
		if(substr($directory, -1) == '/') {
			$directory = substr($directory, 0, -1);
		}
		if(!file_exists($directory) || !is_dir($directory)) {
			return FALSE;
		} elseif(is_readable($directory)) {
			$handle = opendir($directory);
			while (FALSE !== ($item = readdir($handle))) {
				if($item != '.' && $item != '..') {
					$path = $directory.'/'.$item;
					if(is_dir($path)) {
						$this->recursive_remove_directory($path);
					} else {
						unlink($path);
					}
				}
			}
			closedir($handle);
			if($empty == FALSE) {
				if(!rmdir($directory)) {
					return FALSE;
				}
			}
		}
		return TRUE;
	}
	
	public function search($query) 
	{
		try{
			$index = Zend_Search_Lucene::open($this->_searchIndexPath);
		} catch (Zend_Search_Lucene_Exception $e) {
			echo "Error:{$e->getMessage()}";
		}
		Zend_Search_Lucene::setResultSetLimit('10');
		Zend_Search_Lucene_Search_QueryParser::setDefaultEncoding("UTF-8");
		$userQuery = Zend_Search_Lucene_Search_QueryParser::parse($query);
		return $index->find($userQuery);
	}	
	
	public function getRegionsIn($regions)
	{
		$this	->_query
					->setIntegrityCheck(false)
					->from(array('r' => 'ass_regions'), array('*'))
					->join(array('c' => 'countries'), 'c.code = r.country', array('country_alias' => 'alias', 'country_name' => 'name_en'))
					->join(array('con' => 'continents'), 'c.continent = con.id', array('cont_id' => 'id'))
//					->where('r.pid = ?',0)
					->where('r.id IN(?)', $regions)
					;
		return $this->_getAll();		
	}
	
	public function getAssRegion($id)
	{
		$id = (int)$id;
		$row = $this->fetchRow('id = ' . $id);
		if (!$row) {
			throw new Exception("Count not find row $id");
		}
		return $row->toArray();
	}
	
	public function getContinentByRegion($id)
	{
		$res = $this	->select()
					->setIntegrityCheck(false)
					->from(array('r' => 'ass_regions'), array())
					->join(array('c' => 'countries'), 'c.code = r.country', array())
					->join(array('con' => 'continents'), 'c.continent = con.id', array('continent' => 'id'))
					->where('r.id = ?', $id)
					;
		return $this->fetchRow($res);
	}
	
	public function getAssRegionById($id)
	{
		$res = $this	->select()
					->setIntegrityCheck(false)
					->from(array('r' => 'ass_regions'), array('*'))
					->join(array('c' => 'countries'), 'c.code = r.country', array('country_alias' => 'alias', 'country_name' => 'name_en'))
					->join(array('con' => 'continents'), 'c.continent = con.id', array('cont_id' => 'id'))
					->where('r.id = ?', $id)
					->group('name')
					;
		return $this->fetchRow($res);
	}
	
	public function getAssRegions()
	{
		$res = $this	->select()
					->setIntegrityCheck(false)
					->from(array('r' => 'ass_regions'), array('*'))
					->join(array('c' => 'countries'), 'c.code = r.country', array('country_alias' => 'alias', 'country_name' => 'name_en'))
					->join(array('con' => 'continents'), 'c.continent = con.id', array('cont_id' => 'id'))
					->where('r.pid = ?',0)
					->group('name')
					->order('r.name ASC')
					;
		return $this->fetchAll($res);
	}
	
	public function getRegionsAll()
	{
		$res = $this	->select()
					->setIntegrityCheck(false)
					->from(array('r' => 'ass_regions'), array('*'))
					->join(array('c' => 'countries'), 'c.code = r.country', array('country_alias' => 'alias', 'country_name' => 'name_en'))
					->join(array('con' => 'continents'), 'c.continent = con.id', array('cont_id' => 'id'))
					->group('name')
					->order('r.name ASC')
					;
		return $this->fetchAll($res);
	}
	
	public function getRegions()
	{
		$this	->_query
					->setIntegrityCheck(false)
					->from(array('r' => 'ass_regions'), array('*'))
					->join(array('c' => 'countries'), 'c.code = r.country', array('country_alias' => 'alias', 'country_name' => 'name_en', 'REGION' => 'image'))
					->join(array('con' => 'continents'), 'c.continent = con.id', array('cont_id' => 'id'))
					->where('r.pid = ?',0)
					;
		return $this->_getAll();
	}

	public function addFilterByContinent($continent)
	{
		$this->_query ->where('c.continent = ?', $continent);
		return $this;
	}
		
	public function addFilterByCountry($country)
	{
		$this->_query ->where('r.country = ?', $country);
		return $this;
	}
	
	public function getAllRegions()
	{
		$res = $this	->select()
					->setIntegrityCheck(false)
					->from(array('r' => 'ass_regions'), array('*'))
					->join(array('c' => 'countries'), 'c.code = r.country', array())
					->join(array('con' => 'continents'), 'c.continent = con.id', array('cont_id' => 'id'))
					;
		return $this->fetchAll($res);
	}
	
	public function getAssRegionsByPidId($pid)
	{
		$this	->_query
					->setIntegrityCheck(false)
					->from(array('r' => 'ass_regions'), array('*'))
					->join(array('c' => 'countries'), 'c.code = r.country', array('country_alias' => 'alias', 'country_name' => 'name_en'))
					->join(array('con' => 'continents'), 'c.continent = con.id', array('cont_id' => 'id'))
					->where('r.pid = ?', $pid)
					;
		return $this->_getAll();
	}
	
	public function getMainRegionsByCountry($country)
	{
		$this	->_query
					->setIntegrityCheck(false)
					->from(array('r' => 'ass_regions'), array('*'))
					->join(array('c' => 'countries'), 'c.code = r.country', array('country_alias' => 'alias', 'country_name' => 'name_en'))
					->join(array('con' => 'continents'), 'c.continent = con.id', array('cont_id' => 'id'))
					->where('r.country = ?', $country)
					->where('r.pid = ?', 0)
					->group('name')
					;
		return $this->_getAll();
	}
	
	public function getAssregionsByCountryId($country)
	{
		$res = $this->select()
					->from($this->_name)
					->where('country = ?', $country)
					->group('name')
					;
		return $this->fetchAll($res);
	}

	public function getAssregionsByCountryIdIsExistVineyards($country)
	{
		$res = $this->select()
					->from(array('reg' => $this->_name), array('*'))
					->joinRight(array('vin' => 'vineyards'), 'reg.id = vin.ass_region', array())
					->where('reg.country = ?', $country)
					->where('vin.remove = ?', 0)
//					->distinct('reg.name')
					->group('reg.name')
					;
		return $this->fetchAll($res);
	}
	
	public function getAssregionsByCountryIdPid($country)
	{
		$res = $this->select()
					->from($this->_name)
					->where('country = ?', $country)
					->where('pid = ?', 0)
					->group('name')
					;
		return $this->fetchAll($res);
	}
	
	public function getAssregionsByCountryAlias($country)
	{
		$res = $this->select()
					->setIntegrityCheck(false)
					->from(array('r' => 'ass_regions'), array('*'))
					->join(array('c' => 'countries'), 'c.code = r.country', array())
					->where('c.alias = ?', $country)
					->group('name')
					->order('r.name ASC')
					;
		return $this->fetchAll($res);
	}	
	
	public function getAssregionsByContinetId($continent)
	{
		$res = $this->select()
					->setIntegrityCheck(false)
					->from(array('r' => 'ass_regions'), array('*'))
					->join(array('c' => 'countries'), 'c.code = r.country', array())
					->join(array('con' => 'continents'), 'c.continent = con.id', array())
					->where('con.id = ?', $continent)
					;
		return $this->fetchAll($res);
	}	
	
	public function getRegionByAlias($alias)
	{
		$res = $this	->select()
					->setIntegrityCheck(false)
					->from(array('r' => 'ass_regions'), array('*'))
					->join(array('c' => 'countries'), 'c.code = r.country', array('country_name' =>'name_en', 'country_alias' =>'alias'))
					->join(array('con' => 'continents'), 'con.id = c.continent', array('continent_id' =>'id', 'continent_name' => 'name'))
					->where('r.alias = ?', $alias)
					
					;
		return $this->fetchRow($res);
	}
	
	public function getRegionCoordsById($id)
	{
		$res = $this	->select()
					->from($this->_name, array('loc_y', 'loc_z'))
					->where('id = ?', $id )
					;
		return $this->fetchRow($res);		
	}

	public function getRegionById($id)
	{
		$res = $this	->select()
					->setIntegrityCheck(false)
					->from(array('r' => 'ass_regions'), array('*'))
					->join(array('c' => 'countries'), 'c.code = r.country', array('country_name' =>'name_en', 'country_alias' =>'alias'))
					->join(array('con' => 'continents'), 'con.id = c.continent', array('continent_id' =>'id', 'continent_name' => 'name'))
					->where('r.id = ?', $id )
					;
		return $this->fetchRow($res);
	}
	
	public function newRegion($name, $local_name, $country, $description, $grapes, $loc_y, $loc_z, $links, $texts, $acknowledgements,  $notes, $image)
	{
		$data = array(
						'name'	=> $name,
						'local_name'=> $local_name,
						'country'	=> $country,
						'description'=> $description,
						'grapes'=> $grapes,
						'loc_y'=> $loc_y,
						'loc_z'=> $loc_z,
						'acknowledgements'=> $acknowledgements,
						'notes'=> $notes,
						'links'=> $links, 
						'texts' => $texts,
						'alias' => Main::friendlyAlias($name), 
						'update' => time(),
						'image' => $image
				);

		$this->insert($data);
	}
	
	public function updatePid($id, $pid)
	{
		$data = array('pid'	=> $pid);
		$where['id = ?'] = $id;
		$this->update($data, $where);
	}

	public function deleteImage($id)
	{
		$data = array('image'	=> '');
		$where['id = ?'] = $id;
		$this->update($data, $where);
	}

	public function updateRegion($id, $name, $local_name, $country, $description, $grapes, $loc_y, $loc_z, $links, $texts, $acknowledgements,  $notes, $image)
	{
		$data = array(
						'name'	=> $name,
						'local_name'=> $local_name,
						'country'	=> $country,
						'description'=> $description,
						'grapes'=> $grapes,
						'loc_y'=> $loc_y,
						'loc_z'=> $loc_z,
						'acknowledgements'=> $acknowledgements,
						'notes'=> $notes,
						'links'=> $links, 
						'texts'=> $texts, 
						'alias' => Main::friendlyAlias($name), 
						'update' => time(),
						'image' => $image
				);
		$where['id = ?'] = $id;
		$this->update($data, $where);
	}
	
	public function getParentsAssregionsByCountryAlias($country)
	{
		$res = $this->select()
					->setIntegrityCheck(false)
					->from(array('r' => 'ass_regions'), array('*'))
					->join(array('c' => 'countries'), 'c.code = r.country', array())
					->where('c.alias = ?', $country)
					->where('r.pid = ?', 0)
					;
		return $this->fetchAll($res);
	}
	
//	public function search($name)
//	{
//		$res = $this	->select()
//					->from($this->_name)
//					->orWhere('name LIKE ?', '.'.$name.'.')
//					->where('MATCH(name) AGAINST(?)', '.'.$name.'.')
//					->order('name ASC')
//					;
//		return $this->fetchAll($res);
//	}

	public function getRegionsNoParters()
	{
		$res = $this->select()
					->setIntegrityCheck(false)
					->from(array('r' => 'ass_regions'), array('*'))
					->joinLeft(array('par' => 'partners'), 'par.region = r.id', array('user'))
					->where('r.pid = ?', 0)
					;
		return $this->fetchAll($res);
	}
	
	public function deleteRegionByCountry($id)
	{
		$data = array(
						'country' => '0'
				);
		$where['id = ?'] = $id;
		$this->update($data, $where);
	}
	
	public function deleteRegion($id)
	{
		$this->delete('id = ' . $id);
	}	
}