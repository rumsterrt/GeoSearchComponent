export const getInitState = () => ({
    form: {
        country: '',
        city: '',
        postal_code: '',
        street_address: '',
        street_number: '',
        room_type: '',
        room: '',
    },
    search: {
        options: [],
        pickedOption: {},
    },
})

export const reducer = (state = getInitState(), action) => {
    const payload = action.payload
    console.log('action', { action, state })

    switch (action.type) {
        case 'SET_ADDRESS_DATA':
            return {
                ...state,
                form: {
                    ...state.form,
                    ...payload.data,
                },
                search: {
                    ...state.search,
                    pickedOption: payload.pickedOption,
                },
            }
        default:
            return state
    }
}
