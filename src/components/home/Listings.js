import React, { useContext } from 'react'
import { makeStyles, Typography, Table, TableBody, TableContainer, TableRow, TableCell, TableHead, Paper } from '@material-ui/core'
import { facebookContext } from '../state/UserDetails'
import Row from './Row'

//    The Listings Table ..

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    listings : {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3)
    },
    table : {
        minWidth : 650
    },
    heading : {
        margin : 30,
        textTransform : "uppercase"
    }
}))

const Listings = () => {
    const [listings] = useContext(facebookContext)
    const classes = useStyles()
    return(
        <div className={classes.listings}>
            <div className={classes.toolbar} />
            <Typography 
                align="center" 
                variant="h4" 
                className={classes.heading}
            >
                Listings
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell align="center">Source</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">About</TableCell>
                            <TableCell align="center">Mission</TableCell>
                            <TableCell align="center">Address</TableCell>
                            <TableCell align="center">Phone</TableCell>
                            <TableCell align="center">Rating</TableCell>
                            <TableCell align="center">Listed</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Action</TableCell>
                       </TableRow>
                    </TableHead>
                    <TableBody>
                        {listings.map(row => (
                            <TableRow key={row.id}>
                                <Row listing={row} />
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Listings