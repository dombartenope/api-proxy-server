const url = require('url');
const express = require('express');
const needle = require('needle');
const router = express.Router();
const apicache = require('apicache');

//initialize the cache
let cache = apicache.middleware;
//use cache in router.get & specify amount of time res should be cached
router.get('/', cache('2 minutes'), async (req, res) => {
    try {

        const params = new URLSearchParams({
            [process.env.API_KEY_NAME]: process.env.API_KEY_VALUE,
            ...url.parse(req.url, true).query
        })

        const apiRes = await needle('get', `${process.env.API_BASE_URL}?${params}`);

        const data = apiRes.body;

        //Log the request to the public API
        if(process.env.NODE_ENV !== 'production') {
            console.log(`REQUEST ${process.env.API_BASE_URL}?${params}`)
        }
    
        res.status(200).json(data);
        
    } catch (error) {
        res.status(500).json({error});
    }
});

module.exports = router;