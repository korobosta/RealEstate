-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 13, 2019 at 07:05 PM
-- Server version: 5.5.27
-- PHP Version: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `property`
--

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE IF NOT EXISTS `contact` (
  `contact_id` int(10) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` int(13) NOT NULL,
  `message` text NOT NULL,
  `date_send` datetime NOT NULL,
  `reply` text NOT NULL,
  `status` varchar(20) NOT NULL,
  PRIMARY KEY (`contact_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`contact_id`, `full_name`, `email`, `phone`, `message`, `date_send`, `reply`, `status`) VALUES
(1, 'kevin kevin', 'kevinongulu@gmail.com', 723452356, 'Can i get a project?', '2019-10-26 16:16:58', '', 'send'),
(2, 'kevin', 'kevinongulu@gmail.com', 723452356, 'how is node?', '0000-00-00 00:00:00', '', ''),
(3, 'joseph onjiko onjiko onjiko', 'josephonjiko@gmail.com', 723452356, 'node is good', '0000-00-00 00:00:00', '', ''),
(4, 'joseph onjiko', 'josephonjiko@gmail.com', 34567890, 'makes development first', '0000-00-00 00:00:00', '', ''),
(5, 'joseph onjiko onjiko onjiko', 'kevinongulu@gmail.com', 723452356, 'can i get a house?', '0000-00-00 00:00:00', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE IF NOT EXISTS `payments` (
  `payment_id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  `phone` varchar(12) NOT NULL,
  `amount` int(11) NOT NULL,
  `payment_date` datetime NOT NULL,
  `trans_id` varchar(10) NOT NULL,
  `mode` varchar(20) NOT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`payment_id`, `user_id`, `phone`, `amount`, `payment_date`, `trans_id`, `mode`) VALUES
(2, 4, '', 0, '2019-09-13 19:22:37', '', 'cash'),
(3, 4, '', 0, '2019-09-13 19:25:47', '', 'cash'),
(4, 4, '', 5000, '2019-09-13 20:09:12', '', 'cash'),
(5, 4, '', 800, '2019-09-13 20:18:31', '', 'cash'),
(6, 4, '', 1000, '2019-09-13 20:22:47', '', 'cash'),
(7, 10, '', 3000, '2019-09-14 11:29:58', '', 'cash'),
(8, 10, '', 1500, '2019-09-14 11:31:21', '', 'cash'),
(9, 10, '', 1500, '2019-09-14 12:45:49', '', 'cash'),
(10, 10, '', 1500, '2019-09-14 12:46:56', '', 'cash');

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

CREATE TABLE IF NOT EXISTS `properties` (
  `property_id` int(10) NOT NULL AUTO_INCREMENT,
  `property_name` varchar(200) NOT NULL,
  `user_id` int(10) NOT NULL,
  `date_uploaded` datetime NOT NULL,
  `description` text NOT NULL,
  `amount` int(11) NOT NULL,
  `image` blob NOT NULL,
  `category` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `status` varchar(10) NOT NULL,
  `total_units` int(10) NOT NULL,
  `remaining_units` int(10) NOT NULL,
  `bedrooms` int(2) DEFAULT NULL,
  `type` varchar(10) NOT NULL,
  PRIMARY KEY (`property_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`property_id`, `property_name`, `user_id`, `date_uploaded`, `description`, `amount`, `image`, `category`, `location`, `status`, `total_units`, `remaining_units`, `bedrooms`, `type`) VALUES
(1, 'ngong flats', 22, '2019-11-12 14:55:38', '1 bedroom\r\nample parking', 120000, 0x7269636879203033362e6a7067, 'house', 'Nairobi', 'posted', 10, 0, 3, 'rent'),
(2, 'bomet land', 1, '2019-11-13 12:20:32', 'one acre land', 1400000, 0x7269636879203232392e6a7067, 'land', 'Kajiado', 'posted', 2, 2, 0, 'sale'),
(3, 'nakuru offices', 1, '2019-11-13 12:29:02', '50 by 100 size\r\nSpacious', 230000, 0x7269636879203033352e6a7067, 'office', 'Nakuru', 'posted', 3, 3, 0, 'rent');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(10) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `location` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(10) NOT NULL,
  `registration_date` datetime NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=23 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `full_name`, `email`, `location`, `phone`, `username`, `password`, `role`, `registration_date`) VALUES
(1, 'pml company', 'pml@gmail.com', 'nairobi', '0713887070', 'pml', 'pml', 'company', '2019-11-13 11:40:10'),
(4, 'joseph onjiko', 'josephonjiko@gmail.com', 'Kolwa Central', '254723456785', 'joseph', '4b706334e8195d979644ccb8c67e620d0f406c87', 'client', '2019-09-09 14:30:32'),
(5, 'kevin ongulu ongulu', 'kevinongulu@gmail.com', ' Nyalenda A', '254723456785', 'kevin', 'ffb4761cba839470133bee36aeb139f58d7dbaa9', 'staff', '2019-09-10 10:39:08'),
(7, 'festus kipkemoi', 'festuskipkemoi@gmail.com', 'Kajulu', '254713887070', 'festus', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'admin', '2019-09-12 13:33:54'),
(10, 'erick kagota kagota', 'erickkagota@gmail.com', ' Nyalenda A', '254714789680', 'erick', '326d625cc1a493ebd89a1f3082a08c05144930f2', 'client', '2019-09-14 11:13:58'),
(11, 'stephen robert', 'stevenrobert@gmail.com', ' Kolwa East', '+25423456789', 'steven', 'robert', 'staff', '2019-09-14 11:35:57'),
(12, 'mercy kuya', 'mercykuya@gmail.com', 'Kajulu', '+25434567890', 'mercy', 'db4c3320f70909254aef6454fce93358e1fafc89', 'client', '2019-09-14 11:39:19'),
(13, 'mary anyango', 'maryanyango@gmail.com', ' Kolwa East', '+254724262511', 'mary', 'khasai', 'client', '2019-09-14 11:42:52'),
(14, 'tom onyango', 'tomonyango@gmail.com', ' Nyalenda A', '+254769391256', 'tom', 'onyango', 'admin', '2019-09-14 11:45:44'),
(22, 'daniel omungu', 'danielomungu@gmail.com', 'Nairobi', '072345678', 'daniel', 'omunu', 'client', '2019-11-08 13:53:37');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
