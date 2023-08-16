import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateDestination = () => {

    const params = useParams();
    let index = 0;

    const [destination, setDestination] = useState({
        id: null,
        country: '',
        company: '',
    });

    useEffect(()=>{

        const fetchAllDestinations = async () =>{

            try{
                const res = await axios.get('http://localhost:8800/destination/')

                while(res.data[index].id != params.id) index++;

                setDestination(res.data[index])
            }catch(err){
                console.log(err);
            }
        }
        
        fetchAllDestinations() 
    }, []);
    

    const navigate = useNavigate()
    const location = useLocation()

    const destinationId = location.pathname.split('/')[2];

    const handleChange = (e) =>{
        setDestination((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleClick = async e =>{
        e.preventDefault()

        try{
            await axios.put('http://localhost:8800/destination/' + destinationId, destination)
            navigate('/')
        }catch(err){
            console.log(err)
        }
    }

    console.log(destination)

    return (
        <div className='form'>
            <h1>Update Destination</h1>

            <label>Id</label>
            <input type='number' placeholder={destination.id} onChange={handleChange} name='id' readOnly></input>

            <label>Country</label>
            <input type='text' placeholder={destination.country} onChange={handleChange} name='country' required></input>

            <label>Company</label>
            <input type='text' placeholder={destination.company} onChange={handleChange} name='company' required></input>

            <button className='formButton' onClick={handleClick}>Update</button>
        </div>
    )
}

export default UpdateDestination