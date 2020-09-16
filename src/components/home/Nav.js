import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Drawer, List, Typography, Divider, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import { Home, Web, Mouse, Star, List as ListIcon, EventAvailable, Settings } from '@material-ui/icons'

//  Default nav items and default set to Listings and others are invalid

const navItems = [
    {
        icon : <Home />,
        text : "Dashboard"
    },
    {
        icon : <Web />,
        text : "Website"
    },
    {
        icon : <Mouse />,
        text : "Visitors"
    },
    {
        icon : <Star />,
        text : "Reviews"
    },
    {
        icon : <ListIcon />,
        text : "Listings",
        sel : true
    },
    {
        icon : <EventAvailable />,
        text : "Appointments"
    },
    {
        icon : <Settings />,
        text : "Settings"
    }
]

const useStyles = makeStyles(theme => ({
    drawer : {
        flexShrink : 0,
        width : 270,
    },
    toolbar : {
        backgroundColor : '#009688',
        height : 74
    },
    drawerPaper: {
        width: 270,
        backgroundColor : '#33ab9f'
      },
    typography : {
        marginTop : 15,
        color : 'white',
        fontSize : 25,
        letterSpacing : 2,
    }

}))

const Nav = () => {
    const classes = useStyles()

    return(
       <div>
           <Drawer
            variant='permanent'
            className={classes.drawer}
            anchor="left"
            classes={{paper: classes.drawerPaper}}
           >
                <div className={classes.toolbar}>
                    <Typography 
                        className={classes.typography} 
                        align="center" 
                        color="primary" 
                        variant="h6">
                            GROWTH PLUG
                    </Typography>
                </div>
                <Divider />
                <List>
                    {navItems.map(item => (
                        <ListItem 
                            button key={item.text} 
                            selected={item.sel ? true : false} 
                            style={{ color : 'white'}}
                        >
                            <ListItemIcon style={{ color : 'white'}}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItem>
                    ))}
                </List>
           </Drawer>
       </div>
    )
}

export default Nav 