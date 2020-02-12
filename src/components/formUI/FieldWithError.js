import React from 'react'
import _ from 'lodash'
import { Field } from 'formik'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

export default ({ style, name, render, className }) => (
    <Field
        name={name}
        render={({ field, form }) => {
            const hasError = _.get(form.touched, name) && _.get(form.errors, name)

            return (
                <Box style={style} className={className}>
                    {render({
                        field: {
                            ...field,
                            error: hasError,
                        },
                        form,
                    })}
                    {hasError && (
                        <Typography color="error" variant="caption">
                            {_.get(form.errors, name)}
                        </Typography>
                    )}
                </Box>
            )
        }}
    />
)
