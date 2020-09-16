import React from 'react'
import Nav from './home/Nav'
import Appbar from './home/Appbar'
import { makeStyles } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import Listings from './home/Listings'
import Auth from './Auth'

const useStyles = makeStyles({
    home : {
        display : 'flex'
    }
})

const Home = (props) => {
    const classes = useStyles()

    const handleLogout = () => {
        Auth.logout(() => props.history.push('/'))
    }
    
    return(
        <div className={classes.home} >
            <CssBaseline />
            <Appbar handleLogout={handleLogout}/>
            <Nav />
            <Listings />
        </div>
    )
}

export default Home