-- Para workbench - localhost - desenvolvimento
CREATE DATABASE AgroConsult;
USE AgroConsult;

CREATE TABLE Empresa(
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT
    ,nomeEmpresa VARCHAR(45) UNIQUE NOT NULL
    ,logo VARCHAR(2000)
    ,CNPJ CHAR(14) UNIQUE NOT NULL
);

CREATE TABLE Usuario(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT
    ,nomeUsuario VARCHAR(100) NOT NULL
    ,email VARCHAR(100) UNIQUE NOT NULL
    ,cargo VARCHAR(20) 
    ,senha VARCHAR(255) NOT NULL
    ,fkEmpresa INT NOT NULL, FOREIGN KEY (fkEmpresa) REFERENCES Empresa (idEmpresa)
);

CREATE TABLE Fazenda(
	idFazenda INT PRIMARY KEY AUTO_INCREMENT
    ,bairro VARCHAR(45) NOT NULL
    ,cep VARCHAR(8) NOT NULL
    ,rua VARCHAR(60) NOT NULL
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

-- Usuário usado pelo sistema
CREATE USER 'system'@'localhost' IDENTIFIED BY '#5_Sys_C0ntr0l_5@';

GRANT EXECUTE ON FUNCTION fct_cadastro TO 'system'@'localhost';
GRANT SELECT ON AgroConsult. * TO 'system'@'localhost';

FLUSH PRIVILEGES;

-- Functions
DELIMITER $$
SET GLOBAL log_bin_trust_function_creators = 1;

CREATE FUNCTION fct_cadastro (nomeUsuario VARCHAR(100), email VARCHAR(100), senha VARCHAR(255), nomeEmpresa VARCHAR(45), cnpj VARCHAR(18))
RETURNS VARCHAR(100)
BEGIN
    SET cnpj = replace(cnpj,'.',''),
		cnpj = replace(cnpj,'/',''),
		cnpj = replace(cnpj,'-','');
    INSERT INTO Empresa (nomeEmpresa, cnpj) VALUES (nomeEmpresa, cnpj);
    SET @fkEmpresa = (SELECT idEmpresa FROM Empresa ORDER BY idEmpresa DESC LIMIT 1);
    
    INSERT INTO Usuario (nomeUsuario, email, senha, fkEmpresa)
    VALUES(nomeUsuario, email, senha, @fkEmpresa);
    
    RETURN concat('Cadastro realizado!');
END;
$$
-- Para sql server - remoto - produção