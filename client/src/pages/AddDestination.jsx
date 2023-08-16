import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Destinations from './Destinations';

const AddDestination = () => {

    const [destinatio, setDestination] = useState({
        id:null,
        country:'',
        company: '',
    })

    useEffect(()=>{

        const fetchAllDestinations = async () =>{
            try{
                const res = await axios.get('http://localhost:8800/destination/')
                console.log(res.data.length)
                
                setDestination(prev=>{ return {...prev, id: res.data.length + 1}})
            }catch(err){
                console.log(err);
            }
        }
        
        fetchAllDestinations()
    }, []);

    const navigate = useNavigate()

    const handleChange = (e) =>{
        setDestination(prev=>({...prev,[e.target.name]: e.target.value}))
    }

    const handleClick = async e =>{
        e.preventDefault();
        
        try{
            await axios.post("http://localhost:8800/destination", destinatio)
            addSeats()
            navigate('/')
        }catch(err){
            console.log(err)
        }
    }

   
    const addSeats = async e =>{

        let seat = {
            id: null,
            type: 'basic',
            destination: destinatio.id,
        };
        try{
            console.log('adding seats...')
            
            for(let i = 1; i <= 20; i++){
                seat.id = i;
                await axios.post("http://localhost:8800/seat", seat)
                console.log(seat)
            }
            

            console.log('finito')
            
        }catch(err){
            console.log(err)
        }
    }

    console.log(destinatio)

    return (
        <div className='form'>
            <h1>Add Destination</h1>
            <input type='number' placeholder={destinatio.id} onChange={handleChange} name='id' readOnly></input>
            <input type='text' placeholder='country' onChange={handleChange} name='country' required></input>
            <input type='text' placeholder='company' onChange={handleChange} name='company' required></input>

            <button className='formButton' onClick={addSeats}>add seat</button>
            <button className='formButton' onClick={handleClick}>Add</button>
        </div>
    )
}

export default AddDestination