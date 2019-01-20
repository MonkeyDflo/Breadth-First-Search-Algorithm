import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function OutlinedButtons(props) {
  const { classes } = props;
  return (
    <div>
      
      <Button variant="outlined" href="#outlined-buttons" className={classes.button}>
        Link
      </Button>
      <Button variant="outlined" href="#outlined-buttons" className={classes.button}>
        Link
      </Button>
      <Button variant="outlined" href="#outlined-buttons" className={classes.button}>
        Link
      </Button>
      <Button variant="outlined" href="#outlined-buttons" className={classes.button}>
        Link
      </Button>
      
    </div>
  );
}

OutlinedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedButtons);