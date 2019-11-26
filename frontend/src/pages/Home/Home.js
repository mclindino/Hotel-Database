import React from 'react';
import Grid from '@material-ui/core/Grid';
import UserFilter from '../../components/UserFilter/UserFilter';
import TableFilter from '../../components/TableFilter/TableFilter';
import Table from '../../components/Table/Table';
import Paper from '@material-ui/core/Paper';
import AppContext from '../App/AppContext';
import Button from '@material-ui/core/Button';


const filterPaper = {
  alignItems: 'center',
  backgroundColor: 'light-gray',
}

const Home = () => {
  return (
    <AppContext.Consumer>
      {({
        updateCurrentPage, disableInsert, disableDelete, deleteData, updateData, disableUpdate,
      }) => (
          <div>
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
            <Button
              color="primary"
              variant="contained"
              style={{margin: '10px 10px 10px 0px'}}
              disabled={disableInsert}
              onClick={() => updateCurrentPage('insert')}
            >
              Inserir
            </Button>
            <Button
              style={{margin: '10px 10px 10px 0px'}}
              color="primary"
              variant="contained"
              disabled={disableDelete}
              onClick={() => deleteData()}
            >
              Deletar
            </Button>
            <Button
              style={{margin: '10px 10px 10px 0px'}}
              color="primary"
              variant="contained"
              disabled={disableUpdate}
              onClick={() => updateData()}
            >
              Alterar Status
            </Button>
          </div>
        )}
    </AppContext.Consumer>
  );
}

export default Home;