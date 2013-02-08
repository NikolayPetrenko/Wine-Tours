<?php
class Application_Form_Contact extends Application_Form_Error 
{
	public function init()
	{
		$this->setName('contact');
		$this->setAttrib('enctype', 'multipart/form-data');
		$this->setAttrib('class', 'contact');
		$this->setDecorators(array(
									'FormElements',
									'Form',
								)
							);
		
		$fieldDecorator = array(
								'ViewHelper',
//								array('input' => 'HtmlTag', array('class' => 'input')),
								array('Label',array('class' => 'label1')),
								array('Errors',array('class' => 'errors')),
							);
        
		$isEmptyMessage = 'A value is required and can not be empty';

		$name = new Zend_Form_Element_Text('name');
		$name	//->setLabel('Name:')
				->setDecorators($fieldDecorator)
				->addFilter('StripTags')
				->addFilter('StringTrim')
				;

		$email = new Zend_Form_Element_Text('email');          
		$email	//->setLabel('E-mail Address*:')
				->setDecorators($fieldDecorator)
				->setRequired(true)
				->addFilter('StripTags')
				->addFilter('StringTrim')
				->addValidator('NotEmpty', true,
								array('messages' => array('isEmpty' => $isEmptyMessage)))
				->addValidator('EmailAddress')
				;            
		
		$subject = new Zend_Form_Element_Text('subject');          
		$subject//->setLabel('Subject*:')
				->setDecorators($fieldDecorator)
				->setRequired(true)
				->addFilter('StripTags')
				->addFilter('StringTrim')
				->addValidator('NotEmpty', true,
								array('messages' => array('isEmpty' => $isEmptyMessage)))
				;
		
		$comment = new Zend_Form_Element_Textarea('comment');
		$comment//->setLabel('Your Comment/Enquiry*:')
				->setDecorators($fieldDecorator)
				->setRequired(true)
				->setAttrib('rows', '10')
				->setAttrib('cols', '30')
				->addValidator('NotEmpty', true,
								array('messages' => array('isEmpty' => $isEmptyMessage)))
				->addFilter('StripTags')
				->addFilter('StringTrim')
				;
            
        
		$options = array(
						'captcha' => 'ReCaptcha',
						'captchaOptions' => array(
													'captcha' => 'ReCaptcha',
													'pubKey' => '6Lco2c0SAAAAAJSNVxRDjv0dewtsxdg-g8U6n-7w',
													'privKey' => '6Lco2c0SAAAAAAGQ1yv6wpdBjPRe0YywPsaYxRji',
												)
						);
		$captcha = self::createElement('captcha', 'captcha', $options);
		$captcha->removeDecorator('HtmlTag')
				->removeDecorator('Label')
				->setRequired(true)
				->addFilter('StripTags')
				->addFilter('StringTrim')
				;
                
		$submit = new Zend_Form_Element_Submit('submit');
		$submit	->setLabel('Sent Message')
				->setDecorators($fieldDecorator)
				->setAttrib('class', 'redSubmitBg')
				->removeDecorator('Label')
				;

		$this->addElements(array($name, $email, $subject, $comment, $captcha, $submit));
		$this->setMethod('post');
	}
}