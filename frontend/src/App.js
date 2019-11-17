import React, {Component} from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Filter from './components/UserFilter/UserFilter';
import Paper from '@material-ui/core/Paper';
import AppContext from './AppContext';


const filterPaper = {
    alignItems: 'center',
    backgroundColor: 'light-gray',
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      selectedUser: '', 
      users: ['Recepcionista', 'Gerente'],
    }
  
    this.updateSelectedUser = (event) => {
      this.setState({
        selectedUser: event.target.value,
      })
    };
  
  }

  componentDidMount() {
    axios.get(`http://0.0.0.0:5000/oi`, {
      params: {},
    }).then((resData) => {
      console.log(resData.data);
    });
  }

  render() {
    const { updateSelectedUser } = this;
    const contextValue = {
      ...this.state,
      updateSelectedUser
    }

    return (
      <AppContext.Provider value={contextValue}>
        <Grid container>
          <Grid item xs={4}>
            <Paper style={filterPaper}>
              <Filter/>
            </Paper>
          </Grid>
        </Grid>
      </AppContext.Provider>
    );
  }
}
export default App;
