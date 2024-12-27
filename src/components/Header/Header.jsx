import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Trigger hamburger menu for screen widths below "md" (960px by default)

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const menuItems = (
        <List>
            <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
                <ListItemText primary="Home" />
            </ListItem>
            <Divider />
            <ListItem button component={Link} to="/preferences" onClick={toggleDrawer(false)}>
                <ListItemText primary="Preferences" />
            </ListItem>
        </List>
    );

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News Aggregator
                    </Typography>
                    {isMobile ? (
                        <>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={toggleDrawer(true)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Drawer
                                anchor="right"
                                open={drawerOpen}
                                onClose={toggleDrawer(false)}
                            >
                                {menuItems}
                            </Drawer>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/">
                                Home
                            </Button>
                            <Button color="inherit" component={Link} to="/preferences">
                                Preferences
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;
