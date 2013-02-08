<?php

class VineyardsController extends Zend_Controller_Action
{

    public function init()
    {
		parent::init();
		$this->view->headLink()->prependStylesheet('/css/bootstrap-image-gallery.min.css')
					->prependStylesheet('/css/jquery.fileupload-ui.css')
					->prependStylesheet('/css/prettify.css')
					->prependStylesheet('/css/jquery.multiselect.css')
					->prependStylesheet('/css/jquery.multiselect.filter.css')
					;
		
		$this->view->headScript()
								->appendFile('/js/load-image.js')
								->appendFile('/js/coin-slider.min.js')
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

	public function verifyvineyardAction()
	{
		$this->_helper->layout->setLayout('admin');
		$this->view->headTitle('Verify Vineyard');
		$this->view->headMeta()->appendName('keywords', 'vineyard, winery, vineyard tours, winery tours, wine tours, wine tasting');
		$this->view->headMeta()->appendName('description', 'The vineyards around the world');
		$this->view->headScript()->appendFile('/js/vineyards.js');
		
		$vin_mod = new Application_Model_Vineyards();
		$vineyard = $vin_mod->getVineyardByAlias($this->_getParam('vineyard'));
		$this->view->assign('vineyard', $vineyard);
		$spokens = $vin_mod->getSpokensVineyard($vineyard->id);
		$this->view->assign('spokens', $spokens);
		$wines  = $vin_mod->getWinesVineyard($vineyard->id);
		$grape_mod = new Application_Model_Grapes();
		$wines_p = array();
		if(!empty($wines)) {
			foreach ($wines as $key => $value) {
				$wines_p[$key] = $value;
				$wines_p[$key]['grapes'] = '';
				$grapes = unserialize($value['grapes']);
				if(is_array($grapes)) {
					foreach($grapes as $grape) {
						$wines_p[$key]['grapes'] .= $grape_mod->getGrapeById($grape['id'])->name . '<br>';
					}
				} elseif(!empty($grapes)) {
					$wines_p[$key]['grapes'] = $grape_mod->getGrapeById($grapes)->name;
				}
			}
		}	
		$this->view->assign('wines', $wines_p);
		$seas_mod = new Application_Model_Seasons();
		$seasons = $seas_mod->getSeasonByVineyardId($vineyard->id);
		$this->view->assign('seasons', $seasons);
	}

    public function viewvineyardAction()
    {
		$this->view->headLink()->prependStylesheet('/css/coin-slider-styles.css');
		$this->view->headScript()	->appendFile('/js/view_vineyard.js')
									->appendFile('/js/select.js')
									;
		$vin_mod = new Application_Model_Vineyards();
		$vineyard = $vin_mod->addFilterNotRemove()->getVineyardByAlias($this->_getParam('vineyard'));
		if(empty($vineyard)) $this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/main');
		$form1		= new Application_Form_Claim();
		$form1->setAction('/' . $_SESSION['lang'] . '/main/claim');
		$this->view->form1 = $form1;
		$seo_mod = new Application_Model_Seo();
		$seo = $seo_mod->getSeoById('7');
		$title = str_replace('{Vineyard Name}', $vineyard->name, $seo->title);
		$title = str_replace('{Top Level Region}', $vineyard->ass_region, $title);
		$description = str_replace('{Vineyard Name}', $vineyard->name, $seo->description);
		$description = str_replace('{Top Level Region}', $vineyard->ass_region, $description);
		$description = str_replace('{Country}', $vineyard->country, $description);
		$this->view->assign('alt', str_replace('{Vineyard Name}', '', $seo->alts));
		$this->view->assign('img', str_replace('{Vineyard Name}', '', $seo->img));
		$this->view				->headTitle($title);
		$this->view->headMeta()	->appendName('keywords', $seo->keywords);
		$this->view->headMeta()	->appendName('description', $description);
		$vineyards = $vin_mod->getVineyardsByCountry($vineyard->country_id, $vineyard->id);
		if(!empty($vineyards)) {
			$config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'production');
			//minimum distance for vineyards neighbordhood
			$distance_min = $config->neighbordhood->distance;
			$i = 0;
			$vineyards_n = array();
			foreach ($vineyards as $item) {
				$distance = Main::calculationDistances($vineyard->loc_y, $vineyard->loc_z, $item->loc_y, $item->loc_z);
				if($distance <= $distance_min) {
					$vineyards_n[$i]['dist'] = $distance;
					$vineyards_n[$i]['alias'] = $item->alias;
					$vineyards_n[$i]['name'] = $item->name;
					$vineyards_n[$i]['logo'] = $item->logo;
					$vineyards_n[$i]['country'] = $item->country;
					$vineyards_n[$i]['ass_region'] = $item->ass_region;
					$vineyards_n[$i]['reg_alias'] = $item->reg_alias;
					$vineyards_n[$i]['country_alias'] = $item->country_alias;
					$vineyards_n[$i]['city'] = $item->city;
					$i++;
				}
			}
			$vineyards = $vineyards_n;
			if(!empty($vineyards))sort($vineyards);
		}
		$this->view->assign('vineyard', $vineyard);
		$spokens = $vin_mod->getSpokensVineyard($vineyard->id);
		$this->view->assign('spokens', $spokens);
		$this->view->assign('vineyards', $vineyards);
		$wines  = $vin_mod->getWinesVineyard($vineyard->id)->toArray();
		$grape_mod = new Application_Model_Grapes();
		$wines_p = array();
		if(!empty($wines)) {
			foreach ($wines as $key => $value) {
				$wines_p[$key] = $value;
				$wines_p[$key]['grapes'] = '';
				$grapes = unserialize($value['grapes']);
				if(is_array($grapes)) {
					foreach($grapes as $grape) {
						@$wines_p[$key]['grapes'] .= $grape_mod->getGrapeById($grape)->name . '<br>';
					}
				} elseif(!empty($grapes)) {
					@$wines_p[$key]['grapes'] = $grape_mod->getGrapeById($grapes)->name;
				}
			}
		}
		$this->view->assign('wines', $wines_p);
		$seas_mod = new Application_Model_Seasons();
		$seasons = $seas_mod->getSeasonByVineyardId($vineyard->id);
		$phot_mod = new Application_Model_Photos();
		$photos = $phot_mod->getPhotosByVineyard($vineyard->id);
		if(!empty($_SESSION['correct'])) {
			$this->view->assign('correct', $_SESSION['correct']);
			unset($_SESSION['correct']);
		}
		$this->view->assign('photos', $photos);
		$this->view->assign('seasons', $seasons);
		$this->view->assign('country_loc', $vineyard->country_id);
		$this->view->assign('reg_loc', $vineyard->ass_id);
    }

       /**
     * Addition of new vineyard
     */
    public function addlistingAction()
    {
		if (!Zend_Auth::getInstance()->hasIdentity()) {
			$_SESSION['redirect'] = $_SERVER['REQUEST_URI'];
			$this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/auth/login');
		}
		$seo_mod = new Application_Model_Seo();
		$seo = $seo_mod->getSeoById('6');
		$this->view->headTitle($seo->title);
		$this->view->headScript()->appendFile('/js/vineyards.js');
		$form = new Application_Form_Addlisting();
		$this->view->form = $form;
		if ($this->getRequest()->isPost()) {
			$formData = $this->getRequest()->getPost();
			if ($form->isValidPartial($formData)) {
				$cit = new Application_Model_Cities();
				$c = $cit->isExist($this->getRequest()->getPost('city'));
				if($c) {
					$city = $c['id'];
				} else {
					$cit->addCity($this->getRequest()->getPost('city'), $this->getRequest()->getPost('ass_region'));
					$city = $cit->getAdapter()->lastInsertId();
				}
				$logo = $this->getRequest()->getPost('logo');
				if(!empty($logo)) {
					//moving logo from the temporary folder
					rename($_SERVER['DOCUMENT_ROOT'] .'/images/tmp/' . $logo, $_SERVER['DOCUMENT_ROOT'].'/images/vineyard/logo/' . $logo);
				}
				if(!empty($_POST['photos'])) {
					foreach ($_POST['photos'] as $value) {
						//moving photos from the temporary folder
						@rename($_SERVER['DOCUMENT_ROOT'] .'/images/tmp/original_' . $value, $_SERVER['DOCUMENT_ROOT'].'/images/vineyard/photos/original/original_' . $value);
						@rename($_SERVER['DOCUMENT_ROOT'] .'/images/tmp/small_' . $value, $_SERVER['DOCUMENT_ROOT'].'/images/vineyard/photos/small/small_' . $value);
						@rename($_SERVER['DOCUMENT_ROOT'] .'/images/tmp/big_' . $value, $_SERVER['DOCUMENT_ROOT'].'/images/vineyard/photos/big/big_' . $value);
					}
				}
				$vineyard = new Application_Model_Vineyards();
				$alias = Main::friendlyAlias($this->getRequest()->getPost('name'));
				$count = $vineyard->getCountName($this->getRequest()->getPost('name'));
				if($count->count > 0) {
					$alias = $alias . $count->count;
				}
				$telephone = array('country_code' => $this->getRequest()->getPost('country_code'), 
							'city_code' => $this->getRequest()->getPost('city_code'), 
							'telephone' => $this->getRequest()->getPost('telephone')
							);
				$telephone = serialize($telephone);
				$vineyard->addVineyard(
										$this->getRequest()->getPost('name'), 
										$this->getRequest()->getPost('nameloc'),
										$this->getRequest()->getPost('address1'),
										$this->getRequest()->getPost('address2'),
										$city,
										$this->getRequest()->getPost('zip'),
										$this->getRequest()->getPost('country'),
										$this->getRequest()->getPost('continent'),
										$telephone,
										$this->getRequest()->getPost('fax'),
										$this->getRequest()->getPost('email'),
										$this->getRequest()->getPost('web'),
										$this->getRequest()->getPost('loc_y'),
										$this->getRequest()->getPost('loc_z'),
										$this->getRequest()->getPost('region'),
										$logo,
										$this->getRequest()->getPost('proprietor'),
										$this->getRequest()->getPost('visits'),
										$this->getRequest()->getPost('groups'),
										$this->getRequest()->getPost('restaurant'),
										$this->getRequest()->getPost('weddings'),
										$this->getRequest()->getPost('seminars'),
										$this->getRequest()->getPost('appointment'),
										$this->getRequest()->getPost('individuals'),
										$this->getRequest()->getPost('accommodation'),
										$this->getRequest()->getPost('ass_region'), 
										$this->getRequest()->getPost('tasting'), 
										$this->getRequest()->getPost('tour'), 
										$this->getRequest()->getPost('sales'),
										$this->getRequest()->getPost('workshops'),
										$this->getRequest()->getPost('notes_chang'), 
										$this->getRequest()->getPost('owner'),
										$alias
							);
				$vineyard->updateIndex();
				$vineyard_id = $vineyard->getAdapter()->lastInsertId();
				$photos = new Application_Model_Photos();
				$vin_photo = new Application_Model_VineyardPhotos();
				$post_photos = $this->getRequest()->getPost('photos');
				if(!empty($post_photos)) {
					foreach ($post_photos as $photo) {
						$photos->addPhoto($photo);
						$photo_id = $photos->getAdapter()->lastInsertId();
						$vin_photo->addVineyardPhoto($vineyard_id, $photo_id);
					}
				}	
				if(!empty($_POST['season']['name'][0])) {
					$seasons	=	array();
					for($i = 0; $i < count($_POST['season']['name']); $i++){
						$seasons[$i]['name']	=	$_POST['season']['name'][$i];
						$seasons[$i]['appointment']	=	$_POST['season']['appointment'][$i];
						$seasons[$i]['date1']	=	$_POST['season']['date1'][$i];
						$seasons[$i]['date2']	=	$_POST['season']['date2'][$i];
						$seasons[$i]['weeks']	=	$_POST['season']['weeks'][$i];
						$seasons[$i]['time1']	=	$_POST['season']['time1'][$i];
						$seasons[$i]['time2']	=	$_POST['season']['time2'][$i];
						$seasons[$i]['notes']	=	$_POST['season']['notes'][$i];
					}					
					$seas = new Application_Model_Seasons();
					$vin_season = new Application_Model_VineyardSeasons();
					foreach ($seasons as $season) {
						if(!empty($season['name'])) {
							$seas->addSeason(
												$season['name'], 
												$season['appointment'], 
												$season['date1'], 
												$season['date2'], 
												serialize($season['weeks']), 
												$season['time1'], 
												$season['time2'], 
												$season['notes']
										);
							$season_id = $seas->getAdapter()->lastInsertId();
							$vin_season->addVineyardSeason($vineyard_id, $season_id);
						}	
					}
				}
				if(!empty($_POST['wines']['name'][0])) {
					$wines	=	array();
					for($i = 0; $i < count($_POST['wines']['name']); $i++){
						$wines[$i]['name']		=	$_POST['wines']['name'][$i];
						$wines[$i]['grapes']	=	$_POST['wines']['grapes'][$i];
						$wines[$i]['type']		=	$_POST['wines']['type'][$i];
//						$wines[$i]['vintage']	=	$_POST['wines']['vintage'][$i];
						if(!empty($_POST['wines']['image'][$i])){
							$image = $_POST['wines']['image'][$i];
							@rename($_SERVER['DOCUMENT_ROOT'] .'/images/tmp/' . $image, $_SERVER['DOCUMENT_ROOT'].'/images/wine/' . $image);
							$wines[$i]['image']	=	$image;
						}
					}	
					$win_mod = new Application_Model_Wines();
					$win_mod->updateIndex();
					$vin_wine = new Application_Model_VineyardWines();
					foreach ($wines as $wine) {
						$win_mod->newWine(
										$wine['name'], 
										serialize($wine['grapes']), 
										$wine['type'], 
										$wine['vintage'], 
										$wine['image']
										);
						$wine_id = $win_mod->getAdapter()->lastInsertId();
						$vin_wine->addVineyardWine($vineyard_id, $wine_id);
					}
				}
				$vin_spoken = new Application_Model_VineyardSpokens();
				foreach ($this->getRequest()->getPost('spoken') as $value) {
					if(!empty($value)) {
						$vin_spoken->addVineyardSpoken($vineyard_id, $value);
					}
				}

				$vin_grape = new Application_Model_VineyardGrapes();
				foreach ($this->getRequest()->getPost('grapes') as $grape) {
					if(!empty($grape)) {
						$vin_grape->addVineyardGrape($vineyard_id, $grape);
					}
				}
				$config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'production');
				$user_mod = new Application_Model_Users();
				$admins = $user_mod->getAdmins();
				$params['link'] = 'http://' . $_SERVER['HTTP_HOST'] . '/' . $_SESSION['lang'] . '/vineyards/verifyvineyard/' . main::friendlyAlias($this->getRequest()->getPost('name'));
				foreach($admins as $admin) {
					myMailer::sendMail(
										$config->admin->email, 
										$config->admin->name, 
										$admin->email, 
										'New Add Vineyard By Vintlas', 
										'addvineyard', 
										$params
					);
				}
				$part_mod = new Application_Model_Partners();
				$users  = $part_mod->getRegionUsers($this->getRequest()->getPost('ass_region'));
				if(!empty($users)) {				
					foreach ($users as $user) {
						myMailer::sendMail(
											$config->admin->email, 
											$config->admin->name, 
											$user->email, 
											'New Add Vineyard By Vintlas', 
											'addvineyard', 
											$params
						);				
					}
				}
				if(Zend_Auth::getInstance()->getIdentity()->role == 'admin') {
					$this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/main/managelistings');
				} else {
					$this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/main/userlistings');
				}
			} else {
				$form->populate($formData);
			}
		}	
    }

    /**
     * Upload logo and photos for vineyard
     *
     *
     *
     */
    public function uploadAction()
    {
		$this->_helper->layout->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);		
		if(!$this->getRequest()->getPost()) throw new Zend_Exception("The page you requested was not found.", 404);
		//creating headers
		header('Vary: Accept');
		if (isset($_SERVER['HTTP_ACCEPT']) &&
		    (strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false)) {
		    header('Content-type: application/json');
		} else {
		    header('Content-type: text/plain');
		}
		//for logo vineyard
		if(isset($_FILES['logo'])) {
			$file_name = time() . md5($_FILES["logo"]["name"]);
			$image = new acResizeImage($_FILES["logo"]["tmp_name"]);
			$image->resize('192', '130')->save($_SERVER['DOCUMENT_ROOT'] . '/images/tmp/', $file_name);
			$type = 'logo';
			echo json_encode(array(
								array(
									'type' => $type, 
									'name' => $file_name,
									'url' => '/images/tmp/' . $file_name
									)
							));							
		}
		if(isset($_FILES['image'])) {
			$file_name = time() . md5($_FILES["image"]["name"]);
			$image = new acResizeImage($_FILES["image"]["tmp_name"]);
			$image->resize('150', '110')->save($_SERVER['DOCUMENT_ROOT'] . '/images/tmp/', $file_name);
			echo json_encode(array(
						array(
							'type' => 'image',
							'name' => $file_name,
							'url' => '/images/tmp/' . $file_name
				)
				));									
		}
		//for photos vineyard
		if(isset($_FILES['photo'])) {
			$photo_name = array_filter($_FILES['photo']['name']);
			   foreach ($photo_name as $key => $name) {
				$name =  time() . md5($_FILES['photo']['name'][$key]);
				$tmp_name = $_FILES['photo']['tmp_name'][$key];
				$image = new acResizeImage($tmp_name);
				$image->resize('800', '600')->save($_SERVER['DOCUMENT_ROOT'] . '/images/tmp/', 'original_' . $name);
				$image->resize('568', '427')->save($_SERVER['DOCUMENT_ROOT'] . '/images/tmp/', 'big_' . $name);
				$image->resize('100', '100')->save($_SERVER['DOCUMENT_ROOT'] . '/images/tmp/', 'small_' . $name);
				$result[] =  array(
										'type' => 'photo', 
										'name' => $name,
										'url' => '/images/tmp/small_' . $name
							);
			}
			echo json_encode($result);
		}
    }

    /**
     * Search city for ajax autocomplite
     *
     *
     *
     */
    public function citysearchAction()
    {
		$this->_helper->layout->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);		
		if(empty($_POST)) throw new Zend_Exception("The page you requested was not found.", 404);		
		$city = new Application_Model_Cities();
		$res = $city->getCitiesByName($_POST['search']);
		$auto_res = array();
		foreach ($res as $key=>$val) {
			$auto_res[$key]['id']    = $val['id'];
			$auto_res[$key]['label'] = $val['name'];
		}
		echo json_encode($auto_res);
    }
	
    public function correctinfoAction()
    {
		$this->_helper->layout->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);		
		$_SESSION['redirect_vin'] = $_SERVER['HTTP_REFERER'];
		$this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/auth/login');
    }
	
    /**
     * Ajax select country and associated region for vineyard 
     *
     *
     *
     */
    public function ajaxselectAction()
    {
		$this->_helper->layout->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);		
		if(empty($_POST)) throw new Zend_Exception("The page you requested was not found.", 404); 	
		if(!empty($_POST['continent'])) {
			$continent = $_POST['continent'];
			$country_mod = new Application_Model_Countries();
			$countries = $country_mod->getCountriesByContinentId($continent);
			if(empty($countries)) {
				$countries_mas[] = array('id'=>'', 'title'=>'No Countries for Continent');
			} else {
				$countries_mas[] = array('id'=>'', 'title'=>'Select a Country');
			}
			foreach ($countries as $country) {
				$countries_mas[] = array('id'=>$country->code, 'title'=>$country->name_en);
			}
			$result = array('country' => $countries_mas);
		} elseif(!empty($_POST['country_mod'])) {
			$country = $_POST['country_mod'];
			$ass_region_mod = new Application_Model_Assregions();
			$ass_regions = $ass_region_mod->getAssregionsByCountryIdIsExistVineyards($country);
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
			$country = $_POST['country'];
			$ass_region_mod = new Application_Model_Assregions();
			$ass_regions = $ass_region_mod->getAssregionsByCountryId($country);
			if(empty($ass_regions)) {
				$ass_regions_mas[] = array('id'=>'', 'title'=>'No Associated Regions for Country');
			} else {
				$ass_regions_mas[] = array('id'=>'', 'title'=>'Select Associated Region');
			}			
			foreach ($ass_regions as $ass_region) {
				$ass_regions_mas[] = array('id'=>$ass_region->id, 'title'=>$ass_region->name);
			}
			$result = array('ass_region' => $ass_regions_mas);
		}
		print json_encode($result);
    }

	public function correctvineyardAction()
	{
		if (!Zend_Auth::getInstance()->hasIdentity()) {
			throw new Zend_Exception("The page you requested was not found.", 404);
		}
		if(Zend_Auth::getInstance()->getIdentity()->role == 'admin') $this->_helper->layout->setLayout('admin');
		$this->view->headScript()->appendFile('/js/vineyards_correct.js')
								;
		$this->view->headTitle('Correct Vineyard');
		$this->view->headMeta()->appendName('keywords', 'vineyard, winery, vineyard tours, winery tours, wine tours, wine tasting');	
		$this->view->headMeta()->appendName('description', 'The vineyards around the world');
		$this->view->assign('message', "Correct vineyard");		
		$id = $this->_getParam('id');
		$cor_id = new Application_Model_Corrects();
		$correct = $cor_id->correctById($id);
		$this->view->assign('correct', $correct);
		$vin_mod = new Application_Model_Vineyards();
		$alias = $vin_mod->getVineyardById($correct->listing)->alias;
		if(Zend_Auth::getInstance()->getIdentity()->role == 'admin') {
			$data_vineyard = $vin_mod->getVineyard($alias);
		} else {
			$data_vineyard = $vin_mod->addFilterByUserId(Zend_Auth::getInstance()->getIdentity()->id)->getVineyard($alias);
		}
		$this->view->assign('photos', $vin_mod->getPhotosVineyard($data_vineyard->id));
		$data_vineyard = $data_vineyard->toArray();
		foreach ($vin_mod->getGrapesVineyard($data_vineyard['id']) as $grape) {
			$data_vineyard['grapes'][] = $grape->id;
		}
		$this->view->assign('spoken', $vin_mod->getSpokensVineyard($data_vineyard['id']));
		$this->view->assign('vineyard', $data_vineyard);
		$seasons = new Application_Model_Seasons();
		$this->view->assign('wines', $vin_mod->getWinesVineyard($data_vineyard['id']));
		$this->view->assign('seasons', $seasons->getSeasonByVineyardId($data_vineyard['id']));		
	}

	public function editvineyardAction()
	{
		if (!Zend_Auth::getInstance()->hasIdentity()) {
			throw new Zend_Exception("The page you requested was not found.", 404);
		}
		$this->view->headTitle('Edit Vineyard');
		$this->view->headMeta()->appendName('keywords', 'vineyard, winery, vineyard tours, winery tours, wine tours, wine tasting');	
		$this->view->headMeta()->appendName('description', 'The vineyards around the world');
		$this->view->assign('message', "Edit vineyard");
		$this->view->headScript()->appendFile('/js/vineyards.js');
		$form = new Application_Form_Addlisting();
		$alias = $this->_getParam('vineyard');
		$this->view->form = $form;
		$form->setAction('/' . $_SESSION['lang'] . '/vineyards/editvineyard/vineyard/'.$alias);
		$form->add->setLabel('Edit vineyard');
		if ($this->getRequest()->isPost()) {
			$formData = $this->getRequest()->getPost();
			$form->country->setRequired(false);
			$form->ass_region->setRequired(false);
			if ($form->isValid($formData)) {
				$vineyard = new Application_Model_Vineyards();
				$cit = new Application_Model_Cities();
				$c = $cit->isExist($this->getRequest()->getPost('city'));
				if($c) {
					$city = $c['id'];
				} else {
					$cit->addCity($this->getRequest()->getPost('city'), $this->getRequest()->getPost('ass_region'));
					$city = $cit->getAdapter()->lastInsertId();
				}
				if(Zend_Auth::getInstance()->getIdentity()->role != 'admin') {
					if($vineyard->itsMyVineyard($this->getRequest()->getPost('id')) === false) {
						$this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/main');
					}
				}
				$vin_data = $vineyard->getVineyard($alias)->toArray();
				$logo = $this->getRequest()->getPost('logo');
				if(!empty($logo) && $logo != $vin_data['logo']) {
					//moving logo from the temporary folder
					@rename($_SERVER['DOCUMENT_ROOT'] .'/images/tmp/' . $logo, $_SERVER['DOCUMENT_ROOT'].'/images/vineyard/logo/' . $logo);
				}
				if(!empty($_POST['photos'])) {
					foreach ($_POST['photos'] as $value) {
						//moving photos from the temporary folder
						@rename($_SERVER['DOCUMENT_ROOT'] .'/images/tmp/original_' . $value, $_SERVER['DOCUMENT_ROOT'].'/images/vineyard/photos/original/original_' . $value);
						@rename($_SERVER['DOCUMENT_ROOT'] .'/images/tmp/small_' . $value, $_SERVER['DOCUMENT_ROOT'].'/images/vineyard/photos/small/small_' . $value);
						@rename($_SERVER['DOCUMENT_ROOT'] .'/images/tmp/big_' . $value, $_SERVER['DOCUMENT_ROOT'].'/images/vineyard/photos/big/big_' . $value);
					}
				}
				$telephone = array('country_code' => $this->getRequest()->getPost('country_code'), 
							'city_code' => $this->getRequest()->getPost('city_code'), 
							'telephone' => $this->getRequest()->getPost('telephone')
							);
				$telephone = serialize($telephone);
				$vineyard->updateVineyard(
										$this->getRequest()->getPost('id'), 
										$this->getRequest()->getPost('name'), 
										$this->getRequest()->getPost('nameloc'),
										$this->getRequest()->getPost('address1'),
										$this->getRequest()->getPost('address2'),
										$city,
										$this->getRequest()->getPost('zip'),
										$this->getRequest()->getPost('country'),
										$this->getRequest()->getPost('continent'),
										$telephone,
										$this->getRequest()->getPost('fax'),
										$this->getRequest()->getPost('email'),
										$this->getRequest()->getPost('web'),
										$this->getRequest()->getPost('loc_y'),
										$this->getRequest()->getPost('loc_z'),
										$this->getRequest()->getPost('region'),
										$logo,
										$this->getRequest()->getPost('proprietor'),
										$this->getRequest()->getPost('visits'),
										$this->getRequest()->getPost('groups'),
										$this->getRequest()->getPost('restaurant'),
										$this->getRequest()->getPost('weddings'),
										$this->getRequest()->getPost('seminars'),
										$this->getRequest()->getPost('appointment'),
										$this->getRequest()->getPost('individuals'),
										$this->getRequest()->getPost('accommodation'),
										$this->getRequest()->getPost('ass_region'), 
										$this->getRequest()->getPost('tasting'), 
										$this->getRequest()->getPost('tour'), 
										$this->getRequest()->getPost('sales'),
										$this->getRequest()->getPost('workshops'),
										$this->getRequest()->getPost('notes_chang'), 
										$this->getRequest()->getPost('owner')
							);
				$vineyard->updateIndex();
				$vineyard_id = $vin_data['id'];
				$photos = new Application_Model_Photos();
				$vin_photo = new Application_Model_VineyardPhotos();
				$vin_photo->deletePhotosByVineyardId($vineyard_id);
				$post_photos = $this->getRequest()->getPost('photos');
				if(!empty($post_photos)) {
					foreach ($post_photos as $photo) {
						$photos->addPhoto($photo);
						$photo_id = $photos->getAdapter()->lastInsertId();
						$vin_photo->addVineyardPhoto($vineyard_id, $photo_id);
					}
				}
				if(!empty($_POST['season']['name'][0])) {
					$seasons	=	array();
					for($i = 0; $i < count($_POST['season']['name']); $i++){
						$seasons[$i]['name']	=	$_POST['season']['name'][$i];
						$seasons[$i]['appointment']	=	$_POST['season']['appointment'][$i];
						$seasons[$i]['date1']	=	$_POST['season']['date1'][$i];
						$seasons[$i]['date2']	=	$_POST['season']['date2'][$i];
						$seasons[$i]['weeks']	=	$_POST['season']['weeks'][$i];
						$seasons[$i]['time1']	=	$_POST['season']['time1'][$i];
						$seasons[$i]['time2']	=	$_POST['season']['time2'][$i];
						$seasons[$i]['notes']	=	$_POST['season']['notes'][$i];
					}					
					$seas = new Application_Model_Seasons();
					$vin_season = new Application_Model_VineyardSeasons();
					$vin_season->deleteSeasonsByVineyardId($vineyard_id);
					foreach ($seasons as $season) {
						if(!empty($season['name'])) {
							$seas->addSeason(
												$season['name'], 
												$season['appointment'], 
												$season['date1'], 
												$season['date2'], 
												serialize($season['weeks']), 
												$season['time1'], 
												$season['time2'], 
												$season['notes']
										);
							$season_id = $seas->getAdapter()->lastInsertId();
							$vin_season->addVineyardSeason($vineyard_id, $season_id);
						}
					}
				}	

				$vin_wine = new Application_Model_VineyardWines();
				$vin_wine->deleteWinesByVineyardId($vineyard_id);
				if(!empty($_POST['wines']['name'][0])) {
					$wines	=	array();
					for($i = 0; $i < count($_POST['wines']['name']); $i++){
						$wines[$i]['name']		=	$_POST['wines']['name'][$i];
						$wines[$i]['grapes']	=	$_POST['wines']['grapes'][$i];
						$wines[$i]['type']		=	$_POST['wines']['type'][$i];
						$wines[$i]['vintage']	=	$_POST['wines']['vintage'][$i];
						if(!empty($_POST['wines']['image'][$i])){
							$image = $_POST['wines']['image'][$i];
							@rename($_SERVER['DOCUMENT_ROOT'] .'/images/tmp/' . $image, $_SERVER['DOCUMENT_ROOT'].'/images/wine/' . $image);
							$wines[$i]['image']	=	$image;
						}
					}	
					$win_mod = new Application_Model_Wines();
					$win_mod->updateIndex();
					foreach ($wines as $wine) {
						$win_mod->newWine(
										$wine['name'], 
										serialize($wine['grapes']), 
										$wine['type'], 
										$wine['vintage'], 
										$wine['image']
										);
						$wine_id = $win_mod->getAdapter()->lastInsertId();
						$vin_wine->addVineyardWine($vineyard_id, $wine_id);
					}
				}
				$vin_spoken = new Application_Model_VineyardSpokens();
				$vin_spoken->deleteSpokensByVineyardId($vineyard_id);
				foreach ($this->getRequest()->getPost('spoken') as $value) {
					if(!empty($spoken)) {
						$vin_spoken->addVineyardSpoken($vineyard_id, $value);
					}
				}

				$vin_grape = new Application_Model_VineyardGrapes();
				$vin_grape->deleteGrapesByVineyardId($vineyard_id);
				foreach ($this->getRequest()->getPost('grapes') as $grape) {
					if(!empty($grape)) {
						$vin_grape->addVineyardGrape($vineyard_id, $grape);
					}
				}
				$_SESSION['message'] = 'Vineyard has successfully edited!';			
				header("Location: ".$_SERVER['HTTP_REFERER']);
			} else {
				$vineyard = new Application_Model_Vineyards();
				$data_vineyard = $vineyard->addFilterByUserId(Zend_Auth::getInstance()->getIdentity()->id)->getVineyard($alias);
				if(!isset($data_vineyard)) throw new Zend_Exception("The page you requested was not found.", 404);
				$this->view->assign('photos', $vineyard->getPhotosVineyard($data_vineyard->id));
				$data_vineyard = $data_vineyard->toArray();
				$this->view->assign('loc_y', $data_vineyard['loc_y']);
				$this->view->assign('loc_z', $data_vineyard['loc_z']);
				$this->view->assign('logo', $data_vineyard['logo']);
				$this->view->assign('alias', $alias);
				$seasons = new Application_Model_Seasons();
				$this->view->assign('wines', $vineyard->getWinesVineyard($data_vineyard['id']));
				$this->view->assign('seasons', $seasons->getSeasonByVineyardId($data_vineyard['id']));
				$form->populate($data_vineyard);
			}
		} else {
			if (!empty($alias)) {
				$vineyard = new Application_Model_Vineyards();
				if(Zend_Auth::getInstance()->getIdentity()->role != 'admin') {
					$data_vineyard = $vineyard->addFilterByUserId(Zend_Auth::getInstance()->getIdentity()->id)->getVineyard($alias);
				} else {
					$data_vineyard = $vineyard->getVineyard($alias);
				}
				if(!isset($data_vineyard)) throw new Zend_Exception("The page you requested was not found.", 404);
				$this->view->assign('photos', $vineyard->getPhotosVineyard($data_vineyard->id));
				$data_vineyard = $data_vineyard->toArray();
				foreach ($vineyard->getGrapesVineyard($data_vineyard['id']) as $grape) {
					$data_vineyard['grapes'][] = $grape->id;
				}
				foreach ($vineyard->getSpokensVineyard($data_vineyard['id']) as $spoken) {
					$data_vineyard['spoken'][] = $spoken->id;
				}
				$seasons = new Application_Model_Seasons();
				if(!empty($_SESSION['message'])) {
					$this->view->assign('flash_message', $_SESSION['message']);
					unset($_SESSION['message']);
				}
				if(Zend_Auth::getInstance()->getIdentity()->role == 'admin') {
					$cancel = '/main/managelistings';
				} elseif($vineyard->itsMyVineyard($data_vineyard['id'])) {
					$cancel = '/main/userlistings';
				} else {
					$cancel = '/main/managelistings';
				}
				$this->view->assign('cancel', $cancel);
				@$telephone = unserialize($data_vineyard['telephone']);
				$data_vineyard['country_code']	= $telephone['country_code'];
				$data_vineyard['city_code']		= $telephone['city_code'];
				$data_vineyard['telephone']		= $telephone['telephone'];
				$this->view->assign('loc_y', $data_vineyard['loc_y']);
				$this->view->assign('loc_z', $data_vineyard['loc_z']);
				$this->view->assign('logo', $data_vineyard['logo']);
				$this->view->assign('alias', $alias);
				$this->view->assign('id', $data_vineyard['id']);
				$this->view->assign('wines', $vineyard->getWinesVineyard($data_vineyard['id']));
				$this->view->assign('seasons', $seasons->getSeasonByVineyardId($data_vineyard['id']));
				$form->populate($data_vineyard);
			}
		}
    }

	public function addwineAction()
	{
		if (!Zend_Auth::getInstance()->hasIdentity()) {
			throw new Zend_Exception("The page you requested was not found.", 404);
		}
		$this->view->headTitle('Add Wine');
		$this->view->assign('message', "Add new wine");
		$this->view->headMeta()->appendName('keywords', 'vineyard, winery, vineyard tours, winery tours, wine tours, wine tasting');
		$this->view->headMeta()->appendName('description', 'The vineyards around the world');
	
		$form = new Application_Form_Wine();
		$form->submit->setLabel('Add wine');
		$this->view->form = $form;
		
		if ($this->getRequest()->isPost()) {
			$formData = $this->getRequest()->getPost();
			if ($form->isValidPartial($formData)) {
				$image = $_POST['image'];
				if(!empty($image)) {
					//moving poster from the temporary folder
					@rename($_SERVER['DOCUMENT_ROOT'] .'/images/tmp/' . $image, $_SERVER['DOCUMENT_ROOT'].'/images/wine/' . $image);
				}				
				$name = $form->getValue('name');
				$grapes = $form->getValue('grapes');
				$type = $_POST['type'];
				$vintage = $form->getValue('vintage');
				$notes = $form->getValue('notes');
				$wines = new Application_Model_Wines();
				$wines->newWine($name, serialize($grapes), $type, $vintage, $notes, $image);
				$this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/main/index');
			} else {
				$form->populate($formData);
			}	
		}   
	}


	public function editwineAction()
	{
		if (!Zend_Auth::getInstance()->hasIdentity()) {
			$this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/main/index');
		}
		$this->view->headTitle('Edit Wine');
		$this->view->assign('message', "Edit wine");
		$this->view->headMeta()->appendName('keywords', 'vineyard, winery, vineyard tours, winery tours, wine tours, wine tasting');
		$this->view->headMeta()->appendName('description', 'The vineyards around the world');
	
		$form = new Application_Form_Wine();
		$form->submit->setLabel('Edit wine');
		$alias = $this->_getParam('wine', 0);
		$this->view->form = $form;
		$form->setAction('/' . $_SESSION['lang'] . '/vineyards/editwine/wine/' . $alias);
		if ($this->getRequest()->isPost()) {
			$formData = $this->getRequest()->getPost();
			if ($form->isValidPartial($formData)) {
				$image = $_POST['image'];
				if(!empty($image)) {
					//moving poster from the temporary folder
					@rename($_SERVER['DOCUMENT_ROOT'] .'/images/tmp/' . $image, $_SERVER['DOCUMENT_ROOT'].'/images/wine/' . $image);
				}				
				$name = $form->getValue('name');
				$grapes = $form->getValue('grapes');
				$type = $_POST['type'];
				$vintage = $form->getValue('vintage');
				$notes = $form->getValue('notes');
				$wines = new Application_Model_Wines();
				$wines->newWine($name, serialize($grapes), $type, $vintage, $notes, $image);
				$this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/main/index');
			} else {
				$wine = new Application_Model_Wines();
				$data_wine = $wine->getWineByAlias($alias);
				$this->view->assign('type', $data_wine->type);
				$this->view->assign('image', $data_wine->image);
				$this->view->assign('alias', $alias);
				$data_wine['grapes'] = unserialize($data_wine->grapes);
				$form->populate($data_wine->toArray());
			}	
		} else {
			if($alias == '0') $this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/main/index');
			$wine = new Application_Model_Wines();
			$data_wine = $wine->getWineByAlias($alias);
			if(! $data_wine) $this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/main/index');
			$this->view->assign('type', $data_wine->type);
			$this->view->assign('image', $data_wine->image);
			$this->view->assign('alias', $alias);
			$data_wine['grapes'] = unserialize($data_wine->grapes);
			$form->populate($data_wine->toArray());
		}	
	}	
	
	public function uploadwineAction()
	{
		$this->_helper->layout->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);		
		//creating headers
		header('Vary: Accept');
		if (isset($_SERVER['HTTP_ACCEPT']) && (strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false)) {
			header('Content-type: application/json');
		} else {
			header('Content-type: text/plain');
		}
		//for user avatar
		$file_name = time() . $_FILES["image"]["name"];
		$image = new acResizeImage($_FILES["image"]["tmp_name"]);
		$image->resize('50', '50')->save($_SERVER['DOCUMENT_ROOT'] . '/images/tmp/', $file_name);
		echo json_encode(array(
					array(
						'name' => $file_name,
						'url' => '/images/tmp/' . $file_name
					)
			));							
	}
	
	public function ajaxverifAction()
	{
		$this->_helper->layout->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);
		if(empty($_POST)) throw new Zend_Exception("The page you requested was not found.", 404);
		$listing = $_POST['listing'];
		$vin_mod = new Application_Model_Vineyards();
		$vin_mod->verifyVineyard($listing);
		$vin_data = $vin_mod->getVineyardById($listing);
		$user_mod = new Application_Model_Users();
		$user = $user_mod->getUserById($vin_data->user);
		$config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'production');
		$params['vineyardname'] = $vin_data->name;
		myMailer::sendMail(
							$config->admin->email, 
							$config->admin->name, 
							$user->email, 
							'Verified Vineyard on the site Vintlas', 
							'verified', 
							$params
		);
		$result = 'Listing is successfully changed';
		echo json_encode($result);
	}
	
	public function unverifyvineyardAction()
	{
		$this->_helper->layout->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);
		if(empty($_POST)) throw new Zend_Exception("The page you requested was not found.", 404);
		$listing = $_POST['id'];
		$vin_mod = new Application_Model_Vineyards();
		$vin_mod->unverifyVineyard($listing);
		$vin_data = $vin_mod->getVineyardById($listing);
		$user_mod = new Application_Model_Users();
		$user = $user_mod->getUserById($vin_data->user);
		$config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'production');
		$params['vineyardname'] = $vin_data->name;
		myMailer::sendMail(
							$config->admin->email, 
							$config->admin->name, 
							$user->email, 
							'Unverified Vineyard on the site Vintlas', 
							'unverified', 
							$params
		);
		$result = 'Listing is successfully changed';
		echo json_encode($result);
	}
	
	public function viewclaimAction()
	{
		$this->_helper->layout->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);		
		if(empty($_POST)) throw new Zend_Exception("The page you requested was not found.", 404);
		$id = $_POST['id'];
		$cl_mod = new Application_Model_Claimes();
		$claimes = $cl_mod->claimByListing($id);
		$this->view->assign('claimes', $claimes);
		$res['html'] = $this->view->render('claimes.phtml');
		echo json_encode($res);
	}
	
	public function modulesAction()
	{
		$this->_helper->layout->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);
		if(empty($_POST)) throw new Zend_Exception("The page you requested was not found.", 404);
		$modul_mod = new Application_Model_Modules();
		$data = $this->getRequest()->getPost();
		$result = $modul_mod->newModule(
										$data['name'], 
										$data['email'], 
										$data['telephone'], 
										$data['peoples'], 
										$data['country'], 
										$data['region'], 
										$data['message']
							);
		$config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'production');
		$user_mod = new Application_Model_Users();
		$admins = $user_mod->getAdmins();
		foreach($admins as $admin) {
			myMailer::sendMail(
								$config->admin->email, 
								$config->admin->name, 
								$admin->email, 
								'Lead Generation Module By Vintlas', 
								'leadgeneration'
			);
		}
		echo json_encode($result);
	}
	
	public function removeAction()
	{
		$this->_helper->layout->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);		
		if(empty($_POST)) throw new Zend_Exception("The page you requested was not found.", 404);
		$id = $_POST['listID'];
		$vin_mod = new Application_Model_Vineyards();
		if(!empty($_POST['remove'])) {
			$result = $vin_mod->remove($id);
		} else {
			$result = $vin_mod->recover($id);
		}
		$vin_mod->updateIndex();
		echo json_encode($result);
	}
	
	public function claimedAction()
	{
		$this->_helper->layout->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);		
		if(empty($_POST)) throw new Zend_Exception("The page you requested was not found.", 404);
		$cl_mod = new Application_Model_Claimes();
		$claim_id = $_POST['id'];
		$claim = $cl_mod->getClaimById($claim_id);
		$listing = $claim->listing;	
		$user = $claim->user;
		$user_mod = new Application_Model_Users();
		$vin_mod = new Application_Model_Vineyards();
		$user_data = $user_mod->getUserById($user);
		$vin_data = $vin_mod->getVineyardById($listing);		
		if(!empty($_POST['claim'])) {
			$vin_mod->claimVineyard($listing, $user);
			foreach ($cl_mod->claimesByListing($listing) as $value) {
				$cl_mod->updateStatus($value->id, 3);
			}			
			$cl_mod->updateStatus($claim_id, 1);
			$config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'production');
			$params['vineyardname'] = $vin_data->name;
			myMailer::sendMail(
								$config->admin->email, 
								$config->admin->name, 
								$user_data->email, 
								'Claimed Vineyard on the site Vintlas', 
								'claimed', 
								$params
			);
		} elseif(!empty($_POST['reject'])) {
			$cl_mod->deleteClaim($claim_id);
			//does not work on localhost
			$config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'production');
			$params['vineyardname'] = $vin_data->name;
			myMailer::sendMail(
								$config->admin->email, 
								$config->admin->name, 
								$user_data->email, 
								'Not Claimed Vineyard on the site Vintlas', 
								'notclaimed', 
								$params
			);
		} else {
			$vin_mod->notClaimVineyard($listing);
			$cl_mod->updateStatus($claim_id, 0);
			foreach ($cl_mod->claimesByListing($listing) as $value) {
				$cl_mod->updateStatus($value->id, 0);
			}			
		}
		$result = 'Listing is successfully changed';
		echo json_encode($result);
	}
	
	public function editcorrectvineyardAction()
	{
		$cor_id = $this->_getParam('correct');
		$type = $this->_getParam('type');
		$cor_mod = new Application_Model_Corrects();
		$cor_data = $cor_mod->correctById($cor_id);
		$vin_mod = new Application_Model_Vineyards();
		$user_mod = new Application_Model_Users();
		$user = $user_mod->getUserById($cor_data->user);
		$par_mod = new Application_Model_Partners();
		$vin_data = $vin_mod->getVineyardById($cor_data->listing);
		if($par_mod->isExistUser() || Zend_Auth::getInstance()->getIdentity()->role == 'admin') {
		} else {
			if($vin_data->user != Zend_Auth::getInstance()->getIdentity()->id) {
				throw new Zend_Exception("The page you requested was not found.", 404);
			}	
		}		
		$vin_mod->updateCorrectVineyard($cor_data);
		
		$vs_mod = new Application_Model_VineyardSpokens();
		$win_mod = new Application_Model_Wines();
		$vs_mod->deleteSpokensByVineyardId($cor_data->listing);
		$cor_mod->updateStatus($cor_id, '1');
		if(!empty($cor_data->spoken)){
			foreach(unserialize($cor_data->spoken) as $spoken) {
				$vs_mod->addVineyardSpoken($cor_data->listing, $spoken);
			}
		}
		if(!empty($cor_data->vintage)){
			foreach(unserialize($cor_data->vintage) as $key => $value) {
				$win_mod->updateVintage($key, $value);
			}
		}
		if($type == 'edit') {
			$config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'production');
			$params['vineyardname'] = $vin_data->name;
			myMailer::sendMail(
								$config->admin->email, 
								$config->admin->name, 
								$user->email, 
								'Edit the listing on the site Vintlas', 
								'acceptchanges', 
								$params
			);
		}	
		if($type == 'edit') {
			if(Zend_Auth::getInstance()->getIdentity()->role == 'admin') {
				$this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/admin/editlisting/'.$vin_data->alias);
			} else {
				$this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/vineyards/editvineyard/'.$vin_data->alias);
			}
		} else {
			$par_mod = new Application_Model_Partners();
			if($par_mod->isExistUser() || Zend_Auth::getInstance()->getIdentity()->role == 'admin') {
				$this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/main/managechanges');
			} else {
				$this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/main/listingchanges');
			}			
		}
	}

	public function infocorrectAction()
	{
		$this->_helper->layout->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);		
		if(empty($_POST)) throw new Zend_Exception("The page you requested was not found.", 404);
		$cor_mod = new Application_Model_Corrects();
		$user_mod = new Application_Model_Users();
		$user = $user_mod->getUserById($_POST['user']);
		if(!empty($_POST['cancel'])) {
			$cor_mod->updateStatus($_POST['correct'], '2');
			$config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'production');
			$params['vineyardname'] = $_POST['listing'];
			$params['comment'] = $_POST['comment'];
			myMailer::sendMail(
								$config->admin->email, 
								$config->admin->name, 
								$user->email, 
								'Edit the listing on the site Vintlas', 
								'rejectchanges', 
								$params
			);
		}	
		$result			= new JsonResponse();
		$result->html	= 'Successfuly';
		$result->result	= 1;
		echo $result;		
	}

	public function correctAction()
	{
		if(empty($_POST)) throw new Zend_Exception("The page you requested was not found.", 404);
		$cor_mod = new Application_Model_Corrects();
		$data = $this->getRequest()->getPost();
		$cor_mod->newCorrect(
							$data['listing'], 
							$data['loc_y'], 
							$data['loc_z'], 
							$data['individuals'], 
							$data['visits'], 
							$data['groups'], 
							$data['appointment'], 
							$data['spoken'], 
							$data['tasting'], 
							$data['tour'], 
							$data['sales'], 
							$data['workshops'], 
							$data['restaurant'], 
							$data['accommodation'], 
							$data['weddings'], 
							$data['seminars'], 
							$data['vintage'], 
							$data['comment']
				);
		
		$config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'production');
		$user_mod = new Application_Model_Users();
		$admins = $user_mod->getAdmins();
		$params['vineyardname'] = $_POST['listing'];
		foreach($admins as $admin) {
			myMailer::sendMail(
								$config->admin->email, 
								$config->admin->name, 
								$admin->email, 
								'A new application for a vineyard ' . $data['list_name'], 
								'application', 
								$params
			);
		}

		$part_mod = new Application_Model_Partners();
		$users  = $part_mod->getRegionUsers($data['region']);
		if(!empty($users)) {
			foreach ($users as $user) {
				myMailer::sendMail(
									$config->admin->email, 
									$config->admin->name, 
									$user->email, 
									'A new application for a vineyard ' . $data['list_name'], 
									'application', 
									$params
				);
			}
		}
		header('Location: ' . $_SERVER['HTTP_REFERER']);
	}
}