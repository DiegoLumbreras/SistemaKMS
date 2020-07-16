-- MySQL dump 10.13  Distrib 5.7.30, for Linux (x86_64)
--
-- Host: localhost    Database: kms
-- ------------------------------------------------------
-- Server version	5.7.30-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `adonis_schema`
--

DROP TABLE IF EXISTS `adonis_schema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `adonis_schema` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adonis_schema`
--

LOCK TABLES `adonis_schema` WRITE;
/*!40000 ALTER TABLE `adonis_schema` DISABLE KEYS */;
INSERT INTO `adonis_schema` VALUES (1,'1582124180844_rol_schema',1,'2020-05-14 15:47:33'),(2,'1582124454393_user',1,'2020-05-14 15:47:34'),(3,'1582126721648_tema_schema',1,'2020-05-14 15:47:34'),(4,'1582131304353_banco_pregunta_schema',1,'2020-05-14 15:47:34'),(5,'1582134757862_relacion_profesor_schema',1,'2020-05-14 15:47:34'),(6,'1582135796078_relacion_primaria_schema',1,'2020-05-14 15:47:34'),(7,'1582135820693_cuestionario_schema',1,'2020-05-14 15:47:34'),(8,'1582135840986_historial_alumno_schema',1,'2020-05-14 15:47:34'),(9,'1582135863912_testeo_schema',1,'2020-05-14 15:47:34'),(10,'1583935956042_relacion_nodo_alumno_schema',1,'2020-05-14 15:47:34');
/*!40000 ALTER TABLE `adonis_schema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banco_preguntas`
--

DROP TABLE IF EXISTS `banco_preguntas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `banco_preguntas` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pregunta` varchar(200) NOT NULL,
  `respuesta` varchar(200) NOT NULL,
  `tipo` varchar(200) NOT NULL,
  `opcion` varchar(200) DEFAULT NULL,
  `opcion2` varchar(200) DEFAULT NULL,
  `opcion3` varchar(200) DEFAULT NULL,
  `opcion4` varchar(200) DEFAULT NULL,
  `id_tema` int(10) unsigned DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `banco_preguntas_id_tema_foreign` (`id_tema`),
  CONSTRAINT `banco_preguntas_id_tema_foreign` FOREIGN KEY (`id_tema`) REFERENCES `temas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banco_preguntas`
--

LOCK TABLES `banco_preguntas` WRITE;
/*!40000 ALTER TABLE `banco_preguntas` DISABLE KEYS */;
/*!40000 ALTER TABLE `banco_preguntas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuestionarios`
--

DROP TABLE IF EXISTS `cuestionarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cuestionarios` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `id_alumno` int(10) unsigned DEFAULT NULL,
  `porcentaje` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cuestionarios_id_alumno_foreign` (`id_alumno`),
  CONSTRAINT `cuestionarios_id_alumno_foreign` FOREIGN KEY (`id_alumno`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuestionarios`
--

LOCK TABLES `cuestionarios` WRITE;
/*!40000 ALTER TABLE `cuestionarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `cuestionarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial_alumnos`
--

DROP TABLE IF EXISTS `historial_alumnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `historial_alumnos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_cuestionario` int(10) unsigned DEFAULT NULL,
  `id_pregunta` int(10) unsigned DEFAULT NULL,
  `arespuesta` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `historial_alumnos_id_cuestionario_foreign` (`id_cuestionario`),
  KEY `historial_alumnos_id_pregunta_foreign` (`id_pregunta`),
  CONSTRAINT `historial_alumnos_id_cuestionario_foreign` FOREIGN KEY (`id_cuestionario`) REFERENCES `cuestionarios` (`id`),
  CONSTRAINT `historial_alumnos_id_pregunta_foreign` FOREIGN KEY (`id_pregunta`) REFERENCES `banco_preguntas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial_alumnos`
--

LOCK TABLES `historial_alumnos` WRITE;
/*!40000 ALTER TABLE `historial_alumnos` DISABLE KEYS */;
/*!40000 ALTER TABLE `historial_alumnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relacion_nodo_alumnos`
--

DROP TABLE IF EXISTS `relacion_nodo_alumnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `relacion_nodo_alumnos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `id_alumno` int(10) unsigned DEFAULT NULL,
  `id_tema` int(10) unsigned DEFAULT NULL,
  `ponderacion` int(10) unsigned DEFAULT NULL,
  `clasificacion` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `relacion_nodo_alumnos_id_alumno_foreign` (`id_alumno`),
  KEY `relacion_nodo_alumnos_id_tema_foreign` (`id_tema`),
  CONSTRAINT `relacion_nodo_alumnos_id_alumno_foreign` FOREIGN KEY (`id_alumno`) REFERENCES `users` (`id`),
  CONSTRAINT `relacion_nodo_alumnos_id_tema_foreign` FOREIGN KEY (`id_tema`) REFERENCES `temas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relacion_nodo_alumnos`
--

LOCK TABLES `relacion_nodo_alumnos` WRITE;
/*!40000 ALTER TABLE `relacion_nodo_alumnos` DISABLE KEYS */;
/*!40000 ALTER TABLE `relacion_nodo_alumnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relacion_primarias`
--

DROP TABLE IF EXISTS `relacion_primarias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `relacion_primarias` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_padre` int(10) unsigned DEFAULT NULL,
  `id_hijo` int(10) unsigned DEFAULT NULL,
  `tipo` varchar(200) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `relacion_primarias_id_padre_foreign` (`id_padre`),
  KEY `relacion_primarias_id_hijo_foreign` (`id_hijo`),
  CONSTRAINT `relacion_primarias_id_hijo_foreign` FOREIGN KEY (`id_hijo`) REFERENCES `temas` (`id`),
  CONSTRAINT `relacion_primarias_id_padre_foreign` FOREIGN KEY (`id_padre`) REFERENCES `temas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relacion_primarias`
--

LOCK TABLES `relacion_primarias` WRITE;
/*!40000 ALTER TABLE `relacion_primarias` DISABLE KEYS */;
INSERT INTO `relacion_primarias` VALUES (1,1,2,'primarias',NULL,NULL),(2,1,3,'primarias',NULL,NULL),(3,1,4,'primarias',NULL,NULL);
/*!40000 ALTER TABLE `relacion_primarias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relacion_profesors`
--

DROP TABLE IF EXISTS `relacion_profesors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `relacion_profesors` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_profesor` int(11) DEFAULT NULL,
  `id_alumno` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relacion_profesors`
--

LOCK TABLES `relacion_profesors` WRITE;
/*!40000 ALTER TABLE `relacion_profesors` DISABLE KEYS */;
/*!40000 ALTER TABLE `relacion_profesors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rols`
--

DROP TABLE IF EXISTS `rols`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rols` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tipo_rol` varchar(30) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `rols_tipo_rol_unique` (`tipo_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rols`
--

LOCK TABLES `rols` WRITE;
/*!40000 ALTER TABLE `rols` DISABLE KEYS */;
INSERT INTO `rols` VALUES (1,'Administrador',NULL,NULL),(2,'Experto',NULL,NULL),(3,'Maestro',NULL,NULL),(4,'Alumno',NULL,NULL);
/*!40000 ALTER TABLE `rols` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `temas`
--

DROP TABLE IF EXISTS `temas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `temas` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre_tema` varchar(30) NOT NULL,
  `nivel` int(10) unsigned NOT NULL,
  `freex` float(8,2) NOT NULL,
  `freey` float(8,2) NOT NULL,
  `textPosition` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temas`
--

LOCK TABLES `temas` WRITE;
/*!40000 ALTER TABLE `temas` DISABLE KEYS */;
INSERT INTO `temas` VALUES (1,'Matemáticas',0,100.00,30.00,0,NULL,NULL),(2,'Aritmética',1,29.93,119.66,0,NULL,'2020-05-19 15:34:59'),(3,'ss',1,136.73,219.47,0,NULL,'2020-05-25 20:32:25'),(4,'ingles',1,249.55,47.65,0,NULL,'2020-05-21 16:58:38');
/*!40000 ALTER TABLE `temas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testeos`
--

DROP TABLE IF EXISTS `testeos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `testeos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `variable1` int(10) unsigned DEFAULT NULL,
  `variable2` int(10) unsigned DEFAULT NULL,
  `variable3` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testeos`
--

LOCK TABLES `testeos` WRITE;
/*!40000 ALTER TABLE `testeos` DISABLE KEYS */;
/*!40000 ALTER TABLE `testeos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  `apellido_paterno` varchar(50) NOT NULL,
  `apellido_materno` varchar(50) NOT NULL,
  `matricula` varchar(50) NOT NULL,
  `password` varchar(90) NOT NULL,
  `nivel_academico` varchar(60) DEFAULT NULL,
  `id_rol` int(10) unsigned DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_matricula_unique` (`matricula`),
  KEY `users_id_rol_foreign` (`id_rol`),
  CONSTRAINT `users_id_rol_foreign` FOREIGN KEY (`id_rol`) REFERENCES `rols` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Cristian','Echareta','De la Rosa','1530229','$2a$10$.6TEYHS6fsdPvta91zQibeS1zy5cN96swOdPJjZXzhVjcI22SoEWC','2',2,NULL,NULL),(2,'Eduardo','Apellido Pat','Apellido mat','1630031','$2a$10$.DhLA27fM2RH8ItHciaqze2u1XpQxvLMpuHujSBpnDVH3Ny95.0M.','2',2,NULL,NULL),(3,'Victor','Apellido Pat','Apellido mat','123','$2a$10$TLerP1ls3fzOIBmev9PJg.7MdUnPUFqTmlrzeRjGUaJq5dJXd.nQa','2',2,NULL,NULL);
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

-- Dump completed on 2020-05-26 19:21:12
