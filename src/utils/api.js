import _intersection from 'lodash/intersection'
import _get from 'lodash/get'

const service = new window.google.maps.places.PlacesService(document.createElement('div'))

const dataParser = (() => {
    const relativeTypes = ['country', 'locality', 'postal_code', 'street_address', 'route', 'street_number', 'room']
    const relative = {
        country: 'country',
        locality: 'city',
        postal_code: 'postal_code',
        route: 'street_address',
        street_address: 'street_address',
        street_number: 'street_number',
        room: 'room',
    }

    return data => {
        return data.reduce((acc, item) => {
            const isRelative = _intersection(item.types, relativeTypes)[0]
            if (!isRelative) {
                return acc
            }

            return { ...acc, [relative[isRelative]]: item.long_name }
        }, {})
    }
})()

export const searchQuery = query =>
    new Promise(resolve => {
        service.textSearch(
            {
                query,
            },
            response => {
                resolve(
                    response.map(({ formatted_address, place_id }) => ({
                        address: formatted_address,
                        id: place_id,
                    })),
                )
            },
        )
    })

export const getAddressData = placeId =>
    new Promise(resolve => {
        service.getDetails({ placeId, fields: ['address_component'] }, response => {
            resolve(dataParser(_get(response, 'address_components', [])))
        })
    })
