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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `executiveteams`
--

LOCK TABLES `executiveteams` WRITE;
/*!40000 ALTER TABLE `executiveteams` DISABLE KEYS */;
INSERT INTO `executiveteams` VALUES (10,282,2,1,'2015-01-22',NULL,1),(11,282,3,1,'2015-01-22',NULL,1),(12,282,5,1,'2015-02-03',NULL,1),(13,282,1,1,'2015-02-05',NULL,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iteration`
--

LOCK TABLES `iteration` WRITE;
/*!40000 ALTER TABLE `iteration` DISABLE KEYS */;
INSERT INTO `iteration` VALUES (101,1425,'Mingle iteration','2014-12-31','2015-01-13',1,'2015-01-05 08:39:11',NULL,1),(111,1426,'Mingle iteration','2015-01-14','2015-01-27',1,'2015-01-09 06:34:35',NULL,1),(121,1427,'Mingle iteration','2015-01-28','2015-02-10',1,'2015-02-04 12:17:50',NULL,1),(122,1501,'Version One iteration','2015-01-28','2015-02-10',1,'2015-02-06 13:01:02',NULL,1),(123,1502,'Version One iteration','2015-02-11','2015-02-24',1,'2015-02-06 13:01:24',NULL,1),(124,1503,'Version One iteration','2015-02-25','2015-03-10',1,'2015-02-06 13:02:56',NULL,1),(125,1504,'Version One iteration','2015-03-11','2015-03-24',1,'2015-02-06 13:03:50',NULL,1),(126,1505,'Version One iteration','2015-03-25','2015-04-07',1,'2015-02-06 13:04:13',NULL,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loghistory`
--

LOCK TABLES `loghistory` WRITE;
/*!40000 ALTER TABLE `loghistory` DISABLE KEYS */;
INSERT INTO `loghistory` VALUES (1,467,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2015-02-18 20:04:49',3),(2,465,13,123,264,NULL,3,'2015-02-17 11:00:00','2015-02-17 16:00:00','2015-02-17 11:00:00','2015-02-17 19:30:00',1,141,141,'working on coremetrics, there got some dependencies, clarifications, getting some KT, due to this, it is getting late','2015-02-17 11:12:08','2015-02-19 11:35:47',2),(3,477,13,123,264,NULL,3,'2015-02-18 11:00:00','2015-02-18 16:00:00','2015-02-18 11:00:00','2015-02-18 16:00:00',1,141,141,'working on the story','2015-02-19 11:36:33','2015-02-19 11:36:46',2),(4,478,13,123,264,NULL,4,'2015-02-18 16:00:00','2015-02-18 18:00:00','2015-02-18 16:15:00','2015-02-18 19:00:00',1,141,141,'Unit testing and committing','2015-02-19 11:37:22','2015-02-19 11:37:42',2),(5,468,31,NULL,NULL,NULL,NULL,'2015-02-19 11:00:00','2015-02-19 20:00:00','2015-02-19 11:00:00','2015-02-19 20:00:00',1,13,13,'Work on spring /dashboard enhancement','2015-02-18 20:11:14','2015-02-19 12:23:56',2),(6,414,161,NULL,NULL,NULL,NULL,'2015-02-10 10:30:00','2015-02-10 19:30:00','2015-02-10 10:30:00','2015-02-10 19:30:00',1,61,61,'','2015-02-10 15:33:24','2015-02-19 14:28:22',2),(7,459,13,123,267,NULL,3,'2015-02-12 11:00:00','2015-02-12 19:12:00','2015-02-12 11:00:00','2015-02-12 19:00:00',1,121,121,'Working on coremetrics','2015-02-12 16:14:39','2015-02-19 14:30:08',2),(8,452,31,NULL,NULL,NULL,NULL,'2015-02-11 11:30:00','2015-02-11 20:30:00','2015-02-11 11:30:00','2015-02-11 21:30:00',1,91,91,'Working on Nisum planner Sprints page','2015-02-12 11:37:11','2015-02-19 14:31:46',2),(9,481,13,123,267,NULL,10,'2015-02-13 11:00:00','2015-02-13 18:30:00','2015-02-13 11:00:00','2015-02-13 18:30:00',1,121,121,'Working on 2425','2015-02-19 14:31:44','2015-02-19 14:31:56',2),(10,484,31,NULL,NULL,NULL,NULL,'2015-02-19 11:30:00','2015-02-19 20:30:00','2015-02-19 11:30:00','2015-02-19 20:30:00',1,91,91,'Working on Dashboard and Story changes','2015-02-19 14:32:31','2015-02-19 14:32:41',2),(11,480,161,123,271,NULL,5,'2015-02-12 11:00:00','2015-02-12 20:00:00','2015-02-12 11:00:00','2015-02-12 20:00:00',1,171,171,'','2015-02-19 14:31:20','2015-02-19 14:33:32',2),(12,462,13,123,268,NULL,3,'2015-02-16 10:40:00','2015-02-16 18:00:00','2015-02-16 10:40:00','2015-02-16 19:00:00',1,41,41,'messaging story','2015-02-16 10:39:41','2015-02-19 14:33:32',2),(13,482,161,123,271,NULL,4,'2015-02-13 10:00:00','2015-02-13 20:00:00','2015-02-13 10:00:00','2015-02-13 20:00:00',1,171,171,'','2015-02-19 14:31:57','2015-02-19 14:33:44',2),(14,483,161,123,270,NULL,3,'2015-02-17 10:00:00','2015-02-17 20:00:00','2015-02-17 10:00:00','2015-02-17 20:00:00',1,171,171,'','2015-02-19 14:32:29','2015-02-19 14:33:57',2),(15,485,161,123,270,NULL,3,'2015-02-18 10:30:00','2015-02-18 20:00:00','2015-02-18 10:30:00','2015-02-18 20:00:00',1,171,171,'','2015-02-19 14:32:51','2015-02-19 14:34:07',2),(16,488,13,123,276,NULL,3,'2015-02-18 00:00:00','2015-02-18 17:30:00','2015-02-18 00:00:00','2015-02-18 17:30:00',1,121,121,'Update message for anon/pre-enrolled in checkout to include Plenti.com','2015-02-19 14:34:57','2015-02-19 14:35:13',2),(17,489,13,123,264,NULL,5,'2015-02-19 11:00:00','2015-02-19 13:00:00','2015-02-19 11:00:00','2015-02-19 13:00:00',1,141,141,'fixing sonar issues and committing','2015-02-19 14:37:17','2015-02-19 14:37:37',2),(18,490,13,123,278,NULL,4,'2015-02-19 14:15:00','2015-02-19 17:00:00','2015-02-19 14:15:00','2015-02-19 19:30:00',1,141,141,'Functionality implemented, need to test and do changes if necessary','2015-02-19 14:41:03','2015-02-20 10:58:56',2),(19,491,13,123,265,NULL,3,'2015-02-19 11:30:00','2015-02-19 18:38:00','2015-02-19 11:30:00','2015-02-19 19:30:00',1,121,121,'Writing specs for enroll js','2015-02-19 15:45:01','2015-02-20 11:47:16',2),(20,496,13,123,265,NULL,3,'2015-02-19 11:00:00','2015-02-19 13:00:00','2015-02-19 11:00:00','2015-02-19 13:00:00',1,161,161,'Working on story 2406','2015-02-20 11:50:01','2015-02-20 11:50:42',2),(21,497,13,123,265,NULL,3,'2015-02-19 14:00:00','2015-02-19 19:00:00','2015-02-19 14:00:00','2015-02-19 19:00:00',1,161,161,'Working on story 2406','2015-02-20 11:50:32','2015-02-20 11:50:51',2),(22,486,161,123,270,NULL,5,'2015-02-19 10:30:00','2015-02-19 20:03:00','2015-02-19 10:30:00','2015-02-19 20:00:00',1,171,171,'','2015-02-19 14:33:19','2015-02-20 12:02:13',2),(23,499,31,NULL,NULL,NULL,NULL,'2015-02-20 12:00:00','2015-02-20 20:00:00','2015-02-20 12:00:00','2015-02-20 20:00:00',1,13,13,'Testing app','2015-02-20 12:49:21','2015-02-20 12:49:27',2),(24,501,161,123,270,NULL,3,'2015-02-11 10:40:00','2015-02-11 20:00:00','2015-02-11 10:40:00','2015-02-11 20:30:00',1,231,231,'','2015-02-20 19:23:45','2015-02-20 19:24:10',2),(25,502,161,123,269,NULL,5,'2015-02-19 10:22:00','2015-02-19 20:00:00','2015-02-19 10:22:00','2015-02-19 20:30:00',1,231,231,'My account - macys credit section for no cards scenario','2015-02-20 19:25:43','2015-02-20 19:26:00',2),(26,503,161,123,271,NULL,2,'2015-02-17 10:15:00','2015-02-17 14:33:00','2015-02-17 10:15:00','2015-02-17 14:00:00',1,231,231,'Gateway - Non Authed User - Activation Box and  Implementation of template and render module for the gateway sign in page','2015-02-20 19:36:54','2015-02-20 19:37:23',2),(27,498,161,123,270,NULL,10,'2015-02-20 10:30:00','2015-02-20 19:30:00','2015-02-20 10:30:00','2015-02-20 19:30:00',1,171,171,'','2015-02-20 12:02:54','2015-02-23 10:18:16',2),(28,493,13,123,278,NULL,4,'2015-02-20 10:45:00','2015-02-20 17:00:00','2015-02-20 10:45:00','2015-02-20 19:30:00',1,141,141,'working on testing the scenarios and implementing the  necessary changes','2015-02-20 11:01:16','2015-02-23 19:31:13',2),(29,504,13,123,264,NULL,5,'2015-02-23 10:45:00','2015-02-23 19:29:00','2015-02-23 10:45:00','2015-02-23 19:30:00',1,141,141,'Implementing code review comments','2015-02-23 19:36:59','2015-02-23 19:37:14',2),(30,505,31,NULL,NULL,NULL,NULL,'2015-02-23 12:00:00','2015-02-23 20:00:00','2015-02-23 12:00:00','2015-02-23 20:00:00',1,13,13,'dir structure remodeling','2015-02-24 12:36:05','2015-02-24 12:36:11',2),(31,506,31,NULL,NULL,NULL,NULL,'2015-02-24 12:00:00','2015-02-24 20:34:00','2015-02-24 12:51:00','2015-02-24 20:51:00',1,13,13,'dir structure remodeling','2015-02-24 12:36:21','2015-02-24 12:52:50',2),(32,507,31,NULL,NULL,NULL,NULL,'2015-02-24 19:00:00','2015-02-24 19:30:00','2015-02-24 19:00:00','2015-02-24 19:30:00',1,13,13,'updated prod dir structure','2015-02-24 19:02:33','2015-02-24 19:02:42',2),(33,467,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2015-02-24 19:03:01',4),(34,389,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2015-02-24 19:40:52',4),(35,508,31,NULL,NULL,NULL,NULL,'2015-02-25 12:05:00','2015-02-25 20:05:00','2015-02-25 12:05:00','2015-02-25 20:05:00',1,13,13,'Working on session/memory leak issues','2015-02-25 13:07:20','2015-02-25 13:07:26',2);
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
) ENGINE=InnoDB AUTO_INCREMENT=509 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logs`
--

LOCK TABLES `logs` WRITE;
/*!40000 ALTER TABLE `logs` DISABLE KEYS */;
INSERT INTO `logs` VALUES (380,31,NULL,NULL,NULL,NULL,'2015-02-05 12:00:00','2015-02-05 19:58:00','2015-02-05 12:00:00','2015-02-05 18:59:00',1,13,13,'Working on user verification ','2015-02-05 19:00:46',NULL,2),(381,31,NULL,NULL,NULL,NULL,'2015-02-05 11:00:00','2015-02-05 12:00:00','2015-02-05 11:00:00','2015-02-05 12:00:00',1,13,13,'Demo to managers','2015-02-05 19:01:13',NULL,2),(382,31,NULL,NULL,NULL,NULL,'2015-02-06 12:00:00','2015-02-06 20:00:00','2015-02-06 12:00:00','2015-02-06 20:00:00',1,13,13,'Working on dashboard issues','2015-02-06 12:28:48',NULL,2),(383,121,111,91,NULL,1,'2015-02-06 11:00:00','2015-02-06 19:00:00','2015-02-06 11:00:00','2015-02-06 19:00:00',1,161,161,'Working on backbone marionette app, and working on nisum planner, self training','2015-02-06 12:47:08',NULL,2),(384,81,NULL,NULL,NULL,NULL,'2015-02-06 10:00:00','2015-02-06 18:30:00',NULL,NULL,1,101,101,'Poster designing for OSI.','2015-02-06 12:47:21',NULL,1),(385,31,NULL,NULL,NULL,NULL,'2015-02-06 11:00:00','2015-02-06 20:30:00','2015-02-06 11:00:00','2015-02-06 20:30:00',1,91,91,'Working on Nisum Planner Changes','2015-02-06 12:51:56',NULL,2),(386,121,NULL,NULL,NULL,NULL,'2015-02-06 10:30:00','2015-02-06 12:58:00',NULL,NULL,1,271,271,'','2015-02-06 13:01:18',NULL,1),(387,51,122,223,NULL,4,'2015-02-06 13:01:00','2015-02-06 19:00:00','2015-02-06 13:01:00','2015-02-06 18:30:00',1,71,71,'MCOMUI: Payment edits for guest user','2015-02-06 13:03:42',NULL,2),(388,121,NULL,NULL,NULL,NULL,'2015-02-06 11:00:00','2015-02-06 20:55:00','2015-02-06 11:00:00','2015-02-06 20:00:00',1,231,231,'Implement the speedBump overlay and refactor the code.','2015-02-06 14:13:13',NULL,2),(389,31,122,224,53,4,'2015-02-04 13:58:00','2015-02-04 18:58:00','2015-02-04 13:58:00','2015-02-04 19:58:00',1,13,13,'testing application...','2015-02-06 16:00:08','2015-02-24 19:40:52',4),(390,121,NULL,NULL,NULL,NULL,'2015-02-09 10:30:00','2015-02-09 11:15:00',NULL,NULL,1,271,271,'','2015-02-09 11:17:43',NULL,1),(391,121,NULL,NULL,NULL,NULL,'2015-02-09 10:30:00','2015-02-09 17:15:00',NULL,NULL,1,271,271,'','2015-02-09 12:06:53',NULL,1),(392,31,NULL,NULL,NULL,NULL,'2015-02-09 12:00:00','2015-02-09 20:00:00','2015-02-09 12:00:00','2015-02-09 19:00:00',1,13,13,'Working on enhancements/issues','2015-02-09 12:39:04',NULL,2),(393,13,122,41,NULL,3,'2015-02-09 11:00:00','2015-02-09 13:01:00','2015-02-09 11:00:00','2015-02-09 13:01:00',1,61,61,'Working on the Password Strength validations.','2015-02-09 14:23:04',NULL,2),(394,161,NULL,NULL,NULL,NULL,'2015-02-09 14:21:00','2015-02-09 19:21:00','2015-02-09 14:56:00','2015-02-09 19:21:00',1,61,61,'Working Tiles Creation.','2015-02-09 14:23:50',NULL,2),(395,31,NULL,NULL,NULL,NULL,'2015-02-09 11:00:00','2015-02-09 20:00:00','2015-02-09 11:00:00','2015-02-09 19:00:00',1,161,161,'Working with browser compatibility, and self training.','2015-02-10 11:56:16',NULL,2),(396,31,NULL,NULL,NULL,NULL,'2015-02-10 11:20:00','2015-02-10 20:00:00','2015-02-10 11:20:00','2015-02-10 20:00:00',1,13,13,'Working on history maintanance of all components','2015-02-10 12:00:09',NULL,2),(397,13,122,161,NULL,10,'2015-02-10 12:08:00','2015-02-10 15:00:00','2015-02-10 12:08:00','2015-02-10 16:30:00',1,51,51,'working on defect','2015-02-10 12:11:22',NULL,2),(398,13,122,228,NULL,11,'2015-02-10 11:00:00','2015-02-10 13:20:00','2015-02-10 11:00:00','2015-02-10 14:00:00',1,41,41,'wrong tab name display on preferences page','2015-02-10 12:14:11',NULL,2),(399,13,122,227,NULL,11,'2015-02-10 12:11:00','2015-02-10 18:30:00','2015-02-10 12:11:00','2015-02-10 18:10:00',1,111,111,'','2015-02-10 12:14:19',NULL,2),(400,13,122,229,NULL,3,'2015-02-10 11:00:00','2015-02-10 15:00:00','2015-02-10 11:00:00','2015-02-10 20:30:00',1,121,121,'USL points section is not getting displayed on order confirmation page when we place an order with USL ID','2015-02-10 12:24:27',NULL,2),(401,13,122,161,NULL,11,'2015-02-10 14:00:00','2015-02-10 16:00:00',NULL,NULL,1,141,141,'Fixing the defect','2015-02-10 12:24:39',NULL,1),(404,31,NULL,NULL,NULL,NULL,'2015-02-05 10:00:00','2015-02-05 20:00:00','2015-02-05 10:00:00','2015-02-05 20:00:00',1,91,91,'Working on Nisum Planner Changes','2015-02-10 14:31:24',NULL,2),(405,31,NULL,NULL,NULL,NULL,'2015-02-04 10:00:00','2015-02-04 20:30:00','2015-02-04 10:30:00','2015-02-04 18:30:00',1,91,91,'Working on Nisum Planner Dashboard Changes','2015-02-10 14:32:03','2015-02-10 14:55:36',2),(406,31,NULL,NULL,NULL,NULL,'2015-02-03 10:00:00','2015-02-03 20:30:00','2015-02-03 10:00:00','2015-02-03 19:30:00',1,91,91,'Working on Nisum Planner Story page','2015-02-10 14:33:19',NULL,2),(407,31,NULL,NULL,NULL,NULL,'2015-02-10 10:00:00','2015-02-10 19:30:00','2015-02-10 10:00:00','2015-02-10 21:00:00',1,91,91,'Working on Nisum Planner Admin page','2015-02-10 14:34:01',NULL,2),(408,31,NULL,NULL,NULL,NULL,'2015-02-09 10:00:00','2015-02-09 20:30:00','2015-02-09 11:30:00','2015-02-09 18:30:00',1,91,91,'Working on Nisum Planner EDashboard page','2015-02-10 14:34:29','2015-02-10 14:56:30',2),(409,31,NULL,NULL,NULL,NULL,'2015-02-08 10:00:00','2015-02-08 19:30:00','2015-02-08 11:30:00','2015-02-08 17:30:00',1,91,91,'Working on Nisum Planner Updates in Admin page','2015-02-10 14:35:12','2015-02-10 14:56:49',2),(410,31,NULL,NULL,NULL,NULL,'2015-02-07 10:00:00','2015-02-07 20:00:00','2015-02-07 10:00:00','2015-02-07 19:30:00',1,91,91,'Working on Nisum Planner Validation','2015-02-10 14:36:03',NULL,2),(411,161,NULL,NULL,NULL,NULL,'2015-02-08 10:30:00','2015-02-08 19:30:00','2015-02-08 10:30:00','2015-02-08 19:30:00',1,61,61,'Working on Credit App Project','2015-02-10 14:59:06',NULL,2),(412,161,NULL,NULL,NULL,NULL,'2015-02-07 10:30:00','2015-02-07 19:30:00','2015-02-07 10:30:00','2015-02-07 19:30:00',1,61,61,'Working on Credit App Project','2015-02-10 14:59:46',NULL,2),(413,141,NULL,NULL,NULL,NULL,'2015-02-10 11:30:00','2015-02-10 15:30:00','2015-02-10 11:30:00','2015-02-10 15:30:00',1,21,21,'Reviewing BLM Enhancements Code','2015-02-10 15:03:45',NULL,2),(414,161,NULL,NULL,NULL,NULL,'2015-02-10 10:30:00','2015-02-10 19:30:00','2015-02-10 10:30:00','2015-02-10 19:30:00',1,61,61,'','2015-02-10 15:33:24','2015-02-19 14:28:22',2),(415,51,122,242,NULL,3,'2015-02-10 15:38:00','2015-02-10 19:30:00','2015-02-10 15:38:00','2015-02-10 19:30:00',1,71,71,'MCOM PayPal :: Loading page is not displaying as expected after payment / shipping-payment page submission','2015-02-10 15:40:15',NULL,2),(416,31,NULL,NULL,NULL,NULL,'2015-02-11 11:00:00','2015-02-11 12:03:00','2015-02-11 11:00:00','2015-02-11 12:03:00',1,13,13,'working on changeing role mappings','2015-02-10 18:05:00',NULL,2),(417,13,122,243,NULL,3,'2015-02-10 11:30:00','2015-02-10 19:00:00','2015-02-10 11:30:00','2015-02-10 18:00:00',1,141,141,'working on implementing password strength in Enrollment page','2015-02-10 18:08:29',NULL,2),(418,151,NULL,NULL,NULL,NULL,'2015-02-10 11:00:00','2015-02-10 11:30:00','2015-02-10 11:00:00','2015-02-10 11:30:00',1,141,141,'Call with on-site','2015-02-10 18:09:49',NULL,2),(419,13,122,249,NULL,11,'2015-02-09 09:30:00','2015-02-09 18:30:00','2015-02-09 09:30:00','2015-02-09 18:18:00',1,111,111,'','2015-02-10 18:19:47',NULL,2),(420,13,122,246,NULL,11,'2015-02-06 10:00:00','2015-02-06 18:30:00','2015-02-06 10:00:00','2015-02-06 18:19:00',1,111,111,'','2015-02-10 18:20:40',NULL,2),(421,13,122,244,NULL,11,'2015-02-05 10:30:00','2015-02-05 18:30:00','2015-02-05 10:30:00','2015-02-05 18:20:00',1,111,111,'','2015-02-10 18:21:30',NULL,2),(422,13,122,244,NULL,11,'2015-02-10 11:00:00','2015-02-10 19:30:00','2015-02-10 12:30:00','2015-02-10 19:30:00',1,31,31,'UI: Bad user experience when selected drop downs on USL enrollment page','2015-02-10 18:22:30',NULL,2),(423,13,122,245,NULL,12,'2015-02-09 10:30:00','2015-02-09 19:00:00','2015-02-09 11:00:00','2015-02-09 19:30:00',1,31,31,'My Plent link is not showing in left navigation section when user nagigates to below left navigations pages Furniture & Mattress Status and Gift Card Balance','2015-02-10 18:23:40',NULL,2),(424,171,NULL,NULL,NULL,NULL,'2015-02-06 10:00:00','2015-02-06 19:00:00','2015-02-06 10:00:00','2015-02-06 19:00:00',1,31,31,'','2015-02-10 18:24:49',NULL,2),(425,131,122,250,NULL,11,'2015-02-05 11:00:00','2015-02-05 18:30:00','2015-02-05 11:30:00','2015-02-05 19:00:00',1,31,31,'Lot more session created for mcom after 14K','2015-02-10 18:34:19',NULL,2),(426,13,122,251,NULL,11,'2015-02-09 10:45:00','2015-02-09 19:01:00','2015-02-09 10:45:00','2015-02-09 19:30:00',1,141,141,'Expected error message is not getting displayed on order confirmation page, when order placed in batch mode or USL down or LTY down','2015-02-10 18:44:30',NULL,2),(427,13,122,243,NULL,3,'2015-02-06 10:45:00','2015-02-06 19:59:00','2015-02-06 10:45:00','2015-02-06 19:15:00',1,141,141,'Analyzing and working on the story','2015-02-10 18:47:53',NULL,2),(428,13,122,252,NULL,4,'2015-02-05 11:00:00','2015-02-05 20:00:00','2015-02-05 11:00:00','2015-02-05 20:30:00',1,141,141,'Updating specs for enroll.js and checkoutLoyalty.js','2015-02-10 18:51:58',NULL,2),(429,161,122,253,NULL,4,'2015-02-10 10:30:00','2015-02-10 20:00:00','2015-02-10 10:30:00','2015-02-10 20:33:00',1,231,231,'Remove all Credit related information and actions- Dev Competed hence moved to In test.\n','2015-02-10 19:24:32',NULL,2),(430,13,122,229,31,11,'2015-02-10 15:00:00','2015-02-10 16:00:00','2015-02-10 16:00:00','2015-02-10 18:30:00',1,51,51,'Fixing defect ','2015-02-10 19:30:44',NULL,2),(431,161,122,254,NULL,5,'2015-02-10 10:30:00','2015-02-10 19:30:00','2015-02-10 10:30:00','2015-02-10 20:30:00',1,81,81,'Added business use cases','2015-02-10 19:32:22',NULL,2),(432,161,122,254,NULL,4,'2015-02-10 09:45:00','2015-02-10 20:00:00','2015-02-10 09:45:00','2015-02-10 20:00:00',1,171,171,'','2015-02-10 19:54:35',NULL,2),(433,31,NULL,NULL,NULL,NULL,'2015-02-12 12:00:00','2015-02-12 20:00:00','2015-02-12 12:00:00','2015-02-12 20:00:00',1,13,13,'Working on enhancements/issues','2015-02-11 12:05:03',NULL,2),(434,13,122,161,NULL,11,'2015-02-11 12:08:00','2015-02-11 15:00:00',NULL,NULL,1,51,51,'Working on defect fixes','2015-02-11 12:10:21',NULL,1),(435,121,NULL,NULL,NULL,NULL,'2015-02-11 10:20:00','2015-02-11 19:30:00',NULL,NULL,1,271,271,'','2015-02-11 12:28:25',NULL,1),(436,51,111,258,NULL,3,'2015-02-05 09:45:00','2015-02-05 19:30:00','2015-02-05 10:00:00','2015-02-05 20:00:00',1,71,71,'MCOM UI: Signed in and Guest: Payment / Shipping-payment Page Submission: Spinning wheel display','2015-02-11 16:08:34',NULL,2),(437,51,111,258,NULL,4,'2015-02-09 10:30:00','2015-02-09 16:07:00','2015-02-09 10:30:00','2015-02-09 16:30:00',1,71,71,'MCOM UI: Signed in and Guest: Payment / Shipping-payment Page Submission: Spinning wheel display','2015-02-11 16:09:28',NULL,2),(438,51,122,242,NULL,4,'2015-02-11 11:00:00','2015-02-11 18:00:00','2015-02-11 11:00:00','2015-02-11 19:30:00',1,71,71,'MCOM PayPal :: Loading page is not displaying as expected after payment / shipping-payment page submission','2015-02-11 16:10:58',NULL,2),(439,161,122,253,NULL,5,'2015-02-09 10:30:00','2015-02-09 19:30:00','2015-02-09 10:30:00','2015-02-09 19:30:00',1,81,81,'Remove all Credit related information and actions','2015-02-11 16:19:34',NULL,2),(440,161,122,254,NULL,3,'2015-02-06 10:30:00','2015-02-06 20:00:00','2015-02-06 10:30:00','2015-02-06 20:00:00',1,81,81,' My Account - Add Card view','2015-02-11 16:24:00',NULL,2),(441,161,122,255,NULL,3,'2015-02-05 10:30:00','2015-02-05 20:30:00','2015-02-05 10:30:00','2015-02-05 20:30:00',1,81,81,' My Account - Add Card Speed Bump message ','2015-02-11 16:26:35',NULL,2),(442,161,122,254,NULL,4,'2015-02-09 10:30:00','2015-02-09 20:00:00','2015-02-09 10:30:00','2015-02-09 20:00:00',1,231,231,' My Account - Add Card Speed Bump message \ncode testing','2015-02-11 16:34:15',NULL,2),(443,161,122,254,NULL,5,'2015-02-06 11:00:00','2015-02-06 20:03:00','2015-02-06 11:00:00','2015-02-06 20:35:00',1,231,231,'My Account - Add Card view','2015-02-11 16:37:10',NULL,2),(444,161,122,255,NULL,4,'2015-02-05 10:40:00','2015-02-05 20:33:00','2015-02-05 10:40:00','2015-02-05 20:30:00',1,231,231,' My Account - Add Card Speed Bump message','2015-02-11 16:40:05',NULL,2),(445,161,122,255,NULL,2,'2015-02-05 10:00:00','2015-02-05 20:00:00','2015-02-05 10:00:00','2015-02-05 20:00:00',1,171,171,'','2015-02-11 19:41:48',NULL,2),(446,161,122,254,NULL,3,'2015-02-06 10:30:00','2015-02-06 21:00:00','2015-02-06 10:00:00','2015-02-06 21:00:00',1,171,171,'','2015-02-11 19:42:25',NULL,2),(447,161,122,254,NULL,5,'2015-02-09 10:30:00','2015-02-09 20:00:00','2015-02-09 10:30:00','2015-02-09 20:00:00',1,171,171,'','2015-02-11 19:43:20',NULL,2),(448,161,122,254,NULL,10,'2015-02-11 10:00:00','2015-02-11 19:00:00','2015-02-11 10:00:00','2015-02-11 19:00:00',1,171,171,'','2015-02-11 19:43:46',NULL,2),(449,13,123,264,NULL,1,'2015-02-11 11:00:00','2015-02-11 19:00:00','2015-02-11 11:00:00','2015-02-11 20:00:00',1,141,141,'Got KT from Venkatesh regarding coremetrics and started analyzing','2015-02-12 11:23:53',NULL,2),(450,13,123,264,NULL,3,'2015-02-12 11:00:00','2015-02-12 16:30:00','2015-02-12 11:00:00','2015-02-12 19:00:00',1,141,141,'Working  on the story','2015-02-12 11:24:49',NULL,2),(451,13,123,265,NULL,3,'2015-02-12 11:00:00','2015-02-12 13:00:00','2015-02-12 11:00:00','2015-02-12 14:30:00',1,41,41,'','2015-02-12 11:25:53',NULL,2),(452,31,NULL,NULL,NULL,NULL,'2015-02-11 11:30:00','2015-02-11 20:30:00','2015-02-11 11:30:00','2015-02-11 21:30:00',1,91,91,'Working on Nisum planner Sprints page','2015-02-12 11:37:11','2015-02-19 14:31:46',2),(453,31,NULL,NULL,NULL,NULL,'2015-02-13 13:00:00','2015-02-13 19:00:00','2015-02-13 12:01:00','2015-02-13 20:00:00',1,13,13,'Working on spring functionality','2015-02-12 13:47:46',NULL,2),(454,121,NULL,NULL,NULL,NULL,'2015-02-12 10:25:00','2015-02-12 19:30:00',NULL,NULL,1,271,271,'','2015-02-12 14:28:00',NULL,1),(455,121,NULL,NULL,NULL,NULL,'2015-02-10 10:25:00','2015-02-10 19:30:00',NULL,NULL,1,271,271,'','2015-02-12 14:28:46',NULL,1),(456,13,122,245,NULL,10,'2015-02-09 11:00:00','2015-02-09 20:00:00','2015-02-09 11:00:00','2015-02-09 20:00:00',1,121,121,'testing USL flow in different browsers and ipad','2015-02-12 16:01:54',NULL,2),(457,13,122,266,NULL,3,'2015-02-05 11:00:00','2015-02-05 19:30:00','2015-02-05 11:00:00','2015-02-05 19:30:00',1,121,121,'USL section is not as per comp on My Account page IN ipad, iE9','2015-02-12 16:06:32',NULL,2),(458,13,122,229,NULL,3,'2015-02-06 11:00:00','2015-02-06 19:05:00','2015-02-06 11:00:00','2015-02-06 19:00:00',1,121,121,'USL points section is not getting displayed on order confirmation page when we place an order with USL ID','2015-02-12 16:12:03',NULL,2),(459,13,123,267,NULL,3,'2015-02-12 11:00:00','2015-02-12 19:12:00','2015-02-12 11:00:00','2015-02-12 19:00:00',1,121,121,'Working on coremetrics','2015-02-12 16:14:39','2015-02-19 14:30:08',2),(460,13,123,267,NULL,3,'2015-02-11 11:00:00','2015-02-11 19:45:00','2015-02-11 11:00:00','2015-02-11 19:45:00',1,121,121,'Analising coremetrics','2015-02-12 16:15:56',NULL,2),(461,13,123,264,NULL,3,'2015-02-13 11:00:00','2015-02-13 17:00:00','2015-02-13 11:00:00','2015-02-13 19:30:00',1,141,141,'Working on this coremetrics story','2015-02-13 12:47:00',NULL,2),(462,13,123,268,NULL,3,'2015-02-16 10:40:00','2015-02-16 18:00:00','2015-02-16 10:40:00','2015-02-16 19:00:00',1,41,41,'messaging story','2015-02-16 10:39:41','2015-02-19 14:33:32',2),(463,13,123,264,NULL,3,'2015-02-16 10:45:00','2015-02-16 16:00:00','2015-02-16 10:45:00','2015-02-16 19:00:00',1,141,141,'working on coremetrics','2015-02-16 11:05:26',NULL,2),(464,31,NULL,NULL,NULL,NULL,'2015-02-16 12:00:00','2015-02-16 20:00:00','2015-02-16 12:00:00','2015-02-16 20:30:00',1,13,13,'Working on sprints enhance ments','2015-02-16 12:52:25',NULL,2),(465,13,123,264,NULL,3,'2015-02-17 11:00:00','2015-02-17 16:00:00','2015-02-17 11:00:00','2015-02-17 19:30:00',1,141,141,'working on coremetrics, there got some dependencies, clarifications, getting some KT, due to this, it is getting late','2015-02-17 11:12:08','2015-02-19 11:35:47',2),(466,31,NULL,NULL,NULL,NULL,'2015-02-17 11:45:00','2015-02-17 20:00:00','2015-02-17 11:45:00','2015-02-17 20:00:00',1,13,13,'Working on sprints enhancements','2015-02-17 13:09:40',NULL,2),(467,31,NULL,NULL,NULL,NULL,'2015-02-18 11:54:00','2015-02-18 20:00:00','2015-02-18 11:54:00','2015-02-18 20:00:00',1,13,13,'working on DB triggers and table structures','2015-02-18 11:57:06','2015-02-24 19:03:01',4),(468,31,NULL,NULL,NULL,NULL,'2015-02-19 11:00:00','2015-02-19 20:00:00','2015-02-19 11:00:00','2015-02-19 20:00:00',1,13,13,'Work on spring /dashboard enhancement','2015-02-18 20:11:14','2015-02-19 12:23:56',2),(469,13,123,265,NULL,3,'2015-02-17 15:42:00','2015-02-17 17:57:00',NULL,NULL,1,21,21,'Test Stpru','2015-02-19 05:31:36',NULL,1),(470,51,123,272,NULL,3,'2015-02-18 09:30:00','2015-02-18 16:30:00',NULL,NULL,1,21,21,'Working on templates creation.','2015-02-19 11:03:07',NULL,1),(471,51,123,272,NULL,3,'2015-02-18 16:30:00','2015-02-18 19:30:00',NULL,NULL,1,21,21,'Need to work on CSS','2015-02-19 11:04:05',NULL,1),(472,51,123,272,NULL,3,'2015-02-18 19:30:00','2015-02-18 20:30:00',NULL,NULL,1,21,21,'Need to work on templates integration','2015-02-19 11:05:12',NULL,1),(473,51,123,273,NULL,3,'2015-02-19 10:30:00','2015-02-19 13:30:00',NULL,NULL,1,21,21,'Need to work on HBS templates - Signed in checkout process.','2015-02-19 11:06:56',NULL,1),(474,51,123,273,NULL,3,'2015-02-18 14:00:00','2015-02-18 20:30:00',NULL,NULL,1,21,21,'Task on Toggle module - MacysUI','2015-02-19 11:08:30',NULL,1),(475,51,123,273,NULL,3,'2015-12-20 10:30:00','2015-12-20 20:30:00',NULL,NULL,1,21,21,'Task on Search module - Product Ids','2015-02-19 11:10:12',NULL,1),(476,13,123,264,NULL,3,'2015-02-20 09:31:00','2015-02-20 18:30:00',NULL,NULL,1,31,21,'Need to work on Validations.','2015-02-19 11:12:36',NULL,1),(477,13,123,264,NULL,3,'2015-02-18 11:00:00','2015-02-18 16:00:00','2015-02-18 11:00:00','2015-02-18 16:00:00',1,141,141,'working on the story','2015-02-19 11:36:33','2015-02-19 11:36:46',2),(478,13,123,264,NULL,4,'2015-02-18 16:00:00','2015-02-18 18:00:00','2015-02-18 16:15:00','2015-02-18 19:00:00',1,141,141,'Unit testing and committing','2015-02-19 11:37:22','2015-02-19 11:37:42',2),(479,161,NULL,NULL,NULL,NULL,'2015-02-19 10:00:00','2015-02-19 19:00:00',NULL,NULL,1,61,61,'','2015-02-19 14:27:55',NULL,1),(480,161,123,271,NULL,5,'2015-02-12 11:00:00','2015-02-12 20:00:00','2015-02-12 11:00:00','2015-02-12 20:00:00',1,171,171,'','2015-02-19 14:31:20','2015-02-19 14:33:32',2),(481,13,123,267,NULL,10,'2015-02-13 11:00:00','2015-02-13 18:30:00','2015-02-13 11:00:00','2015-02-13 18:30:00',1,121,121,'Working on 2425','2015-02-19 14:31:44','2015-02-19 14:31:56',2),(482,161,123,271,NULL,4,'2015-02-13 10:00:00','2015-02-13 20:00:00','2015-02-13 10:00:00','2015-02-13 20:00:00',1,171,171,'','2015-02-19 14:31:57','2015-02-19 14:33:44',2),(483,161,123,270,NULL,3,'2015-02-17 10:00:00','2015-02-17 20:00:00','2015-02-17 10:00:00','2015-02-17 20:00:00',1,171,171,'','2015-02-19 14:32:29','2015-02-19 14:33:57',2),(484,31,NULL,NULL,NULL,NULL,'2015-02-19 11:30:00','2015-02-19 20:30:00','2015-02-19 11:30:00','2015-02-19 20:30:00',1,91,91,'Working on Dashboard and Story changes','2015-02-19 14:32:31','2015-02-19 14:32:41',2),(485,161,123,270,NULL,3,'2015-02-18 10:30:00','2015-02-18 20:00:00','2015-02-18 10:30:00','2015-02-18 20:00:00',1,171,171,'','2015-02-19 14:32:51','2015-02-19 14:34:07',2),(486,161,123,270,NULL,5,'2015-02-19 10:30:00','2015-02-19 20:03:00','2015-02-19 10:30:00','2015-02-19 20:00:00',1,171,171,'','2015-02-19 14:33:19','2015-02-20 12:02:13',2),(487,13,123,277,NULL,11,'2015-02-19 10:30:00','2015-02-19 14:00:00',NULL,NULL,1,41,41,'Wrong button is displaying on set preference page when USL site Failed and Applied preference are not saving on profile and DB','2015-02-19 14:34:47',NULL,1),(488,13,123,276,NULL,3,'2015-02-18 00:00:00','2015-02-18 17:30:00','2015-02-18 00:00:00','2015-02-18 17:30:00',1,121,121,'Update message for anon/pre-enrolled in checkout to include Plenti.com','2015-02-19 14:34:57','2015-02-19 14:35:13',2),(489,13,123,264,NULL,5,'2015-02-19 11:00:00','2015-02-19 13:00:00','2015-02-19 11:00:00','2015-02-19 13:00:00',1,141,141,'fixing sonar issues and committing','2015-02-19 14:37:17','2015-02-19 14:37:37',2),(490,13,123,278,NULL,4,'2015-02-19 14:15:00','2015-02-19 17:00:00','2015-02-19 14:15:00','2015-02-19 19:30:00',1,141,141,'Functionality implemented, need to test and do changes if necessary','2015-02-19 14:41:03','2015-02-20 10:58:56',2),(491,13,123,265,NULL,3,'2015-02-19 11:30:00','2015-02-19 18:38:00','2015-02-19 11:30:00','2015-02-19 19:30:00',1,121,121,'Writing specs for enroll js','2015-02-19 15:45:01','2015-02-20 11:47:16',2),(492,51,123,272,NULL,3,'2015-02-19 18:55:00','2015-02-19 19:55:00',NULL,NULL,1,21,21,'test desc.','2015-02-20 06:28:12',NULL,1),(493,13,123,278,NULL,4,'2015-02-20 10:45:00','2015-02-20 17:00:00','2015-02-20 10:45:00','2015-02-20 19:30:00',1,141,141,'working on testing the scenarios and implementing the  necessary changes','2015-02-20 11:01:16','2015-02-23 19:31:13',2),(494,13,123,267,NULL,3,'2015-02-20 11:45:00','2015-02-20 19:30:00',NULL,NULL,1,121,121,'Writing specs for prefereces','2015-02-20 11:49:06',NULL,1),(495,13,123,265,NULL,3,'2015-02-20 11:00:00','2015-02-20 20:00:00',NULL,NULL,1,161,161,'Working on story Guest enrollment','2015-02-20 11:49:11',NULL,1),(496,13,123,265,NULL,3,'2015-02-19 11:00:00','2015-02-19 13:00:00','2015-02-19 11:00:00','2015-02-19 13:00:00',1,161,161,'Working on story 2406','2015-02-20 11:50:01','2015-02-20 11:50:42',2),(497,13,123,265,NULL,3,'2015-02-19 14:00:00','2015-02-19 19:00:00','2015-02-19 14:00:00','2015-02-19 19:00:00',1,161,161,'Working on story 2406','2015-02-20 11:50:32','2015-02-20 11:50:51',2),(498,161,123,270,NULL,10,'2015-02-20 10:30:00','2015-02-20 19:30:00','2015-02-20 10:30:00','2015-02-20 19:30:00',1,171,171,'','2015-02-20 12:02:54','2015-02-23 10:18:16',2),(499,31,NULL,NULL,NULL,NULL,'2015-02-20 12:00:00','2015-02-20 20:00:00','2015-02-20 12:00:00','2015-02-20 20:00:00',1,13,13,'Testing app','2015-02-20 12:49:21','2015-02-20 12:49:27',2),(500,161,123,269,NULL,4,'2015-02-20 10:50:00','2015-02-20 19:50:00',NULL,NULL,1,231,231,'Macys credit section for no cards scenario ','2015-02-20 19:22:11',NULL,1),(501,161,123,270,NULL,3,'2015-02-11 10:40:00','2015-02-11 20:00:00','2015-02-11 10:40:00','2015-02-11 20:30:00',1,231,231,'','2015-02-20 19:23:45','2015-02-20 19:24:10',2),(502,161,123,269,NULL,5,'2015-02-19 10:22:00','2015-02-19 20:00:00','2015-02-19 10:22:00','2015-02-19 20:30:00',1,231,231,'My account - macys credit section for no cards scenario','2015-02-20 19:25:43','2015-02-20 19:26:00',2),(503,161,123,271,NULL,2,'2015-02-17 10:15:00','2015-02-17 14:33:00','2015-02-17 10:15:00','2015-02-17 14:00:00',1,231,231,'Gateway - Non Authed User - Activation Box and  Implementation of template and render module for the gateway sign in page','2015-02-20 19:36:54','2015-02-20 19:37:23',2),(504,13,123,264,NULL,5,'2015-02-23 10:45:00','2015-02-23 19:29:00','2015-02-23 10:45:00','2015-02-23 19:30:00',1,141,141,'Implementing code review comments','2015-02-23 19:36:59','2015-02-23 19:37:14',2),(505,31,NULL,NULL,NULL,NULL,'2015-02-23 12:00:00','2015-02-23 20:00:00','2015-02-23 12:00:00','2015-02-23 20:00:00',1,13,13,'dir structure remodeling','2015-02-24 12:36:05','2015-02-24 12:36:11',2),(506,31,NULL,NULL,NULL,NULL,'2015-02-24 12:00:00','2015-02-24 20:34:00','2015-02-24 12:51:00','2015-02-24 20:51:00',1,13,13,'dir structure remodeling','2015-02-24 12:36:21','2015-02-24 12:52:50',2),(507,31,NULL,NULL,NULL,NULL,'2015-02-24 19:00:00','2015-02-24 19:30:00','2015-02-24 19:00:00','2015-02-24 19:30:00',1,13,13,'updated prod dir structure','2015-02-24 19:02:33','2015-02-24 19:02:42',2),(508,31,NULL,NULL,NULL,NULL,'2015-02-25 12:05:00','2015-02-25 20:05:00','2015-02-25 12:05:00','2015-02-25 20:05:00',1,13,13,'Working on session/memory leak issues','2015-02-25 13:07:20','2015-02-25 13:07:26',2);
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
) ENGINE=InnoDB AUTO_INCREMENT=195 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `myprojects`
--

LOCK TABLES `myprojects` WRITE;
/*!40000 ALTER TABLE `myprojects` DISABLE KEYS */;
INSERT INTO `myprojects` VALUES (3,13,1,'2014-10-21 11:18:19','2015-02-05 18:46:01',1),(11,31,1,'2014-10-22 10:24:30','2015-02-10 15:02:54',0),(21,23,1,'2014-10-27 19:06:25','2014-11-17 06:27:33',0),(31,41,1,'2014-10-27 19:07:09','2014-11-30 07:36:39',1),(41,51,1,'2014-10-28 10:36:05','2014-11-30 07:33:49',1),(51,61,1,'2014-10-28 10:37:06','2014-11-30 07:37:46',1),(61,71,1,'2014-10-28 10:37:41','2014-11-30 07:35:07',1),(71,81,1,'2014-10-28 10:38:28','2014-12-11 06:28:31',0),(81,91,1,'2014-10-28 10:38:42','2015-02-19 15:18:31',0),(91,3,1,'2014-10-30 14:16:49','2014-10-31 08:01:43',0),(101,101,1,'2014-11-03 15:04:54','2015-02-19 15:18:27',0),(111,111,1,'2014-11-04 10:33:26','2014-11-14 07:11:18',0),(121,121,1,'2014-11-04 10:38:20','2015-02-10 15:03:00',0),(131,151,1,'2014-11-11 10:47:29','2014-11-11 11:01:50',0),(141,141,1,'2014-11-12 15:40:50','2015-02-19 15:18:21',0),(151,161,1,'2014-11-12 16:13:48','2015-02-10 15:02:50',0),(183,13,2,'2015-01-29 20:00:17','2015-02-03 19:28:03',1),(184,13,4,'2015-01-29 23:53:01','2015-02-03 19:27:59',0),(185,13,3,'2015-01-30 00:02:32','2015-02-03 19:27:59',0),(186,161,5,'2015-02-03 15:17:41','2015-02-10 15:02:50',0),(187,237,2,'2015-02-03 15:24:25',NULL,1),(188,237,5,'2015-02-03 17:02:23',NULL,1),(189,31,2,'2015-02-03 19:28:24','2015-02-10 15:02:54',0),(190,237,1,'2015-02-10 15:23:52','2015-02-10 18:04:15',1),(191,201,1,'2015-02-10 15:31:56',NULL,1),(192,239,1,'2015-02-19 11:05:41','2015-02-20 00:39:02',0),(193,240,1,'2015-02-20 00:40:35',NULL,1),(194,241,1,'2015-02-20 06:02:45',NULL,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=242 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (3,'User Profile Improvements (UPI)','BCOM UPI.','2014-10-01','2014-10-31',1,'2014-10-21 11:17:05','2014-11-04 11:53:58',11,NULL,2,1),(13,'USL','Loyalty feature for MCOM customers ,','2014-09-01','2015-02-28',1,'2014-10-21 11:18:08','2014-11-13 17:38:08',11,NULL,2,1),(23,'Same Day Delivery (SDD)','Same-Day Delivery is a new shipping method added to Checkout Items at MCOM','2014-06-19','2014-11-16',1,'2014-10-21 17:50:53','2014-11-07 07:46:25',11,NULL,2,1),(31,'Nisum Planner','Team planner application that provides day-to-day activity details and effort went in to each project.','2014-10-01','2015-12-31',1,'2014-10-22 10:23:49','2014-11-07 07:45:46',11,NULL,2,1),(41,'BLM Enhancements','BLM Enhancements - Calculation of Loyallist Points and Reward card when items added/updated/deleted from bag.','2014-10-01','2015-01-31',1,'2014-10-27 12:13:48','2014-11-04 11:53:16',11,NULL,2,1),(51,'PayPal Integration','PayPal is a new payment option to the users for MCOM','2014-10-20','2014-12-31',1,'2014-10-28 06:37:46','2014-11-05 10:15:38',11,NULL,2,1),(61,'ocWishlist','Wishlist is a updated functionality on shopapp page which shows the user , previously saved lists having favourite products details and allows the user to create new lists and add products to purchase later.','2014-06-14','2014-11-30',1,'2014-10-28 06:38:16','2014-11-14 06:43:04',11,NULL,2,1),(71,'ocWallet phase-3','Wallet page site enchancemnets','2014-10-01','2014-12-31',1,'2014-10-28 06:38:46','2014-11-04 11:56:45',11,NULL,2,1),(81,'OSI support','OSI related works (OSI, Numera, OCC etc.,)','2014-10-01','2014-12-31',1,'2014-10-28 07:40:19','2014-11-04 11:54:16',11,NULL,2,1),(91,'Nisum Website and internal support','','2014-10-01','2014-12-31',1,'2014-10-28 07:40:50','2014-11-04 11:55:37',11,NULL,2,1),(101,'Loyalty De-coupling','Loyalty Decouple project','2014-06-01','2014-09-10',1,'2014-11-03 15:04:48','2014-11-04 11:56:09',11,NULL,2,1),(111,'Vacation','vacation','2014-11-01','2015-12-31',NULL,'2014-11-04 10:32:35','2015-02-10 18:06:14',1,NULL,1,1),(121,'Training','New developers under training. Or, people occupied in any training sessions.','2014-11-01','2015-12-31',1,'2014-11-04 10:38:16','0000-00-00 00:00:00',1,NULL,1,1),(131,'SST support',NULL,'2014-11-01','2015-12-31',1,'2014-11-05 11:13:21','0000-00-00 00:00:00',11,NULL,2,1),(141,'Code reviews',NULL,'2014-11-01','2015-12-31',1,'2014-11-05 11:37:34','0000-00-00 00:00:00',11,NULL,2,1),(151,'Project Meetings','Projects meetings','2014-11-11','2015-12-31',NULL,'2014-11-05 11:38:10','0000-00-00 00:00:00',1,NULL,1,1),(161,'CrediApp','Credit Application','2014-11-10','2015-06-30',1,'2014-11-12 16:13:42','2015-02-03 17:02:40',11,NULL,2,1),(171,'Absence','Absence',NULL,NULL,NULL,'2014-11-19 06:28:29','0000-00-00 00:00:00',1,NULL,1,1),(181,'Team / project planning','','2014-11-24','2015-12-31',1,'2014-11-24 06:39:11','0000-00-00 00:00:00',11,NULL,2,1),(201,'CCUI','','2014-12-18','2015-05-31',1,'2014-12-18 06:11:07','0000-00-00 00:00:00',11,NULL,2,1),(211,'Network outage','networks','2014-12-01','2015-12-31',1,'2014-12-26 10:25:22','2015-02-10 18:05:57',1,NULL,1,1),(221,'Project Blockers','blockers','2014-12-01','2015-12-31',1,'2014-12-26 10:27:43','2015-02-10 18:06:07',1,NULL,1,1),(236,'Holiday','public Holiday',NULL,NULL,NULL,'2015-02-03 14:16:47',NULL,1,NULL,1,1),(237,'Credit Systems Conversion Carryover','Credit Systems Conversion Carryover :: COM','2015-01-01','2015-04-30',5,'2015-02-03 15:15:56',NULL,311,NULL,2,1),(239,'Demo Project','Demo Project Description','2015-02-23','2015-03-31',1,'2015-02-19 11:05:32',NULL,11,NULL,2,1),(240,'Demo Project for Test','Demo Project','2015-02-23','2015-03-31',1,'2015-02-20 00:40:17',NULL,11,NULL,2,1),(241,'Demo Project 3','Demo Project','2015-02-23','2015-04-30',1,'2015-02-20 06:02:32',NULL,11,NULL,2,1);
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `nisumplanner`.`updateprojecttrigger` AFTER UPDATE ON `project` FOR EACH ROW

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projecthistory`
--

LOCK TABLES `projecthistory` WRITE;
/*!40000 ALTER TABLE `projecthistory` DISABLE KEYS */;
INSERT INTO `projecthistory` VALUES (1,239,'Demo Project','Demo Project Description','2015-02-23','2015-03-31',1,'2015-02-19 11:05:32',NULL,11,NULL,2,1),(2,240,'Demo Project for Test','Demo Project','2015-02-23','2015-03-31',1,'2015-02-20 00:40:17',NULL,11,NULL,2,1),(3,241,'Demo Project 3','Demo Project','2015-02-23','2015-04-30',1,'2015-02-20 06:02:32',NULL,11,NULL,2,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projectpermission`
--

LOCK TABLES `projectpermission` WRITE;
/*!40000 ALTER TABLE `projectpermission` DISABLE KEYS */;
INSERT INTO `projectpermission` VALUES (31,41,1,'2015-02-05',1),(32,201,1,'2015-02-05',1),(33,141,2,'2015-02-05',1),(34,141,4,'2015-02-05',1),(35,141,3,'2015-02-05',1),(36,141,1,'2015-02-05',0),(37,141,5,'2015-02-05',1),(38,161,1,'2015-02-05',1),(39,161,2,'2015-02-05',1),(40,237,1,'2015-02-05',1),(41,237,2,'2015-02-05',1),(42,101,1,'2015-02-05',0),(43,101,2,'2015-02-05',1),(44,31,1,'2015-02-05',1),(45,91,1,'2015-02-05',0),(46,71,1,'2015-02-05',1),(47,71,2,'2015-02-05',1),(48,61,1,'2015-02-05',1),(49,81,1,'2015-02-05',1),(50,51,1,'2015-02-05',1),(51,23,1,'2015-02-05',1),(52,131,5,'2015-02-05',1),(53,131,1,'2015-02-05',0),(54,131,3,'2015-02-05',1),(55,131,4,'2015-02-05',1),(56,131,2,'2015-02-05',1),(57,181,2,'2015-02-05',1),(58,181,4,'2015-02-05',1),(59,181,3,'2015-02-05',1),(60,181,1,'2015-02-05',1),(61,181,5,'2015-02-05',1),(62,3,1,'2015-02-05',1),(63,3,2,'2015-02-05',1),(64,3,4,'2015-02-05',1),(65,13,1,'2015-02-05',1),(66,41,4,'2015-02-10',1),(67,161,3,'2015-02-10',1),(68,239,1,'2015-02-19',1),(69,240,1,'2015-02-20',1),(70,241,1,'2015-02-20',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=1492 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projectresource`
--

LOCK TABLES `projectresource` WRITE;
/*!40000 ALTER TABLE `projectresource` DISABLE KEYS */;
INSERT INTO `projectresource` VALUES (1191,13,131,'','2014-10-04','2015-01-03',1,NULL,11,NULL,'2014-11-24 11:41:17','0000-00-00 00:00:00'),(1211,13,111,'','2015-02-01','2015-05-01',1,'4811',11,NULL,'2014-11-30 07:25:48','2015-01-29 17:12:16'),(1221,13,141,'','2015-02-01','2015-05-01',1,'4815',11,NULL,'2014-11-30 07:26:19','2015-01-29 17:15:48'),(1241,13,101,'','2014-10-04','2015-01-03',1,NULL,11,NULL,'2014-11-30 07:31:05','0000-00-00 00:00:00'),(1251,13,51,'','2014-11-17','2015-01-03',1,NULL,11,NULL,'2014-11-30 07:31:27','0000-00-00 00:00:00'),(1261,13,41,'','2015-02-01','2015-05-01',1,'4987',11,NULL,'2014-11-30 07:31:56','2015-01-29 17:09:09'),(1271,13,81,'','2015-02-01','2015-05-01',1,'4812',11,NULL,'2014-11-30 07:32:33','2015-01-29 17:10:27'),(1281,13,121,'','2014-11-10','2015-01-03',0,'NA',11,NULL,'2014-11-30 07:33:26','0000-00-00 00:00:00'),(1301,51,71,'','2014-11-02','2015-01-03',1,NULL,11,NULL,'2014-11-30 07:34:21','0000-00-00 00:00:00'),(1311,51,31,'','2014-11-17','2015-01-03',1,NULL,11,NULL,'2014-11-30 07:34:44','0000-00-00 00:00:00'),(1321,71,61,'','2014-07-05','2015-01-03',1,NULL,11,NULL,'2014-11-30 07:35:48','0000-00-00 00:00:00'),(1331,51,61,'','2014-11-24','2015-01-03',0,'NA',11,NULL,'2014-11-30 07:36:15','0000-00-00 00:00:00'),(1341,41,91,'','2014-11-02','2015-02-12',1,'B51204',11,NULL,'2014-11-30 07:37:26','2015-02-10 14:40:42'),(1361,61,21,'','2014-10-05','2015-02-22',1,'554545',11,11,'2014-11-30 07:38:15','2015-02-19 11:57:05'),(1371,61,161,'','2014-10-05','2015-01-03',0,'NA',11,NULL,'2014-11-30 07:38:37','0000-00-00 00:00:00'),(1381,81,191,'','2014-09-24','2015-01-31',0,'NA',11,NULL,'2014-11-30 07:40:21','0000-00-00 00:00:00'),(1463,13,290,NULL,'2015-02-01','2015-05-01',1,'4810',11,NULL,'2015-01-29 20:01:21',NULL),(1464,13,288,'','2015-02-01','2015-05-01',1,'4803',11,NULL,'2015-01-29 20:02:01',NULL),(1465,13,286,'','2015-02-01','2015-05-01',1,'4801',11,NULL,'2015-01-29 20:02:43',NULL),(1466,13,289,NULL,'2015-02-01','2015-05-01',1,'4807',11,NULL,'2015-01-29 20:03:40',NULL),(1467,13,293,'','2015-02-01','2015-05-02',1,'4915',11,NULL,'2015-01-29 20:04:11',NULL),(1468,13,291,'','2015-02-01','2015-05-01',1,'4813',11,NULL,'2015-01-29 20:04:49',NULL),(1469,13,297,'','2015-01-27','2015-03-11',1,'4988',11,NULL,'2015-01-29 23:58:23',NULL),(1470,13,295,'','2015-02-01','2015-05-02',1,'4914',11,NULL,'2015-01-30 00:05:05','2015-01-30 00:20:04'),(1471,13,296,'','2015-02-01','2015-05-02',1,'4913',11,NULL,'2015-01-30 00:08:39',NULL),(1472,13,292,'','2015-02-01','2015-05-02',1,'4911',11,NULL,'2015-01-30 00:10:00',NULL),(1473,13,294,'','2015-02-01','2015-05-02',1,'4912',11,NULL,'2015-01-30 00:10:49',NULL),(1475,161,312,'qe','2015-02-01','2015-04-03',1,'4733',11,NULL,'2015-02-03 15:20:39','2015-02-03 15:20:48'),(1476,237,314,'dev','2015-02-01','2015-03-31',1,'4738',11,NULL,'2015-02-03 15:24:51',NULL),(1477,237,315,'dev','2015-02-01','2015-03-31',1,'4740',11,NULL,'2015-02-03 15:25:13',NULL),(1478,237,313,'','2015-02-01','2015-03-31',1,'5001',11,NULL,'2015-02-03 17:03:48',NULL),(1479,31,13,'Internal Resource management tool.','2014-09-01','2015-03-30',0,'NA',11,NULL,'2015-02-09 19:21:41','2015-02-09 19:22:31'),(1480,31,91,'Updation of Nisum Planner Application','2015-02-09','2015-02-10',1,'B54210',11,NULL,'2015-02-10 14:49:20','2015-02-10 14:57:08'),(1481,161,61,'Updation of Credit App','2015-02-08','2015-02-18',1,'B7545',11,NULL,'2015-02-10 15:01:29',NULL),(1482,239,51,'Manoj for UI component','2015-02-23','2015-03-31',1,'1234',11,NULL,'2015-02-19 11:07:11',NULL),(1483,239,261,'CSS guy','2015-02-23','2015-02-27',0,'NA',11,NULL,'2015-02-19 11:07:31',NULL),(1484,240,101,'CSS Developer','2015-02-23','2015-03-31',1,'1234',11,NULL,'2015-02-20 00:41:33',NULL),(1485,240,271,'JS Developer','2015-02-26','2015-03-31',0,'NA',11,11,'2015-02-20 00:42:34','2015-02-20 00:42:43'),(1486,41,31,'test','2015-02-19','2015-02-24',1,'2345',11,11,'2015-02-20 00:44:49','2015-02-20 00:45:07'),(1487,241,171,'CSS guy','2015-02-23','2015-04-30',1,'SOW123',11,NULL,'2015-02-20 06:04:28',NULL),(1488,241,261,'JS developer','2015-02-23','2015-03-31',0,'',11,NULL,'2015-02-20 06:05:01',NULL),(1489,241,231,'UI','2015-02-23','2015-03-31',1,'SOW2345',11,NULL,'2015-02-20 06:19:25',NULL),(1490,237,13,'testing app','2015-01-06','2015-06-30',1,'C123',11,NULL,'2015-02-20 15:33:12',NULL),(1491,237,81,'ui dev.','2015-02-01','2015-02-28',0,'NA',11,11,'2015-02-20 15:33:40','2015-02-20 15:34:19');
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `nisumplanner`.`updateprojectresourcetrigger` AFTER UPDATE ON `projectresource` FOR EACH ROW    

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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projectresourcehistory`
--

LOCK TABLES `projectresourcehistory` WRITE;
/*!40000 ALTER TABLE `projectresourcehistory` DISABLE KEYS */;
INSERT INTO `projectresourcehistory` VALUES (1,1484,240,101,'CSS Developer','2015-02-23','2015-03-31',1,'1234',11,NULL,'2015-02-20 00:41:33',NULL),(2,1485,240,271,'JS Developer','2015-02-26','2015-03-31',1,'2345',11,NULL,'2015-02-20 00:42:34',NULL),(3,1485,NULL,NULL,NULL,NULL,NULL,0,'NA',NULL,11,NULL,'2015-02-20 00:42:43'),(4,1486,41,31,'test','2015-02-19','2015-02-25',1,'2345',11,NULL,'2015-02-20 00:44:49',NULL),(5,1486,NULL,NULL,NULL,NULL,'2015-02-24',NULL,NULL,NULL,11,NULL,'2015-02-20 00:45:07'),(6,1487,241,171,'CSS guy','2015-02-23','2015-04-30',1,'SOW123',11,NULL,'2015-02-20 06:04:28',NULL),(7,1488,241,261,'JS developer','2015-02-23','2015-03-31',0,'',11,NULL,'2015-02-20 06:05:01',NULL),(8,1489,241,231,'UI','2015-02-23','2015-03-31',1,'SOW2345',11,NULL,'2015-02-20 06:19:25',NULL),(9,1490,237,13,'testing app','2015-01-06','2015-06-30',1,'C123',11,NULL,'2015-02-20 15:33:12',NULL),(10,1491,237,81,'ui dev','2015-02-01','2015-02-28',0,'NA',11,NULL,'2015-02-20 15:33:40',NULL),(11,1491,NULL,NULL,'ui dev.',NULL,NULL,NULL,NULL,NULL,11,NULL,'2015-02-20 15:33:52'),(12,1491,NULL,NULL,NULL,NULL,NULL,1,'C23',NULL,11,NULL,'2015-02-20 15:34:09'),(13,1491,NULL,NULL,NULL,NULL,NULL,0,'NA',NULL,11,NULL,'2015-02-20 15:34:19');
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
) ENGINE=InnoDB AUTO_INCREMENT=283 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `story`
--

LOCK TABLES `story` WRITE;
/*!40000 ALTER TABLE `story` DISABLE KEYS */;
INSERT INTO `story` VALUES (21,'3455',121,13,'AJAX call to be made to the new method for displaying points on order confirmation page',1,0,NULL,13,NULL,'2014-12-29 08:50:26','2015-02-06 15:58:00',1),(31,'3309',122,13,'UI:Enroll: Set preferences: Signed In: Emails & texts',1,0,NULL,111,NULL,'2014-12-29 09:04:14',NULL,1),(41,'3408',122,13,'UI:Review Order',1,0,NULL,111,NULL,'2014-12-29 10:08:50',NULL,1),(51,'3297',122,13,'UI:Anonymous SI & Guest Enroll: Success: Shop, My Account, & Apply Now',1,0,NULL,111,NULL,'2014-12-29 10:09:34',NULL,1),(61,'2970',122,13,'Assoc USL ID to Macy\'s credit card: from landing page: No CC on profile',1,0,NULL,111,NULL,'2014-12-29 10:13:55',NULL,1),(71,'3525',122,13,'Associate USL ID to Macy\'s credit card',1,0,NULL,111,NULL,'2014-12-29 10:17:08',NULL,1),(81,'3524',122,13,'Associate USL ID to Macy\'s credit card (I)',1,0,NULL,111,NULL,'2014-12-29 10:17:51',NULL,1),(91,'Working on backbone app',122,121,'Self training, and working on backbone app',2,40,1,161,NULL,'2014-12-30 06:01:06',NULL,1),(121,'D-04421',122,41,'PPPC module is not displaying in chrome browser in a particular scenario',2,20,1,91,11,'2015-01-02 06:05:49','2015-02-18 00:25:54',1),(131,'B-03387',122,41,'BCOM: Loyallist Point Table in Checkout: Adds Loyallist ID in Checkout',1,0,NULL,91,NULL,'2015-01-02 06:13:21',NULL,1),(141,'stoeyl',122,3,'hellos',1,0,NULL,21,NULL,'2015-01-04 03:28:28',NULL,1),(151,'3596',122,13,'Redeem field is not getting highlighted, when user continue checkout with empty redeem field without entering and applying PIN',1,0,NULL,141,NULL,'2015-01-05 06:16:19',NULL,1),(161,'3608',122,13,'UI: Error message is not getting cleared on Payment page',1,0,NULL,111,NULL,'2015-01-05 06:26:35',NULL,1),(171,'B-06384',122,41,'Remove Loyallist Order Confirmation Informational Text Killswitch',1,0,NULL,91,NULL,'2015-01-06 05:56:24',NULL,1),(191,'Ctrl+v validation of lookUp fields',122,13,'not allowing ctrl+v to paste characters but to allo numbers.',2,16,1,13,NULL,'2015-01-06 14:50:09','2015-02-10 19:29:07',1),(201,'B-03410',122,41,'BCOM: Coremetrics: Pre-Purchase Point Calculation Checkout',1,0,NULL,91,NULL,'2015-01-07 05:50:09',NULL,1),(211,'3667',122,13,'Defect : applied points are seen in order summary section eventhough applying USL points failed',2,8,1,141,NULL,'2015-01-08 06:02:45',NULL,1),(223,'B-06176',122,51,'MCOMUI: Payment edits for guest user',1,0,NULL,71,NULL,'2015-02-06 13:02:35',NULL,1),(224,'Testing app story',101,31,'testing',1,0,NULL,11,NULL,'2015-02-06 15:58:54','2015-02-06 16:00:26',1),(225,'test',123,31,'test',2,123,2,13,NULL,'2015-02-06 15:59:27',NULL,1),(226,'3833',121,13,'Confirmation page',1,0,NULL,111,13,'2015-02-06 16:10:39','2015-02-12 14:46:48',1),(227,'3820',122,13,'Error messaging is not getting displayed if the points to be redeemed exceeds the transaction total after promotions are applied or product is removed reducing the transaction total.',1,0,NULL,111,NULL,'2015-02-10 12:12:47',NULL,1),(228,'3441',122,13,'wrong tab name display on preferences page',2,2,1,41,NULL,'2015-02-10 12:13:05',NULL,1),(229,'3844',122,13,'USL points section is not getting displayed on order confirmation page when we place an order with USL ID',2,4,1,121,NULL,'2015-02-10 12:21:58',NULL,1),(240,'B-05481',121,41,'BCOM: Shopping Bag: Suppress PPPC for 0 points',1,0,NULL,91,NULL,'2015-02-10 14:37:09',NULL,1),(241,'B-03409',121,41,'BCOM: Checkout: Suppress PPPC for 0 points',1,0,NULL,91,NULL,'2015-02-10 14:37:46',NULL,1),(242,'D-05556',122,51,'MCOM PayPal :: Loading page is not displaying as expected after payment / shipping-payment page submission',1,0,NULL,71,NULL,'2015-02-10 15:39:43',NULL,1),(243,'3452',122,13,'Change password length validations',1,0,NULL,141,NULL,'2015-02-10 18:05:18',NULL,1),(244,'3533',122,13,'UI: Bad user experience when selected drop downs on USL enrollment page',1,0,NULL,31,NULL,'2015-02-10 18:16:21',NULL,1),(245,'2555',122,13,'My Plent link is not showing in left navigation section when user nagigates to below left navigations pages Furniture & Mattress Status and Gift Card Balance',1,0,NULL,31,NULL,'2015-02-10 18:17:47',NULL,1),(246,'3778',122,13,'Masked USL ID is not getting displayed on review page, when USL service is down',1,0,NULL,111,NULL,'2015-02-10 18:18:01',NULL,1),(249,'3822',122,13,'Error message is displaying wrongly/not displaying',1,0,NULL,111,NULL,'2015-02-10 18:18:55',NULL,1),(250,'ECOMSST-41012',122,131,'Lot more session created for mcom after 14K',1,0,NULL,31,NULL,'2015-02-10 18:33:37',NULL,1),(251,'3837',122,13,'Expected error message is not getting displayed on order confirmation page, when order placed in batch mode or USL down or LTY down',1,0,NULL,141,NULL,'2015-02-10 18:41:10',NULL,1),(252,'writing specs',122,13,'updating specs for enroll.js and checkoutLoyalty.js',1,0,NULL,141,NULL,'2015-02-10 18:50:56',NULL,1),(253,' BUS:0761 UI:: MCOM:: Edit Profile',122,161,'Remove all Credit related information and actions- Dev Competed hence moved to In test.',1,0,NULL,231,NULL,'2015-02-10 19:22:53','2015-02-10 19:31:24',1),(254,'B-7778',122,161,'My Account Page credit section',1,0,NULL,81,NULL,'2015-02-10 19:30:02',NULL,1),(255,'B-7849',122,161,'Speed Bump Overlay',1,0,NULL,81,NULL,'2015-02-10 19:30:31',NULL,1),(256,'B-6798',122,161,'UI Tiles Folder Structure',1,0,NULL,81,NULL,'2015-02-10 19:30:55',NULL,1),(257,'test11',123,31,'tet',1,0,NULL,11,NULL,'2015-02-11 12:54:32',NULL,1),(258,'B-07880',111,51,'MCOM UI: Signed in and Guest: Payment / Shipping-payment Page Submission: Spinning wheel display',1,0,NULL,71,NULL,'2015-02-11 16:05:32','2015-02-11 16:07:39',1),(261,'B-07567',122,161,'Add Card Overlay',1,0,NULL,81,NULL,'2015-02-11 16:09:59',NULL,1),(262,'B-06731',122,161,'Tech Story',1,0,NULL,81,NULL,'2015-02-11 16:11:32',NULL,1),(263,'B-07565',122,161,'Remove fields',1,0,NULL,81,NULL,'2015-02-11 16:12:43',NULL,1),(264,'2421',123,13,'Coremetrics: USL: My Account Summary',1,0,NULL,141,NULL,'2015-02-12 11:21:58',NULL,1),(265,'2406',123,13,'Coremetrics for guest enroll page',1,0,NULL,41,NULL,'2015-02-12 11:25:18',NULL,1),(266,'3817',122,13,'USL section is not as per comp on My Account page IN ipad, iE9',2,8,1,121,121,'2015-02-12 16:04:26','2015-02-12 16:05:51',1),(267,'2425',123,13,'Coremetrics: USL sign in page',1,0,NULL,121,NULL,'2015-02-12 16:13:38',NULL,1),(268,'3831',123,13,'Updating error messaging stories for myaccount page',1,0,NULL,41,NULL,'2015-02-16 10:39:10',NULL,1),(269,'B-07624',123,161,'My Account with 1 Card - Pay Bill view',1,0,NULL,81,NULL,'2015-02-16 20:29:40',NULL,1),(270,'B-09170',123,161,'Gateway - Non Authed User - Activation Box',1,0,NULL,81,NULL,'2015-02-16 20:31:11',NULL,1),(271,'B-06840',123,161,'Edit My Profile - Update save changes & edit billing address overlays',1,0,NULL,81,NULL,'2015-02-16 20:32:12',NULL,1),(272,'6138',123,51,'BOPS Normal order checkout',1,0,NULL,21,21,'2015-02-19 10:53:26','2015-02-19 10:59:13',1),(273,'6140',123,51,'BOPS Order - Signed User',1,0,NULL,21,21,'2015-02-19 10:55:47','2015-02-19 10:59:40',1),(275,'testing123',123,31,'sa sasda',1,0,NULL,11,NULL,'2015-02-19 12:32:57',NULL,1),(276,'3747',123,13,'Update message for anon/pre-enrolled in checkout to include Plenti.com',1,0,NULL,121,NULL,'2015-02-19 14:34:02',NULL,1),(277,'3889',123,13,'Wrong button is displaying on set preference page when USL site Failed and Applied preference are not saving on profile and DB',2,3,1,41,NULL,'2015-02-19 14:34:12',NULL,1),(278,'2449',123,13,'Handle session timeout scenarios on checkout page for USL',1,0,NULL,141,NULL,'2015-02-19 14:38:50',NULL,1),(279,'1234',123,13,'Test Story',1,NULL,NULL,11,NULL,'2015-02-20 06:21:08',NULL,1),(280,'123',123,13,'story dec',2,2,1,21,NULL,'2015-02-20 06:29:21',NULL,1);
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `nisumplanner`.`updatestorytrigger` AFTER UPDATE ON `story` FOR EACH ROW BEGIN

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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storyhistory`
--

LOCK TABLES `storyhistory` WRITE;
/*!40000 ALTER TABLE `storyhistory` DISABLE KEYS */;
INSERT INTO `storyhistory` VALUES (1,272,'BOPS Order  for Guest user',123,51,'BOPS Order  for Guest user',1,0,NULL,21,NULL,'2015-02-19 10:53:26',NULL,1),(2,273,'BOPS Order - Signed User',123,51,'BOPS Order - Signed User',1,0,NULL,21,NULL,'2015-02-19 10:55:47',NULL,1),(3,272,'6138',NULL,NULL,'BOPS Normal order checkout',NULL,NULL,NULL,NULL,21,NULL,'2015-02-19 10:59:13',NULL),(4,273,'6140',NULL,NULL,NULL,NULL,NULL,NULL,NULL,21,NULL,'2015-02-19 10:59:40',NULL),(5,275,'testing123',123,31,'sa sasda',1,0,NULL,11,NULL,'2015-02-19 12:32:57',NULL,1),(6,276,'3747',123,13,'Update message for anon/pre-enrolled in checkout to include Plenti.com',1,0,NULL,121,NULL,'2015-02-19 14:34:02',NULL,1),(7,277,'3889',123,13,'Wrong button is displaying on set preference page when USL site Failed and Applied preference are not saving on profile and DB',2,3,1,41,NULL,'2015-02-19 14:34:12',NULL,1),(8,278,'2449',123,13,'Handle session timeout scenarios on checkout page for USL',1,0,NULL,141,NULL,'2015-02-19 14:38:50',NULL,1),(9,279,'1234',123,13,'Test Story',1,NULL,NULL,11,NULL,'2015-02-20 06:21:08',NULL,1),(10,280,'123',123,13,'story dec',2,2,1,21,NULL,'2015-02-20 06:29:21',NULL,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (11,'Details overlay',21,'Add CSS for Loyalty decoupling \"my offers\" overlay in order confirmation page',16,1,111,NULL,'2014-12-29 08:57:04','2015-01-22 17:40:02',1),(21,'Jasmine unit testing ',21,'Write test cases for loyalty decoupling functionality',16,1,111,NULL,'2014-12-29 08:59:05','2015-01-22 17:40:08',1),(31,'Integration with backend',21,'Work on integrating properties with backend',16,1,111,NULL,'2014-12-29 09:00:29',NULL,1),(41,'Integration with backend',51,'Integrate properties provided by shopApp',16,1,111,NULL,'2014-12-29 10:10:39',NULL,1),(51,'Ajax call implementation',61,'Make a request to shopApp team with cardID to link USL ID',16,1,111,NULL,'2014-12-29 10:16:04',NULL,1),(53,'test sub task',224,'sub',1235,2,11,NULL,'2015-02-06 15:59:07','2015-02-06 15:59:12',1),(54,'xxx',257,'fcgd',23,2,11,NULL,'2015-02-11 12:54:48',NULL,1),(55,'re',257,'vbcv',32,1,11,NULL,'2015-02-11 12:54:57',NULL,1);
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `nisumplanner`.`updatetasktrigger` AFTER UPDATE ON `task` FOR EACH ROW

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taskhistory`
--

LOCK TABLES `taskhistory` WRITE;
/*!40000 ALTER TABLE `taskhistory` DISABLE KEYS */;
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
INSERT INTO `team` VALUES (1,'UI','UI TEAM',11,'2014-10-21 08:22:15','2015-02-05 18:48:16',1,1),(2,'HUB','Hub Dev Team',283,'2015-01-22 19:15:56',NULL,1,1),(3,'SDP','SDP Team',284,'2015-01-22 19:17:04',NULL,1,1),(4,'QA','QA Team',287,'2015-01-29 12:56:11','2015-01-29 13:05:18',1,1),(5,'WBQE','WBQE',311,'2015-02-03 15:15:07',NULL,1,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=310 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teamresource`
--

LOCK TABLES `teamresource` WRITE;
/*!40000 ALTER TABLE `teamresource` DISABLE KEYS */;
INSERT INTO `teamresource` VALUES (11,1,21,NULL),(31,1,41,NULL),(51,1,61,NULL),(61,1,71,NULL),(71,1,81,NULL),(81,1,91,NULL),(91,1,101,NULL),(111,1,121,NULL),(131,1,141,NULL),(141,1,161,NULL),(161,1,171,NULL),(171,1,131,NULL),(181,1,31,NULL),(191,1,111,NULL),(201,1,191,NULL),(211,1,201,NULL),(221,1,211,NULL),(231,1,221,NULL),(241,1,231,NULL),(251,1,51,NULL),(261,1,251,NULL),(271,1,261,NULL),(281,1,271,NULL),(291,1,281,NULL),(292,2,285,NULL),(293,2,286,NULL),(294,2,288,NULL),(295,2,289,NULL),(296,2,290,NULL),(297,2,291,NULL),(298,3,292,NULL),(299,2,293,NULL),(300,3,294,NULL),(301,3,295,NULL),(302,3,296,NULL),(303,4,297,NULL),(304,3,310,NULL),(305,5,312,NULL),(306,5,313,NULL),(307,2,314,NULL),(308,2,315,NULL),(309,1,13,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=294 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userdetails`
--

LOCK TABLES `userdetails` WRITE;
/*!40000 ALTER TABLE `userdetails` DISABLE KEYS */;
INSERT INTO `userdetails` VALUES (1,1,1,'Admin','Nisum','0000000000',1,1,'2014-10-16 12:31:43','0000-00-00 00:00:00',1),(11,11,2,'Srikanth','Kata','9999999999',3,1,'2014-10-21 08:21:05','2015-02-24 19:41:59',1),(13,13,3,'Sandeep','Gaddam','8977300894',1,0,'2014-10-21 11:09:03','2015-02-06 17:16:05',1),(21,21,3,'Ramesh','Polishetti','9701181405',2,0,'2014-10-26 08:45:50','0000-00-00 00:00:00',1),(31,31,3,'Mahesh','Dontula','9966658030',1,0,'2014-10-26 17:00:46','2014-10-30 12:14:46',1),(41,41,3,'Marathi','Grishma','8886084000',1,0,'2014-10-27 04:42:05','0000-00-00 00:00:00',1),(51,51,3,'Manoj','Thakur','8885638287',1,0,'2014-10-27 04:43:10','2014-11-15 08:04:28',1),(61,61,3,'Venkatesh','Marugalla','9030389822',1,0,'2014-10-27 04:52:41','0000-00-00 00:00:00',1),(71,71,3,'Srinivas','Ellandula','7675878984',1,0,'2014-10-27 08:35:58','0000-00-00 00:00:00',1),(81,81,3,'saikumar','ponnuru','9032870245',1,0,'2014-10-27 08:46:05','0000-00-00 00:00:00',1),(91,91,3,'Gangadhar','Vuyyuru','9000418660',2,0,'2014-10-27 11:43:29','0000-00-00 00:00:00',1),(101,101,3,'Vanava Raju','Adabala','9985558369',1,0,'2014-10-27 13:46:37','0000-00-00 00:00:00',1),(111,111,3,'ROOP','PADALA','9542323033',1,0,'2014-10-28 09:57:12','2014-11-05 08:15:53',1),(121,121,3,'Sowjanya','Kopella','9494914446',1,0,'2014-10-28 10:15:57','0000-00-00 00:00:00',1),(131,131,3,'Arti','Agrawal','1231231234',1,0,'2014-10-28 11:24:45','2014-10-30 08:44:47',0),(141,141,3,'Raviteja','Panchagnula','9492538028',1,0,'2014-10-29 10:05:00','2014-11-20 11:58:36',1),(151,161,3,'shiva shankar','Audam','8886867695',1,0,'2014-10-29 10:06:22','0000-00-00 00:00:00',1),(161,171,3,'BAKKU PAVAN','KUMAR','7386684307',1,0,'2014-10-30 05:50:00','0000-00-00 00:00:00',1),(171,181,1,'premchand','Anubrolu','1111111111',1,1,'2014-10-30 22:47:59','0000-00-00 00:00:00',1),(181,191,3,'RamaRao','R','9849352892',1,0,'2014-11-04 09:44:39','0000-00-00 00:00:00',1),(191,201,3,'Ramesh','Meduri','9492877162',1,0,'2014-11-04 09:54:24','0000-00-00 00:00:00',1),(201,211,3,'Keerthi','Inavole','1111111111',1,0,'2014-11-04 10:31:14','0000-00-00 00:00:00',1),(211,221,3,'VENKATA SAIKIRAN','KOKKU','8121417187',1,0,'2014-11-04 11:33:57','0000-00-00 00:00:00',1),(221,231,3,'venkata sai kiran','kokku','8121417187',1,0,'2014-11-07 06:50:29','0000-00-00 00:00:00',1),(231,241,2,'Srinivas','Gangapurkar','4088585674',3,0,'2014-11-20 00:00:32','0000-00-00 00:00:00',1),(241,251,3,'Srikanth','Guntha','9908268257',1,0,'2014-11-24 14:18:03','0000-00-00 00:00:00',1),(251,261,3,'Naresh Kumar','Renukuntla','9700228104',1,0,'2014-12-01 07:16:52','0000-00-00 00:00:00',1),(261,271,3,'Vamsi','K','9160052728',1,0,'2014-12-18 06:44:49','0000-00-00 00:00:00',1),(271,281,3,'swathi','sangireddy','9493140100',1,0,'2014-12-19 05:35:22','0000-00-00 00:00:00',1),(272,282,4,'Executive','Manager','9999988888',3,1,'2015-01-22 17:16:07',NULL,1),(273,283,2,'hub','hub','1231231231',3,1,'2015-01-22 19:15:14',NULL,1),(274,284,2,'SDP','SDP','987987897897',3,0,'2015-01-22 19:16:35',NULL,1),(275,285,3,'hubuser','hubuser','1234567890',1,0,'2015-01-22 19:57:20',NULL,1),(276,286,3,'Goutham','Thiyyagura','8886866666',1,0,'2015-01-29 12:24:30',NULL,1),(277,287,2,'qa','qa','1234567890',3,1,'2015-01-29 12:55:28',NULL,1),(278,288,3,'Eswar','Ambati','8886866666',1,0,'2015-01-29 14:27:43',NULL,1),(279,289,3,'Ramadevi','Yarram','8886866666',1,0,'2015-01-29 14:35:53',NULL,1),(280,290,3,'Durga','Devarapalli','8886866666',1,0,'2015-01-29 14:36:53',NULL,1),(281,291,3,'Srikanth','Tatipalli','8886866666',1,0,'2015-01-29 14:37:40',NULL,1),(282,292,3,'Raghavendra','Sudineni','8886866666',1,0,'2015-01-29 14:40:32',NULL,1),(283,293,3,'Shashi','Valabhoju','8886866666',1,0,'2015-01-29 14:54:46',NULL,1),(284,294,3,'Naresh','Kodumoori','8886866666',1,0,'2015-01-29 15:08:40',NULL,1),(285,295,3,'Madhurima','Vadlamudi','8886866666',1,0,'2015-01-29 15:15:21',NULL,1),(286,296,3,'Rajesh','Thimmani','8886866666',1,0,'2015-01-29 15:21:01',NULL,1),(287,297,3,'Thejaswi','Vemula','8886866666',1,0,'2015-01-29 15:35:27',NULL,1),(288,310,3,'Ramesh','Aragala','8886866666',1,0,'2015-01-29 20:11:30',NULL,1),(289,311,2,'WBQE','WBQE','9999999999',3,1,'2015-02-03 15:14:33',NULL,1),(290,312,3,'Jyotsna','Cattamanchi','1111111111',1,0,'2015-02-03 15:18:41',NULL,1),(291,313,3,'Hymavathi','Maradani','1111111111',1,0,'2015-02-03 15:19:19',NULL,1),(292,314,3,'Sukumar','Vulupala','1111111111',1,0,'2015-02-03 15:22:23',NULL,1),(293,315,3,'Ramesh','Kommanaveni','1111111111',1,0,'2015-02-03 15:23:13',NULL,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=339 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@nisum.com','d033e22ae348aeb5660fc2140aec35850c4da997'),(11,'skata@nisum.com','bb41f514afcbbc6bdc6fba201d92c610d9ef9763'),(13,'sgaddam@nisum.com','6c1f9442a69c8f5ba461f7b853a329c2c949c620'),(21,'rpolishetti@nisum.com','957b8cb5f7717357e6faa369a9a5ebef7af1a329'),(31,'mdontula@nisum.com','d8ec06b217d6c087fe7c00736fb00ec2b6632620'),(41,'gmarathi@nisum.com','bf373d82bd51735af9dcfbe4e5126a946c992e91'),(51,'mthakur@nisum.com','7c4a8d09ca3762af61e59520943dc26494f8941b'),(61,'vmarugalla@nisum.com','3c20e4347da9d6afceae3951bc42ee8441965240'),(71,'sellandula@nisum.com','f4c9cf8076fb344d65f2c6644b27924c9846f075'),(81,'sponnuru@nisum.com','e356e39805e103756082461e7cfc97d9c183577c'),(91,'gvuyyuru@nisum.com','0820b32b206b7352858e8903a838ed14319acdfd'),(101,'vadabala@nisum.com','b10ddc955cb87d230d926d27d0f7c31137b22df6'),(111,'rpadala@nisum.com','e2187aee974340fd1d4c0bf346605ff3f5c973de'),(121,'skopella@nisum.com','9e92a27113911972bf84598d5606f1eddd33aa33'),(131,'aagrawal@nisum.com','8cb2237d0679ca88db6464eac60da96345513964'),(141,'rpanchagnula@nisum.com','a544daf30513173d8f5c759fc84ce65ad7506c3a'),(161,'saudam@nisum.com','f67d010cbbe67ac40f99f49efa7f1faf7c817e3a'),(171,'pbakku@nisum.com','8514e1c9898fa8b3963eb993d21fe37e0248a0a8'),(181,'panubrolu@nisum.com','a544daf30513173d8f5c759fc84ce65ad7506c3a'),(191,'rrouthu@nisum.com','e17e5425a021224b63e91499ff8ac491c87567db'),(201,'rmeduri@nisum.com','8bec631ca5bdb048f76bad48e624776b2534cff7'),(211,'kinavole@nisum.com','15bda94f548ef8d74c11f30e1fdacc382f6a99dd'),(221,'skokku@nisum.com','34fb2c722e4306185cebeefbc6243de6fb2ff37a'),(231,'vkokku@nisum.com','34fb2c722e4306185cebeefbc6243de6fb2ff37a'),(241,'sgangapurkar@nisum.com','17d67bf26ca5a6e89d6f68c8f3dbbd93e60dd855'),(251,'sguntha@nisum.com','fbcdc3938548447e0e0b97c5f7e94bff1a21ee91'),(261,'nrenukuntla@nisum.com','bf5564acb124688f337286dcb2a7b77c9fd4bfe1'),(271,'vkadapa@nisum.com','37a8959018dbdb0600a2875a21e6bdce7ab2b571'),(281,'ssangireddy@nisum.com','7f5f14e05a20c77f705222a96e0064fbeafc866b'),(282,'executive@nisum.com','e4fc1aedc88924a3f5bfda67c89a09a0260fa293'),(283,'hub@nisum.com','65acf0a7ced564a4880cf946224e60b745d3d631'),(284,'sdp@nisum.com','0f4e4c91a3ad3877c26ed7307da66d1535a06763'),(285,'hubuser@nisum.com','5be1680521c4cd705cf447ebf470367de91cb4ed'),(286,'ntiyyagura@nisum.com','33a3209c0b0dd18240bd5de5819186e4ab6cd8ba'),(287,'qa@nisum.com','d005c6b3d3577648d327eaec2586e3b0e5f6393d'),(288,'eambati@nisum.com','f6b7c7ac760c0aeb6c64e61652aa5b089c2ee2ec'),(289,'ryarram@nisum.com','aeb7d8b263d8e9522f21d39e69362b711e10adaf'),(290,'ddevarapalli@nisum.com','19b5f3f82a3f0349a2b2a032d05585f26a82e389'),(291,'statipalli@nisum.com','3a0e80a90d5bd72f7d0c4f3a556c7f3dd8e8cfd9'),(292,'rsudineni@nisum.com','6bd6714a90a815ba048b5466f5b871ba09aa317c'),(293,'svalaboju@nisum.com','9c842689559fa16683f461c4717a35e1cd324799'),(294,'nkodumoori@nisum.com','d8403626e2f65fd05bec09150abc562943426b12'),(295,'mvadlamudi@nisum.com','8bc7ec96748d2aec7cc5aa6fc7b4730549525f47'),(296,'rthimmani@nisum.com','44bd61e68b12d66e90ea8816f95bd295fe00fb7e'),(297,'tvemula@nisum.com','423b7e5971bd0353e9791294e81eb8beaede0b7d'),(310,'raragala@nisum.com','47e75133f124df7cb480cc33deee9ea047d9ca04'),(311,'WBQE@nisum.com','6df33559d33b3e84380e8b8bce594f3dba60611a'),(312,'jcattamanchi@nisum.com','844522d3c347fec35f9ec205bb6466b781cf6761'),(313,'hmaradani@nisum.com','926ce686e55027d9ef7197e254e3d8c8773356ea'),(314,'svulupala@nisum.com','fff0e6568fad5e4847efe7b858f1b55072e978f0'),(315,'rkommanaveni@nisum.com','0cbf3972d98d152d61c48226da6180ae730a18a7');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'nisumplanner'
--

--
-- Dumping routines for database 'nisumplanner'
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

-- Dump completed on 2015-02-25 13:13:09
