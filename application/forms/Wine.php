<?php
class Application_Form_Wine extends Application_Form_Error 
{
	public function __construct($options = null)
	{
		parent::__construct($options);
		$this->setName('wine');

		$fieldDecorator = array(
								'ViewHelper',
								array('input' => 'HtmlTag', array('class' => 'input')),
								array('Label',array('class' => 'label1')),
								array('Errors',array('class' => 'errors')),
							);	
		
		$name = new Zend_Form_Element_Text('name');
		$name	->setLabel('Wine Name')
					->addFilter('StripTags')
					->addFilter('StringTrim')
					->addValidator('NotEmpty')
					->setDecorators($fieldDecorator)
					;

		$grapes = new Zend_Form_Element_Select('grapes', array('multiple' => 'multiple'));          
		$grapes->setLabel('Grapes Grown:')
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
		
		$vintage = new Zend_Form_Element_Select('vintage');
		$vintage->setLabel('Vintage')
				->setDecorators($fieldDecorator)
				;
		for($i = 1900; $i <= date('Y'); $i++) {
			$vintage->addMultiOption($i, $i);
		}

		$notes = new Zend_Form_Element_Textarea('notes');
		$notes	->setLabel('Notes on data changes:')
				->setAttrib('rows', 15)
				->setDecorators($fieldDecorator)
				;		
		
		$submit = new Zend_Form_Element_Submit('submit');
		$submit	->setAttrib('id', 'submitbutton')
				->setDecorators($fieldDecorator)
				->setAttrib('class', 'btn btn-danger')
				;

		$this->addElements(array($name, $grapes, $vintage, $notes, $submit));
		$this->setMethod('post');
	}
}