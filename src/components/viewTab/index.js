import React from 'react'
import { TabWrapper } from 'components/ui'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import storeContext from 'store'

const ViewTab = () => {
    const [{ form }] = React.useContext(storeContext)

    return (
        <TabWrapper>
            <Box width="100%" display="flex" alignItems="center" flexDirection="column">
                <Typography variant="h6">Country:</Typography>
                <Typography gutterBottom variant="body1">
                    {form.country}
                </Typography>

                <Typography variant="h6">City:</Typography>
                <Typography gutterBottom variant="body1">
                    {form.city}
                </Typography>

                <Typography variant="h6">Postal code:</Typography>
                <Typography gutterBottom variant="body1">
                    {form.postal_code}
                </Typography>

                <Typography variant="h6">Street address:</Typography>
                <Typography gutterBottom variant="body1">
                    {form.street_address}
                </Typography>

                <Typography variant="h6">Street number:</Typography>
                <Typography gutterBottom variant="body1">
                    {form.street_number}
                </Typography>

                <Typography variant="h6">Room type:</Typography>
                <Typography gutterBottom variant="body1">
                    {form.room_type}
                </Typography>

                <Typography variant="h6">Room:</Typography>
                <Typography gutterBottom variant="body1">
                    {form.room}
                </Typography>
            </Box>
        </TabWrapper>
    )
}

export default ViewTab
