import { differenceInDays, format, formatDistanceToNowStrict } from 'date-fns'

export const getPostItemDate = (date: Date) : string => {
    const difference = differenceInDays(new Date(), date)
    if (difference > 365) {
        return format(date, 'MMM d, yyyy')
    }
    if (difference >= 1) {
        return format(date, "MMM d")
    }
    return formatDistanceToNowStrict(date)
}


export const getPostPageDate = (date: Date) : string => {
    return format(date, "p · PP")
}

export const getUserProfileDate = (date: Date) : string => {
    return format(date, "PPP")
}