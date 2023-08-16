import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Outlet, Link, useParams, useNavigate } from "react-router-dom";

const Passengers = () => {
    
    const [passengers, setPassengers] = useState([])
    const params = useParams();
    const navigate = useNavigate()

    useEffect(()=>{
        const fetchAllPassengers = async () =>{

            try{
                const res = await axios.get('http://localhost:8800/passenger')
                setPassengers(res.data); 
                console.log('length:' + res)

            }catch(err){
                console.log(err);
            }
        }

        fetchAllPassengers() 
    }, []);

    const handleClick = async e =>{
        e.preventDefault()
        console.log(params.id)
        navigate('/addPassenger/' + params.id)
    }

    const handleDelete = async(id) =>{
        try{
            await axios.delete('http://localhost:8800/passenger/' + id)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }
    
    return (
        <div>
            <h1>Passengers</h1>
            <div className='books'>
            {passengers.filter(passenger=>{
                return (passenger.destination == params.id);
            }).map(passenger => (
                    <div className='book' key={passenger.id}>
                        <h3>{passenger.id}</h3>
                        <label>Firstname:</label>
                        <input className='inputPassenger' placeholder={passenger.name} readOnly></input>
                        <label>Lastname: </label>
                        <input className='inputPassenger' placeholder={passenger.surname} readOnly></input>
                        <label>Seat: {passenger.seat}</label>
                        
                        <button className='update'><Link to={('/updatePassenger/' + passenger.id)}>Update</Link></button>
                        <button className='delete' onClick={()=> handleDelete(passenger.id)}>Delete</button>
                    </div>
                ))}    
            </div>
            <button onClick={handleClick}>Add new Passenger</button>
            <button><Link to='/'>Back</Link></button>
        </div>
    )
}

export default Passengers