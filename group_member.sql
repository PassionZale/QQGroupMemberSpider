SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `group_member`
-- ----------------------------
DROP TABLE IF EXISTS `group_member`;
CREATE TABLE `group_member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` varchar(20) CHARACTER SET utf8 NOT NULL COMMENT 'group_info主键',
  `member_avatar` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT 'QQ头像',
  `member_name` varchar(255) CHARACTER SET utf8mb4 NOT NULL COMMENT 'QQ昵称',
  `member_number` varchar(20) CHARACTER SET utf8 NOT NULL COMMENT 'QQ号码',
  `member_role` enum('群主','管理员','') CHARACTER SET utf8 DEFAULT NULL COMMENT '角色',
  `created_at` datetime NOT NULL COMMENT '数据插入时间',
  `updated_at` datetime NOT NULL COMMENT '最后更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
