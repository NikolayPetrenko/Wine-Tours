<?php

class SearchController extends Zend_Controller_Action
{
	/**
	 * Constructor 
	 */
	public function init()
	{
		parent::init();
		$this->view->headLink()	->prependStylesheet('/css/bootstrap-image-gallery.min.css')
								->prependStylesheet('/css/jquery.fileupload-ui.css')
								->prependStylesheet('/css/prettify.css')
								->prependStylesheet('/css/jquery.multiselect.css')
								->prependStylesheet('/css/jquery.multiselect.filter.css')
								;

		$this->view->headScript()->appendFile('/js/load-image.js')
								->appendFile('/js/jquery.multiselect.js')
								->appendFile('/js/jquery.multiselect.filter.js')
								->appendFile('/js/prettify.js')
								->appendFile('/js/ba.hashchange.js')
								->appendFile('/js/canvas-to-blob.js')
								->appendFile('/js/bootstrap.min.js')
								->appendFile('/js/bootstrap-image-gallery.min.js')
								->appendFile('/js/jsupload/jquery.fileupload.js')
								->appendFile('/js/jsupload/jquery.fileupload-ip.js')
								->appendFile('/js/jsupload/jquery.fileupload-ui.js')
								->appendFile('/js/jsupload/jquery.iframe-transport.js')
								->appendFile('/js/jsupload/locale.js')
								->appendFile('/js/jsupload/main.js')
								;
	}

	public function indexAction()
	{
		$config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'development');
		$this->view->headTitle('Search');
		$this->view->headMeta()->appendName('keywords', $config->keywords->search->index);	
		$this->view->headMeta()->appendName('description', $config->description->search->index);
		$search = chop(ltrim($this->getRequest()->getParam('q')));
		if(empty($search) || $search == 'Find Vineyards/Regions/Wines') $this->_helper->redirector->gotoUrl($_SERVER['HTTP_REFERER']);
		$search = Main::secureSearch($search);
		if($search !== false) {
			$con_mod	= new Application_Model_Countries();
			$reg_mod	= new Application_Model_Assregions();
			$vin_mod	= new Application_Model_Vineyards();
			$win_mod	= new Application_Model_Wines();
			$top_reg	= new Application_Model_TopRegions();
			$countries	= $con_mod->search($search);
			$regions	= $reg_mod->search($search);
			$vineyards	= $vin_mod->search($search);
			$wines		= $win_mod->search($search);
			$ip			= $_SERVER['REMOTE_ADDR'];
			$search_mod	= new Application_Model_AlternativeSearch();
			if(($search_mod->isIpExist($search, $ip) === false) && (!empty($countries[0]) || !empty($regions[0]) || !empty($vineyards[0]) || !empty($wines[0]))) {
				$search_mod->addSearch($search, $ip);
			}
			if(!empty($regions[0])) {
				foreach($regions as $region) {
					if($top_reg->isIpExist($region->id, $ip) === false) {
						$top_reg->addRegion($region->id, $ip, $reg_mod->getContinentByRegion($region->id)->continent);
					}
				}
			}
			if(empty($countries[0]) && empty($regions[0]) && empty($vineyards[0]) && empty($wines[0])) {
				$google_search = Main::googleChecker($search);
				if(!empty($google_search)) {
					$altr_countries = $con_mod->search($google_search);
					$altr_regions = $reg_mod->search($google_search);
					$altr_vineyards = $vin_mod->search($google_search);
					$altr_wines = $win_mod->search($google_search);
					$this->view->assign('altr_countries', $altr_countries);
					$this->view->assign('altr_regions', $altr_regions);
					$this->view->assign('altr_vineyards', $altr_vineyards);
					$this->view->assign('altr_wines', $altr_wines);
					$this->view->assign('altr_search', $google_search);
				}
			}
			$this->view->assign('search', $search);
			$this->view->assign('countries', $countries);
			$this->view->assign('regions', $regions);
			$this->view->assign('vineyards', $vineyards);
			$this->view->assign('wines', $wines);
		} else {
			$this->view->assign('badsearch', '');
		}
	}
		
	public function listAction()
	{
		$config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'development');
		$seo_mod = new Application_Model_Seo();
		$seo = $seo_mod->getSeoById('4');
		$this->view					->headTitle($seo->title);
		$this->view->headMeta()		->appendName('keywords', $seo->keywords);
		$this->view->headMeta()		->appendName('description', $seo->description);
		$this->view->headScript()->appendFile('/js/search.js');
		$search = chop(ltrim($this->getRequest()->getParam('q')));
		$form		= new Application_Form_Addlisting();
		$this->view->form = $form;
		$form1		= new Application_Form_Claim();
		$form1->setAction('/' . $_SESSION['lang'] . '/main/claim');
		$this->view->form1 = $form1;
		$this->view->assign('type1', 'list');
		if(!empty($search)) {
			if($search == 'Find Vineyards/Regions/Wines') $this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/search/list?type%5Ball%5D=all&status%5Bverif%5D=verif&status%5Bunver%5D=unver&status%5Bclaim%5D=claim&continent=');
				$search = Main::secureSearch($search);
				if($search !== false) {
					$con_mod	= new Application_Model_Countries();
					$reg_mod	= new Application_Model_Assregions();
					$vin_mod	= new Application_Model_Vineyards();
					$win_mod	= new Application_Model_Wines();
					$top_reg	= new Application_Model_TopRegions();
					$countries	= $con_mod->search($search);
					$regions	= $reg_mod->search($search);
					$vineyards	= $vin_mod->search($search);
					$wines		= $win_mod->search($search);
					$ip			= $_SERVER['REMOTE_ADDR'];
					$search_mod	= new Application_Model_AlternativeSearch();
					if(($search_mod->isIpExist($search, $ip) === false) && (!empty($countries[0]) || !empty($regions[0]) || !empty($vineyards[0]) || !empty($wines[0]))) {
						$search_mod->addSearch($search, $ip);
					}
					if(!empty($regions[0])) {
						foreach($regions as $region) {
							if($top_reg->isIpExist($region->id, $ip) === false) {
								$continent = $reg_mod->getContinentByRegion($region->id);
								$top_reg->addRegion($region->id, $ip, $continent['continent']);
							}
						}
					}
					if(empty($countries[0]) && empty($regions[0]) && empty($vineyards[0]) && empty($wines[0])) {
						$google_search = Main::googleChecker($search);
						if(!empty($google_search)) {
							$altr_countries = $con_mod->search($google_search);
							$altr_regions = $reg_mod->search($google_search);
							$altr_vineyards = $vin_mod->search($google_search);
							$altr_wines = $win_mod->search($google_search);
							$this->view->assign('altr_countries', $altr_countries);
							$this->view->assign('altr_regions', $altr_regions);
							$this->view->assign('altr_vineyards', $altr_vineyards);
							$this->view->assign('altr_wines', $altr_wines);
							$this->view->assign('altr_search', $google_search);
						}
					}
					$this->view->assign('search', $search);
					$this->view->assign('countries', $countries);
					$this->view->assign('regions', $regions);
					$this->view->assign('vineyards', $vineyards);
					$this->view->assign('wines', $wines);
					$this->view->assign('type', 'all');
					$status = !empty($_GET['status']) ? $_GET['status'] : '';
					$this->view->assign('status', $status);
					$this->view->assign('word', $search);
				} else {
					$this->_helper->redirector->gotoUrl($_SERVER['HTTP_REFERER']);
				}			
		} else {
			$config		= new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'development');
			$vin_mod	= new Application_Model_Vineyards();
			$win_mod	= new Application_Model_Wines();
			$reg_mod	= new Application_Model_Assregions();
			$claim_mod	= new Application_Model_Claimes();
			$sel_mod	= new Application_Model_Select();
			$status		= !empty($_GET['status']['verif']) && !empty($_GET['status']['unver']) ? '' : (!empty($_GET['status']['verif']) ? '1' : (!empty($_GET['status']['unver']) ? '0' : '2' ));
//			$claim		= !empty($_GET['status']['claim']) ? '1' : '0';
			$results	= array();
			$limit		= $config->pagination->search;
			$page		= $this->_getParam('page');
			$offset		= 0;
			if(!empty($_GET['word'])) {
				$sel_mod->addFilterName($_GET['word']);
				$this->view->assign('word', $_GET['word']);
			}
			if(!empty($page)) {
				$offset = ($this->_getParam('page') - 1) * $limit;
			}
			
			$loc = !empty($_GET['ass_region']) ? 'region' : (!empty($_GET['country']) ? 'country' : (!empty($_GET['continent']) ? 'continent' : 'all'));
//			$loc = 'all';
			$type = array();
			$type = empty($_GET) ? array('all' => 'all') : (!empty($_GET['type']) ? $_GET['type'] : '');
			if((empty($type['reg']) && (!empty($type['win']) || !empty($type['vin']))) || (empty($type['win']) && (!empty($type['reg']) || !empty($type['vin']))) || (empty($type['vin']) && (!empty($type['win']) || !empty($type['reg'])))) {
				unset($type['all']);
			}
			if(!empty($type['reg']) && !empty($type['win']) && !empty($type['vin'])) {
				$type['all'] = 'all';
			}
			if(!empty($type['all'])) {

			} else {
				if(empty($type['reg'])) {
					$sel_mod->addFilterByReg();
				}
				if(empty($type['vin'])) {
					$sel_mod->addFilterByVineyard();
				}
				if(empty($type['win'])) {
					$sel_mod->addFilterByWine();
				}
			}
			switch($status){
				case '2':
					$sel_mod->addFilterByNotVineyard();
				break;
				case '0':
					$sel_mod->addFilterByStatus('1');

				break;	
				case '1':
					$sel_mod->addFilterByStatus('0');

				break;	
				case '':

				break;
			}
//			if($claim == '1'){
//				$sel_mod->addFilterByClaim('0');
//			} else {
//				$sel_mod->addFilterByClaim('1');
//			}			
			switch ($loc) {
				case 'region':
					$results = $sel_mod->addFilterByRegion($_GET['ass_region'])->getResult($limit, $offset);
				break;				
				case 'country':
					$results = $sel_mod->addFilterByCountry($_GET['country'])->getResult($limit, $offset);
				break;
				case 'continent':
					$results = $sel_mod->addFilterByContinent($_GET['continent'])->getResult($limit, $offset);
				break;
				case 'all':
					$results = $sel_mod->getResult($limit, $offset);
				break;
			}
			if(!empty($_GET['word'])) {
				$sel_mod->addFilterName($_GET['word']);
			}	
			if(!empty($type['all'])) {

			} else {
				if(empty($type['reg'])) {
					$sel_mod->addFilterByReg();
				} 
				if(empty($type['vin'])) {
					$sel_mod->addFilterByVineyard();
				} 
				if(empty($type['win'])) {
					$sel_mod->addFilterByWine();
				}			
			}

			switch($status){
				case '2':
					$sel_mod->addFilterByNotVineyard();
				break;
				case '0':
					$sel_mod->addFilterByStatus('1');
				break;	
				case '1':
					$sel_mod->addFilterByStatus('0');
				break;	
				case '':

				break;
			}
//			if($claim == '1'){
//				$sel_mod->addFilterByClaim('0');
//			} else {
//				$sel_mod->addFilterByClaim('1');
//			}			

			switch ($loc) {
				case 'region':
					$sel_mod->addFilterByRegion($_GET['ass_region']);
				break;				
				case 'country':
					$sel_mod->addFilterByCountry($_GET['country']);
				break;
				case 'continent':
					$sel_mod->addFilterByContinent($_GET['continent']);
				break;
				case 'all':
				break;
			}
			$count = $sel_mod->getResultCount()->toArray();
			if(!empty($count)) {
				$count =	$count[0]['count'];
			} else {
				$count = 0;
			}
			$wines_res		= array();
			$vineyards_res	= array();
			$regions_res	= array();
			$results		= $results->toArray();
			foreach ($results as $result) {
				if($result['type'] == 'wine') {
					$wines_res[] = $result['id'];
				}
				if($result['type'] == 'vin') {
					$vineyards_res[] = $result['id'];
				}
				if($result['type'] == 'region') {
					$regions_res[] = $result['id'];
				}
			}
			if(!empty($wines_res)) {
				$wines		= $win_mod->getWinesIn($wines_res)->toArray();
				$wines_tmp	= array();
				foreach ($wines as $key => $value) {
					$wines_tmp[$value['id']]				= $value;
					$wines_tmp[$value['id']]['WINE']		=  '1';
					$wines_tmp[$value['id']]['user_claim']	= $claim_mod->ClaimByUser($value['id']);
				}			
			}
			if(!empty($vineyards_res)) {
				$vineyards		= $vin_mod->getVineyardsIn($vineyards_res)->toArray();
				$vineyards_tmp	= array();
				foreach ($vineyards as $key => $value) {
					$vineyards_tmp[$value['list_id']]				= $value;
					$vineyards_tmp[$value['list_id']]['VINEYARD']	= '1';
					$vineyards_tmp[$value['list_id']]['user_claim']	= $claim_mod->ClaimByUser($value['list_id']);
				}
			}
			if(!empty($regions_res)) {
				$regions = $reg_mod->getRegionsIn($regions_res)->toArray();
				$regions_tmp = array();
				foreach ($regions as $key => $value) {
					$regions_tmp[$value['id']]				= $value;
					$regions_tmp[$value['id']]['REGION']	='1';
				}
			}
			foreach ($results as $key => $value) {
				if($value['type'] == 'wine') {
					@$results[$key] = $wines_tmp[$value['id']];
				}
				if($value['type'] == 'vin') {
					@$results[$key] = $vineyards_tmp[$value['id']];
				}
				if($value['type'] == 'region') {
					$results[$key] = $regions_tmp[$value['id']];
				}
			}
			$url = str_replace('&', '&amp;', (parse_url($_SERVER['REQUEST_URI'])));
			$get = !empty($url['query']) ? $url['query'] : '';
			$this->view->assign('get', $get);
			$page = $this->_getParam('page');
			$results = !empty($_GET) && empty($_GET['type']) ? array() : $results;
			$result = $this->view->table = $results;
			$this->view->assign('result', $results);
			$paginator = new Zend_Paginator(new Zend_Paginator_Adapter_Null($count));
			$paginator->setItemCountPerPage($config->pagination->search);
			$paginator->setCurrentPageNumber($page);
			$paginator->setView($this->view);
			$this->view->assign('type', $type);
			$status = !empty($_GET['status']) ? $_GET['status'] : '';
			$this->view->assign('status', $status);
			if(!empty($_GET['ass_region'])) $this->view->assign('region', $_GET['ass_region']);
			if(!empty($_GET['country'])) $this->view->assign('country', $_GET['country']);
			if(!empty($_GET['continent'])) $this->view->assign('continent', $_GET['continent']);
			$this->view->paginator = $paginator;
		}	
	}

	public function mapAction()
	{
		$this->view->headScript()->appendFile('/js/map.js');
		$form1		= new Application_Form_Claim();
		$form1->setAction('/' . $_SESSION['lang'] . '/main/claim');
		$this->view->form1 = $form1;
		$seo_mod = new Application_Model_Seo();
		$seo = $seo_mod->getSeoById('5');
		$this->view					->headTitle($seo->title);
		$this->view->headMeta()		->appendName('keywords', $seo->keywords);
		$this->view->headMeta()		->appendName('description', $seo->description);
		$form		= new Application_Form_Addlisting();
		$this->view->form = $form;
		$vin_mod	= new Application_Model_Vineyards();
		$vineyards	= $vin_mod->getVineyards(true);
		$win_mod	= new Application_Model_Wines();
		$wines		= $win_mod->getWines();
		$reg_mod	= new Application_Model_Assregions();
		$regions	= $reg_mod->getAssRegions();
		$this->view->assign('wines', $wines);
		$this->view->assign('vineyards', $vineyards);
		$this->view->assign('regions', $regions);
		$this->view->assign('type', 'map');
	}
	
	public function filterAction()
	{
		if(empty($_POST)) throw new Zend_Exception("The page you requested was not found.", 404);
		switch ($_POST['filter']) {
			case 'all':
				$win_mod = new Application_Model_Wines();
				$vin_mod = new Application_Model_Vineyards();
				$wines = $win_mod->getWines()->toArray();
				$vineyards = $vin_mod->getVineyards()->toArray();
				print json_encode(array('wines' => $wines, 'vineyards' => $vineyards));
			break;
			case 'vineyard':
				$vin_mod = new Application_Model_Vineyards();
				$vineyards = $vin_mod->getVineyards(true)->toArray();
				print json_encode(array('vineyards' => $vineyards));
			break;
			case 'wine':
				$win_mod = new Application_Model_Wines();
				$wines = $win_mod->getWines(true)->toArray();
				print json_encode(array('wines' => $wines));
			break;
		}
		die();
	}

	
	/**
     * Ajax select country and associated region for vineyard 
     */
	public function ajaxselectAction()
	{
		$this->_helper->layout->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);		
		if(empty($_POST)) throw new Zend_Exception("The page you requested was not found.", 404);	
		$vin_mod = new Application_Model_Vineyards();
		$win_mod = new Application_Model_Wines();
		$claim_mod = new Application_Model_Claimes();
		$ass_region_mod = new Application_Model_Assregions();
		if(!empty($_POST['continent'])) {
			$continent = $_POST['continent'];
			$country_mod = new Application_Model_Countries();
			$countries = $country_mod->getCountriesByContinentId($continent);
			if(empty($countries)) {
				$countries_mas[] = array('id'=>'', 'title'=>'No Countries for Continent');
			} else {
				$countries_mas[] = array('id'=>'', 'title'=>'Select Country');
			}
			foreach ($countries as $country) {
				$countries_mas[] = array('id'=>$country->code, 'title'=>$country->name_en);
			}
			$vineyards = $vin_mod->addFilterByContinent($continent)->getVineyards()->toArray();
			$wines = $win_mod->addFilterByContinent($continent)->getWines()->toArray();
			$regions = $ass_region_mod->getAssregionsByContinetId($continent)->toArray();
			foreach($vineyards as $key=>$val) {
				$vineyards_f[$key] = $val;
				$vineyards_f[$key]['user_claim'] = $claim_mod->ClaimByUser($val['list_id']);
			}
			foreach($wines as $key=>$val) {
				$wines_f[$key] = $val;
				$wines_f[$key]['user_claim'] = $claim_mod->ClaimByUser($val['list_id']);
			}
			$result = array('country' => $countries_mas, 'vin' => $vineyards, 'win' => $wines, 'reg' => $regions);
		} elseif(!empty($_POST['country'])) {
			$country = $_POST['country'];
			$ass_regions = $ass_region_mod->getAssregionsByCountryIdPid($country);
			if(empty($ass_regions)) {
				$ass_regions_mas[] = array('id'=>'', 'title'=>'No Associated Regions for Country');
			} else {
				$ass_regions_mas[] = array('id'=>'', 'title'=>'Select Associated Region');
			}			
			foreach ($ass_regions as $ass_region) {
				$ass_regions_mas[] = array('id'=>$ass_region->id, 'title'=>$ass_region->name);
			}
			$vineyards = $vin_mod->addFilterByCountry($country)->getVineyards()->toArray();
			$wines = $win_mod->addFilterByCountry($country)->getWines()->toArray();
			if(!empty($vineyards) && !empty($wines)) {
				foreach($vineyards as $key=>$val) {
					$vineyards_f[$key] = $val;
					$vineyards_f[$key]['user_claim'] = $claim_mod->ClaimByUser($val['list_id']);
				}
				foreach($wines as $key=>$val) {
					$wines_f[$key] = $val;
					$wines_f[$key]['user_claim'] = $claim_mod->ClaimByUser($val['list_id']);
				}
				$vineyards_wines = array_merge($vineyards_f, $wines_f);
				sort($vineyards_wines);
				$result = array('ass_region' => $ass_regions_mas, 'vin_win' => $vineyards_wines);
			} else {
				$result = array('ass_region' => $ass_regions_mas, 'vin_win' => 'no');
			}
		} else {
			$region = $_POST['region'];
			$regions = $ass_region_mod->getAssregionsByPidId($region)->toArray();
			$regions_p = array();
			foreach ($regions as $key => $value) {
				$regions_p[$key] = $value;
				$regions_p[$key]['par_alias'] = main::getParent1($value['alias']);
			}
			$result = array('region' =>$ass_region_mod->getRegionById($region)->toArray(), 'regions' => $regions_p);
		}
		
		print json_encode($result);
	}
	
	/**
     * Ajax select country and associated region for vineyard 
     */
	public function selectAction()
	{
		$this->_helper->layout->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);		
		if(empty($_POST)) throw new Zend_Exception("The page you requested was not found.", 404);	
		$ass_region_mod = new Application_Model_Assregions();
		if(!empty($_POST['continent'])) {
			$country_mod = new Application_Model_Countries();
			$countries = $country_mod->getCountriesByContinentId($_POST['continent']);
			if(empty($countries)) {
				$countries_mas[] = array('id'=>'', 'title'=>'No Countries for Continent');
			} else {
				$countries_mas[] = array('id'=>'', 'title'=>'Select Country');
			}
			foreach ($countries as $country) {
				$countries_mas[] = array('id'=>$country->code, 'title'=>$country->name_en);
			}
			$result = array('country' => $countries_mas);
		} elseif(!empty($_POST['country'])) {
			$ass_regions = $ass_region_mod->getAssregionsByCountryId($_POST['country']);
			if(empty($ass_regions)) {
				$ass_regions_mas[] = array('id'=>'', 'title'=>'No Associated Regions for Country');
			} else {
				$ass_regions_mas[] = array('id'=>'', 'title'=>'Select Associated Region');
			}			
			foreach ($ass_regions as $ass_region) {
				$ass_regions_mas[] = array('id'=>$ass_region->id, 'title'=>$ass_region->name);
			}
			$result = array('ass_region' => $ass_regions_mas);
		} else {
			$result = array('region' =>$ass_region_mod->getRegionById($_POST['region'])->toArray());
		}
		print json_encode($result);
	}
	
	public function paginationajaxAction()
	{
		if(empty($_POST)) throw new Zend_Exception("The page you requested was not found.", 404);
		$type = $_POST['type'];
		$count_r = $_POST['count_r'];
		$count_v = $_POST['count_v'];
		$count_w = $_POST['count_w'];
		$vin_mod = new Application_Model_Vineyards();
		$win_mod= new Application_Model_Wines();
		$reg_mod = new Application_Model_Assregions();
		$claim_mod = new Application_Model_Claimes();
		$vineyards  = array();
		$vineyards_f  = array();
		$wines  = array();
		$wines_f  = array();
		$regions  = array();
		$config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'development');
		$page = $config->pagination->search;
		switch ($type) {
			case 'vineyard':
				$vineyards = $vin_mod->getVineyardsByLimit($page, $count_v)->toArray();
				foreach($vineyards as $key=>$val) {
					$vineyards_f[$key] = $val;
					$vineyards_f[$key]['user_claim'] = $claim_mod->ClaimByUser($val['list_id']);
				}
				if(count($vineyards) <  $page) {
					$limit = $page - count($vineyards);
					$wines = $win_mod->getWinesbyLimit($limit)->toArray();
					foreach($wines as $key=>$val) {
						$wines_f[$key] = $val;
						$wines_f[$key]['user_claim'] = $claim_mod->ClaimByUser($val['list_id']);
					}		
				}
				if((count($wines) + count($vineyards)) < $page ) {
					$limit = $page - count($vineyards) - count($wines);
					$regions = $reg_mod->getAssRegionsByLimit($limit)->toArray();
				}
				break;
			case 'wine':
					$wines = $win_mod->getWinesbyLimit($page, $count_w)->toArray();
					foreach($wines as $key=>$val) {
						$wines_f[$key] = $val;
						$wines_f[$key]['user_claim'] = $claim_mod->ClaimByUser($val['list_id']);
					}		
				if(count($wines) < $page ) {
					$limit = $page - count($vineyards) - count($wines);
					$regions = $reg_mod->getAssRegionsByLimit($limit)->toArray();
				}
				break;
			case 'region':
					$regions = $reg_mod->getAssRegionsByLimit($page, $count_r)->toArray();
				break;
		}
		$this->_helper->layout->disableLayout();
		$this->view->assign('regions', $regions);
		$this->view->assign('vineyards', $vineyards_f);
		$this->view->assign('wines', $wines_f);
		$this->view->assign('count_v', $count_v);
		$this->view->assign('count_w', $count_w);
		$this->view->assign('count_r', $count_r);
		$res['html'] = $this->view->render('pagination.phtml');
		print json_encode($res);
	}
	
	/**
	 * Search for ajax autocomplite
	 *
	*/
	public function searchautoAction()
	{
		$this->_helper->layout->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);		
		if(empty($_POST)) throw new Zend_Exception("The page you requested was not found.", 404);
		$search = chop(ltrim($_POST['search']));
		if(empty($search)) return false;
		$search_mod = new Application_Model_AlternativeSearch();
		$result = $search_mod->getWordForSearch($search);
		$auto_res = array();
		foreach ($result as $key=>$val) {
//			if($val['count'] > 1) {
				$auto_res[$key]['id']    = $val['id'];
				$auto_res[$key]['label'] = $val['name'];				
//			}
		}
		echo json_encode($auto_res);
	}
	
	public function getregionAction()
	{
		$this->_helper->layout->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);		
		if(empty($_POST)) throw new Zend_Exception("The page you requested was not found.", 404);
		$reg_mod = new Application_Model_Assregions();
		$result = $reg_mod->getAssRegionById($_POST['region'])->toArray();
		$result['region_alias'] = main::getParent1($result['alias']);
		echo json_encode($result);
	}	
}