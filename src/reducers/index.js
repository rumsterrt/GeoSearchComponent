export const getInitState = () => ({
    form: {
        country: '',
        city: '',
        postal_code: '',
        street_address: '',
        street_number: '',
        room_type: '',
        room: '',

        isLoading: false,
    },
    pickedOption: {},
})

export const reducer = (state = getInitState(), action) => {
    const payload = action.payload

    switch (action.type) {
        case 'SET_ADDRESS_REQUEST':
            return {
                ...state,
                form: {
                    ...state.form,
                    isLoading: true,
                },
            }
        case 'SET_ADDRESS_SUCCESS':
            return {
                ...state,
                form: {
                    ...state.form,
                    ...payload.data,
                    isLoading: false,
                },
                pickedOption: payload.pickedOption,
            }
        case 'SET_ADDRESS_FAILURE':
            return {
                ...state,
                form: {
                    ...state.form,
                    isLoading: true,
                },
                pickedOption: {},
            }

        case 'RESET_DATA':
            return getInitState()

        default:
            return state
    }
}
