<?php
class Application_Form_Grape extends Application_Form_Error 
{
	public function __construct($options = null)
	{
		parent::__construct($options);
		$this->setName('grape');

		$fieldDecorator = array(
								'ViewHelper',
								array('input' => 'HtmlTag', array('class' => 'input')),
								array('Label',array('class' => 'label1')),
								array('Errors',array('class' => 'errors')),
							);	
		
		$name = new Zend_Form_Element_Text('name');
		$name	->setLabel('Grape Name:')
				->addFilter('StripTags')
				->addFilter('StringTrim')
				->setRequired(true)
				->setDecorators($fieldDecorator)
				->addValidator('NotEmpty')
				;

		$other_name = new Zend_Form_Element_Text('other_name');
		$other_name	->setLabel('Other Names/Spellings:')
					->addFilter('StripTags')
					->addFilter('StringTrim')
					->setDecorators($fieldDecorator)
					->setRequired(false)
					->addValidator('NotEmpty')
					;

		$characteristics = new Zend_Form_Element_Textarea('characteristics');
		$characteristics->setLabel('Characteristics:')
						->addFilter('StripTags')
						->setDecorators($fieldDecorator)
						->addFilter('StringTrim')
						;

		$submit = new Zend_Form_Element_Submit('submit');
		$submit	->setAttrib('id', 'submitbutton')
				->setAttrib('class', 'btn btn-danger')
				;

		$this->addElements(array($name, $other_name, $characteristics, $submit));
		$this->setMethod('post');
	}
}