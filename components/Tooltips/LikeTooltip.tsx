import { Tooltip } from '@mantine/core'
import React from 'react'

interface PropTypes {
    alreadyLiked: boolean,
    position?: "top" | "bottom" | "left" | "right",
    placement?: "start" | "end" | "center",
    type: "post" | "comment",
    children: JSX.Element
}

const LikeTooltip = ({ alreadyLiked, position, placement, children, type }: PropTypes) => {
    return (
        <Tooltip
        position={position}
        placement={placement}
        label={alreadyLiked ? `Unlike this ${type}` : `Like this ${type}`} >
            {children}
        </Tooltip>
    )
}

export default LikeTooltip