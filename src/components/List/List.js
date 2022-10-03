import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import ListService from "../services/ListService";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./list.css";

const List = (props) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  const listService = new ListService();

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = () => {
    listService.getAllItems().then(onItemsListLoaded).catch(onError);
  };

  const onItemsListLoaded = (newItemsList) => {
    setItems((items) => [...newItemsList]);
  };

  const onError = () => {
    setError(true);
  };

  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) => item.classList.remove("selected"));
    itemRefs.current[id].classList.add("selected");
    itemRefs.current[id].focus();
  };

  function renderItems(arr) {
    return arr.map((item) => {
      return (
        <li
          key={item.id}
          className="items__item"
          ref={(el) => (itemRefs.current[item.id] = el)}
          onClick={() => {
            props.onCharSelected(item.id);
            focusOnItem(item.id);
          }}
        >
          {item.name}
        </li>
      );
    });
  }

  const itemsList = renderItems(items);
  const errorMessage = error ? <ErrorMessage /> : null;
  return (
    <ul className="items__list">
      {itemsList}
      {errorMessage}
    </ul>
  );
};

List.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default List;
