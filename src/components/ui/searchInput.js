import React from 'react'

import TextField from '@material-ui/core/TextField'

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
        box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;
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

const SearchInput = ({ initOptions = null, initPicked = {}, loadOptions, onClickOption, ...props }) => {
    const [value, setValue] = React.useState('')
    const [options, setOptions] = React.useState(initOptions)
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [popupOpen, setPopupOpen] = React.useState(null)
    const [searchTimeout, setSearchTimeout] = React.useState(null)
    //option that was picked, view it inside input, while new typing start
    const [pickedOption, setPickedOption] = React.useState(initPicked)
    const [isLoading, setIsLoading] = React.useState(false)

    const handleChange = e => {
        setPickedOption({})
        const newValue = e.target.value
        setValue(newValue)
        searchTimeout && clearTimeout(searchTimeout)

        if (newValue.length <= 2) {
            return
        }

        const newTimeout = setTimeout(() => {
            setIsLoading(true)
            loadOptions(newValue)
                .then(options => {
                    setOptions(options)
                })
                .catch(e => {
                    setOptions(null)
                })
                .finally(() => {
                    setSearchTimeout(null)
                    setIsLoading(false)
                })
        }, 1000)
        setSearchTimeout(newTimeout)
    }

    const open = (Boolean(anchorEl) && options && popupOpen) || isLoading

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
                        <ListBox>
                            {isLoading && <Option>Loading...</Option>}
                            {options && options.length === 0 && !isLoading && <Option>Empty</Option>}
                            {!isLoading &&
                                options &&
                                options.map((option, index) => (
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
                    </Popper>
                )}
            </Wrapper>
        </ClickAwayListener>
    )
}

export default SearchInput
