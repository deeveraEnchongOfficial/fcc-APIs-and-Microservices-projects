const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// Root endpoint. Display index file
app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'));

// Handle returning a timestamp
app.get('/api/:date?', (req, res) => {
    // Store our date response. This will default to the current datetime
    let date = new Date();

    // Check if the optional date parameter was provided
    if (req.params.date) {
        // Convert the date parameter to a string
        let unixDate = +req.params.date;

        // Check if the date passed is unix time. If it's not, use the date string provided
        date = isNaN(unixDate) ? new Date(req.params.date) : new Date(unixDate);

        // Check if the date created is valid. Throw an error if it's an invalid date
        if (!(date instanceof Date) || isNaN(date.getTime())) return res.json({ error: "Invalid Date" });
    }

    // Return the unix and UTC time
    return res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// Create a listener to handle requests
const listener = app.listen(process.env.PORT, () => console.log('Your app is listening on port ' + listener.address().port));