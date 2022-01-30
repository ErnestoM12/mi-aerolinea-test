import React from 'react';
import { connect } from 'react-redux';
import { deleteReservation, deleteAll } from '../redux/actions/reservationActions'
import styles from '../styles/Reservaciones.module.css'
import FormContact from '../components/Forms/FormContact'
import useModal from '../hooks/useModal'
import Modal from './Modal.js';

const Reservations = ({ deleteAll, deleteReservation, reservation }) => {

  //call modall hook
  const [isOpen, openModal, closeModal] = useModal(false);


  const btnPayment = (e) => {
    e.preventDefault()
    openModal(true)
  }

  const btnClearCard = (e) => {
    e.preventDefault()
    deleteAll()
  }

  //sum total
  let total;
  if (reservation.reservations.length > 0) {
    total = reservation.reservations.reduce(function (a, b) {
      return a + b['price'] * b['numeroPasajeros'];
    }, 0);
  } else {
    total = 0;
  }

  return (
    <div className={styles.container} >
      {/*call modal*/}
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <FormContact closeModal={closeModal} deleteAll={deleteAll} />
      </Modal>
      <h1>Mis Reservasiones</h1>
      {total > 0 ? (
        <>
          <button className={styles.eliminar} onClick={btnClearCard}>Eliminar todas</button>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Fecha Salida</th>
                <th>Fecha Regreso</th>
                <th>Origen</th>
                <th>Destino</th>
                <th>Hora Salida</th>
                <th>Número Parajeros</th>
                <th>Precio Total</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {reservation.reservations.map(reserv => {
                const unitTotal = reserv.price * reserv.numeroPasajeros;
                return (
                  <tr key={reserv.localId}>
                    <td>{reserv.fechaSalida}</td>
                    <td>{reserv.fechaSalida}</td>
                    <td>{reserv.origen}</td>
                    <td>{reserv.destino}</td>
                    <td>{reserv.hour}</td>
                    <td>{reserv.numeroPasajeros}</td>
                    <td>${unitTotal}</td>
                    <td className={styles.eliminar} onClick={() => {
                      deleteReservation(reserv)
                    }}> X</td>
                  </tr>
                )
              })
              }
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td>${total}</td>
              </tr>
            </tfoot>
          </table>
          <button className={styles.pagar} onClick={btnPayment}><p>P A G A R</p></button>
        </>) : (<h3>No se ha realizado ninguna reserva</h3>)}
    </div>)

}
//connection store
const mapStateToProps = ({ reservation }) => {
  localStorage.setItem('cartItems', JSON.stringify(reservation.reservations))
  return { reservation }
}
//dispatch methods
const mapDispatchToProps = (dispatch) => {
  return {


    deleteReservation: (reservation) => dispatch(deleteReservation(reservation)),
    deleteAll: (reservation) => dispatch(deleteAll())
  }
}
//
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reservations)
