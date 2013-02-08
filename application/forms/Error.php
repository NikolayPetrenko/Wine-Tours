<?php
class Application_Form_Error extends Zend_Form
{
	public function __construct()
	{
		parent::__construct();
		$data = array(
						Zend_Captcha_ReCaptcha::MISSING_VALUE => 'Enter the code shown',
						Zend_Captcha_ReCaptcha::ERR_CAPTCHA => 'Entered an incorrect code from the picture',
						Zend_Captcha_ReCaptcha::BAD_CAPTCHA => 'The value you entered does not match with the image',
						Zend_Validate_Identical::NOT_SAME => 'The values do not match',
						Zend_Validate_Db_NoRecordExists::ERROR_RECORD_FOUND => '%value% is already in the database. Please specify the other.',
						Zend_Validate_StringLength::TOO_SHORT => 'The length of the entered value is less than %min% characters.',
						Zend_Validate_StringLength::TOO_LONG => 'The length of the entered value is less than %max% characters',               
					);
        
		$translator = new Zend_Translate('Array', $data, 'my_ENG');
		$translator->getAdapter()->setLocale(new Zend_Locale('my_ENG'));
		Zend_Validate_Abstract::setDefaultTranslator($translator);
	}
}
