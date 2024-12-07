-- MySQL dump 10.13  Distrib 8.0.40, for Linux (x86_64)
--
-- Host: localhost    Database: PitctokMarket
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ListNavigationMenu`
--

DROP TABLE IF EXISTS `ListNavigationMenu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ListNavigationMenu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) DEFAULT NULL,
  `Link` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListNavigationMenu`
--

LOCK TABLES `ListNavigationMenu` WRITE;
/*!40000 ALTER TABLE `ListNavigationMenu` DISABLE KEYS */;
INSERT INTO `ListNavigationMenu` VALUES (1,'Вся продукция','All'),(2,'Новые поступления','NovyePostupleniya'),(3,'Столовые группы','StolovyeGruppy'),(4,'Стулья','Chairs'),(5,'Столы','Tables'),(6,'Комнаты','Rooms'),(8,'Буфеты','Bufety'),(9,'Консоли','Konsoli'),(10,'Комоды','Komody'),(11,'Витрины','Vitriny'),(12,'Прихожие','Prihozhie'),(13,'Тумбы','Tumby');
/*!40000 ALTER TABLE `ListNavigationMenu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `NewsInform`
--

DROP TABLE IF EXISTS `NewsInform`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `NewsInform` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `description` varchar(999) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `NewsInform`
--

LOCK TABLES `NewsInform` WRITE;
/*!40000 ALTER TABLE `NewsInform` DISABLE KEYS */;
INSERT INTO `NewsInform` VALUES (2,'Заголовок для последней новости и еще что то','2024-11-10','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et tincidunt dolor. Ut sit amet vulputate neque, nec pharetra ex. Praesent sit amet felis velit. Aliquam erat volutpat. Donec vel velit eu eros viverra aliquam. Cras ut faucibus lectus. Ut lectus turpis, dictum in egestas nec, tristique nec arcu. Proin at arcu sed velit blandit ultrices. Proin ultricies mi at metus porta, id lacinia mi imperdiet. Donec nec dignissim neque, interdum dignissim mauris. In aliquet, lorem vitae dignissim elementum, tellus neque semper velit, in vulputate sem augue vitae tortor. In nunc neque, imperdiet pretium consectetur ac, pretium nec magna'),(3,'Заголовок ','2024-10-23','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et tincidunt dolor. Ut sit amet vulputate neque, nec pharetra ex. Praesent sit amet felis velit. Aliquam erat volutpat. Donec vel velit eu eros viverra aliquam. Cras ut faucibus lectus. Ut lectus turpis, dictum in egestas nec, tristique nec arcu. Proin at arcu sed velit blandit ultrices. Proin ultricies mi at metus porta, id lacinia mi imperdiet. Donec nec dignissim neque, interdum dignissim mauris. In aliquet, lorem vitae dignissim elementum, tellus neque semper velit, in vulputate sem augue vitae tortor. In nunc neque, imperdiet pretium consectetur ac, pretium nec magna'),(4,'Просто новости о чем то','2024-08-03','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et tincidunt dolor. Ut sit amet vulputate neque, nec pharetra ex. Praesent sit amet felis velit. Aliquam erat volutpat. Donec vel velit eu eros viverra aliquam. Cras ut faucibus lectus. Ut lectus turpis, dictum in egestas nec, tristique nec arcu. Proin at arcu sed velit blandit ultrices. Proin ultricies mi at metus porta, id lacinia mi imperdiet. Donec nec dignissim neque, interdum dignissim mauris. In aliquet, lorem vitae dignissim elementum, tellus neque semper velit, in vulputate sem augue vitae tortor. In nunc neque, imperdiet pretium consectetur ac, pretium nec magna'),(14,'Новая статья для проверки','2024-12-04','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et tincidunt dolor. Ut sit amet vulputate neque, nec pharetra ex. Praesent sit amet felis velit. Aliquam erat volutpat. Donec vel velit eu eros viverra aliquam. Cras ut faucibus lectus. Ut lectus turpis, dictum in egestas nec, tristique nec arcu. Proin at arcu sed velit blandit ultrices. Proin ultricies mi at metus porta, id lacinia mi imperdiet. Donec nec dignissim neque, dgsff hgf dfh  sdfsdfsdghjghjkhj');
/*!40000 ALTER TABLE `NewsInform` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrderUsers`
--

DROP TABLE IF EXISTS `OrderUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OrderUsers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `img` varchar(45) DEFAULT NULL,
  `title` varchar(45) DEFAULT NULL,
  `article` varchar(45) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  `Delivery` tinyint DEFAULT NULL,
  `Pickup` tinyint DEFAULT NULL,
  `Address` varchar(500) DEFAULT NULL,
  `idPostal` varchar(10) DEFAULT NULL,
  `Status` varchar(45) DEFAULT NULL,
  `PaymentStatus` tinyint DEFAULT NULL,
  `idUser` int DEFAULT NULL,
  `totalAmount` int DEFAULT NULL,
  `DateOrder` varchar(45) DEFAULT NULL,
  `Cancel` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_OrderUsers_1_idx` (`idUser`),
  CONSTRAINT `fk_OrderUsers_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderUsers`
--

LOCK TABLES `OrderUsers` WRITE;
/*!40000 ALTER TABLE `OrderUsers` DISABLE KEYS */;
INSERT INTO `OrderUsers` VALUES (12,'photo_2024-09-19_13-02-05.jpg','Комплект антикварных стульев','KL1265',2,39570,0,1,'','','Согласовано',0,5,89999,'2024.12.1',1),(13,'photo_2024-09-19_13-02-05.jpg','Комплект антикварных стульев','KL1265',1,39570,1,0,'г. Калининград ул. Судостроительная, д.163А кв. 103','390011','У менеджера в работе',0,5,NULL,'2024.12.1',NULL),(14,'photo_2024-09-19_13-02-05.jpg','Комплект антикварных стульев','KL1265',3,39570,0,1,'','','У менеджера в работе',0,5,NULL,'2024.12.6',NULL);
/*!40000 ALTER TABLE `OrderUsers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Production`
--

DROP TABLE IF EXISTS `Production`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Production` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `article` varchar(45) DEFAULT NULL,
  `materials` varchar(25) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `description` varchar(700) DEFAULT NULL COMMENT '\n',
  `price` int DEFAULT NULL,
  `newStatus` int DEFAULT NULL,
  `idNavMenu` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Production_1_idx` (`idNavMenu`),
  CONSTRAINT `fk_Production_1` FOREIGN KEY (`idNavMenu`) REFERENCES `ListNavigationMenu` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Production`
--

LOCK TABLES `Production` WRITE;
/*!40000 ALTER TABLE `Production` DISABLE KEYS */;
INSERT INTO `Production` VALUES (1,'Комплект антикварных стульев','KL1265','Дуб',4,'photo_2024-09-19_13-02-05.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec massa a orci dignissim consectetur ac finibus nisl. Nullam tincidunt nisi vitae varius malesuada. Cras sit amet varius elit. Proin ullamcorper vulputate urna et lacinia. Fusce varius lacus ac eros iaculis gravida. Nullam lectus tellus, laoreet quis venenatis in, aliquet eget tellus. Aenean tempus accumsan odio. Duis sed ipsum iaculis, consequat elit eu, gravida ex. Proin elementum nulla eu arcu tincidunt, nec placerat mi porta. In eget metus a eros cursus pulvinar id in dolor. ',39570,1,4),(2,'Комплект антикварных стульев','KL1265','Дуб',8,'photo_2024-09-19_13-02-05.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec massa a orci dignissim consectetur ac finibus nisl. Nullam tincidunt nisi vitae varius malesuada. Cras sit amet varius elit. Proin ullamcorper vulputate urna et lacinia. Fusce varius lacus ac eros iaculis gravida. Nullam lectus tellus, laoreet quis venenatis in, aliquet eget tellus. Aenean tempus accumsan odio. Duis sed ipsum iaculis, consequat elit eu, gravida ex. Proin elementum nulla eu arcu tincidunt, nec placerat mi porta. In eget metus a eros cursus pulvinar id in dolor. ',39570,0,4),(3,'Новая продукция','а34ас5еп434','луб',5,'IMG_6218.jpeg','gsdakfg kjasgf dasgf jasgfkj kjhfg kjsgfsgafg fasf gaskjhg fhgdshj fvjksdfgk fgldsafg kasgf ksadghf kdsgh fksdf ggf kjhdwsagf gasdkgf afgksdgf kd fksdgkjagdfjkhsd gfksdgfk sadgfhgjkahsdgfsdgfkskhjdg kjhasfkjhasdg fasg fkhjgdфыпвлрп ыва фыв аыфп ааыфва ап ывапа ыавп ав ',546456,0,3);
/*!40000 ALTER TABLE `Production` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserFavoritesProduct`
--

DROP TABLE IF EXISTS `UserFavoritesProduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserFavoritesProduct` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `article` varchar(45) DEFAULT NULL,
  `materials` varchar(25) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `description` varchar(700) DEFAULT NULL COMMENT '\\n',
  `price` int DEFAULT NULL,
  `newStatus` int DEFAULT NULL,
  `idNavMenu` int DEFAULT NULL,
  `idUser` int DEFAULT NULL,
  `idProd` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_UserFavoritsProduct_1_idx` (`idNavMenu`),
  KEY `fk_UserFavoritsProduct_2_idx` (`idUser`),
  CONSTRAINT `fk_UserFavoritsProduct_1` FOREIGN KEY (`idNavMenu`) REFERENCES `ListNavigationMenu` (`id`),
  CONSTRAINT `fk_UserFavoritsProduct_2` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=589 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserFavoritesProduct`
--

LOCK TABLES `UserFavoritesProduct` WRITE;
/*!40000 ALTER TABLE `UserFavoritesProduct` DISABLE KEYS */;
INSERT INTO `UserFavoritesProduct` VALUES (586,'Комплект антикварных стульев','KL1265','Дуб',6,'photo_2024-09-19_13-02-05.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec massa a orci dignissim consectetur ac finibus nisl. Nullam tincidunt nisi vitae varius malesuada. Cras sit amet varius elit. Proin ullamcorper vulputate urna et lacinia. Fusce varius lacus ac eros iaculis gravida. Nullam lectus tellus, laoreet quis venenatis in, aliquet eget tellus. Aenean tempus accumsan odio. Duis sed ipsum iaculis, consequat elit eu, gravida ex. Proin elementum nulla eu arcu tincidunt, nec placerat mi porta. In eget metus a eros cursus pulvinar id in dolor. ',39570,1,4,6,'1'),(587,'Комплект антикварных стульев','KL1265','Дуб',6,'photo_2024-09-19_13-02-05.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec massa a orci dignissim consectetur ac finibus nisl. Nullam tincidunt nisi vitae varius malesuada. Cras sit amet varius elit. Proin ullamcorper vulputate urna et lacinia. Fusce varius lacus ac eros iaculis gravida. Nullam lectus tellus, laoreet quis venenatis in, aliquet eget tellus. Aenean tempus accumsan odio. Duis sed ipsum iaculis, consequat elit eu, gravida ex. Proin elementum nulla eu arcu tincidunt, nec placerat mi porta. In eget metus a eros cursus pulvinar id in dolor. ',39570,1,4,5,'1');
/*!40000 ALTER TABLE `UserFavoritesProduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `galleryProduct`
--

DROP TABLE IF EXISTS `galleryProduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `galleryProduct` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Link` varchar(255) DEFAULT NULL,
  `idProduction` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_galleryProduct_1_idx` (`idProduction`),
  CONSTRAINT `fk_galleryProduct_1` FOREIGN KEY (`idProduction`) REFERENCES `Production` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `galleryProduct`
--

LOCK TABLES `galleryProduct` WRITE;
/*!40000 ALTER TABLE `galleryProduct` DISABLE KEYS */;
INSERT INTO `galleryProduct` VALUES (1,'photo_2024-09-19_13-02-07.jpg',1),(2,'photo_2024-09-19_14-58-08.jpg',1),(3,'photo_2024-09-19_15-06-34.jpg',1),(7,'photo_2024-09-27_12-03-27.jpg',3),(8,'IMG_6217.jpeg',3),(9,'photo_2024-09-20_14-19-40.jpg',3);
/*!40000 ALTER TABLE `galleryProduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(45) DEFAULT NULL,
  `LastName` varchar(45) DEFAULT NULL,
  `Phone` varchar(45) DEFAULT NULL,
  `Email` varchar(45) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `DateRegist` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,'Администратор','Администратор','+7(000)000-00-00',NULL,'$2b$10$XcJr9ZW3mWWIlVchvV.KDeHkEZ8iIfkfhR3.vFWKWm.OFFpRzDaqC',NULL),(5,'Илья','Непряхин','+7(999)100-70-80','ilya.2787@gmail.com','$2b$10$ntCypOKbEDgbXwMZuNTi2./QWTFGK.cuyTf.g0QmiKCKbNbH4J.O.','2024-10-15'),(6,'Иван','Иванович','+7(999)999-99-99','Ivan@mail.ru','$2b$10$Nga2WKc89Pcd6E/M9yf2Luan9MUCitUVDYPAhsPaWFLFz5wjODwai','2024-12-01');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-07  2:59:25
