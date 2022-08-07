import React from 'react'
import { Affix, Button, Transition } from "@mantine/core"
import { useWindowScroll } from '@mantine/hooks';
import { BsArrowUp } from 'react-icons/bs';

const ScrollToTop = () => {
    const [scroll, scrollTo] = useWindowScroll();
    return (
        <Affix position={{ bottom: 20, right: 20 }}>
            <Transition transition="slide-up" mounted={scroll.y > 0}>
            {(transitionStyles) => (
                <Button
                // color="dark"
                variant='light'
                leftIcon={<BsArrowUp />}
                style={transitionStyles}
                onClick={() => scrollTo({ y: 0 })}
                >
                Scroll to top
                </Button>
            )}
            </Transition>
        </Affix>
    )
}

export default ScrollToTop;