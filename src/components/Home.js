import React,{ useContext } from 'react'
import Nav from './home/Nav'
import Appbar from './home/Appbar'
import { makeStyles } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import Listings from './home/Listings'
import Auth from './Auth'
import { facebookContext } from './state/UserDetails'

const useStyles = makeStyles({
    home : {
        display : 'flex'
    }
})

const Home = (props) => {
    const classes = useStyles()
    const [, dispatch, ACTIONS] = useContext(facebookContext)

    // Logs out of the current user from the app
    const handleLogout = () => {
        window.FB.logout(function(response){
            console.log(response)
        })
        dispatch({type : ACTIONS.DEL})
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