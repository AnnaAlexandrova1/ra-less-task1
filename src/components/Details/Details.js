import { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import Spinner from '../Spinner/Spinner'
import ListService from '../services/ListService';

const Details = (props) => {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const listService = new ListService()

    useEffect(() => {
        undateChar()
    }, [props.itemId])
    
    const undateChar = () => {
        const { itemId } = props;
        if (!itemId) {
            return;
        }
        onCharListLoading();
        listService.getItem(itemId)
            .then(onCharListLoaded)
            .catch(onError)
        
    }

    const onCharListLoading = () => {
        setLoading(true)
    }

    const onCharListLoaded = (char) => {
        setLoading(false)
        setItem(char)
    }

    const onError = () => {
        setError(true)
        setLoading(false)
    }

    const content = !(loading || error || !item) ? <DrowItem char={item} /> : null
    
    return (
        <>
            {content}
        </>
    )

}

 const DrowItem = (char) => {
        if (!char) {
            return
     }
     console.log(char.char.avatar)
        return (
            <div>
                <img src={char.char.avatar} alt={char.char.name}/>
                <div>{char.char.name}</div>
                <div>City: {char.char.details.city}</div>
                <div>Company: {char.char.details.company}</div>
                <div>Position: {char.char.details.position}</div>
            </div>
        )
    }
        



export default Details