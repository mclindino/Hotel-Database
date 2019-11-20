/*
 *   Projeto de Banco de Dados - Rede Hoteleira
 *   Matheus Lindino - mclindino@inf.ufpel.edu.br
 *   Andre Dalla Costa - azdcosta@inf.ufpel.edu.br
 */

-- Deleta o database caso exista
DROP DATABASE IF EXISTS REDE_HOTELEIRA;

-- Cria o database
CREATE DATABASE REDE_HOTELEIRA;

-- Coloca em uso
USE REDE_HOTELEIRA;

-- Criacao de cada tabela
CREATE TABLE FUNCIONARIO
(
    ID_Funcionario          INT                 NOT NULL,
    Nome                    VARCHAR(15)         NOT NULL,
    Endereco                VARCHAR(30)         NOT NULL,
    Salario                 DECIMAL(10,2),
    Tipo                    VARCHAR(15)         NOT NULL,
    PRIMARY KEY (ID_Funcionario)
);

CREATE TABLE CLIENTE
(
    Cpf                 CHAR(11)        NOT NULL,
    Nome                VARCHAR(15)     NOT NULL,
    Endereco            VARCHAR(30)     NOT NULL,
    Telefone            CHAR(12)        NOT NULL,
    PRIMARY KEY (Cpf)
);

CREATE TABLE COMUNICA
(
    Cpf                 CHAR(11)    NOT NULL,
    ID_Funcionario      INT         NOT NULL,
    Data_Atendimento    DATE        NOT NULL,
    FOREIGN KEY (Cpf) REFERENCES CLIENTE (Cpf)
        ON UPDATE CASCADE,
    FOREIGN KEY (ID_Funcionario) REFERENCES FUNCIONARIO (ID_Funcionario)
        ON UPDATE CASCADE
);

CREATE TABLE RECEPCIONISTA
(
    ID_Funcionario      INT             NOT NULL,
    Turno               VARCHAR(30)     NOT NULL,
    Idioma              VARCHAR(30),
    FOREIGN KEY (ID_Funcionario) REFERENCES FUNCIONARIO (ID_Funcionario)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE CAMAREIRA
(
    ID_Funcionario      INT               NOT NULL,
    Horario_Entrada     CHAR(5)           NOT NULL,
    Horario_Saida       CHAR(5)           NOT NULL,
    Dias_Disponiveis    VARCHAR(50)       NOT NULL,
    FOREIGN KEY (ID_Funcionario) REFERENCES FUNCIONARIO (ID_Funcionario)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE GERENTE
(
    ID_Funcionario      INT         NOT NULL,
    Data_Ingresso       DATE,
    FOREIGN KEY (ID_Funcionario) REFERENCES FUNCIONARIO (ID_Funcionario)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE HOTEL
(
    ID_Hotel         INT             NOT NULL,
    Cep              CHAR(9)         NOT NULL,
    Nome             VARCHAR(15)     NOT NULL,
    Cidade           VARCHAR(15),
    Estado           VARCHAR(2),
    Telefone         CHAR(12)        NOT NULL,
    Sauna            ENUM('N', 'Y'),
    Piscina          ENUM('N', 'Y'),
    Salao_De_Jogos   ENUM('N', 'Y'),
    PRIMARY KEY (ID_Hotel)
);

CREATE TABLE QUARTO
(
    ID_Quarto           INT             NOT NULL,
    ID_Hotel            INT             NOT NULL,
    Status_Quarto       VARCHAR(10)     NOT NULL,
    Capacidade          INT             NOT NULL,
    N_Banheiros         INT             NOT NULL,
    Wifi                ENUM('N', 'Y'),
    ArCondicionado      ENUM('N', 'Y'),
    Frigobar            ENUM('N', 'Y'),
    PRIMARY KEY (ID_Quarto),
    FOREIGN KEY (ID_Hotel) REFERENCES HOTEL (ID_Hotel)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE RESERVA
(
    ID_Quarto           INT         NOT NULL,
    ID_Funcionario      INT         NOT NULL,
    ID_Reserva          INT         NOT NULL,
    Cpf                 CHAR(11)    NOT NULL,
    Check_In            DATE        NOT NULL,
    Check_Out           DATE        NOT NULL,
    Status		VARCHAR(15),
    PRIMARY KEY (ID_Reserva),
    FOREIGN KEY (ID_Funcionario) REFERENCES FUNCIONARIO (ID_Funcionario)
        ON UPDATE CASCADE,
    FOREIGN KEY (ID_Quarto) REFERENCES QUARTO (ID_Quarto)
        ON UPDATE CASCADE,
    FOREIGN KEY (Cpf) REFERENCES CLIENTE (Cpf)
        ON UPDATE CASCADE
);

CREATE TABLE LIMPA
(
    ID_Quarto           INT         NOT NULL,
    ID_Funcionario      INT         NOT NULL,
    FOREIGN KEY (ID_Funcionario) REFERENCES FUNCIONARIO (ID_Funcionario)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (ID_Quarto) REFERENCES QUARTO (ID_Quarto)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE EVENTO
(
    ID_Evento           INT             NOT NULL,
    Nome                VARCHAR(30)     NOT NULL,
    ID_Hotel            INT             NOT NULL,
    Data_Inicio         DATE            NOT NULL,
    Data_Fim            DATE            NOT NULL,
    PRIMARY KEY (ID_Evento),
    FOREIGN KEY (ID_Hotel) REFERENCES HOTEL (ID_Hotel)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE FORNECEDOR
(
    ID_Fornecedor           INT             NOT NULL,
    Nome                    VARCHAR(30)     NOT NULL,
    PRIMARY KEY (ID_Fornecedor)
);

CREATE TABLE PRODUTO
(
    ID_Produto          INT             NOT NULL,
    Nome                VARCHAR(30)     NOT NULL,
    PRIMARY KEY (ID_Produto)
);

CREATE TABLE FORNECE
(
    ID_Produto          INT             NOT NULL,
    ID_Fornecedor       INT             NOT NULL,
    FOREIGN KEY (ID_Produto) REFERENCES PRODUTO (ID_Produto)
        ON UPDATE CASCADE,
    FOREIGN KEY (ID_Fornecedor) REFERENCES FORNECEDOR (ID_Fornecedor)
        ON UPDATE CASCADE
);

CREATE TABLE ABASTECE
(
    ID_Hotel          INT             NOT NULL,
    ID_Produto        INT             NOT NULL,
    Data_Entrega      DATE            NOT NULL,
    FOREIGN KEY (ID_Produto) REFERENCES PRODUTO (ID_Produto)
        ON UPDATE CASCADE,
    FOREIGN KEY (ID_Hotel) REFERENCES HOTEL (ID_Hotel)
        ON UPDATE CASCADE
);
