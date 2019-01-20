import React from 'react';
import './Toolbar.css';



const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 300,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      result: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.generateArray = this.generateArray.bind(this);
    this.displayArray = this.displayArray.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  generateArray(arr) {
    return arr.map((val, index) => ({
      id: index,
      name: val,
    }))
  }

  handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.target);
    fetch('http://127.0.0.1:8080/upload', {
      method: 'POST',
      body: data
    })
    .then(result => {
      return result.json();
    })
    .then(response => {
      this.setState({
        result: response.result
      })
    })
  }

  displayArray(item) {
    const { classes } = this.props;
    const { traject }  = item
    return (
    
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Day</TableCell>
                <TableCell>Planet</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                traject.map((planete, id) => (
                <TableRow key={id}>
                  <TableCell>{id}</TableCell>
                  <TableCell>{planete}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        {
          `${item.percentage}% chance of success`
        }
        
      </div>
    )
  }

  
const formTab = props => (
    const { name, result } = this.state
    <form onSubmit={this.handleSubmit}>
                <label>
                Send Empire Plan :
                <input id='name' name='name' type="file" value={name} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>
         
        <div>
          {
            result.map(item => this.displayArray(item))
          }
        </div>
    
);

export default formTab;