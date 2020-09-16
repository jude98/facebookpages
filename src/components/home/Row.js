import React, { useState, useContext } from 'react'
import { facebookContext } from '../state/UserDetails'
import { TableCell, TextField, Button } from '@material-ui/core'
import { Edit, Close, Done } from '@material-ui/icons'
import axios from 'axios'

//  Component for each row of table.

const Row = ({ listing }) => {
    const [ ,dispatch, ACTIONS ] = useContext(facebookContext)
    const [ edit, setEdit ] = useState(false)
    const [ about ,setAbout ] = useState(listing.about)
    const [ phone, setPhone ] = useState(listing.phone)
    
    // Handle the update (only few feilds can be updated)
    const handleUpdate = () => {
        setEdit(prev => !prev)
        if(listing.id > 4) {
            axios.post(`https://graph.facebook.com/${listing.id}?about=${about}&phone=${phone}&access_token=${listing.access_token}`)
            .then(response => console.log(response))
        }
        dispatch({type: ACTIONS.CHANGE, payload:{about : about, phone : phone, id : listing.id}})
    }
    
    const handleEdit = () => {
        setEdit(prev => !prev)
    }
    
    const handleCancel = () => {
        setAbout(listing.name)
        setPhone(listing.phone)
        setEdit(prev => !prev)
    }

    return(
        <React.Fragment>
            <TableCell align="center" style={{fontSize : '1.4rem'}}>
                {listing.icon}
            </TableCell>
            <TableCell align="center">{listing.source}</TableCell>
            <TableCell align="center">{listing.name}</TableCell>
            <TableCell align="center">
                {edit ? 
                    <TextField 
                        name='about' 
                        value={about} 
                        onChange={e => setAbout(e.target.value)} 
                        color='secondary'
                    /> : 
                    listing.about}
            </TableCell>
            <TableCell align="center">{listing.address}</TableCell>
            <TableCell align="center">
                {edit ? 
                    <TextField 
                        name='phone' 
                        value={phone} 
                        onChange={e => setPhone(e.target.value)} 
                        color='secondary'
                    /> : 
                    listing.phone}
            </TableCell>
            <TableCell align="center">{listing.rating}</TableCell>
            <TableCell align="center">{listing.listed ? 'Yes': 'No'}</TableCell>
            <TableCell align="center">
                {edit ?
                    <Close 
                        color="secondary" 
                        style={{fontSize : 35}} 
                        onClick={handleCancel} 
                    /> :
                    <Done style={{fontSize : 35,color: "#4caf50" }} />        
                }
            </TableCell>
            <TableCell align="center">
                {edit ? 
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleUpdate}
                    >
                        Update
                    </Button> :
                    <Edit color="primary" onClick={handleEdit} />
                }
            </TableCell>
    </React.Fragment>
    )
}

export default Row