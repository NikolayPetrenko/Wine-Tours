<?php
class Application_Form_User extends Application_Form_Error 
{
	public function __construct($options = null)
	{
		parent::__construct($options);
		$this->setName('user');

		$fieldDecorator = array(
								'ViewHelper',
								array('input' => 'HtmlTag', array('class' => 'input')),
								array('Label',array('class' => 'label1')),
								array('Errors',array('class' => 'errors')),
							);	
		
		$id = new Zend_Form_Element_Hidden('id');
		$id->addFilter('Int');

		$user_name = new Zend_Form_Element_Text('name');
		$user_name	->setLabel('Name')
					->setRequired(true)
					->addFilter('StripTags')
					->addFilter('StringTrim')
					->addValidator('NotEmpty')
					;

		$user_firstname = new Zend_Form_Element_Text('firstname');
		$user_firstname	->setLabel('Firstname')
						->setRequired(true)
						->addFilter('StripTags')
						->addFilter('StringTrim')
						->addValidator('NotEmpty')
						;

		$user_email = new Zend_Form_Element_Text('email');
		$user_email	->setLabel('Email')
					->setRequired(true)
					->addFilter('StripTags')
					->addFilter('StringTrim')
					->addValidator('EmailAddress')
					;
		
		$status = new Zend_Form_Element_Select('status');
		$status	->setLabel('Status:')
				->addMultiOption('1', 'active')
				->addMultiOption('0', 'inactive')
				;

		$role = new Zend_Form_Element_Select('role');
		$role	->setLabel('Role:')
				->addMultiOption('user', 'User')
				->addMultiOption('admin', 'Admin')
				;
		
		$submit = new Zend_Form_Element_Submit('submit');
		$submit	->setAttrib('id', 'submitbutton')
//				->setDecorators($fieldDecorator)
				->setAttrib('class', 'btn btn-danger')
				;

		$this->addElements(array($id, $user_name, $user_firstname, $user_email, $status, $role, $submit));
		$this->setMethod('post');
	}
}