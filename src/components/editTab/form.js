import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { TextField } from 'components/formUI'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

const AddressSchema = () =>
    Yup.object().shape({
        country: Yup.string().required('Required'),
        city: Yup.string().required('Required'),
        postal_code: Yup.string().required('Required'),
        street_address: Yup.string().required('Required'),
        street_number: Yup.string().required('Required'),
        room_type: Yup.string().required('Required'),
        room: Yup.string().required('Required'),
    })

const EditForm = ({ address = {}, onSubmit }) => {
    const formik = {
        initialValues: {
            country: address.country || '',
            city: address.city || '',
            postal_code: address.postal_code || '',
            street_address: address.street_address || '',
            street_number: address.street_number || '',
            room_type: address.room_type || '',
            room: address.room || '',
        },
        onSubmit,
        validationSchema: AddressSchema,
        enableReinitialize: true,
    }

    return (
        <Formik {...formik}>
            <Form>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField id="country" name="country" label="Country" type="text" fullWidth required />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField id="city" name="city" label="City" type="text" fullWidth required />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            id="postal_code"
                            name="postal_code"
                            label="Postal Code"
                            type="number"
                            fullWidth
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            id="street_address"
                            name="street_address"
                            label="Street Name"
                            type="text"
                            fullWidth
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            id="street_number"
                            name="street_number"
                            label="Street Number"
                            type="number"
                            fullWidth
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField id="room_type" name="room_type" label="Room Type" type="text" fullWidth required />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField id="room" name="room" label="Room Number" type="number" fullWidth required />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Sumbit
                        </Button>
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    )
}

export default EditForm
