import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Outlet, Link } from "react-router-dom";

const Destinations = () => {
    
    const [destinations, setDestinations] = useState([])

    useEffect(()=>{
        const fetchAllDestinations = async () =>{

            try{
                const res = await axios.get('http://localhost:8800/destination')
                setDestinations(res.data); 
                console.log(res.data[0])
            }catch(err){
                console.log(err);
            }
        }


        fetchAllDestinations() 
    }, []);

    const handleDelete = async(id) =>{
        try{
            await axios.delete('http://localhost:8800/seat/' + id)
            await axios.delete('http://localhost:8800/destination/' + id)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }
    
    return (
        <div>
            <h1>Destinations</h1>
            <div className='books'>
                {destinations.map(destination=>(
                    <div className='book' key={destination.id}>
                    <h3>{destination.id}</h3>
                        <input className='inputDestination' placeholder={destination.country} readOnly></input>
                        <input className='inputDestination' placeholder={destination.company} readOnly></input>
                        
                        <button className='info'><Link to={('/Passengers/' + destination.id)}>Info</Link></button>
                        <button className='update'><Link to={('/updateDestination/' + destination.id)}>Update</Link></button>
                        <button className='delete' onClick={()=> handleDelete(destination.id)}>Delete</button>
                    </div>
                ))}    
            </div>
            <button><Link to='/addDestination'>Add new Destination</Link></button>
        </div>
    )
}

export default Destinations