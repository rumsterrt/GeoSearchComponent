import React from 'react'
import { Provider } from './store'
import { reducer, getInitState } from './reducers'
import { MainPage } from 'pages'
import { SnackbarProvider } from 'notistack'

import { ThemeProvider } from 'styled-components'
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const customTheme = createMuiTheme()

function App() {
    const matches = useMediaQuery('(min-width:600px)')
    const useState = React.useReducer(reducer, getInitState())

    return (
        <Provider value={useState}>
            <MuiThemeProvider theme={customTheme}>
                <ThemeProvider theme={customTheme}>
                    <SnackbarProvider maxSnack={3}>
                        <Container maxWidth={matches ? 'md' : false} disableGutters={!matches}>
                            <MainPage />
                        </Container>
                    </SnackbarProvider>
                </ThemeProvider>
            </MuiThemeProvider>
        </Provider>
    )
}

export default App
