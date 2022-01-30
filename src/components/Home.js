import React from 'react'
import { images } from '../utils'
import Form from '../components/Forms/Form'
import Slider from './Slider'
import styles from '../styles/Home.module.css'

const Home = () => {
    return (
        <div className={styles.main}>
            <Form />
            <Slider interval={8000} images={images} />
        </div>
    )
}
export default Home