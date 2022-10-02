import { Component } from "react";
import ListService from "../services/ListService";
import { nanoid } from "nanoid";

import './list.css'

class List extends Component {
  state = {
    items: [],
    error: false,
  };

  listService = new ListService();

  componentDidMount() {
    this.onRequest();
  }

  onRequest = () => {
    this.listService
      .getAllItems()
      .then(this.onItemsListLoaded)
      .catch(this.onError);
  };

  onItemsListLoaded = (newItemsList) => {
    this.setState({
      items: [
        ...newItemsList.map((item) => {
          const id = { id: nanoid() };
          return { ...item, ...id };
        }),
      ],
    });
  };

  onError = () => {
    this.setState({
      error: true,
    });
  };

  render() {
    const itemsList = this.state.items.map((item) => {
        return <li
            key={item.id}
            className='items__item'
        >{item.name}</li>;
    });

    return <ul className="items__list">{itemsList}</ul>;
  }
}

export default List;
