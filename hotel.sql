DROP DATABASE REDE_COMPANHIA;

CREATE DATABASE REDE_COMPANHIA;

USE REDE_COMPANHIA;

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
    Cpf                 INT             NOT NULL,
    ID_Funcionario      INT             NOT NULL,
    Nome                VARCHAR(15)     NOT NULL,
    Endereco            VARCHAR(30)     NOT NULL,
    Telefone            INT             NOT NULL,
    PRIMARY KEY (Cpf),
    FOREIGN KEY (ID_Funcionario) REFERENCES FUNCIONARIO (ID_Funcionario)
);

CREATE TABLE COMUNICA
(
    Cpf                 INT         NOT NULL,
    ID_Funcionario      INT         NOT NULL,
    Data_Atendimento    DATE        NOT NULL,
    FOREIGN KEY (Cpf) REFERENCES CLIENTE (Cpf),
    FOREIGN KEY (ID_Funcionario) REFERENCES FUNCIONARIO (ID_Funcionario)
);

CREATE TABLE RECEPCIONISTA
(
    ID_Funcionario      INT             NOT NULL,
    Turno               VARCHAR(10)     NOT NULL,
    Idioma              VARCHAR(30),
    FOREIGN KEY (ID_Funcionario) REFERENCES FUNCIONARIO (ID_Funcionario)
);

CREATE TABLE CAMAREIRA
(
    ID_Funcionario      INT         NOT NULL,
    Horario_Entrada     INT         NOT NULL,
    Horario_Saida       INT         NOT NULL,
    Dias_Disponiveis    INT         NOT NULL,
    FOREIGN KEY (ID_Funcionario) REFERENCES FUNCIONARIO (ID_Funcionario)
);

CREATE TABLE GERENTE
(
    ID_Funcionario      INT         NOT NULL,
    Data_Ingresso       DATE,
    FOREIGN KEY (ID_Funcionario) REFERENCES FUNCIONARIO (ID_Funcionario)
);

CREATE TABLE HOTEL
(
    ID_Hotel         INT             NOT NULL,
    Cep              INT             NOT NULL,
    Nome             VARCHAR(15)     NOT NULL,
    Cidade           VARCHAR(15),
    Estado           VARCHAR(10),
    Telefone         INT             NOT NULL,
    Sauna            BINARY,
    Piscina          BINARY,
    Salao_De_Jogos   BINARY,
    PRIMARY KEY (ID_Hotel)
);

CREATE TABLE QUARTO
(
    ID_Quarto           INT             NOT NULL,
    ID_Hotel            INT             NOT NULL,
    Status_Quarto       VARCHAR(10)     NOT NULL,
    Capacidade          INT             NOT NULL,
    N_Banheiros         INT             NOT NULL, 
    Wifi                BINARY,
    ArCondicionado      BINARY,
    Frigobar            BINARY,
    
    PRIMARY KEY (ID_Quarto),
    FOREIGN KEY (ID_Hotel) REFERENCES HOTEL (ID_Hotel)
);

CREATE TABLE RESERVA
(
    ID_Quarto           INT         NOT NULL,
    ID_Funcionario      INT         NOT NULL,
    ID_Reserva          INT         NOT NULL,
    Cpf                 INT         NOT NULL,
    Check_In            DATE        NOT NULL,
    Check_Out           DATE        NOT NULL,
    PRIMARY KEY (ID_Reserva),
    FOREIGN KEY (ID_Funcionario) REFERENCES FUNCIONARIO (ID_Funcionario),
    FOREIGN KEY (ID_Quarto) REFERENCES QUARTO (ID_Quarto),
    FOREIGN KEY (Cpf) REFERENCES CLIENTE (Cpf)
);

CREATE TABLE LIMPA
(
    ID_Quarto           INT         NOT NULL,
    ID_Funcionario      INT         NOT NULL,
    FOREIGN KEY (ID_Funcionario) REFERENCES FUNCIONARIO (ID_Funcionario),
    FOREIGN KEY (ID_Quarto) REFERENCES QUARTO (ID_Quarto)
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
);

CREATE TABLE FORNECEDOR
(
    ID_Fornecedor           INT             NOT NULL,
    Nome                    VARCHAR(30)     NOT NULL,
    Data_Entrega            DATE            NOT NULL,
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
    FOREIGN KEY (ID_Produto) REFERENCES PRODUTO (ID_Produto),
    FOREIGN KEY (ID_Fornecedor) REFERENCES FORNECEDOR (ID_Fornecedor)
);

CREATE TABLE ABASTECE
(
    ID_Hotel          INT             NOT NULL,
    ID_Produto        INT             NOT NULL,
    FOREIGN KEY (ID_Produto) REFERENCES PRODUTO (ID_Produto),
    FOREIGN KEY (ID_Hotel) REFERENCES HOTEL (ID_Hotel)
);

