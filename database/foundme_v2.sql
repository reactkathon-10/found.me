/*
SQLyog Ultimate v10.42 
MySQL - 5.5.5-10.1.16-MariaDB : Database - flyteam
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`flyteam` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;

USE `flyteam`;

/*Table structure for table `tasks` */

DROP TABLE IF EXISTS `tasks`;

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task` varchar(200) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

/*Data for the table `tasks` */

insert  into `tasks`(`id`,`task`,`status`,`created_at`) values (1,'Find bugs',1,'2016-04-10 23:50:40'),(2,'Review code',1,'2016-04-10 23:50:40'),(3,'Fix bugs',1,'2016-04-10 23:50:40'),(4,'Refactor Code',1,'2016-04-10 23:50:40'),(5,'Push to prod',1,'2016-04-10 23:50:50');

/*Table structure for table `token` */

DROP TABLE IF EXISTS `token`;

CREATE TABLE `token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `token` varchar(16) COLLATE utf8_unicode_ci NOT NULL,
  `crt_date` datetime NOT NULL,
  `exp_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `token` */

insert  into `token`(`id`,`user_id`,`token`,`crt_date`,`exp_date`) values (1,222,'2','2016-12-17 20:55:43','2017-02-02 20:55:47'),(2,27,'043113feb61b2a2e','2016-12-17 15:44:44','2017-01-17 15:44:44'),(3,27,'043113feb61b2a2e','2016-12-17 15:45:49','2017-01-17 15:45:49'),(4,27,'043113feb61b2a2e','2016-12-17 15:46:12','2017-01-17 15:46:12'),(5,27,'eb6e0366c1cc5b57','2016-12-17 15:47:29','2017-01-17 15:47:29'),(6,27,'f754dc3bd3183ecf','2016-12-17 15:47:33','2017-01-17 15:47:33'),(7,27,'eff4617e19e280b9','2016-12-17 15:50:23','2017-01-17 15:50:23'),(8,27,'d9769d30f86decb3','2016-12-17 15:53:21','2017-01-17 15:53:21');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_code` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_name` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `full_name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `avatar` varchar(300) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `user` */

insert  into `user`(`id`,`user_code`,`user_name`,`password`,`email`,`full_name`,`address`,`phone`,`avatar`) values (26,'48319f611cba472e2b43fe70673e01c8','thuan','202cb962ac59075b964b07152d234b70','thuan@gmail.com','ee','',NULL,NULL),(27,'0c53f61c60261524db09d51db121e35a','viennp','202cb962ac59075b964b07152d234b70','vienpham202@gmail.com','ngoc vien','quang ngai, binh son','0978222111','http://eva-img.24hstatic.com/upload/2-2016/images/2016-06-07/iftm4dqr8hxexiu-1465294191-width480height581.jpg'),(28,'305d9871ed3eacf393cf9f131ab11628','viennp','202cb962ac59075b964b07152d234b70','vienpham202@gmail.com','ngoc vien','',NULL,NULL),(29,'d9423f2093fa754baf628da54ab801d1','viennp','202cb962ac59075b964b07152d234b70','vienpham202@gmail.com','ngoc vien','',NULL,NULL),(30,'396858bb156076e8e70f262c3d9d11e2','viennp','202cb962ac59075b964b07152d234b70','vienpham202@gmail.com','ngoc vien','',NULL,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
