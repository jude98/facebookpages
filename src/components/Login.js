import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import Auth from './Auth'
import '../App.css'
import { Button, Icon } from '@material-ui/core' 
import { makeStyles } from '@material-ui/core/styles'
import { facebookContext } from './state/UserDetails'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, faFacebook } from '@fortawesome/free-brands-svg-icons'

library.add(fab,faFacebook)

const useStyles = makeStyles((theme) => ({
    button: {
      fontSize : '1.5rem',
      fontWeight : '900'
    },
    fbicon : {
        marginRight : 20,
    },
    login : {
        backgroundColor:"black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh"
    }
  }));

//  The permissions to be allowed by user

const scope = "email,pages_manage_cta,pages_show_list,pages_read_engagement,pages_manage_metadata,pages_read_user_content,public_profile"

const Login = (props) => {
    const [ , dispatch, ACTIONS ] = useContext(facebookContext)
    const classes = useStyles();

    useEffect(() => {
        window.FB.getLoginStatus(function(response){
            if(response.status === 'not_authorized') alert('Try to Login after loging out of other facebook accounts in the browser')
        })
    },[])   

    // Get info of each page (location, phone, name, about, rating, mission, acces_token, id)

    const getEachPageInfo = page => {
        const cancelToken = axios.CancelToken.source()
        axios.get(`https://graph.facebook.com/${page.id}?fields=location,phone,name,about,overall_star_rating,mission,access_token&access_token=${page.access_token}`,
        {cancelToken:cancelToken.token})
        .then(response => {
            dispatch({type : ACTIONS.GET, payload : {details : response.data}})
        })
        return () => cancelToken.cancel()
        
    }

    // Get the info of pages handled by user

    const getPageInfo = (response) => {
        axios.get(`https://graph.facebook.com/${response.authResponse.userID}/accounts?access_token=${response.authResponse.accessToken}`)
        .then(res => {
            res.data.data.forEach(page => {
               getEachPageInfo(page)
            })
        })
        .catch(e => console.log(e))
    }

    // Loads the users information is authorised.

    const handleLogin = () => {
        window.FB.login(function(response){
            if(response.status === 'not_authorized' || response.status === 'unknown') alert('User cancelled login or did not fully authorize!! Try to log out from the browser')
            else{
                console.log(response)
                Auth.login(() => {
                    props.history.push('/home')
                })
                getPageInfo(response)
            }
        },{scope : scope})
    }
        
    return(
        <div className={classes.login}>
            <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            onClick={handleLogin}
            startIcon={<FontAwesomeIcon className={classes.fbicon} icon={['fab','facebook-f']} />}
      >
        Login With Facebook
      </Button>
        </div>
    )    
}

export default Login