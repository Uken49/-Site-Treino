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
    ,cargo VARCHAR(20) NOT NULL
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

# Tirando o autocommit para melhor segurança da query
# SET @@autocommit = 0;
# O comando de cima tira o autocommit de todo o seu sistema, para reverter colocar 1 ao invés de 0

-- Criando processos do sistemas
DELIMITER $$
CREATE PROCEDURE stg_cadastro
 (IN nomeUsuario VARCHAR(100), IN email VARCHAR(100), IN cargo VARCHAR(20), IN senha VARCHAR(255), IN nomeEmpresa VARCHAR(45), IN cnpj VARCHAR(18))
BEGIN
	DECLARE erro_sql TINYINT DEFAULT FALSE;
	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET erro_sql = TRUE;
	
    START TRANSACTION;
    
    SET cnpj = replace(cnpj,'.',''),
		cnpj = replace(cnpj,'/',''),
		cnpj = replace(cnpj,'-','');
        
    INSERT INTO Empresa (nomeEmpresa, cnpj) VALUES (nomeEmpresa, cnpj);
    
    SET @fkEmpresa = (SELECT idEmpresa FROM Empresa WHERE cnpj = cnpj LIMIT 1);
    
    INSERT INTO Usuario (nomeUsuario, email, cargo, senha, fkEmpresa)
		VALUES(nomeUsuario, email, cargo, senha, @fkEmpresa);
	
    # Verificando erro para dar o commit
    IF erro_sql = FALSE THEN
		COMMIT;
        SELECT 'Cadastro realizado com sucesso.' AS Resultado;
    ELSE
		ROLLBACK;
        SELECT 'Erro ao realizar cadastro.' AS Resultado;
	END IF;
    
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE stg_entrar (IN email VARCHAR(100), IN senha VARCHAR(255))
BEGIN
	SET @email = email,
		@senha = senha;
    
     SELECT *
		FROM Usuario
			WHERE email = @email
            AND senha = @senha;
END$$
DELIMITER ;

-- Usuário usado pelo sistema
CREATE USER 'system'@'localhost' IDENTIFIED BY '#5_Sys_C0ntr0l_5@';

GRANT EXECUTE ON PROCEDURE stg_cadastro TO 'system'@'localhost';
GRANT EXECUTE ON PROCEDURE stg_entrar TO 'system'@'localhost';
GRANT EXECUTE ON PROCEDURE stg_inserirDadosSensor TO 'system'@'localhost';
GRANT SELECT ON AgroConsult. * TO 'system'@'localhost';

FLUSH PRIVILEGES;