import { differenceInDays, format, formatDistanceToNowStrict } from 'date-fns'


export const getPostItemDate = (date: Date) : string => {
    const difference = differenceInDays(new Date(), date)
    console.log(difference);
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