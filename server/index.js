import express from 'express';
import myslq from 'mysql';
import cors from 'cors';

const app = express()

const db = myslq.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Adcgt00!',
    database: 'project'
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res)=> {
    res.json("Hello this is the backend ")
})

app.get('/passenger', (req, res)=>{
    const q = "SELECT * FROM passenger"
    db.query(q, (err, data)=>{
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post('/passenger', (req, res)=>{
    const q = "INSERT INTO passenger (id, name, surname, destination, seat) VALUES (?)"
    const values = [
        req.body.id,
        req.body.name,   
        req.body.surname,
        req.body.destination,
        req.body.seat,
    ];

    db.query(q, [values], (err, data)=>{
        if (err) return res.json(err)
        return res.json('Passenger has created succesfully')
    })
})

app.delete('/passenger/:id', (req, res) =>{
    const passengerId = req.params.id;
    const q = 'DELETE FROM passenger WHERE id = ?'

    db.query(q, [passengerId], (err, data)=>{
        if (err) return res.json(err)
        return res.json("Passenger has deleted succesfully")
    })
})

app.put('/passenger/:id', (req, res) =>{
    const passengerId = req.params.id;
    const q = "UPDATE passenger SET id = ?, name = ?, surname = ?, destination = ?, seat = ? WHERE id = ?"

    const values = [
        req.body.id,
        req.body.name,
        req.body.surname,
        req.body.destination,
        req.body.seat,
    ]

    db.query(q, [...values, passengerId], (err, data)=>{
        if (err) return res.json(err)
        return res.json("Passenger has updated succesfully")
    })
})



app.get('/destination', (req, res)=>{
    const q = "SELECT * FROM destination"
    db.query(q, (err, data)=>{
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post('/destination', (req, res)=>{
    const q = "INSERT INTO destination (id, country, company) VALUES (?)"
    const values = [
        req.body.id,
        req.body.country,   
        req.body.company,
    ];

    db.query(q, [values], (err, data)=>{
        if (err) return res.json(err)
        return res.json('Destination has created succesfully')
    })
})

app.delete('/destination/:id', (req, res) =>{
    const destinationId = req.params.id;
    const q = 'DELETE FROM destination WHERE id = ?'

    db.query(q, [destinationId], (err, data)=>{
        if (err) return res.json(err)
        return res.json("Destination has deleted succesfully")
    })
})

app.put('/destination/:id', (req, res) =>{
    const destinationId = req.params.id;
    const q = "UPDATE destination SET id = ?, country = ?, company = ? WHERE id = ?"

    const values = [
        req.body.id,
        req.body.country,
        req.body.company,
    ]

    db.query(q, [...values, destinationId], (err, data)=>{
        if (err) return res.json(err)
        return res.json("Destination has updated succesfully")
    })
})

app.post('/seat', (req, res)=>{
    const q = "INSERT INTO seat (id, type, destination) VALUES (?)"
    const values = [
        req.body.id,
        req.body.type,   
        req.body.destination,
    ];

    db.query(q, [values], (err, data)=>{
        if (err) return res.json(err)
        return res.json('Seats have created succesfully')
    })
})

app.delete('/seat/:id', (req, res) =>{
    const seatId = req.params.id;
    const q = 'DELETE FROM seat WHERE destination = ?'

    db.query(q, [seatId], (err, data)=>{
        if (err) return res.json(err)
        return res.json("Seats have deleted succesfully")
    })
})

app.listen(8800, ()=>{
    console.log('Connected to backend')
})