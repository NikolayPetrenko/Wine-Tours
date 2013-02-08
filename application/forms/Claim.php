<?php
class Application_Form_Claim extends Application_Form_Error 
{
	public function init()
	{
		$this->setName('claim');
		$this->setAttrib('class', 'claim');
		$this->setDecorators(array(
									'FormElements',
									'Form',
								)
							);
		
		$fieldDecorator = array(
								'ViewHelper',
//								array('input' => 'HtmlTag', array('class' => 'input')),
//								array('Label',array('class' => 'label1')),
								array('Errors',array('class' => 'errors')),
							);
        
		$isEmptyMessage = 'A value is required and can not be empty';

		$name = new Zend_Form_Element_Text('name');
		$name	//->setLabel('Full Name*:')
				->setDecorators($fieldDecorator)
				->setRequired(true)
				->setAttrib('class', 'claim_input inputBox')
				->addFilter('StripTags')
				->addFilter('StringTrim')
				->addValidator('NotEmpty', true,
								array('messages' => array('isEmpty' => $isEmptyMessage)))
				;

		$number = new Zend_Form_Element_Text('number');          
		$number	//->setLabel('Contact Number*:')
				->setDecorators($fieldDecorator)
				->setRequired(true)
				->setAttrib('class', 'claim_input inputBox')
				->addFilter('StripTags')
				->addFilter('StringTrim')
				->addValidator('NotEmpty', true,
								array('messages' => array('isEmpty' => $isEmptyMessage)))
				;            

		$position = new Zend_Form_Element_Text('position');          
		$position	//->setLabel('Position in Business*:')
					->setDecorators($fieldDecorator)
					->setRequired(true)
					->setAttrib('class', 'claim_input inputBox')
					->addFilter('StripTags')
					->addFilter('StringTrim')
					->addValidator('NotEmpty', true,
								array('messages' => array('isEmpty' => $isEmptyMessage)))
					;            

		$comment = new Zend_Form_Element_Textarea('comment');          
		$comment	//->setLabel('Comments*:')
					->setDecorators($fieldDecorator)
					->setRequired(true)
					->setValue('hi i am the owner of this business and i would like to claim it...')
					->addFilter('StripTags')
					->addFilter('StringTrim')
					->setAttrib('class', 'claim_input inputBox')
					->setAttrib('rows', 20)
					->setAttrib('cols', 20)
					->addValidator('NotEmpty', true,
								array('messages' => array('isEmpty' => $isEmptyMessage)))
					;            
                
		$submit = new Zend_Form_Element_Submit('submit');
		$submit	//->setLabel('Send Claim')
				->setDecorators($fieldDecorator)
				->removeDecorator('Label')
				->setAttrib('class', 'btn btn-danger')
				;
	
		$this->addElements(
							array(
								$name, $number, $position, 
								$comment, $submit
							)
				);

		$this->setMethod('post');
	}
}