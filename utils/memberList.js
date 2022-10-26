import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AccessList from './accessList';
import { accessContextContainer } from '../pages/sharedButton';
import Box from '@mui/material/Box';
import { users, groups } from '../models/user'
export default function AlignItemsList() {
    const usersAndGroups = [users,groups].flat()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        if(anchorEl!==null)
            setAnchorEl(null)
        else
            setAnchorEl(event.currentTarget.children[2]);
      };
  return (
    <Box style={{maxHeight: 200, overflow: 'auto', width: '-webkit-fill-available'}}>
    <List style={{ bgcolor: 'background.paper', width: 'inherit' }}>
        {usersAndGroups.map((value, index)=>
            (<ListItemButton
                    disableRipple
                    disableTouchRipple
                    key={value.name}
                    alignItems="flex-start"
                    onClick={(event)=>handleClick(event, value)}
                    >
                      <ListItemAvatar>
                        <Avatar alt={value.name} src="/static/images/avatar/1.jpg"/>
                      </ListItemAvatar>
                      <ListItemText
                        primary={value.name}
                        style={{ width:'50px' }}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              Member Info
                            </Typography>
                          </React.Fragment>
                        }
                      />
                      <accessContextContainer.Provider value={{anchorEl, setAnchorEl}}>
                        <AccessList user={value}></AccessList>
                      </accessContextContainer.Provider>
                    </ListItemButton>)
      )}
    </List>
    </Box>
  );
}
