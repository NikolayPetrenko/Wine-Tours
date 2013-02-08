<?php
class Application_Form_Upload extends Application_Form_Error 
{
	public function __construct($options = null)
	{
		parent::__construct($options);
		$this->setName('upload');
		$this->setAttrib('enctype', 'multipart/form-data');

		$description = new Zend_Form_Element_Text('description');
		$description->setLabel('Description')
					->setRequired(true)
					->addValidator('NotEmpty')
					;

		$file = new Zend_Form_Element_File('file');
		$file	->setLabel('File')
				->setDestination(APPLICATION_PATH . '/data/uploads')
				->setRequired(true)
				->addValidator('Size', false, 1024000)
				->addValidator('Extension', false, 'jpg,png,gif')
				;

		$submit = new Zend_Form_Element_Submit('submit');
		$submit->setLabel('Upload');

		$this->addElements(array($description, $file, $submit));
	}
}

