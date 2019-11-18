import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import UserFilter from './components/UserFilter/UserFilter';
import TableFilter from './components/TableFilter/TableFilter';
import Table from './components/Table/Table';
import Paper from '@material-ui/core/Paper';
import AppContext from './AppContext';


const filterPaper = {
  alignItems: 'center',
  backgroundColor: 'light-gray',
}

const gerenteTables = [
  'ABASTECE', 'CAMAREIRA', 'CLIENTE', 'COMUNICA',
  'EVENTO', 'FORNECE', 'FORNECEDOR', 'FUNCIONARIO',
  'GERENTE', 'HOTEL', 'LIMPA', 'PRODUTO', 'QUARTO',
  'RECEPCIONISTA', 'RESERVA'
];

const recepcionistaTables = ['CLIENTE', 'RESERVA', 'QUARTO'];

class App extends Component {

  constructor() {
    super();
    this.state = {
      selectedUser: 'Recepcionista',
      users: ['Recepcionista', 'Gerente'],
      tables: ['CLIENTE', 'RESERVA', 'QUARTO'],
      currentTable: 'CLIENTE',
      tableColumns: [],
      tableData: [],
    }

    this.updateSelectedUser = (event) => {
      let { currentTable } = this.state;
        
      if (event.target.value === 'Recepcionista') {
        currentTable = recepcionistaTables.includes(currentTable) ? currentTable : recepcionistaTables[0] 
        this.populateTable(currentTable);
        this.setState({
          selectedUser: event.target.value,
          tables: recepcionistaTables,
          currentTable,
        })
      } else {
        this.populateTable(currentTable);
        this.setState({
          selectedUser: event.target.value,
          tables: gerenteTables,
        })
      }
    };

    this.updateCurrentTable = (event) => {
      this.populateTable(event.target.value);
      this.setState({
        currentTable: event.target.value,
      })
    }


    this.populateTable = (currentTable) => {
      const tableData = [];
      const tableColumns = [];
      
      axios.get(`http://0.0.0.0:5000/${currentTable}`, {
        params: {},
      }).then((resData) => {
        const receivedData = resData.data;
        const keys = Object.keys(receivedData);

        keys.forEach((key) => {
          tableData.push(receivedData[key]);
        });
        
        Object.keys(receivedData[keys[0]]).forEach((key) => {
          tableColumns.push({
            'title': key,
            'field': key,  
          });
        });

        this.setState({
          tableColumns,
          tableData,
        })

      });
    }
  }

  componentDidMount() {
    const { currentTable } = this.state;
    this.populateTable(currentTable);
  }

  render() {
    const { updateSelectedUser, updateCurrentTable } = this;
    const contextValue = {
      ...this.state,
      updateSelectedUser,
      updateCurrentTable,
    }

    return (
      <div style={{ margin: '30px 10px 0px 10px' }}>
        <AppContext.Provider value={contextValue}>
          <Grid container>
            <Grid item xs={3}>
              <Paper style={filterPaper}>
                <UserFilter />
              </Paper>
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={3}>
              <Paper style={filterPaper}>
                <TableFilter />
              </Paper>
            </Grid>
            <Grid item xs={5} />
            <Grid item xs={12}>
              <div style={{ marginTop: '15px' }}>
                <Paper style={filterPaper}>
                  <Table />
                </Paper>
              </div>
            </Grid>
          </Grid>
        </AppContext.Provider>
      </div>
    );
  }
}

export default App;
