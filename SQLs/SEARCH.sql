USE REDE_HOTELEIRA;

-- Recepcionista
SELECT * FROM CLIENTE;
SELECT * FROM RESERVA;
SELECT * FROM QUARTO;

SELECT ID_Quarto, Capacidade, N_Banheiros, Wifi, ArCondicionado, Frigobar FROM QUARTO WHERE Status_Quarto = 'Livre';
SELECT * FROM CLIENTE WHERE Cpf = '09459325963'; -- Nome do Cliente que deseja
SELECT ID_Quarto, Status FROM RESERVA WHERE Check_in != '2019-08-10'   -- Data desejada
					    Check_out != '2019-08-16'; -- Data desejada
SELECT ID_Reserva, Check_In, Check_Out, Nome, Status FROM RESERVA, CLIENTE WHERE CLIENTE.Nome = 'Lindino' -- Log de reserva por nome de cliente

UPDATE RESERVA SET Status = 'Cancelado' WHERE ID_Reserva = '1'
UPDATE CLIENTE SET Endereco = 'Rua Geronimo, 989' WHERE Cpf = '5'

-- Gerente
SELECT * FROM HOTEL;
SELECT * FROM QUARTO;
SELECT * FROM CLIENTE;
SELECT * FROM RESERVA;
SELECT * FROM COMUNICA;
SELECT * FROM RECEPCIONISTA;
SELECT * FROM CAMAREIRA;
SELECT * FROM GERENTE;
SELECT * FROM FUNCIONARIO;
SELECT * FROM LIMPA;
SELECT * FROM EVENTO;
SELECT * FROM FORNECEDOR;
SELECT * FROM PRODUTO;
SELECT * FROM ABASTECE;

SELECT ID_Funcionario, Nome, Salario, Tipo FROM FUNCIONARIO WHERE Salario >= 3000; -- Valor Desejado
SELECT Nome, Horario_Entrada FROM FUNCIONARIO, CAMAREIRA  WHERE CAMAREIRA.Horario_Entrada LIKE 'Segunda%'; -- Conjunto de Dias desejados

ALTER TABLE CLIENTE ADD Animal ENUM('N', 'Y');
ALTER TABLE QUARTO ADD Ventilador ENUM('N', 'Y');
ALTER TABLE FUNCIONARIO ADD Anos_Experiencia CHAR(3);

