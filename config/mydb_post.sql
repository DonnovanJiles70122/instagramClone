-- MySQL dump 10.13  Distrib 8.0.23, for macos10.15 (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.25

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
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `description` varchar(4096) NOT NULL,
  `photopath` varchar(4096) NOT NULL,
  `thumbnail` varchar(4096) NOT NULL,
  `active` int NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  `fk_userid` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `post to users_idx` (`fk_userid`),
  CONSTRAINT `post to users` FOREIGN KEY (`fk_userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (6,'test','test1234','public/images/upload/6fc49c90b4378a55b405d4820c0bf93e465903ecb500.png','public/images/upload/thumbnail-6fc49c90b4378a55b405d4820c0bf93e465903ecb500.png',0,'2021-05-19 15:04:45',10),(7,'onjo','dnkd','public/images/upload/16b0503895d27afbd7d2b2e7072eb43493f5a765b535.png','public/images/upload/thumbnail-16b0503895d27afbd7d2b2e7072eb43493f5a765b535.png',0,'2021-05-19 15:43:15',10),(9,'Kobe','Laker Kobe number 24','public/images/upload/88ad716942f5b2e456474eadb977fbd26af0aaff7307.png','public/images/upload/thumbnail-88ad716942f5b2e456474eadb977fbd26af0aaff7307.png',0,'2021-05-19 17:04:37',10),(10,'San Francisco','Painted Ladies','public/images/upload/50384ba38ee10f301b50a9b330c3895ed8c91e0d8043.png','public/images/upload/thumbnail-50384ba38ee10f301b50a9b330c3895ed8c91e0d8043.png',0,'2021-05-19 17:07:09',10),(11,'Lebron James','Laker Lebron number 23','public/images/upload/1eca8b259b9645f0e0fb650cb7fc3ee900f67bcfd9b1.png','public/images/upload/thumbnail-1eca8b259b9645f0e0fb650cb7fc3ee900f67bcfd9b1.png',0,'2021-05-19 17:14:38',10),(12,'Kanye','Life of Pablo','public/images/upload/20bf18e06e6d1e929290048fb4545ee14699469038f7.png','public/images/upload/thumbnail-20bf18e06e6d1e929290048fb4545ee14699469038f7.png',0,'2021-05-19 17:20:21',10),(13,'Lil Wayne','Rolling Stones','public/images/upload/5d4defd105937d81aa8e06c578b3707dddcbb875d902.png','public/images/upload/thumbnail-5d4defd105937d81aa8e06c578b3707dddcbb875d902.png',0,'2021-05-19 17:21:04',10),(14,'Dream Team','Magic & MJ','public/images/upload/e2dbc61d211c5231df9230f1d7ff96e08719076ca5d2.png','public/images/upload/thumbnail-e2dbc61d211c5231df9230f1d7ff96e08719076ca5d2.png',0,'2021-05-19 17:23:46',10);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-19 20:50:58
