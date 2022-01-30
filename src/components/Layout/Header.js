import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { fetchCities } from '../../redux/actions/cityActions'
import styles from '../../styles/Header.module.css'

const Header = ({ dispatch, reservation }) => {
    //get cities
    useEffect(() => {
        dispatch(fetchCities())
    }, [])

    //numero de reservaciones
    const numReservation = reservation.reservations.length

    const [AvtiveMobile, setAvtiveMobile] = useState('');
    const toogle = () => {
        if (AvtiveMobile === '') {
            setAvtiveMobile(styles.open)
        } else {
            setAvtiveMobile('')
        }
    }

    return (
        <header className={styles.header}>
            <div className={styles.brand}><NavLink to="/" exact>Mi Aerolinea</NavLink></div>
            <nav className={styles.nav}>
                <ul>
                    <li><NavLink activeClassName={styles.active} to="/" exact >Home</NavLink></li>
                    <li><NavLink activeClassName={styles.active} to="/about">About Us</NavLink></li>
                    <li><NavLink activeClassName={styles.active} to="/reservations">Mis Reservas {numReservation > 0 && <span className={styles.numerReservas}>{numReservation}</span>}</NavLink></li>
                </ul>
            </nav>
            <div className={`${styles['hamburger-icon']} ${AvtiveMobile}`} onClick={toogle} >
                {numReservation > 0 && <span className={styles.numerReservas}>{numReservation}</span>}
                <div className={styles.bar1}></div>
                <div className={styles.bar2}></div>
                <div className={styles.bar3}></div>
                <ul className={styles['mobile-menu']}>
                    <li><NavLink activeClassName={styles.active} to="/" exact>Home</NavLink></li>
                    <li><NavLink activeClassName={styles.active} to="/about">About</NavLink></li>
                    <li><NavLink activeClassName={styles.active} to="/reservations">Mis Reservas  {numReservation > 0 && <span className={styles.numerReservas}>{numReservation}</span>} </NavLink></li>
                </ul>
            </div>
        </header>)
}

const mapStateToProps = (state) => {
    return {
        reservation: state.reservation
    }
}

export default connect(mapStateToProps)(Header)
