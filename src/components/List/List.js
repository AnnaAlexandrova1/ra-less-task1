import {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import ListService from "../services/ListService";
import Details from "../Details/Details";

import "./list.css";

const List = (props) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [onclick, setOnclick] = useState(false);
    

  const listService = new ListService();

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = () => {
    listService.getAllItems().then(onItemsListLoaded).catch(onError);
  };

  const onItemsListLoaded = (newItemsList) => {
    setItems((items) => [ ...newItemsList]);
  };

  const onError = () => {
    setError(true);
    };
    
    const itemRefs = useRef([])

    const focusOnItem = (id) =>  {
     itemRefs.current.forEach(item => item.classList.remove('selected'));
        itemRefs.current[id].classList.add('selected');
        itemRefs.current[id].focus();
  }

  function renderItems(arr) {
    return arr.map((item) => {
      return (
        <li
              key={item.id}
              className="items__item"
              ref={el => itemRefs.current[item.id] = el}
              onClick={() => {
                  props.onCharSelected(item.name)
                  focusOnItem(item.id);
              }}
        >
          {item.name}
        </li>
      );
    });
    }
    
    const itemsList = renderItems(items)
    return (
       <ul className="items__list">{itemsList}</ul> 
    )
};

// class List extends Component {
//   state = {
//     items: [],
//     error: false,
//     onclick: false
//   };

//   listService = new ListService();

//   componentDidMount() {
//     this.onRequest();
//   }

//   onRequest = () => {
//     this.listService
//       .getAllItems()
//       .then(this.onItemsListLoaded)
//       .catch(this.onError);
//   };

//   onItemsListLoaded = (newItemsList) => {
//     this.setState({
//       items: [...newItemsList],
//     });
//   };

//   onError = () => {
//     this.setState({
//       error: true,
//     });
//   };

//   render() {
//     const itemsList = this.state.items.map((item) => {
//         return <li
//             key={item.id}
//             className='items__item'
//             onClick={() => Details(item.name)}
//         >{item.name}</li>;
//     });

//     return <ul className="items__list">{itemsList}</ul>;
//   }
// }

export default List;
