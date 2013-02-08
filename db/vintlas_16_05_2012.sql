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
# Structure for the `alternative_search` table : 
#

DROP TABLE IF EXISTS `alternative_search`;

CREATE TABLE `alternative_search` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `ip` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

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
  PRIMARY KEY (`id`),
  FULLTEXT KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

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
# Structure for the `claimes` table : 
#

DROP TABLE IF EXISTS `claimes`;

CREATE TABLE `claimes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `number` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `comment` text,
  `listing` int(11) DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;

#
# Structure for the `continents` table : 
#

DROP TABLE IF EXISTS `continents`;

CREATE TABLE `continents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

#
# Structure for the `countries` table : 
#

DROP TABLE IF EXISTS `countries`;

CREATE TABLE `countries` (
  `code` char(2) CHARACTER SET latin1 NOT NULL,
  `name_en` varchar(20) DEFAULT NULL,
  `name_fr` tinytext CHARACTER SET latin1,
  `continent` int(11) DEFAULT NULL,
  `alias` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`code`),
  FULLTEXT KEY `name_en` (`name_en`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

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
# Structure for the `partners` table : 
#

DROP TABLE IF EXISTS `partners`;

CREATE TABLE `partners` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) DEFAULT NULL,
  `region` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 MIN_ROWS=4 MAX_ROWS=13;

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
  `status` int(1) DEFAULT NULL COMMENT '0-unverified, 1-verified',
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
  `claim` int(1) DEFAULT NULL COMMENT '0-unclaim, 1-claim',
  `owner` int(2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `name` (`name`),
  FULLTEXT KEY `nameloc` (`nameloc`)
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
  PRIMARY KEY (`id`),
  FULLTEXT KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

#
# Data for the `alternative_search` table  (LIMIT 0,500)
#

INSERT INTO `alternative_search` (`id`, `name`, `ip`) VALUES 
  (1,'Champage','127.0.0.1'),
  (2,'Paul Joseph Vineyard','127.0.0.1'),
  (13,'Paul Joseph Vineyard','127.0.0.2'),
  (14,'Paul Joseph Vineyard','127.0.0.7'),
  (15,'pkpkp','127.0.0.1'),
  (16,'pkpkp','127.0.0.8'),
  (17,'pkpkp','127.0.0.2'),
  (18,'Champage','127.0.0.2'),
  (19,'russia','127.0.0.1'),
  (20,'ca','127.0.0.1'),
  (21,'cahors','127.0.0.1'),
  (22,'h','127.0.0.1'),
  (23,'d','127.0.0.1'),
  (24,'Paul Joseph','127.0.0.1'),
  (25,'france','127.0.0.1'),
  (26,'Paul Joseph Vineyard france','127.0.0.1'),
  (27,'Paul Joseph Vineyar','127.0.0.1'),
  (28,'Paul Joseph Viney\\','127.0.0.1'),
  (29,'Paul Joseph France','127.0.0.1'),
  (30,'Paul','127.0.0.1'),
  (31,'Pau','127.0.0.1'),
  (32,'Pa','127.0.0.1'),
  (33,'france paul','127.0.0.1'),
  (34,'france Paul Joseph Vineyard','127.0.0.1');
COMMIT;

#
# Data for the `ass_regions` table  (LIMIT 0,500)
#

INSERT INTO `ass_regions` (`id`, `name`, `local_name`, `country`, `description`, `loc_y`, `loc_z`, `links`, `acknowledgements`, `notes`, `update`, `grapes`, `alias`) VALUES 
  (1,'Champage','Champage','FR','Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum doloreLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum doloreLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum doloreLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore','33.207684436370855','-1.328655249999997','a:2:{i:0;s:6:\"www.yandex.ru\";i:1;s:9:\"www.google.com\";}','asdasd','asdasdasd','0000-00-00 00:00:00','a:2:{i:0;s:2:\"27\";i:1;s:1:\"3\";}','champage'),
  (3,'Elsass','Elsass','FR','Das Elsass (in Ã¤lterer Schreibweise auch ElsaÃŸ, elsÃ¤ssisch ''s Elsass, frz. Alsace [alËˆzas]) ist eine Landschaft im Osten Frankreichs. Es erstreckt sich Ã¼ber den westlichen Teil der Oberrheinischen Tiefebene, reicht jedoch im Nordwesten mit dem Krummen Elsass bis auf das lothringische Plateau. Es grenzt im Norden und Osten an Deutschland und im SÃ¼den an die Schweiz.\r\nDie franzÃ¶sische Verwaltungsregion Elsass (RÃ©gion Alsace) wurde 1973 geschaffen. Sie setzt sich aus den beiden DÃ©partements Bas-Rhin und Haut-Rhin zusammen. Ihre Hauptstadt ist StraÃŸburg. Das Elsass ist die flÃ¤chenmÃ¤ÃŸig kleinste Region auf dem franzÃ¶sischen Festland und hat rund 1,8 Millionen Einwohner.','45.99915581375052','1.884159156250007','a:2:{i:0;s:14:\"www.google.com\";i:1;s:12:\"www.wine.com\";}','dsdsds','dsdsdsdsdsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss','0000-00-00 00:00:00','a:5:{i:0;s:1:\"1\";i:1;s:1:\"2\";i:2;s:1:\"3\";i:3;s:1:\"4\";i:4;s:1:\"5\";}','elsass');
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
  (8,'Australia'),
  (9,'Oceania');
COMMIT;

#
# Data for the `countries` table  (LIMIT 0,500)
#

INSERT INTO `countries` (`code`, `name_en`, `name_fr`, `continent`, `alias`) VALUES 
  ('AD','Andorra','Andorre',7,'andorra'),
  ('AE','United Arab Emirates','Ã?mirats arabes unis',2,'united-arab-emirates'),
  ('AF','Afghanistan','Afghanistan',2,'afghanistan'),
  ('AG','Antigua and Barbuda','Antigua-et-Barbuda',4,'antigua-and-barbuda'),
  ('AI','Anguilla','Anguilla',4,'anguilla'),
  ('AL','Albania','Albanie',7,'albania'),
  ('AM','Armenia','ArmÃ©nie',2,'armenia'),
  ('AO','Angola','Angola',3,'angola'),
  ('AQ','Antarctica','Antarctique',6,'antarctica'),
  ('AR','Argentina','Argentine',5,'argentina'),
  ('AS','American Samoa','Samoa amÃ©ricaine',9,'american-samoa'),
  ('AT','Austria','Autriche',7,'austria'),
  ('AU','Australia','Australie',9,'australia'),
  ('AW','Aruba','Aruba',4,'aruba'),
  ('AX','Aland Islands','Aland Islands',7,'aland-islands'),
  ('AZ','Azerbaijan','AzerbaÃ¯djan',2,'azerbaijan'),
  ('BA','Bosnia and Herzegovi','Bosnie-HerzÃ©govine',7,'bosnia-and-herzegovi'),
  ('BB','Barbados','Barbade',4,'barbados'),
  ('BD','Bangladesh','Bangladesh',2,'bangladesh'),
  ('BE','Belgium','Belgique',4,'belgium'),
  ('BF','Burkina Faso','Burkina Faso',3,'burkina-faso'),
  ('BG','Bulgaria','Bulgarie',7,'bulgaria'),
  ('BH','Bahrain','BahreÃ¯n',2,'bahrain'),
  ('BI','Burundi','Burundi',3,'burundi'),
  ('BJ','Benin','BÃ©nin',3,'benin'),
  ('BL','Saint BarthÃ©lemy','Saint-BarthÃ©lemy',4,'saint-barth-lemy'),
  ('BM','Bermuda','Bermudes',4,'bermuda'),
  ('BN','Brunei Darussalam','Brunei Darussalam',2,'brunei-darussalam'),
  ('BO','Bolivia','Bolivie',5,'bolivia'),
  ('BQ','Caribbean Netherland','Pays-Bas caribÃ©ens',4,'caribbean-netherland'),
  ('BR','Brazil','BrÃ©sil',5,'brazil'),
  ('BS','Bahamas','Bahamas',4,'bahamas'),
  ('BT','Bhutan','Bhoutan',2,'bhutan'),
  ('BV','Bouvet Island','Ã?le Bouvet',6,'bouvet-island'),
  ('BW','Botswana','Botswana',3,'botswana'),
  ('BY','Belarus','BÃ©larus',7,'belarus'),
  ('BZ','Belize','Belize',4,'belize'),
  ('CA','Canada','Canada',4,'canada'),
  ('CC','Cocos (Keeling) Isla','Ã?les Cocos (Keeling)',2,'cocos-keeling-isla'),
  ('CD','Congo, Democratic Re','Congo, RÃ©publique dÃ©mocratique du',6,'congo-democratic-re'),
  ('CF','Central African Repu','RÃ©publique centrafricaine',3,'central-african-repu'),
  ('CG','Congo','Congo',3,'congo'),
  ('CH','Switzerland','Suisse',7,'switzerland'),
  ('CI','Cote D''Invoire','Cote d''Invoire',3,'cote-d-invoire'),
  ('CK','Cook Islands','Ã?les Cook',9,'cook-islands'),
  ('CL','Chile','Chili',5,'chile'),
  ('CM','Cameroon','Cameroun',3,'cameroon'),
  ('CN','China','Chine',2,'china'),
  ('CO','Colombia','Colombie',5,'colombia'),
  ('CR','Costa Rica','Costa Rica',4,'costa-rica'),
  ('CU','Cuba','Cuba',4,'cuba'),
  ('CV','Cape Verde','Cap-Vert',3,'cape-verde'),
  ('CW','CuraÃ§ao','CuraÃ§ao',4,'cura-ao'),
  ('CX','Christmas Island','Ã?le Christmas',2,'christmas-island'),
  ('CY','Cyprus','Chypre',2,'cyprus'),
  ('CZ','Czech Republic','RÃ©publique tchÃ¨que',7,'czech-republic'),
  ('DE','Germany','Allemagne',7,'germany'),
  ('DJ','Djibouti','Djibouti',3,'djibouti'),
  ('DK','Denmark','Danemark',7,'denmark'),
  ('DM','Dominica','Dominique',4,'dominica'),
  ('DO','Dominican Republic','RÃ©publique dominicaine',4,'dominican-republic'),
  ('DZ','Algeria','AlgÃ©rie',3,'algeria'),
  ('EC','Ecuador','Ã?quateur',5,'ecuador'),
  ('EE','Estonia','Estonie',7,'estonia'),
  ('EG','Egypt','Ã?gypte',3,'egypt'),
  ('EH','Western Sahara','Sahara Occidental',3,'western-sahara'),
  ('ER','Eritrea','Ã?rythrÃ©e',3,'eritrea'),
  ('ES','Spain','Espagne',7,'spain'),
  ('ET','Ethiopia','Ã?thiopie',3,'ethiopia'),
  ('FI','Finland','Finlande',7,'finland'),
  ('FJ','Fiji','Fidji',9,'fiji'),
  ('FK','Falkland Islands','Ã?les Malouines',5,'falkland-islands'),
  ('FM','Micronesia, Federate','MicronÃ©sie, Ã?tats fÃ©dÃ©rÃ©s de',6,'micronesia-federate'),
  ('FO','Faroe Islands','Ã?les FÃ©roÃ©',7,'faroe-islands'),
  ('FR','France','France',7,'france'),
  ('GA','Gabon','Gabon',3,'gabon'),
  ('GB','United Kingdom','Royaume-Uni',7,'united-kingdom'),
  ('GD','Grenada','Grenade',4,'grenada'),
  ('GE','Georgia','GÃ©orgie',2,'georgia'),
  ('GF','French Guiana','Guyane franÃ§aise',3,'french-guiana'),
  ('GG','Guernsey','Guernesey',7,'guernsey'),
  ('GH','Ghana','Ghana',3,'ghana'),
  ('GI','Gibraltar','Gibraltar',7,'gibraltar'),
  ('GL','Greenland','Groenland',4,'greenland'),
  ('GM','Gambia','Gambie',7,'gambia'),
  ('GN','Guinea','GuinÃ©e',3,'guinea'),
  ('GP','Guadeloupe','Guadeloupe',4,'guadeloupe'),
  ('GQ','Equatorial Guinea','GuinÃ©e Ã©quatoriale',3,'equatorial-guinea'),
  ('GR','Greece','GrÃ¨ce',7,'greece'),
  ('GS','South Georgia and th','GÃ©orgie du Sud et les Ã®les Sandwich du Sud',6,'south-georgia-and-th'),
  ('GT','Guatemala','Guatemala',4,'guatemala'),
  ('GU','Guam','Guam',9,'guam'),
  ('GW','Guinea-Bissau','GuinÃ©e-Bissau',3,'guinea-bissau'),
  ('GY','Guyana','Guyana',5,'guyana'),
  ('HK','Hong Kong','Hong Kong',2,'hong-kong'),
  ('HM','Heard and McDonald I','Ã?les Heard et McDonald',6,'heard-and-mcdonald-i'),
  ('HN','Honduras','Honduras',4,'honduras'),
  ('HR','Croatia','Croatie',7,'croatia'),
  ('HT','Haiti','HaÃ¯ti',4,'haiti'),
  ('HU','Hungary','Hongrie',7,'hungary'),
  ('ID','Indonesia','IndonÃ©sie',2,'indonesia'),
  ('IE','Ireland','Irlande',7,'ireland'),
  ('IL','Israel','IsraÃ«l',2,'israel'),
  ('IM','Isle of Man','Ã?le de Man',7,'isle-of-man'),
  ('IN','India','Inde',2,'india'),
  ('IO','British Indian Ocean','Territoire britannique de l''ocÃ©an Indien',2,'british-indian-ocean'),
  ('IQ','Iraq','Irak',2,'iraq'),
  ('IR','Iran','Iran',2,'iran'),
  ('IS','Iceland','Islande',7,'iceland'),
  ('IT','Italy','Italie',7,'italy'),
  ('JE','Jersey','Jersey',7,'jersey'),
  ('JM','Jamaica','JamaÃ¯que',4,'jamaica'),
  ('JO','Jordan','Jordanie',2,'jordan'),
  ('JP','Japan','Japon',2,'japan'),
  ('KE','Kenya','Kenya',3,'kenya'),
  ('KG','Kyrgyzstan','Kirghizistan',2,'kyrgyzstan'),
  ('KH','Cambodia','Cambodge',2,'cambodia'),
  ('KI','Kiribati','Kiribati',9,'kiribati'),
  ('KM','Comoros','Comores',3,'comoros'),
  ('KN','Saint Kitts and Nevi','Saint-Kitts-et-Nevis',4,'saint-kitts-and-nevi'),
  ('KP','North Korea','CorÃ©e du Nord',2,'north-korea'),
  ('KR','South Korea','CorÃ©e du Sud',2,'south-korea'),
  ('KW','Kuwait','KoweÃ¯t',2,'kuwait'),
  ('KY','Cayman Islands','Ã?les CaÃ¯mans',4,'cayman-islands'),
  ('KZ','Kazakhstan','Kazakhstan',2,'kazakhstan'),
  ('LA','Lao People''s Democra','Laos',2,'lao-people-s-democra'),
  ('LB','Lebanon','Liban',2,'lebanon'),
  ('LC','Saint Lucia','Sainte-Lucie',4,'saint-lucia'),
  ('LI','Liechtenstein','Liechtenstein',7,'liechtenstein'),
  ('LK','Sri Lanka','Sri Lanka',2,'sri-lanka'),
  ('LR','Liberia','LibÃ©ria',3,'liberia'),
  ('LS','Lesotho','Lesotho',3,'lesotho'),
  ('LT','Lithuania','Lituanie',7,'lithuania'),
  ('LU','Luxembourg','Luxembourg',7,'luxembourg'),
  ('LV','Latvia','Lettonie',7,'latvia'),
  ('LY','Libya','Libye',7,'libya'),
  ('MA','Morocco','Maroc',3,'morocco'),
  ('MC','Monaco','Monaco',7,'monaco'),
  ('MD','Moldova','Moldavie',7,'moldova'),
  ('ME','Montenegro','MontÃ©nÃ©gro',7,'montenegro'),
  ('MF','Saint-Martin (France','Saint-Martin (France)',4,'saint-martin-france'),
  ('MG','Madagascar','Madagascar',3,'madagascar'),
  ('MH','Marshall Islands','Ã?les Marshall',9,'marshall-islands'),
  ('MK','Macedonia','MacÃ©doine',7,'macedonia'),
  ('ML','Mali','Mali',3,'mali'),
  ('MM','Myanmar','Myanmar',2,'myanmar'),
  ('MN','Mongolia','Mongolie',2,'mongolia'),
  ('MO','Macau','Macao',2,'macau'),
  ('MP','Northern Mariana Isl','Mariannes du Nord',9,'northern-mariana-isl'),
  ('MQ','Martinique','Martinique',4,'martinique'),
  ('MR','Mauritania','Mauritanie',3,'mauritania'),
  ('MS','Montserrat','Montserrat',4,'montserrat'),
  ('MT','Malta','Malte',7,'malta'),
  ('MU','Mauritius','Maurice',3,'mauritius'),
  ('MV','Maldives','Maldives',2,'maldives'),
  ('MW','Malawi','Malawi',3,'malawi'),
  ('MX','Mexico','Mexique',4,'mexico'),
  ('MY','Malaysia','Malaisie',2,'malaysia'),
  ('MZ','Mozambique','Mozambique',3,'mozambique'),
  ('NA','Namibia','Namibie',3,'namibia'),
  ('NC','New Caledonia','Nouvelle-CalÃ©donie',9,'new-caledonia'),
  ('NE','Niger','Niger',3,'niger'),
  ('NF','Norfolk Island','Ã?le Norfolk',9,'norfolk-island'),
  ('NG','Nigeria','Nigeria',3,'nigeria'),
  ('NI','Nicaragua','Nicaragua',4,'nicaragua'),
  ('NL','The Netherlands','Pays-Bas',7,'the-netherlands'),
  ('NO','Norway','NorvÃ¨ge',7,'norway'),
  ('NP','Nepal','NÃ©pal',2,'nepal'),
  ('NR','Nauru','Nauru',9,'nauru'),
  ('NU','Niue','Niue',9,'niue'),
  ('NZ','New Zealand','Nouvelle-ZÃ©lande',9,'new-zealand'),
  ('OM','Oman','Oman',2,'oman'),
  ('PA','Panama','Panama',4,'panama'),
  ('PE','Peru','PÃ©rou',5,'peru'),
  ('PF','French Polynesia','PolynÃ©sie franÃ§aise',9,'french-polynesia'),
  ('PG','Papua New Guinea','Papouasie-Nouvelle-GuinÃ©e',9,'papua-new-guinea'),
  ('PH','Philippines','Philippines',2,'philippines'),
  ('PK','Pakistan','Pakistan',2,'pakistan'),
  ('PL','Poland','Pologne',7,'poland'),
  ('PM','St. Pierre and Mique','Saint-Pierre-et-Miquelon',4,'st.-pierre-and-mique'),
  ('PN','Pitcairn','Pitcairn',9,'pitcairn'),
  ('PR','Puerto Rico','Puerto Rico',4,'puerto-rico'),
  ('PS','Palestinian Territor','Territoires palestiniens',6,'palestinian-territor'),
  ('PT','Portugal','Portugal',7,'portugal'),
  ('PW','Palau','Palau',9,'palau'),
  ('PY','Paraguay','Paraguay',5,'paraguay'),
  ('QA','Qatar','Qatar',2,'qatar'),
  ('RE','Reunion','RÃ©union',3,'reunion'),
  ('RO','Romania','Roumanie',7,'romania'),
  ('RS','Serbia','Serbie',7,'serbia'),
  ('RU','Russian Federation','Russie',7,'russian-federation'),
  ('RW','Rwanda','Rwanda',3,'rwanda'),
  ('SA','Saudi Arabia','Arabie saoudite',2,'saudi-arabia'),
  ('SB','Solomon Islands','Ã?les Salomon',9,'solomon-islands'),
  ('SC','Seychelles','Seychelles',2,'seychelles'),
  ('SD','Sudan','Soudan',3,'sudan'),
  ('SE','Sweden','SuÃ¨de',7,'sweden'),
  ('SG','Singapore','Singapour',2,'singapore'),
  ('SH','Saint Helena','Sainte-HÃ©lÃ¨ne',3,'saint-helena'),
  ('SI','Slovenia','SlovÃ©nie',7,'slovenia'),
  ('SJ','Svalbard and Jan May','Svalbard et Ã®le de Jan Mayen',7,'svalbard-and-jan-may'),
  ('SK','Slovakia (Slovak Rep','Slovaquie (RÃ©publique slovaque)',7,'slovakia-slovak-rep'),
  ('SL','Sierra Leone','Sierra Leone',3,'sierra-leone'),
  ('SM','San Marino','Saint-Marin',7,'san-marino'),
  ('SN','Senegal','SÃ©nÃ©gal',3,'senegal'),
  ('SO','Somalia','Somalie',3,'somalia'),
  ('SR','Suriname','Suriname',5,'suriname'),
  ('SS','South Sudan','Soudan du Sud',3,'south-sudan'),
  ('ST','Sao Tome and Princip','Sao TomÃ©-et-Principe',3,'sao-tome-and-princip'),
  ('SV','El Salvador','El Salvador',4,'el-salvador'),
  ('SX','Saint-Martin (Pays-B','Sint Maarten ',4,'saint-martin-pays-b'),
  ('SY','Syria','Syrie',2,'syria'),
  ('SZ','Swaziland','Swaziland',3,'swaziland'),
  ('TC','Turks and Caicos Isl','Ã?les Turks et Caicos',4,'turks-and-caicos-isl'),
  ('TD','Chad','Tchad',3,'chad'),
  ('TF','French Southern Terr','Terres australes franÃ§aises',6,'french-southern-terr'),
  ('TG','Togo','Togo',3,'togo'),
  ('TH','Thailand','ThaÃ¯lande',2,'thailand'),
  ('TJ','Tajikistan','Tadjikistan',2,'tajikistan'),
  ('TK','Tokelau','Tokelau',9,'tokelau'),
  ('TL','Timor-Leste','Timor-Leste',2,'timor-leste'),
  ('TM','Turkmenistan','TurkmÃ©nistan',2,'turkmenistan'),
  ('TN','Tunisia','Tunisie',3,'tunisia'),
  ('TO','Tonga','Tonga',9,'tonga'),
  ('TR','Turkey','Turquie',2,'turkey'),
  ('TT','Trinidad and Tobago','TrinitÃ©-et-Tobago',4,'trinidad-and-tobago'),
  ('TV','Tuvalu','Tuvalu',9,'tuvalu'),
  ('TW','Taiwan','TaÃ¯wan',2,'taiwan'),
  ('TZ','Tanzania','Tanzanie',3,'tanzania'),
  ('UA','Ukraine','Ukraine',7,'ukraine'),
  ('UG','Uganda','Ouganda',3,'uganda'),
  ('UM','United States Minor ','Ã?les mineures Ã©loignÃ©es des Ã?tats-Unis',4,'united-states-minor-'),
  ('US','United States','Ã?tats-Unis',4,'united-states'),
  ('UY','Uruguay','Uruguay',5,'uruguay'),
  ('UZ','Uzbekistan','OuzbÃ©kistan',2,'uzbekistan'),
  ('VA','Vatican','Vatican',7,'vatican'),
  ('VC','Saint Vincent and th','Saint-Vincent-et-les-Grenadines',4,'saint-vincent-and-th'),
  ('VE','Venezuela','Venezuela',5,'venezuela'),
  ('VG','Virgin Islands (Brit','Ã?les Vierges britanniques',4,'virgin-islands-brit'),
  ('VI','Virgin Islands (U.S.','Ã?les Vierges amÃ©ricaines',4,'virgin-islands-u.s.'),
  ('VN','Vietnam','Vietnam',2,'vietnam'),
  ('VU','Vanuatu','Vanuatu',4,'vanuatu'),
  ('WF','Wallis and Futuna Is','Ã?les Wallis-et-Futuna',9,'wallis-and-futuna-is'),
  ('WS','Samoa','Samoa',4,'samoa'),
  ('YE','Yemen','YÃ©men',2,'yemen'),
  ('YT','Mayotte','Mayotte',3,'mayotte'),
  ('ZA','South Africa','Afrique du Sud',3,'south-africa'),
  ('ZM','Zambia','Zambie',3,'zambia'),
  ('ZW','Zimbabwe','Zimbabwe',3,'zimbabwe');
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
# Data for the `partners` table  (LIMIT 0,500)
#

INSERT INTO `partners` (`id`, `user`, `region`) VALUES 
  (6,2,3),
  (7,7,1),
  (8,7,3);
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
  (3,'sddsds','sdsds',NULL,'zashsdsar@email.com',NULL,NULL,NULL,'','','d7b1c8de8e52d130f701773036aa8725',0,0,'','user',0),
  (4,'sdsd','','','zashar@emadsdsil.com','sfsfs','AF',NULL,'1','af15d5fdacd5fdfea300e88a8e253e82','a0c3be48fc1c76ec9885afbaf25df6fb',NULL,3,'a:3:{i:0;s:56:\"I am a wine tourist/interested in wine/planning to visit\";i:1;s:86:\"Wine tourism professional e.g. wine tour operator, tourism office, government official\";i:2;s:13:\"Wine Retailer\";}','user',0),
  (5,'dsds','dsd',NULL,'zahads@lodoss.org',NULL,NULL,NULL,'','','e5bab7eae2db888b5edf42598469950d',0,0,'','user',0),
  (6,'fdsfsd','fsdf',NULL,'fsdfsd@fi.com',NULL,NULL,NULL,'','','21d499d58b3c3caca5bea322c6aecc5e',1,0,'','user',0),
  (7,'dsfsdfsd','fdasdf',NULL,'admin@mail.ru',NULL,NULL,NULL,'','','4af8a08f09216bf3bf3fb291505d4464',1,0,'','user',0);
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
  (3,12,10),
  (4,17,11),
  (28,17,10);
COMMIT;

#
# Data for the `vineyards` table  (LIMIT 0,500)
#

INSERT INTO `vineyards` (`id`, `name`, `nameloc`, `address1`, `address2`, `city`, `zip`, `country`, `continent`, `telephone`, `fax`, `email`, `web`, `loc_y`, `region`, `logo`, `proprietor`, `visits`, `individuals`, `groups`, `appointment`, `restaurant`, `accommodation`, `weddings`, `seminars`, `status`, `loc_z`, `ass_region`, `alias`, `update`, `tasting`, `tour`, `sales`, `workshops`, `user`, `notes_chang`, `claim`, `owner`) VALUES 
  (13,'Paul Joseph Vineyard','','','',11,'','FR',7,'2222222','','','','44.82610211080619','','1335266476_electric_poster.jpg','',0,0,0,0,0,0,0,0,0,'-0.6135122753905762',1,'paul_joseph_vineyard','2012-04-15 21:45:55',0,1,1,0,1,'jhgjghjg',1,NULL),
  (14,'Vineyard Test','','','',12,'','FR',7,'333333','','','','47.989877440474444','','1335272485_ultra.jpg','',0,0,0,0,0,0,0,0,1,'0.2686903222656838',1,'vineyard_test','2012-06-18 22:40:44',1,2,1,1,1,'ferftfrty',0,NULL),
  (17,'Vineyard Test6','bjjbn','nknknk','nklnlnln',17,'455454','FR',7,'23232323','23232323','test@test.com','http://www.wine.com','44.929017994472666','sdsd','1335608549electric-logo.jpg','scsc',0,0,0,0,1,0,1,0,1,'-0.5408136822509277',1,'vineyard-test6','2012-06-18 22:40:22',2,1,0,1,1,'fefef',0,NULL);
COMMIT;

#
# Data for the `wines` table  (LIMIT 0,500)
#

INSERT INTO `wines` (`id`, `name`, `grapes`, `vintage`, `update`, `type`, `notes`, `image`, `alias`) VALUES 
  (10,'asdas','a:2:{i:0;s:2:\"27\";i:1;s:1:\"3\";}','1954','0000-00-00 00:00:00','','asdasdas','1335967926_sample-thumb3.jpg','asdas'),
  (11,'fdfdf','a:2:{i:0;s:2:\"27\";i:1;s:1:\"3\";}','1988','0000-00-00 00:00:00',NULL,NULL,NULL,NULL);
COMMIT;



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;