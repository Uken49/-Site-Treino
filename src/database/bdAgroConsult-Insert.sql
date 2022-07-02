-- Inserções testes
USE AgroConsult;

CALL stg_cadastro ('Pelé Santos', 'pele@gmail.com', 'Patrão', '#SenhaFort&', 'AgroSantuaria', '80.368.649/0001-07');

INSERT INTO Fazenda(bairro, cep, rua, cidade, fkEmpresa) VALUE
	('Vila Belmiro', '11075620', 'Rua Francisco Octaviano', 'Santos', 1);
    
INSERT INTO Sensor(localizacao, fkFazenda) VALUE
	('Área 1', 1);

SELECT * FROM empresa;
SELECT * FROM fazenda;
SELECT * FROM sensor;
SELECT * FROM dadossensor;