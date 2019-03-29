import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchIcon from "@material-ui/icons/Search";
import ReplayIcon from "@material-ui/icons/Sync";
import ErrorOutlinedIcon from "@material-ui/icons/ErrorOutlined";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import InputBase from "@material-ui/core/InputBase";
import {fade} from "@material-ui/core/styles/colorManipulator";

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 'bold',
    paddingTop: theme.spacing.unit,
    color: 'white',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },

  ovalButton: {
    width: '36px',
    height: '36px',
  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing.unit,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },

  rightIconsArea: {
    right: 0,
    position: 'absolute',
    padding: 0,
    margin: 0,
  },

  avatar: {
    margin: 2,
    width: 5,
    height: 5,
  },

  button: {
    marginRight: 0
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  rightIconRotating: {
    marginLeft: theme.spacing.unit,
    animation: `spin 0.8s linear infinite`

  },

  "@keyframes spin": {
    from: {transform: 'rotate(360deg);'},
    to: {transform: 'rotate(0deg);'}
  },
});

class StackHeader extends PureComponent {

  static propTypes = {
    isExpanded: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      isExpanded: props.isExpanded,
    };

    this.onExpandStateChangeHandler = this.onExpandStateChangeHandler.bind(this);
  }

  componentWillReceiveProps(props, _) {
    if (props.isExpanded !== this.state.isExpanded) {
      this.setState({
        isExpanded: props.isExpanded,
      });
    }
  }

  onExpandStateChangeHandler() {
    this.setState({isExpanded: !this.state.isExpanded});
  }

  render() {
    const { classes } = this.props;
    return (
      <ExpansionPanel expanded={false} style={{backgroundColor: '#3E9DEC', color: 'white'}}>
        <ExpansionPanelSummary >
          <Typography className={classes.heading}>Stack: </Typography>
          <div className={classes.search} style={{pointerEvents:'all'}}>
            <InputBase
              placeholder="enter name…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
          <div>
            <Fab size="small" color="default" aria-label="Add" className={classes.ovalButton}>
              <SearchIcon />
            </Fab>
          </div>
          <div className={classes.rightIconsArea} style={{pointerEvents:'all'}}>
            <Button variant="contained" color="default" className={classes.button}>
              Deploy
              <CloudUploadIcon className={classes.rightIcon}  color="primary"/>
              <ReplayIcon className={classes.rightIconRotating}  color="primary"/>
            </Button>
          </div>
        </ExpansionPanelSummary>
      </ExpansionPanel>
    );
  }
}

export default withStyles(styles)(StackHeader);
