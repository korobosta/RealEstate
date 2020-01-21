-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 27, 2019 at 04:32 PM
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
-- Table structure for table `booking`
--

CREATE TABLE IF NOT EXISTS `booking` (
  `booking_id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  `property_id` int(10) NOT NULL,
  `booking_date` datetime NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'booked',
  PRIMARY KEY (`booking_id`),
  KEY `user_id` (`user_id`,`property_id`),
  KEY `property_id` (`property_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=15 ;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`booking_id`, `user_id`, `property_id`, `booking_date`, `status`) VALUES
(1, 22, 2, '2019-11-15 11:46:56', 'payed'),
(2, 22, 2, '2019-11-15 12:12:51', 'booked'),
(3, 22, 10, '2019-11-21 11:42:21', 'payed'),
(4, 38, 3, '2019-11-23 16:30:26', 'booked'),
(5, 22, 3, '2019-11-23 16:46:31', 'booked'),
(6, 38, 4, '2019-11-23 17:02:50', 'payed'),
(7, 22, 3, '2019-11-24 11:27:02', 'booked'),
(8, 38, 4, '2019-11-24 12:27:21', 'payed'),
(9, 22, 4, '2019-11-24 16:55:55', 'booked'),
(10, 55, 4, '2019-11-24 18:19:19', 'payed'),
(11, 55, 4, '2019-11-24 18:21:36', 'booked'),
(12, 38, 6, '2019-11-26 10:56:40', 'booked'),
(13, 38, 8, '2019-11-27 10:56:40', 'payed'),
(14, 22, 12, '2019-11-27 18:23:52', 'booked');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`contact_id`, `full_name`, `email`, `phone`, `message`, `date_send`, `reply`, `status`) VALUES
(1, 'kevin kevin', 'kevinongulu@gmail.com', 723452356, 'Can i get a project?', '2019-10-26 16:16:58', '', 'send'),
(2, 'kevin', 'kevinongulu@gmail.com', 723452356, 'how is node?', '0000-00-00 00:00:00', '', ''),
(3, 'joseph onjiko onjiko onjiko', 'josephonjiko@gmail.com', 723452356, 'node is good', '0000-00-00 00:00:00', '', ''),
(4, 'joseph onjiko', 'josephonjiko@gmail.com', 34567890, 'makes development first', '0000-00-00 00:00:00', '', ''),
(5, 'joseph onjiko onjiko onjiko', 'kevinongulu@gmail.com', 723452356, 'can i get a house?', '0000-00-00 00:00:00', '', ''),
(6, 'pms company', 'williamruto@dp.com', 34567890, 'i need a good house', '0000-00-00 00:00:00', '', 'send'),
(7, 'pms company', 'williamruto@dp.com', 34567890, 'i need a good house', '0000-00-00 00:00:00', '', 'send'),
(8, 'joseph onjiko onjiko onjiko', 'josephonjiko@gmail.com', 723452356, 'kwani nyinyi mnakanga wap!', '0000-00-00 00:00:00', '', 'send');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE IF NOT EXISTS `payment` (
  `payment_id` int(10) NOT NULL AUTO_INCREMENT,
  `property_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `payment_date` datetime NOT NULL,
  `trans_id` varchar(10) NOT NULL,
  `payment_method` varchar(20) NOT NULL,
  `booking_id` int(10) DEFAULT NULL,
  `amount` int(100) NOT NULL,
  `purpose` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `user_id` (`user_id`),
  KEY `property_id` (`property_id`),
  KEY `booking_id` (`booking_id`),
  KEY `property_id_2` (`property_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`payment_id`, `property_id`, `user_id`, `payment_date`, `trans_id`, `payment_method`, `booking_id`, `amount`, `purpose`) VALUES
(2, 10, 22, '2019-11-21 11:45:22', '', 'bank', 3, 400000, NULL),
(3, 4, 55, '2019-11-24 18:26:29', '', 'bank', 10, 23000000, NULL),
(4, 4, 38, '2019-11-26 10:57:09', '', 'cash', 6, 23000000, NULL),
(5, 4, 38, '2019-11-26 10:57:17', '', 'cash', 8, 23000000, NULL),
(6, 8, 22, '2019-11-27 17:52:19', '', 'mpesa', NULL, 200, 'rent'),
(7, 8, 22, '2019-11-27 17:53:05', '', 'bank', NULL, 600, 'rent'),
(8, 8, 22, '2019-11-27 18:14:51', '', 'mpesa', NULL, 500, 'rent');

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
  KEY `user_id` (`user_id`),
  KEY `user_id_2` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=17 ;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`property_id`, `property_name`, `user_id`, `date_uploaded`, `description`, `amount`, `image`, `category`, `location`, `status`, `total_units`, `remaining_units`, `bedrooms`, `type`) VALUES
(2, 'bomet land', 1, '2019-11-13 12:20:32', 'one acre land', 1400000, 0x7269636879203232392e6a7067, 'land', 'Kajiado', 'booked', 2, 0, 0, 'sale'),
(3, 'nakuru offices', 1, '2019-11-13 12:29:02', '50 by 100 size\r\nSpacious', 230000, 0x7269636879203033352e6a7067, 'office', 'Nakuru', 'booked', 3, 0, 0, 'rent'),
(4, 'kisumu flats', 4, '2019-11-14 09:56:27', '3 bedrooms', 23000000, 0x7269636879203033382e6a7067, 'house', 'Kisumu', 'booked', 23, 18, 3, 'sale'),
(6, 'nairobi dam', 1, '2019-11-14 12:49:05', ' two acres', 10000000, 0x7269636879203131352e6a7067, 'land', 'Nakuru', 'booked', 50, 49, 0, 'sale'),
(8, 'lake Victoria', 22, '2019-11-18 17:40:26', '     3 bedrroms\r\nclose to lake\r\nbreezes around\r\n3 bathrooms', 45000, 0x7269636879203033392e6a7067, 'house', 'Kisumu', 'booked', 27, 26, 4, 'rent'),
(10, 'busia prime land', 54, '2019-11-21 09:46:05', '4 acres\r\nclose to the main road\r\nfertile land', 400000, 0x54756c6970732e6a7067, 'land', 'Busia', 'booked', 1, 0, 0, 'sale'),
(12, 'jamuhuri court', 55, '2019-11-24 18:16:34', '3 bedrooms\r\nshower\r\nkitcen', 12000, 0x7269636879203037372e6a7067, 'house', 'Nairobi', 'booked', 3, 2, 3, 'rent'),
(14, 'elwangare plot', 38, '2019-11-26 12:54:34', '1 acre', 200000, 0x4465736572742e6a7067, 'land', 'Nairobi', 'posted', 2, 2, 0, 'sale'),
(15, 'kiambu office', 39, '2019-11-26 13:01:34', 'fully funished offices\r\nenough space', 30000, 0x7269636879203037342e6a7067, 'office', 'Kiambu', 'posted', 2, 2, 0, 'rent'),
(16, 'busia offices', 54, '2019-11-26 13:05:56', '20 by 30m size\r\nfully furnished', 600000, 0x7269636879203033362e6a7067, 'office', 'Busia', 'posted', 20, 20, 0, 'sale');

-- --------------------------------------------------------

--
-- Table structure for table `rent`
--

CREATE TABLE IF NOT EXISTS `rent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `balance` int(11) NOT NULL,
  `assigned_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `property_id` (`property_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `rent`
--

INSERT INTO `rent` (`id`, `user_id`, `property_id`, `balance`, `assigned_date`) VALUES
(1, 22, 8, -1300, '2019-11-27 11:32:06');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(10) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `location` varchar(100) NOT NULL,
  `phone` bigint(15) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(10) NOT NULL,
  `registration_date` datetime NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=59 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `full_name`, `email`, `location`, `phone`, `username`, `password`, `role`, `registration_date`) VALUES
(1, 'pms company', 'pml@gmail.com', 'Nairobi', 254713456789, 'pml', 'pml', 'company', '2019-11-13 11:40:10'),
(4, 'joseph onjiko', 'josephonjiko@gmail.com', 'Kisumu', 25434890324, 'joseph', '4b706334e8195d979644ccb8c67e620d0f406c87', 'client', '2019-09-09 14:30:32'),
(5, 'kevin ongulu', 'kevinongulu@gmail.com', 'Nairobi', 25423890614, 'kevin', 'ffb4761cba839470133bee36aeb139f58d7dbaa9', 'staff', '2019-09-10 10:39:08'),
(7, 'festus kipkemoi', 'festuskipkemoi@gmail.com', 'Kajulu', 25434890145, 'festus', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'admin', '2019-09-12 13:33:54'),
(11, 'steven robert', 'stevenrobert@gmail.com', 'Busia', 25489761245, 'steven', 'steven', 'staff', '2019-09-14 11:35:57'),
(13, 'mary anyango', 'maryanyango@gmail.com', ' Kolwa East', 254652315678, 'mary', 'khasai', 'client', '2019-09-14 11:42:52'),
(14, 'tom onyango nyasirimbi', 'tomonyango@gmail.com', 'Kisumu', 8388607, 'tom', 'tom', 'admin', '2019-09-14 11:45:44'),
(22, 'daniel omungu', 'danielomungu@gmail.com', 'Mombasa', 254319064870, 'daniel', 'omungu', 'client', '2019-11-08 13:53:37'),
(38, 'sarah shitela', 'sarahshitela@gmail.com', 'Kakamega', 254705237892, 'sarah', 'shitela', 'client', '2019-11-14 12:40:22'),
(39, 'patrick njoro', 'patricknjoroge@gmail.com', 'Mombasa', 25425789253, 'patrick', 'njoroge', 'client', '2019-11-14 12:41:38'),
(40, 'nancy kokimaster 4', 'nancymwikali@gmail.com', 'Kisumu', 25423876513, 'nancy', 'mwikali', 'client', '2019-11-14 12:43:15'),
(45, 'william ruto', 'williamruto@dp.com', 'Nakuru', 254127589024, 'william', 'ruto', 'admin', '2019-11-18 11:56:18'),
(46, 'ruth jumba', 'ruthjumba227@gmail.com', 'Kisumu', 700193138, 'ruth', 'jumba', 'landlord', '2019-11-19 18:41:41'),
(52, 'uhuru kenyatta', 'uhurukenyatta@gmail.com', 'Kiambu', 723456789, 'uhuru', 'kenyatta', 'client', '2019-11-20 10:34:14'),
(53, 'mutula kilonzo', 'mutulakilonzo@gmail.com', 'Nairobi', 734567356, 'mutula', 'kilonzo', 'client', '2019-11-20 10:37:04'),
(54, 'cecilia nasirumbi', 'cecilianasirumbi1@gmail.com', 'Nairobi', 799439678, 'cecilia', 'nasirumbi', 'client', '2019-11-21 09:37:45'),
(55, 'imran okoth benard', 'imranokoth@gmail.com', 'Kisumu', 745789054, 'imran', 'okoth', 'client', '2019-11-24 18:08:31'),
(56, 'eric kagota', 'kagotaeric@gmail.com', 'Nairobi', 717544879, 'rik', '31448944', 'client', '2019-11-24 18:48:32'),
(58, 'festus mureithi', 'festusmureithi@gmail.com', 'Kiambu', 742315678, 'mureithi', 'mureithi', 'admin', '2019-11-25 10:49:08');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`property_id`) REFERENCES `properties` (`property_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `payment_ibfk_2` FOREIGN KEY (`property_id`) REFERENCES `properties` (`property_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `payment_ibfk_3` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`booking_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `properties`
--
ALTER TABLE `properties`
  ADD CONSTRAINT `properties_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
