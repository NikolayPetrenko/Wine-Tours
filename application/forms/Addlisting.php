<?php
class Application_Form_Addlisting extends Zend_Form
{
	public function init()
	{
		$this->setName('addlisting');
		$this->setDecorators(
							array(
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

		$owner = new Zend_Form_Element_Radio('owner', array('value' => '0'));
		$owner	->setLabel('I am the Owner/Manager')
				->setRequired(false)				
				->setDecorators($fieldDecorator)
				->addMultiOption(1, 'Yes')
				->addMultiOption(0, 'No')
				;
		
		$name = new Zend_Form_Element_Text('name');
		$name	->setLabel('Vineyard Name*:')
				->setDecorators($fieldDecorator)
				->setRequired(true)
				->addFilter('StripTags')
				->addFilter('StringTrim')
				->addValidator('NotEmpty', true,
									array('messages' => array('isEmpty' => $isEmptyMessage))
								);

		$nameloc = new Zend_Form_Element_Text('nameloc');
		$nameloc->setLabel('Vineyard Name (local Language):')
				->setDecorators($fieldDecorator)
				->setRequired(false)
				->addFilter('StripTags')
				->addFilter('StringTrim')
				;

		$address1 = new Zend_Form_Element_Text('address1');
		$address1	->setLabel('Address 1:')
					->setDecorators($fieldDecorator)
					->setRequired(false)
					->addFilter('StripTags')
					->addFilter('StringTrim')
					;

		$address2 = new Zend_Form_Element_Text('address2');
		$address2	->setLabel('Address 2:')
					->setDecorators($fieldDecorator)
					->setRequired(false)
					->addFilter('StripTags')
					->addFilter('StringTrim')
					;

		$city = new Zend_Form_Element_Text('city');
		$city	->setLabel('City/Town*:')
				->setDecorators($fieldDecorator)
				->setRequired(true)
				->addFilter('StripTags')
				->addFilter('StringTrim')
				->addValidator('NotEmpty', true,
								array('messages' => array('isEmpty' => $isEmptyMessage))
								);

		$region = new Zend_Form_Element_Text('region');
		$region	->setLabel('Province/Region/State:')
				->setDecorators($fieldDecorator)
				->setRequired(false)
				->addFilter('StripTags')
				->addFilter('StringTrim')
				;

		$zip = new Zend_Form_Element_Text('zip');
		$zip->setLabel('Zip/Postal Code:')
			->setDecorators($fieldDecorator)
			->setRequired(false)
			->addFilter('StripTags')
			->addFilter('StringTrim')
			;

		$country = new Zend_Form_Element_Select('country');          
		$country->setLabel('Country of Residence*:')
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

		$continent = new Zend_Form_Element_Select('continent');          
		$continent	->setLabel('Continent*:')
					->setRequired(true)
					->setDecorators($fieldDecorator)
					->addMultiOption('', 'Select continent')
					;
		$continentes = new Application_Model_Continents();
		foreach ($continentes->getContinents(true) as $continen) {
			$continent->addMultiOption($continen->id, $continen->name);
		}

		$telephone = new Zend_Form_Element_Text('telephone');
		$telephone	->setLabel('Telephone Number*:')
					->setDecorators($fieldDecorator)
					->setRequired(true)
					->addFilter('StripTags')
					->addFilter('StringTrim')
					;

		$country_code	= new Zend_Form_Element_Text('country_code');
		$country_code	->setLabel('Country Code*:')
						->setDecorators($fieldDecorator)
						->setRequired(true)
						->addFilter('StripTags')
						->addFilter('StringTrim')
						;
		
		$city_code	= new Zend_Form_Element_Text('city_code');
		$city_code	->setLabel('City Code*:')
					->setDecorators($fieldDecorator)
					->setRequired(true)
					->addFilter('StripTags')
					->addFilter('StringTrim')
					;
		
		$fax = new Zend_Form_Element_Text('fax');
		$fax->setLabel('Fax:')
			->setDecorators($fieldDecorator)
			->setRequired(false)
			->addFilter('StripTags')
			->addFilter('StringTrim')
			;
		
		$email = new Zend_Form_Element_Text('email');
		$email	->setLabel('E-mail address:')
				->setDecorators($fieldDecorator)
				->setRequired(false)
				->addFilter('StripTags')
				->addFilter('StringTrim')
				;

		$web = new Zend_Form_Element_Text('web');
		$web->setLabel('Web Address:')
			->setDecorators($fieldDecorator)
			->setRequired(false)
			->addFilter('StripTags')
			->addFilter('StringTrim')
			;
		
		$loc_y = new Zend_Form_Element_Text('loc_y');
		$loc_y	->setDecorators($fieldDecorator)
				->setRequired(true)
				->addFilter('StripTags')
				->addFilter('StringTrim')
				;
		
		$loc_z = new Zend_Form_Element_Text('loc_z');
		$loc_z	->setDecorators($fieldDecorator)
				->setRequired(true)
				->addFilter('StripTags')
				->addFilter('StringTrim')
				;
		
		$ass_region = new Zend_Form_Element_Select('ass_region');          
		$ass_region	->setLabel('Associated Region*:')
					->setRequired(true)
					->setAttrib('disabled', 'disabled')
					->addMultiOption('', 'Select Associated Region')
					->setDecorators($fieldDecorator)
					->setRegisterInArrayValidator(false)
					;
		$ass_regions = new Application_Model_Assregions();
		foreach ($ass_regions->getAssRegions() as $value) {
			$ass_region->addMultiOption($value->id, $value->name);
		}

		$logo = new Zend_Form_Element_File('logo');
		$logo	->setLabel('Vineyard Logo:')
				->setDestination(APPLICATION_PATH . '/data/uploads/vineyard/')
				->setRequired(false)
				->addValidator('Size', false, 1024000)          
				->addValidator('Extension', false, 'jpg,png,gif')
				->addFilter(new App_Filter_File_ImageResize(array(	'width' => 100,
    														  		'heigth' => 100)))
				->addDecorators(array(
										'File', 
										array('file' => 'HtmlTag', array('class' => 'input')),
										array('Label',array('class' => 'label1')),
										array('Errors',array('class' => 'errors')),
									))
					;

		$proprietor = new Zend_Form_Element_Text('proprietor');
		$proprietor	->setLabel('Proprietor/Owner:')
					->setDecorators($fieldDecorator)
					->setRequired(false)
					->addFilter('StripTags')
					->addFilter('StringTrim')
					;

		$visiting = new Zend_Form_Element('viziting');
		$visiting	->clearDecorators()
					->addDecorator(new Zend_Form_Decorator_Label())
					->setLabel('Visiting this Vineyard/Wineyard')
					;

		$visits = new Zend_Form_Element_Radio('visits', array('value' => 2));
		$visits	->setLabel('Welcomes Visits?')
				->setRequired(false)				
				->setDecorators($fieldDecorator)
				->addMultiOption(2, "Don't know")
				->addMultiOption(1, 'Yes')
				->addMultiOption(0, 'No')
				;

		$individuals = new Zend_Form_Element_Radio('individuals', array('value' => 2));
		$individuals->setLabel('From Individuals')
					->setRequired(false)				
					->setDecorators($fieldDecorator)
					->addMultiOption(2, "Don't know")
					->addMultiOption(1, 'Yes')
					->addMultiOption(0, 'No')
					;

		$groups = new Zend_Form_Element_Radio('groups', array('value' => 2));
		$groups	->setLabel('From Groups')
				->setRequired(false)				
				->setDecorators($fieldDecorator)
				->addMultiOption(2, "Don't know")
				->addMultiOption(1, 'Yes')
				->addMultiOption(0, 'No')
				;

		$appointment = new Zend_Form_Element_Radio('appointment', array('value' => 2));
		$appointment->setLabel('Need to make appointment')
					->setRequired(false)				
					->setDecorators($fieldDecorator)
					->addMultiOption(2, "Don't know")
					->addMultiOption(1, 'Yes')
					->addMultiOption(0, 'No')
					;

		$season = new Zend_Form_Element_Text("seasons");
		$season	//->setLabel('Season 1 Name:')
				->setAttrib('name',"season[name][]")
				->setDecorators($fieldDecorator)
//				->addDecorator('label', array('tag' => 'div'))
				->setRequired(false)
				->addFilter('StripTags')
				->addFilter('StringTrim')
				;

		$date = new Zend_Form_Element('date');
		$date	->clearDecorators()
				->addDecorator(new Zend_Form_Decorator_Label())
				->addDecorator('label', array('tag' => 'div', 'class' => 'date'))
				->setLabel('Season 1 Dates Date to date:')
				;

		$date1 = new Zend_Form_Element_Text('date1', array('jQueryParams' => array('dateFormat' => 'dd-mm-yy')) ); 
		$date1	//->setLabel('Date')
				->setAttrib('name',"season[date1][]")
				->setDecorators($fieldDecorator)
				//->addDecorator('label', array('tag' => 'div', 'class' => 'labelcalendar'))
				;
				
		$date2 = new Zend_Form_Element_Text('date2', array('jQueryParams' => array('dateFormat' => 'dd-mm-yy')) ); 
		$date2	//->setLabel('to date')
				->removeDecorator('HtmlTag')
				->setAttrib('name',"season[date2][]")
				->setDecorators($fieldDecorator)
				//->addDecorator('label', array('tag' => 'div', 'class' => 'labelcalendar'))
				;

		$week = new Zend_Form_Element_MultiCheckbox('weeks');
		$week	->setLabel('Days of Week:')
				->removeDecorator('HtmlTag')
				->addDecorator('label', array('tag' => 'div', 'class' => 'week'))
				->setRequired(false)
				->setAttrib('name',"season[weeks][]")
				->addMultiOption('Monday', 'Monday')
				->addMultiOption('Tuesday', 'Tuesday')
				->addMultiOption('Wednesday', 'Wednesday')
				->addMultiOption('Thursday', 'Thursday')
				->addMultiOption('Friday', 'Friday')
				->addMultiOption('Saturday', 'Saturday')
				->addMultiOption('Sunday', 'Sunday')
				;

		$time = new Zend_Form_Element('time');
		$time	->clearDecorators()
				->addDecorator(new Zend_Form_Decorator_Label())
				->setLabel('Season 1 Timings Time of Day:')
				->addDecorator('label', array('tag' => 'div', 'class' => 'times'))
				;

		$time1 = new Zend_Form_Element_Text('time1');
		$time1	//->setLabel('Time')
				->setAttrib('name',"season[time1][]")
//				->removeDecorator('HtmlTag')
				->setDecorators($fieldDecorator)
				->addFilter('StripTags')
				->addFilter('StringTrim')
				;		

		$time2 = new Zend_Form_Element_Text('time2');
		$time2	//->setLabel('to time')
				->setAttrib('name',"season[time2][]")
//				->removeDecorator('HtmlTag')
				->setDecorators($fieldDecorator)
				->setRequired(false)
				->addFilter('StripTags')
				->addFilter('StringTrim')
				;

		$notes = new Zend_Form_Element_Text('notes');
		$notes	->setLabel('Notes on data changes:')
				->removeDecorator('HtmlTag')
				->setAttrib('name',"season[notes][]")
				->addDecorator('label', array('tag' => 'div', 'class' => 'notes'))
				->setRequired(false)
				->addFilter('StripTags')
				->addFilter('StringTrim')
				;
 
		$spoken = new Zend_Form_Element_Select('spoken', array('value' => ''));          
		$spoken	->setLabel('Languages Spoken:')
				->setAttrib('name',"spoken[]")
				->setRegisterInArrayValidator(false)
				->setRequired(false)
				->setDecorators($fieldDecorator)
				;
		$languages = new Application_Model_Spokens();
		$spoken->addMultiOption('', "Don't know");
		foreach ($languages->getSpokens() as $language) {
			$spoken->addMultiOption($language->id, $language->name);
		}		  

		$tasting = new Zend_Form_Element_Select('tasting', array('value' => '3'));          
		$tasting->setLabel('Wine Tasting:')
				->setRequired(false)
				->setAttrib('name',"tasting")
				->setDecorators($fieldDecorator)
				->addMultiOption('3', "Don't know")
				->addMultiOption('0', 'free')
				->addMultiOption('1', 'charged')
				->addMultiOption('2', 'not available')
				;

		$tour = new Zend_Form_Element_Select('tour', array('value' => '3'));          
		$tour	->setLabel('Wine Tour:')
				->setRequired(false)
				->setAttrib('name',"tour")
				->setDecorators($fieldDecorator)
				->addMultiOption('3', "Don't know")
				->addMultiOption('0', 'free')
				->addMultiOption('1', 'charged')
				->addMultiOption('2', 'not available')
				;

		$sales = new Zend_Form_Element_Radio('sales', array('value' => 2));
		$sales	->setLabel('Wines Sales')
				->setRequired(false)
				->setAttrib('name',"sales")
				->setDecorators($fieldDecorator)
				->addMultiOption(2, "Don't know")
				->addMultiOption(1, 'Yes')
				->addMultiOption(0, 'No')
				;

		$workshops = new Zend_Form_Element_Radio('workshops', array('value' => 2));
		$workshops	->setLabel('Wine Workshops')
					->setRequired(false)
					->setAttrib('name',"workshops")
					->setDecorators($fieldDecorator)
					->addMultiOption(2, "Don't know")
					->addMultiOption(1, 'Yes')
					->addMultiOption(0, 'No')
					;

		$restaurant = new Zend_Form_Element_Radio('restaurant', array('value' => 2));
		$restaurant	->setLabel('Restaurant')
					->setRequired(false)				
					->setDecorators($fieldDecorator)
					->addMultiOption(2, "Don't know")
					->addMultiOption(1, 'Yes')
					->addMultiOption(0, 'No')
					;

		$accommodation = new Zend_Form_Element_Radio('accommodation', array('value' => 2));
		$accommodation	->setLabel('Accommodation Available On Site')
						->setRequired(false)				
						->setDecorators($fieldDecorator)
						->addMultiOption(2, "Don't know")
						->addMultiOption(1, 'Yes')
						->addMultiOption(0, 'No')
						;		

		$weddings = new Zend_Form_Element_Radio('weddings', array('value' => 2));
		$weddings	->setLabel('Weddings')
					->setRequired(false)				
					->setDecorators($fieldDecorator)
					->addMultiOption(2, "Don't know")
					->addMultiOption(1, 'Yes')
					->addMultiOption(0, 'No')
					;	

		$seminars = new Zend_Form_Element_Radio('seminars', array('value' => 2));
		$seminars	->setLabel('Corporate Seminars')
					->setRequired(false)				
					->setDecorators($fieldDecorator)
					->addMultiOption(2, "Don't know")
					->addMultiOption(1, 'Yes')
					->addMultiOption(0, 'No')
					;

		$photo = new Zend_Form_Element_File('photo');
		$photo	->setLabel('Add Pictures:')
				->setDestination(APPLICATION_PATH . '/data/uploads/vineyard/')
				->setRequired(false)
				->addValidator('Size', false, 1024000)          
				->addValidator('Extension', false, 'jpg,png,gif')
				->addFilter(new App_Filter_File_ImageResize(array('width' => 100,
    														  		'heigth' => 100)))
				->addDecorators(array(
										'File', 
										array('file' => 'HtmlTag', array('class' => 'input')),
										array('Label',array('class' => 'label1')),
										array('Errors',array('class' => 'errors')),
									))

				;

		$grapes = new Zend_Form_Element_Select('grapes', array('value' => ''));          
		$grapes->setLabel('Grapes Grown:')
				->setRequired(false)
				->setAttrib('name',"grapes[]")
				->setRegisterInArrayValidator(false)
				->setDecorators(array(
								'ViewHelper',
								array('input' => 'HtmlTag', array('tag' => 'p')),
							))
				;
		$grape = new Application_Model_Grapes();
		$grapes->addMultiOption('', "Don't know");
		foreach ($grape->fetchAll($grape->select()->order('name ASC')) as $grap) {
			$grapes->addMultiOption($grap->id, $grap->name);
		}

		$name_w = new Zend_Form_Element_Text('name_w');
		$name_w	->setLabel('Wine Name')
				->setAttrib('name', 'wines[name][]')
					->addFilter('StripTags')
					->addFilter('StringTrim')
					->addValidator('NotEmpty')
					->setDecorators($fieldDecorator)
					;

		$grapes_w = new Zend_Form_Element_Select('grapes_w', array('value' => ''));          
		$grapes_w->setLabel('Grapes:')
				->setAttrib('name', 'wines[grapes][0][]')
				->setRequired(false)
				->setRegisterInArrayValidator(false)
				->setDecorators(array(
								'ViewHelper',
								array('input' => 'HtmlTag', array('tag' => 'p')),
							))
				;
		$grape_w = new Application_Model_Grapes();
		$grapes_w->addMultiOption('', "Don't know");
		foreach ($grape_w->fetchAll($grape_w->select()->order('name ASC')) as $grap_w) {
			$grapes_w->addMultiOption($grap_w->id, $grap_w->name);
		}
		
		$vintage_w = new Zend_Form_Element_Select('vintage_w');
		$vintage_w->setLabel('Vintage')
				->setAttrib('name', 'wines[vintage][0]')
				->setDecorators($fieldDecorator)
				;
		$vintage_w->addMultiOption('', 'Don`t now');
		for($i = 1900; $i <= date('Y'); $i++) {
			$vintage_w->addMultiOption($i, $i);
		}		
		
		$notes_chang = new Zend_Form_Element_Textarea('notes_chang');
		$notes_chang	->setLabel('Notes on data changes:')
				->setAttrib('rows', 15)
				->setDecorators($fieldDecorator)
				;	
		
		$submit = new Zend_Form_Element_Submit('add');
		$submit	->setLabel('Send Information')
				->setDecorators($fieldDecorator)
				->setAttrib('class', 'redSubmitBg')
				->removeDecorator('Label')
				;
		
		$this->addElements(array(
									$name, $nameloc, $owner, $address1, $address2, $city, 
									$region, $zip, $country, $continent, $ass_region, $telephone, 
									$fax, $email, $web, $loc_y, $loc_z, $region, $logo, 
									$proprietor, $visiting, $visits, $individuals, 
									$groups, $appointment, $season, $date, 
									$date1, $date2, $week, $time, $time1, $time2, 
									$notes, $spoken, $tasting, $tour, $sales, 
									$workshops, $restaurant,  $accommodation, $weddings, 
									$seminars, $photo, $grapes, $name_w, $grapes_w, $vintage_w, 
									$notes_chang, $submit, $country_code, $city_code
								)
							);
		$this->setMethod('post');
	}
}