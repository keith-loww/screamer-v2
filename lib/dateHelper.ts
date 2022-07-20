import { formatDistance } from 'date-fns'

export const getDateDistance = (date: Date) : string => {
    return formatDistance(
        date, new Date(), {
            addSuffix: true
        }
    )
}