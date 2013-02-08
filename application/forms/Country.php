<?php
class Application_Form_Country extends Application_Form_Error 
{
	public function __construct($options = null)
	{
		parent::__construct($options);
		$this->setName('country');

		$fieldDecorator = array(
								'ViewHelper',
								array('input' => 'HtmlTag', array('class' => 'input')),
								array('Label',array('class' => 'label1')),
								array('Errors',array('class' => 'errors')),
							);	
		
		$name_en = new Zend_Form_Element_Text('name_en');
		$name_en->setLabel('Country Name:')
				->setAttrib('name', 'name_en')
				->addFilter('StripTags')
				->addFilter('StringTrim')
				->setDecorators($fieldDecorator)
				->setRequired(true)
				->addValidator('NotEmpty')
				;

		$descr = new Zend_Form_Element_Textarea('description');
		$descr	->setLabel('Short scription Of Country')
				->setDecorators($fieldDecorator)
				;

		$acknowledgements = new Zend_Form_Element_Textarea('acknowledgements');
		$acknowledgements->setLabel('Acknowledgements:')
						->setAttrib('rows', 15)
						->setDecorators($fieldDecorator)
						;

		$notes = new Zend_Form_Element_Textarea('notes');
		$notes	->setLabel('Notes on data changes:')
				->setAttrib('rows', 15)
				->setDecorators($fieldDecorator)
				;
		
		$submit = new Zend_Form_Element_Submit('submit');
		$submit	->setAttrib('id', 'submitbutton')
				->setDecorators(array(
								'ViewHelper',
								array('input' => 'HtmlTag', array('class' => 'input')),
							))
				->setAttrib('class', 'btn btn-danger')
				;

		$this->addElements(array($name_en, $descr, $acknowledgements, $notes, $submit));
		$this->setMethod('post');
	}
}