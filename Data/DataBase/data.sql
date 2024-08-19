-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: restaurent
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `carousel`
--

DROP TABLE IF EXISTS `carousel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carousel` (
  `carousel_id` bigint NOT NULL AUTO_INCREMENT,
  `food_id` bigint DEFAULT NULL,
  PRIMARY KEY (`carousel_id`),
  UNIQUE KEY `UKdkhjljd0bi30uxit6h8m30wcv` (`food_id`),
  CONSTRAINT `FKm0bthrh8k72o5wcecveunm5g6` FOREIGN KEY (`food_id`) REFERENCES `food` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carousel`
--

LOCK TABLES `carousel` WRITE;
/*!40000 ALTER TABLE `carousel` DISABLE KEYS */;
INSERT INTO `carousel` VALUES (26,NULL),(1,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8),(27,25),(28,26);
/*!40000 ALTER TABLE `carousel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carousel_food`
--

DROP TABLE IF EXISTS `carousel_food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carousel_food` (
  `carousel_id` bigint NOT NULL,
  `food_id` bigint NOT NULL,
  KEY `FKt9lv1x20k4a2krlqomk7qm4r1` (`food_id`),
  KEY `FKkgbir8apc95r7dr46t0v7a9w5` (`carousel_id`),
  CONSTRAINT `FKkgbir8apc95r7dr46t0v7a9w5` FOREIGN KEY (`carousel_id`) REFERENCES `carousel` (`carousel_id`),
  CONSTRAINT `FKt9lv1x20k4a2krlqomk7qm4r1` FOREIGN KEY (`food_id`) REFERENCES `food` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carousel_food`
--

LOCK TABLES `carousel_food` WRITE;
/*!40000 ALTER TABLE `carousel_food` DISABLE KEYS */;
INSERT INTO `carousel_food` VALUES (1,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8);
/*!40000 ALTER TABLE `carousel_food` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carousel_images`
--

DROP TABLE IF EXISTS `carousel_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carousel_images` (
  `carousel_id` bigint NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  KEY `FKtaad92ajwmvkym2sv2bqarv4p` (`carousel_id`),
  CONSTRAINT `FKtaad92ajwmvkym2sv2bqarv4p` FOREIGN KEY (`carousel_id`) REFERENCES `carousel` (`carousel_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carousel_images`
--

LOCK TABLES `carousel_images` WRITE;
/*!40000 ALTER TABLE `carousel_images` DISABLE KEYS */;
INSERT INTO `carousel_images` VALUES (1,'Images/Ramen/ramen1.png'),(1,'Images/Ramen/ramen2.png'),(1,'Images/Ramen/ramen3.png'),(2,'Images/Biryani/biryani1.png'),(2,'Images/Biryani/biryani2.png'),(2,'Images/Biryani/biryani3.png'),(3,'Images/Salad/salad1.png'),(3,'Images/Salad/salad2.png'),(3,'Images/Salad/salad3.png'),(4,'Images/Burger/burger1.png'),(4,'Images/Burger/burger2.png'),(4,'Images/Burger/burger3.png'),(5,'Images/pasta/pasta.jpg'),(5,'Images/pasta/pasta1.jpg'),(5,'Images/pasta/pasta2.jpg'),(6,'Images/sushi/sushi.jpg'),(6,'Images/sushi/sushi1.jpg'),(6,'Images/sushi/sushi2.jpg'),(7,'Images/pizza/pizza.jpg'),(7,'Images/pizza/pizza1.jpg'),(7,'Images/pizza/pizza2.jpg'),(8,'Images/taco/taco.jpg'),(8,'Images/taco/taco1.jpg'),(8,'Images/taco/taco2.jpg'),(26,'image1'),(27,'https://i.postimg.cc/htS9dzmn/placeholder.png'),(28,'https://i.postimg.cc/htS9dzmn/placeholder.png');
/*!40000 ALTER TABLE `carousel_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carousel_links`
--

DROP TABLE IF EXISTS `carousel_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carousel_links` (
  `carousel_id` bigint NOT NULL,
  `link` varchar(255) DEFAULT NULL,
  KEY `FK1qqdq113gxbmd1to1ob6w2nqb` (`carousel_id`),
  CONSTRAINT `FK1qqdq113gxbmd1to1ob6w2nqb` FOREIGN KEY (`carousel_id`) REFERENCES `carousel` (`carousel_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carousel_links`
--

LOCK TABLES `carousel_links` WRITE;
/*!40000 ALTER TABLE `carousel_links` DISABLE KEYS */;
INSERT INTO `carousel_links` VALUES (1,'https://i.postimg.cc/ZRSW27CF/ramen1.jpg'),(1,'https://i.postimg.cc/fLfVNcd4/ramen2.jpg'),(1,'https://i.postimg.cc/k58Vj3Xg/ramen3.jpg'),(2,'https://i.postimg.cc/wBsNSRFH/biryani1.jpg'),(2,'https://i.postimg.cc/RZhKLDHW/biryani2.jpg'),(2,'https://i.postimg.cc/Bnc1kVtr/biryani4.jpg'),(3,'https://i.postimg.cc/Prpdbbqt/salad1.jpg'),(3,'https://i.postimg.cc/Xqh4SqsS/salad2.jpg'),(3,'https://i.postimg.cc/HWPp7vdZ/salad3.jpg'),(4,'https://i.postimg.cc/d12y0Mzx/burger1.jpg'),(4,'https://i.postimg.cc/2yCBbcY8/burger2.jpg'),(4,'https://i.postimg.cc/hvMQ9L48/burger3.jpg'),(5,'https://i.postimg.cc/YCvLWL5g/pasta1.jpg'),(5,'https://i.postimg.cc/4NLhyQSs/pasta2.jpg'),(5,'https://i.postimg.cc/YCTGfq7P/pasta.jpg'),(6,'https://i.postimg.cc/qqtHL04m/sushi.jpg'),(6,'https://i.postimg.cc/fLqhmknt/sushi1.jpg'),(6,'https://i.postimg.cc/Bbd97yvJ/sushi2.jpg'),(7,'https://i.postimg.cc/8cbMZ846/pizza.jpg'),(7,'https://i.postimg.cc/d3FGRQ2F/pizza1.jpg'),(7,'https://i.postimg.cc/9MZGqwq1/pizza2.jpg'),(8,'https://i.postimg.cc/T3jMQtvX/taco.jpg'),(8,'https://i.postimg.cc/T3jMQtvX/taco.jpg'),(8,'https://i.postimg.cc/T3jMQtvX/taco.jpg'),(26,'link1'),(27,'https://i.postimg.cc/d0LmKQfK/brownies1.jpg'),(27,'https://i.postimg.cc/htS9dzmn/placeholder.png'),(28,'https://i.postimg.cc/htS9dzmn/placeholder.png');
/*!40000 ALTER TABLE `carousel_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK9emlp6m95v5er2bcqkjsw48he` (`user_id`),
  CONSTRAINT `FKl70asp4l4w0jmbm1tqyofho4o` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,2),(2,3);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `cart_id` bigint NOT NULL,
  `items_id` bigint NOT NULL,
  UNIQUE KEY `UK383kkp3af9dpn91t406oqe9n1` (`items_id`),
  KEY `FK99e0am9jpriwxcm6is7xfedy3` (`cart_id`),
  CONSTRAINT `FK99e0am9jpriwxcm6is7xfedy3` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`),
  CONSTRAINT `FKmyhlt1j507pf1a4miu2c9dp59` FOREIGN KEY (`items_id`) REFERENCES `food` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (1,1),(1,2);
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Fast Food'),(2,'Healthy Food'),(3,'Asian'),(4,'Italian'),(5,'Mexican'),(6,'Sweet');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `food_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKd98d2se7wf5px59h6g1rjf0dq` (`food_id`),
  KEY `FK8kcum44fvpupyw6f5baccx25c` (`user_id`),
  CONSTRAINT `FK8kcum44fvpupyw6f5baccx25c` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKd98d2se7wf5px59h6g1rjf0dq` FOREIGN KEY (`food_id`) REFERENCES `food` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'Absolutely amazing food! The flavors were incredible, and the presentation was top-notch. Highly recommend!',1,2),(2,'Good food with decent portion sizes. The service was a bit slow, but overall a nice experience.',2,2),(3,'Nice place with a cozy atmosphere. The food was tasty, but the menu could use a bit more variety.',3,4),(4,'Junk food at its best! If you\'re looking for a quick and greasy meal, this is the place to go.',4,2),(5,'Good food, but a bit overpriced for what you get. The ingredients were fresh though.',1,4),(7,'Great experience! The staff was friendly, and the food was delicious. Will definitely be back.',2,4),(9,'The food was just okay. Nothing special, but not bad either. Could use more seasoning.',4,4),(10,'Delicious and tasty! Every bite was a delight. The spices were just perfect.',5,2),(11,'Fresh and tasty! You can tell they use high-quality ingredients. Highly recommend the salads.',6,12),(12,'Rich and creamy! The pasta dishes are especially good. Very satisfying meal.',7,4),(13,'Spicy and flavorful! If you love a good kick, this place is for you.',NULL,2),(14,'Delicious and tasty! Every bite was a delight. The spices were just perfect.',1,12),(15,'Fresh and tasty! You can tell they use high-quality ingredients. Highly recommend the salads.',2,12),(16,'Rich and creamy! The pasta dishes are especially good. Very satisfying meal.',3,12),(17,'Spicy and flavorful! If you love a good kick, this place is for you.',4,12),(18,'Delicious and tasty! Every bite was a delight. The spices were just perfect.',5,4),(19,'Fresh and tasty! You can tell they use high-quality ingredients. Highly recommend the salads.',6,2),(20,'Rich and creamy! The pasta dishes are especially good. Very satisfying meal.',7,12),(21,'Spicy and flavorful! If you love a good kick, this place is for you.',NULL,4),(23,'Absolutely loved these brownies! They have that perfect homemade taste, and the texture is just right. Will definitely order again.',25,2),(24,'The best brownies I\'ve ever had! They melt in your mouth and leave you wanting more. Perfect for a sweet treat or dessert.',25,12),(25,'Decadent and delicious! These brownies are a chocolate lover\'s dream come true. The flavor is intense, and they are incredibly satisfying.',25,4);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'Manages employee relations and benefits; responsible for developing HR policies handling employee grievances and overseeing performance management','Human Resources'),(2,'Responsible for creating and implementing promotional activities managing brand image and conducting market research; focuses on advertising campaigns public relations and market analysis to drive business growth','Marketing'),(3,'Provides technical support to staff and manages IT infrastructure; duties include troubleshooting hardware and software issues maintaining network security and ensuring smooth operation of IT systems and equipment','IT Support'),(4,'Handles all aspects of customer service operations including addressing customer inquiries resolving complaints and managing service quality; ensures customer satisfaction and implements service improvement strategies','Service'),(5,'Oversees cleaning and sanitation tasks within the facility; responsible for maintaining cleanliness standards managing cleaning schedules and ensuring the hygiene and safety of all areas','Cleaning'),(6,'Manages food preparation cooking and kitchen operations; duties include menu planning overseeing food quality managing kitchen staff and ensuring compliance with health and safety regulations','Kitchen'),(7,'Manages front desk operations including greeting guests handling check-ins and check-outs and managing phone calls; ensures a welcoming environment and provides information and assistance to visitors and staff','Reception');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `hiring_date` date DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `salary` double NOT NULL,
  `shift` varchar(255) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `department_id` bigint DEFAULT NULL,
  `position_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKbejtwvg9bxus2mffsm3swj3u9` (`department_id`),
  KEY `FKbc8rdko9o9n1ri9bpdyxv3x7i` (`position_id`),
  CONSTRAINT `FKbc8rdko9o9n1ri9bpdyxv3x7i` FOREIGN KEY (`position_id`) REFERENCES `position` (`id`),
  CONSTRAINT `FKbejtwvg9bxus2mffsm3swj3u9` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'2024-07-23','91177 Jonathan Lake Apt. 558, New Hector, SC 63620','Service','jill47@yahoo.com','Female','https://i.postimg.cc/TwqBz6g8/woman.jpg','David Graham','001-289-885-9284x057','Cleaner',60000,'Night',_binary '',4,1),(2,'2021-04-21','9689 Tyler Motorway Apt. 678, Orozcostad, ID 02055','Reception','juan53@yahoo.com','Female','https://i.postimg.cc/90LKfYLJ/woman1.jpg','Courtney Bryant','654-198-7870','Cook',60181.24,'Night',_binary '',7,6),(3,'2020-08-27','9399 Parker Plaza Apt. 437, New Rebecca, UT 20105','Reception','jonathan63@tran.com','Female','https://i.postimg.cc/VkxT56FQ/woman2.jpg','Amber Conway','0941698338','Cleaner',65382.69,'Evening',_binary '',7,2),(4,'2020-12-29','71682 Richard Land Suite 738, South Jamesville, ID 84275','Service','gabriel00@gmail.com','Female','https://i.postimg.cc/cJfz3SDK/woman3.jpg','Phyllis Hanson','010-907-1629','Waiter',42843.1,'Night',_binary '',4,18),(5,'2021-04-18','087 Smith Stravenue Apt. 566, Lisaview, MO 70168','Cleaning','wagnerheather@orr.net','Male','https://i.postimg.cc/x8fBY43X/man.jpg','Kristin Robinson','7199804893','Manager',61210.46,'Night',_binary '',5,12),(6,'2021-02-05','Unit 6463 Box 0541, DPO AE 62441','Kitchen','jamierichards@yahoo.com','Male','https://i.postimg.cc/qBw9Qppy/man1.jpg','Kim Jackson','001-718-487-8116x57609','Cleaner',68678.62,'Night',_binary '',6,3),(7,'2024-07-19','88926 Williams Islands Suite 113, Erikaberg, AL 94994','Reception','thomasmoore@yahoo.com','Female','https://i.postimg.cc/D0wpRb7s/woman4.jpg','Terri Ruiz','685-663-9391','Manager',60452.09,'Morning',_binary '',7,13),(8,'2023-02-14','728 Reyes Burg, Seanfurt, NM 07839','HR','brownjennifer@gould.com','Male','https://i.postimg.cc/vBQ066gj/man10.jpg','Jose Simmons','816.576.7954x6398','Receptionist',61832.5,'Night',_binary '',1,16),(9,'2023-06-11','941 John Route Apt. 150, Elliottton, HI 11394','HR','josemurphy@gilbert.net','Male','https://i.postimg.cc/pXd363d7/man2.jpg','Mr. Gary Wiggins','001-844-251-0415x05447','Cleaner',46406.51,'Night',_binary '',1,4),(10,'2024-05-20','1336 Dylan Springs Suite 746, West Stephenville, AR 39474','HR','lisa01@yahoo.com','Female','https://i.postimg.cc/1X77S5zd/woman5.jpg','Lori Tucker','(215)520-0474x714','Cleaner',59097.67,'Night',_binary '',1,5),(11,'2023-11-30','78112 Mcfarland Motorway Suite 972, New Pamela, KY 19877','Reception','brent45@gmail.com','Female','https://i.postimg.cc/tRBMWDzz/woman6.jpg','Crystal Schmidt','001-338-922-2824x004','Receptionist',68560.93,'Night',_binary '',7,17),(12,'2021-02-17','272 Bell Grove Apt. 258, Ramirezville, AK 36534','Kitchen','watkinsdaniel@zimmerman.com','Male','https://i.postimg.cc/7YQj8XGL/man3.jpg','George Butler','782-180-1022x20157','Waiter',65945.07,'Night',_binary '',6,19),(13,'2019-12-29','446 Angela Alley Apt. 853, Dawsonton, TN 42257','Kitchen','stephanielyons@hotmail.com','Male','https://i.postimg.cc/cLg2sYwB/man4.jpg','Miguel Brown','001-887-894-5458','Manager',44581.39,'Night',_binary '',6,14),(14,'2023-05-29','76266 Gonzalez Crescent, Matthewville, VT 22919','Service','brandon44@mcdowell-palmer.com','Male','https://i.postimg.cc/x1zprQVs/man5.jpg','Karen Thornton','+1-540-943-2448x63437','Cook',30978.55,'Morning',_binary '',4,7),(15,'2020-01-01','85582 Roberts Village Suite 116, Deanchester, TN 68710','HR','escobaramanda@gmail.com','Male','https://i.postimg.cc/9fH8CkWc/man6.jpg','Julie Wright','001-069-665-4832x64253','Cook',68290.29,'Morning',_binary '',1,8),(16,'2021-12-30','7973 Lisa Route, New Suzanne, TN 73152','Service','carolinehamilton@gmail.com','Male','https://i.postimg.cc/bv06JRJk/man7.jpg','Michael Pennington','+1-729-597-1608x2514','Cook',37769.2,'Morning',_binary '',4,9),(17,'2023-11-04','97644 Elizabeth Way, Port Jesse, IL 50581','Cleaning','earl53@parker.com','Male','https://i.postimg.cc/pTx6Y67s/man8.jpg','Laura Anderson','574-767-9843','Cook',35271.1,'Evening',_binary '',5,10),(18,'2024-03-20','39841 Madison Pass Apt. 308, North Robert, MT 12422','Cleaning','qmooney@hotmail.com','Female','https://i.postimg.cc/Kv4sNLqh/woman7.jpg','Mark Figueroa','383.491.2335x466','Waiter',38587.69,'Morning',_binary '',5,20),(19,'2020-02-11','7542 Kendra Place, Janetborough, DE 12074','Reception','kelly74@pham.com','Male','https://i.postimg.cc/SsrtZGbk/man9.jpg','Joshua Duncan','529.482.7753x742','Manager',66769.57,'Morning',_binary '',7,15),(20,'2022-12-02','672 Williams Shore, Lake Charles, NH 55701','Reception','alicia83@torres-bright.com','Female','https://i.postimg.cc/SN51ts32/woman8.jpg','Andrew Mccann','+1-819-605-7263','Cook',61940.5,'Evening',_binary '',7,11);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food`
--

DROP TABLE IF EXISTS `food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` float NOT NULL,
  `rating` float NOT NULL,
  `total_calories` int NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKkomdx99dhk2cveaxugl2lws2u` (`category_id`),
  CONSTRAINT `FKkomdx99dhk2cveaxugl2lws2u` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food`
--

LOCK TABLES `food` WRITE;
/*!40000 ALTER TABLE `food` DISABLE KEYS */;
INSERT INTO `food` VALUES (1,'Ramen is a Japanese noodle soup dish that features Chinese-style wheat noodles served in a meat or fish-based broth. It is often flavored with soy sauce or miso and topped with ingredients like sliced pork, nori, menma, and scallions','Images/ramen.png','Ramen',20,4,350,NULL,3,'https://i.postimg.cc/5NNqxFRR/ramen-nobg.png'),(2,'Biryani is a fragrant and flavorful rice dish made with basmati rice, meat (such as chicken, mutton, or beef), and a blend of spices. Originating from the Indian subcontinent, it is a popular dish known for its rich taste and aroma.','Images/biryani.png','Biryani',25,5,500,NULL,3,'https://i.postimg.cc/FFxV5xDS/biryani-nobg.png'),(3,'Salads are dishes consisting of mixed ingredients such as leafy greens, vegetables, fruits, nuts, and dressings. They are often enjoyed as a healthy and refreshing meal or side dish, offering a variety of flavors and nutrients.','Images/salad.png','Salad',35,3,150,NULL,2,'https://i.postimg.cc/SK8cZLnJ/salad-nobg.png'),(4,'A burger is a sandwich consisting of a cooked patty of ground meat (typically beef) placed inside a sliced bread roll. It is often served with various toppings such as lettuce, tomato, cheese, and condiments like ketchup or mustard.','Images/fast-food.png','Burger',15,2,400,NULL,1,'https://i.postimg.cc/tJW9VTJZ/burger-nobg.png'),(5,'Pasta is an Italian cuisine staple made from durum wheat flour mixed with water or eggs and formed into various shapes. It is typically cooked by boiling and can be served with a variety of sauces, such as tomato, Alfredo, or pesto.','Images/pasta.png','Pasta',22,5,400,NULL,4,'https://i.postimg.cc/qR9kRnJH/pasta-nobg.png'),(6,'Sushi is a traditional Japanese dish consisting of vinegared rice accompanied by various ingredients such as seafood, vegetables, and occasionally tropical fruits. It is often served with soy sauce, wasabi, and pickled ginger.','Images/sushi.png','Sushi',18,5,500,NULL,3,'https://i.postimg.cc/rsg118Kj/sushi-nobg.png'),(7,'Pizza is a popular Italian dish consisting of a round, flat base of leavened wheat-based dough topped with tomatoes, cheese, and various other ingredients. It is baked at a high temperature, traditionally in a wood-fired oven.','Images/pizza.png','Pizza',18,5,420,NULL,4,'https://i.postimg.cc/X76j6w1w/pizza-nobg.png'),(8,'Tacos are a traditional Mexican dish consisting of a small hand-sized corn or wheat tortilla topped with a filling. The tortilla is then folded around the filling and eaten by hand. Common fillings include beef, pork, chicken, seafood, vegetables, and cheese..','Images/taco.png','Tacos',15,4.2,250,NULL,5,'https://i.postimg.cc/2Sg4F98s/tacos-nobg.png'),(25,'Indulge in our rich, fudgy brownies, baked to perfection with a melt-in-your-mouth texture. Each bite reveals a delicious blend of chocolatey goodness, with a crisp, chewy crust and a soft, gooey center. Perfect for satisfying your sweet tooth or sharing with friends and family.','https://i.postimg.cc/Nfkx6zXZ/brownies-Icon.jpg','Brownies',2,0,0,NULL,6,'https://i.postimg.cc/WpkNy98N/brownies-nobg.png'),(26,'Desc','https://i.postimg.cc/Nfkx6zXZ/brownies-Icon.jpg','Chocolate cake',7,0,70,NULL,6,'https://i.postimg.cc/Nfkx6zXZ/brownies-Icon.jpg');
/*!40000 ALTER TABLE `food` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_nutrition`
--

DROP TABLE IF EXISTS `food_nutrition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_nutrition` (
  `food_id` bigint NOT NULL,
  `nutrition_value` float DEFAULT NULL,
  `nutrition_name` varchar(255) NOT NULL,
  PRIMARY KEY (`food_id`,`nutrition_name`),
  CONSTRAINT `FK9bmjeq1pujiamlbm9c2tofgt2` FOREIGN KEY (`food_id`) REFERENCES `food` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_nutrition`
--

LOCK TABLES `food_nutrition` WRITE;
/*!40000 ALTER TABLE `food_nutrition` DISABLE KEYS */;
INSERT INTO `food_nutrition` VALUES (1,30,'carbs'),(1,10,'fat'),(1,15,'protein'),(1,5,'vitamins'),(2,50,'carbs'),(2,15,'fat'),(2,20,'protein'),(2,8,'vitamins'),(3,25,'carbs'),(3,3,'fat'),(3,15,'protein'),(3,60,'vitamins'),(4,40,'carbs'),(4,25,'fat'),(4,25,'protein'),(4,2,'vitamins'),(5,10,'carbs'),(5,60,'fat'),(5,8,'protein'),(5,12,'vitamins'),(6,20,'carbs'),(6,45,'fat'),(6,10,'protein'),(6,20,'vitamins'),(7,20,'carbs'),(7,45,'fat'),(7,10,'protein'),(7,20,'vitamins'),(8,20,'carbs'),(8,35,'fat'),(8,12,'protein'),(8,8,'vitamins'),(25,24,'carbs'),(25,12,'fat'),(25,7,'protein'),(25,3,'vitamins'),(26,30,'carbs'),(26,10,'fat'),(26,10,'protein'),(26,20,'vitamins');
/*!40000 ALTER TABLE `food_nutrition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT NULL,
  `item_name` varchar(255) DEFAULT NULL,
  `min_quantity` double NOT NULL,
  `price` double NOT NULL,
  `quantity` int NOT NULL,
  `category_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK5ipcuud9nn21le4fq12odfiqw` (`category_id`),
  CONSTRAINT `FK5ipcuud9nn21le4fq12odfiqw` FOREIGN KEY (`category_id`) REFERENCES `inventory_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES (1,'Fruit','Apple',50,0.5,50,1),(2,'Fruit','Banana',30,0.3,200,1),(3,'Vegetable','Carrot',20,0.2,100,2),(4,'Vegetable','Tomato',25,0.4,110,2),(5,'Dairy','Milk',10,1,50,3),(6,'Dairy','Cheese',5,2.5,30,3),(7,'Beverage','Coffee',15,5,70,4),(8,'Beverage','Tea',20,3,90,4),(9,'Bakery','Bread',25,1.5,80,5),(10,'Bakery','Donut',30,0.75,100,5),(11,'Fruit','Orange',40,0.6,130,1),(12,'Fruit','Strawberry',15,0.8,60,1),(13,'Vegetable','Spinach',10,0.3,40,2),(14,'Vegetable','Potato',50,0.5,150,2),(15,'Dairy','Butter',8,3,40,3),(16,'Dairy','Yogurt',20,1.2,80,3),(17,'Beverage','Juice',30,2,100,4),(18,'Beverage','Water',50,0.5,200,4),(19,'Bakery','Croissant',20,1,60,5),(20,'Bakery','Muffin',25,1.25,70,5),(21,'Fruit','Blueberry',10,1.5,50,1),(22,'Vegetable','Lettuce',20,0.5,70,2),(23,'Dairy','Ice Cream',15,2.5,40,3),(24,'Beverage','Soda',40,1,150,4),(25,'Bakery','Bagel',30,1,90,5),(26,'Household','Towel',15,3.5,60,6),(27,'Household','Shampoo',20,4,80,6),(28,'Household','Toothpaste',25,2,90,6),(29,'Household','Soap',30,1.5,100,6),(30,'Household','Detergent',10,5,50,6),(31,'Electronics','Phone Charger',5,15,25,7),(32,'Electronics','Headphones',10,25,30,7),(33,'Electronics','USB Cable',20,5,40,7),(34,'Clothing','T-Shirt',15,10,60,8),(35,'Clothing','Jeans',10,30,40,8),(36,'Clothing','Jacket',5,50,20,8),(37,'Clothing','Socks',25,2,100,8),(38,'Clothing','Hat',20,8,70,8),(39,'Office','Notebook',30,2.5,90,9),(40,'Office','Pen',50,1,200,9),(41,NULL,'new Item',10,8,0,9);
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory_category`
--

DROP TABLE IF EXISTS `inventory_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory_category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_category`
--

LOCK TABLES `inventory_category` WRITE;
/*!40000 ALTER TABLE `inventory_category` DISABLE KEYS */;
INSERT INTO `inventory_category` VALUES (1,'Includes various fruits such as apples, bananas, oranges, and strawberries.','Fruit'),(2,'Includes various vegetables such as carrots, tomatoes, spinach, and potatoes.','Vegetable'),(3,'Includes dairy products such as milk, cheese, butter, and yogurt.','Dairy'),(4,'Includes drinks such as coffee, tea, juice, water, and soda.','Beverage'),(5,'Includes bakery items such as bread, donuts, croissants, muffins, and bagels.','Bakery'),(6,'Includes household products such as towels, shampoo, toothpaste, soap, and detergent.','Household'),(7,'Includes electronic items such as phone chargers, headphones, and USB cables.','Electronics'),(8,'Includes clothing items such as T-shirts, jeans, jackets, socks, and hats.','Clothing'),(9,'Includes office supplies such as notebooks and pens.','Office');
/*!40000 ALTER TABLE `inventory_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory_supplier`
--

DROP TABLE IF EXISTS `inventory_supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory_supplier` (
  `inventory_id` bigint NOT NULL,
  `supplier_id` bigint NOT NULL,
  KEY `FK27tuxkliq51dupg6xs0nom3ii` (`supplier_id`),
  KEY `FKnikpm2xeo609y8bywfgx0a6vt` (`inventory_id`),
  CONSTRAINT `FK27tuxkliq51dupg6xs0nom3ii` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`),
  CONSTRAINT `FKnikpm2xeo609y8bywfgx0a6vt` FOREIGN KEY (`inventory_id`) REFERENCES `inventory` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_supplier`
--

LOCK TABLES `inventory_supplier` WRITE;
/*!40000 ALTER TABLE `inventory_supplier` DISABLE KEYS */;
INSERT INTO `inventory_supplier` VALUES (1,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8),(9,9),(10,10),(11,11),(12,12),(13,13),(14,14),(15,15),(16,1),(17,2),(18,3),(19,4),(20,5),(21,6),(22,7),(23,8),(24,9),(25,10),(26,11),(27,12),(28,13),(29,14),(30,15),(31,1),(32,2),(33,3),(34,4),(35,5),(36,6),(37,7),(38,8),(39,9),(40,10),(41,7);
/*!40000 ALTER TABLE `inventory_supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `qte` int NOT NULL,
  `cart_id` bigint DEFAULT NULL,
  `food_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKtpihbdn6ws0hu56camb0bg2to` (`cart_id`),
  KEY `FK5g4j2r53ncoltplogbnqlpt30` (`food_id`),
  KEY `FKel9kyl84ego2otj2accfd8mr7` (`user_id`),
  CONSTRAINT `FK5g4j2r53ncoltplogbnqlpt30` FOREIGN KEY (`food_id`) REFERENCES `food` (`id`),
  CONSTRAINT `FKel9kyl84ego2otj2accfd8mr7` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKtpihbdn6ws0hu56camb0bg2to` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (5,7,2,1,3,'paid'),(24,2,1,4,2,'paid'),(25,1,1,2,2,'paid'),(27,4,1,1,2,'paid'),(28,7,1,1,2,'paid'),(29,3,1,1,2,'paid'),(30,3,1,2,2,'paid'),(31,3,1,1,2,'paid'),(32,3,1,3,2,'paid'),(44,2,1,8,2,'paid'),(45,5,1,5,2,'paid'),(46,6,1,4,2,'paid'),(51,2,1,2,2,'paid'),(81,1,2,3,3,'paid'),(82,2,2,4,3,'paid'),(83,2,2,6,3,'paid'),(84,1,2,6,3,'paid'),(85,1,2,3,3,'paid'),(86,1,2,4,3,'paid'),(105,2,2,8,3,'paid'),(106,1,2,1,3,'paid');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `position`
--

DROP TABLE IF EXISTS `position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `position` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `level` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `qualifications` varchar(255) DEFAULT NULL,
  `responsibilities` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `position`
--

LOCK TABLES `position` WRITE;
/*!40000 ALTER TABLE `position` DISABLE KEYS */;
INSERT INTO `position` VALUES (1,NULL,'Senior','Human Resources Manager','Bachelor\'s in Human Resources or related field','Manages HR department and employee relations develops HR policies handles employee grievances oversees performance management'),(2,NULL,'Mid-Level','Human Resources Coordinator','Bachelor\'s in Human Resources or Business Administration','Assists with recruitment onboarding employee records management and benefits administration'),(3,NULL,'Entry-Level','Human Resources Assistant','High School Diploma or equivalent','Supports HR team with administrative tasks scheduling interviews and maintaining employee files'),(4,NULL,'Senior','Marketing Director','Bachelor\'s in Marketing or Business Administration','Leads marketing strategies and campaigns for restaurant promotions develops marketing plans manages advertising campaigns'),(5,NULL,'Mid-Level','Marketing Manager','Bachelor\'s in Marketing or related field','Oversees daily marketing activities implements promotional events manages social media presence'),(6,NULL,'Entry-Level','Marketing Assistant','High School Diploma or equivalent','Supports marketing team with campaign execution handles social media posts and assists with market research'),(7,NULL,'Junior','IT Support Specialist','Associate\'s in IT or related field','Provides technical support resolves IT issues maintains network and systems assists with hardware and software troubleshooting'),(8,NULL,'Mid-Level','IT Technician','Bachelor\'s in IT or Computer Science','Manages IT infrastructure supports system upgrades ensures data security and performs routine maintenance'),(9,NULL,'Senior','IT Manager','Bachelor\'s in IT or related field','Oversees IT department manages infrastructure projects implements IT policies and ensures technology alignment with business needs'),(10,NULL,'Senior','Customer Service Supervisor','Associate\'s Degree in Hospitality or related field','Manages customer service team handles complex issues and complaints ensures high level of customer satisfaction'),(11,NULL,'Mid-Level','Customer Service Representative','High School Diploma or equivalent','Handles customer inquiries resolves issues and ensures positive customer experiences'),(12,NULL,'Entry-Level','Customer Service Assistant','High School Diploma or equivalent','Provides basic support to customers processes orders and handles service requests'),(13,NULL,'Senior','Cleaning Supervisor','Associate\'s Degree in Facility Management or related field','Oversees cleaning operations manages cleaning staff ensures cleanliness standards and implements safety protocols'),(14,NULL,'Mid-Level','Cleaning Crew Leader','High School Diploma or equivalent','Coordinates cleaning tasks manages schedules and performs routine inspections'),(15,NULL,'Entry-Level','Cleaning Staff','High School Diploma or equivalent','Performs cleaning duties maintains hygiene standards and follows cleaning schedules'),(16,NULL,'Senior','Kitchen Manager','Bachelor\'s in Culinary Arts or related field','Manages kitchen operations oversees food preparation menu planning and staff performance'),(17,NULL,'Mid-Level','Head Chef','Bachelor\'s in Culinary Arts or related field','Leads kitchen team develops recipes ensures food quality and manages kitchen inventory'),(18,NULL,'Entry-Level','Cook','High School Diploma or equivalent','Prepares food follows recipes and assists with daily kitchen operations'),(19,NULL,'Senior','Reception Manager','Bachelor\'s in Hospitality or related field','Oversees front desk operations manages check-ins and check-outs and ensures guest satisfaction'),(20,NULL,'Mid-Level','Front Desk Supervisor','High School Diploma or equivalent','Assists with front desk operations handles guest inquiries and manages reservations'),(21,NULL,'Entry-Level','Receptionist','High School Diploma or equivalent','Greets guests handles phone calls and provides information and assistance');
/*!40000 ALTER TABLE `position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `inventory_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKlaqikdw6nt3ckjknip0fcj36t` (`inventory_id`),
  CONSTRAINT `FKlaqikdw6nt3ckjknip0fcj36t` FOREIGN KEY (`inventory_id`) REFERENCES `inventory` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
INSERT INTO `supplier` VALUES (1,'12 Rue des Oliviers, Casablanca','contact@atlassupplies.ma','Atlas Supplies','0522-123456','http://www.atlassupplies.ma',NULL),(2,'34 Avenue Hassan II, Rabat','info@maroctech.ma','MarocTech Solutions','0537-654321','http://www.maroctech.ma',NULL),(3,'56 Boulevard Mohammed V, Marrakech','info@greenvalley.ma','Green Valley Traders','0524-987654','http://www.greenvalley.ma',NULL),(4,'78 Rue de Fes, Tangier','contact@oceanic.ma','Oceanic Distributors','0539-112233','http://www.oceanic.ma',NULL),(5,'90 Avenue de la Corniche, Agadir','service@saharaimports.ma','Sahara Imports','0528-445566','http://www.saharaimports.ma',NULL),(6,'123 Rue de la République, Oujda','contact@atlascommerce.ma','Atlas Commerce','0536-778899','http://www.atlascommerce.ma',NULL),(7,'45 Boulevard d\'Anfa, Casablanca','info@sunriseventures.ma','Sunrise Ventures','0522-334455','http://www.sunriseventures.ma',NULL),(8,'67 Rue de Tanger, Fez','contact@medinasuppliers.ma','Medina Suppliers','0536-221100','http://www.medinasuppliers.ma',NULL),(9,'89 Avenue Mohamed VI, Marrakech','info@goldencrescent.ma','Golden Crescent','0524-556677','http://www.goldencrescent.ma',NULL),(10,'12 Rue des Jardins, Rabat','contact@redseaimports.ma','Red Sea Imports','0537-889900','http://www.redseaimports.ma',NULL),(11,'23 Rue du 11 Janvier, Agadir','info@atlashorizons.ma','Atlas Horizons','0528-667788','http://www.atlashorizons.ma',NULL),(12,'34 Boulevard de la Liberté, Tangier','contact@majestictrade.ma','Majestic Trade','0539-334455','http://www.majestictrade.ma',NULL),(13,'56 Rue de l’Atlantique, Casablanca','info@goldensands.ma','Golden Sands','0522-443322','http://www.goldensands.ma',NULL),(14,'78 Avenue Mohammed V, Oujda','contact@emeraldenterprises.ma','Emerald Enterprises','0536-998877','http://www.emeraldenterprises.ma',NULL),(15,'90 Rue de Marrakech, Fez','info@azuredistribution.ma','Azure Distribution','0535-221133','http://www.azuredistribution.ma',NULL);
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role_id` bigint DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKn4pb12f3y8ktduy8fnc2xlln1` (`role_id`),
  CONSTRAINT `FKn4pb12f3y8ktduy8fnc2xlln1` FOREIGN KEY (`role_id`) REFERENCES `user_role` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (2,'1231 Main St','a43@email.com','a43','123','11234567890',1,'male','https://i.postimg.cc/hPQNJy4Q/whiteman.jpg'),(3,'1231 Main St','CfX12H@example.com','abdrafi3','123','121234567890',2,'male','https://i.postimg.cc/hPQNJy4Q/whiteman.jpg'),(4,'12312 Main St','CfX123H@example.com','John Doe 23','2password','1212134567890',2,'female','https://i.postimg.cc/mZ50gf4G/Blackman.jpg'),(11,'my adress','test@tiz.c','test','123','60606060',2,'male','https://i.postimg.cc/mZ50gf4G/Blackman.jpg'),(12,'my adress2','teeest@gx.z','mytest','123','606060601',2,'female','https://i.postimg.cc/4yqMLtP3/woman.jpg'),(13,'my adresssqsqs','test@tiz.cwsq','mysss','123','6850606060',2,'male','https://i.postimg.cc/4yqMLtP3/woman.jpg'),(14,'Londre , Q 145','euser@email.uk','Tom','123','+12 222 222 22',2,'male','https://i.postimg.cc/mZ50gf4G/Blackman.jpg');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_favorite_foods`
--

DROP TABLE IF EXISTS `user_favorite_foods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_favorite_foods` (
  `user_id` bigint NOT NULL,
  `food_id` bigint NOT NULL,
  KEY `FKml7yk19e5iblncai26q8emq3r` (`food_id`),
  KEY `FKlxc6y64fly23g4ecemnl2ldxj` (`user_id`),
  CONSTRAINT `FKlxc6y64fly23g4ecemnl2ldxj` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKml7yk19e5iblncai26q8emq3r` FOREIGN KEY (`food_id`) REFERENCES `food` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_favorite_foods`
--

LOCK TABLES `user_favorite_foods` WRITE;
/*!40000 ALTER TABLE `user_favorite_foods` DISABLE KEYS */;
INSERT INTO `user_favorite_foods` VALUES (2,1),(2,3),(3,2),(3,4),(3,5),(3,6);
/*!40000 ALTER TABLE `user_favorite_foods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `role_id` bigint NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (1,'Admin'),(2,'User');
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-19 15:59:39
