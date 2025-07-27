const axios = require(`axios`);
const express = require('express');
const path = require('path');
const app  = express();
const cors = require('cors');
require('dotenv').config();

const APIKEY = "qcHfgGcts5WZjVl0g3Oto94ePEDB8Bg06sMgDCJW";
const PORT = process.env.PORT||5000;

const corsOptions = {
    origin: ["http://localhost:5173", "https://your-app-name.onrender.com"] // Allow both local dev and production
}

app.use(cors(corsOptions));
app.use(express.json());

// Serve static files from React build (production)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
}

// Add root route to fix "Cannot GET /" error
app.get('/', (req, res) => {
    if (process.env.NODE_ENV === 'production') {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    } else {
        res.json({ 
            message: 'College Scope API is running!', 
            status: 'success',
            endpoints: {
                'POST /api': 'Get college data'
            }
        });
    }
});

// Health check endpoint (optional but recommended)
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.post('/api', async (req, res) => {
    console.log("Working");
    console.log(req.body.values);// working getting the whole array in json form
    console.log(req.body.querries);// Showing the school being searched
    console.log(req.body.valuesString);// value of the user selected label

    const schoolName = req.body.querries;
    const fieldsString = req.body.valuesString;
    const inputArray = req.body.values;
    
    try {
        const response = await axios.get(`https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${encodeURI(APIKEY)}&school.name=${schoolName}&fields=${fieldsString}`);
        console.log(`APIs Response`);
        const apiResponse = response.data.results[0];// The data with index 0 is the best match returned by the API for a query
        
        // Converting the apiResponse (Raw JSON object into array for easy workability)
        const arrayData = Object.entries(apiResponse).map(([key, result]) => ({
            key,
            result
        }));
        console.log(`After Modification`);
        console.log(arrayData);
        // sending the arrayData to frontend for further processing

        for (let i = 0; i < arrayData.length; i++) {
            for (let j = 0; j < inputArray.length; j++) {
                if (arrayData[i].key === inputArray[j].value) {
                    arrayData[i].key = inputArray[j].label; 
                    break;
                }
            }
        }

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

    } catch(error) {
        console.log(`Getting Some Error!: ${error}`);
        res.status(500).json({Error: `Not being able to get Data from API, check field Name & School Name`});
    }
});

// Catch all handler: send back React's index.html file for any non-API routes (production only)
app.get('*', (req, res) => {
    if (process.env.NODE_ENV === 'production') {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    } else {
        res.status(404).json({ error: 'Route not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
});