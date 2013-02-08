<?php

class AdminController extends Zend_Controller_Action
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

		$this->_helper->layout->setLayout('admin');	
	}

	public function manageregionsAction()
	{
		$this->view->headScript()->appendFile('http://maps.google.com/maps/api/js?sensor=true&language=eng')
						->appendFile('/js/load-image.js')
						->appendFile('/js/jquery-ui.min.js')
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
						->appendFile('/js/jvalidate.js')
						->appendFile('/js/regions_manage.js')
						;
		//setting title, message and keywords, description
		$this->view->headTitle('Manage Wine Regions');
		$this->view->assign('message', "Manage Wine Regions");
		$this->view->headMeta()->appendName('keywords', 'vineyard, winery, vineyard tours, winery tours, wine tours, wine tasting');
		$this->view->headMeta()->appendName('description', 'The vineyards around the world');
		$reg_mod = new Application_Model_Assregions();
		$config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'development');
		$page = $this->_getParam('page');
		$country = $this->_getParam('country') ? $this->_getParam('country') : 'all';
		$this->view->assign('country', $country);
		if($country != 'all') {
			$result = $this->view->table = $reg_mod->getAssregionsByCountryAlias($country);
		} else {
			$result = $this->view->table = $reg_mod->getAssRegions();
		}
		$cont_mod = new Application_Model_Countries();
		$this->view->assign('countries', $cont_mod->getCountriesIsExReg());
		$paginator = new Zend_Paginator(new Zend_Paginator_Adapter_Array($result->toArray()));
		$paginator->setItemCountPerPage($config->pagination->regions);
		$paginator->setCurrentPageNumber($page);
		$paginator->setView($this->view);
		$this->view->paginator = $paginator;		
	}
	
	public function managerequestsAction()
	{
		$this->view->headScript()->appendFile('http://maps.google.com/maps/api/js?sensor=true&language=eng')
						->appendFile('/js/load-image.js')
						->appendFile('/js/jquery-ui.min.js')
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
						->appendFile('/js/jvalidate.js')
						->appendFile('/js/requests.js')
						;
		//setting title, message and keyword, description
		$this->view->headTitle('Manage Requests');
		$this->view->assign('message', "Manage Requests");
		$this->view->headMeta()->appendName('keywords', 'vineyard, winery, vineyard tours, winery tours, wine tours, wine tasting');
		$this->view->headMeta()->appendName('description', 'The vineyards around the world');
		$req_mod = new Application_Model_Modules();
		$config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'development');
		$page = $this->_getParam('page');
		$type = $this->_getParam('type', 'new');
		$date = $this->_getParam('date', 'desc');
		$this->view->assign('type', $type);
		$this->view->assign('date', $date);
		if($date == 'desc') {
			switch ($type) {
				case 'all':
					$modules = $req_mod->getModules('DESC');
				break;
				case 'actioned':
					$modules = $req_mod->getModulesByType('DESC', 1);
				break;
				case 'new':
					$modules = $req_mod->getModulesByType('DESC', 0);
				break;
				default :
					$modules = $req_mod->getModulesByType('DESC', 0);
			}
		} else {
			switch ($type) {
				case 'all':
					$modules = $req_mod->getModules('ASC');
				break;
				case 'actioned':
					$modules = $req_mod->getModulesByType('ASC', 1);
				break;
				case 'new':
					$modules = $req_mod->getModulesByType('ASC', 0);
				break;
				default :
					$modules = $req_mod->getModulesByType('ASC', 0);
			}			
		}
		$result = $this->view->table = $modules;
		$paginator = new Zend_Paginator(new Zend_Paginator_Adapter_Array($result->toArray()));
		$paginator->setItemCountPerPage($config->pagination->requests);
		$paginator->setCurrentPageNumber($page);
		$paginator->setView($this->view);
		$this->view->paginator = $paginator;				
	}

	public function enablerequestAction()
	{
		$this->_helper->layout->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);		
		if(empty($_POST)) throw new Zend_Exception("The page you requested was not found.", 404);
		$req_mod = new Application_Model_Modules();
		$req_mod->updateModule($_POST['requestID']);
		$result			= new JsonResponse();
		$result->html	= 'Request has updated success';
		$result->result	= 1;
		echo $result;
	}

	public function manageseoAction()
	{
		$this->view->headTitle('Manage SEO');
		$this->view->assign('message', "Manage SEO");
		$seo_mod = new Application_Model_Seo();
		$this->view->assign('seo', $seo_mod->getAllSeo());
	}
	
	public function managepagesAction()
	{
		$this->view->headScript()->appendFile('http://maps.google.com/maps/api/js?sensor=true&language=eng')
						->appendFile('/js/load-image.js')
						->appendFile('/js/jquery-ui.min.js')
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
						->appendFile('/js/jvalidate.js')
						->appendFile('/js/grapes.js')
						;
		
		$this->view->headTitle('Manage Pages');
		$this->view->assign('message', "Manage Pages");
		$this->view->headMeta()->appendName('keywords', 'vineyard, winery, vineyard tours, winery tours, wine tours, wine tasting');
		$this->view->headMeta()->appendName('description', 'The vineyards around the world');
		$page_mod = new Application_Model_StaticPages();
		$this->view->assign('pages', $page_mod->getAllPages());
	}
	
	public function managetemplatesAction()
	{
		$this->view->headScript()->appendFile('http://maps.google.com/maps/api/js?sensor=true&language=eng')
						->appendFile('/js/load-image.js')
						->appendFile('/js/jquery-ui.min.js')
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
						->appendFile('/js/jvalidate.js')
						->appendFile('/js/grapes.js')
						;
		$this->view->headTitle('Manage Templates');
		$this->view->assign('message', "Manage Templates");
		$this->view->headMeta()->appendName('keywords', 'vineyard, winery, vineyard tours, winery tours, wine tours, wine tasting');
		$this->view->headMeta()->appendName('description', 'The vineyards around the world');
		$tmpl_mod = new Application_Model_Emails();
		$this->view->assign('templates', $tmpl_mod->getTemplates());
	}

	public function managecontactsAction()
	{
		$this->view->headScript()->appendFile('http://maps.google.com/maps/api/js?sensor=true&language=eng')
						->appendFile('/js/load-image.js')
						->appendFile('/js/jquery-ui.min.js')
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
						->appendFile('/js/jvalidate.js')
						->appendFile('/js/grapes.js')
						;
		$this->view->headTitle('Manage Contacts');
		$this->view->assign('message', "Manage Contacts");
		$this->view->headMeta()->appendName('keywords', 'vineyard, winery, vineyard tours, winery tours, wine tours, wine tasting');
		$this->view->headMeta()->appendName('description', 'The vineyards around the world');
		$con_mod = new Application_Model_ContactUs();
		$config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'development');
		$page = $this->_getParam('page');
		$result = $this->view->table = $con_mod->getContacts();
		$paginator = new Zend_Paginator(new Zend_Paginator_Adapter_Array($result->toArray()));
		$paginator->setItemCountPerPage($config->pagination->contacts);
		$paginator->setCurrentPageNumber($page);
		$paginator->setView($this->view);
		$this->view->paginator = $paginator;				
	}

	public function managegrapesAction()
	{
		$this->view->headScript()->appendFile('http://maps.google.com/maps/api/js?sensor=true&language=eng')
						->appendFile('/js/load-image.js')
						->appendFile('/js/jquery-ui.min.js')
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
						->appendFile('/js/jvalidate.js')
						->appendFile('/js/grapes.js')
						;
		$this->view->headTitle('Manage Grapes');
		$this->view->assign('message', "Manage Grapes");
		$this->view->headMeta()->appendName('keywords', 'vineyard, winery, vineyard tours, winery tours, wine tours, wine tasting');
		$this->view->headMeta()->appendName('description', 'The vineyards around the world');
		$gr_mod = new Application_Model_Grapes();
		$config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'development');
		$page = $this->_getParam('page');
		$result = $this->view->table = $gr_mod->getGrapes();
		$paginator = new Zend_Paginator(new Zend_Paginator_Adapter_Array($result->toArray()));
		$paginator->setItemCountPerPage($config->pagination->users);
		$paginator->setCurrentPageNumber($page);
		$paginator->setView($this->view);
		$this->view->paginator = $paginator;				
	}

	public function managecountriesAction()
	{
		$this->view->headScript()->appendFile('http://maps.google.com/maps/api/js?sensor=true&language=eng')
						->appendFile('/js/load-image.js')
						->appendFile('/js/jquery-ui.min.js')
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
						->appendFile('/js/jvalidate.js')
						->appendFile('/js/countries_manage.js')
						;
		$this->view->headTitle('Manage Countries');
		$this->view->assign('message', "Manage Countries");
		$this->view->headMeta()->appendName('keywords', 'vineyard, winery, vineyard tours, winery tours, wine tours, wine tasting');
		$this->view->headMeta()->appendName('description', 'The vineyards around the world');
		$country_mod = new Application_Model_Countries();
		$config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'development');
		$page = $this->_getParam('page');
		$continent = $this->_getParam('continent') ? $this->_getParam('continent') : 'all';
		$this->view->assign('continent', $continent);
		if($continent != 'all') {
			$result = $this->view->table = $country_mod->getCountriesByContinent($continent);
		} else {
			$result = $this->view->table = $country_mod->getCountries();
		}
		$continent_mod = new Application_Model_Continents();
		$this->view->assign('continents', $continent_mod->getAllContinents());
		$paginator = new Zend_Paginator(new Zend_Paginator_Adapter_Array($result->toArray()));
		$paginator->setItemCountPerPage($config->pagination->countries);
		$paginator->setCurrentPageNumber($page);
		$paginator->setView($this->view);
		$this->view->paginator = $paginator;
	}

	public function addgrapeAction()
	{
		$this->view->headTitle('Add grape');
		$this->view->assign('message', "Add new grape");
		$this->view->headScript()->appendFile('/js/grapes.js');
		$this->view->headMeta()->appendName('keywords', 'vineyard, winery, vineyard tours, winery tours, wine tours, wine tasting');
		$this->view->headMeta()->appendName('description', 'The vineyards around the world');
		$form = new Application_Form_Grape();
		$form->submit->setLabel('Add grape');
		$this->view->form = $form;
    	
		if ($this->getRequest()->isPost()) {
			$formData = $this->getRequest()->getPost();
			if ($form->isValid($formData)) {
				$name = $form->getValue('name');
				$other_name = $form->getValue('other_name');
				$characteristics = $form->getValue('characteristics');
				$grapes = new Application_Model_Grapes();
				$grapes->newGrape($name, $other_name, $characteristics);
				$this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/admin/managegrapes');
			} else {
				$form->populate($formData);
			}	
		}   
	}

	public function editseoAction()
	{
		$this->view->headScript()->appendFile('/js/load-image.js')
								->appendFile('/js/jquery-ui.min.js')
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
								->appendFile('/js/jvalidate.js')
								->appendFile('/js/seo.js')
								;		
		$this->view->headTitle('Edit SEO');
 		$id = $this->_getParam('seo', 0);
		$seo_mod = new Application_Model_Seo();
		$seo = $seo_mod->getSeoById($id);
		$this->view->assign('message', "Edit SEO " . $seo->page);
		$this->view->assign('id', $id);
		if ($this->getRequest()->isPost()) {
			$formData = $this->getRequest()->getPost();
			if(!empty($formData['spotlight_image'])) {
				//moving poster from the temporary folder
				rename($_SERVER['DOCUMENT_ROOT'] .'/images/tmp/' . $formData['spotlight_image'], $_SERVER['DOCUMENT_ROOT'].'/images/' . $formData['spotlight_image']);
			}
			$seo_mod->updateSeo($formData);
			$this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/admin/manageseo');
		} else {
			$this->view->assign('seo', $seo);
		}
	}
	
	public function editpageAction()
	{
		$this->view->headScript()->appendFile('/js/edit_page.js');
		$this->view->headTitle('Edit Page');
		$this->view->assign('message', "Edit Page");
		$this->view->headMeta()->appendName('keywords', 'vineyard, winery, vineyard tours, winery tours, wine tours, wine tasting');
		$this->view->headMeta()->appendName('description', 'The vineyards around the world');
 		$id = $this->_getParam('page', 0);
		$page_mod = new Application_Model_StaticPages();
		$page = $page_mod->getPageById($id);
		$this->view->assign('id', $id);
		if ($this->getRequest()->isPost()) {
			$formData = $this->getRequest()->getPost();
			$content = trim($formData['text']);
			if (!empty($content)) {
				$page_mod->updatePage($formData['id'], $formData['text']);
				$this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/admin/managepages');
			} else {
				$this->view->assign('page', $page);
				$this->view->assign('error', 'The field must not be empty');
			}
		} else {
			$this->view->assign('page', $page);
		}
	}
	
	public function edittemplateAction()
	{
		$this->view->headLink()	->prependStylesheet('/css/markitup/style.css')
								->prependStylesheet('/css/markitup/default/style.css')
								;
		$this->view->headScript()	->appendFile('/js/jquery.markitup.js')
									->appendFile('/css/markitup/default/set.js')
									;
		$this->view->headTitle('Edit template');
		$this->view->assign('message', "Edit Template");
		$this->view->headMeta()->appendName('keywords', 'vineyard, winery, vineyard tours, winery tours, wine tours, wine tasting');
		$this->view->headMeta()->appendName('description', 'The vineyards around the world');
 		$templ = $this->_getParam('templ', 0);
		$tmpl_mod = new Application_Model_Emails();
		$template = $tmpl_mod->getTemplateById($templ);
		$this->view->assign('id', $templ);
		if ($this->getRequest()->isPost()) {
			$formData = $this->getRequest()->getPost();
			$content = trim($formData['content']);
			if (!empty($content)) {
				$tmpl_mod->updateTemplate($formData['content'], $formData['id']);
				$this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/admin/managetemplates');
			} else {
				$this->view->assign('template', $template);
				$this->view->assign('error', 'The field must not be empty');
			}
		} else {
			$this->view->assign('template', $template);
		}
	}
	
	public function editgrapeAction()
	{
		$this->view->headTitle('Edit grape');
		$this->view->assign('message', "Edit grape");
		$this->view->headScript()->appendFile('/js/grapes.js');
		$this->view->headMeta()->appendName('keywords', 'vineyard, winery, vineyard tours, winery tours, wine tours, wine tasting');
		$this->view->headMeta()->appendName('description', 'The vineyards around the world');
		$form = new Application_Form_Grape();
		$form->submit->setLabel('Edit grape');
		$this->view->form = $form;
 		$gr = $this->_getParam('grape', 0);
		$form->setAction('/' . $_SESSION['lang'] . '/admin/editgrape/' . $gr);
		$gr_mod = new Application_Model_Grapes();
		$grapes =$gr_mod->getGrapeById($gr);
		$this->view->assign('id', $gr);
		if ($this->getRequest()->isPost()) {
			$formData = $this->getRequest()->getPost();
			if ($form->isValid($formData)) {
				$name = $form->getValue('name');
				$other_name = $form->getValue('other_name');
				$characteristics = $form->getValue('characteristics');
				$gr_mod->deleteGrape($_POST['id']);
				$gr_mod->newGrape($name, $other_name, $characteristics);
				$this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/admin/managegrapes');
			} else {
				$form->populate($grapes->toArray());
			}	
		} else {
			$form->populate($grapes->toArray());
		}  
	}	
	
	public function addregionAction()
	{
		$this->view->headScript()->appendFile('http://maps.google.com/maps/api/js?sensor=true&language=eng')
						->appendFile('/js/load-image.js')
						->appendFile('/js/jquery-ui.min.js')
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
						->appendFile('/js/jvalidate.js')
						->appendFile('/js/region.js')
						;
		$this->view->headTitle('Add region');
		$this->view->assign('message', "Add new region");
		$this->view->headMeta()->appendName('keywords', 'vineyard, winery, vineyard tours, winery tours, wine tours, wine tasting');
		$this->view->headMeta()->appendName('description', 'The vineyards around the world');
	
		$form = new Application_Form_Region();
		$form->submit->setLabel('Add region');
		$this->view->form = $form;
    	
		if ($this->getRequest()->isPost()) {
			$formData = $this->getRequest()->getPost();
			if ($form->isValid($formData)) {
				$name		= $form->getValue('name');
				$local_name	= $form->getValue('local_name');
				$country	= $form->getValue('country');
				$description= $form->getValue('description');
				$grapes		= $form->getValue('grapes');
				$acknowledgements = $form->getValue('acknowledgements');
				$notes		= $form->getValue('notes');
				$url = $formData['link'];
				$url_p = parse_url($url);
				if(!empty($formData['image']) && empty($url_p)) {
					//moving poster from the temporary folder
					rename($_SERVER['DOCUMENT_ROOT'] .'/images/tmp/' . $formData['image'], $_SERVER['DOCUMENT_ROOT'].'/images/region/' . $formData['image']);
					$img = $formData['image'];
				} elseif(!empty($url_p)) {
					$img = $url;
				}				
				foreach($_POST['links'] as $key => $value) {
					if(empty($value) || $value == 'http://') {
						unset($_POST['links'][$key]);
						unset($_POST['texts'][$key]);
					}
				}
				$regions = new Application_Model_Assregions();
				$regions->newRegion(
									$name, 
									$local_name, 
									$country, 
									$description, 
									serialize($grapes), 
									$_POST['loc_y'], 
									$_POST['loc_z'], 
									serialize($_POST['links']),
									serialize($_POST['texts']),
									$acknowledgements,  
									$notes,
									$img
						);
				$region = $regions->getAdapter()->lastInsertId();
				
				$part_mod = new Application_Model_Partners();
				foreach ($form->getValue('partners') as $partner) {
					$part_mod->addPartner($partner, $region);
				}
				$regions->updateIndex();
				$this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/admin/manageregions');
			} else {
				$form->populate($formData);
			}	
		}	
	}
	
	public function editregionAction()
	{
		$this->view->headScript()->appendFile('http://maps.google.com/maps/api/js?sensor=true&language=eng')
								->appendFile('/js/load-image.js')
								->appendFile('/js/jquery-ui.min.js')
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
								->appendFile('/js/jvalidate.js')
								->appendFile('/js/region.js')
								;
		$this->view->headTitle('Edit region');
		$this->view->assign('message', "Edit region");
		$this->view->headMeta()->appendName('keywords', 'vineyard, winery, vineyard tours, winery tours, wine tours, wine tasting');
		$this->view->headMeta()->appendName('description', 'The vineyards around the world');
	
		$form = new Application_Form_Region();
		$form->submit->setLabel('Edit region');
		$this->view->form = $form;
		$reg = $this->_getParam('region', 0);
		$form->setAction('/' . $_SESSION['lang'] . '/admin/editregion/' . $reg);
		$reg_mod = new Application_Model_Assregions();
		$region = $reg_mod->getRegionByAlias($reg);
		$this->view->assign('image', $region->image);
		$this->view->assign('links', unserialize($region['links']));
		$this->view->assign('texts', unserialize($region['texts']));
		$region['grapes'] = unserialize($region['grapes']);
		$this->view->assign('region', $region);
		$part_mod = new Application_Model_Partners();
		$partners = array();
		foreach($part_mod->getRegionUsers($region['id']) as $partner) {
			$partners[] = $partner['id'];
		}
		$this->view->assign('partners', $partners);
		if($reg === 0) $this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/admin/manageregions');
		if ($this->getRequest()->isPost()) {
			$formData = $this->getRequest()->getPost();
			if ($form->isValid($formData)) {
				$url = $formData['link'];
				$url_p = parse_url($url);
				if(!empty($formData['image']) && empty($url_p)) {
					//moving poster from the temporary folder
					rename($_SERVER['DOCUMENT_ROOT'] .'/images/tmp/' . $formData['image'], $_SERVER['DOCUMENT_ROOT'].'/images/region/' . $formData['image']);
					$img = $formData['image'];
				} elseif(!empty($url_p)) {
					$img = $url;
				}
				foreach($_POST['links'] as $key => $value) {
					if(empty($value) || $value == 'http://') {
						unset($_POST['links'][$key]);
						unset($_POST['texts'][$key]);
					}
				}
				$name		= $form->getValue('name');
				$local_name	= $form->getValue('local_name');
				$country	= $form->getValue('country');
				$description= $form->getValue('description');
				$grapes		= $form->getValue('grapes');
				$acknowledgements = $form->getValue('acknowledgements');
				$notes		= $form->getValue('notes');
				$regions = new Application_Model_Assregions();
				$regions->updateRegion(
										$_POST['id'], 
										$name, 
										$local_name, 
										$country, 
										$description, 
										serialize($grapes), 
										$_POST['loc_y'], 
										$_POST['loc_z'], 
										serialize($_POST['links']), 
										serialize($_POST['texts']),
										$acknowledgements,  
										$notes, 
										$img
							);
				$reg_id = $_POST['id'];
				$part_mod = new Application_Model_Partners();
				$part_mod->deleteByRegion($reg_id);
				foreach ($form->getValue('partners') as $partner) {
					$part_mod->addPartner($partner, $reg_id);
				}
				$regions->updateIndex();
				$this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/admin/manageregions');
			} else {
				$form->populate($region->toArray());
			}	
		} else {
			$form->populate($region->toArray());
		}
	}

	public function editcountryAction()
	{
		$this->view->headScript()->appendFile('http://maps.google.com/maps/api/js?sensor=true&language=eng')
								->appendFile('/js/load-image.js')
								->appendFile('/js/jquery-ui.min.js')
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
								->appendFile('/js/jvalidate.js')
								->appendFile('/js/countries.js')
								;
		$this->view->headTitle('Edit country');
		$this->view->assign('message', "Edit country");
		$this->view->headMeta()->appendName('keywords', 'vineyard, winery, vineyard tours, winery tours, wine tours, wine tasting');
		$this->view->headMeta()->appendName('description', 'The vineyards around the world');
		$form = new Application_Form_Country();
		$form->submit->setLabel('Edit country');
		$this->view->form = $form;
 		$coun = $this->_getParam('country', 0);
		$form->setAction('/' . $_SESSION['lang'] . '/admin/editcountry/' . $coun);
		$country_mod = new Application_Model_Countries();
		$country = $country_mod->getCountryByAlias($coun);
		$this->view->assign('image', $country->image);
		$this->view->assign('code', $country->code);
		$this->view->assign('loc_y', $country->loc_y);
		$this->view->assign('loc_z', $country->loc_z);
		$reg_mod = new Application_Model_Assregions();
		$regions = $reg_mod->getParentsAssregionsByCountryAlias($coun);
		$regions_m = array();
		foreach ($regions as $value) {
			$regions_m[] = $value->id; 
		}
		$this->view->assign('regions', $regions);
		if ($this->getRequest()->isPost()) {
			$formData = $this->getRequest()->getPost();
			if ($form->isValid($formData)) {
				$id_regs = array_diff($regions_m, $formData['regions']);
				if(!empty($id_regs)) {
					foreach($id_regs as $id_reg) {
						$reg_mod->deleteRegionByCountry($id_reg);
					}
				}
				$url = $formData['link'];
				$url_p = parse_url($url);
				if(!empty($formData['image']) && empty($url_p)) {
					//moving poster from the temporary folder
					rename($_SERVER['DOCUMENT_ROOT'] .'/images/tmp/' . $formData['image'], $_SERVER['DOCUMENT_ROOT'].'/images/country/' . $formData['image']);
					$img = $formData['image'];
				} elseif(!empty($url_p)) {
					$img = $url;
				}
				$country_mod->updateCountry(
											$formData['name_en'], 
											$formData['description'], 
											$formData['acknowledgements'], 
											$formData['code'], 
											$formData['notes'], 
											$formData['loc_y'], 
											$formData['loc_z'], 
											$img
							);
				$country_mod->updateIndex();
				$this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/admin/managecountries');
			} else {
				$form->populate($country->toArray());
			}	
		} else {
			$form->populate($country->toArray());
		}
	}	

	public function deleteregionAction()
	{
		$this->_helper->layout->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);		
		if(empty($_POST)) throw new Zend_Exception("The page you requested was not found.", 404);
		$reg_mod = new Application_Model_Assregions();
		$sub_regions = $reg_mod->getAssRegionsByPidId($_POST['regionID']);
		$pid = $reg_mod->getRegionById($_POST['regionID'])->pid;
		if(!empty($sub_regions)) {
			foreach($sub_regions as $sub_region) {
				$reg_mod->updatePid($sub_region->id, $pid);
			}
		}
		$part_mod = new Application_Model_Partners();
		$reg_mod->deleteRegion($_POST['regionID']);
		$part_mod->deleteByRegion($_POST['regionID']);
		$result			= new JsonResponse();
		$result->html	= 'Region has removed success';
		$result->result	= 1;
		echo $result;		
	}

	public function gettreeregionsAction()
	{
		$this->view->headScript()->appendFile('/js/tree.js');
		$this->_helper->layout->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);		
		if(empty($_POST)) throw new Zend_Exception("The page you requested was not found.", 404);
		$reg_mod = new Application_Model_Assregions();
		$regions = $reg_mod->getAssregionsByCountryId($_POST['country'])->toArray();
		$result = new JsonResponse();
		if(!empty($regions)) {
			foreach($regions as $row) {
				$tree[$row['pid']][$row['id']] = $row['name'];
			}
			$this->view->assign('tree', $tree);
			$result->html = $this->view->render('tree_regions.phtml');
			$result->error = 0;
		} else {
			$result->error = 1;
		}
		echo $result;		
	}
	
	public function deletegrapeAction()
	{
		$this->_helper->layout->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);		
		if(empty($_POST)) throw new Zend_Exception("The page you requested was not found.", 404);
		$gr_mod = new Application_Model_Grapes();
		$gr_mod->deleteGrape($_POST['grapeID']);
		$result			= new JsonResponse();
		$result->html	= 'Grape has removed success';
		$result->result	= 1;
		echo $result;		
	}
	
	public function deleteimageAction()
	{
		$this->_helper->layout->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);
		if(empty($_POST)) throw new Zend_Exception("The page you requested was not found.", 404);
		$reg_mod = new Application_Model_Assregions();
		$reg_mod->deleteImage($_POST['region']);
		$result			= new JsonResponse();
		$result->html	= 'Image by region has removed success';
		$result->result	= 1;
		echo $result;
	}	
	
	public function uploadcountryAction()
	{
		$this->_helper->layout->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);
		//creating headers
		header('Vary: Accept');
		if (isset($_SERVER['HTTP_ACCEPT']) &&
		    (strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false)) {
		    header('Content-type: application/json');
		} else {
		    header('Content-type: text/plain');
		}
		$file_name = time() . $_FILES["image"]["name"];
		$image = new acResizeImage($_FILES["image"]["tmp_name"]);
		$image->resize('369', '458')->save($_SERVER['DOCUMENT_ROOT'] . '/images/tmp/', $file_name);
		echo json_encode(array(
							array(
								'name' => $file_name,
								'url' => '/images/tmp/' . $file_name
								)
						));							
	}
	
	public function uploadseoAction()
	{
		$this->_helper->layout->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);
		//creating headers
		header('Vary: Accept');
		if (isset($_SERVER['HTTP_ACCEPT']) &&
		    (strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false)) {
		    header('Content-type: application/json');
		} else {
		    header('Content-type: text/plain');
		}
		$file_name = time() . $_FILES["image"]["name"];
		$image = new acResizeImage($_FILES["image"]["tmp_name"]);
		$image->resize('293', '195')->save($_SERVER['DOCUMENT_ROOT'] . '/images/tmp/', $file_name);
		echo json_encode(array(
							array(
								'name' => $file_name,
								'url' => '/images/tmp/' . $file_name
								)
						));							
	}
	
	public function editlistingAction()
    {
		if (!Zend_Auth::getInstance()->hasIdentity()) {
			throw new Zend_Exception("The page you requested was not found.", 404);
		}
		if(Zend_Auth::getInstance()->getIdentity()->role == 'admin') $this->_helper->layout->setLayout('admin');
		$this->view->headTitle('Edit Vineyard');
		$this->view->headMeta()->appendName('keywords', 'vineyard, winery, vineyard tours, winery tours, wine tours, wine tasting');	
		$this->view->headMeta()->appendName('description', 'The vineyards around the world');
		$this->view->assign('message', "Edit vineyard");
		$this->view->headScript()
						->appendFile('/js/load-image.js')
						->appendFile('/js/jquery-ui.min.js')
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
						->appendFile('/js/jvalidate.js')
						->appendFile('/js/edit_listing.js')
						;
		
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
						$seasons[$i]['name']		=	$_POST['season']['name'][$i];
						$seasons[$i]['appointment']	=	$_POST['season']['appointment'][$i];
						$seasons[$i]['date1']		=	$_POST['season']['date1'][$i];
						$seasons[$i]['date2']		=	$_POST['season']['date2'][$i];
						$seasons[$i]['weeks']		=	$_POST['season']['weeks'][$i];
						$seasons[$i]['time1']		=	$_POST['season']['time1'][$i];
						$seasons[$i]['time2']		=	$_POST['season']['time2'][$i];
						$seasons[$i]['notes']		=	$_POST['season']['notes'][$i];
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
				$telephone = @unserialize($data_vineyard['telephone']);
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
	
}