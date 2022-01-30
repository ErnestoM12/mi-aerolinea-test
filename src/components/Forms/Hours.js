import React from 'react';
import styles from '../../styles/Hours.module.css'

const Hours = ({ dataFetching, isFetching, handlerHourPrice }) => {

   return (<div>

      <h2>Seleccionar hora y precio</h2>

      {isFetching && <p>..Loading</p>}
      <ul className={styles.ul}>
         {
            dataFetching.length > 0 ?
               (
                  dataFetching.map(hours => {
                     return <li key={hours._id} onClick={(e) => handlerHourPrice(hours, e)} ><span>Hora: </span>{hours.hour} <br /><span>Precio: </span>${hours.price}</li>
                  })
               ) :
               (
                  <li>No hay horarios disponibles para esta ciudad</li>
               )

         }
      </ul>
   </div>)
}

export default Hours