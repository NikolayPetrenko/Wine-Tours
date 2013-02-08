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
  `local_name` varchar(255) DEFAULT NULL,
  `country` varchar(20) DEFAULT NULL,
  `description` text,
  `loc_y` varchar(255) DEFAULT NULL,
  `loc_z` varchar(255) DEFAULT NULL,
  `links` varchar(255) DEFAULT NULL,
  `acknowledgements` text,
  `notes` varchar(255) DEFAULT NULL,
  `update` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  `grapes` varchar(255) DEFAULT NULL,
  `alias` varchar(255) DEFAULT NULL,
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
  `alias` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

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
# Structure for the `countries` table : 
#

DROP TABLE IF EXISTS `countries`;

CREATE TABLE `countries` (
  `code` char(2) CHARACTER SET latin1 NOT NULL,
  `name_en` tinytext CHARACTER SET latin1,
  `name_fr` tinytext CHARACTER SET latin1,
  `continent` int(11) DEFAULT NULL,
  `alias` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Structure for the `grapes` table : 
#

DROP TABLE IF EXISTS `grapes`;

CREATE TABLE `grapes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `other_name` varchar(255) DEFAULT NULL,
  `characteristics` varchar(255) DEFAULT NULL,
  `update` timestamp NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

#
# Structure for the `photos` table : 
#

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;

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
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;

#
# Structure for the `spokens` table : 
#

DROP TABLE IF EXISTS `spokens`;

CREATE TABLE `spokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `code` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

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
  `country` varchar(20) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `zone` varchar(20) NOT NULL,
  `password` varchar(32) NOT NULL,
  `reg_id` varchar(32) NOT NULL,
  `status` int(1) DEFAULT NULL,
  `privacy` int(11) NOT NULL COMMENT '1-Opt in for promotion offers, 2-Receive comment follow-up notification e-mails, 3-Personal contact form',
  `involve` text NOT NULL,
  `role` varchar(255) NOT NULL,
  `remove` int(11) DEFAULT '0' COMMENT '0-not delete, 1-delete',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 MIN_ROWS=4 MAX_ROWS=13;

#
# Structure for the `vineyard_grapes` table : 
#

DROP TABLE IF EXISTS `vineyard_grapes`;

CREATE TABLE `vineyard_grapes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vineyard` int(11) DEFAULT NULL,
  `grape` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=42 DEFAULT CHARSET=latin1;

#
# Structure for the `vineyard_photos` table : 
#

DROP TABLE IF EXISTS `vineyard_photos`;

CREATE TABLE `vineyard_photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vineyard` int(11) DEFAULT NULL,
  `photo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;

#
# Structure for the `vineyard_seasons` table : 
#

DROP TABLE IF EXISTS `vineyard_seasons`;

CREATE TABLE `vineyard_seasons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vineyard` int(11) DEFAULT NULL,
  `season` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=55 DEFAULT CHARSET=latin1;

#
# Structure for the `vineyard_spokens` table : 
#

DROP TABLE IF EXISTS `vineyard_spokens`;

CREATE TABLE `vineyard_spokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vineyard` int(11) DEFAULT NULL,
  `spoken` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=76 DEFAULT CHARSET=utf8;

#
# Structure for the `vineyard_wines` table : 
#

DROP TABLE IF EXISTS `vineyard_wines`;

CREATE TABLE `vineyard_wines` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vineyard` int(11) DEFAULT NULL,
  `wine` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

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
  `country` varchar(20) DEFAULT NULL,
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
  `status` int(1) DEFAULT NULL COMMENT '0-unverified listing, 1-verified listing, 2-claimed listing',
  `loc_z` varchar(255) DEFAULT NULL,
  `ass_region` int(11) DEFAULT NULL,
  `alias` varchar(255) DEFAULT NULL,
  `update` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  `tasting` int(11) DEFAULT NULL COMMENT '0-free, 1-Charged, 2-Not available',
  `tour` int(11) DEFAULT NULL COMMENT '0-free, 1-Charged, 2-Not available',
  `sales` int(11) DEFAULT NULL COMMENT '1-yes, 0-no',
  `workshops` int(11) DEFAULT NULL COMMENT '1-yes, 0-no',
  `user` int(11) DEFAULT NULL,
  `notes_chang` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

#
# Structure for the `wines` table : 
#

DROP TABLE IF EXISTS `wines`;

CREATE TABLE `wines` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `grapes` varchar(255) DEFAULT NULL,
  `vintage` varchar(255) DEFAULT NULL,
  `update` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  `type` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `alias` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

#
# Data for the `ass_regions` table  (LIMIT 0,500)
#

INSERT INTO `ass_regions` (`id`, `name`, `local_name`, `country`, `description`, `loc_y`, `loc_z`, `links`, `acknowledgements`, `notes`, `update`, `grapes`, `alias`) VALUES 
  (1,'Champage','Champage','FR','asdasdas','33.207684436370855','-1.328655249999997','a:2:{i:0;s:6:\"asdasd\";i:1;s:9:\"dasdasdas\";}','asdasd','asdasdasd','0000-00-00 00:00:00','N;','champage');
COMMIT;

#
# Data for the `cities` table  (LIMIT 0,500)
#

INSERT INTO `cities` (`id`, `name`, `region`, `alias`) VALUES 
  (1,'Montgomery',1,NULL),
  (2,'Mon',1,NULL),
  (6,'',3,NULL),
  (7,'Ð¡Ð°Ñ€Ð¶Ðµ-Ð»Ðµ-Ð»Ðµ-ÐœÐ°Ð½',0,NULL),
  (8,'Ð¡ÐµÐ½-Ð¡Ð°Ñ‚ÑƒÑ€Ð½ÐµÐ½',0,NULL),
  (9,'Sen-Pavas',0,NULL),
  (10,'ÐœÐ¸Ñ€ÑƒÐ°Ñ€ - Ð‘Ð°Ñ‚Ð¸Ð½ÑŒÐ¾Ð»ÑŒ',0,NULL),
  (11,'Pauillac',0,NULL),
  (12,'Shange',0,NULL),
  (13,'Parampiyer',0,NULL),
  (14,'Ð‘Ð»Ð°Ð½ÐºÑ„Ð¾Ñ€',0,NULL),
  (15,'33530',0,NULL),
  (16,'ÐŸÐ°Ñ€Ð°Ð¼Ð¿ÑŽÐ¸Ñ€',0,NULL),
  (17,'Ð¡ÐµÐ½-Ð›ÑƒÐ¸-Ð´Ðµ-ÐœÐ¾Ð½Ñ„ÐµÑ€Ð°Ð½',0,NULL);
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
# Data for the `countries` table  (LIMIT 0,500)
#

INSERT INTO `countries` (`code`, `name_en`, `name_fr`, `continent`, `alias`) VALUES 
  ('AD','Andorra','Andorre',NULL,NULL),
  ('AE','United Arab Emirates','Ã?mirats arabes unis',NULL,NULL),
  ('AF','Afghanistan','Afghanistan',NULL,NULL),
  ('AG','Antigua and Barbuda','Antigua-et-Barbuda',NULL,NULL),
  ('AI','Anguilla','Anguilla',NULL,NULL),
  ('AL','Albania','Albanie',NULL,NULL),
  ('AM','Armenia','ArmÃ©nie',NULL,NULL),
  ('AO','Angola','Angola',NULL,NULL),
  ('AQ','Antarctica','Antarctique',NULL,NULL),
  ('AR','Argentina','Argentine',NULL,NULL),
  ('AS','American Samoa','Samoa amÃ©ricaine',NULL,NULL),
  ('AT','Austria','Autriche',NULL,NULL),
  ('AU','Australia','Australie',NULL,NULL),
  ('AW','Aruba','Aruba',NULL,NULL),
  ('AX','Aland Islands','Aland Islands',NULL,NULL),
  ('AZ','Azerbaijan','AzerbaÃ¯djan',NULL,NULL),
  ('BA','Bosnia and Herzegovina','Bosnie-HerzÃ©govine',NULL,NULL),
  ('BB','Barbados','Barbade',NULL,NULL),
  ('BD','Bangladesh','Bangladesh',NULL,NULL),
  ('BE','Belgium','Belgique',NULL,NULL),
  ('BF','Burkina Faso','Burkina Faso',NULL,NULL),
  ('BG','Bulgaria','Bulgarie',NULL,NULL),
  ('BH','Bahrain','BahreÃ¯n',NULL,NULL),
  ('BI','Burundi','Burundi',NULL,NULL),
  ('BJ','Benin','BÃ©nin',NULL,NULL),
  ('BL','Saint BarthÃ©lemy','Saint-BarthÃ©lemy',NULL,NULL),
  ('BM','Bermuda','Bermudes',NULL,NULL),
  ('BN','Brunei Darussalam','Brunei Darussalam',NULL,NULL),
  ('BO','Bolivia','Bolivie',NULL,NULL),
  ('BQ','Caribbean Netherlands ','Pays-Bas caribÃ©ens',NULL,NULL),
  ('BR','Brazil','BrÃ©sil',NULL,NULL),
  ('BS','Bahamas','Bahamas',NULL,NULL),
  ('BT','Bhutan','Bhoutan',NULL,NULL),
  ('BV','Bouvet Island','Ã?le Bouvet',NULL,NULL),
  ('BW','Botswana','Botswana',NULL,NULL),
  ('BY','Belarus','BÃ©larus',NULL,NULL),
  ('BZ','Belize','Belize',NULL,NULL),
  ('CA','Canada','Canada',NULL,NULL),
  ('CC','Cocos (Keeling) Islands','Ã?les Cocos (Keeling)',NULL,NULL),
  ('CD','Congo, Democratic Republic of','Congo, RÃ©publique dÃ©mocratique du',NULL,NULL),
  ('CF','Central African Republic','RÃ©publique centrafricaine',NULL,NULL),
  ('CG','Congo','Congo',NULL,NULL),
  ('CH','Switzerland','Suisse',NULL,NULL),
  ('CI','Cote D''Invoire','Cote d''Invoire',NULL,NULL),
  ('CK','Cook Islands','Ã?les Cook',NULL,NULL),
  ('CL','Chile','Chili',NULL,NULL),
  ('CM','Cameroon','Cameroun',NULL,NULL),
  ('CN','China','Chine',NULL,NULL),
  ('CO','Colombia','Colombie',NULL,NULL),
  ('CR','Costa Rica','Costa Rica',NULL,NULL),
  ('CU','Cuba','Cuba',NULL,NULL),
  ('CV','Cape Verde','Cap-Vert',NULL,NULL),
  ('CW','CuraÃ§ao','CuraÃ§ao',NULL,NULL),
  ('CX','Christmas Island','Ã?le Christmas',NULL,NULL),
  ('CY','Cyprus','Chypre',NULL,NULL),
  ('CZ','Czech Republic','RÃ©publique tchÃ¨que',NULL,NULL),
  ('DE','Germany','Allemagne',NULL,NULL),
  ('DJ','Djibouti','Djibouti',NULL,NULL),
  ('DK','Denmark','Danemark',NULL,NULL),
  ('DM','Dominica','Dominique',NULL,NULL),
  ('DO','Dominican Republic','RÃ©publique dominicaine',NULL,NULL),
  ('DZ','Algeria','AlgÃ©rie',NULL,NULL),
  ('EC','Ecuador','Ã?quateur',NULL,NULL),
  ('EE','Estonia','Estonie',NULL,NULL),
  ('EG','Egypt','Ã?gypte',NULL,NULL),
  ('EH','Western Sahara','Sahara Occidental',NULL,NULL),
  ('ER','Eritrea','Ã?rythrÃ©e',NULL,NULL),
  ('ES','Spain','Espagne',NULL,NULL),
  ('ET','Ethiopia','Ã?thiopie',NULL,NULL),
  ('FI','Finland','Finlande',NULL,NULL),
  ('FJ','Fiji','Fidji',NULL,NULL),
  ('FK','Falkland Islands','Ã?les Malouines',NULL,NULL),
  ('FM','Micronesia, Federated States of','MicronÃ©sie, Ã?tats fÃ©dÃ©rÃ©s de',NULL,NULL),
  ('FO','Faroe Islands','Ã?les FÃ©roÃ©',NULL,NULL),
  ('FR','France','France',7,NULL),
  ('GA','Gabon','Gabon',NULL,NULL),
  ('GB','United Kingdom','Royaume-Uni',NULL,NULL),
  ('GD','Grenada','Grenade',NULL,NULL),
  ('GE','Georgia','GÃ©orgie',NULL,NULL),
  ('GF','French Guiana','Guyane franÃ§aise',NULL,NULL),
  ('GG','Guernsey','Guernesey',NULL,NULL),
  ('GH','Ghana','Ghana',NULL,NULL),
  ('GI','Gibraltar','Gibraltar',NULL,NULL),
  ('GL','Greenland','Groenland',NULL,NULL),
  ('GM','Gambia','Gambie',NULL,NULL),
  ('GN','Guinea','GuinÃ©e',NULL,NULL),
  ('GP','Guadeloupe','Guadeloupe',NULL,NULL),
  ('GQ','Equatorial Guinea','GuinÃ©e Ã©quatoriale',NULL,NULL),
  ('GR','Greece','GrÃ¨ce',NULL,NULL),
  ('GS','South Georgia and the South Sandwich Islands','GÃ©orgie du Sud et les Ã®les Sandwich du Sud',NULL,NULL),
  ('GT','Guatemala','Guatemala',NULL,NULL),
  ('GU','Guam','Guam',NULL,NULL),
  ('GW','Guinea-Bissau','GuinÃ©e-Bissau',NULL,NULL),
  ('GY','Guyana','Guyana',NULL,NULL),
  ('HK','Hong Kong','Hong Kong',NULL,NULL),
  ('HM','Heard and McDonald Islands','Ã?les Heard et McDonald',NULL,NULL),
  ('HN','Honduras','Honduras',NULL,NULL),
  ('HR','Croatia','Croatie',NULL,NULL),
  ('HT','Haiti','HaÃ¯ti',NULL,NULL),
  ('HU','Hungary','Hongrie',NULL,NULL),
  ('ID','Indonesia','IndonÃ©sie',NULL,NULL),
  ('IE','Ireland','Irlande',NULL,NULL),
  ('IL','Israel','IsraÃ«l',NULL,NULL),
  ('IM','Isle of Man','Ã?le de Man',NULL,NULL),
  ('IN','India','Inde',NULL,NULL),
  ('IO','British Indian Ocean Territory','Territoire britannique de l''ocÃ©an Indien',NULL,NULL),
  ('IQ','Iraq','Irak',NULL,NULL),
  ('IR','Iran','Iran',NULL,NULL),
  ('IS','Iceland','Islande',NULL,NULL),
  ('IT','Italy','Italie',NULL,NULL),
  ('JE','Jersey','Jersey',NULL,NULL),
  ('JM','Jamaica','JamaÃ¯que',NULL,NULL),
  ('JO','Jordan','Jordanie',NULL,NULL),
  ('JP','Japan','Japon',NULL,NULL),
  ('KE','Kenya','Kenya',NULL,NULL),
  ('KG','Kyrgyzstan','Kirghizistan',NULL,NULL),
  ('KH','Cambodia','Cambodge',NULL,NULL),
  ('KI','Kiribati','Kiribati',NULL,NULL),
  ('KM','Comoros','Comores',NULL,NULL),
  ('KN','Saint Kitts and Nevis','Saint-Kitts-et-Nevis',NULL,NULL),
  ('KP','North Korea','CorÃ©e du Nord',NULL,NULL),
  ('KR','South Korea','CorÃ©e du Sud',NULL,NULL),
  ('KW','Kuwait','KoweÃ¯t',NULL,NULL),
  ('KY','Cayman Islands','Ã?les CaÃ¯mans',NULL,NULL),
  ('KZ','Kazakhstan','Kazakhstan',NULL,NULL),
  ('LA','Lao People''s Democratic Rebublic','Laos',NULL,NULL),
  ('LB','Lebanon','Liban',NULL,NULL),
  ('LC','Saint Lucia','Sainte-Lucie',NULL,NULL),
  ('LI','Liechtenstein','Liechtenstein',NULL,NULL),
  ('LK','Sri Lanka','Sri Lanka',NULL,NULL),
  ('LR','Liberia','LibÃ©ria',NULL,NULL),
  ('LS','Lesotho','Lesotho',NULL,NULL),
  ('LT','Lithuania','Lituanie',NULL,NULL),
  ('LU','Luxembourg','Luxembourg',NULL,NULL),
  ('LV','Latvia','Lettonie',1,NULL),
  ('LY','Libya','Libye',NULL,NULL),
  ('MA','Morocco','Maroc',NULL,NULL),
  ('MC','Monaco','Monaco',NULL,NULL),
  ('MD','Moldova','Moldavie',NULL,NULL),
  ('ME','Montenegro','MontÃ©nÃ©gro',NULL,NULL),
  ('MF','Saint-Martin (France)','Saint-Martin (France)',NULL,NULL),
  ('MG','Madagascar','Madagascar',NULL,NULL),
  ('MH','Marshall Islands','Ã?les Marshall',NULL,NULL),
  ('MK','Macedonia','MacÃ©doine',NULL,NULL),
  ('ML','Mali','Mali',NULL,NULL),
  ('MM','Myanmar','Myanmar',NULL,NULL),
  ('MN','Mongolia','Mongolie',NULL,NULL),
  ('MO','Macau','Macao',NULL,NULL),
  ('MP','Northern Mariana Islands','Mariannes du Nord',NULL,NULL),
  ('MQ','Martinique','Martinique',NULL,NULL),
  ('MR','Mauritania','Mauritanie',NULL,NULL),
  ('MS','Montserrat','Montserrat',NULL,NULL),
  ('MT','Malta','Malte',NULL,NULL),
  ('MU','Mauritius','Maurice',NULL,NULL),
  ('MV','Maldives','Maldives',NULL,NULL),
  ('MW','Malawi','Malawi',NULL,NULL),
  ('MX','Mexico','Mexique',NULL,NULL),
  ('MY','Malaysia','Malaisie',NULL,NULL),
  ('MZ','Mozambique','Mozambique',NULL,NULL),
  ('NA','Namibia','Namibie',NULL,NULL),
  ('NC','New Caledonia','Nouvelle-CalÃ©donie',NULL,NULL),
  ('NE','Niger','Niger',NULL,NULL),
  ('NF','Norfolk Island','Ã?le Norfolk',NULL,NULL),
  ('NG','Nigeria','Nigeria',NULL,NULL),
  ('NI','Nicaragua','Nicaragua',NULL,NULL),
  ('NL','The Netherlands','Pays-Bas',NULL,NULL),
  ('NO','Norway','NorvÃ¨ge',NULL,NULL),
  ('NP','Nepal','NÃ©pal',NULL,NULL),
  ('NR','Nauru','Nauru',NULL,NULL),
  ('NU','Niue','Niue',NULL,NULL),
  ('NZ','New Zealand','Nouvelle-ZÃ©lande',NULL,NULL),
  ('OM','Oman','Oman',NULL,NULL),
  ('PA','Panama','Panama',NULL,NULL),
  ('PE','Peru','PÃ©rou',NULL,NULL),
  ('PF','French Polynesia','PolynÃ©sie franÃ§aise',NULL,NULL),
  ('PG','Papua New Guinea','Papouasie-Nouvelle-GuinÃ©e',NULL,NULL),
  ('PH','Philippines','Philippines',NULL,NULL),
  ('PK','Pakistan','Pakistan',NULL,NULL),
  ('PL','Poland','Pologne',NULL,NULL),
  ('PM','St. Pierre and Miquelon','Saint-Pierre-et-Miquelon',NULL,NULL),
  ('PN','Pitcairn','Pitcairn',NULL,NULL),
  ('PR','Puerto Rico','Puerto Rico',NULL,NULL),
  ('PS','Palestinian Territory, Occupied','Territoires palestiniens',NULL,NULL),
  ('PT','Portugal','Portugal',NULL,NULL),
  ('PW','Palau','Palau',NULL,NULL),
  ('PY','Paraguay','Paraguay',NULL,NULL),
  ('QA','Qatar','Qatar',NULL,NULL),
  ('RE','Reunion','RÃ©union',NULL,NULL),
  ('RO','Romania','Roumanie',NULL,NULL),
  ('RS','Serbia','Serbie',NULL,NULL),
  ('RU','Russian Federation','Russie',1,NULL),
  ('RW','Rwanda','Rwanda',NULL,NULL),
  ('SA','Saudi Arabia','Arabie saoudite',NULL,NULL),
  ('SB','Solomon Islands','Ã?les Salomon',NULL,NULL),
  ('SC','Seychelles','Seychelles',NULL,NULL),
  ('SD','Sudan','Soudan',NULL,NULL),
  ('SE','Sweden','SuÃ¨de',NULL,NULL),
  ('SG','Singapore','Singapour',NULL,NULL),
  ('SH','Saint Helena','Sainte-HÃ©lÃ¨ne',NULL,NULL),
  ('SI','Slovenia','SlovÃ©nie',NULL,NULL),
  ('SJ','Svalbard and Jan Mayen Islands','Svalbard et Ã®le de Jan Mayen',NULL,NULL),
  ('SK','Slovakia (Slovak Republic)','Slovaquie (RÃ©publique slovaque)',NULL,NULL),
  ('SL','Sierra Leone','Sierra Leone',NULL,NULL),
  ('SM','San Marino','Saint-Marin',NULL,NULL),
  ('SN','Senegal','SÃ©nÃ©gal',NULL,NULL),
  ('SO','Somalia','Somalie',NULL,NULL),
  ('SR','Suriname','Suriname',NULL,NULL),
  ('SS','South Sudan','Soudan du Sud',NULL,NULL),
  ('ST','Sao Tome and Principe','Sao TomÃ©-et-Principe',NULL,NULL),
  ('SV','El Salvador','El Salvador',NULL,NULL),
  ('SX','Saint-Martin (Pays-Bas)','Sint Maarten ',NULL,NULL),
  ('SY','Syria','Syrie',NULL,NULL),
  ('SZ','Swaziland','Swaziland',NULL,NULL),
  ('TC','Turks and Caicos Islands','Ã?les Turks et Caicos',NULL,NULL),
  ('TD','Chad','Tchad',NULL,NULL),
  ('TF','French Southern Territories','Terres australes franÃ§aises',NULL,NULL),
  ('TG','Togo','Togo',NULL,NULL),
  ('TH','Thailand','ThaÃ¯lande',NULL,NULL),
  ('TJ','Tajikistan','Tadjikistan',NULL,NULL),
  ('TK','Tokelau','Tokelau',NULL,NULL),
  ('TL','Timor-Leste','Timor-Leste',NULL,NULL),
  ('TM','Turkmenistan','TurkmÃ©nistan',NULL,NULL),
  ('TN','Tunisia','Tunisie',NULL,NULL),
  ('TO','Tonga','Tonga',NULL,NULL),
  ('TR','Turkey','Turquie',NULL,NULL),
  ('TT','Trinidad and Tobago','TrinitÃ©-et-Tobago',NULL,NULL),
  ('TV','Tuvalu','Tuvalu',NULL,NULL),
  ('TW','Taiwan','TaÃ¯wan',NULL,NULL),
  ('TZ','Tanzania','Tanzanie',NULL,NULL),
  ('UA','Ukraine','Ukraine',NULL,NULL),
  ('UG','Uganda','Ouganda',NULL,NULL),
  ('UM','United States Minor Outlying Islands','Ã?les mineures Ã©loignÃ©es des Ã?tats-Unis',NULL,NULL),
  ('US','United States','Ã?tats-Unis',NULL,NULL),
  ('UY','Uruguay','Uruguay',NULL,NULL),
  ('UZ','Uzbekistan','OuzbÃ©kistan',NULL,NULL),
  ('VA','Vatican','Vatican',NULL,NULL),
  ('VC','Saint Vincent and the Grenadines','Saint-Vincent-et-les-Grenadines',NULL,NULL),
  ('VE','Venezuela','Venezuela',NULL,NULL),
  ('VG','Virgin Islands (British)','Ã?les Vierges britanniques',NULL,NULL),
  ('VI','Virgin Islands (U.S.)','Ã?les Vierges amÃ©ricaines',NULL,NULL),
  ('VN','Vietnam','Vietnam',NULL,NULL),
  ('VU','Vanuatu','Vanuatu',NULL,NULL),
  ('WF','Wallis and Futuna Islands','Ã?les Wallis-et-Futuna',NULL,NULL),
  ('WS','Samoa','Samoa',NULL,NULL),
  ('YE','Yemen','YÃ©men',NULL,NULL),
  ('YT','Mayotte','Mayotte',NULL,NULL),
  ('ZA','South Africa','Afrique du Sud',NULL,NULL),
  ('ZM','Zambia','Zambie',NULL,NULL),
  ('ZW','Zimbabwe','Zimbabwe',NULL,NULL);
COMMIT;

#
# Data for the `grapes` table  (LIMIT 0,500)
#

INSERT INTO `grapes` (`id`, `name`, `other_name`, `characteristics`, `update`) VALUES 
  (1,'Vitis acerifolia',NULL,NULL,'0000-00-00 00:00:00'),
  (2,'Vitis aestivalis',NULL,NULL,'0000-00-00 00:00:00'),
  (3,'Vitis amurensis',NULL,NULL,'0000-00-00 00:00:00'),
  (4,'Vitis arizonica',NULL,NULL,'0000-00-00 00:00:00'),
  (5,'Vitis bourquina',NULL,NULL,'0000-00-00 00:00:00'),
  (6,'Vitis californica',NULL,NULL,'0000-00-00 00:00:00'),
  (7,'Vitis champinii',NULL,NULL,'0000-00-00 00:00:00'),
  (8,'Vitis cinerea',NULL,NULL,'0000-00-00 00:00:00'),
  (9,'Vitis coignetiae',NULL,NULL,'0000-00-00 00:00:00'),
  (10,'Vitis doaniana',NULL,NULL,'0000-00-00 00:00:00'),
  (11,'Vitis girdiana',NULL,NULL,'0000-00-00 00:00:00'),
  (12,'Vitis labrusca',NULL,NULL,'0000-00-00 00:00:00'),
  (13,'Vitis labruscana',NULL,NULL,'0000-00-00 00:00:00'),
  (14,'Vitis lincecumii',NULL,NULL,'0000-00-00 00:00:00'),
  (15,'Vitis monticola',NULL,NULL,'0000-00-00 00:00:00'),
  (16,'Vitis mustangensis',NULL,NULL,'0000-00-00 00:00:00'),
  (17,'Vitis novae-angli',NULL,NULL,'0000-00-00 00:00:00'),
  (18,'Vitis palmata',NULL,NULL,'0000-00-00 00:00:00'),
  (19,'Vitis riparia',NULL,NULL,'0000-00-00 00:00:00'),
  (20,'Vitis rotundifolia',NULL,NULL,'0000-00-00 00:00:00'),
  (21,'Vitis rupestris',NULL,NULL,'0000-00-00 00:00:00'),
  (22,'Vitis shuttleworthii',NULL,NULL,'0000-00-00 00:00:00'),
  (23,'Vitis tiliifolia',NULL,NULL,'0000-00-00 00:00:00'),
  (24,'Vitis vinifera',NULL,NULL,'0000-00-00 00:00:00'),
  (25,'Vitis vulpina',NULL,NULL,'0000-00-00 00:00:00'),
  (27,'dsds','dsds','sdsds','0000-00-00 00:00:00');
COMMIT;

#
# Data for the `photos` table  (LIMIT 0,500)
#

INSERT INTO `photos` (`id`, `name`) VALUES 
  (7,'1335333997mobile.jpg'),
  (8,'1335333997_dark2.jpg'),
  (9,'1335333997day_bg.jpg'),
  (10,'1335427199_sample-thumb3.jpg'),
  (11,'1335427199_sample-thumb3.jpg'),
  (12,'1335427199_sample-thumb3.jpg'),
  (13,'1335607609_dark2.jpg'),
  (14,'1335607609day_bg.jpg'),
  (15,'1335607609_dark.jpg'),
  (16,'1335607609_ultra.jpg'),
  (17,'1335607609_electric_poster.jpg'),
  (18,'1335607609_dark.jpg'),
  (19,'1335607609_electric_poster.jpg'),
  (20,'1335607649electric-logo.jpg'),
  (21,'1335607609_electric_poster.jpg'),
  (22,'1335607609_electric_poster.jpg'),
  (23,'1335607649electric-logo.jpg'),
  (24,'1335607649electric-logo.jpg'),
  (25,'1335607609_electric_poster.jpg'),
  (26,'1335607609_electric_poster.jpg'),
  (27,'1335607649electric-logo.jpg'),
  (28,'1335607649electric-logo.jpg'),
  (29,'1335607609_electric_poster.jpg'),
  (30,'1335607609_electric_poster.jpg'),
  (31,'1335607649electric-logo.jpg'),
  (32,'1335607649electric-logo.jpg'),
  (33,'1335607609_electric_poster.jpg'),
  (34,'1335607609_electric_poster.jpg'),
  (35,'1335607649electric-logo.jpg'),
  (36,'1335607649electric-logo.jpg'),
  (37,'1335607609_electric_poster.jpg');
COMMIT;

#
# Data for the `regions` table  (LIMIT 0,500)
#

INSERT INTO `regions` (`id`, `name`, `country`) VALUES 
  (1,'AL',153);
COMMIT;

#
# Data for the `seasons` table  (LIMIT 0,500)
#

INSERT INTO `seasons` (`id`, `name`, `date1`, `date2`, `weeks`, `time1`, `time2`, `notes`) VALUES 
  (19,'season1','02-04-2012','26-04-2012','N;','','',''),
  (20,'season summer','01-06-2012','31-08-2012','a:2:{i:0;s:6:\"Monday\";i:1;s:6:\"Friday\";}','00:00','04:30',''),
  (21,'season summer','','','N;','','',''),
  (22,'season summer','Apr 02','Apr 20','a:2:{i:0;s:9:\"Wednesday\";i:1;s:8:\"Thursday\";}','02:30','03:00','dasdasd'),
  (23,'dasdas','Apr 20','Apr 25','a:2:{i:0;s:8:\"Thursday\";i:1;s:6:\"Friday\";}','01:30','01:30','ewqe'),
  (24,'season summer','Apr 02','Apr 20','a:2:{i:0;s:9:\"Wednesday\";i:1;s:8:\"Thursday\";}','02:30','03:00','dasdasd'),
  (25,'dasdas','Apr 20','Apr 25','a:2:{i:0;s:8:\"Thursday\";i:1;s:6:\"Friday\";}','01:30','01:30','ewqe'),
  (26,'dasdas','Apr 20','Apr 25','a:2:{i:0;s:8:\"Thursday\";i:1;s:6:\"Friday\";}','01:30','01:30','ewqe'),
  (27,'season summer','Apr 02','Apr 20','a:2:{i:0;s:9:\"Wednesday\";i:1;s:8:\"Thursday\";}','02:30','03:00','dasdasd'),
  (28,'season summer','Apr 02','Apr 20','a:2:{i:0;s:9:\"Wednesday\";i:1;s:8:\"Thursday\";}','02:30','03:00','dasdasd'),
  (29,'dasdas','Apr 20','Apr 25','a:2:{i:0;s:8:\"Thursday\";i:1;s:6:\"Friday\";}','01:30','01:30','ewqe'),
  (30,'dasdas','Apr 20','Apr 25','a:2:{i:0;s:8:\"Thursday\";i:1;s:6:\"Friday\";}','01:30','01:30','ewqe'),
  (31,'season summer','Apr 02','Apr 20','a:2:{i:0;s:9:\"Wednesday\";i:1;s:8:\"Thursday\";}','02:30','03:00','dasdasd'),
  (32,'season summer','Apr 02','Apr 20','a:2:{i:0;s:9:\"Wednesday\";i:1;s:8:\"Thursday\";}','02:30','03:00','dasdasd'),
  (33,'dasdas','Apr 20','Apr 25','a:2:{i:0;s:8:\"Thursday\";i:1;s:6:\"Friday\";}','01:30','01:30','ewqe'),
  (34,'dasdas','Apr 20','Apr 25','a:2:{i:0;s:8:\"Thursday\";i:1;s:6:\"Friday\";}','01:30','01:30','ewqe'),
  (35,'season summer','Apr 02','Apr 20','a:2:{i:0;s:9:\"Wednesday\";i:1;s:8:\"Thursday\";}','02:30','03:00','dasdasd'),
  (36,'season summer','Apr 02','Apr 20','a:2:{i:0;s:9:\"Wednesday\";i:1;s:8:\"Thursday\";}','02:30','03:00','dasdasd'),
  (37,'dasdas','Apr 20','Apr 25','a:2:{i:0;s:8:\"Thursday\";i:1;s:6:\"Friday\";}','01:30','01:30','ewqe'),
  (38,'dasdas','Apr 20','Apr 25','a:2:{i:0;s:8:\"Thursday\";i:1;s:6:\"Friday\";}','01:30','01:30','ewqe'),
  (39,'dasdas','Apr 20','Apr 25','a:2:{i:0;s:8:\"Thursday\";i:1;s:6:\"Friday\";}','01:30','01:30','ewqe'),
  (40,'dasdas','Apr 20','Apr 25','a:2:{i:0;s:8:\"Thursday\";i:1;s:6:\"Friday\";}','01:30','01:30','ewqe'),
  (41,'dasdas','Apr 20','Apr 25','a:7:{i:0;s:6:\"Monday\";i:1;s:7:\"Tuesday\";i:2;s:9:\"Wednesday\";i:3;s:8:\"Thursday\";i:4;s:6:\"Friday\";i:5;s:8:\"Saturday\";i:6;s:6:\"Sunday\";}','01:30','01:30','ewqe'),
  (42,'dasdas','Apr 20','Apr 25','a:7:{i:0;s:6:\"Monday\";i:1;s:7:\"Tuesday\";i:2;s:9:\"Wednesday\";i:3;s:8:\"Thursday\";i:4;s:6:\"Friday\";i:5;s:8:\"Saturday\";i:6;s:6:\"Sunday\";}','01:30','01:30','ewqe'),
  (43,'dasdas','Apr 20','Apr 25','a:7:{i:0;s:6:\"Monday\";i:1;s:7:\"Tuesday\";i:2;s:9:\"Wednesday\";i:3;s:8:\"Thursday\";i:4;s:6:\"Friday\";i:5;s:8:\"Saturday\";i:6;s:6:\"Sunday\";}','01:30','01:30','ewqe'),
  (44,'dasdas','Apr 20','Apr 25','a:7:{i:0;s:6:\"Monday\";i:1;s:7:\"Tuesday\";i:2;s:9:\"Wednesday\";i:3;s:8:\"Thursday\";i:4;s:6:\"Friday\";i:5;s:8:\"Saturday\";i:6;s:6:\"Sunday\";}','01:30','01:30','ewqe'),
  (45,'dasdas','Apr 20','Apr 25','a:7:{i:0;s:6:\"Monday\";i:1;s:7:\"Tuesday\";i:2;s:9:\"Wednesday\";i:3;s:8:\"Thursday\";i:4;s:6:\"Friday\";i:5;s:8:\"Saturday\";i:6;s:6:\"Sunday\";}','01:30','01:30','ewqe'),
  (46,'dasdas','Apr 20','Apr 25','a:7:{i:0;s:6:\"Monday\";i:1;s:7:\"Tuesday\";i:2;s:9:\"Wednesday\";i:3;s:8:\"Thursday\";i:4;s:6:\"Friday\";i:5;s:8:\"Saturday\";i:6;s:6:\"Sunday\";}','01:30','01:30','ewqe'),
  (47,'season summer','Apr 02','Apr 25','a:2:{i:0;s:6:\"Monday\";i:1;s:6:\"Friday\";}','01:30','04:00','swsw'),
  (48,'season summer','Apr 02','Apr 25','a:2:{i:0;s:6:\"Monday\";i:1;s:6:\"Friday\";}','01:30','04:00','swsw'),
  (49,'season summer','Apr 02','Apr 25','a:2:{i:0;s:6:\"Monday\";i:1;s:6:\"Friday\";}','01:30','04:00','swsw'),
  (50,'season summer','Apr 02','Apr 25','a:2:{i:0;s:6:\"Monday\";i:1;s:6:\"Friday\";}','01:30','04:00','swsw'),
  (51,'season summer','Apr 02','Apr 25','a:2:{i:0;s:6:\"Monday\";i:1;s:6:\"Friday\";}','01:30','04:00','swsw'),
  (52,'season summer','Apr 02','Apr 25','a:2:{i:0;s:6:\"Monday\";i:1;s:6:\"Friday\";}','01:30','04:00','swsw'),
  (53,'season summer','Apr 02','Apr 25','a:2:{i:0;s:6:\"Monday\";i:1;s:6:\"Friday\";}','01:30','04:00','swsw'),
  (54,'season summer','Apr 02','Apr 25','a:2:{i:0;s:6:\"Monday\";i:1;s:6:\"Friday\";}','01:30','04:00','swsw');
COMMIT;

#
# Data for the `spokens` table  (LIMIT 0,500)
#

INSERT INTO `spokens` (`id`, `name`, `code`) VALUES 
  (1,'Abkhazian','AB'),
  (2,'Afar\r\n','AA'),
  (3,'Afrikaans\r\n','AF'),
  (4,'Albanian\r\n','SQ'),
  (5,'Amharic\r\n','AM'),
  (6,'Arabic\r\n','AR'),
  (7,'Armenian\r\n','HY'),
  (8,'Assamese\r\n','AS'),
  (9,'Aymara\r\n','AY'),
  (10,'Azerbaijani\r\n','AZ'),
  (11,'Bashkir\r\n','BA'),
  (12,'Basque\r\n','EU'),
  (13,'Bengali, Bangla\r\n','BN'),
  (14,'Bhutani\r\n','DZ'),
  (15,'Bihari\r\n','BH'),
  (16,'Bislama\r\n','BI'),
  (17,'Breton\r\n','BR'),
  (18,'Bulgarian\r\n','BG'),
  (19,'Burmese\r\n','MY');
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

INSERT INTO `users` (`id`, `name`, `firstname`, `surname`, `email`, `company`, `country`, `avatar`, `zone`, `password`, `reg_id`, `status`, `privacy`, `involve`, `role`, `remove`) VALUES 
  (1,'Zahar','zahar','Pecherin','zahar@lodoss.org','lodoss','AX','1335272485_ultra.jpg','9','e10adc3949ba59abbe56e057f20f883e','0',NULL,3,'a:4:{i:0;s:56:\"I am a wine tourist/interested in wine/planning to visit\";i:1;s:51:\"Accommodation provider e.g. Hotel, Guest House etc.\";i:2;s:5:\"Other\";s:5:\"other\";s:4:\"dsds\";}','admin',0),
  (2,'Fannlm','dede','','no@email.com','','AF','1336049840_dark2.jpg','1','','3f854744dae0ed680ade914c0f57c30c',1,3,'1','user',0),
  (3,'sddsds','sdsds',NULL,'zashsdsar@email.com',NULL,NULL,NULL,'','','d7b1c8de8e52d130f701773036aa8725',0,0,'','user',1),
  (4,'sdsd','','','zashar@emadsdsil.com','sfsfs','AF',NULL,'1','af15d5fdacd5fdfea300e88a8e253e82','a0c3be48fc1c76ec9885afbaf25df6fb',NULL,3,'a:3:{i:0;s:56:\"I am a wine tourist/interested in wine/planning to visit\";i:1;s:86:\"Wine tourism professional e.g. wine tour operator, tourism office, government official\";i:2;s:13:\"Wine Retailer\";}','user',1),
  (5,'dsds','dsd',NULL,'zahads@lodoss.org',NULL,NULL,NULL,'','','e5bab7eae2db888b5edf42598469950d',0,0,'','user',1);
COMMIT;

#
# Data for the `vineyard_grapes` table  (LIMIT 0,500)
#

INSERT INTO `vineyard_grapes` (`id`, `vineyard`, `grape`) VALUES 
  (1,12,1),
  (2,12,2),
  (3,13,1),
  (4,13,2),
  (5,13,3),
  (41,17,1);
COMMIT;

#
# Data for the `vineyard_photos` table  (LIMIT 0,500)
#

INSERT INTO `vineyard_photos` (`id`, `vineyard`, `photo`) VALUES 
  (5,13,7),
  (6,13,8),
  (7,13,9),
  (34,17,36),
  (35,17,37);
COMMIT;

#
# Data for the `vineyard_seasons` table  (LIMIT 0,500)
#

INSERT INTO `vineyard_seasons` (`id`, `vineyard`, `season`) VALUES 
  (19,13,19),
  (20,13,20),
  (21,14,21),
  (54,17,54);
COMMIT;

#
# Data for the `vineyard_spokens` table  (LIMIT 0,500)
#

INSERT INTO `vineyard_spokens` (`id`, `vineyard`, `spoken`) VALUES 
  (5,13,'1'),
  (6,14,'3'),
  (73,17,'1'),
  (74,17,'2'),
  (75,17,'3');
COMMIT;

#
# Data for the `vineyard_wines` table  (LIMIT 0,500)
#

INSERT INTO `vineyard_wines` (`id`, `vineyard`, `wine`) VALUES 
  (3,12,1),
  (4,13,1),
  (28,17,1);
COMMIT;

#
# Data for the `vineyards` table  (LIMIT 0,500)
#

INSERT INTO `vineyards` (`id`, `name`, `nameloc`, `address1`, `address2`, `city`, `zip`, `country`, `continent`, `telephone`, `fax`, `email`, `web`, `loc_y`, `region`, `logo`, `proprietor`, `visits`, `individuals`, `groups`, `appointment`, `restaurant`, `accommodation`, `weddings`, `seminars`, `status`, `loc_z`, `ass_region`, `alias`, `update`, `tasting`, `tour`, `sales`, `workshops`, `user`, `notes_chang`) VALUES 
  (13,'Paul Joseph Vineyard','','','',11,'','FR',7,'2222222','','','','44.82610211080619','','1335266476_electric_poster.jpg','',0,0,0,0,0,0,0,0,0,'-0.6135122753905762',1,'paul_joseph_vineyard','1999-12-30 00:00:00',0,1,1,0,1,'jhgjghjg'),
  (14,'Vineyard Test','','','',12,'','FR',7,'333333','','','','47.989877440474444','','1335272485_ultra.jpg','',0,0,0,0,0,0,0,0,1,'0.2686903222656838',1,'vineyard_test','0000-00-00 00:00:00',1,2,1,1,1,'ferftfrty'),
  (17,'Vineyard Test6','bjjbn','nknknk','nklnlnln',17,'455454','FR',7,'23232323','23232323','test@test.com','http://www.wine.com','44.929017994472666','sdsd','1335608549electric-logo.jpg','scsc',0,0,0,0,1,0,1,0,2,'-0.5408136822509277',1,'vineyard-test6','0000-00-00 00:00:00',2,1,0,1,1,'fefef');
COMMIT;

#
# Data for the `wines` table  (LIMIT 0,500)
#

INSERT INTO `wines` (`id`, `name`, `grapes`, `vintage`, `update`, `type`, `notes`, `image`, `alias`) VALUES 
  (1,'Cahors',NULL,'1903','0000-00-00 00:00:00',NULL,NULL,NULL,'cagors'),
  (2,'Sherry',NULL,'1954','0000-00-00 00:00:00',NULL,NULL,NULL,'sherry'),
  (10,'asdas','a:2:{i:0;s:2:\"27\";i:1;s:1:\"3\";}','1954','0000-00-00 00:00:00','Wine white','asdasdas','1335967926_sample-thumb3.jpg','asdas'),
  (11,'asdasd','a:3:{i:0;s:2:\"27\";i:1;s:1:\"1\";i:2;s:1:\"3\";}','1903','0000-00-00 00:00:00','Wine white','qweeqweqw','1335967926_sample-thumb3.jpg','asdasd');
COMMIT;



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;