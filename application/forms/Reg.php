<?php
class Application_Form_Reg extends Application_Form_Error 
{
	public function init()
	{
		$this->setName('reg');
		$this->setAttrib('enctype', 'multipart/form-data');
		$this->setAttrib('class', 'registration');
		$this->setDecorators(array(
									'FormElements',
									'Form',
								)
							);
		
		$fieldDecorator = array(
								'ViewHelper',
//								array('input' => 'HtmlTag', array('class' => '')),
//								array('Label',array('class' => 'label1')),
								array('Errors',array('class' => 'errors')),
							);
        
		$isEmptyMessage = 'A value is required and can not be empty';

		$name = new Zend_Form_Element_Text('name');
		$name	//->setLabel('Username/handle*:')
				->setDecorators($fieldDecorator)
				->setRequired(true)
				->setAttrib('class', 'inputBox')
				->addFilter('StripTags')
				->addFilter('StringTrim')
				->addValidator('NotEmpty', true,
								array('messages' => array('isEmpty' => $isEmptyMessage)))
				->addValidator(new Zend_Validate_Db_NoRecordExists(array('table' => 'users', 
																		'field' => 'name'))
							)
				;

		$email = new Zend_Form_Element_Text('email');          
		$email	//->setLabel('E-mail Address*:')
				->setDecorators($fieldDecorator)
				->setRequired(true)
				->setAttrib('class', 'inputBox')
				->addFilter('StripTags')
				->addFilter('StringTrim')
				->addValidator('NotEmpty', true,
								array('messages' => array('isEmpty' => $isEmptyMessage)))
				->addValidator('EmailAddress')
				->addValidator(new Zend_Validate_Db_NoRecordExists(array('table' => 'users', 
																		'field' => 'email'))
							)
				;            

		$avatar = new Zend_Form_Element_File('image');
		$avatar	//->setLabel('Photo/avatar:')
				->setDestination(APPLICATION_PATH . '/data/uploads/')
				->setRequired(false)
				->addValidator('Size', false, 1024000)
				->addValidator('Extension', false, 'jpg,png,gif')
				->addFilter(new App_Filter_File_ImageResize(array('width' => 100,
																'heigth' => 100)))
				->addDecorators(array(
										'File', 
										array('file' => 'HtmlTag', array('class' => 'input')),
										array('Label',array('class' => 'label1')),
										array('Errors',array('class' => 'errors')),
									)
								)
				;
                        
		$firstname = new Zend_Form_Element_Text('firstname');
		$firstname	//->setLabel('First Name:')
					->setDecorators($fieldDecorator)
					->setRequired(false)
					->setAttrib('class', 'inputBox')
					->addFilter('StripTags')
					->addFilter('StringTrim')
					;
        
		$surname = new Zend_Form_Element_Text('surname');
		$surname//->setLabel('Surname:')
				->setDecorators($fieldDecorator)
				->setRequired(false)
				->setAttrib('class', 'inputBox')
				->addFilter('StripTags')
				->addFilter('StringTrim')
				;
            
		$password = new Zend_Form_Element_Password('password');
		$password	//->setLabel('Password*:')
					->setDecorators($fieldDecorator)
					->setRequired(true)
					->setAttrib('class', 'inputBox')
					->addFilter('StripTags')
					->addFilter('StringTrim')
					->addValidator('NotEmpty', true,
									array('messages' => array('isEmpty' => $isEmptyMessage)))
					->addValidator('StringLength', true, 
									array('min' => 6)
								)
					;     

		$repassword = new Zend_Form_Element_Password('repassword');
		$repassword	//->setLabel('Repeat password*:')
					->setDecorators($fieldDecorator)
					->setRequired(true)
					->setAttrib('class', 'inputBox')
					->addFilter('StripTags')
					->addFilter('StringTrim')
					->addValidator('NotEmpty', true,
									array('messages' => array('isEmpty' => $isEmptyMessage)))
					->addValidator('identical', true,
									array('password')
								)
					; 
        
		$company = new Zend_Form_Element_Text('company');
		$company//->setLabel('Company Name:')
				->setDecorators($fieldDecorator)
				->setRequired(false)
				->setAttrib('class', 'inputBox')
				->addFilter('StripTags')
				->addFilter('StringTrim')
				;
            
		$country = new Zend_Form_Element_Select('country');          
		$country//->setLabel('Country of Residence:')
				->setDecorators($fieldDecorator)
				;
		$countries = new Application_Model_Countries();
		foreach ($countries->fetchAll($countries->select()->order('name_en ASC')) as $countr) {
			$country->addMultiOption($countr->code, $countr->name_en);
		}

		$zone = new Zend_Form_Element_Select('zone');		
		$zone	//->setLabel('Time Zone:')
				->setDecorators($fieldDecorator)
				;
		$zones = new Application_Model_Zones();
		foreach ($zones->fetchAll() as $zon) {
			$zone->addMultiOption($zon->id_zone, $zon->name);
		}
		
		$privacy = new Zend_Form_Element_Radio('privacy', array('value' => 1));
		$privacy//->setLabel('Privacy Controls*:')
				->setRequired(true)
				->addValidator('NotEmpty', true,
								array('messages' => array('isEmpty' => $isEmptyMessage)))				
				->setDecorators($fieldDecorator)
				->addMultiOption(1, 'Opt in for promotion offers')
				->addMultiOption(2, 'Receive comment follow-up notification e-mails')
				->addMultiOption(3, 'Personal contact form')
				;
		
		$involve = new Zend_Form_Element_Radio('involve');
		$involve//->setLabel('Please select one option only')
				->setRequired(true)
				->addValidator('NotEmpty', true,
								array('messages' => array('isEmpty' => $isEmptyMessage)))				
				->setDecorators($fieldDecorator)
				->addMultiOption(1, 'Are a wine tourist/interested in wine/planning to visit a vineyard?')
				->addMultiOption(2, 'Are involved in the wine/wine tourism industry?')
				;
		
		$inv_select = new Zend_Form_Element_MultiCheckbox('inv_select');
		$inv_select	
//					->addValidator('NotEmpty', true,
//								array('messages' => array('isEmpty' => $isEmptyMessage)))					
					->setDecorators($fieldDecorator)
					;
		
		$involves = array('Vineyard/Winery employee or owner' => 'Vineyard/Winery employee or owner',
						  'Accommodation provider e.g. Hotel, Guest House etc.' => 'Accommodation provider e.g. Hotel, Guest House etc.',
						  'Restaurant employee or owner' => 'Restaurant employee or owner',
						  'Wine Retailer' => 'Wine Retailer',
						  'Wine Distributer/Wholesaler' => 'Wine Distributer/Wholesaler',
						  'Wine tourism professional e.g. wine tour operator, tourism office, government official' => 'Wine tourism professional e.g. wine tour operator, tourism office, government official',
						  'Other' => 'Other. Please state'
  		 				 );
		foreach ($involves as $key => $value) {
			$inv_select->addMultiOption($key, $value);
		}
		
		$other = new Zend_Form_Element_Text('other');
		$other	->setDecorators($fieldDecorator)
				->setAttrib('class', 'inputBox')
				->addFilter('StripTags')
				->addFilter('StringTrim')
				; 
        
		$options = array(
						'captcha' => 'ReCaptcha',
						'captchaOptions' => array(
													'captcha' => 'ReCaptcha',
													'pubKey' => '6LcRedMSAAAAAPFiJ0sZipvP5BsPFU9bKhbhXR_d',
													'privKey' => '6LcRedMSAAAAADqiAHKbI0lljJbZbzzJjxV7nvsC',
												)
						);
		$captcha = self::createElement('captcha', 'captcha', $options);
		$captcha->removeDecorator('HtmlTag')
				->removeDecorator('Label')
				->setRequired(true)
				->addFilter('StripTags')
				->addFilter('StringTrim')
				;
		
		$status = new Zend_Form_Element_Select('status');
		$status	//->setLabel('Status:')
				->setDecorators($fieldDecorator)
				->addMultiOption('1', 'active')
				->addMultiOption('0', 'inactive')
				;
                
		$submit = new Zend_Form_Element_Submit('register');
		$submit	->setLabel('Join Vintlas')
				->setDecorators($fieldDecorator)
				->removeDecorator('Label')
				->setAttrib('class', 'redSubmitBg')
				;
	
		$this->addElements(array($name, $email, $avatar, $firstname, $surname, 
								$password, $repassword, $company, $country, $zone, 
								$privacy, $involve, $inv_select, $other, $captcha, $status, $submit
							));

		$this->setMethod('post');
	}
}