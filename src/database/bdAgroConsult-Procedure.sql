-- Criando procedure e events
USE AgroConsult;

# Tirando o autocommit para melhor segurança da query
# SET @@autocommit = 0;
# O comando de cima tira o autocommit de todo o seu sistema, para reverter colocar 1 ao invés de 0

# Procedure de cadastro usuário
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
		VALUES(nomeUsuario, email, cargo, MD5(senha), @fkEmpresa);
	
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

# Procedure de cadastro usuário
DELIMITER $$
CREATE PROCEDURE stg_registrarFuncionario
 (IN nomeUsuario VARCHAR(100), IN email VARCHAR(100), IN cargo VARCHAR(20), IN senha VARCHAR(255))
BEGIN
	DECLARE erro_sql TINYINT DEFAULT FALSE;
	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET erro_sql = TRUE;
	
    START TRANSACTION;
    
    INSERT INTO Usuario (nomeUsuario, email, cargo, senha)
		VALUES(nomeUsuario, email, cargo, MD5(senha));
	
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

# Procedure de login no sistema
DELIMITER $$
CREATE PROCEDURE stg_entrar (IN email VARCHAR(100), IN senha VARCHAR(255))
BEGIN
	SET @email = email,
		@senha = senha;
    
	SELECT idUsuario, nomeUsuario, email, cargo, senha, idEmpresa, nomeEmpresa, cnpj
		FROM Usuario
			JOIN Empresa
				ON fkEmpresa = idEmpresa
			WHERE email = @email
				AND senha = @senha;
END$$
DELIMITER ;

# Procedure Para listar usuários da empresa e plotar na tabela
DELIMITER $$
CREATE PROCEDURE stg_listarUsuario (IN fkEmpresa INT)
BEGIN
	SET @fkEmpresa = fkEmpresa;
    
	SELECT Usuario.*
	        FROM Usuario
		        JOIN Empresa
			        ON idEmpresa = fkEmpresa
				WHERE fkEmpresa = @fkEmpresa;
END$$
DELIMITER ;

# Procedure para excluir um funcionário
DELIMITER $$
CREATE PROCEDURE stg_excluirUsuario (IN idUsuario INT)
BEGIN
	SET @idUsuario = idUsuario;
    
	DELETE
		FROM Usuario
			WHERE idUsuario = @idUsuario;
END$$
DELIMITER ;

# Procedure que junto ao evento, vai inserir os dados na tabela
DELIMITER $$
CREATE PROCEDURE stg_inserirDadosSensor
 (IN MinTemp DECIMAL(4,2), IN MaxTemp DECIMAL(4,2), IN MinUmi DECIMAL(4,2), IN MaxUmi DECIMAL(4,2))
BEGIN
	INSERT INTO DadosSensor (temperatura, umidade, horario, fkSensor) VALUES
		(MinTemp + CEIL(RAND() * (MaxTemp - MinTemp)), MinUmi + CEIL(RAND() * (MaxUmi - MinUmi)), NOW(), 1);
END$$
DELIMITER ;

# Criando o evento de inserção dos dados
SET GLOBAL event_scheduler = ON;

CREATE EVENT insert_dados
	ON SCHEDULE
		EVERY 5 SECOND
    DO
		CALL stg_inserirDadosSensor (19, 39, 20, 45);
