import React, { useRef, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import styles from '../../styles/InputSearch.module.css'

const InputSearch = ({ cities, className, form, placeHolder, tipo, handleClick }) => {

  const entrada = useRef()
  const [input, setinput] = useState('');
  const [search] = useDebounce(input, 200);

  useEffect(() => {

    let inp = entrada.current
    let arr = cities

    inp.addEventListener("input", function (e) {
      let a, b, i, val = this.value;
      closeAllLists();
      if (!val) { return false; }
      a = document.createElement("DIV");
      a.setAttribute("class", `${styles['autocomplete-items']}`);
      this.parentNode.appendChild(a);


      for (i = 0; i < arr.length; i++) {
        if (arr[i].city.substr(0, val.length).toUpperCase() === val.toUpperCase()) {
          b = document.createElement("DIV");
          b.innerHTML = `<strong> ${arr[i].city.substr(0, val.length)}</strong>${arr[i].city.substr(val.length)}<input type='hidden'  value='${arr[i].city}' id='${arr[i]._id}' >`
          b.addEventListener("click", function (e) {
            const inputSelected = this.getElementsByTagName("input")[0]
            inp.value = '';
            const id = inputSelected.id
            handleClick({ tipo: tipo, city: inputSelected.value, _id: id })
            closeAllLists();
          });
          a.appendChild(b);
        }
      }
    });
    const closeAllLists = (elmnt) => {
      const x = document.getElementsByClassName(`${styles['autocomplete-items']}`);
      for (let i = 0; i < x.length; i++) {
        if (elmnt !== x[i] && elmnt !== inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }

    window.addEventListener("click", (e) => closeAllLists(e.target));
    return () => {
      window.removeEventListener("click", closeAllLists, true)
    };
  }, [search]);





  const changeInput = () => {
    setinput(entrada.current.value)
  }


  return (
    <div className={styles.autocomplete}>
      <input
        type='text'
        placeholder={placeHolder}
        className={className}
        form={form}
        ref={entrada}
        onChange={changeInput}
      />
    </div>
  )

}


export default InputSearch