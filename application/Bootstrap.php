<?php
class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
	protected function _initAcl()
	{
		require_once 'Zend/Session.php';
		require_once '../library/ac_image_class.php';
		require_once '../library/ImageResize.php';
		require_once '../library/ZendX/JQuery.php';
		require_once '../library/Language.php';
		require_once '../library/phpMailer/phpmailer.inc.php';
		require_once '../application/views/helpers/MagicHeadScript.php';
		Zend_View_Helper_MagicHeadScript::setConfig('/cache/scripts');
		require_once '../application/views/helpers/MagicHeadLink.php';
		Zend_View_Helper_MagicHeadLink::setConfig('/cache/link');
		
		$acl = new Zend_Acl();
		
		//adding resources
		$acl->addResource('main');
		$acl->addResource('index', 'main');
		$acl->addResource('systemmes', 'main');
		$acl->addResource('contactus', 'main');
		$acl->addResource('claim', 'main');
		$acl->addResource('viewregion', 'main');
		$acl->addResource('managelistings', 'main');
		$acl->addResource('userlistings', 'main');
		$acl->addResource('managechanges', 'main');
		$acl->addResource('listingchanges', 'main');
		$acl->addResource('viewcountry', 'main');
		$acl->addResource('update', 'main');
		$acl->addResource('updateindex', 'main');
		$acl->addResource('getcoordinates', 'main');
		$acl->addResource('termsofuse', 'main');
		$acl->addResource('privacystatement', 'main');
		$acl->addResource('aboutus', 'main');
		
		$acl->addResource('auth');
		$acl->addResource('login', 'auth');
		$acl->addResource('logout', 'auth');
		
		$acl->addResource('reg');
		$acl->addResource('active', 'reg');
		$acl->addResource('error');
		
		$acl->addResource('search');
		$acl->addResource('map', 'search');
		$acl->addResource('list', 'search');
		$acl->addResource('searchauto', 'search');
		$acl->addResource('select', 'search');
		$acl->addResource('paginationajax', 'search');
		$acl->addResource('getregion', 'search');
		
		$acl->addResource('users');
		$acl->addResource('profile', 'users');
		$acl->addResource('editprofile', 'users');
		$acl->addResource('changepassword', 'users');
		$acl->addResource('forgotpassword', 'users');
		
		$acl->addResource('vineyards');
		$acl->addResource('viewvineyard', 'vineyards');
		$acl->addResource('addwine', 'vineyards');
		$acl->addResource('editwine', 'vineyards');
		$acl->addResource('editvineyard', 'vineyards');
		$acl->addResource('addlisting', 'vineyards');
		$acl->addResource('upload', 'vineyards');
		$acl->addResource('uploadwine', 'vineyards');
		$acl->addResource('citysearch', 'vineyards');
		$acl->addResource('ajaxselect', 'vineyards');
		$acl->addResource('verifyvineyard', 'vineyards');
		$acl->addResource('ajaxverif', 'vineyards');
		$acl->addResource('viewclaim', 'vineyards');
		$acl->addResource('claimed', 'vineyards');
		$acl->addResource('remove', 'vineyards');
		$acl->addResource('correct', 'vineyards');
		$acl->addResource('correctvineyard', 'vineyards');
		$acl->addResource('infocorrect', 'vineyards');
		$acl->addResource('modules', 'vineyards');
		$acl->addResource('editcorrectvineyard', 'vineyards');
		$acl->addResource('correctinfo', 'vineyards');
		$acl->addResource('unverifyvineyard', 'vineyards');
		
		
		$acl->addResource('admin');
		$acl->addResource('addgrape', 'admin');
		$acl->addResource('addregion', 'admin');
		$acl->addResource('manageregions', 'admin');
		$acl->addResource('managegrapes', 'admin');
		$acl->addResource('deleteregion', 'admin');
		$acl->addResource('editregion', 'admin');
		$acl->addResource('editgrape', 'admin');
		$acl->addResource('editcountry', 'admin');
		$acl->addResource('deletegrape', 'admin');
		$acl->addResource('managecountries', 'admin');
		$acl->addResource('uploadcountry', 'admin');
		$acl->addResource('managerequests', 'admin');
		$acl->addResource('managecontacts', 'admin');
		$acl->addResource('enablerequest', 'admin');
		$acl->addResource('managetemplates', 'admin');
		$acl->addResource('edittemplate', 'admin');
		$acl->addResource('editlisting', 'admin');
		$acl->addResource('managepages', 'admin');
		$acl->addResource('editpage', 'admin');
		$acl->addResource('manageseo', 'admin');
		$acl->addResource('editseo', 'admin');
		$acl->addResource('gettreeregions', 'admin');
		$acl->addResource('deleteimage', 'admin');
		$acl->addResource('uploadseo', 'admin');
		
		//adding roles
		$acl->addRole('guest');
		$acl->addRole('user', 'guest');      
		$acl->addRole('admin', 'user');
        
		//resolution of resource roles
		$acl->allow('guest', 'error');
		$acl->allow('guest', 'main', array('index', 'systemmes', 'show', 'contactus', 'viewregion', 'claim', 'viewcountry', 'update', 'updateindex', 'getcoordinates', 'termsofuse', 'privacystatement', 'aboutus'));
		$acl->allow('guest', 'users', array('forgotpassword'));
		$acl->allow('guest', 'search', array('map', 'list', 'ajaxselect', 'select', 'index', 'searchauto', 'paginationajax', 'getregion'));
		$acl->allow('guest', 'auth', array('index', 'login', 'logout'));
		$acl->allow('guest', 'reg', array('index', 'active', 'upload'));
		$acl->allow('guest', 'vineyards', array('addlisting', 'viewvineyard', 'correct', 'ajaxselect', 'modules', 'correctinfo'));
		$acl->allow('user', 'vineyards', array('upload', 'citysearch', 'editvineyard', 'addwine', 'uploadwine', 'editwine', 'verifyvineyard', 'ajaxverif', 'viewclaim', 'claimed', 'remove', 'correctvineyard', 'infocorrect', 'editcorrectvineyard', 'unverifyvineyard'));
		$acl->allow('user', 'main', array('managelistings', 'userlistings', 'managechanges', 'listingchanges'));
		$acl->allow('user', 'users', array('profile', 'editprofile', 'index', 'changepassword'));
		$acl->allow('admin', 'users', array('adduser', 'edituser', 'deleteuser', 'manageuser'));
		$acl->allow('admin', 'admin', array('uploadseo', 'deleteimage', 'gettreeregions', 'addgrape', 'addregion', 'manageregions', 'deleteregion', 'editregion', 'managegrapes', 'editgrape', 'deletegrape', 'managecountries', 'editcountry', 'uploadcountry', 'managerequests', 'enablerequest', 'managecontacts', 'managetemplates', 'edittemplate', 'editlisting', 'managepages', 'editpage', 'manageseo', 'editseo'));

		$fc = Zend_Controller_Front::getInstance();
		$fc->registerPlugin(new Application_Plugin_AccessCheck($acl, Zend_Auth::getInstance()));
		
		$locales= $this->getOption('locales');
		$locale = new Zend_Locale('auto');
		$lang = array_key_exists($locale->getLanguage(), $locales) ? $locale->getLanguage() : 'en';
		$languageHelper = new Site_Controller_Action_Helper_Language($locales, APPLICATION_PATH . '/lang');
		Zend_Controller_Action_HelperBroker::addHelper($languageHelper);
		
		
		
		// change default router
		$fc->getRouter()->addRoute('default', 
			new Zend_Controller_Router_Route(
				':controller/:action/*',
				array(
						'module'	=> 'default',
						'controller'=> 'main',
						'action'	=> 'index',
						'lang'		=> $lang
				)
			)
		);

		
		
		
		// add multilingual route
		$fc->getRouter()->addRoute('default_multilingual', 
			new Zend_Controller_Router_Route(
				':lang/:controller/:action/*',
				array(
						'module'	=> 'default',
						'controller'=> 'main',
						'action'	=> 'index',
						'lang'		=> $lang
				),
				array(
						'lang' => '\w{2}'
				)
			)
		);
		$url = $_SERVER['REQUEST_URI'];
		$url = explode('/', $url);
		$alias = $url[count($url)-1];
		$res = main::getParent($alias);
		$fc->getRouter()->addRoute('view_region', 
			new Zend_Controller_Router_Route(
				':lang/main/view-region/:country/'.$res,
				array(
						'module'	=> 'default',
						'controller'=> 'main',
						'action'	=> 'viewregion',
						'lang'		=> $lang
				),
				array(
						'lang' => '\w{2}'
				)
			)
		);
		
		$fc->getRouter()->addRoute('view_country', 
			new Zend_Controller_Router_Route(
				':lang/main/view-country/:country',
				array(
						'module'	=> 'default',
						'controller'=> 'main',
						'action'	=> 'viewcountry',
						'lang'		=> $lang
				),
				array(
						'lang' => '\w{2}'
				)
			)
		);	
		
		$fc->getRouter()->addRoute('view_vineyard', 
			new Zend_Controller_Router_Route(
				':lang/main/view-region/:country/:region',
				array(
						'module'	=> 'default',
						'controller'=> 'main',
						'action'	=> 'viewregion',
						'lang'		=> $lang
				),
				array(
						'lang' => '\w{2}'
				)
			)
		);		
		
		$fc->getRouter()->addRoute('correct_vineyard', 
			new Zend_Controller_Router_Route(
				':lang/vineyards/correctvineyard/:id',
				array(
						'module'	=> 'default',
						'controller'=> 'vineyards',
						'action'	=> 'correctvineyard',
						'lang'		=> $lang
				),
				array(
						'lang' => '\w{2}'
				)
			)
		);
		
		$fc->getRouter()->addRoute('verify_vineyard', 
			new Zend_Controller_Router_Route(
				':lang/vineyards/verifyvineyard/:vineyard',
				array(
						'module'	=> 'default',
						'controller'=> 'vineyards',
						'action'	=> 'verifyvineyard',
						'lang'		=> $lang
				),
				array(
						'lang' => '\w{2}'
				)
			)
		);		
		
		$fc->getRouter()->addRoute('edit_listing', 
			new Zend_Controller_Router_Route(
				':lang/admin/editlisting/:vineyard',
				array(
						'module'	=> 'default',
						'controller'=> 'admin',
						'action'	=> 'editlisting',
						'lang'		=> $lang
				),
				array(
						'lang' => '\w{2}'
				)
			)
		);	
		
		$fc->getRouter()->addRoute('edit_vineyard', 
			new Zend_Controller_Router_Route(
				':lang/vineyards/editvineyard/:vineyard',
				array(
						'module'	=> 'default',
						'controller'=> 'vineyards',
						'action'	=> 'editvineyard',
						'lang'		=> $lang
				),
				array(
						'lang' => '\w{2}'
				)
			)
		);		
		
		$fc->getRouter()->addRoute('edit_seo', 
			new Zend_Controller_Router_Route(
				':lang/admin/editseo/:seo',
				array(
						'module'	=> 'default',
						'controller'=> 'admin',
						'action'	=> 'editseo',
						'lang'		=> $lang
				),
				array(
						'lang' => '\w{2}'
				)
			)
		);
				
		$fc->getRouter()->addRoute('edit_page', 
			new Zend_Controller_Router_Route(
				':lang/admin/editpage/:page',
				array(
						'module'	=> 'default',
						'controller'=> 'admin',
						'action'	=> 'editpage',
						'lang'		=> $lang
				),
				array(
						'lang' => '\w{2}'
				)
			)
		);
		
		$fc->getRouter()->addRoute('edit_region', 
			new Zend_Controller_Router_Route(
				':lang/admin/editregion/:region',
				array(
						'module'	=> 'default',
						'controller'=> 'admin',
						'action'	=> 'editregion',
						'lang'		=> $lang
				),
				array(
						'lang' => '\w{2}'
				)
			)
		);
		
		$fc->getRouter()->addRoute('edit_country', 
			new Zend_Controller_Router_Route(
				':lang/admin/editcountry/:country',
				array(
						'module'	=> 'default',
						'controller'=> 'admin',
						'action'	=> 'editcountry',
						'lang'		=> $lang
				),
				array(
						'lang' => '\w{2}'
				)
			)
		);
				
		$url = $_SERVER['REQUEST_URI'];
		$url = explode('/', $url);
		$alias = $url[count($url)-1];
		$res = main::getParent($alias);
		$fc->getRouter()->addRoute('dynemicaly', 
			new Zend_Controller_Router_Route(
				':lang/admin/editregion/'. $res,
				array(
						'module'	=> 'default',
						'controller'=> 'admin',
						'action'	=> 'editregion',
						'lang'		=> $lang
				),
				array(
						'lang' => '\w{2}'
				)
			)
		);
		
		$fc->getRouter()->addRoute('edit_grape', 
			new Zend_Controller_Router_Route(
				':lang/admin/editgrape/:grape',
				array(
						'module'	=> 'default',
						'controller'=> 'admin',
						'action'	=> 'editgrape',
						'lang'		=> $lang
				),
				array(
						'lang' => '\w{2}'
				)
			)
		);

		$fc->getRouter()->addRoute('manage_regions', 
			new Zend_Controller_Router_Route(
				':lang/admin/manageregions/:country',
				array(
						'module'	=> 'default',
						'controller'=> 'admin',
						'action'	=> 'manageregions',
						'lang'		=> $lang
				),
				array(
						'lang' => '\w{2}'
				)
			)
		);

		$fc->getRouter()->addRoute('manage_requests', 
			new Zend_Controller_Router_Route(
				':lang/admin/managerequests/:type',
				array(
						'module'	=> 'default',
						'controller'=> 'admin',
						'action'	=> 'managerequests',
						'lang'		=> $lang
				),
				array(
						'lang' => '\w{2}'
				)
			)
		);
		
//		$fc->getRouter()->addRoute('search_list', 
//			new Zend_Controller_Router_Route(
//				':lang/search/list/:page/:get',
//				array(
//						'module'	=> 'default',
//						'controller'=> 'search',
//						'action'	=> 'list',
//						'lang'		=> $lang
//				),
//				array(
//						'lang' => '\w{2}'
//				)
//			)
//		);
		
		$fc->getRouter()->addRoute('manage_requests1', 
			new Zend_Controller_Router_Route(
				':lang/admin/managerequests/:date',
				array(
						'module'	=> 'default',
						'controller'=> 'admin',
						'action'	=> 'managerequests',
						'lang'		=> $lang
				),
				array(
						'lang' => '\w{2}'
				)
			)
		);

		$fc->getRouter()->addRoute('manage_requests2', 
			new Zend_Controller_Router_Route(
				':lang/admin/managerequests/:date/:type',
				array(
						'module'	=> 'default',
						'controller'=> 'admin',
						'action'	=> 'managerequests',
						'lang'		=> $lang
				),
				array(
						'lang' => '\w{2}'
				)
			)
		);


		$fc->getRouter()->addRoute('manage_listings', 
			new Zend_Controller_Router_Route(
				':lang/main/managelistings/:type',
				array(
						'module'	=> 'default',
						'controller'=> 'main',
						'action'	=> 'managelistings',
						'lang'		=> $lang
				),
				array(
						'lang' => '\w{2}'
				)
			)
		);

		$fc->getRouter()->addRoute('manage_changes', 
			new Zend_Controller_Router_Route(
				':lang/main/managechanges/:type',
				array(
						'module'	=> 'default',
						'controller'=> 'main',
						'action'	=> 'managechanges',
						'lang'		=> $lang
				),
				array(
						'lang' => '\w{2}'
				)
			)
		);
		
		$fc->getRouter()->addRoute('user_listings', 
			new Zend_Controller_Router_Route(
				':lang/main/userlistings/:type',
				array(
						'module'	=> 'default',
						'controller'=> 'main',
						'action'	=> 'userlistings',
						'lang'		=> $lang
				),
				array(
						'lang' => '\w{2}'
				)
			)
		);
		
		$fc->getRouter()->addRoute('manage_countries', 
			new Zend_Controller_Router_Route(
				':lang/admin/managecountries/:continent',
				array(
						'module'	=> 'default',
						'controller'=> 'admin',
						'action'	=> 'managecontinent',
						'lang'		=> $lang
				),
				array(
						'lang' => '\w{2}'
				)
			)
		);
		
		$url = $_SERVER['REQUEST_URI'];
		$url = explode('/', $url);
		$alias = $url[count($url)-2];
		$res = main::getParent1($alias);
		$fc->getRouter()->addRoute('dynem_vineyard', 
			new Zend_Controller_Router_Route(
				':lang/vineyards/view-vineyard/:country/'. $res. '/:vineyard',
				array(
						'module'	=> 'default',
						'controller'=> 'vineyards',
						'action'	=> 'viewvineyard',
						'lang'		=> $lang
				),
				array(
						'lang' => '\w{2}'
				)
			)
		);		

	}
}