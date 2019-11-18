from flask import Flask, request
from flask_cors import CORS
import pandas as pd
import json
from sqlalchemy import create_engine

app = Flask(__name__)


app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'andre'
app.config['MYSQL_PASSWORD'] = 'andre1234'
app.config['MYSQL_DB'] = 'REDE_HOTELEIRA'
cors = CORS(app)
engine = create_engine("mysql://andre:andre1234@localhost/REDE_HOTELEIRA")

@app.route('/EVENTO', methods=['GET'])
def evento():
    if request.method == "GET":
        df = pd.read_sql("""SELECT * FROM EVENTO""", con=engine)
        df.Data_Inicio = df.Data_Inicio.apply(lambda x: x.strftime('%d/%m/%Y'))
        df.Data_Fim = df.Data_Fim.apply(lambda x: x.strftime('%d/%m/%Y'))
        return json.loads(json.dumps(df.to_dict(orient="index")))

@app.route('/CLIENTE', methods=['GET'])
def cliente():
    if request.method == "GET":
        df = pd.read_sql("""SELECT * FROM CLIENTE""", con=engine)
        return json.loads(json.dumps(df.to_dict(orient="index")))

@app.route('/RESERVA', methods=['GET'])
def reserva():
    if request.method == "GET":
        df = pd.read_sql("""SELECT * FROM RESERVA""", con=engine)
        df.Check_In = df.Check_In.apply(lambda x: x.strftime('%d/%m/%Y'))
        df.Check_Out = df.Check_Out.apply(lambda x: x.strftime('%d/%m/%Y'))
        return json.loads(json.dumps(df.to_dict(orient="index")))

@app.route('/QUARTO', methods=['GET'])
def quarto():
    if request.method == "GET":
        df = pd.read_sql("""SELECT * FROM QUARTO""", con=engine)
        df.Wifi = df.Wifi.apply(lambda x: 'Sim' if('1' in str(x)) else 'Não')
        df.ArCondicionado = df.ArCondicionado.apply(lambda x: 'Sim' if('1' in str(x)) else 'Não')
        df.Frigobar = df.Frigobar.apply(lambda x: 'Sim' if('1' in str(x)) else 'Não')
        return json.loads(json.dumps(df.to_dict(orient="index")))

@app.route('/ABASTECE', methods=['GET'])
def abastece():
    if request.method == "GET":
        df = pd.read_sql("""SELECT * FROM ABASTECE""", con=engine)
        df.Data_Entrega = df.Data_Entrega.apply(lambda x: x.strftime('%d/%m/%Y'))
        return json.loads(json.dumps(df.to_dict(orient="index")))

@app.route('/CAMAREIRA', methods=['GET'])
def camareira():
    if request.method == "GET":
        df = pd.read_sql("""SELECT * FROM CAMAREIRA""", con=engine)
        return json.loads(json.dumps(df.to_dict(orient="index")))

@app.route('/COMUNICA', methods=['GET'])
def comunica():
    if request.method == "GET":
        df = pd.read_sql("""SELECT * FROM COMUNICA""", con=engine)
        df.Data_Atendimento = df.Data_Atendimento.apply(lambda x: x.strftime('%d/%m/%Y'))
        return json.loads(json.dumps(df.to_dict(orient="index")))

@app.route('/FORNECE', methods=['GET'])
def fornece():
    if request.method == "GET":
        df = pd.read_sql("""SELECT * FROM FORNECE""", con=engine)
        return json.loads(json.dumps(df.to_dict(orient="index")))

@app.route('/FORNECEDOR', methods=['GET'])
def fornecedor():
    if request.method == "GET":
        df = pd.read_sql("""SELECT * FROM FORNECEDOR""", con=engine)
        return json.loads(json.dumps(df.to_dict(orient="index")))

@app.route('/FUNCIONARIO', methods=['GET'])
def funcionario():
    if request.method == "GET":
        df = pd.read_sql("""SELECT * FROM FUNCIONARIO""", con=engine)
        return json.loads(json.dumps(df.to_dict(orient="index")))

@app.route('/GERENTE', methods=['GET'])
def gerente():
    if request.method == "GET":
        df = pd.read_sql("""SELECT * FROM GERENTE""", con=engine)
        df.Data_Ingresso = df.Data_Ingresso.apply(lambda x: x.strftime('%d/%m/%Y'))
        return json.loads(json.dumps(df.to_dict(orient="index")))

@app.route('/HOTEL', methods=['GET'])
def hotel():
    if request.method == "GET":
        df = pd.read_sql("""SELECT * FROM HOTEL""", con=engine)
        df.Sauna = df.Sauna.apply(lambda x: 'Sim' if('1' in str(x)) else 'Não')
        df.Piscina = df.Piscina.apply(lambda x: 'Sim' if('1' in str(x)) else 'Não')
        df.Salao_De_Jogos = df.Salao_De_Jogos.apply(lambda x: 'Sim' if('1' in str(x)) else 'Não')
        return json.loads(json.dumps(df.to_dict(orient="index")))

@app.route('/LIMPA', methods=['GET'])
def limpa():
    if request.method == "GET":
        df = pd.read_sql("""SELECT * FROM LIMPA""", con=engine)
        return json.loads(json.dumps(df.to_dict(orient="index")))

@app.route('/PRODUTO', methods=['GET'])
def produto():
    if request.method == "GET":
        df = pd.read_sql("""SELECT * FROM PRODUTO""", con=engine)
        return json.loads(json.dumps(df.to_dict(orient="index")))

@app.route('/RECEPCIONISTA', methods=['GET'])
def recepcionista():
    if request.method == "GET":
        df = pd.read_sql("""SELECT * FROM RECEPCIONISTA""", con=engine)
        return json.loads(json.dumps(df.to_dict(orient="index")))


if __name__ == '__main__':
    app.run()