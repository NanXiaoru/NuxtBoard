/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50728
 Source Host           : localhost:3306
 Source Schema         : board

 Target Server Type    : MySQL
 Target Server Version : 50728
 File Encoding         : 65001

 Date: 22/04/2021 22:09:10
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for boardmsg
-- ----------------------------
DROP TABLE IF EXISTS `boardmsg`;
CREATE TABLE `boardmsg` (
  `lid` bigint(255) NOT NULL AUTO_INCREMENT,
  `uid` bigint(255) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `userImg` varchar(255) NOT NULL DEFAULT 'http://127.0.0.1:2345/images/userImgs/defaultImg.png',
  `msg` text,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`lid`),
  KEY `boardmsg_ibfk_1` (`uid`,`userName`,`userImg`),
  CONSTRAINT `boardmsg_ibfk_1` FOREIGN KEY (`uid`, `userName`, `userImg`) REFERENCES `users` (`uid`, `userName`, `userImg`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of boardmsg
-- ----------------------------
BEGIN;
INSERT INTO `boardmsg` VALUES (1, 2, '欧皇网友', 'http://127.0.0.1:2345/images/userImgs/hutao.jpg', '哇哈哈，一发就抽中了胡桃，吾真乃欧皇也！', '2021-03-12 00:05:59');
INSERT INTO `boardmsg` VALUES (2, 1, '南小濡', 'http://127.0.0.1:2345/images/userImgs/nanxiaoru.jpg', '楼上的，给爷死', '2021-03-12 00:09:57');
INSERT INTO `boardmsg` VALUES (3, 1, '南小濡', 'http://127.0.0.1:2345/images/userImgs/nanxiaoru.jpg', '爷十连抽六命胡桃精3护摩，就问你酸不酸，哈哈哈哈哈哈.........', '2021-03-12 00:11:53');
INSERT INTO `boardmsg` VALUES (4, 5, '邻居老王', 'http://127.0.0.1:2345/images/userImgs/upload_0cac6d021aa99872f3836ba4d8c6317c.jpg', '你们在说啥？', '2021-03-12 19:34:10');
INSERT INTO `boardmsg` VALUES (6, 3, '热心网友小黑', 'http://127.0.0.1:2345/images/userImgs/defaultImg.png', '大家好，欢迎收看大型悬疑电视剧《消失的5楼》，我是主持人，神秘小黑', '2021-03-12 19:36:10');
INSERT INTO `boardmsg` VALUES (7, 7, 'admin', 'http://127.0.0.1:2345/images/userImgs/defaultImg.png', '123456', '2021-04-21 19:18:48');
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `uid` bigint(255) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) NOT NULL,
  `userPwd` varchar(255) DEFAULT NULL,
  `userPhone` varchar(13) DEFAULT NULL,
  `userImg` varchar(255) NOT NULL DEFAULT 'http://127.0.0.1:2345/images/userImgs/defaultImg.png',
  `CSRF` text,
  `CSRF_TOKEN` text,
  `SESSDATE` text,
  `expirationTime` varchar(255) DEFAULT NULL COMMENT '凭证过期时间',
  PRIMARY KEY (`uid`,`userName`,`userImg`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` VALUES (1, '南小濡', 'mb+BtX7KRTh/0OXL3e55tw==', '13935200318', 'http://127.0.0.1:2345/images/userImgs/nanxiaoru.jpg', '283e7b3081b111ebbbb961a275368264', '283e7b3081b111ebbbb961a275368264', 'eyJhbGciOiJIUzI1NiJ9.MjgzZTdiMzA4MWIxMTFlYmJiYjk2MWEyNzUzNjgyNjQx.tPPMfHgOJojfcJuLSKGVHVhNw4jpwgN0dwxLqXPDRlI', NULL);
INSERT INTO `users` VALUES (2, '欧皇网友', 'rgzHoetrYR6DY6fHvuyWTA==', '13935210318', 'http://127.0.0.1:2345/images/userImgs/hutao.jpg', 'e58698c0827511eb9ca44dd7cfc69c0c', 'e58698c0827511eb9ca44dd7cfc69c0c', 'eyJhbGciOiJIUzI1NiJ9.ZTU4Njk4YzA4Mjc1MTFlYjljYTQ0ZGQ3Y2ZjNjljMGMy.fFDJxmmPqlnEBMAy4VXYWF56v-WXQvJx7Fm5BaE_qCo', NULL);
INSERT INTO `users` VALUES (3, '热心网友小黑', 'mb+BtX7KRTh/0OXL3e55tw==', '13935220318', 'http://127.0.0.1:2345/images/userImgs/defaultImg.png', '04b5d240832711eb8d62972b715465b8', '04b5d240832711eb8d62972b715465b8', 'eyJhbGciOiJIUzI1NiJ9.MDRiNWQyNDA4MzI3MTFlYjhkNjI5NzJiNzE1NDY1Yjgz.RoeFGeYiy77bXhYyX5LeEh-KV6I-wc-bdg7Z5an5TrA', NULL);
INSERT INTO `users` VALUES (4, '热心网友小白', 'mb+BtX7KRTh/0OXL3e55tw==', '13935230318', 'http://127.0.0.1:2345/images/userImgs/upload_1c515082109efc4417a014058eeaeec7.png', '33301280832111eb8d62972b715465b8', '33301280832111eb8d62972b715465b8', 'eyJhbGciOiJIUzI1NiJ9.MzMzMDEyODA4MzIxMTFlYjhkNjI5NzJiNzE1NDY1Yjg0.LBQkiaV9UqG5w5uqtX3Ku4p2_b_yoO82hbZOWi44nmQ', NULL);
INSERT INTO `users` VALUES (5, '邻居老王', 'mb+BtX7KRTh/0OXL3e55tw==', '13935240318', 'http://127.0.0.1:2345/images/userImgs/upload_0cac6d021aa99872f3836ba4d8c6317c.jpg', 'b0b84d80832111eb8d62972b715465b8', 'b0b84d80832111eb8d62972b715465b8', 'eyJhbGciOiJIUzI1NiJ9.YjBiODRkODA4MzIxMTFlYjhkNjI5NzJiNzE1NDY1Yjg1.wWNgjD27RHtJPTl28YIMM8QPgYxKF0_PrstRgWZB9jg', NULL);
INSERT INTO `users` VALUES (6, '超级管理员', 'bShJ94hpKq+QXWu0uE1GuQ==', '13935250318', 'http://127.0.0.1:2345/images/userImgs/defaultImg.png', NULL, NULL, NULL, NULL);
INSERT INTO `users` VALUES (7, 'admin', '4gTmy9G9UXrOFWgPttqvDg==', '19566668888', 'http://127.0.0.1:2345/images/userImgs/defaultImg.png', '10cb1910a29311eb869ef706e8a650f9', '10cb1910a29311eb869ef706e8a650f9', 'eyJhbGciOiJIUzI1NiJ9.MTBjYjE5MTBhMjkzMTFlYjg2OWVmNzA2ZThhNjUwZjk3.hsVcqIJMBgF18YQrJKlz3ZA3SdfJWu7dnT9yyPyb2A4', NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
