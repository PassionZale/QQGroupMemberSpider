SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `group_info`
-- ----------------------------
DROP TABLE IF EXISTS `group_info`;
CREATE TABLE `group_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_number` int(20) NOT NULL COMMENT 'QQ群号码',
  `group_name` varchar(100) CHARACTER SET utf8mb4 NOT NULL COMMENT 'QQ群名字',
  `created_at` datetime NOT NULL COMMENT '数据插入时间',
  `updated_at` datetime NOT NULL COMMENT '最后更新时间',
  `update_times` int(11) NOT NULL DEFAULT '0' COMMENT '更新次数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
