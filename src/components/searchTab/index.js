import React from 'react'
import _get from 'lodash/get'
import { SearchInput } from 'components/ui'
import { searchQuery, getAddressData } from 'utils/api'
import { TabWrapper } from 'components/ui'
import Typography from '@material-ui/core/Typography'
import { useSnackbar } from 'notistack'

import storeContext from 'store'

const SearchPage = () => {
    const [state, dispatch] = React.useContext(storeContext)
    const { enqueueSnackbar } = useSnackbar()

    const onClickOption = option => {
        dispatch({
            type: 'SET_ADDRESS_REQUEST',
        })
        getAddressData(option.id)
            .then(data => {
                dispatch({
                    type: 'SET_ADDRESS_SUCCESS',
                    payload: { data, pickedOption: option },
                })
            })
            .catch(e => {
                enqueueSnackbar('Google Place API limits ', { variant: 'error' })
                dispatch({
                    type: 'SET_ADDRESS_FAILURE',
                })
            })
    }

    const onLoadOptions = query => {
        return searchQuery(query).catch(e => {
            enqueueSnackbar('Google Place API limits ', { variant: 'error' })
            return []
        })
    }

    const pickedOption = _get(state, 'pickedOption', {})

    return (
        <TabWrapper>
            <SearchInput
                fullWidth
                initPicked={pickedOption}
                loadOptions={onLoadOptions}
                onClickOption={onClickOption}
                label={'Search address'}
            />
            {pickedOption.address && (
                <Typography style={{ marginTop: '20px' }} gutterTop>{`You choose: ${pickedOption.address}`}</Typography>
            )}
        </TabWrapper>
    )
}

export default SearchPage
