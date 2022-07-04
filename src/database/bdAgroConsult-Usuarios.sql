USE AgroConsult;

-- Usuário usado pelo sistema
CREATE USER 'system'@'localhost' IDENTIFIED BY '#5_Sys_C0ntr0l_5@';

GRANT EXECUTE ON PROCEDURE stg_cadastro TO 'system'@'localhost';
GRANT EXECUTE ON PROCEDURE stg_registrarFuncionario TO 'system'@'localhost';
GRANT EXECUTE ON PROCEDURE stg_entrar TO 'system'@'localhost';
GRANT EXECUTE ON PROCEDURE stg_listarUsuario TO 'system'@'localhost';
GRANT EXECUTE ON PROCEDURE stg_excluirUsuario TO 'system'@'localhost';
GRANT EXECUTE ON PROCEDURE stg_inserirDadosSensor TO 'system'@'localhost';
GRANT SELECT ON AgroConsult. * TO 'system'@'localhost';

FLUSH PRIVILEGES;