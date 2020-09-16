import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Auth from './Auth'

//  Implemented to allow only authorised users to access the listings page so that if not authenticted it wont show listing page

const RestrictedRoute = ({component : Component, ...rest}) => {
    return(
        <Route {...rest} 
            render={props => {
                if(Auth.status()) {
                    return <Component {...props} />
                }
                else{
                    return(
                        <Redirect
                            to={{
                                pathname:'/',
                                state: {
                                    from : props.location
                                }
                            }}
                        />
                    )
                }
            }}
        />
    )
}

export default RestrictedRoute