<?php

class Site_Controller_Action_Helper_Language extends Zend_Controller_Action_Helper_Abstract {

	protected $_sDefaultLanguage;
	protected $_aLocales;
	protected $_sLanguagesDirectoryPath;

	/**
	* @param array $aLocales - Available locales
	* @param string $sLanguagesDirectoryPath
	*/
	public function __construct(array $aLocales, $sLanguagesDirectoryPath) 
	{
		$this->_sLanguagesDirectoryPath = $sLanguagesDirectoryPath;
		$this->_aLocales = $aLocales;
		$this->_sDefaultLanguage = 'en'; // get first language
	}

	public function init() 
	{
		// try get current language from url
		$sLang = $this->getRequest()->getParam('lang');
		
		if(!empty($_SESSION['lang']) && !empty($sLang) && $_SESSION['lang'] != $sLang) {
			unset ($_SESSION['lang']);
			unset ($_SESSION['languages']);
		}
		
		if(!empty($sLang)) {
			$_SESSION['lang'] = $sLang;
			switch ($sLang) {
				case 'en':
					$_SESSION['languages'] = 'English';
				break;
				case 'ru':
					$_SESSION['languages'] = 'Russian';
				break;
				default:
					$_SESSION['languages'] = 'English';
			}
		}	
		if(! array_key_exists($sLang, $this->_aLocales)) {
			$sLang = $this->_sDefaultLanguage;
		}

		// generate path to the gettext language file
		$sLanguageFilePath = $this->_sLanguagesDirectoryPath . '/'. $sLang . '.php';
		if(! file_exists($sLanguageFilePath)) {
			$sLanguageFilePath = $this->_sLanguagesDirectoryPath . '/' . $this->_sDefaultLanguage . '.php';
			$sLang = $this->_sDefaultLanguage;
		}

		// get current locale by current language
		$sLocale = $this->_aLocales[$sLang];

		// setup translate object
		$oTranslate = new Zend_Translate('array', $sLanguageFilePath, $sLang);
		
		Zend_Registry::set('Zend_Translate', $oTranslate);
		Zend_Validate_Abstract::setDefaultTranslator($oTranslate);
		

		$this->_actionController->_locale = $sLocale;
		$this->_actionController->_lang = $sLang;
		$this->_actionController->_translate = $oTranslate;

		$viewRenderer = Zend_Controller_Action_HelperBroker::getStaticHelper('viewRenderer');
		$viewRenderer->view->locale = $sLocale;
		$viewRenderer->view->lang = $sLang;
		$viewRenderer->view->translate = $oTranslate;
	}
}