import React from 'react'
import _get from 'lodash/get'
import { SearchInput } from 'components/ui'
import { searchQuery, getAddressData } from 'utils/api'
import { TabWrapper } from 'components/ui'
import Typography from '@material-ui/core/Typography'

import storeContext from 'store'

const SearchPage = () => {
    const [state, dispatch] = React.useContext(storeContext)

    const onClickOption = option => {
        getAddressData(option.id).then(data => {
            dispatch({
                type: 'SET_ADDRESS_DATA',
                payload: { data, pickedOption: option },
            })
        })
    }

    const pickedOption = _get(state, 'search.pickedOption', {})
    console.log('pickedOption', pickedOption)
    return (
        <TabWrapper>
            <SearchInput
                fullWidth
                initOptions={_get(state, 'search.options', [])}
                initPicked={pickedOption}
                loadOptions={searchQuery}
                onClickOption={onClickOption}
            />
            {pickedOption.address && <Typography>{`You choose: ${pickedOption.address}`}</Typography>}
        </TabWrapper>
    )
}

export default SearchPage
