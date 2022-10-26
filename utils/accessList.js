import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AccessTypes, users } from '../models/user';
import stylesButton from '../styles/Button.module.scss'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { accessContextContainer } from '../pages/sharedButton'
import _ from 'lodash'
export default function AccessList({user}) {
const {anchorEl, setAnchorEl} = React.useContext(accessContextContainer)
const [selectedIndex, setSelectedIndex] = React.useState(1);
const handleClick = (event) => {
    if(_.eq(anchorEl,null))
        setAnchorEl(event.currentTarget)
    else
        setAnchorEl(null)
  };
const handleClose = (event, index) => {
    setSelectedIndex(index)
    setAnchorEl(event);
  };

  return (
    <>
      <Button
        disableRipple
        className={stylesButton.Button}
        onClick={(event)=>handleClick(event)}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {user && !_.isEmpty(user.access) ? user.access : Object.values(AccessTypes)[selectedIndex]}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClick={handleClick}
      > {Object.values(AccessTypes).map((value, index)=><MenuItem key={value}
                selected={_.eq(index, selectedIndex)} 
                onClick={(event)=>handleClose(event, index)} 
                >{value}</MenuItem>
    )}
      </Menu>
    </>
  );
}
