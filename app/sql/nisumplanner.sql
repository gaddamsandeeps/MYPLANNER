CREATE DATABASE  IF NOT EXISTS `nisumplanner` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `nisumplanner`;
-- MySQL dump 10.13  Distrib 5.6.17, for Win64 (x86_64)
--
-- Host: 10.10.10.36    Database: nisumplanner
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `executiveteams`
--

LOCK TABLES `executiveteams` WRITE;
/*!40000 ALTER TABLE `executiveteams` DISABLE KEYS */;
INSERT INTO `executiveteams` VALUES (8,241,1,1,'2015-01-22',NULL,1),(9,282,1,1,'2015-01-22',NULL,1),(10,282,2,1,'2015-01-22',NULL,1),(11,282,3,1,'2015-01-22',NULL,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iteration`
--

LOCK TABLES `iteration` WRITE;
/*!40000 ALTER TABLE `iteration` DISABLE KEYS */;
INSERT INTO `iteration` VALUES (101,1425,'','2014-12-31','2015-01-13',1,'2015-01-05 08:39:11',NULL,1),(111,1426,'','2015-01-14','2015-01-27',1,'2015-01-09 06:34:35',NULL,1);
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
  KEY `projectid` (`projectid`),
  KEY `userid` (`userid`),
  KEY `loggeduser` (`loggeduser`),
  KEY `loghistory_ibfk_4` (`storystatus`),
  KEY `loghistory_ibfk_5` (`status`),
  KEY `loghistory_ibfk_6` (`task`),
  KEY `loghistory_ibfk_7` (`teamid`),
  KEY `loghistory_ibfk_8_idx` (`story`),
  KEY `loghistory_ibfk_9_idx` (`iteration`),
  CONSTRAINT `loghistory_ibfk_1` FOREIGN KEY (`projectid`) REFERENCES `project` (`id`),
  CONSTRAINT `loghistory_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `users` (`id`),
  CONSTRAINT `loghistory_ibfk_3` FOREIGN KEY (`loggeduser`) REFERENCES `users` (`id`),
  CONSTRAINT `loghistory_ibfk_4` FOREIGN KEY (`storystatus`) REFERENCES `storystatus` (`id`),
  CONSTRAINT `loghistory_ibfk_5` FOREIGN KEY (`status`) REFERENCES `logstatus` (`id`),
  CONSTRAINT `loghistory_ibfk_6` FOREIGN KEY (`task`) REFERENCES `task` (`id`),
  CONSTRAINT `loghistory_ibfk_7` FOREIGN KEY (`teamid`) REFERENCES `team` (`id`),
  CONSTRAINT `loghistory_ibfk_8` FOREIGN KEY (`story`) REFERENCES `story` (`id`),
  CONSTRAINT `loghistory_ibfk_9` FOREIGN KEY (`iteration`) REFERENCES `iteration` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loghistory`
--

LOCK TABLES `loghistory` WRITE;
/*!40000 ALTER TABLE `loghistory` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=366 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logs`
--

LOCK TABLES `logs` WRITE;
/*!40000 ALTER TABLE `logs` DISABLE KEYS */;
INSERT INTO `logs` VALUES (1,31,NULL,NULL,NULL,NULL,'2015-01-05 12:00:00','2015-01-05 13:59:00','2015-01-05 12:00:00','2015-01-05 14:00:00',1,13,13,'Update App.Testing app','2015-01-05 08:29:26',NULL,2),(11,41,101,131,NULL,3,'2015-01-05 11:45:00','2015-01-05 14:30:00',NULL,NULL,1,91,91,'BCOM: Loyallist Point Table in Checkout: Adds Loyallist ID in Checkout','2015-01-05 08:42:13',NULL,1),(21,13,101,151,NULL,11,'2015-01-05 11:15:00','2015-01-05 15:30:00',NULL,NULL,1,141,141,'Working on the defect','2015-01-05 08:52:04',NULL,1),(31,121,101,91,NULL,3,'2015-01-05 11:00:00','2015-01-05 20:00:00','2015-01-05 11:00:00','2015-01-05 19:30:00',1,161,161,'Working on backbone app','2015-01-05 09:00:10',NULL,2),(41,13,101,41,NULL,2,'2015-01-05 10:10:00','2015-01-05 19:08:00','2015-01-05 10:30:00','2015-01-05 19:10:00',1,81,81,'reviewed the code changes','2015-01-05 12:39:31',NULL,2),(51,121,NULL,NULL,NULL,NULL,'2015-01-06 10:35:00','2015-01-06 19:35:00','2015-01-06 10:35:00','2015-01-06 19:48:00',1,231,231,'Self Learning on Backbone.js','2015-01-06 05:13:11',NULL,2),(61,41,101,171,NULL,3,'2015-01-06 11:30:00','2015-01-06 12:30:00',NULL,NULL,1,91,91,'Remove Loyallist Order Confirmation Informational Text Killswitch','2015-01-06 06:03:23',NULL,1),(71,41,101,131,NULL,3,'2015-01-06 12:30:00','2015-01-06 16:30:00',NULL,NULL,1,91,91,'BCOM: Loyallist Point Table in Checkout: Adds Loyallist ID in Checkout (Working on Scenarios for checkout)','2015-01-06 06:04:37',NULL,1),(81,13,101,151,NULL,11,'2015-01-05 15:30:00','2015-01-05 17:30:00','2015-01-05 16:00:00','2015-01-05 18:50:00',1,141,141,'testing and committing','2015-01-06 06:20:29',NULL,2),(91,13,101,61,51,12,'2015-01-06 11:00:00','2015-01-06 17:00:00',NULL,NULL,1,41,41,'working on 3466 updating urls.','2015-01-06 06:30:32',NULL,1),(101,13,101,31,NULL,12,'2015-01-06 10:30:00','2015-01-06 12:00:00',NULL,NULL,1,41,41,'Was on Call','2015-01-06 06:37:52',NULL,1),(111,121,NULL,NULL,NULL,NULL,'2015-01-06 10:30:00','2015-01-06 19:00:00','2015-01-06 10:30:00','2015-01-06 18:00:00',1,171,171,'Backbone self Training','2015-01-06 09:39:53',NULL,2),(121,151,NULL,NULL,NULL,NULL,'2015-01-06 11:00:00','2015-01-06 23:30:00','2015-01-06 11:00:00','2015-01-06 11:30:00',1,141,141,'Call with onsite','2015-01-06 10:07:17',NULL,2),(131,13,101,161,NULL,11,'2015-01-06 11:30:00','2015-01-06 13:00:00','2015-01-06 11:30:00','2015-01-06 14:30:00',1,141,141,'Analyzing and working on the defect','2015-01-06 10:10:26',NULL,2),(141,13,101,191,NULL,3,'2015-01-06 14:30:00','2015-01-06 19:30:00','2015-01-06 14:30:00','2015-01-06 19:30:00',1,141,141,'','2015-01-06 14:51:36',NULL,2),(151,121,NULL,NULL,NULL,NULL,'2015-01-07 10:40:00','2015-01-07 19:40:00','2015-01-07 10:40:00','2015-01-07 19:50:00',1,231,231,'Self learning on backbone.js','2015-01-07 05:12:42',NULL,2),(161,41,101,131,NULL,3,'2015-01-07 11:00:00','2015-01-07 15:00:00',NULL,NULL,1,91,91,'Working on scenarios for updating table upon entering (PromoCode, Offers & Reward Cards)','2015-01-07 05:47:36',NULL,1),(171,41,101,201,NULL,3,'2015-01-07 15:00:00','2015-01-07 16:00:00',NULL,NULL,1,91,91,'BCOM: Coremetrics: Pre-Purchase Point Calculation Checkout','2015-01-07 05:51:07',NULL,1),(181,31,101,101,NULL,3,'2015-01-07 11:30:00','2015-01-07 20:30:00',NULL,NULL,1,21,21,'Working on require modules integration. ','2015-01-07 06:32:50',NULL,1),(191,121,NULL,NULL,NULL,NULL,'2015-01-07 11:00:00','2015-01-07 20:00:00','2015-01-07 11:00:00','2015-01-07 20:00:00',1,171,171,'Backbone self training','2015-01-07 09:15:53',NULL,2),(201,13,101,31,NULL,3,'2015-01-07 11:20:00','2015-01-07 14:30:00','2015-01-07 11:20:00','2015-01-07 14:30:00',1,121,121,'Writing specs for loyalty confirm','2015-01-07 09:53:53',NULL,2),(211,121,101,91,NULL,1,'2015-01-07 11:00:00','2015-01-07 19:00:00','2015-01-07 11:00:00','2015-01-07 19:00:00',1,161,161,'Working on backbone App','2015-01-07 12:25:26',NULL,2),(221,121,101,91,NULL,1,'2015-01-06 11:00:00','2015-01-06 19:30:00','2015-01-06 11:00:00','2015-01-06 19:30:00',1,161,161,'Working on backbone App','2015-01-07 12:29:08',NULL,2),(231,121,NULL,NULL,NULL,NULL,'2015-01-08 09:30:00','2015-01-08 18:30:00','2015-01-08 09:30:00','2015-01-08 18:30:00',1,171,171,'Backbone self training','2015-01-08 03:35:16',NULL,2),(241,121,NULL,NULL,NULL,NULL,'2015-01-08 10:40:00','2015-01-08 19:40:00','2015-01-08 10:40:00','2015-01-08 19:40:00',1,231,231,'Self Learning on backbone.js -Implementation of CRUD operations using requirejs and Handlebars','2015-01-08 05:12:12',NULL,2),(251,13,101,191,NULL,3,'2015-01-07 14:00:00','2015-01-07 19:29:00','2015-01-07 14:00:00','2015-01-07 19:30:00',1,141,141,'','2015-01-08 06:00:11',NULL,2),(261,13,101,211,NULL,11,'2015-01-07 11:15:00','2015-01-07 13:15:00','2015-01-07 11:15:00','2015-01-07 13:00:00',1,141,141,'working on the defect','2015-01-08 06:03:35',NULL,2),(271,121,101,91,NULL,1,'2015-01-08 11:00:00','2015-01-08 19:00:00','2015-01-08 11:00:00','2015-01-08 19:00:00',1,161,161,'Working on backbone app','2015-01-08 13:31:14',NULL,2),(281,121,NULL,NULL,NULL,NULL,'2015-01-09 11:00:00','2015-01-09 20:00:00','2015-01-09 11:00:00','2015-01-09 20:04:00',1,231,231,'Self Learning on backbone.js,Handlebars-- Some modifications in the CRUD operations app','2015-01-09 05:33:06',NULL,2),(291,13,101,61,51,3,'2015-01-09 10:40:00','2015-01-09 18:00:00',NULL,NULL,1,131,131,'working on ajax call response is not coming property. ','2015-01-09 05:45:35',NULL,1),(301,31,101,101,NULL,3,'2015-01-09 11:00:00','2015-01-09 20:00:00','2015-01-09 11:00:00','2015-01-09 20:00:00',1,21,21,'working on validations','2015-01-09 05:57:30',NULL,2),(311,13,101,211,NULL,11,'2015-01-08 11:00:00','2015-01-08 13:00:00','2015-01-08 11:00:00','2015-01-08 13:00:00',1,141,141,'working on the defect','2015-01-09 06:01:42',NULL,2),(321,121,101,91,NULL,3,'2015-01-09 11:00:00','2015-01-09 20:00:00','2015-01-09 11:00:00','2015-01-09 19:30:00',1,161,161,'Working on backbone app, Self training','2015-01-09 06:21:23',NULL,2),(331,121,NULL,NULL,NULL,NULL,'2015-01-09 09:45:00','2015-01-09 18:45:00','2015-01-09 09:45:00','2015-01-09 18:45:00',1,171,171,'Backbone self training','2015-01-09 07:03:59',NULL,2),(341,31,NULL,NULL,NULL,NULL,'2015-01-09 12:00:00','2015-01-09 15:51:00','2015-01-09 12:00:00','2015-01-09 15:51:00',1,13,13,'moved nisum planner from CF to intranet ','2015-01-09 15:52:14','2015-01-09 18:10:47',3),(342,31,101,1,1,4,'2014-12-31 18:07:00','2014-12-31 18:09:00',NULL,NULL,1,13,13,'testing from mobile','2015-01-09 18:09:35',NULL,1),(343,31,101,1,1,2,'2015-01-09 18:10:00','2015-01-09 19:10:00','2015-01-09 18:57:00','2015-01-09 19:55:00',1,13,13,'test','2015-01-09 18:11:02',NULL,2),(344,31,101,101,NULL,1,'2015-01-10 10:00:00','2015-01-10 18:41:00',NULL,NULL,1,21,21,'dsd','2015-01-09 18:42:18',NULL,1),(345,31,101,1,1,4,'2015-01-08 18:59:00','2015-01-08 19:00:00','2015-01-08 19:00:00','2015-01-08 19:01:00',1,13,13,'testing func','2015-01-09 19:00:47',NULL,2),(346,31,NULL,NULL,NULL,NULL,'2015-01-12 11:00:00','2015-01-12 18:00:00','2015-01-12 11:00:00','2015-01-12 18:00:00',1,13,13,'Working on issues','2015-01-12 13:28:09',NULL,2),(347,121,NULL,NULL,NULL,NULL,'2015-01-12 09:30:00','2015-01-12 18:30:00',NULL,NULL,1,171,171,'Backbone self training','2015-01-12 14:26:32',NULL,1),(348,121,101,91,NULL,1,'2015-01-12 11:00:00','2015-01-12 19:00:00','2015-01-12 11:00:00','2015-01-12 19:30:00',1,161,161,'Working on backbone app, and mew setup','2015-01-12 15:59:16',NULL,2),(349,121,NULL,NULL,NULL,NULL,'2015-01-12 10:40:00','2015-01-12 19:40:00','2015-01-12 10:40:00','2015-01-12 19:55:00',1,231,231,'Self learning on jquery - practised jquery ajax methods. set up macys environment in the local ','2015-01-12 19:56:18',NULL,2),(350,121,111,91,NULL,1,'2015-01-13 11:00:00','2015-01-13 19:30:00','2015-01-13 11:00:00','2015-01-13 19:30:00',1,161,161,'Working on backbone app, Self training','2015-01-13 19:10:18',NULL,2),(351,121,NULL,NULL,NULL,NULL,'2015-01-13 10:50:00','2015-01-13 19:50:00','2015-01-13 10:50:00','2015-01-13 19:50:00',1,231,231,'Environment set up and running the project','2015-01-13 19:42:25',NULL,2),(352,121,111,91,NULL,1,'2015-01-14 10:45:00','2015-01-14 19:00:00','2015-01-14 10:45:00','2015-01-14 18:30:00',1,161,161,'Working on backbone marionette, backbone relational and working on nisum planner','2015-01-14 11:02:40',NULL,2),(353,121,111,91,NULL,1,'2015-01-16 10:45:00','2015-01-16 19:00:00','2015-01-16 10:45:00','2015-01-16 19:00:00',1,161,161,'Working on backbone app, Self training','2015-01-16 14:07:57',NULL,2),(354,121,NULL,NULL,NULL,NULL,'2015-01-16 11:13:00','2015-01-16 20:13:00','2015-01-16 11:13:00','2015-01-16 20:14:00',1,231,231,'self learning on Backbone.js and jQuery Global ajax event handlers ,Helper functions, git commands','2015-01-16 19:58:13',NULL,2),(355,121,NULL,NULL,NULL,NULL,'2015-01-14 10:40:00','2015-01-14 19:40:00','2015-01-14 10:40:00','2015-01-14 18:30:00',1,231,231,'Environment set up , running of app and understanding of code','2015-01-16 20:00:15',NULL,2),(356,31,NULL,NULL,NULL,NULL,'2015-01-19 12:15:00','2015-01-19 15:15:00','2015-01-19 12:16:00','2015-01-19 15:16:00',1,13,13,'Analysing on exe dashboard','2015-01-19 15:17:08',NULL,2),(357,121,NULL,NULL,NULL,NULL,'2015-01-19 10:40:00','2015-01-19 19:40:00','2015-01-19 10:40:00','2015-01-19 19:40:00',1,231,231,'Environment exploring and execution of the application, editing the templates','2015-01-19 19:33:44',NULL,2),(358,31,NULL,NULL,NULL,NULL,'2015-01-20 11:00:00','2015-01-20 19:00:00','2015-01-20 11:00:00','2015-01-20 20:00:00',1,13,13,'Working on e dashboard','2015-01-20 11:52:43',NULL,2),(359,121,NULL,NULL,NULL,NULL,'2015-01-20 11:00:00','2015-01-20 20:58:00','2015-01-20 11:00:00','2015-01-20 20:20:00',1,231,231,'environment exploring - modification of templates,\ndisplaying of overlay','2015-01-20 19:41:47',NULL,2),(360,31,111,101,NULL,1,'2015-01-19 11:00:00','2015-01-19 20:00:00','2015-01-19 11:00:00','2015-01-19 20:00:00',1,161,161,'Working on nisum planner timesheet','2015-01-21 11:42:05',NULL,2),(361,31,111,101,NULL,1,'2015-01-20 11:00:00','2015-01-20 20:00:00','2015-01-20 11:00:00','2015-01-20 20:00:00',1,161,161,'Working on nisum planner timesheet','2015-01-21 11:42:44',NULL,2),(362,31,111,101,NULL,1,'2015-01-21 10:45:00','2015-01-21 20:00:00',NULL,NULL,1,161,161,'Working on nisum planner timesheet','2015-01-21 11:43:52',NULL,1),(363,121,NULL,NULL,NULL,NULL,'2015-01-21 10:50:00','2015-01-21 19:50:00','2015-01-21 10:50:00','2015-01-21 19:56:00',1,231,231,'Implementation of overlay with respect to the flags enable in the environment properties','2015-01-21 19:15:49',NULL,2),(364,31,NULL,NULL,NULL,NULL,'2015-01-22 11:00:00','2015-01-22 19:48:00','2015-01-22 11:00:00','2015-01-22 20:00:00',1,13,13,'Working on e dashboard','2015-01-22 17:50:22',NULL,2),(365,31,NULL,NULL,NULL,NULL,'2015-01-21 11:00:00','2015-01-21 21:49:00','2015-01-21 11:00:00','2015-01-21 21:49:00',1,13,13,'working on e roports','2015-01-22 17:50:56',NULL,2);
/*!40000 ALTER TABLE `logs` ENABLE KEYS */;
UNLOCK TABLES;

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
  UNIQUE KEY `projectid_2` (`projectid`),
  KEY `projectid` (`projectid`),
  KEY `teamid` (`teamid`),
  CONSTRAINT `myprojects_ibfk_1` FOREIGN KEY (`projectid`) REFERENCES `project` (`id`),
  CONSTRAINT `myprojects_ibfk_2` FOREIGN KEY (`teamid`) REFERENCES `team` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=182 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `myprojects`
--

LOCK TABLES `myprojects` WRITE;
/*!40000 ALTER TABLE `myprojects` DISABLE KEYS */;
INSERT INTO `myprojects` VALUES (3,13,1,'2014-10-21 11:18:19','2014-12-18 09:36:06',1),(11,31,1,'2014-10-22 10:24:30','2014-12-18 09:35:34',1),(21,23,1,'2014-10-27 19:06:25','2014-11-17 06:27:33',0),(31,41,1,'2014-10-27 19:07:09','2014-11-30 07:36:39',1),(41,51,1,'2014-10-28 10:36:05','2014-11-30 07:33:49',1),(51,61,1,'2014-10-28 10:37:06','2014-11-30 07:37:46',1),(61,71,1,'2014-10-28 10:37:41','2014-11-30 07:35:07',1),(71,81,1,'2014-10-28 10:38:28','2014-12-11 06:28:31',0),(81,91,1,'2014-10-28 10:38:42','2014-11-20 13:44:17',0),(91,3,1,'2014-10-30 14:16:49','2014-10-31 08:01:43',0),(101,101,1,'2014-11-03 15:04:54','2014-11-20 13:43:50',0),(111,111,1,'2014-11-04 10:33:26','2014-11-14 07:11:18',0),(121,121,1,'2014-11-04 10:38:20','2014-11-20 14:04:59',0),(131,151,1,'2014-11-11 10:47:29','2014-11-11 11:01:50',0),(141,141,1,'2014-11-12 15:40:50','2014-12-18 09:16:44',0),(151,161,1,'2014-11-12 16:13:48','2014-11-20 14:58:29',0),(161,191,1,'2014-12-11 06:29:18','0000-00-00 00:00:00',1),(171,221,1,'2014-12-26 11:08:00','2014-12-30 13:40:50',1),(181,231,1,'2014-12-31 05:20:34',NULL,1);
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
  `category` int(4) NOT NULL DEFAULT '2',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_index` (`name`,`createdby`),
  KEY `leadid` (`createdby`),
  KEY `teamid` (`teamid`),
  CONSTRAINT `project_ibfk_1` FOREIGN KEY (`createdby`) REFERENCES `users` (`id`),
  CONSTRAINT `project_ibfk_2` FOREIGN KEY (`teamid`) REFERENCES `team` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=232 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (3,'User Profile Improvements (UPI)','BCOM UPI.','2014-10-01','2014-10-31',1,'2014-10-21 11:17:05','2014-11-04 11:53:58',11,2,1),(13,'USL','Loyalty feature for MCOM customers ,','2014-09-01','2015-02-28',1,'2014-10-21 11:18:08','2014-11-13 17:38:08',11,2,1),(23,'Same Day Delivery (SDD)','Same-Day Delivery is a new shipping method added to Checkout Items at MCOM','2014-06-19','2014-11-16',1,'2014-10-21 17:50:53','2014-11-07 07:46:25',11,2,1),(31,'Nisum Planner','Team planner application that provides day-to-day activity details and effort went in to each project.','2014-10-01','2015-12-31',1,'2014-10-22 10:23:49','2014-11-07 07:45:46',11,2,1),(41,'BLM Enhancements','BLM Enhancements - Calculation of Loyallist Points and Reward card when items added/updated/deleted from bag.','2014-10-01','2015-01-31',1,'2014-10-27 12:13:48','2014-11-04 11:53:16',11,2,1),(51,'PayPal Integration','PayPal is a new payment option to the users for MCOM','2014-10-20','2014-12-31',1,'2014-10-28 06:37:46','2014-11-05 10:15:38',11,2,1),(61,'ocWishlist','Wishlist is a updated functionality on shopapp page which shows the user , previously saved lists having favourite products details and allows the user to create new lists and add products to purchase later.','2014-06-14','2014-11-30',1,'2014-10-28 06:38:16','2014-11-14 06:43:04',11,2,1),(71,'ocWallet phase-3','Wallet page site enchancemnets','2014-10-01','2014-12-31',1,'2014-10-28 06:38:46','2014-11-04 11:56:45',11,2,1),(81,'OSI support','OSI related works (OSI, Numera, OCC etc.,)','2014-10-01','2014-12-31',1,'2014-10-28 07:40:19','2014-11-04 11:54:16',11,2,1),(91,'Nisum Website and internal support','','2014-10-01','2014-12-31',1,'2014-10-28 07:40:50','2014-11-04 11:55:37',11,2,1),(101,'Loyalty De-coupling','Loyalty Decouple project','2014-06-01','2014-09-10',1,'2014-11-03 15:04:48','2014-11-04 11:56:09',11,2,1),(111,'Vacation','','2014-11-01','2015-12-31',NULL,'2014-11-04 10:32:35','0000-00-00 00:00:00',1,1,1),(121,'Training','New developers under training. Or, people occupied in any training sessions.','2014-11-01','2015-12-31',1,'2014-11-04 10:38:16','0000-00-00 00:00:00',11,2,1),(131,'SST support',NULL,'2014-11-01','2015-12-31',1,'2014-11-05 11:13:21','0000-00-00 00:00:00',11,2,1),(141,'Code reviews',NULL,'2014-11-01','2015-12-31',1,'2014-11-05 11:37:34','0000-00-00 00:00:00',11,2,1),(151,'Project Meetings','Projects meetings','2014-11-11','2015-12-31',NULL,'2014-11-05 11:38:10','0000-00-00 00:00:00',1,1,1),(161,'CrediApp','Credit Application','2014-11-11','2014-11-29',1,'2014-11-12 16:13:42','2014-11-28 13:12:18',11,2,1),(171,'Absence','Absence',NULL,NULL,NULL,'2014-11-19 06:28:29','0000-00-00 00:00:00',1,1,1),(181,'Team / project planning','','2014-11-24','2015-12-31',1,'2014-11-24 06:39:11','0000-00-00 00:00:00',11,2,1),(191,'Demo','demo proj','2014-12-01','2014-12-31',1,'2014-12-11 06:29:12','0000-00-00 00:00:00',11,2,1),(201,'CCUI','','2014-12-18','2015-05-31',1,'2014-12-18 06:11:07','0000-00-00 00:00:00',11,2,1),(211,'Network outage','','2014-12-01','2015-12-31',1,'2014-12-26 10:25:22',NULL,11,2,1),(221,'Project Blockers','','2014-12-01','2015-12-31',1,'2014-12-26 10:27:43','2014-12-30 13:40:50',11,2,1),(231,'Demo1','demo for manager','2014-12-01','2015-01-31',1,'2014-12-31 05:20:24',NULL,11,2,1);
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
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
  `startdate` date NOT NULL,
  `enddate` date NOT NULL,
  `billable` tinyint(1) NOT NULL,
  `sowno` varchar(256) DEFAULT NULL,
  `createddate` datetime NOT NULL,
  `editdate` datetime DEFAULT NULL,
  `description` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_index` (`projectid`,`userid`),
  KEY `projectresource_ibfk_1` (`projectid`),
  KEY `projectresource_ibfk_2` (`userid`),
  CONSTRAINT `projectresource_ibfk_1` FOREIGN KEY (`projectid`) REFERENCES `project` (`id`),
  CONSTRAINT `projectresource_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1462 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projectresource`
--

LOCK TABLES `projectresource` WRITE;
/*!40000 ALTER TABLE `projectresource` DISABLE KEYS */;
INSERT INTO `projectresource` VALUES (1191,13,131,'2014-10-04','2015-01-03',1,NULL,'2014-11-24 11:41:17','0000-00-00 00:00:00',''),(1211,13,111,'2014-10-04','3015-01-03',1,NULL,'2014-11-30 07:25:48','0000-00-00 00:00:00',''),(1221,13,141,'2014-10-04','2015-01-03',1,NULL,'2014-11-30 07:26:19','0000-00-00 00:00:00',''),(1241,13,101,'2014-10-04','2015-01-03',1,NULL,'2014-11-30 07:31:05','0000-00-00 00:00:00',''),(1251,13,51,'2014-11-17','2015-01-03',1,NULL,'2014-11-30 07:31:27','0000-00-00 00:00:00',''),(1261,13,41,'2014-10-04','3015-01-03',0,NULL,'2014-11-30 07:31:56','0000-00-00 00:00:00',''),(1271,13,81,'2014-09-01','2015-01-03',1,NULL,'2014-11-30 07:32:33','0000-00-00 00:00:00',''),(1281,13,121,'2014-11-10','2015-01-03',0,NULL,'2014-11-30 07:33:26','0000-00-00 00:00:00',''),(1301,51,71,'2014-11-02','2015-01-03',1,NULL,'2014-11-30 07:34:21','0000-00-00 00:00:00',''),(1311,51,31,'2014-11-17','2015-01-03',1,NULL,'2014-11-30 07:34:44','0000-00-00 00:00:00',''),(1321,71,61,'2014-07-05','2015-01-03',1,NULL,'2014-11-30 07:35:48','0000-00-00 00:00:00',''),(1331,51,61,'2014-11-24','2015-01-03',0,NULL,'2014-11-30 07:36:15','0000-00-00 00:00:00',''),(1341,41,91,'2014-11-02','2015-01-31',1,NULL,'2014-11-30 07:37:26','0000-00-00 00:00:00',''),(1361,61,21,'2014-10-05','2015-01-03',1,NULL,'2014-11-30 07:38:15','0000-00-00 00:00:00',''),(1371,61,161,'2014-10-05','2015-01-03',0,NULL,'2014-11-30 07:38:37','0000-00-00 00:00:00',''),(1381,81,191,'2014-09-24','2015-01-31',0,NULL,'2014-11-30 07:40:21','0000-00-00 00:00:00',''),(1391,31,13,'2014-09-01','2014-12-31',0,NULL,'2014-12-02 14:07:50','0000-00-00 00:00:00','Internal Resource management tool'),(1441,191,131,'2014-12-03','2014-12-24',1,NULL,'2014-12-11 06:30:45','0000-00-00 00:00:00','demo'),(1461,231,13,'2014-12-01','2014-12-31',1,NULL,'2014-12-31 05:21:25',NULL,'sample app t');
/*!40000 ALTER TABLE `projectresource` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projectresourcehistory`
--

DROP TABLE IF EXISTS `projectresourcehistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projectresourcehistory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `projectresourceid` int(11) NOT NULL,
  `projectid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `startdate` date NOT NULL,
  `enddate` date NOT NULL,
  `billable` tinyint(1) NOT NULL,
  `sowno` varchar(256) DEFAULT NULL,
  `createddate` datetime NOT NULL,
  `editdate` datetime DEFAULT NULL,
  `description` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `projectresourcehistory_ibfk_1` (`projectid`),
  KEY `projectresourcehistory_ibfk_2` (`userid`),
  CONSTRAINT `projectresourcehistory_ibfk_1` FOREIGN KEY (`projectid`) REFERENCES `project` (`id`),
  CONSTRAINT `projectresourcehistory_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projectresourcehistory`
--

LOCK TABLES `projectresourcehistory` WRITE;
/*!40000 ALTER TABLE `projectresourcehistory` DISABLE KEYS */;
INSERT INTO `projectresourcehistory` VALUES (1,1451,221,131,'2014-12-11','2014-12-12',0,NULL,'2014-12-30 13:40:24',NULL,'test123');
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
  `projectid` int(11) NOT NULL,
  `description` varchar(256) DEFAULT NULL,
  `type` int(11) NOT NULL DEFAULT '1',
  `hours` int(11) DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `createdby` int(11) DEFAULT NULL,
  `createddate` datetime NOT NULL,
  `editdate` datetime DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `projectid_2` (`projectid`,`name`),
  KEY `projectid` (`projectid`),
  KEY `createdby` (`createdby`),
  KEY `story_ibfk_3` (`type`),
  CONSTRAINT `story_ibfk_1` FOREIGN KEY (`projectid`) REFERENCES `project` (`id`),
  CONSTRAINT `story_ibfk_2` FOREIGN KEY (`createdby`) REFERENCES `users` (`id`),
  CONSTRAINT `story_ibfk_3` FOREIGN KEY (`type`) REFERENCES `storytype` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=221 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `story`
--

LOCK TABLES `story` WRITE;
/*!40000 ALTER TABLE `story` DISABLE KEYS */;
INSERT INTO `story` VALUES (1,'Test',31,'testing functionality',1,NULL,1,13,'2014-12-29 08:19:48',NULL,1),(11,'Test1',31,'Test1 - testing app',2,123,1,13,'2014-12-29 08:20:38','2015-01-12 16:53:26',1),(21,'3455',13,'AJAX call to be made to the new method for displaying points on order confirmation page',1,NULL,1,111,'2014-12-29 08:50:26',NULL,1),(31,'3309',13,'UI:Enroll: Set preferences: Signed In: Emails & texts',1,NULL,1,111,'2014-12-29 09:04:14',NULL,1),(41,'3408',13,'UI:Review Order',1,NULL,1,111,'2014-12-29 10:08:50',NULL,1),(51,'3297',13,'UI:Anonymous SI & Guest Enroll: Success: Shop, My Account, & Apply Now',1,NULL,1,111,'2014-12-29 10:09:34',NULL,1),(61,'2970',13,'Assoc USL ID to Macy\'s credit card: from landing page: No CC on profile',1,NULL,1,111,'2014-12-29 10:13:55',NULL,1),(71,'3525',13,'Associate USL ID to Macy\'s credit card',1,NULL,1,111,'2014-12-29 10:17:08',NULL,1),(81,'3524',13,'Associate USL ID to Macy\'s credit card (I)',1,NULL,1,111,'2014-12-29 10:17:51',NULL,1),(91,'Working on backbone app',121,'Self training, and working on backbone app',2,40,1,161,'2014-12-30 06:01:06',NULL,1),(101,'UI development',31,'Develop  modules for page level functionality',2,20,1,13,'2015-01-02 05:46:04','2015-01-12 16:59:24',1),(111,'Defect fixing',31,'To fix defects.',2,25,1,13,'2015-01-02 05:46:38','2015-01-12 16:59:41',1),(121,'D-04421',41,'PPPC module is not displaying in chrome browser in a particular scenario',2,16,1,91,'2015-01-02 06:05:49',NULL,1),(131,'B-03387',41,'BCOM: Loyallist Point Table in Checkout: Adds Loyallist ID in Checkout',1,NULL,1,91,'2015-01-02 06:13:21',NULL,1),(141,'stoeyl',3,'hellos',1,NULL,1,21,'2015-01-04 03:28:28',NULL,1),(151,'3596',13,'Redeem field is not getting highlighted, when user continue checkout with empty redeem field without entering and applying PIN',1,NULL,1,141,'2015-01-05 06:16:19',NULL,1),(161,'3608',13,'UI: Error message is not getting cleared on Payment page',1,NULL,1,111,'2015-01-05 06:26:35',NULL,1),(171,'B-06384',41,'Remove Loyallist Order Confirmation Informational Text Killswitch',1,NULL,1,91,'2015-01-06 05:56:24',NULL,1),(181,'test3',31,'test333',1,NULL,1,21,'2015-01-06 10:29:17','2015-01-08 10:09:02',1),(191,'Ctrl+v validation of lookUp fields',13,'not allowing ctrl+v to paste characters but to allo numbers.',2,20,1,141,'2015-01-06 14:50:09',NULL,1),(201,'B-03410',41,'BCOM: Coremetrics: Pre-Purchase Point Calculation Checkout',1,NULL,1,91,'2015-01-07 05:50:09',NULL,1),(211,'3667',13,'Defect : applied points are seen in order summary section eventhough applying USL points failed',2,8,1,141,'2015-01-08 06:02:45',NULL,1);
/*!40000 ALTER TABLE `story` ENABLE KEYS */;
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
INSERT INTO `storytype` VALUES (1,'Story','Story'),(2,'Task','Task');
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
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `createdby` int(11) DEFAULT NULL,
  `createddate` datetime NOT NULL,
  `editdate` datetime DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `storyid_2` (`storyid`,`name`),
  KEY `storyid` (`storyid`),
  KEY `createdby` (`createdby`),
  CONSTRAINT `task_ibfk_1` FOREIGN KEY (`storyid`) REFERENCES `story` (`id`),
  CONSTRAINT `task_ibfk_2` FOREIGN KEY (`createdby`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (1,'Sub Test',1,'Sub Test - testing app',20,1,13,'2014-12-29 08:20:11',NULL,1),(11,'Details overlay',21,'Add CSS for Loyalty decoupling \"my offers\" overlay in order confirmation page',16,1,111,'2014-12-29 08:57:04','2015-01-22 17:40:02',1),(21,'Jasmine unit testing ',21,'Write test cases for loyalty decoupling functionality',16,1,111,'2014-12-29 08:59:05','2015-01-22 17:40:08',1),(31,'Integration with backend',21,'Work on integrating properties with backend',16,1,111,'2014-12-29 09:00:29',NULL,1),(41,'Integration with backend',51,'Integrate properties provided by shopApp',16,1,111,'2014-12-29 10:10:39',NULL,1),(51,'Ajax call implementation',61,'Make a request to shopApp team with cardID to link USL ID',16,1,111,'2014-12-29 10:16:04',NULL,1),(52,'task2',1,'planned',35,1,21,'2015-01-13 15:44:45',NULL,1);
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES (1,'UI','UI TEAM',11,'2014-10-21 08:22:15','2015-01-22 19:02:15',1,1),(2,'HUB','hub dev team',283,'2015-01-22 19:15:56',NULL,1,1),(3,'SDP','SDP team',284,'2015-01-22 19:17:04',NULL,1,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=292 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teamresource`
--

LOCK TABLES `teamresource` WRITE;
/*!40000 ALTER TABLE `teamresource` DISABLE KEYS */;
INSERT INTO `teamresource` VALUES (3,1,13,NULL),(11,1,21,NULL),(31,1,41,NULL),(51,1,61,NULL),(61,1,71,NULL),(71,1,81,NULL),(81,1,91,NULL),(91,1,101,NULL),(111,1,121,NULL),(131,1,141,NULL),(141,1,161,NULL),(161,1,171,NULL),(171,1,131,NULL),(181,1,31,NULL),(191,1,111,NULL),(201,1,191,NULL),(211,1,201,NULL),(221,1,211,NULL),(231,1,221,NULL),(241,1,231,NULL),(251,1,51,NULL),(261,1,251,NULL),(271,1,261,NULL),(281,1,271,NULL),(291,1,281,NULL);
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
  `sex` varchar(50) DEFAULT NULL,
  `dob` date DEFAULT NULL,
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
  CONSTRAINT `userdetails_ibfk_2` FOREIGN KEY (`accesslevel`) REFERENCES `permission` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `userdetails_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`),
  CONSTRAINT `userdetails_ibfk_3` FOREIGN KEY (`roleid`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=275 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userdetails`
--

LOCK TABLES `userdetails` WRITE;
/*!40000 ALTER TABLE `userdetails` DISABLE KEYS */;
INSERT INTO `userdetails` VALUES (1,1,1,'Admin','Nisum','M','2014-10-01','0000000000',1,0,'2014-10-16 12:31:43','0000-00-00 00:00:00',1),(11,11,2,'Srikanth','Kata','M','2014-10-01','9999999999',3,0,'2014-10-21 08:21:05','0000-00-00 00:00:00',1),(13,13,3,'Sandeep','Gaddam','M','1980-10-24','8977300894',2,0,'2014-10-21 11:09:03','0000-00-00 00:00:00',1),(21,21,3,'Ramesh','Polishetti','M','1984-10-19','9701181405',2,0,'2014-10-26 08:45:50','0000-00-00 00:00:00',1),(31,31,3,'Mahesh','Dontula','M','1987-05-31','9966658030',1,0,'2014-10-26 17:00:46','2014-10-30 12:14:46',1),(41,41,3,'Marathi','Grishma','F','1992-01-08','8886084000',1,0,'2014-10-27 04:42:05','0000-00-00 00:00:00',1),(51,51,3,'Manoj','Thakur','M','1991-06-27','8885638287',1,0,'2014-10-27 04:43:10','2014-11-15 08:04:28',1),(61,61,3,'Venkatesh','Marugalla','M','1988-05-10','9030389822',1,0,'2014-10-27 04:52:41','0000-00-00 00:00:00',1),(71,71,3,'Srinivas','Ellandula','M','1989-02-26','7675878984',1,0,'2014-10-27 08:35:58','0000-00-00 00:00:00',1),(81,81,3,'saikumar','ponnuru','M','1988-05-10','9032870245',2,0,'2014-10-27 08:46:05','0000-00-00 00:00:00',1),(91,91,3,'Gangadhar','Vuyyuru','M','1986-12-17','9000418660',1,0,'2014-10-27 11:43:29','0000-00-00 00:00:00',1),(101,101,3,'Vanava Raju','Adabala','M','1985-01-01','9985558369',1,0,'2014-10-27 13:46:37','0000-00-00 00:00:00',1),(111,111,3,'ROOP','PADALA','M','1982-11-14','9542323033',2,0,'2014-10-28 09:57:12','2014-11-05 08:15:53',1),(121,121,3,'Sowjanya','Kopella','F','1990-02-14','9494914446',1,0,'2014-10-28 10:15:57','0000-00-00 00:00:00',1),(131,131,3,'Arti','Agrawal','F','1989-11-28','1231231234',1,0,'2014-10-28 11:24:45','2014-10-30 08:44:47',1),(141,141,3,'Raviteja','Panchagnula','M','1989-06-18','9492538028',1,0,'2014-10-29 10:05:00','2014-11-20 11:58:36',1),(151,161,3,'shiva shankar','Audam','M','1987-02-26','8886867695',1,0,'2014-10-29 10:06:22','0000-00-00 00:00:00',1),(161,171,3,'BAKKU PAVAN','KUMAR','M','0000-00-00','7386684307',1,0,'2014-10-30 05:50:00','0000-00-00 00:00:00',1),(171,181,1,'premchand','Anubrolu','M','1984-05-12','1111111111',1,0,'2014-10-30 22:47:59','0000-00-00 00:00:00',1),(181,191,3,'RamaRao','R','M','1978-03-11','9849352892',1,0,'2014-11-04 09:44:39','0000-00-00 00:00:00',1),(191,201,3,'Ramesh','Meduri','M','1981-01-27','9492877162',1,0,'2014-11-04 09:54:24','0000-00-00 00:00:00',1),(201,211,3,'Keerthi','Inavole','F','1984-01-01','1111111111',1,0,'2014-11-04 10:31:14','0000-00-00 00:00:00',1),(211,221,3,'VENKATA SAIKIRAN','KOKKU','M','0000-00-00','8121417187',1,0,'2014-11-04 11:33:57','0000-00-00 00:00:00',1),(221,231,3,'venkata sai kiran','kokku','M','0000-00-00','8121417187',1,0,'2014-11-07 06:50:29','0000-00-00 00:00:00',1),(231,241,2,'Srinivas','Gangapurkar','M','1974-04-09','4088585674',3,0,'2014-11-20 00:00:32','0000-00-00 00:00:00',1),(241,251,3,'Srikanth','Guntha','M','1990-01-02','9908268257',1,0,'2014-11-24 14:18:03','0000-00-00 00:00:00',1),(251,261,3,'Naresh Kumar','Renukuntla','M','1987-08-14','9700228104',1,0,'2014-12-01 07:16:52','0000-00-00 00:00:00',1),(261,271,3,'Vamsi','K','M','1992-02-02','9160052728',1,0,'2014-12-18 06:44:49','0000-00-00 00:00:00',1),(271,281,3,'swathi','sangireddy','F','1993-08-07','9493140100',1,0,'2014-12-19 05:35:22','0000-00-00 00:00:00',1),(272,282,4,'Executive','Manager','M','1980-01-01','9999988888',3,0,'2015-01-22 17:16:07',NULL,1),(273,283,2,'hub','hub','M','1988-01-01','1231231231',3,0,'2015-01-22 19:15:14',NULL,1),(274,284,2,'SDP','SDP','F','1978-01-22','987987897897',3,0,'2015-01-22 19:16:35',NULL,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=285 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@nisum.com','d033e22ae348aeb5660fc2140aec35850c4da997'),(11,'skata@nisum.com','bb41f514afcbbc6bdc6fba201d92c610d9ef9763'),(13,'sgaddam@nisum.com','6c1f9442a69c8f5ba461f7b853a329c2c949c620'),(21,'rpolishetti@nisum.com','957b8cb5f7717357e6faa369a9a5ebef7af1a329'),(31,'mdontula@nisum.com','d8ec06b217d6c087fe7c00736fb00ec2b6632620'),(41,'gmarathi@nisum.com','bf373d82bd51735af9dcfbe4e5126a946c992e91'),(51,'mthakur@nisum.com','7c4a8d09ca3762af61e59520943dc26494f8941b'),(61,'vmarugalla@nisum.com','3c20e4347da9d6afceae3951bc42ee8441965240'),(71,'sellandula@nisum.com','4036f57732a648e71da3ac2c829c8239a16a4c5d'),(81,'sponnuru@nisum.com','e356e39805e103756082461e7cfc97d9c183577c'),(91,'gvuyyuru@nisum.com','0820b32b206b7352858e8903a838ed14319acdfd'),(101,'vadabala@nisum.com','66dee444b8e39dbfb74c7510c9cb74c393e3d301'),(111,'rpadala@nisum.com','e2187aee974340fd1d4c0bf346605ff3f5c973de'),(121,'skopella@nisum.com','9e92a27113911972bf84598d5606f1eddd33aa33'),(131,'aagrawal@nisum.com','8cb2237d0679ca88db6464eac60da96345513964'),(141,'rpanchagnula@nisum.com','a544daf30513173d8f5c759fc84ce65ad7506c3a'),(161,'saudam@nisum.com','f67d010cbbe67ac40f99f49efa7f1faf7c817e3a'),(171,'pbakku@nisum.com','8514e1c9898fa8b3963eb993d21fe37e0248a0a8'),(181,'panubrolu@nisum.com','a544daf30513173d8f5c759fc84ce65ad7506c3a'),(191,'rrouthu@nisum.com','717741e99e135aa382912476608294f0a1d299d0'),(201,'rmeduri@nisum.com','8bec631ca5bdb048f76bad48e624776b2534cff7'),(211,'kinavole@nisum.com','15bda94f548ef8d74c11f30e1fdacc382f6a99dd'),(221,'skokku@nisum.com','34fb2c722e4306185cebeefbc6243de6fb2ff37a'),(231,'vkokku@nisum.com','34fb2c722e4306185cebeefbc6243de6fb2ff37a'),(241,'sgangapurkar@nisum.com','17d67bf26ca5a6e89d6f68c8f3dbbd93e60dd855'),(251,'sguntha@nisum.com','fbcdc3938548447e0e0b97c5f7e94bff1a21ee91'),(261,'nrenukuntla@nisum.com','bf5564acb124688f337286dcb2a7b77c9fd4bfe1'),(271,'vkadapa@nisum.com','d3fa14e66a4f2aad6e48934f974424036eeb347e'),(281,'ssangireddy@nisum.com','7f5f14e05a20c77f705222a96e0064fbeafc866b'),(282,'executive@nisum.com','e4fc1aedc88924a3f5bfda67c89a09a0260fa293'),(283,'hub@nisum.com','65acf0a7ced564a4880cf946224e60b745d3d631'),(284,'sdp@nisum.com','0f4e4c91a3ad3877c26ed7307da66d1535a06763');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'nisumplanner'
--

--
-- Dumping routines for database 'nisumplanner'
--
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
	IF EXISTS (SELECT *  FROM `nisumplanner`.`myprojects` WHERE teamid = _teamId and projectid = _projectId)	
        THEN
		UPDATE `nisumplanner`.`myprojects` SET active = true, editdate = NOW() WHERE teamid = _teamId and projectid = _projectId;	
	ELSE 
	    INSERT INTO `nisumplanner`.`myprojects`(projectid, teamid, createddate) VALUES  (_projectId, _teamId, now());
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
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `edituserdetails`(IN `_id` INT(11), IN `_roleId` INT(11), IN `_firstName` VARCHAR(50), IN `_lastName` VARCHAR(50), IN `_sex` VARCHAR(5), IN `_dob` DATE, IN `_contact` VARCHAR(20), IN `_teamId` INT(11))
    COMMENT 'EDIT USER DETAILS'
BEGIN
START TRANSACTION;  	
	UPDATE userdetails SET roleid = _roleId, firstname = _firstName, lastname = _lastName, sex = _sex, dob = _dob, contactno = _contact, editdate = now() WHERE userid = _id;
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
/*!50003 DROP PROCEDURE IF EXISTS `removeproject` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `removeproject`(IN _projectId int(11))
    COMMENT 'map user to team'
BEGIN
START TRANSACTION;  
	UPDATE myprojects SET active=false, editdate = now() WHERE projectid = _projectId;
	UPDATE project SET active=false, editdate = now() WHERE id = _projectId;
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
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `removestory`(IN `_storyId` INT(11))
    COMMENT 'remove story and all sub tasks'
BEGIN
START TRANSACTION;  
  UPDATE task SET active = 0 WHERE storyid = _storyId;
  UPDATE story SET active = 0 WHERE id = _storyId; 
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `saveuser`(IN `_name` VARCHAR(50), IN `_password` VARCHAR(50), IN `_roleId` INT(11), IN `_firstName` VARCHAR(50), IN `_lastName` VARCHAR(50), IN `_sex` VARCHAR(5), IN `_dob` DATE, IN `_contact` VARCHAR(20), IN `_teamId` INT(11))
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
    
    INSERT INTO userdetails(userid, roleid, firstname, lastname, sex, dob, contactno, createddate,accesslevel) VALUES (_userId, _roleId, _firstName, _lastName, _sex, _dob, _contact, now(),_accessLevel);
    
	

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
CREATE DEFINER=`root`@`localhost` PROCEDURE `storycompleted`(IN `_storyId` INT(11))
    COMMENT 'remove story and all sub tasks'
BEGIN


START TRANSACTION;  


  UPDATE task SET active = 0 WHERE storyid = _storyId;


  UPDATE story SET active = 0 WHERE id = _storyId; 


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

-- Dump completed on 2015-01-22 19:19:10
