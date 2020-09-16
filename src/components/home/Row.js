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
    const [ mission, setMission ] = useState(listing.mission)
    
    // Handle the update (about, phone and mission are updatable fields)
    const handleUpdate = () => {
        setEdit(prev => !prev)
        if(listing.id > 4) {
            axios.post(`https://graph.facebook.com/${listing.id}?about=${about}&phone=${phone}&mission=${mission}&access_token=${listing.access_token}`)
            .then(response => {
                if(response.status === 200) {
                    dispatch({type: ACTIONS.CHANGE, payload:{about : about, phone : phone, mission : mission,  id : listing.id}})
                    alert('Successfully Updated')
                }
                else alert("Couldn't Update.. Status : "+response.status)
            })
        }
        else dispatch({type: ACTIONS.CHANGE, payload:{about : about, phone : phone, mission : mission,  id : listing.id}})
        
    }
    
    //  When Edit icon is clicked, edit state changes to true
    const handleEdit = () => {
        setEdit(prev => !prev)
    }
    
    //  To cancel the edit. The cross symbol
    const handleCancel = () => {
        setAbout(listing.name)
        setPhone(listing.phone)
        // edit state changes to false
        setEdit(prev => !prev)
    }

    return(
        <React.Fragment>
            {/* ICON  */}
            <TableCell align="center" style={{fontSize : '1.4rem'}}>
                {listing.icon}
            </TableCell>
            {/* SOURCE */}
            <TableCell align="center">{listing.source}</TableCell>
            {/* NAME */}
            <TableCell align="center">{listing.name}</TableCell>
            {/* ABOUT. Editable */}
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
            {/* MISSION. Editable */}
            <TableCell align="center">
                {edit ? 
                    <TextField 
                        name='mission' 
                        value={mission} 
                        onChange={e => setMission(e.target.value)} 
                        color='secondary'
                    /> : 
                    listing.mission}
            </TableCell>
            {/* ADDRESS */}
            <TableCell align="center">{listing.address}</TableCell>
            {/* PHONE. Editable */}
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
            {/* RATING */}
            <TableCell align="center">{listing.rating}</TableCell>
            {/* LISTED */}
            <TableCell align="center">{listing.listed ? 'Yes': 'No'}</TableCell>
            {/* STATUS. Can cancle the edit on cross icon */}
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
            {/* UPDATE. Update editable fields on click */}
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