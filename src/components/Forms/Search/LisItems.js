import styles from "../../../styles/InputSearch.module.css";

const ListItems = ({
    setFilteredItems,
    setShowItem,
    filteredItems,
    tipo,
    selectCity,
    element,
}) => {
    const onClick = (data, e) => {
        e.preventDefault();
        setFilteredItems([]);
        setShowItem(false);
        selectCity({ tipo, ...data });
        element.current.value = "";
    };
    return (
        filteredItems.length > 0 && (
            <div className={styles["autocomplete-items"]}>
                {filteredItems.map((item) => {
                    return (
                        <div key={item._id} onClick={(e) => onClick(item, e)}>
                            {item.city}
                        </div>
                    );
                })}
            </div>
        )
    );
};

export default ListItems;
