-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-06-2023 a las 00:54:31
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyectofinal`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `rol` varchar(50) NOT NULL,
  `pass` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `user`, `name`, `rol`, `pass`) VALUES
(10, 'testusuario', 'testusuario', 'Usuario', '$2a$08$hGTXeznaIFlE/iA.apx0n.gEyZlu1TCO8Zk08dDpzUU9Sod5eeuZ.'),
(11, 'testdibujante', 'testdibujante', 'dibujante', '$2a$08$.UYLwEwqJUKJEMwfQTwxfOueSDmmQSONmwF4cwQqKhVddBdCJtZjK'),
(12, 'testusuario1', 'testusuario1', 'dibujante', '$2a$08$WpY.J5ZzsbfboA47VKpd4.1wHPgZxSeh2u9mj5GNNLTE3QTob8csS'),
(13, 'testusuario', 'testusuario', 'dibujante', '$2a$08$50V7J9ImTgExemK7I6JoE.1ZUqhbjUEt6cYKtCiqp/ew3nfvVpsB2'),
(14, 'testdibujante', 'testdibujante', 'dibujante', '$2a$08$wmTPoX9uXyvCT1j1XE2YCuNrvPoxa6V0btT2cnbcz6SQyz0zJVaXy'),
(15, 'testdibujante2', 'testdibujante2', 'dibujante', '$2a$08$beO4/D32xUSgVTrgKfLE0e7M6K4MIJQJVtKUOQ6MicJzPESkS4Kw6'),
(16, 'testdibujante3', 'testdibujante3', 'dibujante', '$2a$08$9S5LtVU/6qJcCYPZHV.IZ.0gzswLQustNX/iQohbCPdU8sKI9GL4G'),
(17, 'test200', 'test200', 'dibujante', '$2a$08$zsihqWoy58qD3zikSsL8UukaOpQpmZyYsNXgoddFKMFB2FJmsI4Ry'),
(18, 'test4000', 'test4000', 'dibujante', '$2a$08$vo0mJQ3QBdCyandxtKT0HeLnP1XIB2N6Mbc0WEo7uH7rYrK.DzLK2'),
(19, 'Pepito22', 'pepito', 'dibujante', '$2a$08$6EyZa9MhV3s7v8Irj9aP9uQjKPtYpW8ketwB1obdirMYtoeDph9Va'),
(20, 'pepe', 'pepe', 'dibujante', '$2a$08$m0NMgSEimn2dtqTIw5VF2eAAOqXKakujugsye3FnlUYwuKT5Ipjy6'),
(21, 'juan', 'juan', 'dibujante', '$2a$08$VDCWfwWuR8zq41mRziJLjO7wN2iQww0CXs5LzpzdmVn8UWvEQzvy.'),
(22, 'carlos', 'carlos', 'dibujante', '$2a$08$HIJ/Tea.tVLBrjx51bn9G.rnnjv9cBk.ldNIXEgIHk8.zFWaf4F8O'),
(23, 'manuel', 'manuel', 'dibujante', '$2a$08$sJSN2lD4zFt/7QMHIYlDKOm.Tftmuesq9qbhFG1oy0RlW7lYh2Ism'),
(24, 'bea', 'bea', 'dibujante', '$2a$08$fNu7ZKwIWX123cy9N6iajeTzE.JY7103o2EEWwq8T31OCbaaW9jYi'),
(25, 'julian', 'julian', 'Usuario', '$2a$08$yH.Y6OZF4E529yynJhnWI.7oLIjRBVIplZ4oGVjWbvStoGasWSQBu'),
(26, 'javier', 'javier', 'dibujante', '$2a$08$6eNY2FIXvLSL6wI4qY2aqulPi/z8Oboo/c9QKmxVi0bOGHQemmsFG'),
(27, 'javier1', 'javier1', 'Usuario', '$2a$08$B0NLIYZbGsTrI9d6Mc1YAuomLr.5C27JY0QUdPzZ2VOplnZuU9tEW');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
