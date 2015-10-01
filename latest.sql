CREATE DATABASE  IF NOT EXISTS `osiplanner` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `osiplanner`;
-- MySQL dump 10.13  Distrib 5.6.17, for Win64 (x86_64)
--
-- Host: 10.10.10.36    Database: osiplanner
-- ------------------------------------------------------
-- Server version	5.5.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `executiveteams`
--

DROP TABLE IF EXISTS `executiveteams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `executiveteams` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `teamid` int(11) NOT NULL,
  `createdby` int(11) DEFAULT NULL,
  `createddate` date NOT NULL,
  `editdate` date DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `teamid` (`teamid`),
  KEY `userid` (`userid`),
  KEY `createdby` (`createdby`),
  CONSTRAINT `executiveteams_ibfk_3` FOREIGN KEY (`userid`) REFERENCES `users` (`id`),
  CONSTRAINT `executiveteams_ibfk_1` FOREIGN KEY (`teamid`) REFERENCES `team` (`id`),
  CONSTRAINT `executiveteams_ibfk_2` FOREIGN KEY (`createdby`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `executiveteams`
--

LOCK TABLES `executiveteams` WRITE;
/*!40000 ALTER TABLE `executiveteams` DISABLE KEYS */;
/*!40000 ALTER TABLE `executiveteams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iteration`
--

DROP TABLE IF EXISTS `iteration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `iteration` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` int(20) NOT NULL,
  `description` varchar(256) DEFAULT NULL,
  `startdate` date DEFAULT NULL,
  `enddate` date DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `createddate` datetime NOT NULL,
  `editdate` datetime DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `createdby` (`createdby`),
  CONSTRAINT `iteration_ibfk_1` FOREIGN KEY (`createdby`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iteration`
--

LOCK TABLES `iteration` WRITE;
/*!40000 ALTER TABLE `iteration` DISABLE KEYS */;
INSERT INTO `iteration` VALUES (1,1518,NULL,'2015-09-23','2015-10-06',1,'2015-09-23 17:21:50',NULL,1),(2,1517,NULL,'2015-09-09','2015-09-22',1,'2015-09-23 17:22:06',NULL,1),(3,1519,NULL,'2015-10-07','2015-10-20',1,'2015-09-29 12:36:42',NULL,1);
/*!40000 ALTER TABLE `iteration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loghistory`
--

DROP TABLE IF EXISTS `loghistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loghistory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `logid` int(11) NOT NULL,
  `projectid` int(11) DEFAULT NULL,
  `iteration` int(20) DEFAULT NULL,
  `story` int(11) DEFAULT NULL,
  `task` int(11) DEFAULT NULL,
  `storystatus` int(11) DEFAULT NULL,
  `plannedstartdate` datetime DEFAULT NULL,
  `plannedenddate` datetime DEFAULT NULL,
  `startdate` datetime DEFAULT NULL,
  `enddate` datetime DEFAULT NULL,
  `teamid` int(11) DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  `loggeduser` int(11) DEFAULT NULL,
  `description` varchar(256) DEFAULT NULL,
  `createddate` datetime DEFAULT NULL,
  `editdate` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loghistory`
--

LOCK TABLES `loghistory` WRITE;
/*!40000 ALTER TABLE `loghistory` DISABLE KEYS */;
INSERT INTO `loghistory` VALUES (1,1,211,NULL,NULL,NULL,NULL,'2015-09-22 16:25:00','2015-09-22 17:25:00','2015-09-22 16:25:00','2015-09-22 17:25:00',1,13,13,'testing','2015-09-22 17:31:38','2015-09-22 17:44:41',2),(2,2,243,NULL,NULL,NULL,NULL,'2015-09-22 12:30:00','2015-09-22 13:00:00','2015-09-22 12:30:00','2015-09-22 13:00:00',1,13,13,'Discusssion on sprint 0 changes','2015-09-22 17:50:41','2015-09-22 17:50:54',2),(3,3,244,NULL,NULL,NULL,NULL,'2015-09-22 12:00:00','2015-09-22 12:30:00','2015-09-22 12:00:00','2015-09-22 12:30:00',1,13,13,'Discusssion on sprint 1 changes','2015-09-22 17:51:27','2015-09-22 17:51:35',2),(4,4,245,NULL,NULL,NULL,NULL,'2015-09-22 15:00:00','2015-09-22 16:00:00','2015-09-22 15:00:00','2015-09-22 16:00:00',1,13,13,'Team meeting with shashi','2015-09-22 17:52:40','2015-09-22 17:52:46',2),(5,7,244,NULL,NULL,NULL,NULL,'2015-09-22 11:00:00','2015-09-22 20:00:00','2015-09-22 11:00:00','2015-09-22 20:00:00',1,61,61,'Working on the Jquery mobile Task and Looking into angularjs concepts','2015-09-22 19:22:57','2015-09-22 19:23:08',2),(6,6,244,NULL,NULL,NULL,NULL,'2015-09-22 10:00:00','2015-09-22 19:00:00','2015-09-22 10:00:00','2015-09-22 19:30:00',1,121,121,'Analyzing project','2015-09-22 18:27:16','2015-09-23 09:49:58',2),(7,5,243,NULL,NULL,NULL,NULL,'2015-09-22 15:00:00','2015-09-22 18:30:00','2015-09-22 15:00:00','2015-09-22 19:00:00',1,41,41,'working on screens','2015-09-22 18:27:02','2015-09-23 10:55:44',2),(8,11,243,NULL,NULL,NULL,NULL,'2015-09-23 11:41:00','2015-09-23 15:00:00','2015-09-23 11:41:00','2015-09-23 15:00:00',1,13,13,'Working on task creation from sprint 2.','2015-09-23 14:48:28','2015-09-23 14:48:40',2),(9,12,151,NULL,NULL,NULL,NULL,'2015-09-23 12:00:00','2015-09-23 12:15:00','2015-09-23 12:00:00','2015-09-23 12:15:00',1,13,13,'BDNA/ASET UX resource allocation meeting','2015-09-23 14:49:38','2015-09-23 14:49:46',2),(10,13,243,NULL,NULL,NULL,NULL,'2015-09-23 10:00:00','2015-09-23 12:00:00','2015-09-23 10:00:00','2015-09-23 12:00:00',1,61,61,'POC Jquery Mobile','2015-09-23 15:54:03','2015-09-23 15:54:21',2),(11,14,250,NULL,NULL,NULL,NULL,'2015-09-23 12:00:00','2015-09-23 12:30:00','2015-09-23 12:00:00','2015-09-23 22:00:00',1,61,61,'CDS Meeting','2015-09-23 15:54:46','2015-09-23 15:55:00',2),(12,15,250,NULL,NULL,NULL,NULL,'2015-09-23 14:30:00','2015-09-23 16:00:00','2015-09-23 14:30:00','2015-09-23 15:49:00',1,61,61,' CDS Code walk through ','2015-09-23 15:55:35','2015-09-23 15:55:45',2),(13,16,250,NULL,NULL,NULL,NULL,'2015-09-23 15:49:00','2015-09-23 19:00:00','2015-09-23 15:49:00','2015-09-23 19:31:00',1,61,61,'CDS project Setup and Analysis of Code','2015-09-23 15:56:45','2015-09-23 19:37:35',2),(14,9,243,NULL,NULL,NULL,NULL,'2015-09-23 10:15:00','2015-09-23 15:00:00','2015-09-23 10:15:00','2015-09-23 17:00:00',1,41,41,'Working on configurations and maufactures page','2015-09-23 10:56:26','2015-09-24 10:36:59',2),(15,8,244,NULL,NULL,NULL,NULL,'2015-09-23 09:30:00','2015-09-23 19:00:00','2015-09-23 09:30:00','2015-09-23 18:45:00',1,121,121,'Working on Jquery mobile task','2015-09-23 09:51:22','2015-09-24 10:40:45',2),(16,24,246,NULL,NULL,NULL,NULL,'2015-09-24 10:00:00','2015-09-24 19:00:00','2015-09-24 10:00:00','2015-09-24 18:00:00',1,61,61,'Nisum Adding another page','2015-09-24 11:31:02','2015-09-24 19:01:51',2),(17,21,244,NULL,NULL,NULL,NULL,'2015-09-24 09:30:00','2015-09-24 18:30:00','2015-09-24 09:30:00','2015-09-24 18:30:00',1,121,121,'Working on jQuery mobile tasks','2015-09-24 10:42:11','2015-09-28 11:04:53',2),(18,20,243,1,1,NULL,3,'2015-09-24 11:00:00','2015-09-24 17:00:00','2015-09-24 11:00:00','2015-09-24 19:00:00',1,41,41,'manufacturer screen functionality','2015-09-24 10:38:31','2015-09-28 12:49:39',2),(19,36,243,NULL,NULL,NULL,NULL,'2015-09-28 12:18:00','2015-09-28 13:18:00','2015-09-28 12:19:00','2015-09-28 13:19:00',1,13,13,'Discussion with team on requirements','2015-09-28 13:25:31','2015-09-28 13:25:35',2),(20,37,243,NULL,NULL,NULL,NULL,'2015-09-24 11:19:00','2015-09-24 12:19:00','2015-09-24 11:19:00','2015-09-24 12:19:00',1,13,13,'Discussion with team on requirements','2015-09-28 13:28:00','2015-09-28 13:28:13',2),(21,32,171,NULL,NULL,NULL,NULL,'2015-09-24 10:00:00','2015-09-24 19:00:00','2015-09-24 10:00:00','2015-09-24 19:00:00',1,31,31,'','2015-09-28 12:27:37','2015-09-28 14:27:36',2),(22,33,236,NULL,NULL,NULL,NULL,'2015-09-25 10:00:00','2015-09-25 19:00:00','2015-09-25 10:00:00','2015-09-25 19:00:00',1,31,31,'','2015-09-28 12:27:53','2015-09-28 14:27:51',2),(23,39,250,1,5,4,3,'2015-09-28 10:02:00','2015-09-28 19:02:00','2015-09-28 10:02:00','2015-09-28 19:02:00',1,81,81,'Started developing on code post loads script','2015-09-28 19:09:10','2015-09-28 19:09:31',2),(24,40,251,1,11,NULL,12,'2015-09-28 11:00:00','2015-09-28 13:00:00','2015-09-28 11:00:00','2015-09-28 13:00:00',1,31,31,'Did analysis to identify the root cause from where the warning message is getting displayed on the paged.','2015-09-28 19:28:39','2015-09-28 19:28:51',2),(25,41,251,1,12,NULL,4,'2015-09-28 14:00:00','2015-09-28 18:00:00','2015-09-28 14:00:00','2015-09-28 18:00:00',1,31,31,'Macy\'s UI build failure because of wrong Backbone JS version number','2015-09-28 19:31:43','2015-09-28 19:31:55',2),(26,31,244,NULL,NULL,NULL,NULL,'2015-09-28 10:00:00','2015-09-28 19:00:00','2015-09-28 10:00:00','2015-09-28 19:00:00',1,121,121,'Working on login screen','2015-09-28 11:05:24','2015-09-29 10:35:00',2),(27,49,249,1,14,NULL,12,'2015-09-28 18:00:00','2015-09-28 19:00:00','2015-09-28 18:00:00','2015-09-28 19:00:00',1,31,31,'Identifying the root cause','2015-09-29 11:32:56','2015-09-29 11:33:06',2),(28,53,249,NULL,NULL,NULL,NULL,'2015-09-28 13:42:00','2015-09-28 14:42:00','2015-09-28 13:43:00','2015-09-28 14:43:00',1,13,13,'Discussions on project status','2015-09-29 11:49:29','2015-09-29 11:49:40',2),(29,54,243,NULL,NULL,NULL,NULL,'2015-09-29 11:43:00','2015-09-29 12:43:00','2015-09-29 11:43:00','2015-09-29 12:43:00',1,13,13,'Project status/requirement discussion','2015-09-29 11:50:08','2015-09-29 11:50:16',2),(30,55,252,NULL,NULL,NULL,NULL,'2015-09-29 10:00:00','2015-09-29 11:23:00','2015-09-29 10:00:00','2015-09-29 11:23:00',1,61,61,'Learning AngularJs','2015-09-29 14:20:44','2015-09-29 14:22:42',2),(31,56,251,NULL,NULL,NULL,NULL,'2015-09-29 11:30:00','2015-09-29 13:00:00','2015-09-29 11:30:00','2015-09-29 12:30:00',1,61,61,'Live Chat window issue - IMP','2015-09-29 14:21:09','2015-09-29 14:22:55',2),(32,58,171,NULL,NULL,NULL,NULL,'2015-09-28 10:00:00','2015-09-28 19:00:00','2015-09-28 10:00:00','2015-09-28 19:00:00',1,61,61,'','2015-09-29 14:23:31','2015-09-29 14:24:10',2),(33,60,249,1,14,NULL,12,'2015-09-29 11:00:00','2015-09-29 14:00:00','2015-09-29 11:00:00','2015-09-29 14:00:00',1,31,31,'There is an issue with configuration of the JSPs.','2015-09-29 17:02:06','2015-09-29 17:03:10',2),(34,63,249,1,16,NULL,3,'2015-09-29 16:00:00','2015-09-29 18:00:00','2015-09-29 16:00:00','2015-09-29 18:00:00',1,31,31,'Accordion with inner accordion','2015-09-29 19:48:49','2015-09-29 19:49:03',2),(35,57,251,NULL,NULL,NULL,NULL,'2015-09-29 14:00:00','2015-09-29 17:00:00','2015-09-29 14:00:00','2015-09-29 19:30:00',1,61,61,'Working HandlebarJs Version 3.0','2015-09-29 14:22:29','2015-09-29 19:55:36',2),(36,44,244,NULL,NULL,NULL,NULL,'2015-09-29 09:45:00','2015-09-29 18:45:00','2015-09-29 09:45:00','2015-09-29 20:00:00',1,121,121,'Working on screens\n','2015-09-29 10:36:19','2015-09-30 10:15:42',2),(37,35,243,1,6,NULL,3,'2015-09-28 10:30:00','2015-09-28 19:00:00','2015-09-28 10:30:00','2015-09-28 19:40:00',1,41,41,'working on product list functionality','2015-09-28 12:51:39','2015-09-30 11:47:28',2);
/*!40000 ALTER TABLE `loghistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logs`
--

DROP TABLE IF EXISTS `logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `projectid` int(11) NOT NULL,
  `iteration` int(20) DEFAULT NULL,
  `story` int(11) DEFAULT NULL,
  `task` int(11) DEFAULT NULL,
  `storystatus` int(11) DEFAULT NULL,
  `plannedstartdate` datetime DEFAULT NULL,
  `plannedenddate` datetime DEFAULT NULL,
  `startdate` datetime DEFAULT NULL,
  `enddate` datetime DEFAULT NULL,
  `teamid` int(11) DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  `loggeduser` int(11) NOT NULL,
  `description` varchar(256) NOT NULL,
  `createddate` datetime NOT NULL,
  `editdate` datetime DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `logs_ibfk_1` (`projectid`),
  KEY `userid` (`userid`),
  KEY `loggeduser` (`loggeduser`),
  KEY `logs_ibfk_4` (`storystatus`),
  KEY `logs_ibfk_5` (`status`),
  KEY `logs_ibfk_6` (`task`),
  KEY `logs_ibfk_7` (`teamid`),
  KEY `logs_ibfk_8_idx` (`story`),
  KEY `logs_ibfk_9_idx` (`iteration`),
  CONSTRAINT `logs_ibfk_1` FOREIGN KEY (`projectid`) REFERENCES `project` (`id`),
  CONSTRAINT `logs_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `users` (`id`),
  CONSTRAINT `logs_ibfk_3` FOREIGN KEY (`loggeduser`) REFERENCES `users` (`id`),
  CONSTRAINT `logs_ibfk_4` FOREIGN KEY (`storystatus`) REFERENCES `storystatus` (`id`),
  CONSTRAINT `logs_ibfk_5` FOREIGN KEY (`status`) REFERENCES `logstatus` (`id`),
  CONSTRAINT `logs_ibfk_6` FOREIGN KEY (`task`) REFERENCES `task` (`id`),
  CONSTRAINT `logs_ibfk_7` FOREIGN KEY (`teamid`) REFERENCES `team` (`id`),
  CONSTRAINT `logs_ibfk_8` FOREIGN KEY (`story`) REFERENCES `story` (`id`),
  CONSTRAINT `logs_ibfk_9` FOREIGN KEY (`iteration`) REFERENCES `iteration` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logs`
--

LOCK TABLES `logs` WRITE;
/*!40000 ALTER TABLE `logs` DISABLE KEYS */;
INSERT INTO `logs` VALUES (1,211,NULL,NULL,NULL,NULL,'2015-09-22 16:25:00','2015-09-22 17:25:00','2015-09-22 16:25:00','2015-09-22 17:25:00',1,13,13,'testing','2015-09-22 17:31:38','2015-09-22 17:44:41',2),(2,243,NULL,NULL,NULL,NULL,'2015-09-22 12:30:00','2015-09-22 13:00:00','2015-09-22 12:30:00','2015-09-22 13:00:00',1,13,13,'Discusssion on sprint 0 changes','2015-09-22 17:50:41','2015-09-22 17:50:54',2),(3,244,NULL,NULL,NULL,NULL,'2015-09-22 12:00:00','2015-09-22 12:30:00','2015-09-22 12:00:00','2015-09-22 12:30:00',1,13,13,'Discusssion on sprint 1 changes','2015-09-22 17:51:27','2015-09-22 17:51:35',2),(4,245,NULL,NULL,NULL,NULL,'2015-09-22 15:00:00','2015-09-22 16:00:00','2015-09-22 15:00:00','2015-09-22 16:00:00',1,13,13,'Team meeting with shashi','2015-09-22 17:52:40','2015-09-22 17:52:46',2),(5,243,NULL,NULL,NULL,NULL,'2015-09-22 15:00:00','2015-09-22 18:30:00','2015-09-22 15:00:00','2015-09-22 19:00:00',1,41,41,'working on screens','2015-09-22 18:27:02','2015-09-23 10:55:44',2),(6,244,NULL,NULL,NULL,NULL,'2015-09-22 10:00:00','2015-09-22 19:00:00','2015-09-22 10:00:00','2015-09-22 19:30:00',1,121,121,'Analyzing project','2015-09-22 18:27:16','2015-09-23 09:49:58',2),(7,244,NULL,NULL,NULL,NULL,'2015-09-22 11:00:00','2015-09-22 20:00:00','2015-09-22 11:00:00','2015-09-22 20:00:00',1,61,61,'Working on the Jquery mobile Task and Looking into angularjs concepts','2015-09-22 19:22:57','2015-09-22 19:23:08',2),(8,244,NULL,NULL,NULL,NULL,'2015-09-23 09:30:00','2015-09-23 19:00:00','2015-09-23 09:30:00','2015-09-23 18:45:00',1,121,121,'Working on Jquery mobile task','2015-09-23 09:51:22','2015-09-24 10:40:45',2),(9,243,NULL,NULL,NULL,NULL,'2015-09-23 10:15:00','2015-09-23 15:00:00','2015-09-23 10:15:00','2015-09-23 17:00:00',1,41,41,'Working on configurations and maufactures page','2015-09-23 10:56:26','2015-09-24 10:36:59',2),(10,248,NULL,NULL,NULL,NULL,'2015-09-23 11:00:00','2015-09-23 19:00:00',NULL,NULL,1,101,101,'','2015-09-23 11:31:20',NULL,1),(11,243,NULL,NULL,NULL,NULL,'2015-09-23 11:41:00','2015-09-23 15:00:00','2015-09-23 11:41:00','2015-09-23 15:00:00',1,13,13,'Working on task creation from sprint 2.','2015-09-23 14:48:28','2015-09-23 14:48:40',2),(12,151,NULL,NULL,NULL,NULL,'2015-09-23 12:00:00','2015-09-23 12:15:00','2015-09-23 12:00:00','2015-09-23 12:15:00',1,13,13,'BDNA/ASET UX resource allocation meeting','2015-09-23 14:49:38','2015-09-23 14:49:46',2),(13,243,NULL,NULL,NULL,NULL,'2015-09-23 10:00:00','2015-09-23 12:00:00','2015-09-23 10:00:00','2015-09-23 12:00:00',1,61,61,'POC Jquery Mobile','2015-09-23 15:54:03','2015-09-23 15:54:21',2),(14,250,NULL,NULL,NULL,NULL,'2015-09-23 12:00:00','2015-09-23 12:30:00','2015-09-23 12:00:00','2015-09-23 22:00:00',1,61,61,'CDS Meeting','2015-09-23 15:54:46','2015-09-23 15:55:00',2),(15,250,NULL,NULL,NULL,NULL,'2015-09-23 14:30:00','2015-09-23 16:00:00','2015-09-23 14:30:00','2015-09-23 15:49:00',1,61,61,' CDS Code walk through ','2015-09-23 15:55:35','2015-09-23 15:55:45',2),(16,250,NULL,NULL,NULL,NULL,'2015-09-23 15:49:00','2015-09-23 19:00:00','2015-09-23 15:49:00','2015-09-23 19:31:00',1,61,61,'CDS project Setup and Analysis of Code','2015-09-23 15:56:45','2015-09-23 19:37:35',2),(17,249,NULL,NULL,NULL,NULL,'2015-09-21 11:00:00','2015-09-21 19:30:00',NULL,NULL,1,346,346,'Solving UI Issues and creating pages depending on their requirement','2015-09-23 16:02:58',NULL,1),(18,249,NULL,NULL,NULL,NULL,'2015-09-22 10:30:00','2015-09-22 19:45:00',NULL,NULL,1,346,346,'Solving UI issues and creating pages depending on their requirement','2015-09-23 16:03:54',NULL,1),(19,236,NULL,NULL,NULL,NULL,'2015-09-21 17:16:00','2015-09-21 18:16:00',NULL,NULL,1,13,13,'qewqe','2015-09-23 17:22:36',NULL,1),(20,243,1,1,NULL,3,'2015-09-24 11:00:00','2015-09-24 17:00:00','2015-09-24 11:00:00','2015-09-24 19:00:00',1,41,41,'manufacturer screen functionality','2015-09-24 10:38:31','2015-09-28 12:49:39',2),(21,244,NULL,NULL,NULL,NULL,'2015-09-24 09:30:00','2015-09-24 18:30:00','2015-09-24 09:30:00','2015-09-24 18:30:00',1,121,121,'Working on jQuery mobile tasks','2015-09-24 10:42:11','2015-09-28 11:04:53',2),(22,121,NULL,NULL,NULL,NULL,'2015-09-24 10:42:00','2015-09-24 18:42:00',NULL,NULL,1,281,281,'Exploring passport js','2015-09-24 10:49:25',NULL,1),(23,252,1,2,NULL,12,'2015-09-24 10:00:00','2015-09-24 11:15:00',NULL,NULL,1,261,261,'Exploring on Passport-Local strategy ','2015-09-24 11:23:15',NULL,1),(24,246,NULL,NULL,NULL,NULL,'2015-09-24 10:00:00','2015-09-24 19:00:00','2015-09-24 10:00:00','2015-09-24 18:00:00',1,61,61,'Nisum Adding another page','2015-09-24 11:31:02','2015-09-24 19:01:51',2),(25,248,NULL,NULL,NULL,NULL,'2015-09-24 10:30:00','2015-09-24 18:30:00',NULL,NULL,1,101,101,'','2015-09-24 14:04:30',NULL,1),(26,252,NULL,NULL,NULL,NULL,'2015-09-23 10:20:00','2015-09-23 19:00:00',NULL,NULL,1,346,346,'Angular Forms\nAngular node-Mongodb POC','2015-09-24 15:34:40',NULL,1),(27,249,NULL,NULL,NULL,NULL,'2015-09-24 10:30:00','2015-09-24 19:15:00',NULL,NULL,1,346,346,'Worked on Node-Mongodb poc\nWorked on IFS Design issues','2015-09-24 19:00:14',NULL,1),(28,249,NULL,NULL,NULL,NULL,'2015-09-25 11:00:00','2015-09-25 19:30:00',NULL,NULL,1,346,346,'Solved UI related issues in IFS designs','2015-09-26 13:37:15',NULL,1),(29,249,NULL,NULL,NULL,NULL,'2015-09-26 12:00:00','2015-09-26 18:10:00',NULL,NULL,1,346,346,'Worked on IFS design issues','2015-09-26 17:24:18',NULL,1),(30,121,NULL,NULL,NULL,NULL,'2015-09-28 09:51:00','2015-09-28 18:51:00',NULL,NULL,1,281,281,'Passport authenticatrion','2015-09-28 09:58:41',NULL,1),(31,244,NULL,NULL,NULL,NULL,'2015-09-28 10:00:00','2015-09-28 19:00:00','2015-09-28 10:00:00','2015-09-28 19:00:00',1,121,121,'Working on login screen','2015-09-28 11:05:24','2015-09-29 10:35:00',2),(32,171,NULL,NULL,NULL,NULL,'2015-09-24 10:00:00','2015-09-24 19:00:00','2015-09-24 10:00:00','2015-09-24 19:00:00',1,31,31,'','2015-09-28 12:27:37','2015-09-28 14:27:36',2),(33,236,NULL,NULL,NULL,NULL,'2015-09-25 10:00:00','2015-09-25 19:00:00','2015-09-25 10:00:00','2015-09-25 19:00:00',1,31,31,'','2015-09-28 12:27:53','2015-09-28 14:27:51',2),(34,250,1,5,4,3,'2015-09-28 10:30:00','2015-09-28 19:30:00',NULL,NULL,1,171,171,'','2015-09-28 12:50:18',NULL,1),(35,243,1,6,NULL,3,'2015-09-28 10:30:00','2015-09-28 19:00:00','2015-09-28 10:30:00','2015-09-28 19:40:00',1,41,41,'working on product list functionality','2015-09-28 12:51:39','2015-09-30 11:47:28',2),(36,243,NULL,NULL,NULL,NULL,'2015-09-28 12:18:00','2015-09-28 13:18:00','2015-09-28 12:19:00','2015-09-28 13:19:00',1,13,13,'Discussion with team on requirements','2015-09-28 13:25:31','2015-09-28 13:25:35',2),(37,243,NULL,NULL,NULL,NULL,'2015-09-24 11:19:00','2015-09-24 12:19:00','2015-09-24 11:19:00','2015-09-24 12:19:00',1,13,13,'Discussion with team on requirements','2015-09-28 13:28:00','2015-09-28 13:28:13',2),(38,252,1,9,NULL,3,'2015-09-28 10:30:00','2015-09-28 14:51:00',NULL,NULL,1,261,261,'Working on backbone Views after user authentication.','2015-09-28 15:00:22',NULL,1),(39,250,1,5,4,3,'2015-09-28 10:02:00','2015-09-28 19:02:00','2015-09-28 10:02:00','2015-09-28 19:02:00',1,81,81,'Started developing on code post loads script','2015-09-28 19:09:10','2015-09-28 19:09:31',2),(40,251,1,11,NULL,12,'2015-09-28 11:00:00','2015-09-28 13:00:00','2015-09-28 11:00:00','2015-09-28 13:00:00',1,31,31,'Did analysis to identify the root cause from where the warning message is getting displayed on the paged.','2015-09-28 19:28:39','2015-09-28 19:28:51',2),(41,251,1,12,NULL,4,'2015-09-28 14:00:00','2015-09-28 18:00:00','2015-09-28 14:00:00','2015-09-28 18:00:00',1,31,31,'Macy\'s UI build failure because of wrong Backbone JS version number','2015-09-28 19:31:43','2015-09-28 19:31:55',2),(42,249,NULL,NULL,NULL,NULL,'2015-09-28 10:00:00','2015-09-28 19:40:00',NULL,NULL,1,346,346,'Worked on IFS side-nav menu','2015-09-28 19:47:04',NULL,1),(43,252,1,13,NULL,3,'2015-09-29 09:41:00','2015-09-29 18:41:00',NULL,NULL,1,281,281,'Facebook authentication using passport','2015-09-29 09:48:06',NULL,1),(44,244,NULL,NULL,NULL,NULL,'2015-09-29 09:45:00','2015-09-29 18:45:00','2015-09-29 09:45:00','2015-09-29 20:00:00',1,121,121,'Working on screens\n','2015-09-29 10:36:19','2015-09-30 10:15:42',2),(45,243,NULL,NULL,NULL,NULL,'2015-09-29 10:30:00','2015-09-29 19:00:00',NULL,NULL,1,101,101,'Screens designing','2015-09-29 10:56:02',NULL,1),(46,248,NULL,NULL,NULL,NULL,'2015-09-28 16:30:00','2015-09-28 18:30:00',NULL,NULL,1,101,101,'Feedback changes.','2015-09-29 10:56:53',NULL,1),(47,243,NULL,NULL,NULL,NULL,'2015-09-28 10:30:00','2015-09-28 16:00:00',NULL,NULL,1,101,101,'','2015-09-29 10:57:12',NULL,1),(48,252,1,9,NULL,3,'2015-09-29 10:30:00','2015-09-29 10:50:00',NULL,NULL,1,261,261,'Working on signin page after login.','2015-09-29 10:58:53',NULL,1),(49,249,1,14,NULL,12,'2015-09-28 18:00:00','2015-09-28 19:00:00','2015-09-28 18:00:00','2015-09-28 19:00:00',1,31,31,'Identifying the root cause','2015-09-29 11:32:56','2015-09-29 11:33:06',2),(50,252,NULL,NULL,NULL,NULL,'2015-09-24 10:00:00','2015-09-24 19:00:00',NULL,NULL,1,251,251,'Exploring Node & passport','2015-09-29 11:42:31',NULL,1),(51,252,NULL,NULL,NULL,NULL,'2015-09-28 10:00:00','2015-09-28 19:00:00',NULL,NULL,1,251,251,'Exploring passport authentication','2015-09-29 11:43:26',NULL,1),(52,252,NULL,NULL,NULL,NULL,'2015-09-29 10:00:00','2015-09-29 19:00:00',NULL,NULL,1,251,251,'Exploring passport authentication','2015-09-29 11:44:09',NULL,1),(53,249,NULL,NULL,NULL,NULL,'2015-09-28 13:42:00','2015-09-28 14:42:00','2015-09-28 13:43:00','2015-09-28 14:43:00',1,13,13,'Discussions on project status','2015-09-29 11:49:29','2015-09-29 11:49:40',2),(54,243,NULL,NULL,NULL,NULL,'2015-09-29 11:43:00','2015-09-29 12:43:00','2015-09-29 11:43:00','2015-09-29 12:43:00',1,13,13,'Project status/requirement discussion','2015-09-29 11:50:08','2015-09-29 11:50:16',2),(55,252,NULL,NULL,NULL,NULL,'2015-09-29 10:00:00','2015-09-29 11:23:00','2015-09-29 10:00:00','2015-09-29 11:23:00',1,61,61,'Learning AngularJs','2015-09-29 14:20:44','2015-09-29 14:22:42',2),(56,251,NULL,NULL,NULL,NULL,'2015-09-29 11:30:00','2015-09-29 13:00:00','2015-09-29 11:30:00','2015-09-29 12:30:00',1,61,61,'Live Chat window issue - IMP','2015-09-29 14:21:09','2015-09-29 14:22:55',2),(57,251,NULL,NULL,NULL,NULL,'2015-09-29 14:00:00','2015-09-29 17:00:00','2015-09-29 14:00:00','2015-09-29 19:30:00',1,61,61,'Working HandlebarJs Version 3.0','2015-09-29 14:22:29','2015-09-29 19:55:36',2),(58,171,NULL,NULL,NULL,NULL,'2015-09-28 10:00:00','2015-09-28 19:00:00','2015-09-28 10:00:00','2015-09-28 19:00:00',1,61,61,'On Leave','2015-09-29 14:23:31','2015-09-29 14:24:10',2),(59,253,1,15,NULL,11,'2015-09-29 11:00:00','2015-09-29 20:00:00',NULL,NULL,1,161,161,'Fixing D-18731','2015-09-29 14:33:22',NULL,1),(60,249,1,14,NULL,12,'2015-09-29 11:00:00','2015-09-29 14:00:00','2015-09-29 11:00:00','2015-09-29 14:00:00',1,31,31,'There is an issue with configuration of the JSPs.','2015-09-29 17:02:06','2015-09-29 17:03:10',2),(61,248,NULL,NULL,NULL,NULL,'2015-09-29 16:00:00','2015-09-29 17:00:00',NULL,NULL,1,101,101,'','2015-09-29 17:54:25',NULL,1),(62,249,NULL,NULL,NULL,NULL,'2015-09-29 10:00:00','2015-09-29 19:30:00',NULL,NULL,1,346,346,'Worked on IFS Design issues','2015-09-29 19:26:42',NULL,1),(63,249,1,16,NULL,3,'2015-09-29 16:00:00','2015-09-29 18:00:00','2015-09-29 16:00:00','2015-09-29 18:00:00',1,31,31,'Accordion with inner accordion','2015-09-29 19:48:49','2015-09-29 19:49:03',2),(64,252,1,13,NULL,3,'2015-09-30 09:38:00','2015-09-30 18:38:00',NULL,NULL,1,281,281,'','2015-09-30 09:46:06',NULL,1),(65,252,3,17,NULL,12,'2015-09-30 09:40:00','2015-09-30 18:30:00',NULL,NULL,1,261,261,'Working on Sessions in NodeJS','2015-09-30 09:58:16',NULL,1),(66,244,NULL,NULL,NULL,NULL,'2015-09-30 10:00:00','2015-09-30 19:00:00',NULL,NULL,1,121,121,'Working on login and forgot password popup screens','2015-09-30 10:16:22',NULL,1),(67,249,NULL,NULL,NULL,NULL,'2015-09-30 10:15:00','2015-09-30 19:30:00',NULL,NULL,1,346,346,'Worked on Side-nav and all layout issues(Max resolved)\nNeed to integrate side-nav tomorrow.','2015-09-30 19:20:17',NULL,1),(68,252,1,13,NULL,3,'2015-10-01 09:41:00','2015-10-01 18:41:00',NULL,NULL,1,281,281,'','2015-10-01 09:48:34',NULL,1),(69,244,NULL,NULL,NULL,NULL,'2015-10-01 10:15:00','2015-10-01 19:15:00',NULL,NULL,1,121,121,'Working on select project screen','2015-10-01 10:33:00',NULL,1),(70,252,3,17,NULL,3,'2015-10-01 09:40:00','2015-10-01 18:40:00',NULL,NULL,1,261,261,'Working on sessions in nodejs.','2015-10-01 10:48:27',NULL,1),(71,243,NULL,NULL,NULL,NULL,'2015-09-30 11:21:00','2015-09-30 12:21:00',NULL,NULL,1,13,13,'Discussion on project','2015-10-01 12:28:10',NULL,1);
/*!40000 ALTER TABLE `logs` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `logtrigger` 
AFTER UPDATE ON `logs` FOR EACH ROW 
BEGIN
SET @description = NULL, @startdate = NULL, @enddate = NULL, @status = NULL;

IF NEW.description <> OLD.description THEN
    SET @description = NEW.description;
END IF;

IF NEW.startdate <> OLD.startdate THEN
    SET @startdate = NEW.startdate;
END IF;

IF NEW.enddate <> OLD.enddate THEN
    SET @enddate = NEW.enddate;
END IF;

IF NEW.status <> OLD.status THEN
    SET @status = NEW.status;
END IF;

IF(OLD.status = '1') THEN 
  INSERT INTO loghistory (logid, projectid, iteration, story, task, storystatus, plannedstartdate, plannedenddate, startdate, enddate, teamid, userid, loggeduser, description, createddate, editdate, status) VALUES 
  (NEW.id, OLD.projectid, OLD.iteration, OLD.story, OLD.task, OLD.storystatus, OLD.plannedstartdate, OLD.plannedenddate, NEW.startdate, NEW.enddate, OLD.teamid, OLD.userid, OLD.loggeduser, OLD.description, OLD.createddate, NEW.editdate, NEW.status);

ELSE 

INSERT INTO loghistory (logid, description, startdate, enddate, editdate, status) 

VALUES 

(NEW.id, @description, @startdate, @enddate,  new.editdate, new.status);

END IF;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `logstatus`
--

DROP TABLE IF EXISTS `logstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logstatus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `description` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logstatus`
--

LOCK TABLES `logstatus` WRITE;
/*!40000 ALTER TABLE `logstatus` DISABLE KEYS */;
INSERT INTO `logstatus` VALUES (1,'planned',''),(2,'actual',''),(3,'unlockrequest',''),(4,'unlocked','');
/*!40000 ALTER TABLE `logstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `myprojects`
--

DROP TABLE IF EXISTS `myprojects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `myprojects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `projectid` int(11) NOT NULL,
  `teamid` int(11) NOT NULL,
  `createddate` datetime NOT NULL,
  `editdate` datetime DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_index` (`projectid`,`teamid`),
  KEY `projectid` (`projectid`),
  KEY `teamid` (`teamid`),
  CONSTRAINT `myprojects_ibfk_1` FOREIGN KEY (`projectid`) REFERENCES `project` (`id`),
  CONSTRAINT `myprojects_ibfk_2` FOREIGN KEY (`teamid`) REFERENCES `team` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `myprojects`
--

LOCK TABLES `myprojects` WRITE;
/*!40000 ALTER TABLE `myprojects` DISABLE KEYS */;
INSERT INTO `myprojects` VALUES (1,243,1,'2015-09-22 17:34:10',NULL,1),(2,244,1,'2015-09-22 17:36:29',NULL,1),(3,252,1,'2015-09-24 11:15:03',NULL,1),(4,253,1,'2015-09-29 12:33:26',NULL,1),(5,254,1,'2015-09-29 12:37:14',NULL,1);
/*!40000 ALTER TABLE `myprojects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `createddate` date NOT NULL,
  `editdate` date DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `createdby` (`createdby`),
  CONSTRAINT `permission_ibfk_4` FOREIGN KEY (`createdby`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES (1,'USER','User',1,'2015-01-20',NULL,1),(2,'LEAD','Lead',1,'2015-01-20',NULL,1),(3,'EXECUTIVE','Executive',1,'2015-01-20',NULL,1);
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `startdate` date DEFAULT NULL,
  `enddate` date DEFAULT NULL,
  `teamid` int(11) DEFAULT NULL,
  `createddate` datetime NOT NULL,
  `editdate` datetime DEFAULT NULL,
  `createdby` int(11) NOT NULL,
  `editedby` int(11) DEFAULT NULL,
  `category` int(4) NOT NULL DEFAULT '2',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_index` (`name`),
  KEY `leadid` (`createdby`),
  KEY `teamid` (`teamid`),
  KEY `editedby` (`editedby`),
  CONSTRAINT `project_ibfk_3` FOREIGN KEY (`editedby`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `project_ibfk_1` FOREIGN KEY (`createdby`) REFERENCES `users` (`id`),
  CONSTRAINT `project_ibfk_2` FOREIGN KEY (`teamid`) REFERENCES `team` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=255 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (111,'Vacation','vacation','2014-11-01','2015-12-31',NULL,'2014-11-04 10:32:35','2015-02-10 18:06:14',1,NULL,1,1),(121,'Training','New developers under training. Or, people occupied in any training sessions.','2014-11-01','2015-12-31',1,'2014-11-04 10:38:16','0000-00-00 00:00:00',1,NULL,1,1),(151,'Project Meetings','Projects meetings','2014-11-11','2015-12-31',NULL,'2014-11-05 11:38:10','0000-00-00 00:00:00',1,NULL,1,1),(171,'Absence','Absence',NULL,NULL,NULL,'2014-11-19 06:28:29','0000-00-00 00:00:00',1,NULL,1,1),(211,'Network outage','networks','2014-12-01','2015-12-31',1,'2014-12-26 10:25:22','2015-02-10 18:05:57',1,NULL,1,1),(221,'Project Blockers','blockers','2014-12-01','2015-12-31',1,'2014-12-26 10:27:43','2015-02-10 18:06:07',1,NULL,1,1),(236,'Holiday','public Holiday',NULL,NULL,NULL,'2015-02-03 14:16:47',NULL,1,NULL,1,1),(243,'BDNA','B|DNA','2015-09-07','2015-10-31',1,'2015-09-22 17:34:07',NULL,352,NULL,2,1),(244,'GBNA','Global Bussiness North America','2015-09-21','2015-12-31',1,'2015-09-22 17:34:52',NULL,352,NULL,2,1),(245,'Team Meetings','Team Meetings',NULL,NULL,NULL,'2015-09-22 17:52:15',NULL,1,NULL,1,1),(246,'Nisum website','Nisum website updates','2015-02-20','2015-03-12',1,'2015-09-22 18:49:41',NULL,352,NULL,2,1),(247,'OSIUS website','OSIUS website updates','2015-09-22','2015-12-31',1,'2015-09-22 18:50:58',NULL,352,NULL,2,1),(248,'ASET','ASET dashboard','2015-09-22','2015-09-30',1,'2015-09-22 18:51:50',NULL,352,NULL,2,1),(249,'IFS','IFS website designing','2015-09-22','2015-09-30',1,'2015-09-22 18:52:39',NULL,352,NULL,2,1),(250,'CDS','Constancy development services','2015-09-22','2015-10-30',1,'2015-09-22 18:53:41',NULL,352,NULL,2,1),(251,'Macy\'s - Issues','Macy\'s related tasks','2015-09-22','2015-12-31',1,'2015-09-23 16:44:09',NULL,352,NULL,2,1),(252,'Competency Team Activities',NULL,'2015-09-21','2015-12-31',1,'2015-09-24 11:14:46',NULL,352,NULL,2,1),(253,'Loyalty Bonus Offers Visibility','BCOM : Loyalty Bonus Offers Visibility','2015-03-02','2015-10-22',1,'2015-09-29 12:32:37','2015-09-29 13:03:19',352,352,2,1),(254,'Minted',NULL,'2015-07-01','2015-10-31',1,'2015-09-29 12:37:12',NULL,352,NULL,2,1);
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `insertprojecttrigger` AFTER INSERT ON `project` FOR EACH ROW 

INSERT INTO projecthistory(projectid, name , description, startdate, enddate, teamid, createddate, editdate, createdby, category, active) VALUES 
(NEW.id, NEW.name , NEW.description, NEW.startdate, NEW.enddate, NEW.teamid, 
NEW.createddate, NEW.editdate, NEW.createdby, NEW.category, NEW.active) */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `osiplanner`.`updateprojecttrigger` AFTER UPDATE ON `project` FOR EACH ROW

BEGIN

SET @name = NULL,@description = NULL,@startdate = NULL, @enddate = NULL, @active=NULL;

IF NEW.name <> OLD.name THEN
    SET @name = NEW.name;
END IF;

IF NEW.description <> OLD.description THEN
    SET @description = NEW.description;
END IF;

IF NEW.startdate <> OLD.startdate THEN
    SET @startdate = NEW.startdate;
END IF;

IF NEW.enddate <> OLD.enddate THEN
    SET @enddate = NEW.enddate;
END IF;

IF NEW.active <> OLD.active THEN
    SET @active = NEW.active;
END IF;

INSERT INTO projecthistory(projectid, name , description, startdate, enddate, editedby, editdate, active) VALUES 
(NEW.id, @name, @description, @startdate, @enddate, NEW.editedby, NEW.editdate, @active);

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `projecthistory`
--

DROP TABLE IF EXISTS `projecthistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projecthistory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `projectid` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `startdate` date DEFAULT NULL,
  `enddate` date DEFAULT NULL,
  `teamid` int(11) DEFAULT NULL,
  `createddate` datetime DEFAULT NULL,
  `editdate` datetime DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `editedby` int(11) DEFAULT NULL,
  `category` int(4) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `projectid` (`projectid`),
  CONSTRAINT `projecthistory_ibfk_1` FOREIGN KEY (`projectid`) REFERENCES `project` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projecthistory`
--

LOCK TABLES `projecthistory` WRITE;
/*!40000 ALTER TABLE `projecthistory` DISABLE KEYS */;
INSERT INTO `projecthistory` VALUES (12,111,'Vacation','vacation','2014-11-01','2015-12-31',NULL,'2014-11-04 10:32:35','2015-02-10 18:06:14',1,NULL,1,1),(13,121,'Training','New developers under training. Or, people occupied in any training sessions.','2014-11-01','2015-12-31',1,'2014-11-04 10:38:16','0000-00-00 00:00:00',1,NULL,1,1),(16,151,'Project Meetings','Projects meetings','2014-11-11','2015-12-31',NULL,'2014-11-05 11:38:10','0000-00-00 00:00:00',1,NULL,1,1),(18,171,'Absence','Absence',NULL,NULL,NULL,'2014-11-19 06:28:29','0000-00-00 00:00:00',1,NULL,1,1),(21,211,'Network outage','networks','2014-12-01','2015-12-31',1,'2014-12-26 10:25:22','2015-02-10 18:05:57',1,NULL,1,1),(22,221,'Project Blockers','blockers','2014-12-01','2015-12-31',1,'2014-12-26 10:27:43','2015-02-10 18:06:07',1,NULL,1,1),(23,236,'Holiday','public Holiday',NULL,NULL,NULL,'2015-02-03 14:16:47',NULL,1,NULL,1,1),(29,243,'BDNA','B|DNA','2015-09-07','2015-10-31',1,'2015-09-22 17:34:07',NULL,352,NULL,2,1),(30,244,'GBNA','Global Bussiness North America','2015-09-21','2015-12-31',1,'2015-09-22 17:34:52',NULL,352,NULL,2,1),(31,245,'Team Meetings','Team Meetings',NULL,NULL,NULL,'2015-09-22 17:52:15',NULL,1,NULL,1,1),(32,246,'Nisum website','Nisum website updates','2015-02-20','2015-03-12',1,'2015-09-22 18:49:41',NULL,352,NULL,2,1),(33,247,'OSIUS website','OSIUS website updates','2015-09-22','2015-12-31',1,'2015-09-22 18:50:58',NULL,352,NULL,2,1),(34,248,'ASET','ASET dashboard','2015-09-22','2015-09-30',1,'2015-09-22 18:51:50',NULL,352,NULL,2,1),(35,249,'IFS','IFS website designing','2015-09-22','2015-09-30',1,'2015-09-22 18:52:39',NULL,352,NULL,2,1),(36,250,'CDS','Constancy development services','2015-09-22','2015-10-30',1,'2015-09-22 18:53:41',NULL,352,NULL,2,1),(37,251,'Macy\'s - Issues','Macy\'s related tasks','2015-09-22','2015-12-31',1,'2015-09-23 16:44:09',NULL,352,NULL,2,1),(38,252,'Competency Team Activities',NULL,'2015-09-21','2015-12-31',1,'2015-09-24 11:14:46',NULL,352,NULL,2,1),(39,253,'Loyalty Bonus Offers Visibility','BCOM : Loyalty Bonus Offers Visibility','2015-07-01','2015-09-27',1,'2015-09-29 12:32:37',NULL,352,NULL,2,1),(40,254,'Minted',NULL,'2015-07-01','2015-10-31',1,'2015-09-29 12:37:12',NULL,352,NULL,2,1),(41,253,NULL,NULL,'2015-03-02','2015-10-22',NULL,NULL,'2015-09-29 13:03:19',NULL,352,NULL,NULL);
/*!40000 ALTER TABLE `projecthistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projectpermission`
--

DROP TABLE IF EXISTS `projectpermission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projectpermission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `projectid` int(11) NOT NULL,
  `teamid` int(11) NOT NULL,
  `createddate` date NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_index` (`projectid`,`teamid`),
  KEY `projectid` (`projectid`),
  KEY `teamid` (`teamid`),
  CONSTRAINT `projectpermission_ibfk_1` FOREIGN KEY (`projectid`) REFERENCES `project` (`id`),
  CONSTRAINT `projectpermission_ibfk_2` FOREIGN KEY (`teamid`) REFERENCES `team` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projectpermission`
--

LOCK TABLES `projectpermission` WRITE;
/*!40000 ALTER TABLE `projectpermission` DISABLE KEYS */;
INSERT INTO `projectpermission` VALUES (1,243,1,'2015-09-22',1),(2,244,1,'2015-09-22',1),(3,246,1,'2015-09-22',1),(4,247,1,'2015-09-22',1),(5,248,1,'2015-09-22',1),(6,249,1,'2015-09-22',1),(7,250,1,'2015-09-22',1),(8,251,1,'2015-09-23',1),(9,252,1,'2015-09-24',1),(10,253,1,'2015-09-29',1),(11,254,1,'2015-09-29',1);
/*!40000 ALTER TABLE `projectpermission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projectresource`
--

DROP TABLE IF EXISTS `projectresource`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projectresource` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `projectid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `description` varchar(256) DEFAULT NULL,
  `startdate` date NOT NULL,
  `enddate` date NOT NULL,
  `billable` tinyint(1) NOT NULL,
  `sowno` varchar(256) DEFAULT NULL,
  `createdby` int(11) NOT NULL,
  `editedby` int(11) DEFAULT NULL,
  `createddate` datetime NOT NULL,
  `editdate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_index` (`projectid`,`userid`),
  KEY `projectresource_ibfk_1` (`projectid`),
  KEY `projectresource_ibfk_2` (`userid`),
  KEY `projectresource_ibfk_3` (`createdby`),
  KEY `projectresource_ibfk_4` (`editedby`),
  CONSTRAINT `projectresource_ibfk_3` FOREIGN KEY (`createdby`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `projectresource_ibfk_1` FOREIGN KEY (`projectid`) REFERENCES `project` (`id`),
  CONSTRAINT `projectresource_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `users` (`id`),
  CONSTRAINT `projectresource_ibfk_4` FOREIGN KEY (`editedby`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projectresource`
--

LOCK TABLES `projectresource` WRITE;
/*!40000 ALTER TABLE `projectresource` DISABLE KEYS */;
INSERT INTO `projectresource` VALUES (1,243,41,'UI developer','2015-09-14','2015-10-31',1,'123',352,352,'2015-09-22 17:35:49','2015-09-22 17:36:25'),(2,243,101,'UX','2015-09-14','2015-10-30',1,'123',352,NULL,'2015-09-22 17:36:19',NULL),(3,244,121,'ui Developer','2015-09-21','2015-11-30',1,'123',352,NULL,'2015-09-22 17:36:51',NULL),(4,253,161,'BCOM UI','2015-08-01','2015-09-27',1,'7216',352,352,'2015-09-29 12:34:18','2015-09-29 13:03:49'),(5,254,21,'ui','2015-08-01','2015-10-31',1,'123',352,NULL,'2015-09-29 12:37:33',NULL);
/*!40000 ALTER TABLE `projectresource` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `insertprojectresourcetrigger` AFTER INSERT  ON `projectresource` FOR EACH ROW 

INSERT INTO projectresourcehistory(projectresourceid, projectid , userid, startdate, enddate, billable, sowno, createdby, createddate, description) 
VALUES 
(NEW.id, NEW.projectid , NEW.userid, NEW.startdate, NEW.enddate, NEW.billable, NEW.sowno, NEW.createdby, NEW.createddate,NEW.description) */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `osiplanner`.`updateprojectresourcetrigger` AFTER UPDATE ON `projectresource` FOR EACH ROW    

BEGIN

SET @description = NULL,@startdate = NULL, @enddate = NULL, @billable = NULL, @sowno = NULL;


IF NEW.description <> OLD.description THEN
    SET @description = NEW.description;
END IF;

IF NEW.startdate <> OLD.startdate THEN
    SET @startdate = NEW.startdate;
END IF;

IF NEW.enddate <> OLD.enddate THEN
    SET @enddate = NEW.enddate;
END IF;

IF NEW.billable <> OLD.billable THEN
    SET @billable = NEW.billable;
END IF;

IF NEW.sowno <> OLD.sowno THEN
    SET @sowno = NEW.sowno;
END IF;

INSERT INTO projectresourcehistory(projectresourceid, startdate, enddate, billable, sowno, editedby, editdate, description) VALUES (NEW.id, @startdate , @enddate, @billable, @sowno, NEW.editedby,NEW.editdate, @description);


END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `deleteprojectresourcetrigger` AFTER DELETE ON `projectresource` FOR EACH ROW 

INSERT INTO projectresourcehistory(projectresourceid, editedby, editdate) VALUES (OLD.id,OLD.editedby, 
OLD.editdate) */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `projectresourcehistory`
--

DROP TABLE IF EXISTS `projectresourcehistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projectresourcehistory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `projectresourceid` int(11) NOT NULL,
  `projectid` int(11) DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  `description` varchar(256) DEFAULT NULL,
  `startdate` date DEFAULT NULL,
  `enddate` date DEFAULT NULL,
  `billable` tinyint(1) DEFAULT NULL,
  `sowno` varchar(256) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `editedby` int(11) DEFAULT NULL,
  `createddate` datetime DEFAULT NULL,
  `editdate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projectresourcehistory`
--

LOCK TABLES `projectresourcehistory` WRITE;
/*!40000 ALTER TABLE `projectresourcehistory` DISABLE KEYS */;
INSERT INTO `projectresourcehistory` VALUES (1,1,243,41,'UI developer','2015-09-21','2015-10-31',1,'123',352,NULL,'2015-09-22 17:35:49',NULL),(2,2,243,101,'UX','2015-09-14','2015-10-30',1,'123',352,NULL,'2015-09-22 17:36:19',NULL),(3,1,NULL,NULL,NULL,'2015-09-14',NULL,NULL,NULL,NULL,352,NULL,'2015-09-22 17:36:25'),(4,3,244,121,'ui Developer','2015-09-21','2015-11-30',1,'123',352,NULL,'2015-09-22 17:36:51',NULL),(5,4,253,161,'BCOM UI','2015-08-01','2015-09-27',1,'1243',352,NULL,'2015-09-29 12:34:18',NULL),(6,5,254,21,'ui','2015-08-01','2015-10-31',1,'123',352,NULL,'2015-09-29 12:37:33',NULL),(7,4,NULL,NULL,NULL,NULL,NULL,NULL,'7216',NULL,352,NULL,'2015-09-29 13:03:49');
/*!40000 ALTER TABLE `projectresourcehistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'ADMIN','BLAH BLAH',1),(2,'MANAGER','BLAH BLAH',1),(3,'USER','BLAH BLAH',1),(4,'SENIOR MANAGER','Senior Manager',1);
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `story`
--

DROP TABLE IF EXISTS `story`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `story` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `iteration` int(11) NOT NULL,
  `projectid` int(11) NOT NULL,
  `description` varchar(256) DEFAULT NULL,
  `type` int(11) NOT NULL DEFAULT '1',
  `hours` int(11) DEFAULT '0',
  `status` int(11) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `editedby` int(11) DEFAULT NULL,
  `createddate` datetime NOT NULL,
  `editdate` datetime DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `projectid_2` (`projectid`,`name`),
  KEY `projectid` (`projectid`),
  KEY `createdby` (`createdby`),
  KEY `story_ibfk_3` (`type`),
  KEY `story_ibfk_4_idx` (`iteration`),
  KEY `editedby` (`editedby`),
  KEY `status` (`status`),
  CONSTRAINT `story_ibfk_6` FOREIGN KEY (`status`) REFERENCES `taskstatus` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `story_ibfk_1` FOREIGN KEY (`projectid`) REFERENCES `project` (`id`),
  CONSTRAINT `story_ibfk_2` FOREIGN KEY (`createdby`) REFERENCES `users` (`id`),
  CONSTRAINT `story_ibfk_3` FOREIGN KEY (`type`) REFERENCES `storytype` (`id`),
  CONSTRAINT `story_ibfk_4` FOREIGN KEY (`iteration`) REFERENCES `iteration` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `story_ibfk_5` FOREIGN KEY (`editedby`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `story`
--

LOCK TABLES `story` WRITE;
/*!40000 ALTER TABLE `story` DISABLE KEYS */;
INSERT INTO `story` VALUES (1,'01',1,243,'working on manufacturers screen and functionality',1,NULL,NULL,41,NULL,'2015-09-24 10:37:52',NULL,1),(2,'POC Using Mysql,ExpressJS,BackboneJS & NodeJS',1,252,'Working on Passport Authentication for Login User',1,NULL,NULL,261,NULL,'2015-09-24 11:21:06',NULL,1),(4,'CDS_REQ_001',1,250,'Post a request - By citizen',1,NULL,NULL,171,NULL,'2015-09-28 12:45:12',NULL,1),(5,'Post a request',1,250,'By Office executive/Office Manager',1,NULL,NULL,171,NULL,'2015-09-28 12:47:48',NULL,1),(6,'03',1,243,'working on productlist page in BDNA',1,NULL,NULL,41,NULL,'2015-09-28 12:50:08',NULL,1),(7,'CDS_REQ_005',1,250,'For Anonymous request, show the name and photo with masked when other users are viewing.',1,NULL,NULL,171,NULL,'2015-09-28 12:54:23',NULL,1),(9,'02',1,252,'working on Views after authentication done for registration and signin user.',1,NULL,NULL,261,NULL,'2015-09-28 14:30:45',NULL,1),(11,'ECOMSST-44142',1,251,'Wrong warning message getting displayed',2,2,1,31,NULL,'2015-09-28 19:27:26',NULL,1),(12,'Macy\'s UI Build Failure',1,251,'Need to fix the Macy\'s UI build failure issue because of wrong Backbone JS version number',2,4,1,31,NULL,'2015-09-28 19:30:51',NULL,1),(13,'passportJS',1,252,'POC using MEAN and passport',1,NULL,NULL,281,NULL,'2015-09-29 09:47:13',NULL,1),(14,'Accordion is not working',1,249,'Need to identify the root cause.',2,1,1,31,NULL,'2015-09-29 11:32:11',NULL,1),(15,'D-18731',1,253,'Existed promotions call outs are not displaying for member products under master PDP in ISHIP mode and when kill switch OFF.',2,9,1,161,NULL,'2015-09-29 14:30:56',NULL,1),(16,'Accordion with inner accordion',1,249,'Accordion with inner accordion',1,NULL,NULL,31,NULL,'2015-09-29 19:47:35',NULL,1),(17,'03',3,252,'Exploring on Sessions in NodeJS',1,NULL,NULL,261,NULL,'2015-09-30 09:55:01',NULL,1);
/*!40000 ALTER TABLE `story` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `insertstorytrigger` 
After INSERT  ON `story` FOR EACH ROW INSERT INTO storyhistory (storyid, name, iteration, projectid, description, type, hours, status, createdby, editedby, createddate, editdate, active) VALUES (NEW.id, NEW.name, NEW.iteration, NEW.projectid, NEW.description, NEW.type, NEW.hours, NEW.status, NEW.createdby, NEW.editedby, NEW.createddate, NEW.editdate, NEW.active) */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `osiplanner`.`updatestorytrigger` AFTER UPDATE ON `story` FOR EACH ROW BEGIN

SET @name = NULL,@iteration = NULL,@description = NULL,@hours = NULL, @status = NULL, @active=NULL;

IF NEW.name <> OLD.name THEN
    SET @name = NEW.name;
END IF;

IF NEW.iteration <> OLD.iteration THEN
    SET @iteration = NEW.iteration;
END IF;

IF NEW.description <> OLD.description THEN
    SET @description = NEW.description;
END IF;

IF NEW.hours <> OLD.hours THEN
    SET @hours = NEW.hours;
END IF;

IF NEW.status <> OLD.status THEN
    SET @status = NEW.status;
END IF;

IF NEW.active <> OLD.active THEN
    SET @active = NEW.active;
END IF;

INSERT INTO storyhistory (storyid, name, iteration, description, hours, status, editedby, editdate, active) VALUES (NEW.id, @name, @iteration, @description, @hours, @status, NEW.editedby,  NEW.editdate, @active);


END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `storycomments`
--

DROP TABLE IF EXISTS `storycomments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storycomments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `storyid` int(11) NOT NULL,
  `description` varchar(256) DEFAULT NULL,
  `userid` int(11) NOT NULL,
  `createddate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `storyid` (`storyid`),
  KEY `userid` (`userid`),
  CONSTRAINT `storycomments_ibfk_1` FOREIGN KEY (`storyid`) REFERENCES `story` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `storycomments_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storycomments`
--

LOCK TABLES `storycomments` WRITE;
/*!40000 ALTER TABLE `storycomments` DISABLE KEYS */;
/*!40000 ALTER TABLE `storycomments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storyhistory`
--

DROP TABLE IF EXISTS `storyhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storyhistory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `storyid` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `iteration` int(11) DEFAULT NULL,
  `projectid` int(11) DEFAULT NULL,
  `description` varchar(256) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `hours` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `editedby` int(11) DEFAULT NULL,
  `createddate` datetime DEFAULT NULL,
  `editdate` datetime DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `projectid` (`projectid`),
  KEY `storyid` (`projectid`),
  KEY `createdby` (`createdby`),
  KEY `storyhistory_ibfk_3` (`type`),
  KEY `storyhistory_ibfk_4` (`storyid`),
  KEY `storyhistory_ibfk_5_idx` (`iteration`),
  KEY `editedby` (`editedby`),
  CONSTRAINT `storyhistory_ibfk_1` FOREIGN KEY (`projectid`) REFERENCES `project` (`id`),
  CONSTRAINT `storyhistory_ibfk_2` FOREIGN KEY (`createdby`) REFERENCES `users` (`id`),
  CONSTRAINT `storyhistory_ibfk_3` FOREIGN KEY (`type`) REFERENCES `storytype` (`id`),
  CONSTRAINT `storyhistory_ibfk_4` FOREIGN KEY (`storyid`) REFERENCES `story` (`id`),
  CONSTRAINT `storyhistory_ibfk_5` FOREIGN KEY (`iteration`) REFERENCES `iteration` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `storyhistory_ibfk_6` FOREIGN KEY (`editedby`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storyhistory`
--

LOCK TABLES `storyhistory` WRITE;
/*!40000 ALTER TABLE `storyhistory` DISABLE KEYS */;
INSERT INTO `storyhistory` VALUES (1,1,'01',1,243,'working on manufacturers screen and functionality',1,NULL,NULL,41,NULL,'2015-09-24 10:37:52',NULL,1),(2,2,'POC Using Mysql,ExpressJS,BackboneJS & NodeJS',1,252,'Working on Passport Authentication for Login User',1,NULL,NULL,261,NULL,'2015-09-24 11:21:06',NULL,1),(3,4,'CDS_REQ_001',1,250,'Post a request - By citizen',1,NULL,NULL,171,NULL,'2015-09-28 12:45:12',NULL,1),(4,5,'Post a request',1,250,'By Office executive/Office Manager',1,NULL,NULL,171,NULL,'2015-09-28 12:47:48',NULL,1),(5,6,'03',1,243,'working on productlist page in BDNA',1,NULL,NULL,41,NULL,'2015-09-28 12:50:08',NULL,1),(6,7,'CDS_REQ_005',1,250,'For Anonymous request, show the name and photo with masked when other users are viewing.',1,NULL,NULL,171,NULL,'2015-09-28 12:54:23',NULL,1),(7,9,'02',1,252,'working on Views after authentication done for registration and signin user.',1,NULL,NULL,261,NULL,'2015-09-28 14:30:45',NULL,1),(8,11,'ECOMSST-44142',1,251,'Wrong warning message getting displayed',2,2,1,31,NULL,'2015-09-28 19:27:26',NULL,1),(9,12,'Macy\'s UI Build Failure',1,251,'Need to fix the Macy\'s UI build failure issue because of wrong Backbone JS version number',2,4,1,31,NULL,'2015-09-28 19:30:51',NULL,1),(10,13,'passportJS',1,252,'POC using MEAN and passport',1,NULL,NULL,281,NULL,'2015-09-29 09:47:13',NULL,1),(11,14,'Accordion is not working',1,249,'Need to identify the root cause.',2,1,1,31,NULL,'2015-09-29 11:32:11',NULL,1),(12,15,'D-18731',1,253,'Existed promotions call outs are not displaying for member products under master PDP in ISHIP mode and when kill switch OFF.',2,9,1,161,NULL,'2015-09-29 14:30:56',NULL,1),(13,16,'Accordion with inner accordion',1,249,'Accordion with inner accordion',1,NULL,NULL,31,NULL,'2015-09-29 19:47:35',NULL,1),(14,17,'03',3,252,'Exploring on Sessions in NodeJS',1,NULL,NULL,261,NULL,'2015-09-30 09:55:01',NULL,1);
/*!40000 ALTER TABLE `storyhistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storystatus`
--

DROP TABLE IF EXISTS `storystatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storystatus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `description` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storystatus`
--

LOCK TABLES `storystatus` WRITE;
/*!40000 ALTER TABLE `storystatus` DISABLE KEYS */;
INSERT INTO `storystatus` VALUES (1,'Story Huddle','Story Huddle'),(2,'Design Review','Design review'),(3,'In Development','In development'),(4,'Unit Testing','Unit testing'),(5,'Code Review','Code review'),(6,'Testing Unit Level (WB)','Testing unit level (WB)'),(7,'Feature File','Feature file'),(8,'Step Definition','Step definition'),(9,'Test Code Review','Test code review'),(10,'Testing','Testing'),(11,'Defects Fixes','Defects fixes'),(12,'Others','All misc status goes here');
/*!40000 ALTER TABLE `storystatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storytype`
--

DROP TABLE IF EXISTS `storytype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storytype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storytype`
--

LOCK TABLES `storytype` WRITE;
/*!40000 ALTER TABLE `storytype` DISABLE KEYS */;
INSERT INTO `storytype` VALUES (1,'Story','Story'),(2,'Defect','Defect');
/*!40000 ALTER TABLE `storytype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `storyid` int(11) NOT NULL,
  `description` varchar(256) DEFAULT NULL,
  `hours` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL,
  `createdby` int(11) DEFAULT NULL,
  `editedby` int(11) DEFAULT NULL,
  `createddate` datetime NOT NULL,
  `editdate` datetime DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `storyid_2` (`storyid`,`name`),
  KEY `storyid` (`storyid`),
  KEY `createdby` (`createdby`),
  KEY `editedby` (`editedby`),
  KEY `status` (`status`),
  CONSTRAINT `task_ibfk_4` FOREIGN KEY (`status`) REFERENCES `taskstatus` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `task_ibfk_1` FOREIGN KEY (`storyid`) REFERENCES `story` (`id`),
  CONSTRAINT `task_ibfk_2` FOREIGN KEY (`createdby`) REFERENCES `users` (`id`),
  CONSTRAINT `task_ibfk_3` FOREIGN KEY (`editedby`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (1,'Passport Authentication using Mysql Database',2,'User Registration and Login.',8,1,261,NULL,'2015-09-24 11:25:48',NULL,1),(2,'Request types in Adding new request',4,'public, private, Anonymous - read it from DB and show as radio',2,1,171,NULL,'2015-09-28 12:46:17',NULL,1),(3,'Request Description',4,'request description should be limit to 160 chars',2,1,171,NULL,'2015-09-28 12:46:51',NULL,1),(4,'Role based New request',5,'Different screen needs to be develop and do the post request task',16,1,171,NULL,'2015-09-28 12:48:24',NULL,1),(5,'Sharing on social media',7,'share it on fb, twitter, linkedin',8,1,171,NULL,'2015-09-28 13:10:32',NULL,1);
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `inserttasktrigger` AFTER INSERT ON `task` FOR EACH ROW INSERT INTO taskhistory (taskid, name, storyid, description, hours, status, createdby, editedby, createddate, editdate, active) VALUES (NEW.id, NEW.name, NEW.storyid, NEW.description, NEW.hours, NEW.status, NEW.createdby, NEW.editedby, NEW.createddate, NEW.editdate, NEW.active) */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `osiplanner`.`updatetasktrigger` AFTER UPDATE ON `task` FOR EACH ROW

BEGIN

SET @name = NULL,@description = NULL,@hours = NULL,@status = NULL, @active=NULL;

IF NEW.name <> OLD.name THEN
    SET @name = NEW.name;
END IF;

IF NEW.description <> OLD.description THEN
    SET @description = NEW.description;
END IF;

IF NEW.hours <> OLD.hours THEN
    SET @hours = NEW.hours;
END IF;

IF NEW.status <> OLD.status THEN
    SET @status = NEW.status;
END IF;

IF NEW.active <> OLD.active THEN
    SET @active = NEW.active;
END IF;

INSERT INTO taskhistory (taskid, name, description, hours, status, editedby, editdate, active) VALUES (NEW.id, @name, @description, @hours, @status, NEW.editedby, NEW.editdate, @active) ;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `taskcomments`
--

DROP TABLE IF EXISTS `taskcomments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `taskcomments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `taskid` int(11) NOT NULL,
  `description` varchar(256) DEFAULT NULL,
  `userid` int(11) NOT NULL,
  `createddate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `taskid` (`taskid`),
  KEY `userid` (`userid`),
  CONSTRAINT `taskcomments_ibfk_1` FOREIGN KEY (`taskid`) REFERENCES `task` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `taskcomments_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taskcomments`
--

LOCK TABLES `taskcomments` WRITE;
/*!40000 ALTER TABLE `taskcomments` DISABLE KEYS */;
/*!40000 ALTER TABLE `taskcomments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taskhistory`
--

DROP TABLE IF EXISTS `taskhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `taskhistory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `taskid` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `storyid` int(11) DEFAULT NULL,
  `description` varchar(256) DEFAULT NULL,
  `hours` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `editedby` int(11) DEFAULT NULL,
  `createddate` datetime DEFAULT NULL,
  `editdate` datetime DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taskhistory`
--

LOCK TABLES `taskhistory` WRITE;
/*!40000 ALTER TABLE `taskhistory` DISABLE KEYS */;
INSERT INTO `taskhistory` VALUES (1,1,'Passport Authentication using Mysql Database',2,'User Registration and Login.',8,1,261,NULL,'2015-09-24 11:25:48',NULL,1),(2,2,'Request types in Adding new request',4,'public, private, Anonymous - read it from DB and show as radio',2,1,171,NULL,'2015-09-28 12:46:17',NULL,1),(3,3,'Request Description',4,'request description should be limit to 160 chars',2,1,171,NULL,'2015-09-28 12:46:51',NULL,1),(4,4,'Role based New request',5,'Different screen needs to be develop and do the post request task',16,1,171,NULL,'2015-09-28 12:48:24',NULL,1),(5,5,'Sharing on social media',7,'share it on fb, twitter, linkedin',8,1,171,NULL,'2015-09-28 13:10:32',NULL,1);
/*!40000 ALTER TABLE `taskhistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taskstatus`
--

DROP TABLE IF EXISTS `taskstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `taskstatus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `description` varchar(256) DEFAULT NULL,
  `step` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `step` (`step`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taskstatus`
--

LOCK TABLES `taskstatus` WRITE;
/*!40000 ALTER TABLE `taskstatus` DISABLE KEYS */;
INSERT INTO `taskstatus` VALUES (1,'Open','task in open status',1),(2,'Dev','in development state',2),(3,'QE','in testing state',5),(4,'WBQE','in whitebox testing state',6),(5,'Close','Task completed.',7),(6,'Code Review','in code review state',3),(7,'QE Analysis','test',4);
/*!40000 ALTER TABLE `taskstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `leadid` int(11) DEFAULT NULL,
  `createddate` datetime NOT NULL,
  `editdate` datetime DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `createdby` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `leadid_2` (`leadid`),
  KEY `leadid` (`leadid`),
  KEY `team_ibfk_2_idx1` (`createdby`),
  CONSTRAINT `team_ibfk_2` FOREIGN KEY (`createdby`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `team_ibfk_1` FOREIGN KEY (`leadid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES (1,'UI','UI TEAM',352,'2014-10-21 08:22:15','2015-09-22 17:33:34',1,1),(2,'HUB','Hub Dev Team',283,'2015-01-22 19:15:56',NULL,1,1),(3,'SDP','SDP Team',284,'2015-01-22 19:17:04',NULL,1,1),(4,'QA','QA Team',287,'2015-01-29 12:56:11','2015-01-29 13:05:18',1,1),(5,'WBQE','WBQE',311,'2015-02-03 15:15:07',NULL,1,1);
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teamresource`
--

DROP TABLE IF EXISTS `teamresource`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teamresource` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teamid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userid` (`userid`),
  KEY `teamresource_ibfk_2` (`userid`),
  KEY `teamresource_ibfk_1` (`teamid`),
  CONSTRAINT `teamresource_ibfk_1` FOREIGN KEY (`teamid`) REFERENCES `team` (`id`),
  CONSTRAINT `teamresource_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=312 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teamresource`
--

LOCK TABLES `teamresource` WRITE;
/*!40000 ALTER TABLE `teamresource` DISABLE KEYS */;
INSERT INTO `teamresource` VALUES (11,1,21,NULL),(31,1,41,NULL),(51,1,61,NULL),(61,1,71,NULL),(71,1,81,NULL),(81,1,91,NULL),(91,1,101,NULL),(111,1,121,NULL),(131,1,141,NULL),(141,1,161,NULL),(161,1,171,NULL),(171,1,131,NULL),(181,1,31,NULL),(201,1,191,NULL),(211,1,201,NULL),(221,1,211,NULL),(231,1,221,NULL),(241,1,231,NULL),(251,1,51,NULL),(261,1,251,NULL),(271,1,261,NULL),(281,1,271,NULL),(291,1,281,NULL),(292,2,285,NULL),(293,2,286,NULL),(294,2,288,NULL),(295,2,289,NULL),(296,2,290,NULL),(297,2,291,NULL),(298,3,292,NULL),(299,2,293,NULL),(300,3,294,NULL),(301,3,295,NULL),(302,3,296,NULL),(303,4,297,NULL),(304,3,310,NULL),(305,5,312,NULL),(306,5,313,NULL),(307,2,314,NULL),(308,2,315,NULL),(309,1,13,NULL),(310,1,346,NULL),(311,1,345,NULL);
/*!40000 ALTER TABLE `teamresource` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userdetails`
--

DROP TABLE IF EXISTS `userdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userdetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `roleid` int(11) NOT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `contactno` varchar(20) DEFAULT NULL,
  `accesslevel` int(11) NOT NULL DEFAULT '1',
  `verified` tinyint(1) NOT NULL DEFAULT '0',
  `createddate` datetime NOT NULL,
  `editdate` datetime DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `USERID` (`userid`),
  KEY `userdetails_ibfk_1` (`userid`),
  KEY `userdetails_ibfk_3` (`roleid`),
  KEY `userdetails_ibfk_2_idx` (`accesslevel`),
  CONSTRAINT `userdetails_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`),
  CONSTRAINT `userdetails_ibfk_2` FOREIGN KEY (`accesslevel`) REFERENCES `permission` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `userdetails_ibfk_3` FOREIGN KEY (`roleid`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=298 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userdetails`
--

LOCK TABLES `userdetails` WRITE;
/*!40000 ALTER TABLE `userdetails` DISABLE KEYS */;
INSERT INTO `userdetails` VALUES (1,1,1,'Admin','Nisum','0000000000',1,1,'2014-10-16 12:31:43','0000-00-00 00:00:00',1),(11,11,2,'Srikanth','Kata','9999999999',3,1,'2014-10-21 08:21:05','2015-02-24 19:41:59',1),(13,13,3,'Sandeep','Gaddam','8977300894',2,1,'2014-10-21 11:09:03','2015-02-06 17:16:05',1),(21,21,3,'Ramesh','Polishetti','9701181405',1,0,'2014-10-26 08:45:50','0000-00-00 00:00:00',1),(31,31,3,'Mahesh','Dontula','9966658030',1,0,'2014-10-26 17:00:46','2014-10-30 12:14:46',1),(41,41,3,'Marathi','Grishma','8886084000',1,0,'2014-10-27 04:42:05','0000-00-00 00:00:00',1),(51,51,3,'Manoj','Thakur','8885638287',1,0,'2014-10-27 04:43:10','2014-11-15 08:04:28',1),(61,61,3,'Venkatesh','Marugalla','9030389822',1,0,'2014-10-27 04:52:41','0000-00-00 00:00:00',1),(71,71,3,'Srinivas','Ellandula','7675878984',1,0,'2014-10-27 08:35:58','0000-00-00 00:00:00',1),(81,81,3,'saikumar','ponnuru','9032870245',1,0,'2014-10-27 08:46:05','0000-00-00 00:00:00',1),(91,91,3,'Gangadhar','Vuyyuru','9000418660',1,0,'2014-10-27 11:43:29','0000-00-00 00:00:00',1),(101,101,3,'Vanava Raju','Adabala','9985558369',1,0,'2014-10-27 13:46:37','0000-00-00 00:00:00',1),(111,111,2,'ROOP','PADALA','9542323033',1,1,'2014-10-28 09:57:12','2015-09-21 11:35:57',1),(121,121,3,'Sowjanya','Kopella','9494914446',1,0,'2014-10-28 10:15:57','0000-00-00 00:00:00',1),(131,131,3,'Arti','Agrawal','1231231234',1,0,'2014-10-28 11:24:45','2014-10-30 08:44:47',0),(141,141,3,'Raviteja','Panchagnula','9492538028',1,0,'2014-10-29 10:05:00','2014-11-20 11:58:36',1),(151,161,3,'shiva shankar','Audam','8886867695',1,0,'2014-10-29 10:06:22','0000-00-00 00:00:00',1),(161,171,3,'BAKKU PAVAN','KUMAR','7386684307',1,0,'2014-10-30 05:50:00','0000-00-00 00:00:00',1),(171,181,1,'premchand','Anubrolu','1111111111',1,1,'2014-10-30 22:47:59','0000-00-00 00:00:00',1),(181,191,3,'RamaRao','R','9849352892',1,0,'2014-11-04 09:44:39','0000-00-00 00:00:00',0),(191,201,3,'Ramesh','Meduri','9492877162',1,0,'2014-11-04 09:54:24','0000-00-00 00:00:00',0),(201,211,3,'Keerthi','Inavole','1111111111',1,0,'2014-11-04 10:31:14','0000-00-00 00:00:00',0),(211,221,3,'VENKATA SAIKIRAN','KOKKU','8121417187',1,0,'2014-11-04 11:33:57','0000-00-00 00:00:00',1),(221,231,3,'venkata sai kiran','kokku','8121417187',1,0,'2014-11-07 06:50:29','0000-00-00 00:00:00',1),(231,241,2,'Srinivas','Gangapurkar','4088585674',3,1,'2014-11-20 00:00:32','0000-00-00 00:00:00',1),(241,251,3,'Srikanth','Guntha','9908268257',1,0,'2014-11-24 14:18:03','0000-00-00 00:00:00',1),(251,261,3,'Naresh Kumar','Renukuntla','9700228104',1,0,'2014-12-01 07:16:52','0000-00-00 00:00:00',1),(261,271,3,'Vamsi','K','9160052728',1,0,'2014-12-18 06:44:49','0000-00-00 00:00:00',0),(271,281,3,'swathi','sangireddy','9493140100',1,0,'2014-12-19 05:35:22','0000-00-00 00:00:00',1),(272,282,4,'Executive','Manager','9999988888',3,1,'2015-01-22 17:16:07',NULL,1),(273,283,2,'hub','hub','1231231231',3,1,'2015-01-22 19:15:14',NULL,1),(274,284,2,'SDP','SDP','987987897897',3,1,'2015-01-22 19:16:35',NULL,1),(275,285,3,'hubuser','hubuser','1234567890',1,0,'2015-01-22 19:57:20',NULL,1),(276,286,3,'Goutham','Thiyyagura','8886866666',1,0,'2015-01-29 12:24:30',NULL,1),(277,287,2,'qa','qa','1234567890',3,1,'2015-01-29 12:55:28',NULL,1),(278,288,3,'Eswar','Ambati','8886866666',1,0,'2015-01-29 14:27:43',NULL,1),(279,289,3,'Ramadevi','Yarram','8886866666',1,0,'2015-01-29 14:35:53',NULL,1),(280,290,3,'Durga','Devarapalli','8886866666',1,0,'2015-01-29 14:36:53',NULL,1),(281,291,3,'Srikanth','Tatipalli','8886866666',1,0,'2015-01-29 14:37:40',NULL,1),(282,292,3,'Raghavendra','Sudineni','8886866666',1,0,'2015-01-29 14:40:32',NULL,1),(283,293,3,'Shashi','Valabhoju','8886866666',1,0,'2015-01-29 14:54:46',NULL,1),(284,294,3,'Naresh','Kodumoori','8886866666',1,0,'2015-01-29 15:08:40',NULL,1),(285,295,3,'Madhurima','Vadlamudi','8886866666',1,0,'2015-01-29 15:15:21',NULL,1),(286,296,3,'Rajesh','Thimmani','8886866666',1,0,'2015-01-29 15:21:01',NULL,1),(287,297,3,'Thejaswi','Vemula','8886866666',1,0,'2015-01-29 15:35:27',NULL,1),(288,310,3,'Ramesh','Aragala','8886866666',1,0,'2015-01-29 20:11:30',NULL,1),(289,311,2,'WBQE','WBQE','9999999999',3,1,'2015-02-03 15:14:33',NULL,1),(290,312,3,'Jyotsna','Cattamanchi','1111111111',1,0,'2015-02-03 15:18:41',NULL,1),(291,313,3,'Hymavathi','Maradani','1111111111',1,0,'2015-02-03 15:19:19',NULL,1),(292,314,3,'Sukumar','Vulupala','1111111111',1,0,'2015-02-03 15:22:23',NULL,1),(293,315,3,'Ramesh','Kommanaveni','1111111111',1,0,'2015-02-03 15:23:13',NULL,1),(294,345,3,'Shaik','Nayeem','9885255404',3,1,'2015-09-21 12:50:26','2015-09-21 17:22:04',1),(295,346,3,'Venkatesh','A','7842803071',1,0,'2015-09-21 14:04:54','2015-09-26 17:24:59',1),(297,352,2,'UI','Manager','7897897890',3,1,'2015-09-22 17:32:34',NULL,1);
/*!40000 ALTER TABLE `userdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=354 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@nisum.com','4cfbcc71025a82f6495ceb2f9f1be245a23f47cd'),(11,'skata@nisum.com','bb41f514afcbbc6bdc6fba201d92c610d9ef9763'),(13,'sgaddam@nisum.com','6c1f9442a69c8f5ba461f7b853a329c2c949c620'),(21,'rpolishetti@nisum.com','957b8cb5f7717357e6faa369a9a5ebef7af1a329'),(31,'mdontula@nisum.com','d8ec06b217d6c087fe7c00736fb00ec2b6632620'),(41,'gmarathi@nisum.com','bf373d82bd51735af9dcfbe4e5126a946c992e91'),(51,'mthakur@nisum.com','7c4a8d09ca3762af61e59520943dc26494f8941b'),(61,'vmarugalla@nisum.com','3c20e4347da9d6afceae3951bc42ee8441965240'),(71,'sellandula@nisum.com','f4c9cf8076fb344d65f2c6644b27924c9846f075'),(81,'sponnuru@nisum.com','beb557bc004f7419582a8acd9cc2d5c4b58661f1'),(91,'gvuyyuru@nisum.com','0820b32b206b7352858e8903a838ed14319acdfd'),(101,'vadabala@nisum.com','b10ddc955cb87d230d926d27d0f7c31137b22df6'),(111,'rpadala@nisum.com','e2187aee974340fd1d4c0bf346605ff3f5c973de'),(121,'skopella@nisum.com','9e92a27113911972bf84598d5606f1eddd33aa33'),(131,'aagrawal@nisum.com','8cb2237d0679ca88db6464eac60da96345513964'),(141,'rpanchagnula@nisum.com','a544daf30513173d8f5c759fc84ce65ad7506c3a'),(161,'saudam@nisum.com','c06e57df68b263562d67e149c5b45305d354e9a7'),(171,'pbakku@nisum.com','ad68bd0f9cdc915aa47979f2391096dcd9b1479a'),(181,'panubrolu@nisum.com','a544daf30513173d8f5c759fc84ce65ad7506c3a'),(191,'rrouthu@nisum.com','e17e5425a021224b63e91499ff8ac491c87567db'),(201,'rmeduri@nisum.com','8bec631ca5bdb048f76bad48e624776b2534cff7'),(211,'kinavole@nisum.com','15bda94f548ef8d74c11f30e1fdacc382f6a99dd'),(221,'skokku@nisum.com','34fb2c722e4306185cebeefbc6243de6fb2ff37a'),(231,'vkokku@nisum.com','34fb2c722e4306185cebeefbc6243de6fb2ff37a'),(241,'sgangapurkar@nisum.com','17d67bf26ca5a6e89d6f68c8f3dbbd93e60dd855'),(251,'sguntha@nisum.com','c3bc6e42b85fd053c7638a702879d15758db28e2'),(261,'nrenukuntla@nisum.com','668342616861496f68c996b6cde980b96e116178'),(271,'vkadapa@nisum.com','37a8959018dbdb0600a2875a21e6bdce7ab2b571'),(281,'ssangireddy@nisum.com','07594a5fdd7fe629959dd1a774bd7033197b60c0'),(282,'executive@nisum.com','e4fc1aedc88924a3f5bfda67c89a09a0260fa293'),(283,'hub@nisum.com','65acf0a7ced564a4880cf946224e60b745d3d631'),(284,'sdp@nisum.com','0f4e4c91a3ad3877c26ed7307da66d1535a06763'),(285,'hubuser@nisum.com','5be1680521c4cd705cf447ebf470367de91cb4ed'),(286,'ntiyyagura@nisum.com','33a3209c0b0dd18240bd5de5819186e4ab6cd8ba'),(287,'qa@nisum.com','d005c6b3d3577648d327eaec2586e3b0e5f6393d'),(288,'eambati@nisum.com','f6b7c7ac760c0aeb6c64e61652aa5b089c2ee2ec'),(289,'ryarram@nisum.com','aeb7d8b263d8e9522f21d39e69362b711e10adaf'),(290,'ddevarapalli@nisum.com','19b5f3f82a3f0349a2b2a032d05585f26a82e389'),(291,'statipalli@nisum.com','3a0e80a90d5bd72f7d0c4f3a556c7f3dd8e8cfd9'),(292,'rsudineni@nisum.com','6bd6714a90a815ba048b5466f5b871ba09aa317c'),(293,'svalaboju@nisum.com','9c842689559fa16683f461c4717a35e1cd324799'),(294,'nkodumoori@nisum.com','d8403626e2f65fd05bec09150abc562943426b12'),(295,'mvadlamudi@nisum.com','8bc7ec96748d2aec7cc5aa6fc7b4730549525f47'),(296,'rthimmani@nisum.com','44bd61e68b12d66e90ea8816f95bd295fe00fb7e'),(297,'tvemula@nisum.com','423b7e5971bd0353e9791294e81eb8beaede0b7d'),(310,'raragala@nisum.com','47e75133f124df7cb480cc33deee9ea047d9ca04'),(311,'WBQE@nisum.com','6df33559d33b3e84380e8b8bce594f3dba60611a'),(312,'jcattamanchi@nisum.com','844522d3c347fec35f9ec205bb6466b781cf6761'),(313,'hmaradani@nisum.com','926ce686e55027d9ef7197e254e3d8c8773356ea'),(314,'svulupala@nisum.com','fff0e6568fad5e4847efe7b858f1b55072e978f0'),(315,'rkommanaveni@nisum.com','0cbf3972d98d152d61c48226da6180ae730a18a7'),(345,'snayeem@nisum.com','962b4b6248578487f843bec648d0465637135491'),(346,'vadigicherla@nisum.com','55fc708776c294a2e15f9cc24fca3247af94e3bf'),(352,'ui@nisum.com','393673de65f7cee395cb817d9c6fc3c5d227060a');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'osiplanner'
--

--
-- Dumping routines for database 'osiplanner'
--
/*!50003 DROP PROCEDURE IF EXISTS `accesstoproject` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `accesstoproject`(IN _projectid int(11), IN _teamId int(11))
    COMMENT 'give access to project'
BEGIN
START TRANSACTION;  
	IF EXISTS (SELECT *  FROM projectpermission WHERE teamid = _teamId AND projectid = _projectid)
	THEN
		UPDATE projectpermission SET active = 1 WHERE teamid = _teamId AND projectid = _projectid;
	ELSE 
	    INSERT INTO projectpermission (projectid, teamid, createddate) VALUES (_projectid, _teamId, now());
    END IF;
COMMIT;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `editmyproject` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `editmyproject`(IN `_projectId` INT(11), IN `_teamId` VARCHAR(50))
    COMMENT 'add r edit projects from my view'
BEGIN
START TRANSACTION;  	
	IF EXISTS (SELECT *  FROM `osiplanner`.`myprojects` WHERE teamid = _teamId and projectid = _projectId)	
        THEN
		UPDATE `osiplanner`.`myprojects` SET active = true, editdate = NOW() WHERE teamid = _teamId and projectid = _projectId;	
	ELSE 
	    INSERT INTO `osiplanner`.`myprojects`(projectid, teamid, createddate) VALUES  (_projectId, _teamId, now());
    END IF;	
COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `edituserdetails` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `edituserdetails`(IN `_id` INT(11), IN `_roleId` INT(11), IN `_firstName` VARCHAR(50), IN `_lastName` VARCHAR(50), IN `_contact` VARCHAR(20), IN `_teamId` INT(11))
    COMMENT 'EDIT USER DETAILS'
BEGIN
START TRANSACTION;      
    UPDATE userdetails SET roleid = _roleId, firstname = _firstName, lastname = _lastName, contactno = _contact, editdate = now() WHERE userid = _id;
    IF EXISTS (SELECT *  FROM teamresource WHERE userid = _id)  
        THEN
        IF _teamId > 0 THEN
            UPDATE teamresource SET teamid = _teamId WHERE userid = _id;
        ELSE
            DELETE FROM teamresource WHERE userid = _id;
        END IF; 
    ELSEIF _teamId > 0 THEN
            INSERT INTO teamresource(teamid, userid) VALUES  (_teamId, _id);
    END IF; 
COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `mapuser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `mapuser`(IN _teamId int(11), IN _userId int(11), IN _desc varchar(50) )
    COMMENT 'map user to team'
BEGIN
START TRANSACTION;  
	IF EXISTS (SELECT *  FROM teamresource WHERE userid = _userId)
	THEN
		UPDATE teamresource SET teamid = _teamId, description = _desc WHERE userid = _userId;
	ELSE 
	    INSERT INTO teamresource(teamid, userid, description) VALUES  (_teamId, _userId, _desc);
    END IF;
COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `removeaccesstoproject` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `removeaccesstoproject`(IN _projectid int(11), IN _teamId int(11))
    COMMENT 'remove access to project'
BEGIN
START TRANSACTION;  
	UPDATE projectpermission SET  active = 0 WHERE projectid = _projectid AND teamid = _teamId;
	UPDATE myprojects SET  active = 0 WHERE projectid = _projectid AND teamid = _teamId;
COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `removeproject` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `removeproject`(IN _projectId int(11), IN _teamId int(11))
    COMMENT 'remove project from myprojects and project permissions table'
BEGIN
START TRANSACTION;  
  UPDATE myprojects SET active=false, editdate = now() WHERE projectid = _projectId;
  UPDATE projectpermission SET active = false WHERE projectid = _projectId AND teamid = _teamId;
COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `removestory` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `removestory`(IN `_storyId` INT(11), IN `_userId` INT(11))
    COMMENT 'remove story and all sub tasks'
BEGIN
START TRANSACTION;  
  UPDATE task SET active = 0, createdby = _userId WHERE storyid = _storyId;
  UPDATE story SET active = 0, createdby = _userId WHERE id = _storyId; 
COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `saveuser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `saveuser`(IN `_name` VARCHAR(50), IN `_password` VARCHAR(50), IN `_roleId` INT(11), IN `_firstName` VARCHAR(50), IN `_lastName` VARCHAR(50), IN `_contact` VARCHAR(20), IN `_teamId` INT(11))
    COMMENT 'saving user n user datails'
BEGIN

declare _userId int(11); 
declare _accessLevel int(11); 

START TRANSACTION;  

	INSERT INTO users(username ,password ) VALUES (_name, _password);

	SET _userId = LAST_INSERT_ID();
    SET _accessLevel = 1;

IF _roleId = 4 OR _roleId = 2   THEN
        SET _accessLevel = 3;        
    END IF;
    
    INSERT INTO userdetails(userid, roleid, firstname, lastname, contactno, createddate,accesslevel) VALUES (_userId, _roleId, _firstName, _lastName, _contact, now(),_accessLevel);
    
	

	IF _teamId > 0 THEN

		INSERT INTO teamresource(teamid, userid) VALUES  (_teamId, _userId);  

    END IF;

COMMIT;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `storycompleted` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `storycompleted`(IN `_storyId` INT(11), IN `_userId` INT(11))
    COMMENT 'remove story and all sub tasks'
BEGIN


START TRANSACTION;  


  UPDATE task SET status = 2, createdby = _userId WHERE storyid = _storyId;


  UPDATE story SET status = 2, createdby = _userId WHERE id = _storyId; 


COMMIT;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-10-01 12:26:35
