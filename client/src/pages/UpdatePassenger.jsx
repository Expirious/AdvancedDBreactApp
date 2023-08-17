import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdatePassenger = () => {

    const params = useParams();
    let index = 0;

    const [passenger, setPassenger] = useState({
        id: null,
        name: '',
        surname: '',
        destination: null,
        seat: null,
    });

    useEffect(()=>{

        const fetchAllPassengers = async () =>{

            try{
                const res = await axios.get('http://localhost:8800/passenger/')

                while(res.data[index].id != params.id) index++;

                setPassenger(res.data[index])
            }catch(err){
                console.log(err);
            }
        }
        
        fetchAllPassengers() 
    }, []);
    

    const navigate = useNavigate()
    const location = useLocation()

    const passengerId = location.pathname.split('/')[2];

    const handleChange = (e) =>{
        setPassenger((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleClick = async e =>{
        e.preventDefault()

        try{
            await axios.put('http://localhost:8800/passenger/' + passengerId, passenger)
            navigate('/passengers/' + params.id)
        }catch(err){
            console.log(err)
        }
    }

    console.log(passenger)

    return (
        <div className='form'>
            <h1>Update </h1>
            
            <label >Id</label>
                <input type='number' placeholder={passenger.id} onChange={handleChange} name='id' readOnly></input>

            <label>Firstname</label>
                <input type='text' placeholder={passenger.name} onChange={handleChange} name='name' required></input>
            
            <label> LastName</label>
                <input type='text' placeholder={passenger.surname} onChange={handleChange} name='surname' required></input>

            <label> Destination</label>
                <input type='number' placeholder={passenger.destination} onChange={handleChange} name='destination' required></input>

            <label>Seat </label>
                <input type='number' placeholder={passenger.seat} onChange={handleChange} name='seat' readOnly></input>

            <button className='formButton' onClick={handleClick}>Update</button>
        </div>
    )
}

export default UpdatePassenger