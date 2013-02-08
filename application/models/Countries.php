<?php
class Application_Model_Countries extends Zend_Db_Table_Abstract 
{
	protected $_searchIndexPath;
	protected $_name = 'countries';
	
	public function __construct() 
	{
		parent::__construct();
		$this->_searchIndexPath = APPLICATION_PATH . '/data/search-countries';
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
										->from(array('coun' => $this->_name), array('*'))
										->join(array('cont' => 'continents'), 'cont.id = coun.continent', array('continent' => 'name'))
						);			
			foreach ($words as $word) {
				$doc = new Zend_Search_Lucene_Document();
				$doc->addField(Zend_Search_Lucene_Field::keyword('id', $word['code'], 'UTF-8'));
				$doc->addField(Zend_Search_Lucene_Field::text('name', $word['name_en'], 'UTF-8'));
				$doc->addField(Zend_Search_Lucene_Field::text('alias', $word['alias'], 'UTF-8'));
				$doc->addField(Zend_Search_Lucene_Field::binary('image', $word['image'], 'UTF-8'));
				$doc->addField(Zend_Search_Lucene_Field::binary('continent', $word['continent'], 'UTF-8'));
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
		Zend_Search_Lucene_Search_QueryParser::setDefaultEncoding("UTF-8");
		$userQuery = Zend_Search_Lucene_Search_QueryParser::parse($query);

		return $index->find($userQuery);
	}	
	
	public function getCountry($code)
	{
		$id = (int)$id;
		$row = $this->fetchRow('code = ?' . $code);
		if (!$row) {
			throw new Exception("Count not find row $code");
		}
		return $row->toArray();
	}

	public function getCountries()
	{
		$res = $this->select()
					->from($this->_name)
					->order('name_en')
					;
		return $this->fetchAll($res);
	}

	public function getCountriesIsExReg()
	{
		$res = $this	->select()
					->setIntegrityCheck(false)
					->from(array('con' => $this->_name), array('*'))
					->joinRight(array('reg' => 'ass_regions'), 'con.code = reg.country', array())
					->distinct('con.name_en')
					->order('con.name_en')
					;
		return $this->fetchAll($res);
	}

	public function getCountriesIsExVineyards()
	{
		$res = $this	->select()
					->setIntegrityCheck(false)
					->from(array('con' => $this->_name), array('*'))
					->joinRight(array('vin' => 'vineyards'), 'con.code = vin.country', array())
					->where('vin.remove = ?', 0)
					->distinct('con.name_en')
					->order('con.name_en')
					;
		return $this->fetchAll($res);
	}	
	
	public function getCountriesByContinentId($continent)
	{
		$res = $this->select()
					->from($this->_name)
					->joinRight(array('r' => 'ass_regions'), 'r.country = countries.code', array())
					->where('countries.continent = ?', $continent)
					->order('countries.name_en ASC')
					->distinct('countries.name_en')
					;
		return $this->fetchAll($res);
	}

	public function getCountryByCode($code)
	{
		$res = $this->select()
					->from($this->_name)
					->where('code = ?', $code)
					;
		return $this->fetchRow($res);
	}

	public function getCountryCoordsByCode($code)
	{
		$res = $this->select()
					->from($this->_name, array('loc_y', 'loc_z', 'tel_code'))
					->where('code = ?', $code)
					;
		return $this->fetchRow($res);
	}	

	public function isExistVineyard($code)
	{
		$res = $this	->select()
					->setIntegrityCheck(false)
					->from(array('con' => $this->_name), array('count(name_en) as cnt'))
					->join(array('vin' => 'vineyards'), 'con.code = vin.country', array())
					->where('vin.country = ?', $code)
					;
		if($this->fetchRow($res)->cnt > 0) {
			return TRUE;
		} else {
			return FALSE;
		}
	}

	public function getCountryByAlias($alias)
	{
		$res = $this->select()
					->from($this->_name)
					->where('alias = ?', $alias)
					;
		return $this->fetchRow($res);
	}
	
	public function getCountriesByContinent($continent)
	{
		$res = $this->select()
					->from($this->_name)
					->where('countries.continent = ?', $continent)
					->order('countries.name_en ASC')
					->distinct('countries.name_en')
					;
		return $this->fetchAll($res);
	}
	
	public function updateCountry($name, $descr, $acknowledgements, $code, $notes, $loc_y, $loc_z, $image)
	{
		$data = array(
						'name_en' => $name, 
						'description' => $descr, 
						'acknowledgements' => $acknowledgements,
						'alias' => main::friendlyAlias($name), 
						'notes' => $notes, 
						'loc_y' => $loc_y, 
						'loc_z' => $loc_z,
						'image' => $image,
						'update' => time()
				);
		$where['code = ?'] = $code;
		$this->update($data, $where);
	}
	
	public function deleteCountry($code)
	{
		$this->delete('code = ' . $code);
	}	
}