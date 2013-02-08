<?php
class Application_Form_Login extends Application_Form_Error 
{
	public function init()
	{
		$this->setName('login');
		$this->setDecorators(array(
									'FormElements',
									'Form',
									)
							);

		$fieldDecorator = array(
								'ViewHelper',
								array('input' => 'HtmlTag', array('class' => 'input')),
								array('Label',array('class' => 'label1')),
								array('Errors',array('class' => 'errors')),
								);		

		$isEmptyMessage = 'A value is required and can not be empty';

		$email = new Zend_Form_Element_Text('email');
		$email	->setLabel('E-mail:')
				->setDecorators($fieldDecorator)
				->setRequired(true)
				->addFilter('StripTags')
				->addFilter('StringTrim')
				->addValidator('NotEmpty', true,
								array('messages' => array('isEmpty' => $isEmptyMessage))
								);

		$password = new Zend_Form_Element_Password('password');
		$password	->setLabel('Password:')
					->setDecorators($fieldDecorator)
					->setRequired(true)
					->addFilter('StripTags')
					->addFilter('StringTrim')
					->addValidator('NotEmpty', true,
									array('messages' => array('isEmpty' => $isEmptyMessage))
								)
					;

		$rememberMe = new Zend_Form_Element_Checkbox('rememberMe');     
		$rememberMe	->setLabel('Remember Me')
					->setDecorators($fieldDecorator)
					->removeDecorator ('HtmlTag')
					;            

		$submit = new Zend_Form_Element_Submit('login');
		$submit	->setLabel('Log in')
				->setDecorators($fieldDecorator)
				->removeDecorator('Label')
				;

		$this->addElements(array($email, $password, $rememberMe, $submit));

		$this->setMethod('post');
	}
}

