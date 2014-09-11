-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost:3307
-- Generation Time: Sep 03, 2014 at 11:33 AM
-- Server version: 5.5.24-log
-- PHP Version: 5.4.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `resourcetracker`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `editmyproject`(IN `_projectId` INT(11), IN `_userId` VARCHAR(50))
    COMMENT 'add r edit projects from my view'
BEGIN
START TRANSACTION;  	
	IF EXISTS (SELECT *  FROM myprojects WHERE userid = _userId and projectid = _projectId)	
        THEN
		UPDATE myprojects SET active = true, editdate = NOW() WHERE userid = _userId and projectid = _projectId;	
	ELSE 
	    INSERT INTO myprojects(projectid, userid, createddate) VALUES  (_projectId, _userId, now());
    END IF;	
COMMIT;
END$$

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
END$$

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
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `saveuser`(IN `_name` VARCHAR(50), IN `_password` VARCHAR(50), IN `_roleId` INT(11), IN `_firstName` VARCHAR(50), IN `_lastName` VARCHAR(50), IN `_sex` VARCHAR(5), IN `_dob` DATE, IN `_contact` VARCHAR(20), IN `_teamId` INT(11))
    COMMENT 'saving user n user datails'
BEGIN
declare _userId int(11); 
START TRANSACTION;  
	INSERT INTO users(username ,password ) VALUES (_name, _password);
	SET _userId = LAST_INSERT_ID();
	INSERT INTO userdetails(userid, roleid, firstname, lastname, sex, dob, contactno, createddate) VALUES (_userId, _roleId, _firstName, _lastName, _sex, _dob, _contact, now());
	IF _teamId > 0 THEN
		INSERT INTO teamresource(teamid, userid) VALUES  (_teamId, _userId);  
    END IF;
COMMIT;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE IF NOT EXISTS `logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `projectid` int(11) NOT NULL,
  `startdate` datetime DEFAULT NULL,
  `enddate` datetime DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  `description` varchar(256) NOT NULL,
  `createddate` datetime NOT NULL,
  `editdate` datetime NOT NULL,
  `locked` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `logs_ibfk_1` (`projectid`),
  KEY `userid` (`userid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=15 ;

--
-- Dumping data for table `logs`
--

INSERT INTO `logs` (`id`, `projectid`, `startdate`, `enddate`, `userid`, `description`, `createddate`, `editdate`, `locked`) VALUES
(3, 1, '2014-07-02 00:00:00', '2014-07-02 16:00:00', 12, 'asdasd', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1),
(4, 1, '2014-07-02 01:00:00', '2014-07-02 16:00:00', 12, 'asdasd', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1),
(5, 5, '2014-08-19 20:02:00', '2014-08-19 21:02:00', 12, 'one hr', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1),
(6, 1, '2014-08-19 15:02:00', '2014-08-19 16:02:00', 12, 'one more hr', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1),
(8, 5, '2014-08-20 13:07:00', '2014-08-20 16:07:00', 12, 'testwqer', '2014-08-22 13:07:46', '2014-08-22 13:07:59', 1),
(9, 1, '2014-08-22 13:17:00', '2014-08-22 14:17:00', 12, 'asd', '2014-08-22 13:18:02', '0000-00-00 00:00:00', 1),
(11, 1, '2014-08-28 15:20:00', '2014-08-28 16:20:00', 12, 'test', '2014-08-28 15:20:43', '2014-08-28 19:13:15', 1),
(12, 1, '2014-08-26 15:29:00', '2014-08-26 16:29:00', 12, 'test', '2014-08-28 15:29:59', '0000-00-00 00:00:00', 1),
(13, 1, '2014-09-01 00:57:00', '2014-09-01 03:57:00', 12, 'test', '2014-09-01 11:57:43', '2014-09-02 16:48:07', 1),
(14, 1, '2014-09-02 14:53:00', '2014-09-02 15:53:00', 12, '', '2014-09-02 14:53:16', '2014-09-02 16:48:43', 1);

-- --------------------------------------------------------

--
-- Table structure for table `myprojects`
--

CREATE TABLE IF NOT EXISTS `myprojects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `projectid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `createddate` datetime NOT NULL,
  `editdate` datetime NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_index` (`projectid`,`userid`),
  UNIQUE KEY `projectid_2` (`projectid`),
  KEY `projectid` (`projectid`),
  KEY `userid` (`userid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=35 ;

--
-- Dumping data for table `myprojects`
--

INSERT INTO `myprojects` (`id`, `projectid`, `userid`, `createddate`, `editdate`, `active`) VALUES
(26, 1, 16, '0000-00-00 00:00:00', '2014-09-02 16:54:05', 1),
(28, 6, 16, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1),
(33, 5, 16, '2014-08-22 13:08:31', '2014-08-22 13:10:28', 1),
(34, 8, 16, '2014-09-02 16:53:49', '0000-00-00 00:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE IF NOT EXISTS `project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `startdate` date DEFAULT NULL,
  `enddate` date DEFAULT NULL,
  `createddate` datetime NOT NULL,
  `editdate` datetime NOT NULL,
  `leadid` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_index` (`name`,`leadid`),
  KEY `leadid` (`leadid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`id`, `name`, `description`, `startdate`, `enddate`, `createddate`, `editdate`, `leadid`, `active`) VALUES
(1, 'BCOM', 'BLAH BLAH 213g', '2014-05-02', '2014-07-01', '0000-00-00 00:00:00', '2014-09-02 16:44:29', 16, 1),
(2, 'MCOM', 'BLAH BLAH', '2014-07-07', '2014-12-18', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 16, 1),
(3, 'OCA', 'BLAH BLAH', '2014-03-02', '2015-01-01', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 17, 1),
(4, 'BCOM', 'BLAH BLAH', '2014-07-01', '2014-07-31', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 17, 1),
(5, 'Order Capture', 'BLAH BLAH', '2014-07-01', '2014-07-29', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 16, 1),
(6, 'one', 'one', '2014-08-18', '2014-08-20', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 16, 1),
(7, 'sdfdsf', 'sdfsdfd', '2014-07-31', '2014-08-28', '2014-08-22 12:58:42', '2014-08-22 12:59:31', 16, 1),
(8, 'tew', 'gh', '2014-09-01', '2014-09-25', '2014-09-02 16:53:39', '0000-00-00 00:00:00', 16, 1);

-- --------------------------------------------------------

--
-- Table structure for table `projectresource`
--

CREATE TABLE IF NOT EXISTS `projectresource` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `projectid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `createddate` datetime NOT NULL,
  `editdate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_index` (`projectid`,`userid`),
  KEY `projectresource_ibfk_1` (`projectid`),
  KEY `projectresource_ibfk_2` (`userid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=29 ;

--
-- Dumping data for table `projectresource`
--

INSERT INTO `projectresource` (`id`, `projectid`, `userid`, `createddate`, `editdate`) VALUES
(18, 6, 12, '2014-08-22 12:51:18', '2014-09-03 15:57:55'),
(21, 5, 15, '2014-08-22 13:08:41', '0000-00-00 00:00:00'),
(22, 5, 12, '2014-08-22 13:10:09', '0000-00-00 00:00:00'),
(25, 1, 15, '2014-08-22 13:10:35', '0000-00-00 00:00:00'),
(28, 6, 15, '2014-09-02 16:34:47', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE IF NOT EXISTS `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `name`, `description`, `active`) VALUES
(1, 'ADMIN', 'BLAH BLAH', 1),
(2, 'MANAGER', 'BLAH BLAH', 1),
(3, 'USER', 'BLAH BLAH', 1);

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

CREATE TABLE IF NOT EXISTS `team` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `leadid` int(11) DEFAULT NULL,
  `createddate` datetime NOT NULL,
  `editdate` datetime NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `leadid_2` (`leadid`),
  KEY `leadid` (`leadid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=15 ;

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`id`, `name`, `description`, `leadid`, `createddate`, `editdate`, `active`) VALUES
(1, 'UI', 'BLAH BLAH', 16, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1),
(2, 'HUB', 'BLAH BLAH', 17, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1),
(14, 'SDP', 'sdp test', 21, '2014-09-03 15:55:16', '0000-00-00 00:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `teamresource`
--

CREATE TABLE IF NOT EXISTS `teamresource` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teamid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userid` (`userid`),
  KEY `teamresource_ibfk_2` (`userid`),
  KEY `teamresource_ibfk_1` (`teamid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=19 ;

--
-- Dumping data for table `teamresource`
--

INSERT INTO `teamresource` (`id`, `teamid`, `userid`, `description`) VALUES
(9, 1, 12, NULL),
(10, 1, 15, NULL),
(11, 2, 19, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `userdetails`
--

CREATE TABLE IF NOT EXISTS `userdetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `roleid` int(11) NOT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `sex` varchar(50) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `contactno` varchar(20) DEFAULT NULL,
  `createddate` datetime NOT NULL,
  `editdate` datetime NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `USERID` (`userid`),
  KEY `userdetails_ibfk_1` (`userid`),
  KEY `userdetails_ibfk_3` (`roleid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=22 ;

--
-- Dumping data for table `userdetails`
--

INSERT INTO `userdetails` (`id`, `userid`, `roleid`, `firstname`, `lastname`, `sex`, `dob`, `contactno`, `createddate`, `editdate`, `active`) VALUES
(10, 12, 3, 'Sandeep', 'Gaddam', 'M', '1980-10-22', '9876543210', '0000-00-00 00:00:00', '2014-09-03 17:02:03', 1),
(11, 15, 3, 'remesh', 'Meduri', 'M', '1979-05-11', '1111111111', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1),
(12, 16, 2, 'Srikanth', 'Kata', 'M', '1975-01-02', '9999999991', '0000-00-00 00:00:00', '2014-09-03 17:01:40', 1),
(13, 17, 2, 'Hub', 'Manager', 'M', '1975-01-12', '2147483647', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1),
(15, 19, 3, 'Hub', 'User', 'M', '1975-01-12', '2147483647', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1),
(16, 20, 3, 'Sdp', 'User', 'M', '1975-01-12', '2147483647', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1),
(17, 21, 2, 'Sdp', 'Manager', 'F', '1975-01-12', '2147483647', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=28 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(12, 'sgaddam@nisum.com', '6c1f9442a69c8f5ba461f7b853a329c2c949c620'),
(15, 'rmeduri@nisum.com', '0ba7a369c6a8b22ff3b3a839f30d17fb79c73b31'),
(16, 'skata@nisum.com', 'bb41f514afcbbc6bdc6fba201d92c610d9ef9763'),
(17, 'hub@nisum.com', '65acf0a7ced564a4880cf946224e60b745d3d631'),
(19, 'hubuser@nisum.com', '5be1680521c4cd705cf447ebf470367de91cb4ed'),
(20, 'sdpuser@nisum.com', '3ed5f7b2a05d7b3126b905fce971aa8b792f7875'),
(21, 'sdp@nisum.com', '0f4e4c91a3ad3877c26ed7307da66d1535a06763');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `logs`
--
ALTER TABLE `logs`
  ADD CONSTRAINT `logs_ibfk_1` FOREIGN KEY (`projectid`) REFERENCES `project` (`id`),
  ADD CONSTRAINT `logs_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `users` (`id`);

--
-- Constraints for table `myprojects`
--
ALTER TABLE `myprojects`
  ADD CONSTRAINT `myprojects_ibfk_1` FOREIGN KEY (`projectid`) REFERENCES `project` (`id`),
  ADD CONSTRAINT `myprojects_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `users` (`id`);

--
-- Constraints for table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `project_ibfk_1` FOREIGN KEY (`leadid`) REFERENCES `users` (`id`);

--
-- Constraints for table `projectresource`
--
ALTER TABLE `projectresource`
  ADD CONSTRAINT `projectresource_ibfk_1` FOREIGN KEY (`projectid`) REFERENCES `project` (`id`),
  ADD CONSTRAINT `projectresource_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `users` (`id`);

--
-- Constraints for table `team`
--
ALTER TABLE `team`
  ADD CONSTRAINT `team_ibfk_1` FOREIGN KEY (`leadid`) REFERENCES `users` (`id`);

--
-- Constraints for table `teamresource`
--
ALTER TABLE `teamresource`
  ADD CONSTRAINT `teamresource_ibfk_1` FOREIGN KEY (`teamid`) REFERENCES `team` (`id`),
  ADD CONSTRAINT `teamresource_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `users` (`id`);

--
-- Constraints for table `userdetails`
--
ALTER TABLE `userdetails`
  ADD CONSTRAINT `userdetails_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `userdetails_ibfk_3` FOREIGN KEY (`roleid`) REFERENCES `role` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
