import React from 'react'

import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'

import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import styled from 'styled-components'

const Wrapper = styled.div`
    position: relative;
`

const Popper = styled.div`
    ${({ theme }) => `
        z-index: 1;
        position: absolute;
        box-sizing: border-box;
        top: 100%;
        right: 0;
        left: 0;
        background-color: ${theme.palette.background.paper};
        max-height: 300px;
        overflow-y: auto;
    `}
`

const ListBox = styled.ul`
    list-style: none;
    margin: 0;
    padding: 8px 0px;
    position: relative;
`

const Option = styled.li`
    ${({ theme }) => `
        word-break: break-all;
        min-height: 48px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer;
        padding-top: 6px;
        box-sizing: border-box;
        outline: 0;
        padding-bottom: 6px;
        padding-left: 16px;
        padding-right: 16px;
        &:hover {
            background-color: ${theme.palette.action.hover};
        },
        &:active {
            background-color: ${theme.palette.action.selected},
        },
    `}
`

const SearchInput = ({ initOptions = [], initPicked = {}, loadOptions, onClickOption, ...props }) => {
    const [value, setValue] = React.useState('')
    const [options, setOptions] = React.useState(initOptions)
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [popupOpen, setPopupOpen] = React.useState(null)
    const [searchTimeout, setSearchTimeout] = React.useState(null)
    //option that was picked, view it inside input, while new typing start
    const [pickedOption, setPickedOption] = React.useState(initPicked)

    const handleChange = e => {
        setPickedOption({})
        const newValue = e.target.value
        setValue(newValue)
        searchTimeout && clearTimeout(searchTimeout)

        if (newValue.length <= 2) {
            return
        }

        const newTimeout = setTimeout(() => {
            loadOptions(newValue).then(options => {
                setOptions(options)
                setSearchTimeout(null)
            })
        }, 1000)
        setSearchTimeout(newTimeout)
    }

    const open = Boolean(anchorEl) && options.length > 0 && popupOpen

    return (
        <ClickAwayListener
            onClickAway={() => {
                setPopupOpen(false)
            }}
        >
            <Wrapper>
                <TextField
                    onFocus={() => setPopupOpen(true)}
                    label="Search"
                    type="search"
                    value={pickedOption.address || value}
                    onChange={handleChange}
                    ref={setAnchorEl}
                    {...props}
                />
                {open && (
                    <Popper
                        role="presentation"
                        style={{
                            width: anchorEl ? anchorEl.clientWidth : null,
                        }}
                        placement="bottom"
                        open
                        anchorEl={anchorEl}
                    >
                        <Box boxShadow={1}>
                            <ListBox>
                                {options.map((option, index) => (
                                    <Option
                                        key={index}
                                        onClick={() => {
                                            setPickedOption(option)
                                            setPopupOpen(false)
                                            onClickOption(option)
                                        }}
                                    >
                                        {option.address}
                                    </Option>
                                ))}
                            </ListBox>
                        </Box>
                    </Popper>
                )}
            </Wrapper>
        </ClickAwayListener>
    )
}

export default SearchInput
