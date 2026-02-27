CREATE DATABASE IF NOT EXISTS mapa_tech;
USE mapa_tech;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS favoritos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    nome_pais VARCHAR(100),
    capital VARCHAR(100),
    regiao VARCHAR(100),
    populacao BIGINT,
    moeda VARCHAR(100),
    idioma VARCHAR(100),
    bandeira VARCHAR(255),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
