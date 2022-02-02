import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form';
import useModal from '../../hooks/useModal';
import { addReservation } from '../../redux/actions/reservationActions'
import Modal from '../../components/Modal.js';
import styles from '../../styles/Form.module.css'
import { getId } from '../../utils'
import SearchInput from './Search/SearchInput';
import Hours from './Hours'
import axios from 'axios'


const Form = ({ cities, addReservation }) => {
    //disabled button state
    const [disableBtn, setDisableBtn] = useState(true);
    //origen state
    const [origen, setOrigen] = useState('');
    //destino state
    const [destino, setDestino] = useState('');
    //hora y precio 
    const [horaPrecio, setHoraPrecio] = useState({});
    //call useForm hook
    const { register, watch, handleSubmit, setValue, reset, formState: { errors } } = useForm();
    //call modall hook
    const [isOpen, openModal, closeModal] = useModal(false);

    //fetchin data
    const [dataFetching, setDataFetching] = useState([])
    const [isFetching, setFetching] = useState(true)

    //valid fields are not empty
    useEffect(() => {

        const subscription = watch((values) => {

            if (!Object.values(values).includes('') && Object.keys(values).length > 0) {
                setDisableBtn(false)
            } else {
                setDisableBtn(true)
            }

        });
        return () => subscription.unsubscribe();
    }, [watch]);


    //handle click city selected
    const selectCity = async (data) => {
        if (data.tipo === 'destino') {
            setValue('destino', data.city)
            setDestino(data.city)
            setFetching(true)
            try {
                const res = await axios.get(`https://mi-aerolinea.herokuapp.com/api/city/${data._id}`)
                setDataFetching(res.data.city)
            } catch (error) {
                console.log(error);
            }
            setFetching(false)
            openModal(true)
        } else {
            setValue('origen', data.city)
            setOrigen(data.city)
        }
    }

    //handler click modal
    const handlerHourPrice = (data, e) => {
        e.preventDefault()
        setHoraPrecio(data)
        closeModal()
    }


    //handler submit
    const onSubmit = (data) => {

        if (Object.keys(horaPrecio).length === 0) {
            openModal(true)
        } else {
            const completeData = {
                localId: getId(),
                ...data,
                ...horaPrecio
            }
            addReservation(completeData)
            setDestino('')
            setOrigen('')
            setHoraPrecio({})
            reset()
        }



    }
    return (
        <div className={styles.card}>
            {/*call modal*/}
            <Modal isOpen={isOpen} closeModal={closeModal}>
                <Hours handlerHourPrice={handlerHourPrice} dataFetching={dataFetching} isFetching={isFetching} />
            </Modal>
            <h2>Reservar Viaje &rarr;</h2>
            <p className={styles.p}> Fecha Salida     &rarr;   Fecha Regreso</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="fechaSalida">
                    <input type="date"
                        className={`
                           ${styles['input-large']}
                           ${errors.fechaSalida && styles['error-active']}`}
                        {...register('fechaSalida', { required: true })} />
                </label>

                <label htmlFor="fechaRegreso">
                    <input type="date"
                        className={`${styles['input-large']}
                        ${errors.fechaRegreso && styles['error-active']}`}
                        {...register('fechaRegreso', { required: true })} />
                </label>

                <p className={styles.p}>{origen}
                    &rarr;{destino}
                    &rarr;
                    {horaPrecio.hour && (
                        <span onClick={openModal} className={styles.tooltip}>
                            Hora:{horaPrecio.hour}
                            <span className={styles.tooltiptext}>Cambiar hora y precio</span>
                        </span>
                    )
                    }
                </p>

                <label htmlFor="origen">
                    <SearchInput
                        data={cities.cities}
                        placeHolder='Origen'
                        className={`${styles['input-large']} ${errors.origen && styles['error-active']}`}
                        form={{ ...register("origen", { required: true }) }}
                        tipo='origen'
                        selectCity={selectCity}
                    />
                </label>

                <label htmlFor="destino">
                    <SearchInput
                        data={cities.cities} placeHolder='Destino'
                        className={`${styles['input-large']}  ${errors.origen && styles['error-active']}`}
                        form={{ ...register("destino", { required: true }) }}
                        tipo='destino'
                        selectCity={selectCity}
                    />
                </label>

                <label htmlFor="numeroPasajeros">
                    <p className={styles.p}>Número De Pasajeros</p>
                    <input type="number"
                        min="1"
                        className={`${styles['input-small']}
                     ${errors.numeroPasajeros && styles['error-active']}`}
                        {...register('numeroPasajeros', { required: true, pattern: /\d+/ })} />
                </label>

                <button className={`${styles['btn-send']} ${disableBtn && styles.disable} `} type="submit"><p>R E S E R V A R</p></button>
            </form>
        </div>
    )

}
//connection store
const mapStateToProps = ({ cities, reservation }) => {
    localStorage.setItem('cartItems', JSON.stringify(reservation.reservations))
    return {
        cities
    }
}
//dispatch methods
const mapDispatchToProps = (dispatch) => {
    return {

        addReservation: (reservation) => dispatch(addReservation(reservation)),


    }
}
//
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form)
