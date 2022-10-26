import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import stylesButton from '../styles/Button.module.scss'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Divider from '@mui/material/Divider';
import { makeStyles } from '@mui/styles';
import AlignItemsList from '../utils/memberList';
import ListItem from '@mui/material/ListItem';
import { groups, users } from '../models/user';
import AccessList from '../utils/accessList';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Collapse from '@mui/material/Collapse';
import PublicIcon from '@mui/icons-material/Public';
import HelpIcon from '@mui/icons-material/Help';
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import LinkIcon from '@mui/icons-material/Link';
import stylesForm from '../styles/Form.module.scss';
import stylesFooter from '../styles/FooterListItem.module.scss'
export const accessContextContainer = React.createContext(null);
const useStyles = makeStyles(() => ({
    menuItem: {
        padding: '0px'
    }
}))

const SlideSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: '#1890ff',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
    },
  }));

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    width: 512,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function SharedButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchExpand, setSearchExpand] = useState(false);
  const [endAdAnchorEl, setEndAdAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const usersAndGroups = [users,groups].flat()
  const open = Boolean(anchorEl);
  const classes = useStyles()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const getAutoCompleteWidth = () => {
    return searchExpand ? 490 : 380
  }
  const getInviteButtonDisplay = () => {
    return searchExpand ? 'none' : 'block'
  }
  const [state, setState] = React.useState({
    edit: true,
    comment: false,
    duplicate: true,
  });
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };
  const [checked, setChecked] = React.useState(false);
  const handleCollapseChange = () => {
    setChecked((prev) => !prev);
  };
  return (
    <div>
      <Button
        disableElevation
        onClick={handleClick}
        className={stylesButton.Button}
      >
        Share
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <ListItem disableRipple style={{ padding: 12}}>
            <Box style={{ display: 'flex', width:'-webkit-fill-available'}}>
            <Autocomplete
                multiple
                id="tags-outlined"
                options={usersAndGroups.flat()}
                disableClearable
                fullWidth
                limitTags={1}
                forcePopupIcon={false}
                style={{ width: getAutoCompleteWidth(), borderRadius: '20px 0px 0px 20px', marginRight:'10px' }}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option)=>{
                    return <ListItemButton
                                key={option.name}
                                alignItems="flex-start"
                                {...props}
                                onClickCapture={console.log("Captured")}
                                >
                                  <ListItemAvatar>
                                    <Avatar alt={option.name} src="/static/images/avatar/1.jpg" />
                                  </ListItemAvatar>
                                  <ListItemText
                        primary={option.name}
                        
                      />
                            </ListItemButton>
            }
            }   
                filterSelectedOptions
                renderInput={(params) => {
                    return (
                        <Box><TextField
                            {...params}
                            className={stylesFooter.div}
                            onClick={() => setSearchExpand(true)}
                            onBlur={() => setSearchExpand(false)}
                            placeholder="Add people groups"
                            InputProps={{...params.InputProps, endAdornment:
                        <accessContextContainer.Provider value={{ anchorEl:endAdAnchorEl, setAnchorEl:setEndAdAnchorEl }}>
                            <AccessList></AccessList>
                        </accessContextContainer.Provider>}}
                        >
                        </TextField>
                        </Box>
                )}} />
            <Button
                variant="contained"
                disableElevation
                style={{display: getInviteButtonDisplay()}}
                className={stylesButton.InviteButton}
            >
                Invite
            </Button>
            </Box>
        </ListItem>
        <ListItem disableRipple disableGutters className={classes.menuItem}>
            <AlignItemsList/>
        </ListItem>
        <Divider sx={{ my: 0.5 }} />
        <ListItem disableRipple >
            <Box className={stylesFooter.Box}>
                <Box className={stylesFooter.flexBox} onClick={handleCollapseChange}>
                <div className={stylesFooter.stylediv} >
                <PublicIcon></PublicIcon>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection:'column'
                }}>
                <Typography
                className={stylesFooter.typo}
                component="span"
                variant="body2"
                color="text.primary"
                >
                    Share to Web
                </Typography>
                <Typography
                className={stylesFooter.typo}
                // sx={{ display: 'inline', paddingLeft:'5px'}}
                component="span"
                variant="body2"
                color="text.primary"
                >
                    Anyone can view this link
                </Typography>
                </div>
                </div>
                    <FormControlLabel
                        className={stylesForm.FormControlLabel}
                        control={<SlideSwitch checked={checked}/>}
                    />
                </Box>
                <Collapse in={checked}>
                <FormControl component="fieldset" variant="standard" className={stylesButton.FooterBox}>
                    <FormLabel component="legend" className={stylesButton.PaddedFooterBox}><TextField
                                placeholder="web link..."
                                className={stylesButton.FooterBox}
                                inputProps={{
                                    style:{ padding: '5px', fontSize:'small' }
                                }}
                                InputProps={{
                                    style:{height: '30px', padding:'0', paddingLeft:'5px'},
                                    endAdornment:<Button
                                    disableRipple
                                    className={stylesButton.ButtonCopy}
                                >
                                    Copy
                                </Button>}}
                            >
                            </TextField>
                        </FormLabel>    
                    <FormGroup className={stylesForm.FormGroup}>
                    <Box >
                        <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                        seco>
                            Allow editing
                        </Typography>
                        <FormControlLabel 
                        className={stylesForm.FormControlLabel}
                        control={
                            <SlideSwitch checked={state.edit} onChange={handleChange} name="edit" />
                        }
                        />
                    </Box>
                        <Box onClick={handleChange}>
                            <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                            seco>
                                Allow comments
                            </Typography>
                            <FormControlLabel
                            className={stylesForm.FormControlLabel}
                            control={
                                <SlideSwitch checked={state.comment} onChange={handleChange} name="comment" />
                            }
                            />
                            </Box>          
                        <Box onClick={handleChange}>
                            <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                            seco>
                                Allow duplicate as template
                            </Typography>
                            <FormControlLabel
                            className={stylesForm.FormControlLabel}
                            control={
                                <SlideSwitch checked={state.duplicate} onChange={handleChange} name="duplicate" />
                            }
                            />
                            </Box>
                        </FormGroup>
                </FormControl>
                </Collapse>
            </Box>
        </ListItem>
        <Divider sx={{ my: 0.5 }} />
        <ListItem disableRipple disableGutters className={classes.menuItem}>
        <Box className={stylesButton.FooterBox}>
            <Button
            className={stylesButton.LearnButton}
            endIcon={<HelpIcon />}
            >
           Learn more
            </Button>
            <Box className={stylesButton.MoreOptionsBox}>
            <Button
            className={stylesButton.MoreOptionsButton}
            startIcon={<TurnLeftIcon />}
            >
           Move to
            </Button>
            <Button
            className={stylesButton.MoreOptionsButton}
            startIcon={<LinkIcon />}
            >
           Copy Link
            </Button>
            </Box>
        </Box>
        </ListItem>
      </StyledMenu>
    </div>
  );
}
