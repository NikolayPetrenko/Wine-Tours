<?php
class Application_Form_Region extends Application_Form_Error 
{
	public function __construct($options = null)
	{
		parent::__construct($options);
		$this->setName('region');

		$fieldDecorator = array(
								'ViewHelper',
								array('input' => 'HtmlTag', array('class' => 'input')),
								array('Label',array('class' => 'label1')),
								array('Errors',array('class' => 'errors')),
							);	

		$name = new Zend_Form_Element_Text('name');
		$name	->setLabel('Region Name:')
				->addFilter('StripTags')
				->addFilter('StringTrim')
				->setRequired(true)
				->addValidator('NotEmpty')
				->setDecorators($fieldDecorator)
				;

		$local_name = new Zend_Form_Element_Text('local_name');
		$local_name	->setLabel('Region Local Name:')
					->addFilter('StripTags')
					->addFilter('StringTrim')
					->setDecorators($fieldDecorator)
					;

		$country = new Zend_Form_Element_Select('country');          
		$country->setLabel('Associated Country:')
				->setRequired(true)
				->setAttrib('disabled', 'disabled')
				->setDecorators($fieldDecorator)
				->addMultiOption('', 'Select country')
				->setRegisterInArrayValidator(false)
				;
		$countries = new Application_Model_Countries();
		foreach ($countries->getCountries(true) as $value) {
			$country->addMultiOption($value->code, $value->name_en);
		}

		$description = new Zend_Form_Element_Textarea('description');
		$description->setLabel('Short Description Of Region:')
					->addFilter('StripTags')
					->setAttrib('rows', 15)
					->addFilter('StringTrim')
					->setDecorators($fieldDecorator)
					;

		$grapes = new Zend_Form_Element_Select('grapes', array('multiple' => 'multiple'));          
		$grapes->setLabel('Principle Grapes:')
				->setRequired(false)
				->setRegisterInArrayValidator(false)
				->setDecorators(array(
								'ViewHelper',
								array('input' => 'HtmlTag', array('tag' => 'p')),
							))
				;
		$grape = new Application_Model_Grapes();
		foreach ($grape->fetchAll($grape->select()->order('name ASC')) as $grap) {
			$grapes->addMultiOption($grap->id, $grap->name);
		}

		$links = new Zend_Form_Element_Text('links');
		$links	->setLabel('Useful links:')
				->addFilter('StripTags')
				->addFilter('StringTrim')
				->setAttrib('name', 'links[]')
				->setDecorators($fieldDecorator)
				;

		$acknowledgements = new Zend_Form_Element_Textarea('acknowledgements');
		$acknowledgements->setLabel('Acknowledgements:')
						->setAttrib('rows', 15)
						->setDecorators($fieldDecorator)
						;
		
		$partners = new Zend_Form_Element_Select('partners', array('multiple' => 'multiple'));          
		$partners->setLabel('Partner Manager:')
				->setRequired(false)
				->setRegisterInArrayValidator(false)
				->setDecorators(array(
								'ViewHelper',
								array('input' => 'HtmlTag', array('tag' => 'p')),
							))
				;
		$users = new Application_Model_Users();
		foreach ($users->getUsers() as $user) {
			if($user->id != Zend_Auth::getInstance()->getIdentity()->id) {
				$partners->addMultiOption($user->id, $user->name);
			}
		}

		$notes = new Zend_Form_Element_Textarea('notes');
		$notes	->setLabel('Notes on data changes:')
				->setAttrib('rows', 15)
				->setDecorators($fieldDecorator)
				;

		$submit = new Zend_Form_Element_Submit('submit');
		$submit	->setAttrib('id', 'submitbutton')
				->setDecorators(
								array(
										'ViewHelper',
										array('input' => 'HtmlTag', array('class' => 'input')),
								)
					)
				->setAttrib('class', 'btn btn-danger')
				;

		$this->addElements(
							array(
									$name, $local_name, $country, 
									$description, $grapes, $links, 
									$acknowledgements, $notes, $partners, $submit
							)
				);
		
		$this->setMethod('post');
	}
}