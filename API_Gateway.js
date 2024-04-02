express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;
const cors = require('cors');
const axios = require('axios');

// Benutzerdaten
const users = [
  { id: 1, username: 'user', password: 'pass' }
];

app.use(cors());

app.use(express.json());

// Login-Endpunkt,JWT-Token
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, 'secret_key', { expiresIn: '1h' });
  res.json({ token });
});


//Kundenbeanstandung erfassen
app.post('/Kundenbeanstandung-erf', verifyToken, (req, res) => {
  axios.post('http://127.0.0.1:5000/KBeanstandungen-erf', req.body)
    .then(response => {
      res.json({ message: 'Complaint submitted successfully', data: response.data });
    })
    .catch(error => {
      console.error('Fehler bei der Anfrage:', error.message);
      if (error.response) {
        res.status(error.response.status).json({ message: 'Error from Flask API', error: error.response.data });
      } else {
        res.status(500).json({ message: 'Error submitting complaint', error: error.message });
      }
    });
});

//Lieferantenbeanstandung erfassen
app.post('/Lieferantenbeanstandung-erf', verifyToken, (req, res) => {
  axios.post('http://127.0.0.1:5000/LBeanstandungen-erf', req.body)
    .then(response => {
      res.json({ message: 'Complaint submitted successfully', data: response.data });
    })
    .catch(error => {
      console.error('Fehler bei der Anfrage:', error.message);
      if (error.response) {
        res.status(error.response.status).json({ message: 'Error from Flask API', error: error.response.data });
      } else {
        res.status(500).json({ message: 'Error submitting complaint', error: error.message });
      }
    });
});

//Kundenbeanstandungen abfragen
app.get('/KBeanstandunge-abf', verifyToken, (req, res) => {
  axios.get('http://127.0.0.1:5000/KBeanstandunge-abf')
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      console.error('Fehler bei der Anfrage:', error.message);
      if (error.response) {
        res.status(error.response.status).json({ message: 'Error from Flask API', error: error.response.data });
      } else {
        res.status(500).json({ message: 'Error submitting complaint', error: error.message });
      }
    });
});

//Lieferantenbeanstandungen abfragen
app.get('/LBeanstandunge-abf', verifyToken, (req, res) => {
  axios.get('http://127.0.0.1:5000/LBeanstandunge-abf')
    .then(response => {t
      res.json(response.data);
    })
    .catch(error => {
      console.error('Fehler bei der Anfrage:', error.message);
      if (error.response) {
        res.status(error.response.status).json({ message: 'Error from Flask API', error: error.response.data });
      } else {
        res.status(500).json({ message: 'Error submitting complaint', error: error.message });
      }
    });
});

//Zu bearbeitende Kundenbeanstandung abfragen
app.post('/KBeanstandunge-abf/anp', verifyToken, (req, res) => {
  axios.post('http://127.0.0.1:5000/KBeanstandunge-abf/anp', req.body)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      console.error('Fehler bei der Anfrage:', error.message);
      if (error.response) {
        res.status(error.response.status).json({ message: 'Error from Flask API', error: error.response.data });
      } else {
        res.status(500).json({ message: 'Error submitting complaint', error: error.message });
      }
    });
});

//Zu bearbeitende Lieferantenbeanstandung abfragen
app.post('/LBeanstandunge-abf/anp', verifyToken, (req, res) => {
  axios.post('http://127.0.0.1:5000/LBeanstandunge-abf/anp', req.body)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      console.error('Fehler bei der Anfrage:', error.message);
      if (error.response) {
        res.status(error.response.status).json({ message: 'Error from Flask API', error: error.response.data });
      } else {
        res.status(500).json({ message: 'Error submitting complaint', error: error.message });
      }
    });
});

//Kundenbeanstandung bearbeiten
app.post('/Kundenbeanstandung-anp', verifyToken, (req, res) => {
  axios.post('http://127.0.0.1:5000/KBeanstandungen-anp', req.body)
    .then(response => {
      res.json({ message: 'Complaint submitted successfully', data: response.data });
    })
    .catch(error => {
      console.error('Fehler bei der Anfrage:', error.message);
      if (error.response) {
        res.status(error.response.status).json({ message: 'Error from Flask API', error: error.response.data });
      } else {
        res.status(500).json({ message: 'Error submitting complaint', error: error.message });
      }
    });
});

//Kundenbeanstandung bearbeiten
app.post('/Lieferantenbeanstandung-anp', verifyToken, (req, res) => {
  axios.post('http://127.0.0.1:5000/LBeanstandungen-anp', req.body)
    .then(response => {
      res.json({ message: 'Complaint submitted successfully', data: response.data });
    })
    .catch(error => {
      console.error('Fehler bei der Anfrage:', error.message);
      if (error.response) {
        res.status(error.response.status).json({ message: 'Error from Flask API', error: error.response.data });
      } else {
        res.status(500).json({ message: 'Error submitting complaint', error: error.message });
      }
    });
});

// JWT-Token überprüfen
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    jwt.verify(bearerToken, 'secret_key', (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    res.sendStatus(403);
  }
}


app.listen(port, () => {
  console.log(`API Gateway listening at http://localhost:${port}`);
});