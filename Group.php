<?php

defined('BASEPATH') OR exit('No direct script access allowed');
// chrome extension backend API
// use codeigniter, see http://codeigniter.org.cn/user_guide/
class Group extends CI_Controller {

	public function __construct() {
		parent::__construct();
	}

	public function index(){
		$groupHead = $this->input->post('groupHead');
		$groupMember = $this->input->post('groupMember');
		$groupList = $this->input->post('groupList');
		$group_query = array(
				'group_name' => $groupHead['group_name'],
				'group_number' => $groupHead['group_number'],
				'created_at' => date('Y-m-d H:i:s'),
				'updated_at' => date('Y-m-d H:i:s'),
				);

		$query = $this->db->where('group_number',$groupHead['group_number'])->get('group_info');
		if($query->num_rows() == 0){
			$this->db->insert('group_info',$group_query);
			$group_id = $this->db->insert_id();
		}else{
			$group = $query->row_array();
			$group_id = $group['id'];
			$group_query = array(
					'group_name' => $groupHead['group_name'],
					'updated_at' => date('Y-m-d H:i:s'),
					);
			$this->db->where('id',$group_id)->update('group_info',$group_query);
		}
		// 更新数+1
		$this->db->set('update_times','update_times+1',FALSE);
		$this->db->where('id',$group_id);
		$this->db->update('group_info');

		foreach($groupList as $member){
			$member_query = array(
					'group_id' => $group_id,
					'member_avatar' => $member['member_avatar'],
					'member_name' => $member['member_name'],
					'member_number' => $member['member_number'],
					'member_role' => $member['member_role'],
					'created_at' => date('Y-m-d H:i:s'),
					'updated_at' => date('Y-m-d H:i:s'),
					);
			$query = $this->db->where('member_number',$member['member_number'])
				->where('group_id',$group_id)->get('group_member');
			if($query->num_rows() == 0){
				$this->db->insert('group_member',$member_query);
			}else{
				$member_query = array(
						'member_avatar' => $member['member_avatar'],
						'member_name' => $member['member_name'],
						'member_role' => $member['member_role'],
						'updated_at' => date('Y-m-d H:i:s'),
						);
				$member = $query->row_array();
				$member_id = $member['id'];
				$this->db->where('id',$member_id)->update('group_member',$member_query);
			}

		}

		echo 'success';
	}

}
