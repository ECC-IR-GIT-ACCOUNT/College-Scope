const axios = require(`axios`);
const express = require('express');
const app  = express();
const cors = require('cors');

const APIKEY = "YOUR COLLEGE SCORE CARD API KEY"; 

const corsOptions = {
    origin: "http://localhost:5173"
}

app.use(cors(corsOptions));

app.use(express.json());

app.post ('/api',async (req,res)=> {
    console.log("Working");
    console.log(req.body.values);// working geting the whole array in json form
    console.log(req.body.querries);// working getting the search
    console.log(req.body.valuesString);// value of the user selected label
    //console.log(req.body.values.value);// not working rn
    //console.log(req.body.values.label);// not working rn

    const schoolName = req.body.querries;
    const fieldsString = req.body.valuesString;

    try{
        const response = await axios.get(`https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${encodeURI(APIKEY)}&school.name=${schoolName}&fields=${fieldsString}`);
        console.log(`APIs Response`);
        console.log(response.data.results);
        res.json(response.data.results[0]);
    }
    catch(error){
        console.log(`Getting Some Error!: ${error}`);
        res.status(500).json({Error:`Not Being able to get Data from API, check field Name & School Name`});
    }

    
})

/*app.get('/api', (req,res)=>{
    res.json ("Hello from the backend!");
})*/

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})