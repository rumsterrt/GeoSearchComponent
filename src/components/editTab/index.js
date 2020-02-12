import React from 'react'
import Form from './form'
import { TabWrapper } from 'components/ui'

import storeContext from 'store'

const EditAddress = ({ onSubmit = () => {} }) => {
    const [state, dispatch] = React.useContext(storeContext)
    const handleSubmit = values => {
        dispatch({
            type: 'SET_ADDRESS_DATA',
            payload: { data: values },
        })
        onSubmit()
    }

    return (
        <TabWrapper>
            <Form address={state.form || {}} onSubmit={handleSubmit} />
        </TabWrapper>
    )
}

export default EditAddress
