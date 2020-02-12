import React from 'react'

import PaperOrigin from '@material-ui/core/Paper'
import styled from 'styled-components'

const Wrapper = styled(PaperOrigin)`
    ${({ theme }) => `
        margin-top: ${theme.spacing(2)}px;
        margin-bottom: ${theme.spacing(3)}px;
        padding: ${theme.spacing(2)}px;
    `}
`

const TabWrapper = ({ children }) => {
    return <Wrapper>{children}</Wrapper>
}

export default TabWrapper
