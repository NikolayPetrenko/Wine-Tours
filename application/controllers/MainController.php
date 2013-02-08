<?php
class MainController extends Zend_Controller_Action
{
	/**
     * Constructor 
     *
     */
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
	
	public function privacystatementAction()
	{
		$seo_mod = new Application_Model_Seo();
		$seo = $seo_mod->getSeoById('14');
		$this->view->headTitle($seo->title);
		$this->view->assign('message', "Privacy Statement");
//		$this->view->headMeta()->appendName('keywords', 'Vintlas, Privacy Statement');	
//		$this->view->headMeta()->appendName('description', 'Privacy Statement');
		$page_mod = new Application_Model_StaticPages();
		$page = $page_mod->getPageById('3');
		$this->view->assign('page', $page->text);
	}
	
	public function termsofuseAction()
	{
		$seo_mod = new Application_Model_Seo();
		$seo = $seo_mod->getSeoById('13');
		$this->view->headTitle($seo->title);
		$this->view->assign('message', "Terms of Use");
//		$this->view->headMeta()->appendName('keywords', 'Vintlas, Terms of Use');	
//		$this->view->headMeta()->appendName('description', 'Terms of Use');
		$page_mod = new Application_Model_StaticPages();
		$page = $page_mod->getPageById('2');
		$this->view->assign('page', $page->text);
	}


	public function updateindexAction()
	{
		$this->_helper->layout->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);
		$country_mod	= new Application_Model_Countries();
		$region_mod		= new Application_Model_Assregions();
		$vineyard_mod	= new Application_Model_Vineyards();
		$wine_mod		= new Application_Model_Wines();
		$region_mod		->updateIndex();
		$country_mod	->updateIndex();
		$vineyard_mod	->updateIndex();
		$wine_mod		->updateIndex();
		die('good');
	}

	public function indexAction()
	{
		$seo_mod = new Application_Model_Seo();
		$seo = $seo_mod->getSeoById('1');
		$this->view					->headTitle($seo->title);
		$this->view->headMeta()		->appendName('keywords', $seo->keywords);
		$this->view->headMeta()		->appendName('description', $seo->description);
		$this->view->assign('intro_text', $seo->intro_text);
		$this->view->assign('spotlight_title', $seo->spotlight_title);
		$this->view->assign('spotlight_image', $seo->spotlight_image);
		$this->view->headScript()	->appendFile('/js/select.js');
		$vin_mod	= new Application_Model_Vineyards();
		$win_mod	= new Application_Model_Wines();
		$top_reg	= new Application_Model_TopRegions();
		$this->view->assign('top_asia', $top_reg->getTopRegionsByContinent(2));
		$this->view->assign('top_europe', $top_reg->getTopRegionsByContinent(7));
		$this->view->assign('top_africa', $top_reg->getTopRegionsByContinent(3));
		$this->view->assign('top_oceania', $top_reg->getTopRegionsByContinent(9));
		$this->view->assign('top_north_america', $top_reg->getTopRegionsByContinent(4));
		$this->view->assign('top_south_america', $top_reg->getTopRegionsByContinent(5));
		$vineyards	= $vin_mod->getVineyardsByLimit('5');
		$wines		= $win_mod->getWinesByLimit('5');
		$this->view->assign('wines', $wines);
		$this->view->assign('vineyards', $vineyards);
	}
	
	public function aboutusAction()
	{
		$seo_mod = new Application_Model_Seo();
		$seo = $seo_mod->getSeoById('12');
		$this->view->headTitle($seo->title);
//		$this->view->headMeta()		->appendName('keywords', 'Vintlas, About Us');
//		$this->view->headMeta()		->appendName('description', 'About Us');
		$this->view->headScript()	->appendFile('/js/select.js');
		$win_mod	= new Application_Model_Wines();
		$page_mod	= new Application_Model_StaticPages();
		$page		= $page_mod->getPageById('1');
		$wines		= $win_mod->getWinesByLimit('5');
		$this->view->assign('wines', $wines);
		$this->view->assign('page', $page->text);
	}
	
	/**
	* Displaying messages received from users of the system
	*
	*/
	public function systemmesAction()
	{
		$config					= new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'development');
		$this->view				->headTitle('System message');
		$this->view->headMeta()	->appendName('keywords', $config->keywords->main->systemmes);	
		$this->view->headMeta()	->appendName('description', $config->description->main->systemmes);
		if($this->_helper->FlashMessenger->hasMessages()) {
			$messages = $this->_helper->FlashMessenger->getMessages(); 
			$this->view->message = $messages;
		}
		if(!empty($_SESSION['redirect'])) {
			$redirect = $_SESSION['redirect'];
			unset($_SESSION['redirect']);
			header('Refresh: 6; ' . $redirect);
		} else {
			header('Refresh: 6; http://' . $_SERVER['HTTP_HOST'] . '/' . $_SESSION['lang'] . '/main');
		}
	}

	public function contactusAction()
	{
		$config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'development');
		$seo_mod = new Application_Model_Seo();
		$seo = $seo_mod->getSeoById('9');
		$this->view					->headTitle($seo->title);
		$this->view->assign('message', "Contact Us");
//		$this->view->headMeta()->appendName('keywords', $config->keywords->main->contactus);	
//		$this->view->headMeta()->appendName('description', $config->description->main->contactus);
		$form = new Application_Form_Contact();
		$config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'production');
		$form->setAction('/' . $_SESSION['lang']. '/main/contactus');
		$this->view->form = $form;
		if ($this->getRequest()->isPost()) {
			$formData = $this->getRequest()->getPost();
			if ($form->isValid($formData)) {
				$name = $form->getValue('name') ? $form->getValue('name') : 'Unspecified';
					$cont_mod = new Application_Model_ContactUs();
					$cont_mod->addContact(
											$name, 
											$form->getValue('email'), 
											$form->getValue('subject'), 
											$form->getValue('comment')
								);
					$id = $cont_mod->getAdapter()->lastInsertId();

				$user_mod			= new Application_Model_Users();
				$admins				= $user_mod->getAdmins();
				$params['link']		= 'http://' . $_SERVER['HTTP_HOST']. '/' . $_SESSION['lang'] . '/admin/managecontacts/' . $id;
				$params['comment']	= $form->getValue('comment');
				foreach($admins as $admin) {
					myMailer::sendMail(
										$form->getValue('email'), 
										$name, 
										$admin->email, 
										$form->getValue('subject'), 
										'contactus',
										$params
					); 		
				}
				$this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/main');
			} else {
				$form->populate($formData);
			}	
		}   	
	}

	public function viewcountryAction()
	{
		$this->view->headScript()->appendFile('/js/country_view.js')
								  ->appendFile('/js/select.js')
								  ;
		$country_mod	= new Application_Model_Countries();
		$country		= $country_mod->getCountryByAlias($this->_getParam('country'));
		if(empty($country)) throw new Zend_Exception("The page you requested was not found.", 404);
		$seo_mod = new Application_Model_Seo();
		$seo = $seo_mod->getSeoById('11');
		$this->view->assign('alt', str_replace('{Country}', $country->name_en, $seo->alts));
		$this->view->assign('img', str_replace('{country}', $country->name_en, $seo->img));
		$this->view->headTitle(str_replace('{Country}', $country->name_en, $seo->title));
		$this->view->headMeta()	->appendName('keywords', $seo->keywords);
		$this->view->headMeta()	->appendName('description', str_replace('{Country}', $country->name_en, $seo->description));
		$this->view->assign('country', $country);
		$this->view->assign('country_loc', $country->code);
	}
	
	public function viewregionAction()
	{
		$this->view->headScript()	->appendFile('/js/region_view.js')
									->appendFile('/js/select.js')
									;
		$reg_mod	= new Application_Model_Assregions();
		$region		= $reg_mod->getRegionByAlias($this->_getParam('region'));
		if(empty($region)) throw new Zend_Exception("The page you requested was not found.", 404);
		$seo_mod = new Application_Model_Seo();
		$seo = $seo_mod->getSeoById('10');
		$this->view->assign('alt', str_replace('{Region}', $region->name, $seo->alts));
		$this->view->assign('img', str_replace('{region}', $region->name, $seo->img));
		$title = str_replace('{Region}', $region->name, $seo->title);
		$title = str_replace('{Country}', $region->country_name, $title);
		$description = str_replace('{Region}', $region->name, $seo->description);
		$description = str_replace('{Country}', $region->country_name, $description);
		$this->view->headTitle($title);
		$this->view->headMeta()	->appendName('keywords', $seo->keywords);
		$this->view->headMeta()	->appendName('description', $description);
		$this->view->assign('region', $region);
		$this->view->assign('country_loc', $region->country);
		$this->view->assign('reg_loc', $region->id);
	}
	
	public function userlistingsAction()
	{
		$config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'development');
		if(!Zend_Auth::getInstance()->hasIdentity()) {
			throw new Zend_Exception("The page you requested was not found.", 404);
		}
			
		$this->view->headScript()	
									->appendFile('/js/listings_manage.js')
									;
		$this->view->headTitle('Manage Listings');
		$this->view->assign('message', "Manage Listings");
		$this->view->headMeta()->appendName('keywords', $config->keywords->main->userlistings);	
		$this->view->headMeta()->appendName('description', $config->description->main->userlistings);
		$vin_mod	= new Application_Model_Vineyards();
		$type		= $this->_getParam('type');
		$this->view->assign('type', $type);
		switch ($type) {
			case 'all':
				$result = $vin_mod->getVineyardsByUser();
				break;
			case 'verif':
				$result = $vin_mod->addFilterByStatus('1')->getVineyardsByUser();
				break;
			case 'unverif':
				$result = $vin_mod->addFilterByStatus('0')->getVineyardsByUser();
				break;			
			default :
				$result = $vin_mod->getVineyardsByUser();
		}
		$config		= new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'development');
		$page		= $this->_getParam('page');
		$paginator	= new Zend_Paginator(new Zend_Paginator_Adapter_Array($result->toArray()));
		$paginator->setItemCountPerPage($config->pagination->listings);
		$paginator->setCurrentPageNumber($page);
		$paginator->setView($this->view);
		$this->view->paginator = $paginator;
	}
	
	public function managelistingsAction()
	{
		$config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'development');
		$par_mod = new Application_Model_Partners();
		if($par_mod->isExistUser() || Zend_Auth::getInstance()->getIdentity()->role == 'admin') {
		} else {
			throw new Zend_Exception("The page you requested was not found.", 404);
		}
			
		if(Zend_Auth::getInstance()->getIdentity()->role == 'admin') $this->_helper->layout->setLayout('admin');	
		$this->view->headScript()	
									->appendFile('/js/listings_manage.js')
									;
		$this->view->headTitle('Manage Listings');
		$this->view->assign('message', "Manage Listings");
		$this->view->headMeta()->appendName('keywords', $config->keywords->main->managelistings);	
		$this->view->headMeta()->appendName('description', $config->description->main->managelistings);
		$vin_mod	= new Application_Model_Vineyards();
		$type		= $this->_getParam('type');
		$this->view->assign('type', $type);
		if(Zend_Auth::getInstance()->getIdentity()->role == 'admin') {
			switch ($type) {
				case 'all':
					$result = $vin_mod->getVineyardsByAdmin();
					break;
				case 'verif':
					$result = $vin_mod->addFilterByStatus('1')->getVineyardsByAdmin();
					break;
				case 'unverif':
					$result = $vin_mod->addFilterByStatus('0')->getVineyardsByAdmin();
					break;			
				default :
					$result = $vin_mod->getVineyardsByAdmin();
			}
		} else {
			switch ($type) {
				case 'all':
					$result = $vin_mod->getVineyardsByPartner();
					break;
				case 'verif':
					$result = $vin_mod->addFilterByStatus('1')->getVineyardsByPartner();
					break;
				case 'unverif':
					$result = $vin_mod->addFilterByStatus('0')->getVineyardsByPartner();
					break;			
				default :
					$result = $vin_mod->getVineyardsByPartner();
			}			
		}	
		$config		= new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'development');
		$page		= $this->_getParam('page');
		$paginator	= new Zend_Paginator(new Zend_Paginator_Adapter_Array($result->toArray()));
		$paginator->setItemCountPerPage($config->pagination->listings);
		$paginator->setCurrentPageNumber($page);
		$paginator->setView($this->view);
		$this->view->paginator = $paginator;
	}

	public function managechangesAction()
	{
		$config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'development');
		if(!Zend_Auth::getInstance()->hasIdentity()) throw new Zend_Exception("The page you requested was not found.", 404);
		if(Zend_Auth::getInstance()->getIdentity()->role == 'admin') $this->_helper->layout->setLayout('admin');	
		$this->view->headScript()
						->appendFile('/js/listings_manage.js')
						;
		$this->view->headTitle('Manage Changes Listings');
		$this->view->assign('message', "Manage Changes Listings");
		$this->view->headMeta()->appendName('keywords', $config->keywords->main->managechanges);	
		$this->view->headMeta()->appendName('description', $config->description->main->managechanges);
		$par_mod = new Application_Model_Partners();
		$cor_mod = new Application_Model_Corrects();
		$type = $this->_getParam('type');
		$this->view->assign('type', $type);
		if(Zend_Auth::getInstance()->getIdentity()->role == 'admin') {
			switch ($type) {
				case 'all':
					$result = $cor_mod->getCorrects();
					break;
				case 'verif':
					$result = $cor_mod->addFilterByStatus('1')->getCorrects();
					break;
				case 'unverif':
					$result = $cor_mod->addFilterByStatus('0')->getCorrects();
					break;			
				case 'reject':
					$result = $cor_mod->addFilterByStatus('2')->getCorrects();
					break;				
				default :
					$result = $cor_mod->getCorrects();
			}
		} elseif($par_mod->isExistUser()) {
			switch ($type) {
				case 'all':
					$result = $cor_mod->getCorrectsByPartner();
					break;
				case 'verif':
					$result = $cor_mod->addFilterByStatusUser('1')->getCorrectsByPartner();
					break;
				case 'unverif':
					$result = $cor_mod->addFilterByStatusUser('0')->getCorrectsByPartner();
					break;	
				case 'reject':
					$result = $cor_mod->addFilterByStatusUser('2')->getCorrectsByPartner();
					break;					
				default :
					$result = $cor_mod->getCorrectsByPartner();
			}			
		} else {
			$this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/main');				
		}
		$config		= new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'development');
		$page		= $this->_getParam('page');
		$paginator	= new Zend_Paginator(new Zend_Paginator_Adapter_Array($result->toArray()));
		$paginator->setItemCountPerPage($config->pagination->changes);
		$paginator->setCurrentPageNumber($page);
		$paginator->setView($this->view);
		$this->view->paginator = $paginator;		
	}

	public function listingchangesAction()
	{
		$config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'development');
		$this->view->headScript()
									->appendFile('/js/listings_manage.js')
									;
		$this->view->headTitle('Manage Changes Listings');
		$this->view->assign('message', "Manage Changes Listings");
		$this->view->headMeta()->appendName('keywords', $config->keywords->main->listingchanges);	
		$this->view->headMeta()->appendName('description', $config->description->main->listingchanges);
		$cor_mod = new Application_Model_Corrects();
		$type = $this->_getParam('type');
		$this->view->assign('type', $type);
		switch ($type) {
			case 'all':
				$result = $cor_mod->getCorrectsByUser();
				break;
			case 'verif':
				$result = $cor_mod->addFilterByStatusUser('1')->getCorrectsByUser();
				break;
			case 'unverif':
				$result = $cor_mod->addFilterByStatusUser('0')->getCorrectsByUser();
				break;	
			case 'reject':
				$result = $cor_mod->addFilterByStatusUser('2')->getCorrectsByUser();
				break;					
			default :
				$result = $cor_mod->getCorrectsByUser();
		}				
		$config		= new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'development');
		$page		= $this->_getParam('page');
		$paginator	= new Zend_Paginator(new Zend_Paginator_Adapter_Array($result->toArray()));
		$paginator->setItemCountPerPage($config->pagination->changes);
		$paginator->setCurrentPageNumber($page);
		$paginator->setView($this->view);
		$this->view->paginator = $paginator;		
	}
	
	public function getcoordinatesAction()
	{
		$this->_helper->layout->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);		
		$type = $_POST['type'];
		$param = $_POST['param'];
		$result = array();
		if($type == 'country') {
			$country = new Application_Model_Countries();
			$coords = $country->getCountryCoordsByCode($param);
			if(!empty($coords->loc_y) && !empty($coords->loc_y)) {
				$result = array('loc_y' => $coords->loc_y, 'loc_z' => $coords->loc_z);
			} else {
				$result = array('error' => 'error');
			}
			if(!empty($coords->tel_code)) $result['tel_code'] = $coords->tel_code;
		} else {
			$region = new Application_Model_Assregions();
			$coords = $region->getRegionCoordsById($param);
			if(!empty($coords->loc_y) && !empty($coords->loc_y)) {
				$result = array('loc_y' => $coords->loc_y, 'loc_z' => $coords->loc_z);
			} else {
				$result = array('error' => 'error');
			}
		}
		echo json_encode($result);
	}


	public function claimAction()
	{
		$this->_helper->layout->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);		
		$config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'development');
		if(empty($_POST)) throw new Zend_Exception("The page you requested was not found.", 404);
		$claim_mod = new Application_Model_Claimes();
		$claim_mod->addClaim(
							$_POST['name'], 
							$_POST['number'], 
							$_POST['position'], 
							$_POST['comment'], 
							$_POST['listing']
					);
		$vin_mod = new Application_Model_Vineyards();
		$vineyard = $vin_mod->getVineyardById($_POST['listing']);
		$user_mod = new Application_Model_Users();
		$admins = $user_mod->getAdmins();
		$params['link'] = 'http://' . $_SERVER['HTTP_HOST']. '/' . $_SESSION['lang'] . '/admin/managecontacts/' . $id;
		foreach($admins as $admin) {
			myMailer::sendMail(
								$config->admin->email, 
								$config->admin->name, 
								$admin->email, 
								'Claim Listing By Vintlas', 
								'claim',
								$params
			); 	
		}
	
		$part_mod = new Application_Model_Partners();
		$users  = $part_mod->getRegionUsers($vineyard->ass_region);
		if(!empty($users[0])) {
			foreach ($users as $user) {
				myMailer::sendMail(
									$config->admin->email, 
									$config->admin->name, 
									$user->email, 
									'Claim Listing By Vintlas', 
									'claim',
									$params
				); 
			}
		}
	}	
}