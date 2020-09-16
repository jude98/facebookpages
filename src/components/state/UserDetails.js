import React, { useReducer, createContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, faFacebook, faGooglePlus, faYelp, faYahoo, faFoursquare } from '@fortawesome/free-brands-svg-icons'

library.add(fab,faFacebook,faGooglePlus,faYelp, faYahoo, faFoursquare)

//  ACTIONS
const ACTIONS = {
    GET : 'get',
    CHANGE : 'change-value'
}

//  Initial State
const initialState = [
    {
        id : "1",
        icon : <FontAwesomeIcon icon={['fab','google-plus-g']} />,
        source : "Google",
        name : "ABC Dental",
        about : "Best Dental",
        address : "2101 California St",
        phone : "111.111.1111",
        mission : 'Provide Best Care',
        rating : "3/5",
        listed : true,
    },
    {
        id : "2",
        icon : <FontAwesomeIcon icon={['fab','yelp']} />,
        source : "Yelp",
        name : "ABC Dental",
        about : "Best Dental Care",
        address : "2101 California St",
        phone : "111.111.1111",
        mission : 'Healthy Thooths',
        rating : "2/5",
        listed : false,
    },
    {
        id : "3",
        icon :  <FontAwesomeIcon icon={['fab','yahoo']} />,
        source : "Yahoo!",
        name : "ABC Dental",
        about : "Dental in DownTown!",
        address : "2101 California St",
        phone : "111.111.1111",
        mission : 'Provide Best Care',
        rating : "3/5",
        listed : true,
    },
    {
        id : "4",
        icon : <FontAwesomeIcon icon={['fab','foursquare']} />,
        source : "Foursqaure",
        name : "ABC Dental",
        about : "Its ABC Dental",
        address : "2101 California St",
        phone : "111.111.1111",
        mission : 'Healthy Thooths',
        rating : "3/5",
        listed : false,
    }
]

// REDUCER function (GET and UPDATE)
const reducer = (listings, action) => {
    switch (action.type) {
        // GET When login state is updated by fetching info from user's page
        case ACTIONS.GET : 
            var {location, phone, name, about, overall_star_rating, mission, access_token, id} = action.payload.details
            var [...newList] = listings
            const pageInfo = {
                id : id,
                access_token : access_token,
                icon : <FontAwesomeIcon icon={['fab','facebook-f']} />,
                source : "Facebook",
                name : name,
                about : about,
                address : location.street,
                phone : phone,
                mission : mission,
                rating : overall_star_rating ? `${overall_star_rating}/5` : 'No rating yet',
                listed : true
            }
            newList.push(pageInfo)
                
            return newList

        // UPDATE When the Update button is clicked and state is updated. Update on facebook page is done at Row Component
        case ACTIONS.CHANGE :
            var {about, phone, mission, id} = action.payload
            const tmpList = listings.map(each => {
                if(each.id === id) {
                    return {...each,about:about,phone:phone,mission:mission}
                }
                return each
            })
            return tmpList
        default : return listings
    }
}

// State is available for all the components
export const facebookContext = createContext()

export const UserDetailsProvider = ({ children }) => {
    const [listings, dispatch] = useReducer(reducer, initialState) 
 
    return(
        <facebookContext.Provider value={[listings, dispatch, ACTIONS]}>
            {children}
        </facebookContext.Provider> 
    )
}
