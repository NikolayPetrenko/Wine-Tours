<?php
class Application_Model_Vineyards extends Custom_DbFilter
{
	protected $_searchIndexPath;
	protected $_name	= 'vineyards';

	public function __construct()
	{
		parent::__construct();
		$this->_searchIndexPath = APPLICATION_PATH . '/data/search-vineyards';
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
							->from(array('v' => $this->_name), array('alias', 'name', 'id', 'logo', 'status', 'tasting', 'tour', 'claim', 'city', 'nameloc'))
							->join(array('c' => 'countries'), 'c.code = v.country', array('country_alias' => 'alias', 'country_name' => 'name_en'))
							->join(array('r' => 'ass_regions'), 'r.id = v.ass_region', array('region_alias' => 'alias', 'region_name' => 'name'))
							->where('v.remove = ?', 0)
			);
			$i = 0;
			foreach ($words as $word) {
				$doc = new Zend_Search_Lucene_Document();
				$doc->addField(Zend_Search_Lucene_Field::keyword('id', $word['id'], 'UTF-8'));
				if(!empty($word['nameloc'])) {
					$doc->addField(Zend_Search_Lucene_Field::text('nameloc', $word['nameloc'], 'UTF-8'));
				}
				$grapes = $this->getGrapesVineyard($word['id'])->toArray();
				if(!empty($grapes)) {
					foreach($grapes as $key => $grape) {
						$doc->addField(Zend_Search_Lucene_Field::text('grape' . $key, $grape['name'], 'UTF-8'));
						$doc->addField(Zend_Search_Lucene_Field::text('other_grape' . $key, $grape['other_name'], 'UTF-8'));
					}
				}
				$wines = $this->getWinesVineyard($word['id'])->toArray();
				if(!empty($wines)) {
					foreach($wines as $key => $wine) {
						$doc->addField(Zend_Search_Lucene_Field::text('wine' . $key, $wine['name'], 'UTF-8'));
					}
				}				
				$doc->addField(Zend_Search_Lucene_Field::text('name', $word['name'], 'UTF-8'));
				$doc->addField(Zend_Search_Lucene_Field::text('city', $word['city'], 'UTF-8'));
				$doc->addField(Zend_Search_Lucene_Field::text('alias', $word['alias'], 'UTF-8'));
				$doc->addField(Zend_Search_Lucene_Field::binary('country_alias', $word['country_alias'], 'UTF-8'));
				$doc->addField(Zend_Search_Lucene_Field::text('country_name', $word['country_name'], 'UTF-8'));
				$doc->addField(Zend_Search_Lucene_Field::binary('region_alias', $word['region_alias'], 'UTF-8'));
				$doc->addField(Zend_Search_Lucene_Field::text('region_name', $word['region_name'], 'UTF-8'));
				$doc->addField(Zend_Search_Lucene_Field::binary('logo', $word['logo'], 'UTF-8'));
				$doc->addField(Zend_Search_Lucene_Field::binary('ind', $word['id'], 'UTF-8'));
				$doc->addField(Zend_Search_Lucene_Field::binary('status', $word['status'], 'UTF-8'));
				$doc->addField(Zend_Search_Lucene_Field::binary('tasting', $word['tasting'], 'UTF-8'));
				$doc->addField(Zend_Search_Lucene_Field::binary('tour', $word['tour'], 'UTF-8'));
				$doc->addField(Zend_Search_Lucene_Field::binary('claim', $word['claim'], 'UTF-8'));
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
	
	public function getVineyardsIn($vins)
	{
		 $this	->_query
				->setIntegrityCheck(false)
				->from(array('v' => 'vineyards'), array('update', 'alias', 'name', 'logo', 'list_id' => 'id', 'tasting', 'tour', 'loc_y', 'loc_z', 'status', 'claim', 'remove'))
				->join(array('c' => 'countries'), 'c.code = v.country', array('country' =>'name_en', 'coun_id' =>'code',  'country_alias' => 'alias'))
				->join(array('r' => 'ass_regions'), 'r.id = v.ass_region', array('ass_region' => 'name', 'reg_id' => 'id',  'reg_alias' => 'alias'))
				->joinLeft(array('v_s' => 'vineyard_seasons'), 'v_s.vineyard = v.id', array())
				->join(array('con' => 'continents'), 'con.id = v.continent', array('count_id' =>'id'))
				->join(array('cit' => 'cities'), 'cit.id = v.city', array('city' => 'name', 'city_id' => 'id'))
				->where('v.remove = ?', 0)
				->distinct('v.name')
				->where('v.id IN(?)', $vins)
				;
		return $this->_getAll();
	}

	public function getVineyard($alias)
	{
		$this	->_query
				->setIntegrityCheck(false)
				->from(array('v' => 'vineyards'), array('*'))
				->join(array('cit' => 'cities'), 'cit.id = v.city', array('city' => 'name'))
				->where('v.alias = ?', $alias)
				;
		
		return $this->_getRow();
	}

	public function getPhotosVineyard($id)
	{
		$res = $this	->select()
					->setIntegrityCheck(false)
					->from(array('v' => 'vineyards'), array())
					->join(array('v_ph' => 'vineyard_photos'), 'v_ph.vineyard = v.id', array())
					->join(array('ph' => 'photos'), 'ph.id = v_ph.photo', array('name'))
					->where('v_ph.vineyard = ?', $id)
					;
		
		return $this->fetchAll($res);
	}

	public function getVineyardById($id)
	{
		$res = $this	->select()
					->from($this->_name)
					->where('id = ?', $id)
					;
		return $this->fetchRow($res);
	}

	public function getCountName($name, $id = false)
	{
		$res = $this	->select()
					->from($this->_name, array('COUNT(*) as count'))
					->where('upper(name) = upper(?)', $name)
					;
		if($id) {
			$res->where('id != ?', $id);
		}
		return $this->fetchRow($res);
	}

	public function getVindByAliasId($alias, $id = false)
	{
		$res = $this	->select()
					->from($this->_name)
					->where('alias = ?', $alias)
					;
		if($id) {
			$res->where('id != ?', $id);
		}
		return $this->fetchRow($res);
	}
	
	public function getGrapesVineyard($id)
	{
		$res = $this->select()
					->setIntegrityCheck(false)
					->from(array('v' => 'vineyards'), array())
					->join(array('v_gr' => 'vineyard_grapes'), 'v_gr.vineyard = v.id', array())
					->join(array('gr' => 'grapes'), 'gr.id = v_gr.grape', array('id', 'name', 'other_name'))
					->where('v_gr.vineyard = ?', $id)
					;
		
		return $this->fetchAll($res);
	}

	public function getWinesVineyard($id)
	{
		$res = $this->select()
					->setIntegrityCheck(false)
					->from(array('v' => 'vineyards'), array())
					->join(array('v_w' => 'vineyard_wines'), 'v_w.vineyard = v.id', array())
					->join(array('w' => 'wines'), 'w.id = v_w.wine', array('*'))
					->where('v_w.vineyard = ?', $id)
					;
		
		return $this->fetchAll($res);
	}

	public function itsMyVineyard($id)
	{
		$res = $this	->select()
					->from($this->_name)
					->where('id = ?', $id)
					->where('user = ?', Zend_Auth::getInstance()->getIdentity()->id)
					;
		if($this->fetchRow($res)) {
			return true;
		} else {
			return false;
		}
	}

	public function getSpokensVineyard($id)
	{
		$res = $this->select()
					->setIntegrityCheck(false)
					->from(array('v' => 'vineyards'), array())
					->join(array('v_s' => 'vineyard_spokens'), 'v_s.vineyard = v.id', array())
					->join(array('s' => 'spokens'), 's.id = v_s.spoken', array('id', 'name'))
					->where('v_s.vineyard = ?', $id)
					;
		
		return $this->fetchAll($res);
	}
	
	
	public function getVineyards()
	{
		 $this	->_query
				->setIntegrityCheck(false)
				->from(array('v' => 'vineyards'), array('update', 'alias', 'name', 'logo', 'list_id' => 'id', 'tasting', 'tour', 'loc_y', 'loc_z', 'status', 'claim', 'remove', 'VINEYARDS' => 'zip'))
				->join(array('c' => 'countries'), 'c.code = v.country', array('country' =>'name_en', 'coun_id' =>'code',  'country_alias' => 'alias'))
				->join(array('r' => 'ass_regions'), 'r.id = v.ass_region', array('ass_region' => 'name', 'reg_id' => 'id',  'reg_alias' => 'alias'))
				->joinLeft(array('v_s' => 'vineyard_seasons'), 'v_s.vineyard = v.id', array())
				->join(array('con' => 'continents'), 'con.id = v.continent', array('count_id' =>'id'))
				->join(array('cit' => 'cities'), 'cit.id = v.city', array('city' => 'name', 'city_id' => 'id'))
				->where('v.remove = ?', 0)
				->distinct('v.name')
				;
			return $this->_getAll();
	}
	
	public function getVineyardsByLimit($limit, $offset = false)
	{
		 $this	->_query
				->setIntegrityCheck(false)
				->from(array('v' => 'vineyards'), array('update', 'alias', 'name', 'logo', 'list_id' => 'id', 'tasting', 'tour', 'loc_y', 'loc_z', 'status', 'claim', 'remove'))
				->join(array('c' => 'countries'), 'c.code = v.country', array('country' =>'name_en', 'coun_id' =>'code',  'country_alias' => 'alias'))
				->join(array('r' => 'ass_regions'), 'r.id = v.ass_region', array('ass_region' => 'name', 'reg_id' => 'id',  'reg_alias' => 'alias'))
				->joinLeft(array('v_s' => 'vineyard_seasons'), 'v_s.vineyard = v.id', array())
				->join(array('con' => 'continents'), 'con.id = v.continent', array('count_id' =>'id'))
				->join(array('cit' => 'cities'), 'cit.id = v.city', array('city' => 'name', 'city_id' => 'id'))
				->where('v.remove = ?', 0)
				 ->order('update DESC')
				->limit($limit, $offset)
				->distinct('v.name')
				;
			return $this->_getAll();
	}
	
	public function getVineyardsByAdmin()
	{
		 $this	->_query
				->setIntegrityCheck(false)
				->from(array('v' => 'vineyards'), array('update', 'alias', 'name', 'logo', 'list_id' => 'id', 'tasting', 'tour', 'loc_y', 'loc_z', 'status', 'claim', 'remove'))
				->join(array('c' => 'countries'), 'c.code = v.country', array('country' =>'name_en', 'coun_id' =>'code',  'country_alias' => 'alias'))
				->join(array('r' => 'ass_regions'), 'r.id = v.ass_region', array('ass_region' => 'name', 'reg_id' => 'id',  'reg_alias' => 'alias'))
				->joinLeft(array('v_s' => 'vineyard_seasons'), 'v_s.vineyard = v.id', array())
				->join(array('con' => 'continents'), 'con.id = v.continent', array('count_id' =>'id'))
				->join(array('cit' => 'cities'), 'cit.id = v.city', array('city' => 'name', 'city_id' => 'id'))
				->distinct('v.name')
				;
			return $this->_getAll();
	}
	
	public function getVineyardsByUser()
	{
		 $this	->_query
				->setIntegrityCheck(false)
				->from(array('v' => 'vineyards'), array('update', 'alias', 'name', 'logo', 'list_id' => 'id', 'tasting', 'tour', 'loc_y', 'loc_z', 'status', 'claim', 'remove', 'user'))
				->join(array('c' => 'countries'), 'c.code = v.country', array('country' =>'name_en', 'coun_id' =>'code',  'country_alias' => 'alias'))
				->join(array('r' => 'ass_regions'), 'r.id = v.ass_region', array('ass_region' => 'name', 'reg_id' => 'id',  'reg_alias' => 'alias'))
				->joinLeft(array('v_s' => 'vineyard_seasons'), 'v_s.vineyard = v.id', array())
				->join(array('con' => 'continents'), 'con.id = v.continent', array('count_id' =>'id'))
				->join(array('cit' => 'cities'), 'cit.id = v.city', array('city' => 'name', 'city_id' => 'id'))
				->where('v.user = ?', Zend_Auth::getInstance()->getIdentity()->id)
				 ->where('v.remove = ?', 0)
				->distinct('v.name')
				;
			return $this->_getAll();
	}
	
	public function getVineyardsByPartner()
	{
		 $this	->_query
				->setIntegrityCheck(false)
				->from(array('v' => 'vineyards'), array('update', 'alias', 'name', 'logo', 'list_id' => 'id', 'tasting', 'tour', 'loc_y', 'loc_z', 'status', 'claim', 'remove'))
				->join(array('c' => 'countries'), 'c.code = v.country', array('country' =>'name_en', 'coun_id' =>'code',  'country_alias' => 'alias'))
				->join(array('r' => 'ass_regions'), 'r.id = v.ass_region', array('ass_region' => 'name', 'reg_id' => 'id',  'reg_alias' => 'alias'))
				->join(array('par' => 'partners'), 'par.region = r.id', array('user')) 
				->joinLeft(array('v_s' => 'vineyard_seasons'), 'v_s.vineyard = v.id', array())
				->join(array('con' => 'continents'), 'con.id = v.continent', array('count_id' =>'id'))
				->join(array('cit' => 'cities'), 'cit.id = v.city', array('city' => 'name', 'city_id' => 'id'))
				 ->where('par.user = ?', Zend_Auth::getInstance()->getIdentity()->id)
				->distinct('v.name')
				;
			return $this->_getAll();
	}
	
	public function addFilterByRegion($region)
	{
		$this->_query ->where('v.ass_region = ?', $region);
		return $this;
	}
	
	public function addFilterByTime($time)
	{
		$this->_query ->where('v.update = ?', $time);
		return $this;
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
	
	public function addFilterNotRemove()
	{
		$this->_query->where('v.remove = ?', 0);
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
	
	public function addFilterByUserId($user)
	{
		$this->_query->where('v.user = ?', $user);
		return $this;
	}

	public function getVineyardsByRegion($region, $vin_id = false)
	{
		$res = $this->select()
					->setIntegrityCheck(false)
					->from(array('v' => 'vineyards'), array('alias', 'name', 'logo', 'loc_y', 'loc_z'))
					->join(array('c' => 'countries'), 'c.code = v.country', array('country' =>'name_en', 'coun_id' =>'code',  'country_alias' => 'alias'))
					->join(array('r' => 'ass_regions'), 'r.id = v.ass_region', array('ass_region' => 'name', 'reg_id' => 'id',  'reg_alias' => 'alias'))
					->joinLeft(array('v_s' => 'vineyard_seasons'), 'v_s.vineyard = v.id', array())
					->join(array('cit' => 'cities'), 'cit.id = v.city', array('city' => 'name'))
					->where('r.id = ?', $region)
					->where('v.remove = ?', 0)
					;
		if($vin_id ) $res->where('v.id != ?', $vin_id);
		$res->distinct('r.name');
		
		return $this->fetchAll($res);
	}

	public function getVineyardsByCountry($country, $vin_id = false)
	{
		$res = $this->select()
					->setIntegrityCheck(false)
					->from(array('v' => 'vineyards'), array('alias', 'name', 'logo', 'loc_y', 'loc_z'))
					->join(array('c' => 'countries'), 'c.code = v.country', array('country' =>'name_en', 'coun_id' =>'code',  'country_alias' => 'alias'))
					->join(array('r' => 'ass_regions'), 'r.id = v.ass_region', array('ass_region' => 'name', 'reg_id' => 'id',  'reg_alias' => 'alias'))
					->joinLeft(array('v_s' => 'vineyard_seasons'), 'v_s.vineyard = v.id', array())
					->join(array('cit' => 'cities'), 'cit.id = v.city', array('city' => 'name'))
					->where('c.code = ?', $country)
					->where('v.remove = ?', 0)
					;
		if($vin_id ) $res->where('v.id != ?', $vin_id);
		$res->distinct('r.name');
		
		return $this->fetchAll($res);
	}

	public function getVineyardByAlias($alias)
	{
		$this		 ->_query
					->setIntegrityCheck(false)
					->from(array('v' => 'vineyards'), array('*'))
					->join(array('c' => 'countries'), 'c.code = v.country', array('country_alias' => 'alias', 'country' =>'name_en', 'country_id' => 'code'))
					->join(array('co' => 'continents'), 'co.id = v.continent', array('continent' =>'name'))
					->join(array('r' => 'ass_regions'), 'r.id = v.ass_region', array('reg_alias' => 'alias', 'ass_region' => 'name', 'ass_id' => 'id'))
					->joinLeft(array('v_s' => 'vineyard_seasons'), 'v_s.vineyard = v.id', array())
					->join(array('cit' => 'cities'), 'cit.id = v.city', array('city' => 'name'))
					->where('v.alias = ?', $alias)
				        ;
		
		return $this->_getRow();
	}

	public function addVineyard($name, $nameloc, $address1, $address2, $city, $zip, $country, $continent, $telephone, $fax, $email, $web, $loc_y, $loc_z, $region, $logo, $proprietor, $visits, $groups, $restaurant, $weddings, $seminars, $appointment, $individuals, $accommodation, $ass_region, $tasting, $tour, $sales, $workshops, $notes, $owner, $alias)
	{
		$data = array(
						'name'		=> $name,
						'nameloc'	=> $nameloc, 
						'address1'	=> $address1,
						'address2'	=> $address2,
						'city'		=> $city,			
						'zip'		=> $zip,			
						'country'	=> $country, 
						'continent'	=> $continent,
						'telephone'	=> $telephone, 
						'fax'		=> $fax, 
						'email'		=> $email,
						'web'		=> $web,
						'loc_y'		=> $loc_y,
						'loc_z'		=> $loc_z,
						'region'	=> $region,
						'logo'		=> $logo,
						'proprietor'=> $proprietor,
						'visits'	=> $visits,
						'groups'	=> $groups,
						'restaurant'=> $restaurant,	
						'weddings'	=> $weddings,
						'seminars'	=> $seminars,
						'ass_region' => $ass_region, 
						'appointment'=> $appointment,
						'individuals'=> $individuals,
						'accommodation'=> $accommodation,
						'tasting'	=> $tasting, 
						'tour'		=> $tour, 
						'sales'		=> $sales, 
						'workshops'	=> $workshops,
						'notes_chang'=> $notes,
						'status'	=> 0, 
						'alias'		=> $alias, 
						'user'		=> Zend_Auth::getInstance()->getIdentity()->id, 
						'claim'		=> $owner, 
						'owner'		=> $owner,
						'update' => time()
					);
		$insert = $this->insert($data);		
	}
	
	public function updateVineyard($id, $name, $nameloc, $address1, $address2, $city, $zip, $country, $continent, $telephone, $fax, $email, $web, $loc_y, $loc_z, $region, $logo, $proprietor, $visits, $groups, $restaurant, $weddings, $seminars, $appointment, $individuals, $accommodation, $ass_region, $tasting, $tour, $sales, $workshops, $notes, $owner)
	{
		$data = array(
						'name'		=> $name,
						'nameloc'	=> $nameloc, 
						'address1'	=> $address1,
						'address2'	=> $address2,
						'city'		=> $city,			
						'zip'		=> $zip,			
						'country'	=> $country, 
						'continent'	=> $continent,
						'telephone'	=> $telephone, 
						'fax'		=> $fax, 
						'email'		=> $email,
						'web'		=> $web,
						'loc_y'		=> $loc_y,
						'loc_z'		=> $loc_z,
						'region'	=> $region,
						'logo'		=> $logo,
						'proprietor'=> $proprietor,
						'visits'	=> $visits,
						'groups'	=> $groups,
						'restaurant'=> $restaurant,	
						'weddings'	=> $weddings,
						'seminars'	=> $seminars,
						'ass_region' => $ass_region, 
						'appointment'=> $appointment,
						'individuals'=> $individuals,
						'accommodation'=> $accommodation,
						'tasting'	=> $tasting, 
						'tour'	=> $tour, 
						'sales'	=> $sales, 
						'workshops'	=> $workshops,
						'notes_chang'=> $notes,
						'status'	=> 0, 
						'user'		=> Zend_Auth::getInstance()->getIdentity()->id, 
						'claim'		=> $owner,
						'owner'		=> $owner, 
						'update' => time()
					);
		
		$where['id = ?'] = (int)$id;
		
		$this->update($data, $where);
	}
	
	public function verifyVineyard($id)
	{
		$data = array('status' => 1);
		$where['id = ?'] = $id;
		$this->update($data, $where);
	}
	
	public function unverifyVineyard($id)
	{
		$data = array('status' => 0);
		$where['id = ?'] = $id;
		$this->update($data, $where);
	}
	
	public function claimVineyard($id, $user)
	{
		$data = array('claim' => 1, 'owner' => $user);
		$where['id = ?'] = $id;
		$this->update($data, $where);
	}
		
	public function notClaimVineyard($id)
	{
		$data = array('claim' => 0, 'owner' => 0);
		$where['id = ?'] = $id;
		$this->update($data, $where);
	}
	
	public function remove($id)
	{
		$data = array('remove' => 1);
		$where['id = ?'] = $id;
		$this->update($data, $where);
	}
		
	public function recover($id)
	{
		$data = array('remove' => 0);
		$where['id = ?'] = $id;
		$this->update($data, $where);
	}		
	
	public function updateCorrectVineyard($post)
	{
		$data = array(
						'loc_y' => $post['loc_y'],
						'loc_z' => $post['loc_z'],
						'individuals' => $post['individuals'],
						'visits' => $post['visits'],
						'groups' => $post['groups'],
						'appointment' => $post['appointment'],
						'tasting' => $post['tasting'],
						'tour' => $post['tour'],
						'sales' => $post['sales'],
						'workshops' => $post['workshops'],
						'restaurant' => $post['restaurant'],
						'weddings' => $post['weddings'],
						'seminars' => $post['seminars'],
						'accommodation' => $post['accommodation']
		);
		$where['id = ?'] = (int)$post['listing'];
		$this->update($data, $where);
	}
}