const express = require('express');

const router = express.Router(); //gives us an object that lets us register middleware and can export configured routers


const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'title one',
        description: 'its the first one',
        location: {
            lat: 40.74324,
            lng: -73.98
        },
        address: '20 something',
        creator: 'u1'
    }
]

//look at route orders!! 
router.get('/:pid', (req, res, next) => {
    const placeId = req.params.pid //params holds an object where dynamic is held as keys and the values
    const place =DUMMY_PLACES.find(p => { //array finding in the dummy places the id that matches the url for pid
        return p.id === placeId;
    })

    if(!place) {
        const error = new Error('Could not find a place for provided id');
        error.code = 404;
        return next(error); //NEEDED FOR ASYNC forwards it to the next middleware in line
        //throw error = no need to return but for next(error) you need to return
    }
    res.json({place}); //same as place: place
})

router.get('/user/:uid', (req,res,next) => {
    const userId = req.params.uid
    const place = DUMMY_PLACES.find(p => {
        return p.creator === userId;
    })

    if(!place) {
        // return res.status(404).json({message: 'Could not find a place for the provided user id!'})
        const error = new Error('Could not find a place for provided user id');
        error.code = 404;
        return next(error);
    }
    res.json({place})
})

module.exports = router; //exporting the file as the name router 