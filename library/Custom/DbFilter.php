<?php
	class Custom_DbFilter extends Zend_Db_Table_Abstract
	{
		protected $_query;
		
		public function __construct($config = array()) {
			parent::__construct($config);
			$this->_query = $this->select();
		}
		
		protected function _getAll()
		{
			$res =  $this->fetchAll($this->_query);
			$this->_query = $this->select();
			return $res;
		}
		
		protected function _getRow()
		{
			$res =  $this->fetchRow($this->_query);
			$this->_query = $this->select();
			return $res;
		}		
	}