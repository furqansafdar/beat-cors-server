const express = require('express');
const request = require('request');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

/*
app.get('/jokes/random', (req, res) => {
  request(
    { url: 'https://joke-api-strict-cors.appspot.com/jokes/random' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }

      res.json(JSON.parse(body));
    }
  )
});
*/

app.get('*', (req, res) => {
  debugger;

  const protocol = req.protocol;
  //const host = req.hostname;
  //const port = process.env.PORT || PORT;
  var url = req.originalUrl;
  if (url && url != '/') {    
    url = url.substring(1, url.length);
    console.log("Request:" + url);
  } else {
    console.log("Request: No URL found!");
    return;
  }
  
  //const fullUrl = `${protocol}://${url}`;
  //const fullUrl = url.replace(":/", "://");
  const fullUrl = url;

  request(
    //{ url: 'https://joke-api-strict-cors.appspot.com/jokes/random' },
    { url: fullUrl },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: error.message });
      }

      //console.log(body);

      //res.json(JSON.parse(body));
      res.send(body);
    }
  )
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
