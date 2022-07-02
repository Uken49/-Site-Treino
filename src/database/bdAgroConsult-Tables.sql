-- Criação das tabelas
CREATE DATABASE AgroConsult;
USE AgroConsult;

CREATE TABLE Empresa(
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT
    ,nomeEmpresa VARCHAR(45) UNIQUE NOT NULL
    ,CNPJ CHAR(14) UNIQUE NOT NULL
);

CREATE TABLE Usuario(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT
    ,nomeUsuario VARCHAR(100) NOT NULL
    ,email VARCHAR(100) UNIQUE NOT NULL
    ,cargo VARCHAR(20) NOT NULL
    ,senha VARCHAR(255) NOT NULL
    ,fkEmpresa INT NOT NULL, FOREIGN KEY (fkEmpresa) REFERENCES Empresa (idEmpresa)
);

CREATE TABLE Fazenda(
	idFazenda INT PRIMARY KEY AUTO_INCREMENT
    ,bairro VARCHAR(45) NOT NULL
    ,cep VARCHAR(8) NOT NULL
    ,rua VARCHAR(60) NOT NULL
    ,cidade VARCHAR(60) NOT NULL
    ,fkEmpresa INT NOT NULL, FOREIGN KEY (fkEmpresa) REFERENCES Empresa (idEmpresa)
);

CREATE TABLE Sensor(
	idSensor INT PRIMARY KEY AUTO_INCREMENT
    ,localizacao VARCHAR(45) UNIQUE NOT NULL
    ,fkFazenda INT NOT NULL, FOREIGN KEY (fkFazenda) REFERENCES Fazenda (idFazenda)
);

CREATE TABLE DadosSensor(
	idDado INT PRIMARY KEY AUTO_INCREMENT
    ,temperatura DECIMAL(4,2) NOT NULL
    ,umidade DECIMAL(4,2) NOT NULL
    ,horario DATETIME NOT NULL
    ,fkSensor INT NOT NULL, FOREIGN KEY (fkSensor) REFERENCES Sensor (idSensor)
);