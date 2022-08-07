import { Tooltip } from '@mantine/core'
import React from 'react'

interface PropTypes {
    alreadyLiked: boolean,
    position?: "bottom" | "left" | "right" | "top" |
                "bottom-end" | "bottom-start" | "left-end" |
                "left-start" | "right-end" | "right-start" |
                "top-end" | "top-start",
    type: "post" | "comment",
    children: JSX.Element
}

const LikeTooltip = ({ alreadyLiked, position, children, type }: PropTypes) => {
    return (
        <Tooltip
        position={position}
        label={alreadyLiked ? `Unlike this ${type}` : `Like this ${type}`} >
            {children}
        </Tooltip>
    )
}

export default LikeTooltip