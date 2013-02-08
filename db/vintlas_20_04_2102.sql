# SQL Manager 2010 for MySQL 4.5.0.9
# ---------------------------------------
# Host     : localhost
# Port     : 3306
# Database : vintlas


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

SET FOREIGN_KEY_CHECKS=0;

DROP DATABASE IF EXISTS `vintlas`;

CREATE DATABASE `vintlas`
    CHARACTER SET 'latin1'
    COLLATE 'latin1_swedish_ci';

USE `vintlas`;

#
# Structure for the `ass_regions` table : 
#

DROP TABLE IF EXISTS `ass_regions`;

CREATE TABLE `ass_regions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `lang_name` varchar(255) DEFAULT NULL,
  `country` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

#
# Structure for the `cities` table : 
#

DROP TABLE IF EXISTS `cities`;

CREATE TABLE `cities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `region` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

#
# Structure for the `continents` table : 
#

DROP TABLE IF EXISTS `continents`;

CREATE TABLE `continents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

#
# Structure for the `country` table : 
#

DROP TABLE IF EXISTS `country`;

CREATE TABLE `country` (
  `id_country` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id_country`)
) ENGINE=InnoDB AUTO_INCREMENT=219 DEFAULT CHARSET=utf8;

#
# Structure for the `grapes` table : 
#

DROP TABLE IF EXISTS `grapes`;

CREATE TABLE `grapes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;

#
# Structure for the `photos` table : 
#

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

#
# Structure for the `regions` table : 
#

DROP TABLE IF EXISTS `regions`;

CREATE TABLE `regions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `country` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

#
# Structure for the `seasons` table : 
#

DROP TABLE IF EXISTS `seasons`;

CREATE TABLE `seasons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `date1` varchar(20) DEFAULT NULL,
  `date2` varchar(20) DEFAULT NULL,
  `weeks` varchar(255) DEFAULT NULL,
  `time1` varchar(20) DEFAULT NULL,
  `time2` varchar(20) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `spoken` varchar(20) DEFAULT NULL,
  `tasting` int(11) DEFAULT NULL COMMENT '0-free, 1-charged, 2-not available',
  `tour` int(11) DEFAULT NULL COMMENT '0-free, 1-charged, 2-not available',
  `sales` int(11) DEFAULT NULL COMMENT '0-No, 1-Yes',
  `workshops` int(11) DEFAULT NULL COMMENT '0-No, 1-Yes',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

#
# Structure for the `time_zone` table : 
#

DROP TABLE IF EXISTS `time_zone`;

CREATE TABLE `time_zone` (
  `id_zone` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_zone`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

#
# Structure for the `users` table : 
#

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `firstname` varchar(20) NOT NULL,
  `surname` varchar(20) DEFAULT NULL,
  `email` varchar(20) NOT NULL,
  `company` varchar(20) DEFAULT NULL,
  `country_id` varchar(20) DEFAULT NULL,
  `avatar` varchar(20) DEFAULT NULL,
  `zone_id` varchar(20) NOT NULL,
  `password` varchar(32) NOT NULL,
  `reg_id` varchar(32) NOT NULL,
  `status` int(1) DEFAULT NULL,
  `privacy` varchar(255) NOT NULL,
  `involves` text NOT NULL,
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 MIN_ROWS=4 MAX_ROWS=13;

#
# Structure for the `vineyard_grapes` table : 
#

DROP TABLE IF EXISTS `vineyard_grapes`;

CREATE TABLE `vineyard_grapes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vineyard` int(11) DEFAULT NULL,
  `grape` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

#
# Structure for the `vineyard_photos` table : 
#

DROP TABLE IF EXISTS `vineyard_photos`;

CREATE TABLE `vineyard_photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vineyard` int(11) DEFAULT NULL,
  `photo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

#
# Structure for the `vineyard_seasons` table : 
#

DROP TABLE IF EXISTS `vineyard_seasons`;

CREATE TABLE `vineyard_seasons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vineyard` int(11) DEFAULT NULL,
  `season` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

#
# Structure for the `vineyard_wines` table : 
#

DROP TABLE IF EXISTS `vineyard_wines`;

CREATE TABLE `vineyard_wines` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vineyard` int(11) DEFAULT NULL,
  `wine` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

#
# Structure for the `vineyards` table : 
#

DROP TABLE IF EXISTS `vineyards`;

CREATE TABLE `vineyards` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `nameloc` varchar(20) DEFAULT NULL,
  `address1` varchar(255) DEFAULT NULL,
  `address2` varchar(255) DEFAULT NULL,
  `city` int(11) DEFAULT NULL,
  `zip` varchar(20) DEFAULT NULL,
  `country` int(11) DEFAULT NULL,
  `continent` int(11) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `fax` varchar(20) DEFAULT NULL,
  `email` varchar(20) DEFAULT NULL,
  `web` varchar(20) DEFAULT NULL,
  `loc_y` varchar(255) DEFAULT NULL,
  `region` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `proprietor` varchar(255) DEFAULT NULL,
  `visits` int(11) DEFAULT NULL,
  `individuals` int(11) DEFAULT NULL,
  `groups` int(11) DEFAULT NULL,
  `appointment` int(11) DEFAULT NULL,
  `restaurant` int(11) DEFAULT NULL,
  `accommodation` int(11) DEFAULT NULL,
  `weddings` int(11) DEFAULT NULL,
  `seminars` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `loc_z` varchar(255) DEFAULT NULL,
  `ass_region` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

#
# Structure for the `wines` table : 
#

DROP TABLE IF EXISTS `wines`;

CREATE TABLE `wines` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

#
# Data for the `ass_regions` table  (LIMIT 0,500)
#

INSERT INTO `ass_regions` (`id`, `name`, `lang_name`, `country`, `description`) VALUES 
  (1,'Champagne','Champagne',198,'The area is best known for the production of the sparkling white wine that bears the region''s name. EU law and the laws of most countries reserve the term \"Champagne\" exclusively for wines that come from this region located about 100 miles (160 km) east o');
COMMIT;

#
# Data for the `cities` table  (LIMIT 0,500)
#

INSERT INTO `cities` (`id`, `name`, `region`) VALUES 
  (1,'Montgomery',1),
  (2,'Mon',1),
  (6,'',3);
COMMIT;

#
# Data for the `continents` table  (LIMIT 0,500)
#

INSERT INTO `continents` (`id`, `name`) VALUES 
  (1,'Eurasia'),
  (2,'Asia'),
  (3,'Africa'),
  (4,'North America'),
  (5,'South America'),
  (6,'Antarctica'),
  (7,'Europe'),
  (8,'Australia');
COMMIT;

#
# Data for the `country` table  (LIMIT 0,500)
#

INSERT INTO `country` (`id_country`, `name`) VALUES 
  (1,'Russia'),
  (2,'Ukraine'),
  (3,'Abkhazia'),
  (4,'Australia'),
  (5,'Austria'),
  (6,'Azerbaijan'),
  (7,'Albania'),
  (8,'Algeria'),
  (9,'Angola'),
  (10,'Anguilla'),
  (11,'Andorra'),
  (12,'Antigua and Barbuda'),
  (13,'Netherlands Antilles'),
  (14,'Argentina'),
  (15,'Armenia'),
  (16,'Aruba'),
  (17,'Afghanistan'),
  (18,'Bahamas'),
  (19,'Bangladesh'),
  (20,'Barbados'),
  (21,'Bahrain'),
  (22,'Belarus'),
  (23,'Belize'),
  (24,'Belgium'),
  (25,'Benin'),
  (26,'Bermuda'),
  (27,'Bulgaria'),
  (28,'Bolivia'),
  (29,'Bosnia and Herzegovina'),
  (30,'Botswana'),
  (31,'Brazil'),
  (32,'British Virgin Islands'),
  (33,'Brunei'),
  (34,'Burkina Faso'),
  (35,'Burundi'),
  (36,'Bhutan'),
  (37,'Wallis and Futuna'),
  (38,'Vanuatu'),
  (39,'United Kingdom'),
  (40,'Hungary'),
  (41,'Venezuela'),
  (42,'East Timor'),
  (43,'Vietnam'),
  (44,'Gabon'),
  (45,'Haiti'),
  (46,'Guyana'),
  (47,'Gambia'),
  (48,'Ghana'),
  (49,'Guadeloupe'),
  (50,'Guatemala'),
  (51,'Guinea'),
  (52,'Guinea-Bissau'),
  (53,'Germany'),
  (54,'Guernsey'),
  (55,'Gibraltar'),
  (56,'Honduras'),
  (57,'Hong Kong'),
  (58,'Grenada'),
  (59,'Greenland'),
  (60,'Greece'),
  (61,'Georgia'),
  (62,'Denmark'),
  (63,'Jersey'),
  (64,'Djibouti'),
  (65,'Dominican Republic'),
  (66,'Egypt'),
  (67,'Zambia'),
  (68,'Western Sahara'),
  (69,'Zimbabwe'),
  (70,'Israel'),
  (71,'India'),
  (72,'Indonesia'),
  (73,'Jordan'),
  (74,'Iraq'),
  (75,'Iran'),
  (76,'Ireland'),
  (77,'Iceland'),
  (78,'Spain'),
  (79,'Italy'),
  (80,'Yemen'),
  (81,'Cape Verde'),
  (82,'Kazakhstan'),
  (83,'Cambodia'),
  (84,'Cameroon'),
  (85,'Canada'),
  (86,'Qatar'),
  (87,'Kenya'),
  (88,'Cyprus'),
  (89,'Kiribati'),
  (90,'China'),
  (91,'Colombia'),
  (92,'Comoros'),
  (93,'Congo (Brazzaville)'),
  (94,'Congo (Kinshasa)'),
  (95,'Costa Rica'),
  (96,'Cote D''Ivoire'),
  (97,'Cuba'),
  (98,'Kuwait'),
  (99,'Cook Islands'),
  (100,'Kyrgyzstan'),
  (101,'Laos'),
  (102,'Latvia'),
  (103,'Lesotho'),
  (104,'Liberia'),
  (105,'Lebanon'),
  (106,'Libya'),
  (107,'Lithuania'),
  (108,'Liechtenstein'),
  (109,'Luxembourg'),
  (110,'Mauritius'),
  (111,'Mauritania'),
  (112,'Madagascar'),
  (113,'Macedonia'),
  (114,'Malawi'),
  (115,'Malaysia'),
  (116,'Mali'),
  (117,'Maldives'),
  (118,'Malta'),
  (119,'Martinique'),
  (120,'Mexico'),
  (121,'Mozambique'),
  (122,'Moldova'),
  (123,'Monaco'),
  (124,'Mongolia'),
  (125,'Morocco'),
  (126,'Myanmar (Burma)'),
  (127,'Isle of Man'),
  (128,'Namibia'),
  (129,'Nauru'),
  (130,'Nepal'),
  (131,'Niger'),
  (132,'Nigeria'),
  (133,'Netherlands'),
  (134,'Nicaragua'),
  (135,'New Zealand'),
  (136,'New Caledonia'),
  (137,'Norway'),
  (138,'Norfolk Island'),
  (139,'United Arab Emirates'),
  (140,'Oman'),
  (141,'Pakistan'),
  (142,'Panama'),
  (143,'Papua New Guinea'),
  (144,'Paraguay'),
  (145,'Peru'),
  (146,'Pitcairn Islands'),
  (147,'Poland'),
  (148,'Portugal'),
  (149,'Puerto Rico'),
  (150,'Reunion'),
  (151,'Rwanda'),
  (152,'Romania'),
  (153,'United States'),
  (154,'El Salvador'),
  (155,'Samoa'),
  (156,'San Marino'),
  (157,'Sao Tome and Principe'),
  (158,'Saudi Arabia'),
  (159,'Swaziland'),
  (160,'Saint Lucia'),
  (161,'Saint Helena'),
  (162,'North Korea'),
  (163,'Seychelles'),
  (164,'Saint Pierre and Miquelon'),
  (165,'Senegal'),
  (166,'Saint Kitts and Nevis'),
  (167,'Saint Vincent and the Grenadines'),
  (168,'Serbia'),
  (169,'Singapore'),
  (170,'Syria'),
  (171,'Slovakia'),
  (172,'Slovenia'),
  (173,'Solomon Islands'),
  (174,'Somalia'),
  (175,'Sudan'),
  (176,'Suriname'),
  (177,'Sierra Leone'),
  (178,'Tajikistan'),
  (179,'Taiwan'),
  (180,'Thailand'),
  (181,'Tanzania'),
  (182,'Togo'),
  (183,'Tokelau'),
  (184,'Tonga'),
  (185,'Trinidad and Tobago'),
  (186,'Tuvalu'),
  (187,'Tunisia'),
  (188,'Turkmenistan'),
  (189,'Turks and Caicos Islands'),
  (190,'Turkey'),
  (191,'Uganda'),
  (192,'Uzbekistan'),
  (193,'Uruguay'),
  (194,'Faroe Islands'),
  (195,'Fiji'),
  (196,'Philippines'),
  (197,'Finland'),
  (198,'France'),
  (199,'French Guiana'),
  (200,'French Polynesia'),
  (201,'Croatia'),
  (202,'Chad'),
  (203,'Montenegro'),
  (204,'Czech Republic'),
  (205,'Chile'),
  (206,'Switzerland'),
  (207,'Sweden'),
  (208,'Sri Lanka'),
  (209,'Ecuador'),
  (210,'Equatorial Guinea'),
  (211,'Eritrea'),
  (212,'Estonia'),
  (213,'Ethiopia'),
  (214,'South Africa'),
  (215,'South Korea'),
  (216,'South Ossetia'),
  (217,'Jamaica'),
  (218,'Japan');
COMMIT;

#
# Data for the `grapes` table  (LIMIT 0,500)
#

INSERT INTO `grapes` (`id`, `name`) VALUES 
  (1,'Vitis acerifolia'),
  (2,'Vitis aestivalis'),
  (3,'Vitis amurensis'),
  (4,'Vitis arizonica'),
  (5,'Vitis bourquina'),
  (6,'Vitis californica'),
  (7,'Vitis champinii'),
  (8,'Vitis cinerea'),
  (9,'Vitis coignetiae'),
  (10,'Vitis doaniana'),
  (11,'Vitis girdiana'),
  (12,'Vitis labrusca'),
  (13,'Vitis labruscana'),
  (14,'Vitis lincecumii'),
  (15,'Vitis monticola'),
  (16,'Vitis mustangensis'),
  (17,'Vitis novae-angli'),
  (18,'Vitis palmata'),
  (19,'Vitis riparia'),
  (20,'Vitis rotundifolia'),
  (21,'Vitis rupestris'),
  (22,'Vitis shuttleworthii'),
  (23,'Vitis tiliifolia'),
  (24,'Vitis vinifera'),
  (25,'Vitis vulpina');
COMMIT;

#
# Data for the `photos` table  (LIMIT 0,500)
#

INSERT INTO `photos` (`id`, `name`) VALUES 
  (3,'1334925717mobile.jpg'),
  (4,'1334925717_dark2.jpg'),
  (5,'1334925717day_bg.jpg'),
  (6,'1334925717_dark.jpg');
COMMIT;

#
# Data for the `regions` table  (LIMIT 0,500)
#

INSERT INTO `regions` (`id`, `name`, `country`) VALUES 
  (1,'AL',153);
COMMIT;

#
# Data for the `time_zone` table  (LIMIT 0,500)
#

INSERT INTO `time_zone` (`id_zone`, `name`) VALUES 
  (1,'GMT +12'),
  (2,'GMT +11'),
  (3,'GMT +10'),
  (4,'GMT +9'),
  (5,'GMT +8'),
  (6,'GMT +7'),
  (7,'GMT +6'),
  (8,'GMT +5'),
  (9,'GMT +4'),
  (10,'GMT +3'),
  (11,'GMT +2'),
  (12,'GMT +1'),
  (13,'GMT 0'),
  (14,'GMT -1'),
  (15,'GMT -2'),
  (16,'GMT -3'),
  (17,'GMT -4'),
  (18,'GMT -5'),
  (19,'GMT -6'),
  (20,'GMT -7'),
  (21,'GMT -8'),
  (22,'GMT -9'),
  (23,'GMT -10'),
  (24,'GMT -11'),
  (25,'GMT -12');
COMMIT;

#
# Data for the `users` table  (LIMIT 0,500)
#

INSERT INTO `users` (`id`, `name`, `firstname`, `surname`, `email`, `company`, `country_id`, `avatar`, `zone_id`, `password`, `reg_id`, `status`, `privacy`, `involves`, `role`) VALUES 
  (1,'Zahar','zahar','Pecherin','zahar@lodoss.org','lodoss','1','132992127010.png','1','e10adc3949ba59abbe56e057f20f883e','0',1,'','','admin'),
  (2,'wss','','','adssmin@smail.ru','','3',NULL,'1','af15d5fdacd5fdfea300e88a8e253e82','9d0bf302328fe2557568dd2ae58dd2ee',0,'Receive comment follow-up notification e-mails ','Restaurant employee or owner; ','user'),
  (3,'sds','','','stsas@lodoss.org','','3','1334655544_dark2.jpg','1','af15d5fdacd5fdfea300e88a8e253e82','98ad7592d2bb313d148c809317fafab9',0,'Opt in for promotion offers','Wine tourism professional e.g. wine tour operator, tourism office, government official; ','user'),
  (4,'jjh','Lodoss','','hello@lodoss.org','','1','1334655756_dark2.jpg','1','875f26fdb1cecf20ceb4ca028263dec6','7a1b1c4a504adba9f2b91c92f34fded3',0,'Opt in for promotion offers','Vineyard/Winery employee or owner; ','user');
COMMIT;

#
# Data for the `vineyard_photos` table  (LIMIT 0,500)
#

INSERT INTO `vineyard_photos` (`id`, `vineyard`, `photo`) VALUES 
  (1,8,3),
  (2,8,4),
  (3,8,5),
  (4,8,6);
COMMIT;

#
# Data for the `vineyards` table  (LIMIT 0,500)
#

INSERT INTO `vineyards` (`id`, `name`, `nameloc`, `address1`, `address2`, `city`, `zip`, `country`, `continent`, `telephone`, `fax`, `email`, `web`, `loc_y`, `region`, `logo`, `proprietor`, `visits`, `individuals`, `groups`, `appointment`, `restaurant`, `accommodation`, `weddings`, `seminars`, `status`, `loc_z`, `ass_region`) VALUES 
  (8,'dasds','','','',1,'',19,6,'232332','','','','38.75346980507811','0',NULL,'',0,0,0,0,0,0,0,0,0,'47.37948257653369',NULL);
COMMIT;

#
# Data for the `wines` table  (LIMIT 0,500)
#

INSERT INTO `wines` (`id`, `name`) VALUES 
  (1,'Cahors'),
  (2,'Sherry');
COMMIT;



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;