import React from 'react'
import FieldWithError from './FieldWithError'
import TextField from '@material-ui/core/TextField'

export default ({ style, name, hint, error, ...props }) => (
    <FieldWithError
        style={style}
        hint={hint}
        name={name}
        render={({ field }) => (
            <TextField {...field} {...props} error={!field || !!field.error} />
        )}
    />
)
