const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid').v4;
const fs = require('fs');
const bcrypt = require('bcrypt');
const app = express();
const util = require('util');

// Serve static files from the 'views' directory
app.use(express.static(path.join(__dirname, '/')));

// Check if the flag file exists
const flagFilePath = './users.json';

if (!fs.existsSync(flagFilePath)) {

  // Create the flag file to indicate that the command has been executed
  require('./createUsers')

  console.log('One-time command executed successfully.');
} else {
  console.log('One-time command has already been executed.');
}



// Define a route to render the home page at the root URL ('/')
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Sending index.html as the response
});

app.get('/category',(req,res) => {
    res.sendFile(path.join(__dirname, 'category.html'))
})

app.get('/subcategory',(req,res) => {
  res.sendFile(path.join(__dirname, 'subcategory.html'))
})

app.get('/favourite-ads',(req,res) => {
  res.sendFile(path.join(__dirname, 'favourite-ads.html'))
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const usersData = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
  const user = usersData.find((u) => u.username === username);
  if (user) {
    // Compare the provided password with the hashed password in the file
    console.log(password,user.hashedPassword)
    bcrypt.compare(password, user.hashedPassword, (err, result) => {
      if (result) {
        // Passwords match - authentication successful
        const sessionId = uuidv4();
        res.json({ success: true, sessionId, username: user.username });
      } else {
        // Passwords do not match
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    });
  } else {
    // User not found
    res.status(404).json({ success: false, message: 'User not found' });
  }
});

const writeFileAsync = util.promisify(fs.writeFile);

// Endpoint to handle storing adIds for each user
app.post('/storeAdId', async (req, res) => {
  const { current_user , adId, add_title, add_desc, add_cost, add_image, sessionId } = req.body;
  if (!current_user && !adId) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  try {
    // Read the user-specific JSON file
    const filePath = `./users.json`;

    try {
      // Read the file asynchronously
      const data = await fs.promises.readFile(filePath, 'utf8');
      // Parse the JSON data
      const users = JSON.parse(data);
      // Find the user with the specified username
      const targetUserIndex = users.findIndex(user => user.username === current_user);
      if (targetUserIndex !== -1) {
        // Check for duplicate adId in the favourites array
        const isDuplicate = users[targetUserIndex].favourites.some(item => item.adId === adId);
        if (!isDuplicate){
          // Add the adId to the favourites
          const add={adId, add_title, add_desc, add_cost, add_image, sessionId}
          users[targetUserIndex].favourites.push(add)
          // Write the updated data back to the file
          await writeFileAsync(filePath, JSON.stringify(users, null, 2), 'utf8');
          return res.status(200).json({success:true})
        } else {
          // Duplicate found, handle accordingly (e.g., send a response or log a message)
          return res.status(409).json({ error: `Add already in favourites` });
        }
      } else {
        // User not found
        console.log(`User '${current_user}' not found.`);
        return res.status(404).json({ error: `User '${current_user}' not found.` });
      }
    } catch (error) {
      console.error('Error reading or writing the file:', error.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } catch (error) {
    console.error('Error storing adId:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server and listen on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});