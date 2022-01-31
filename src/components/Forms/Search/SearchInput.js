import { useState, useRef } from "react";
import ListItems from "./LisItems";
import styles from "../../../styles/InputSearch.module.css";

const SearchInput = ({
  data,
  className,
  placeHolder,
  form,
  tipo,
  selectCity,
}) => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [showItem, setShowItem] = useState(false);
  const [input, setInput] = useState("");
  const element = useRef();

  const onChange = (e) => {
    const value = element.current.value;

    // Filter our data that don't contain the user's input
    const unLinked = data.filter(
      (suggestion) =>
        suggestion.city.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
    setInput(value);
    setFilteredItems(unLinked);
    setShowItem(true);
  };

  return (
    <div className={styles.autocomplete}>
      <input
        type="text"
        placeholder={placeHolder}
        className={className}
        form={form}
        ref={element}
        onChange={onChange}
      />
      {showItem && input && (
        <ListItems
          setFilteredItems={setFilteredItems}
          setShowItem={setShowItem}
          filteredItems={filteredItems}
          tipo={tipo}
          selectCity={selectCity}
          element={element}
        />
      )}
    </div>
  );
};

export default SearchInput;
