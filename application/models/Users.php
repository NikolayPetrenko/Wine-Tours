<?php
class Application_Model_Users extends Zend_Db_Table_Abstract 
{
	protected $_name = 'users';
	
	public function getUser($id)
	{
		$id = (int)$id;
		$row = $this->fetchRow('id = ' . $id);
		if (!$row) {
			throw new Exception("Count not find row $id");
		}
		return $row->toArray();
	}

	public function getUserStatus($email)
	{
		$res = $this	->select()
					->from($this->_name)
					->where('email = ?', $email)
					->where('status = ?', '1')
					;
		if($this->fetchRow($res)) {
			return TRUE;
		} else {
			return FALSE;
		}
	}
	
	public function getUserById($id)
	{
		$res = $this	->select()
					->from($this->_name)
					->where('id = ?', $id)
					;
		return $this->fetchRow($res);
	}

	public function getAdmins()
	{
		$res = $this->select()
					->from($this->_name)
					->where('remove = ?', 0)
					->where('role = ?', 'admin')
					;
		return $this->fetchAll($res);
	}
	
	public function getUsers()
	{
		$res = $this->select()
					->from($this->_name)
					->where('remove = ?', 0)
					->where('id != ?', 1)
					;
		return $this->fetchAll($res);
	}

	public function updateUserStatus($reg_id)
	{
		$data = array('status' => 1);
		$where['reg_id = ?'] = (int)$reg_id;
		$where['status = ?'] = 0;
		if($this->update($data, $where) == TRUE) {
			return TRUE;
		}
	}

	public function isPassword($reg_id)
	{
		$reg_id = (int)$reg_id;
		$res = $this->select()
					->from($this->_name)
					->where('reg_id = ?', $reg_id)
					->where('password != ?', '')
					;
		if($this->fetchRow($res)) {
			return true;
		} else {
			return false;
		}
	}

	public function addUser($name, $email, $avatar, $firstname, $surname, $password, $company, $country, $zone, $reg_id, $email_update, $email_ofers, $involves)
	{
		$data = array(
						'name'			=> $name,
						'email'			=> $email,
						'avatar'		=> $avatar, 
						'firstname'		=> $firstname, 
						'surname'		=> $surname, 
						'password'		=> $password, 
						'company'		=> $company, 
						'country'		=> $country, 
						'zone'			=> $zone,
						'reg_id'		=> $reg_id,
						'status'		=> 0,
						'email_update'	=> $email_update,
						'email_ofers'	=> $email_ofers,
						'involve'		=> $involves,
						'role'			=> 'user', 
						'remove'		=> 0
					);
		$this->insert($data);
	}

	public function newUser($name, $firstname, $email, $reg_id, $status, $role)
	{
		$data = array(
						'name'		=> $name, 
						'firstname'	=> $firstname, 
						'email'		=> $email, 
						'reg_id'	=> $reg_id, 
						'status'	=> $status, 
						'role'		=> $role
						
					);
		$this->insert($data);
	}		

	public function deleteUser($id)
	{
		$data = array('remove' => 1);
		$this->update($data, 'id =' . (int)$id);
	}

	public function updatePassword($reg_id, $password)
	{
		$data = array(
					'password'	=> $password, 
					'status'	=> 1
				);
		$where['reg_id = ?'] = (int)$reg_id;
		$where['status = ?'] = 0;
		$this->update($data, $where);
	}

	public function resetPassword($id, $password)
	{
		$data = array('password' => $password);
		$this->update($data, 'id = ' . (int)$id);
	}

	public function updateUser($id, $user_name, $user_firstname, $user_email)
	{
		$data = array(
						'name'		=> $user_name,
						'firstname'	=> $user_firstname,
						'email'		=> $user_email,
					);
		$this->update($data, 'id = '. (int)$id);
	}
	
	public function updateProfileUser($id, $user_name, $user_firstname, $user_surname, $user_email, $company, $image, $country, $zone, $email_update, $email_ofers, $invlove)
	{
		$data = array(
						'name'		=> $user_name,
						'firstname'	=> $user_firstname,
						'surname'	=> $user_surname, 
						'email'		=> $user_email,
						'company'	=> $company, 
						'avatar'	=> $image, 
						'country'	=> $country, 
						'zone'		=> $zone, 
						'email_update'	=> $email_update, 
						'email_ofers'	=> $email_ofers, 
						'involve'	=> $invlove
					);

		$this->update($data, 'id = '. (int)$id);
	}
	
	public function updateProfile($id, $user_name, $user_firstname, $user_surname, $user_email, $company, $image, $country, $zone, $email_update, $email_ofers, $invlove, $status, $role)
	{
		$data = array(
						'name'		=> $user_name,
						'firstname'	=> $user_firstname,
						'surname'	=> $user_surname, 
						'email'		=> $user_email,
						'company'	=> $company, 
						'avatar'	=> $image, 
						'country'	=> $country, 
						'zone'		=> $zone, 
						'email_update'	=> $email_update, 
						'email_ofers'	=> $email_ofers, 
						'involve'	=> $invlove, 
						'status'        => $status, 
						'role'		=> $role
					);

		$this->update($data, 'id = '. (int)$id);
	}
	
	public function getUserByEmail($email)
	{
		$res = $this->select()
					->from($this->_name)
					->where('email = ?', $email)
					;
		return $this->fetchRow($res);
	}
}	