import React, { useContext } from 'react'
import axios from 'axios'
import FacebookLogin from 'react-facebook-login'
import Auth from './Auth'
import '../App.css'
import { facebookContext } from './state/UserDetails'

//  The permissions to be allowed by user

const scope = "email,pages_manage_cta,pages_show_list,pages_read_engagement,pages_manage_metadata,pages_read_user_content,public_profile"

const Login = (props) => {
    const [ , dispatch, ACTIONS ] = useContext(facebookContext)

    // Get info of each page (location, phone, name, about, rating, acces_token, id)

    const getEachPageInfo = page => {
        const cancelToken = axios.CancelToken.source()
        axios.get(`https://graph.facebook.com/${page.id}?fields=location,phone,name,about,overall_star_rating,access_token&access_token=${page.access_token}`,{cancelToken:cancelToken.token})
        .then(response => {
            dispatch({type : ACTIONS.GET, payload : {details : response.data}})
        })
        return () => cancelToken.cancel()
        
    }

    // Get the info of pages handled by user

    const getPageInfo = (response) => {
        axios.get(`https://graph.facebook.com/${response.userID}/accounts?access_token=${response.accessToken}`)
        .then(res => {
            res.data.data.forEach(page => {
               getEachPageInfo(page)
            })
        })
        .catch(e => console.log(e))
    }

    // Loads the users information is authorised.

    const responseFacebook = (response) => {
        console.log(response)
        if(response.status === 'unknown' || response.status === 'not_authorized'){
            console.log('not allowed')
        }else{
            Auth.login(() => {
                props.history.push('/home')
            })
            
            getPageInfo(response)
        }

    }
        
    return(
        <div className="login">
            <FacebookLogin 
                appId='3672394659438713'
                fields="name,email,picture"
                scope={scope}
                callback={responseFacebook}
                icon="fa-facebook"
            />
        </div>
    )

    

   
    
}

export default Login