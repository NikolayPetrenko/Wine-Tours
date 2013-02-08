<?php

class UsersController extends Zend_Controller_Action
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
								->appendFile('/js/users.js')
								;
    }

    public function indexAction()
    {
		$this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/users/manageuser');
    }

    /**
     * Shows all users 
     *
     *
     */
    public function manageuserAction()
    {
		if (!Zend_Auth::getInstance()->hasIdentity() && Zend_Auth::getInstance()->getIdentity()->role == 'admin') {
			throw new Zend_Exception("The page you requested was not found.", 404);
		}
		$this->_helper->layout->setLayout('admin');
		$this->view->headTitle('Users');
		$this->view->assign('message', "All users");
		$this->view->headMeta()->appendName('keywords', 'vineyard, winery, vineyard tours, winery tours, wine tours, wine tasting');
		$this->view->headMeta()->appendName('description', 'The vineyards around the world');
		$users = new Application_Model_Users();
		$config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'development');
		$page = $this->_getParam('page');
		$result = $this->view->table = $users->getUsers();
		$paginator = new Zend_Paginator(new Zend_Paginator_Adapter_Array($result->toArray()));
		$paginator->setItemCountPerPage($config->pagination->users);
		$paginator->setCurrentPageNumber($page);
		$paginator->setView($this->view);
		$this->view->paginator = $paginator;				
    }

	
    /**
     * User profile  
     *
     *
     */
	public function profileAction($param = false)
	{
		if (!Zend_Auth::getInstance()->hasIdentity()) {
			throw new Zend_Exception("The page you requested was not found.", 404);
		}
		$seo_mod = new Application_Model_Seo();
		$seo = $seo_mod->getSeoById('3');
		$this->view->headTitle($seo->title);
		$this->view->assign('message', "Profile");
//		$this->view->headMeta()->appendName('keywords', 'profile, users, user');
//		$this->view->headMeta()->appendName('description', 'The user profile on vintlas.com'); 
		$this->view->headLink()->prependStylesheet('/css/bootstrap-image-gallery.min.css'); 
		$this->view->headLink()->prependStylesheet('/css/jquery.fileupload-ui.css'); 

		$id = !empty($param) ? $param : Zend_Auth::getInstance()->getIdentity()->id;
		$user = new Application_Model_Users();
		$data_user = $user->getUser($id);
		if($data_user['involve'] != 1) {
			$data_user['inv_select'] = unserialize($data_user['involve']);
		}
		$data_user['other'] = !empty($data_user['inv_select']['other']) ? $data_user['inv_select']['other'] : '';
		$this->view->assign('avatar', $data_user['avatar']);
		$this->view->assign('user', $data_user);
	}
	
    /**
     * User edit profile  
     *
     *
     */
    public function editprofileAction()
    {
		if (!Zend_Auth::getInstance()->hasIdentity()) {
			throw new Zend_Exception("The page you requested was not found.", 404);
		}
		
		$this->view->headTitle('Edit Profile');
		$this->view->assign('message', "Edit Profile");
		$this->view->headMeta()->appendName('keywords', 'profile, users, user');
		$this->view->headMeta()->appendName('description', 'The user profile on vintlas.com'); 
		$this->view->headLink()->prependStylesheet('/css/bootstrap-image-gallery.min.css'); 
		$this->view->headLink()->prependStylesheet('/css/jquery.fileupload-ui.css'); 
	
		$form = new Application_Form_Reg();
		//override clear old and add new validators for name and email
		$form->email->clearValidators();
		$form->name->clearValidators();
		$form->name->addValidator(new Zend_Validate_Db_NoRecordExists1('users', 'name'));
		$form->email->addValidator(new Zend_Validate_Db_NoRecordExists1('users', 'email'));
		$id = Zend_Auth::getInstance()->getIdentity()->id;
		$this->view->form = $form;
		$form->setAction('/' . $_SESSION['lang'] . '/users/editprofile');
		if ($this->getRequest()->isPost()) {
			$formData = $this->getRequest()->getPost();
			if ($form->isValidPartial($formData)) {
				$image = $formData['image'];
				if(!empty($image)) {
					//moving poster from the temporary folder
					rename($_SERVER['DOCUMENT_ROOT'] .'/images/tmp/' . $image, $_SERVER['DOCUMENT_ROOT'].'/images/user/' . $image);
				}
				if($formData['involve'] == 2) {
					$involves = $formData['inv_select'];
					if($formData['other']) {
						$involves['other'] =  $formData['other'];
					}
					$involves = serialize($involves);
				} else {
					$involves = 1;
				}
				$users = new Application_Model_Users();
				$users->updateProfileUser($id, 
									$formData['name'], 
									$formData['firstname'], 
									$formData['surname'], 
									$formData['email'], 
									$formData['company'], 
									$image, 
									$formData['country'],
									$formData['zone'],
									$formData['email_update'], 
									$formData['email_ofers'], 
									$involves
				);
				unset($_SESSION['user_id']);
				$this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/users/profile');
			} else {
				$_SESSION['user_id'] = $id;
				$user = new Application_Model_Users();
				$data_user = $user->getUser($id);
				if($data_user['involve'] != 1) {
					$data_user['inv_select'] = unserialize($data_user['involve']);
					$data_user['involve'] = 2;
				}
				$data_user['other'] = !empty($data_user['inv_select']['other']) ? $data_user['inv_select']['other'] : '';
				$this->view->assign('avatar', $data_user['avatar']);
				$this->view->assign('user', $data_user);
				$form->populate($data_user);
			}
		} else {
			if ($id > 0) {
				$_SESSION['user_id'] = $id;
				$user = new Application_Model_Users();
				$data_user = $user->getUser($id);
				if($data_user['involve'] != 1) {
					$data_user['inv_select'] = unserialize($data_user['involve']);
					$data_user['involve'] = 2;
				}
				$data_user['other'] = !empty($data_user['inv_select']['other']) ? $data_user['inv_select']['other'] : '';
				$this->view->assign('avatar', $data_user['avatar']);
				$this->view->assign('user', $data_user);
				$form->populate($data_user);
			}
		}
    }

    /**
     * Adding new user
     *
     *
     */
    public function adduserAction()
    {
		if (!Zend_Auth::getInstance()->hasIdentity() && Zend_Auth::getInstance()->getIdentity()->role == 'admin') {
			throw new Zend_Exception("The page you requested was not found.", 404);
		}
		$this->_helper->layout->setLayout('admin');
		$this->view->headTitle('Add user');
		$this->view->assign('message', "Add new user");
		$this->view->headMeta()->appendName('keywords', 'vineyard, winery, vineyard tours, winery tours, wine tours, wine tasting');
		$this->view->headMeta()->appendName('description', 'The vineyards around the world');
	
		$form = new Application_Form_User();
		$form->submit->setLabel('Add user');
		$this->view->form = $form;
//		$part_mod = new Application_Model_Assregions();
//		$regions = $part_mod->getAssRegions();
//		$this->view->assign('regions', $regions);    	
		if ($this->getRequest()->isPost()) {
			$formData = $this->getRequest()->getPost();
			if ($form->isValid($formData)) {
				$name = $form->getValue('name');
				$firstname = $form->getValue('firstname');
				$email = $form->getValue('email');
				$status = $form->getValue('status');
				$role = $form->getValue('role');
				$reg_id = md5($email . mktime()); 
				$users = new Application_Model_Users();
				$users->newUser($name, $firstname, $email, $reg_id, $status, $role);
//				$user = $users->getAdapter()->lastInsertId();
//				$part_mod  = new Application_Model_Partners();
//				foreach ($_POST['regions'] as $region) {
//					$part_mod->addPartner($user, $region);
//				}
				$config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'production');
				$params['link'] = 'http://' . $_SERVER['HTTP_HOST'] . '/' . $_SESSION['lang'] . '/reg/active/reg_id/' . $reg_id;
				myMailer::sendMail(
									$config->admin->email, 
									$config->admin->name, 
									$email, 
									'Register on the site Vintlas', 
									'registradmin', 
									$params
				);
				$this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/users/index');
			} else {
				$form->populate($formData);
			}	
		}   
    }

    /**
     * Editing user
     *
     *
     */
    public function edituserAction()
    {
		if (!Zend_Auth::getInstance()->hasIdentity() && Zend_Auth::getInstance()->getIdentity()->role == 'admin') {
			throw new Zend_Exception("The page you requested was not found.", 404);
		}
		$this->_helper->layout->setLayout('admin');
		$this->view->headTitle('Edit user');
		$this->view->assign('message', "Edit user");
		$this->view->headMeta()->appendName('keywords', 'vineyard, winery, vineyard tours, winery tours, wine tours, wine tasting');
		$this->view->headMeta()->appendName('description', 'The vineyards around the world'); 
		$this->view->headLink()->prependStylesheet('/css/bootstrap-image-gallery.min.css'); 
		$this->view->headLink()->prependStylesheet('/css/jquery.fileupload-ui.css'); 
	
		$form = new Application_Form_Reg();
		//override clear old and add new validators for name and email
		$form->email->clearValidators();
		$form->name->clearValidators();
		$form->name->addValidator(new Zend_Validate_Db_NoRecordExists1('users', 'name'));
		$form->email->addValidator(new Zend_Validate_Db_NoRecordExists1('users', 'email'));
		$id = $this->_getParam('id', 0);
		$this->view->form = $form;
		$form->setAction('/' . $_SESSION['lang'] . '/users/edituser/id/' . $id);
		
//		$part_mod = new Application_Model_Assregions();
//		$regions = $part_mod->getRegionsNoParters();
//		$this->view->assign('regions', $regions);
//		$part_mod  = new Application_Model_Partners();
//		$regs = $part_mod->getUserRegions($id);
//		$temp = array();
//		foreach ($regs as $item) {
//			$temp[] = $item->id;
//		}
//		$regs = $temp;
//		$this->view->assign('regs', $regs);
		if ($this->getRequest()->isPost() == 1) {
			$formData = $this->getRequest()->getPost();
			if ($form->isValidPartial($formData)) {
				$image = $formData['image'];
				if(!empty($image)) {
					//moving poster from the temporary folder
					@rename($_SERVER['DOCUMENT_ROOT'] .'/images/tmp/' . $image, $_SERVER['DOCUMENT_ROOT'].'/images/user/' . $image);
				}
								
				if($formData['involve'] == 2) {
					$involves = $formData['inv_select'];
					if($formData['other']) {
						$involves['other'] =  $formData['other'];
					}
					$involves = serialize($involves);
				} else {
					$involves = 1;
				}
				$users = new Application_Model_Users();
				$users->updateProfile($formData['id'], 
									$formData['name'], 
									$formData['firstname'], 
									$formData['surname'], 
									$formData['email'], 
									$formData['company'], 
									$image, 
									$formData['country'],
									$formData['zone'],
									$formData['email_update'], 
									$formData['email_ofers'], 
									$involves,
									$formData['status'], 
									$_POST['role']
				);
//				$part_mod->deleteByUser($id);
//				foreach ($_POST['regions'] as $region) {
//					$part_mod->addPartner($id, $region);
//				}
				unset($_SESSION['user_id']);
				$this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/users/manageuser');
			} else {
				$user = new Application_Model_Users();
				$data_user = $user->getUserById($id)->toArray();
				$this->view->assign('avatar', $data_user['avatar']);
				$this->view->assign('id', $id);
				$this->view->assign('role', $data_user['role']);
				$form->populate($formData);
			}
		} else {
			if ($id > 0) {
				$_SESSION['user_id'] = $id;
				$user = new Application_Model_Users();
				$data_user = $user->getUserById($id)->toArray();
				if($data_user['involve'] != 1) {
					$data_user['inv_select'] = unserialize($data_user['involve']);
				}
				$data_user['other'] = !empty($data_user['inv_select']['other']) ? $data_user['inv_select']['other'] : '';
				$this->view->assign('avatar', $data_user['avatar']);
				$this->view->assign('user', $data_user);
				$this->view->assign('id', $id);
				$this->view->assign('role', $data_user['role']);
				$form->populate($data_user);
			}
		}
    }

    /**
     * Deleting a user
     *
     *
     */
    public function deleteuserAction()
    {
		$this->_helper->layout->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);		
		if(empty($_POST)) throw new Zend_Exception("The page you requested was not found.", 404);
		$users = new Application_Model_Users();
		$part_mod = new Application_Model_Partners();
		$users->deleteUser($_POST['userID']);
		$part_mod->deleteByUser($_POST['userID']);
		$result			= new JsonResponse();
		$result->html	= 'User has removed success';
		$result->result	= 1;
		
		echo $result;
    }

    public function changepasswordAction()
    {
		if (!Zend_Auth::getInstance()->hasIdentity()) {
			throw new Zend_Exception("The page you requested was not found.", 404);
		}
		
		$this->view->headTitle('Reset password');
		$this->view->assign('message', "Reset you password");
		$this->view->headMeta()->appendName('keywords', 'vineyard, winery, vineyard tours, winery tours, wine tours, wine tasting');
		$this->view->headMeta()->appendName('description', 'The vineyards around the world');

		$form = new Application_Form_Reg();
		$form->setAction('/' . $_SESSION['lang'] . '/users/changepassword');
		$this->view->form = $form;
		if ($this->getRequest()->isPost()) {
			$formData = $this->getRequest()->getPost();
			if ($form->isValidPartial($formData)) {
				$users = new Application_Model_Users();
				$users->resetPassword(Zend_Auth::getInstance()->getIdentity()->id, md5($form->getValue('password')));
				$this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/users/profile');
			} else {
				$form->populate($formData);
			}	
		}   
	}

	public function forgotpasswordAction()
	{
		$seo_mod = new Application_Model_Seo();
		$seo = $seo_mod->getSeoById('8');
		$this->view->headTitle($seo->title);
		$this->view->assign('message', "Forgot your password");
//		$this->view->headMeta()->appendName('keywords', 'vineyard, winery, vineyard tours, winery tours, wine tours, wine tasting');
//		$this->view->headMeta()->appendName('description', 'The vineyards around the world');

		$form = new Application_Form_Reg();
		$form->setAction('/' . $_SESSION['lang'] . '/users/forgotpassword');
		$form->getElement('email')->clearValidators();
		$form->getElement('email')->addValidator(new Zend_Validate_Db_RecordExists(array('table' => 'users', 'field' => 'email')));
		$this->view->form = $form;
		if ($this->getRequest()->isPost()) {
			$formData = $this->getRequest()->getPost();
			if ($form->isValidPartial($formData)) {
				$email = $form->getValue('email');
				$password = mt_rand(100000, 900000);
				$users = new Application_Model_Users();
				$user = $users->getUserByEmail($email);
				$users->resetPassword($user->id, md5($password));
				//does not work on localhost
				$config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'production');
				$params['password'] = $password;
				$params['username'] = $user->name;
				myMailer::sendMail(
									$config->admin->email, 
									$config->admin->name, 
									$email, 
									'Password recovery on the site Vintlas', 
									'forgotpassword', 
									$params
				);
				$this->_flashMessenger = $this->_helper->getHelper('FlashMessenger');
				$this->_flashMessenger->addMessage('Your temporary new password has been sent to ' . $email . '. Please check your inbox and log-in with your new password.');
				$this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/main/systemmes');
			} else {
				$form->populate($formData);
			}
		}
	}
}