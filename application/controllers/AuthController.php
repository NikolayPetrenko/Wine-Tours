<?php
class AuthController extends Zend_Controller_Action
{
	/**
     * Constructor 
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

		$this->view->headScript()->appendFile('http://maps.google.com/maps/api/js?sensor=true&language=eng')
								->appendFile('/js/load-image.js')
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
		$this->_helper->layout->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);
		$this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/auth/login');
	}
	
	/**
	 * Check if a user entered email and password, 
	 * add user data in a data warehouse Zend
	 */
	public function loginAction()
	{
		if (Zend_Auth::getInstance()->hasIdentity()) {
			$this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/main/index');
		}
    		$this->view->headTitle('Authorization');
		$this->view->headMeta()->appendName('keywords', 'vineyard, winery, vineyard tours, winery tours, wine tours, wine tasting');
		$this->view->headMeta()->appendName('description', 'The vineyards around the world');
		$form = new Application_Form_Login();
		$this->view->form = $form;
		$form->setAction('/' . $_SESSION['lang'] . '/auth/login');
		if(empty($_SESSION['redirect']) && !empty($_SERVER['HTTP_REFERER'])) $_SESSION['redirect'] = $_SERVER['HTTP_REFERER'];
		if ($this->getRequest()->isPost()) {
			$formData = $this->getRequest()->getPost();
			if ($form->isValid($formData)) {
				$user_mod = new Application_Model_Users();
				if($user_mod->getUserStatus($this->getRequest()->getPost('email'))) {
					$authAdapter = new Zend_Auth_Adapter_DbTable(Zend_Db_Table::getDefaultAdapter());
					$authAdapter->setTableName('users')
								->setIdentityColumn('email')
								->setCredentialColumn('password');
					$email = $this->getRequest()->getPost('email');
					$password = md5($this->getRequest()->getPost('password'));

					$authAdapter->setIdentity($email)
								->setCredential($password);
					$auth = Zend_Auth::getInstance();
					$result = $auth->authenticate($authAdapter);
					if ($result->isValid()) {
						if ($form->getValue('rememberMe')) {
							Zend_Session::rememberMe();
						}
						$identity = $authAdapter->getResultRowObject();
						$authStorage = $auth->getStorage();
						$authStorage->write($identity);
						$redirect = $_SESSION['redirect'];
						unset($_SESSION['redirect']);
						if(!empty($_SESSION['redirect_vin'])) {
							$redirect = $_SESSION['redirect_vin'];
							unset($_SESSION['redirect_vin']);
							$_SESSION['correct'] = true;
						} 
						header('Location: ' . $redirect);
					} else {
						$this->view->errMessage = 'You have entered an incorrect user name or bad password';
					}
				} else {
					$this->view->errMessage = 'Your account is not activated';
				}
			}
		}
	}

	/**
	 * Destruction of information about the user's authorization
	 */
	public function logoutAction()
	{
		$this->_helper->layout->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);
		Zend_Auth::getInstance()->clearIdentity();
		Zend_Session::forgetMe();
		$this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/main/index');
	}
}