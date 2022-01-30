import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../../styles/Form.module.css";

const FormContact = ({ closeModal, deleteAll }) => {
   //diabled button state
   const [disableBtn, setDisaleBtn] = useState(true);
   //
   const [compraRealizada, setCompraRealizada] = useState(false);
   const {
      register,
      watch,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();

   //valid fields are not empty
   useEffect(() => {
      const subscription = watch((values) => {
         if (!Object.values(values).includes("")) {
            setDisaleBtn(false);
         }
      });
      return () => subscription.unsubscribe();
   }, [watch]);

   const handlerRegister = (data) => {
      reset();
      deleteAll();
      setCompraRealizada(true);

      setTimeout(() => {
         closeModal();
      }, 4000);
   };

   return (
      <div>
         {compraRealizada ? (
            <h3>Gracias por tu reserva!</h3>
         ) : (
            <form autoComplete="off" onSubmit={handleSubmit(handlerRegister)}>
               <label htmlFor="Nombres">
                  <input
                     type="text"
                     placeholder="Nombres"
                     className={`
                           ${styles["input-modal"]} ${styles.modal}
                           ${errors.nombres && styles["error-active"]}`}
                     {...register("nombres", { required: true })}
                  />
               </label>

               <label htmlFor="apellido Paterno">
                  <input
                     type="text"
                     placeholder="Apellido Paterno"
                     className={`
                           ${styles["input-modal"]} ${styles.modal}
                           ${errors.nombres && styles["error-active"]}`}
                     {...register("apellido_p", { required: true })}
                  />
               </label>
               <label htmlFor="apellido Materno">
                  <input
                     type="text"
                     placeholder="Apellido Materno"
                     className={`
                           ${styles["input-modal"]} ${styles.modal}
                           ${errors.nombres && styles["error-active"]}`}
                     {...register("apellido_m", { required: true })}
                  />
               </label>
               <label htmlFor="Direccion">
                  <input
                     type="text"
                     placeholder="Direccion #"
                     className={`
                           ${styles["input-modal"]} ${styles.modal}
                           ${errors.nombres && styles["error-active"]}`}
                     {...register("apellido_m", { required: true })}
                  />
               </label>
               <label htmlFor="Email">
                  <input
                     type="email"
                     placeholder="Correo electronico"
                     className={`
                           ${styles["input-modal"]} ${styles.modal}
                           ${errors.nombres && styles["error-active"]}`}
                     {...register("apellido_m", { required: true })}
                  />
               </label>
               <button
                  className={`${styles["btn-modal"]} ${disableBtn && styles.disable
                     } `}
                  type="submit"
               >
                  <p>R E G I S T R A R</p>
               </button>
            </form>
         )}
      </div>
   );
};

export default FormContact;
