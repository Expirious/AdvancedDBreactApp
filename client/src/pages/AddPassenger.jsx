import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Destinations from './Destinations';

const AddPassenger = () => {

    const params = useParams()

    const [passenger, setPassenger] = useState({
        id: null,
        name:'',
        surname: '',
        destination: null,
        seat: null,
    })

    const [passengers, setPassengers] = useState([])

    useEffect(()=>{

        const fetchAllPassengers = async () =>{
            let seatId = 1;

            try{
                const res = await axios.get('http://localhost:8800/passenger/')
                setPassengers(res.data)
                console.log(res.data.length)
   
                passengers.map(pass=>{
                    if (pass.destination == params.id) seatId++
                })   

                setPassenger(prev=>{ return {...prev, id: res.data.length + 1, destination: params.id, seat: seatId}})//setting id, destination, seat
                
            }catch(err){
                console.log(err);
            }
        }
        
        fetchAllPassengers() 
    }, []);


    const navigate = useNavigate()

    const handleChange = (e) =>{
        setPassenger(prev=>({...prev,[e.target.name]: e.target.value}))
    }

    const handleClick = async e =>{
        e.preventDefault();

        try{
            
            await axios.post("http://localhost:8800/passenger", passenger)
            navigate('/passengers/' + params.id)
        }catch(err){
            console.log(err)
        }
    }

    console.log(passenger)

    return (
        <div className='form'>
            <h1>Add Passenger</h1>

            <label>Id</label>
            <input type='number' placeholder={passenger.id} onChange={handleChange} name='id' readOnly></input>

            <label>Firstname</label>
            <input type='text' placeholder='name' onChange={handleChange} name='name' required></input>

            <label>Lastname</label>
            <input type='text' placeholder='surname' onChange={handleChange} name='surname' required></input>

            <label>Destination</label>
            <input type='number' placeholder={passenger.destination} onChange={handleChange} name='destination' readOnly></input>

            <label>Seat</label>
            <input type='number' placeholder={passenger.seat} onChange={handleChange} name='seat' readOnly></input>     

            <button className='formButton' type='submit' onClick={handleClick}>Add</button>
        </div>
    )
}

export default AddPassenger