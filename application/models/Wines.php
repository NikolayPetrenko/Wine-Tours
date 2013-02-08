<?php
class Application_Model_Wines extends Custom_DbFilter 
{
	protected $_searchIndexPath;
	protected $_name = 'wines';

	public function __construct()
	{
		parent::__construct();
		$this->_searchIndexPath = APPLICATION_PATH . '/data/search-wines';
		set_time_limit(900);
		Zend_Search_Lucene_Analysis_Analyzer::setDefault(
				new Zend_Search_Lucene_Analysis_Analyzer_Common_Utf8_CaseInsensitive());
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
							->from(array('w' => 'wines'), array('name', 'id', 'image', 'type', 'grapes'))
							->join(array('v_w' => 'vineyard_wines'), 'v_w.wine = w.id', array())
							->join(array('v' => 'vineyards'), 'v_w.vineyard = v.id', array('alias', 'vineyard_name' => 'name'))
							->join(array('c' => 'countries'), 'c.code = v.country', array('country_alias' => 'alias', 'country_name' => 'name_en'))
							->join(array('r' => 'ass_regions'), 'r.id = v.ass_region', array('region_alias' => 'alias', 'region_name' => 'name'))
							->where('v.remove = ?', 0)
			);
			foreach ($words as $word) {
				$doc = new Zend_Search_Lucene_Document();
				$doc->addField(Zend_Search_Lucene_Field::keyword('id', $word['id'], 'UTF-8'));
				$doc->addField(Zend_Search_Lucene_Field::text('name', $word['name'], 'UTF-8'));
				$doc->addField(Zend_Search_Lucene_Field::text('vineyard_name', $word['vineyard_name'], 'UTF-8'));
				$doc->addField(Zend_Search_Lucene_Field::binary('ind', $word['id'], 'UTF-8'));
				$doc->addField(Zend_Search_Lucene_Field::binary('alias', $word['alias'], 'UTF-8'));
				$doc->addField(Zend_Search_Lucene_Field::binary('country_alias', $word['country_alias'], 'UTF-8'));
				$doc->addField(Zend_Search_Lucene_Field::text('country_name', $word['country_name'], 'UTF-8'));
				$doc->addField(Zend_Search_Lucene_Field::binary('image', $word['image'], 'UTF-8'));
				$doc->addField(Zend_Search_Lucene_Field::binary('type', $word['type'], 'UTF-8'));
				$doc->addField(Zend_Search_Lucene_Field::binary('region_alias', $word['region_alias'], 'UTF-8'));
				$doc->addField(Zend_Search_Lucene_Field::binary('grapes_wine', $word['grapes'], 'UTF-8'));
				$doc->addField(Zend_Search_Lucene_Field::text('region_name', $word['region_name'], 'UTF-8'));
				if(!empty($word['grapes'])) {
					$grapes = unserialize($word['grapes']);
					if(is_array($grapes)) {
						foreach ($grapes as $key => $value) {
							$doc->addField(Zend_Search_Lucene_Field::text('grapes' . $key, $value, 'UTF-8'));
						}
					}
				}				
				$index->addDocument($doc);
			}
		} catch (Zend_Search_Lucene_Exception $e) {
			 echo "<p class=\"ui-bad-message\">Indexing errors: {$e->getMessage()}</p>";
		}
		
		$index->optimize();
		return;
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

	public function getWinesIn($wines)
	{
		$this	->_query
					->setIntegrityCheck(false)
					->from(array('w' => 'wines'), array('update', 'id', 'name', 'grapes', 'vintage', 'type', 'notes', 'image'))
					->join(array('v_w' => 'vineyard_wines'), 'v_w.wine = w.id', array())
					->join(array('v' => 'vineyards'), 'v_w.vineyard = v.id', array('loc_y', 'loc_z', 'alias', 'status', 'claim', 'list_id' => 'id', 'vineyard_name' => 'name'))
					->join(array('c' => 'countries'), 'c.code = v.country', array('country' =>'name_en', 'coun_id' =>'code',  'country_alias' => 'alias'))
					->join(array('con' => 'continents'), 'con.id = v.continent', array('count_id' =>'id'))
					->join(array('r' => 'ass_regions'), 'r.id = v.ass_region', array('ass_region' => 'name', 'reg_id' => 'id',  'reg_alias' => 'alias'))
					->join(array('cit' => 'cities'), 'cit.id = v.city', array('city' => 'name', 'city_id' => 'id'))
					->where('v.remove = ?', 0)
					->where('w.id IN(?)', $wines)
					;
			return $this->_getAll();
	}
	
	public function getWine($id)
	{
		$id = (int)$id;
		$row = $this->fetchRow('id = ' . $id);
		if (!$row) {
			throw new Exception("Count not find row $id");
		}
		return $row->toArray();
	}
	
	public function newWine($name, $grapes, $type, $vintage, $image)
	{
		$data = array(
						'name'	=> $name,
						'grapes'=> $grapes,
						'type'	=> $type,
						'vintage'=> $vintage, 
						'image'   => $image,
						'alias'	 => Main::friendlyAlias($name)
				);
		
		$this->insert($data);
	}
	
	public function getWineByAlias($alias)
	{
		$res = $this	->select()
					->from($this->_name)
					->where('alias = ?', $alias)
					;
		return $this->fetchRow($res);
	}
	
	public function getWineById($id)
	{
		$res = $this	->select()
					->from($this->_name)
					->where('id = ?', $id)
					;
		return $this->fetchRow($res);
	}

	public function getWines()
	{
		$this	->_query
					->setIntegrityCheck(false)
					->from(array('w' => 'wines'), array('update', 'id', 'name', 'grapes', 'vintage', 'type', 'notes', 'image'))
					->join(array('v_w' => 'vineyard_wines'), 'v_w.wine = w.id', array())
					->join(array('v' => 'vineyards'), 'v_w.vineyard = v.id', array('loc_y', 'loc_z', 'alias', 'status', 'claim', 'list_id' => 'id', 'vineyard_name' => 'name'))
					->join(array('c' => 'countries'), 'c.code = v.country', array('country' =>'name_en', 'coun_id' =>'code',  'country_alias' => 'alias'))
					->join(array('con' => 'continents'), 'con.id = v.continent', array('count_id' =>'id'))
					->join(array('r' => 'ass_regions'), 'r.id = v.ass_region', array('ass_region' => 'name', 'reg_id' => 'id',  'reg_alias' => 'alias'))
					->join(array('cit' => 'cities'), 'cit.id = v.city', array('city' => 'name', 'city_id' => 'id'))
					->where('v.remove = ?', 0)
					;
			return $this->_getAll();
	}
	
	public function getWinesByLimit($limit, $offset = false)
	{
		$this	->_query
					->setIntegrityCheck(false)
					->from(array('w' => 'wines'), array('update', 'id', 'name', 'grapes', 'vintage', 'type', 'notes', 'image'))
					->join(array('v_w' => 'vineyard_wines'), 'v_w.wine = w.id', array())
					->join(array('v' => 'vineyards'), 'v_w.vineyard = v.id', array('loc_y', 'loc_z', 'alias', 'status', 'claim', 'list_id' => 'id', 'WINES' => 'zip'))
					->join(array('c' => 'countries'), 'c.code = v.country', array('country' =>'name_en', 'coun_id' =>'code',  'country_alias' => 'alias'))
					->join(array('con' => 'continents'), 'con.id = v.continent', array('count_id' =>'id'))
					->join(array('r' => 'ass_regions'), 'r.id = v.ass_region', array('ass_region' => 'name', 'reg_id' => 'id',  'reg_alias' => 'alias'))
					->join(array('cit' => 'cities'), 'cit.id = v.city', array('city' => 'name', 'city_id' => 'id'))
					->where('v.remove = ?', 0)
					->order('update	DESC')
					->limit($limit, $offset)
					;
			return $this->_getAll();
	}
	
	public function getWinesByVineyard($vin)
	{
		$res = $this->select()
					->setIntegrityCheck(false)
					->from(array('w' => 'wines'), array('*'))
					->join(array('v_w' => 'vineyard_wines'), 'v_w.wine = w.id', array())
					->join(array('v' => 'vineyards'), 'v_w.vineyard = v.id', array())
					->where('v.id = ?', $vin)
					;
		return $this->fetchAll($res);
	}

	public function addFilterByContinent($continent)
	{
		$this->_query ->where('v.continent = ?', $continent);
		return $this;
	}
		
	public function addFilterByCountry($country)
	{
		$this->_query ->where('v.country = ?', $country);
		return $this;
	}
		
	public function addFilterByRegion($region)
	{
		$this->_query ->where('v.ass_region = ?', $region);
		return $this;
	}
	
	public function addFilterByStatus($status)
	{
		$this->_query->where('v.status = ?', $status);
		return $this;
	}
	
	public function addFilterByClaim()
	{
		$this->_query->where('v.claim = ?', 1);
		return $this;
	}
	
	public function updateVintage($id, $vintage)
	{
		$data = array('vintage' => $vintage);
		
		$where['id = ?'] = (int)$id;
		$this->update($data, $where);
	}	
}