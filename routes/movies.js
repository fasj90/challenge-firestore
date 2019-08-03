const firebaseAdmin = require('firebase-admin');
const db = firebaseAdmin.firestore();
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) =>{
    // let movies = [];

    // db.collection('movies').get()
    // .then(function(querySanpshot){
    //     movies =
    //     querySanpshot.docs.map((movie) =>{
    //        return movie.data();
    //     });
    // });
    // res.send(movies);

    const moviesRef = await db.collection('movies').get();
    const movies = moviesRef.docs.map(movie => movie.data());
    res.json(movies);

    console.log(movies);
});

router.get('/:title', async (req, res) =>{
    const {title} = req.params;

    const movieDoc = await getMovieByTitle(title);
    res.json(movieDoc.data());
    console.log(movies);
});

router.post('/', async (req, res) =>{

    console.log(req.body);

    const movieRef = await db.collection('movies').add(req.body); 
    const movieDoc = await db.collection('movies').doc(movieRef.id).get();

    console.log(movieDoc.data());
    res.json({...movieDoc.data(), ...{id:movieRef.id}});
});

router.put('/:title', async (req, res) =>{
    const movieDoc = await getMovieByTitle(req.params.title);
    if(movieDoc){
        await movieDoc.ref.set(req.body);
        res.json(movieDoc.data());
    } else{

    }
});

router.patch('/:title', async (req, res) =>{
    const movieDoc = await getMovieByTitle(req.params.title);
    if(movieDoc){
        // await movieDoc.ref.set(req.body, {merge:true});
        await movieDoc.ref.update(req.body);
        res.json(movieDoc.data());
    } else{

    }
});

router.delete('/:title', async (req, res) =>{
    const movieDoc = await getMovieByTitle(req.params.title);
    if(movieDoc){
        await movieDoc.ref.delete();
        res.json(movieDoc.data());
    } else{

    }
});

async function getMovieByTitle(title){
    console.log('getMovieByTitle', title);

    const moviesRef = await db.collection('movies')
    .where("title", "==", title)
    .get();

    let movieDoc = null;
    if(!moviesRef.empty){
       movieDoc = moviesRef.docs[0];
    }

    return movieDoc;
}


module.exports = router;