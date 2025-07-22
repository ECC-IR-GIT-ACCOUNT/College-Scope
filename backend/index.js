const axios = require(`axios`);
const express = require('express');
const app  = express();
const cors = require('cors');

const APIKEY = "";

const corsOptions = {
    origin: "http://localhost:5173"
}

app.use(cors(corsOptions));

app.use(express.json());

app.post ('/api',async (req,res)=> {
    console.log("Working");
    console.log(req.body.values);// working geting the whole array in json form
    console.log(req.body.querries);// Showing the school Being searched
    console.log(req.body.valuesString);// value of the user selected label

    const schoolName = req.body.querries;
    const fieldsString = req.body.valuesString;
    const inputArray = req.body.values;
    try{
        const response = await axios.get(`https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${encodeURI(APIKEY)}&school.name=${schoolName}&fields=${fieldsString}`);
        console.log(`APIs Response`);
        const apiResponse = response.data.results[0];// The data with index 0 is the best match returned by the API for a querry
        
        // Converting the apiResponse (Raw JSON pbeject into array for easy workability)
        const arrayData = Object.entries(apiResponse).map(([key, result]) => ({
            key,
            result}));
        console.log(`After Modification`);
        console.log(arrayData);
        // sending the arrayData to frontend for further processing

        for (let i = 0; i<arrayData.length; i++){
            
            for (let j = 0; j<inputArray.length;j++){
                if (arrayData[i].key === inputArray[j].value){
                    arrayData[i].key = inputArray[j].label; 
                    break;
                };
            };
        };

        const integers = [];
        const floats = [];
        const strings = [];
        const noresponse = [];

        for (let i = 0; i < arrayData.length; i++) {
            const result = arrayData[i].result;

            if (result === null || result === undefined) {
                noresponse.push(arrayData[i]);
            } else if (typeof result === 'number') {
                if (Number.isInteger(result)) {
                integers.push(arrayData[i]);
                } else {
                floats.push(arrayData[i]);
                }
            } else if (typeof result === 'string') {
                strings.push(arrayData[i]);
            }
        }

        const sortedArrayData = {
            int: integers,
            float: floats,
            string: strings,
            null: noresponse
        };



        console.log(`After Changing the Name of Keys`);
        console.log(sortedArrayData);
        res.json(sortedArrayData);


    }
    catch(error){
        console.log(`Getting Some Error!: ${error}`);
        res.status(500).json({Error:`Not Being able to get Data from API, check field Name & School Name`});
    }

    
})

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})