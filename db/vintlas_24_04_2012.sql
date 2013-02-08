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

CREATE DATABASE `vintlas`
    CHARACTER SET 'latin1'
    COLLATE 'latin1_swedish_ci';

USE `vintlas`;

#
# Structure for the `ass_regions` table : 
#

CREATE TABLE `ass_regions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `lang_name` varchar(255) DEFAULT NULL,
  `country` varchar(20) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

#
# Structure for the `cities` table : 
#

CREATE TABLE `cities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `region` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

#
# Structure for the `continents` table : 
#

CREATE TABLE `continents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

#
# Structure for the `countries` table : 
#

CREATE TABLE `countries` (
  `code` char(2) CHARACTER SET latin1 NOT NULL,
  `name_en` tinytext CHARACTER SET latin1,
  `name_fr` tinytext CHARACTER SET latin1,
  `continent` int(11) DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Structure for the `country` table : 
#

CREATE TABLE `country` (
  `id_country` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id_country`)
) ENGINE=InnoDB AUTO_INCREMENT=219 DEFAULT CHARSET=utf8;

#
# Structure for the `grapes` table : 
#

CREATE TABLE `grapes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;

#
# Structure for the `photos` table : 
#

CREATE TABLE `photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

#
# Structure for the `regions` table : 
#

CREATE TABLE `regions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `country` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

#
# Structure for the `seasons` table : 
#

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
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

#
# Structure for the `time_zone` table : 
#

CREATE TABLE `time_zone` (
  `id_zone` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_zone`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

#
# Structure for the `users` table : 
#

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
  `remove` int(11) DEFAULT NULL COMMENT '0-not delete, 1-delete',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 MIN_ROWS=4 MAX_ROWS=13;

#
# Structure for the `vineyard_grapes` table : 
#

CREATE TABLE `vineyard_grapes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vineyard` int(11) DEFAULT NULL,
  `grape` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

#
# Structure for the `vineyard_photos` table : 
#

CREATE TABLE `vineyard_photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vineyard` int(11) DEFAULT NULL,
  `photo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

#
# Structure for the `vineyard_seasons` table : 
#

CREATE TABLE `vineyard_seasons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vineyard` int(11) DEFAULT NULL,
  `season` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

#
# Structure for the `vineyard_wines` table : 
#

CREATE TABLE `vineyard_wines` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vineyard` int(11) DEFAULT NULL,
  `wine` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

#
# Structure for the `vineyards` table : 
#

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
  `status` int(11) DEFAULT NULL,
  `loc_z` varchar(255) DEFAULT NULL,
  `ass_region` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

#
# Structure for the `wines` table : 
#

CREATE TABLE `wines` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

#
# Data for the `ass_regions` table  (LIMIT 0,500)
#

INSERT INTO `ass_regions` (`id`, `name`, `lang_name`, `country`, `description`) VALUES 
  (1,'Champagne','Champagne','FR','The area is best known for the production of the sparkling white wine that bears the region''s name. EU law and the laws of most countries reserve the term \"Champagne\" exclusively for wines that come from this region located about 100 miles (160 km) east o');
COMMIT;

#
# Data for the `cities` table  (LIMIT 0,500)
#

INSERT INTO `cities` (`id`, `name`, `region`) VALUES 
  (1,'Montgomery',1),
  (2,'Mon',1),
  (6,'',3),
  (7,'Ð¡Ð°Ñ€Ð¶Ðµ-Ð»Ðµ-Ð»Ðµ-ÐœÐ°Ð½',0),
  (8,'Ð¡ÐµÐ½-Ð¡Ð°Ñ‚ÑƒÑ€Ð½ÐµÐ½',0),
  (9,'Sen-Pavas',0),
  (10,'ÐœÐ¸Ñ€ÑƒÐ°Ñ€ - Ð‘Ð°Ñ‚Ð¸Ð½ÑŒÐ¾Ð»ÑŒ',0);
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

INSERT INTO `countries` (`code`, `name_en`, `name_fr`, `continent`) VALUES 
  ('AD','Andorra','Andorre',NULL),
  ('AE','United Arab Emirates','Ã?mirats arabes unis',NULL),
  ('AF','Afghanistan','Afghanistan',NULL),
  ('AG','Antigua and Barbuda','Antigua-et-Barbuda',NULL),
  ('AI','Anguilla','Anguilla',NULL),
  ('AL','Albania','Albanie',NULL),
  ('AM','Armenia','ArmÃ©nie',NULL),
  ('AO','Angola','Angola',NULL),
  ('AQ','Antarctica','Antarctique',NULL),
  ('AR','Argentina','Argentine',NULL),
  ('AS','American Samoa','Samoa amÃ©ricaine',NULL),
  ('AT','Austria','Autriche',NULL),
  ('AU','Australia','Australie',NULL),
  ('AW','Aruba','Aruba',NULL),
  ('AX','Aland Islands','Aland Islands',NULL),
  ('AZ','Azerbaijan','AzerbaÃ¯djan',NULL),
  ('BA','Bosnia and Herzegovina','Bosnie-HerzÃ©govine',NULL),
  ('BB','Barbados','Barbade',NULL),
  ('BD','Bangladesh','Bangladesh',NULL),
  ('BE','Belgium','Belgique',NULL),
  ('BF','Burkina Faso','Burkina Faso',NULL),
  ('BG','Bulgaria','Bulgarie',NULL),
  ('BH','Bahrain','BahreÃ¯n',NULL),
  ('BI','Burundi','Burundi',NULL),
  ('BJ','Benin','BÃ©nin',NULL),
  ('BL','Saint BarthÃ©lemy','Saint-BarthÃ©lemy',NULL),
  ('BM','Bermuda','Bermudes',NULL),
  ('BN','Brunei Darussalam','Brunei Darussalam',NULL),
  ('BO','Bolivia','Bolivie',NULL),
  ('BQ','Caribbean Netherlands ','Pays-Bas caribÃ©ens',NULL),
  ('BR','Brazil','BrÃ©sil',NULL),
  ('BS','Bahamas','Bahamas',NULL),
  ('BT','Bhutan','Bhoutan',NULL),
  ('BV','Bouvet Island','Ã?le Bouvet',NULL),
  ('BW','Botswana','Botswana',NULL),
  ('BY','Belarus','BÃ©larus',NULL),
  ('BZ','Belize','Belize',NULL),
  ('CA','Canada','Canada',NULL),
  ('CC','Cocos (Keeling) Islands','Ã?les Cocos (Keeling)',NULL),
  ('CD','Congo, Democratic Republic of','Congo, RÃ©publique dÃ©mocratique du',NULL),
  ('CF','Central African Republic','RÃ©publique centrafricaine',NULL),
  ('CG','Congo','Congo',NULL),
  ('CH','Switzerland','Suisse',NULL),
  ('CI','Cote D''Invoire','Cote d''Invoire',NULL),
  ('CK','Cook Islands','Ã?les Cook',NULL),
  ('CL','Chile','Chili',NULL),
  ('CM','Cameroon','Cameroun',NULL),
  ('CN','China','Chine',NULL),
  ('CO','Colombia','Colombie',NULL),
  ('CR','Costa Rica','Costa Rica',NULL),
  ('CU','Cuba','Cuba',NULL),
  ('CV','Cape Verde','Cap-Vert',NULL),
  ('CW','CuraÃ§ao','CuraÃ§ao',NULL),
  ('CX','Christmas Island','Ã?le Christmas',NULL),
  ('CY','Cyprus','Chypre',NULL),
  ('CZ','Czech Republic','RÃ©publique tchÃ¨que',NULL),
  ('DE','Germany','Allemagne',NULL),
  ('DJ','Djibouti','Djibouti',NULL),
  ('DK','Denmark','Danemark',NULL),
  ('DM','Dominica','Dominique',NULL),
  ('DO','Dominican Republic','RÃ©publique dominicaine',NULL),
  ('DZ','Algeria','AlgÃ©rie',NULL),
  ('EC','Ecuador','Ã?quateur',NULL),
  ('EE','Estonia','Estonie',NULL),
  ('EG','Egypt','Ã?gypte',NULL),
  ('EH','Western Sahara','Sahara Occidental',NULL),
  ('ER','Eritrea','Ã?rythrÃ©e',NULL),
  ('ES','Spain','Espagne',NULL),
  ('ET','Ethiopia','Ã?thiopie',NULL),
  ('FI','Finland','Finlande',NULL),
  ('FJ','Fiji','Fidji',NULL),
  ('FK','Falkland Islands','Ã?les Malouines',NULL),
  ('FM','Micronesia, Federated States of','MicronÃ©sie, Ã?tats fÃ©dÃ©rÃ©s de',NULL),
  ('FO','Faroe Islands','Ã?les FÃ©roÃ©',NULL),
  ('FR','France','France',7),
  ('GA','Gabon','Gabon',NULL),
  ('GB','United Kingdom','Royaume-Uni',NULL),
  ('GD','Grenada','Grenade',NULL),
  ('GE','Georgia','GÃ©orgie',NULL),
  ('GF','French Guiana','Guyane franÃ§aise',NULL),
  ('GG','Guernsey','Guernesey',NULL),
  ('GH','Ghana','Ghana',NULL),
  ('GI','Gibraltar','Gibraltar',NULL),
  ('GL','Greenland','Groenland',NULL),
  ('GM','Gambia','Gambie',NULL),
  ('GN','Guinea','GuinÃ©e',NULL),
  ('GP','Guadeloupe','Guadeloupe',NULL),
  ('GQ','Equatorial Guinea','GuinÃ©e Ã©quatoriale',NULL),
  ('GR','Greece','GrÃ¨ce',NULL),
  ('GS','South Georgia and the South Sandwich Islands','GÃ©orgie du Sud et les Ã®les Sandwich du Sud',NULL),
  ('GT','Guatemala','Guatemala',NULL),
  ('GU','Guam','Guam',NULL),
  ('GW','Guinea-Bissau','GuinÃ©e-Bissau',NULL),
  ('GY','Guyana','Guyana',NULL),
  ('HK','Hong Kong','Hong Kong',NULL),
  ('HM','Heard and McDonald Islands','Ã?les Heard et McDonald',NULL),
  ('HN','Honduras','Honduras',NULL),
  ('HR','Croatia','Croatie',NULL),
  ('HT','Haiti','HaÃ¯ti',NULL),
  ('HU','Hungary','Hongrie',NULL),
  ('ID','Indonesia','IndonÃ©sie',NULL),
  ('IE','Ireland','Irlande',NULL),
  ('IL','Israel','IsraÃ«l',NULL),
  ('IM','Isle of Man','Ã?le de Man',NULL),
  ('IN','India','Inde',NULL),
  ('IO','British Indian Ocean Territory','Territoire britannique de l''ocÃ©an Indien',NULL),
  ('IQ','Iraq','Irak',NULL),
  ('IR','Iran','Iran',NULL),
  ('IS','Iceland','Islande',NULL),
  ('IT','Italy','Italie',NULL),
  ('JE','Jersey','Jersey',NULL),
  ('JM','Jamaica','JamaÃ¯que',NULL),
  ('JO','Jordan','Jordanie',NULL),
  ('JP','Japan','Japon',NULL),
  ('KE','Kenya','Kenya',NULL),
  ('KG','Kyrgyzstan','Kirghizistan',NULL),
  ('KH','Cambodia','Cambodge',NULL),
  ('KI','Kiribati','Kiribati',NULL),
  ('KM','Comoros','Comores',NULL),
  ('KN','Saint Kitts and Nevis','Saint-Kitts-et-Nevis',NULL),
  ('KP','North Korea','CorÃ©e du Nord',NULL),
  ('KR','South Korea','CorÃ©e du Sud',NULL),
  ('KW','Kuwait','KoweÃ¯t',NULL),
  ('KY','Cayman Islands','Ã?les CaÃ¯mans',NULL),
  ('KZ','Kazakhstan','Kazakhstan',NULL),
  ('LA','Lao People''s Democratic Rebublic','Laos',NULL),
  ('LB','Lebanon','Liban',NULL),
  ('LC','Saint Lucia','Sainte-Lucie',NULL),
  ('LI','Liechtenstein','Liechtenstein',NULL),
  ('LK','Sri Lanka','Sri Lanka',NULL),
  ('LR','Liberia','LibÃ©ria',NULL),
  ('LS','Lesotho','Lesotho',NULL),
  ('LT','Lithuania','Lituanie',NULL),
  ('LU','Luxembourg','Luxembourg',NULL),
  ('LV','Latvia','Lettonie',1),
  ('LY','Libya','Libye',NULL),
  ('MA','Morocco','Maroc',NULL),
  ('MC','Monaco','Monaco',NULL),
  ('MD','Moldova','Moldavie',NULL),
  ('ME','Montenegro','MontÃ©nÃ©gro',NULL),
  ('MF','Saint-Martin (France)','Saint-Martin (France)',NULL),
  ('MG','Madagascar','Madagascar',NULL),
  ('MH','Marshall Islands','Ã?les Marshall',NULL),
  ('MK','Macedonia','MacÃ©doine',NULL),
  ('ML','Mali','Mali',NULL),
  ('MM','Myanmar','Myanmar',NULL),
  ('MN','Mongolia','Mongolie',NULL),
  ('MO','Macau','Macao',NULL),
  ('MP','Northern Mariana Islands','Mariannes du Nord',NULL),
  ('MQ','Martinique','Martinique',NULL),
  ('MR','Mauritania','Mauritanie',NULL),
  ('MS','Montserrat','Montserrat',NULL),
  ('MT','Malta','Malte',NULL),
  ('MU','Mauritius','Maurice',NULL),
  ('MV','Maldives','Maldives',NULL),
  ('MW','Malawi','Malawi',NULL),
  ('MX','Mexico','Mexique',NULL),
  ('MY','Malaysia','Malaisie',NULL),
  ('MZ','Mozambique','Mozambique',NULL),
  ('NA','Namibia','Namibie',NULL),
  ('NC','New Caledonia','Nouvelle-CalÃ©donie',NULL),
  ('NE','Niger','Niger',NULL),
  ('NF','Norfolk Island','Ã?le Norfolk',NULL),
  ('NG','Nigeria','Nigeria',NULL),
  ('NI','Nicaragua','Nicaragua',NULL),
  ('NL','The Netherlands','Pays-Bas',NULL),
  ('NO','Norway','NorvÃ¨ge',NULL),
  ('NP','Nepal','NÃ©pal',NULL),
  ('NR','Nauru','Nauru',NULL),
  ('NU','Niue','Niue',NULL),
  ('NZ','New Zealand','Nouvelle-ZÃ©lande',NULL),
  ('OM','Oman','Oman',NULL),
  ('PA','Panama','Panama',NULL),
  ('PE','Peru','PÃ©rou',NULL),
  ('PF','French Polynesia','PolynÃ©sie franÃ§aise',NULL),
  ('PG','Papua New Guinea','Papouasie-Nouvelle-GuinÃ©e',NULL),
  ('PH','Philippines','Philippines',NULL),
  ('PK','Pakistan','Pakistan',NULL),
  ('PL','Poland','Pologne',NULL),
  ('PM','St. Pierre and Miquelon','Saint-Pierre-et-Miquelon',NULL),
  ('PN','Pitcairn','Pitcairn',NULL),
  ('PR','Puerto Rico','Puerto Rico',NULL),
  ('PS','Palestinian Territory, Occupied','Territoires palestiniens',NULL),
  ('PT','Portugal','Portugal',NULL),
  ('PW','Palau','Palau',NULL),
  ('PY','Paraguay','Paraguay',NULL),
  ('QA','Qatar','Qatar',NULL),
  ('RE','Reunion','RÃ©union',NULL),
  ('RO','Romania','Roumanie',NULL),
  ('RS','Serbia','Serbie',NULL),
  ('RU','Russian Federation','Russie',1),
  ('RW','Rwanda','Rwanda',NULL),
  ('SA','Saudi Arabia','Arabie saoudite',NULL),
  ('SB','Solomon Islands','Ã?les Salomon',NULL),
  ('SC','Seychelles','Seychelles',NULL),
  ('SD','Sudan','Soudan',NULL),
  ('SE','Sweden','SuÃ¨de',NULL),
  ('SG','Singapore','Singapour',NULL),
  ('SH','Saint Helena','Sainte-HÃ©lÃ¨ne',NULL),
  ('SI','Slovenia','SlovÃ©nie',NULL),
  ('SJ','Svalbard and Jan Mayen Islands','Svalbard et Ã®le de Jan Mayen',NULL),
  ('SK','Slovakia (Slovak Republic)','Slovaquie (RÃ©publique slovaque)',NULL),
  ('SL','Sierra Leone','Sierra Leone',NULL),
  ('SM','San Marino','Saint-Marin',NULL),
  ('SN','Senegal','SÃ©nÃ©gal',NULL),
  ('SO','Somalia','Somalie',NULL),
  ('SR','Suriname','Suriname',NULL),
  ('SS','South Sudan','Soudan du Sud',NULL),
  ('ST','Sao Tome and Principe','Sao TomÃ©-et-Principe',NULL),
  ('SV','El Salvador','El Salvador',NULL),
  ('SX','Saint-Martin (Pays-Bas)','Sint Maarten ',NULL),
  ('SY','Syria','Syrie',NULL),
  ('SZ','Swaziland','Swaziland',NULL),
  ('TC','Turks and Caicos Islands','Ã?les Turks et Caicos',NULL),
  ('TD','Chad','Tchad',NULL),
  ('TF','French Southern Territories','Terres australes franÃ§aises',NULL),
  ('TG','Togo','Togo',NULL),
  ('TH','Thailand','ThaÃ¯lande',NULL),
  ('TJ','Tajikistan','Tadjikistan',NULL),
  ('TK','Tokelau','Tokelau',NULL),
  ('TL','Timor-Leste','Timor-Leste',NULL),
  ('TM','Turkmenistan','TurkmÃ©nistan',NULL),
  ('TN','Tunisia','Tunisie',NULL),
  ('TO','Tonga','Tonga',NULL),
  ('TR','Turkey','Turquie',NULL),
  ('TT','Trinidad and Tobago','TrinitÃ©-et-Tobago',NULL),
  ('TV','Tuvalu','Tuvalu',NULL),
  ('TW','Taiwan','TaÃ¯wan',NULL),
  ('TZ','Tanzania','Tanzanie',NULL),
  ('UA','Ukraine','Ukraine',NULL),
  ('UG','Uganda','Ouganda',NULL),
  ('UM','United States Minor Outlying Islands','Ã?les mineures Ã©loignÃ©es des Ã?tats-Unis',NULL),
  ('US','United States','Ã?tats-Unis',NULL),
  ('UY','Uruguay','Uruguay',NULL),
  ('UZ','Uzbekistan','OuzbÃ©kistan',NULL),
  ('VA','Vatican','Vatican',NULL),
  ('VC','Saint Vincent and the Grenadines','Saint-Vincent-et-les-Grenadines',NULL),
  ('VE','Venezuela','Venezuela',NULL),
  ('VG','Virgin Islands (British)','Ã?les Vierges britanniques',NULL),
  ('VI','Virgin Islands (U.S.)','Ã?les Vierges amÃ©ricaines',NULL),
  ('VN','Vietnam','Vietnam',NULL),
  ('VU','Vanuatu','Vanuatu',NULL),
  ('WF','Wallis and Futuna Islands','Ã?les Wallis-et-Futuna',NULL),
  ('WS','Samoa','Samoa',NULL),
  ('YE','Yemen','YÃ©men',NULL),
  ('YT','Mayotte','Mayotte',NULL),
  ('ZA','South Africa','Afrique du Sud',NULL),
  ('ZM','Zambia','Zambie',NULL),
  ('ZW','Zimbabwe','Zimbabwe',NULL);
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
# Data for the `regions` table  (LIMIT 0,500)
#

INSERT INTO `regions` (`id`, `name`, `country`) VALUES 
  (1,'AL',153);
COMMIT;

#
# Data for the `seasons` table  (LIMIT 0,500)
#

INSERT INTO `seasons` (`id`, `name`, `date1`, `date2`, `weeks`, `time1`, `time2`, `notes`, `spoken`, `tasting`, `tour`, `sales`, `workshops`) VALUES 
  (19,'season1','02-04-2012','26-04-2012','N;','','','','AF',0,0,0,0);
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
  (1,'Zahar','zahar','Pecherin','zahar@lodoss.org','lodoss','AX','1335272485_ultra.jpg','9','e10adc3949ba59abbe56e057f20f883e','0',1,3,'a:4:{i:0;s:86:\"Wine tourism professional e.g. wine tour operator, tourism office, government official\";i:1;s:28:\"Restaurant employee or owner\";i:2;s:5:\"Other\";s:5:\"other\";s:5:\"rerre\";}','admin',0);
COMMIT;

#
# Data for the `vineyard_grapes` table  (LIMIT 0,500)
#

INSERT INTO `vineyard_grapes` (`id`, `vineyard`, `grape`) VALUES 
  (1,12,1),
  (2,12,2);
COMMIT;

#
# Data for the `vineyard_seasons` table  (LIMIT 0,500)
#

INSERT INTO `vineyard_seasons` (`id`, `vineyard`, `season`) VALUES 
  (19,11,19);
COMMIT;

#
# Data for the `vineyard_wines` table  (LIMIT 0,500)
#

INSERT INTO `vineyard_wines` (`id`, `vineyard`, `wine`) VALUES 
  (3,12,1);
COMMIT;

#
# Data for the `vineyards` table  (LIMIT 0,500)
#

INSERT INTO `vineyards` (`id`, `name`, `nameloc`, `address1`, `address2`, `city`, `zip`, `country`, `continent`, `telephone`, `fax`, `email`, `web`, `loc_y`, `region`, `logo`, `proprietor`, `visits`, `individuals`, `groups`, `appointment`, `restaurant`, `accommodation`, `weddings`, `seminars`, `status`, `loc_z`, `ass_region`) VALUES 
  (11,'Vineyard Test','Vineyard test','bjkbk','ljkljl',9,'77878787','FR',1,'787878','788787','ghgh@jhj.nij','www.wine.com','48.039484509279866','BJbj','1335188233electric-logo.jpg','xsccd',0,0,0,0,0,0,0,0,0,'0.2055189355469338',1),
  (12,'Vineyard Test','Vineyard test','bjkbk','ljkljl',10,'77878787','FR',1,'787878','788787','ghgh@jhj.nij','www.wine.com','47.98757966097599','BJbj',NULL,'xsccd',0,0,0,0,0,0,0,0,0,'0.1979658349609963',1);
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