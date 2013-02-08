<?php
class RegController extends Zend_Controller_Action
{
	    /**
     * Constructor 
     *
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
    /**
     * Validation of user input during the registration, 
     * change of name of downloadable avatars and adding a new user
     *
     */
    public function indexAction()
    {
		if (Zend_Auth::getInstance()->hasIdentity()) {
			$this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/main/index');
		}
		$seo_mod = new Application_Model_Seo();
		$seo = $seo_mod->getSeoById('2');
		$this->view->headTitle($seo->title);
//		$this->view->headMeta()->appendName('keywords', 'vineyard, winery, vineyard tours, winery tours, wine tours, wine tasting');
//		$this->view->headMeta()->appendName('description', 'The vineyards around the world');

		$form = new Application_Form_Reg();
		$this->view->form = $form;
		$form->setAction('/' . $_SESSION['lang'] . '/reg/index');
		if(empty($_SESSION['redirect'])) $_SESSION['redirect'] = $_SERVER['HTTP_REFERER'];
		if ($this->getRequest()->isPost()) {
			$formData = $this->getRequest()->getPost();
			if ($form->isValidPartial($formData)) {
				$image = $this->getRequest()->getPost('image');
				if(!empty($image)) {
					//moving poster from the temporary folder
					rename($_SERVER['DOCUMENT_ROOT'] .'/images/tmp/' . $image, $_SERVER['DOCUMENT_ROOT'].'/images/user/' . $image);
				}
				$email = $this->getRequest()->getPost('email');
				$reg_id = md5($email . mktime());        		
				
				if($form->getValue('involve') == 2) {
					$involves = $form->getValue('inv_select');
					if($form->getValue('other')) {
						$involves['other'] =  $form->getValue('other');
					}
					$involves = serialize($involves);
				} else {
					$involves = 1;
				}
				$users = new Application_Model_Users();
				$users->addUser(
									$form->getValue('name'), 
									$form->getValue('email'),
									$image, 
									$form->getValue('firstname'), 
									$form->getValue('surname'), 
									md5($form->getValue('password')), 
									$form->getValue('company'), 
									$form->getValue('country'), 
									$form->getValue('zone'),
									$reg_id,
									$formData['email_update'],
									$formData['email_ofers'],
									$involves
								);
				//does not work on localhost
				$config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'production');
				$params['link'] = 'http://' . $_SERVER['HTTP_HOST'] . '/' . $_SESSION['lang'] . '/reg/active/reg_id/' . $reg_id;
				myMailer::sendMail(
									$config->admin->email, 
									$config->admin->name, 
									$email, 
									'Registration on the site Vintlas', 
									'registration', 
									$params
				);
				$this->_flashMessenger = $this->_helper->getHelper('FlashMessenger');
				$this->_flashMessenger->addMessage('Your registration has been successful. 
					We have sent a verification email to the following email: ' . $email . '. 
					Please click the link in the mail to activate your Vintlas account.');
				$this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/main/systemmes');
			} else {
				$form->populate($formData);
			}	
		}      	
    }

    /**
     * Activation of your user account
     *
     */
    public function activeAction()
    {
		if (Zend_Auth::getInstance()->hasIdentity()) {
			$this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/main/index');
		}
		$this->view->headTitle('Activation account');
		$this->view->headMeta()->appendName('keywords', 'vineyard, winery, vineyard tours, winery tours, wine tours, wine tasting');
		$this->view->headMeta()->appendName('description', 'The vineyards around the world');
		$this->view->headScript()->appendFile('/js/users.js')
								->appendFile('/js/jvalidate.js');		
		
		$reg_id = $this->_getParam('reg_id');
		$users = new Application_Model_Users();
		if($users->isPassword($reg_id) === false) {
				$form = new Application_Form_Reg();
				$this->view->form = $form;
				if ($this->getRequest()->isPost()) {
					$formData = $this->getRequest()->getPost();
					if ($form->isValidPartial($formData)) {
						$users->updatePassword($reg_id, md5($form->getValue('password')));
						$this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/auth/login');
					} else {
						$form->populate($formData);
					}
				} else {
					$this->view->form = $form;
				}
		} else {
			if($users->updateUserStatus($reg_id) === TRUE) {
				$this->_helper->redirector->gotoUrl('/' . $_SESSION['lang'] . '/auth/login');
			} else {
				$this->view->message = 'Account activation failed. Perhaps it is already activated.';
			}
		}	
    }

    public function uploadAction()
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
		//for user avatar
		$file_name = time() . md5($_FILES["image"]["name"]);
		$image = new acResizeImage($_FILES["image"]["tmp_name"]);
		$image->resize('150', '150')->save($_SERVER['DOCUMENT_ROOT'] . '/images/tmp/', $file_name);
		echo json_encode(array(
							array(
								'name' => $file_name,
								'url' => '/images/tmp/' . $file_name
								)
						));							
	}
}