import React, { useState, useEffect } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import '../styles/Slider.css'

const Slider = ({ interval, images }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    useEffect(
        () => {
            const tick = setInterval(() => {

                if (activeIndex < images.length - 1) {
                    setActiveIndex(activeIndex + 1)
                } else {
                    setActiveIndex(0)
                }
            }, interval)

            return () => clearInterval(tick)
        },
        [activeIndex, images.length, interval]
    )
    return (
        <TransitionGroup>
            <CSSTransition
                timeout={1000}
                classNames={'slide'}
                key={activeIndex}
            >
                <img
                    src={images[activeIndex].src}
                    alt={images[activeIndex].title}
                    className='Carrousel_img'
                />
            </CSSTransition>
        </TransitionGroup>
    )
}

export default Slider
