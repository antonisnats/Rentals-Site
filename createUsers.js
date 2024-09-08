const fs = require('fs');
const bcrypt = require('bcrypt');

// Function to generate a hashed password using bcrypt
const hashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

// Array of user objects
const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
  // Add more users as needed
];

// Create an asynchronous function to execute the code
const generateUsersJson = async () => {
  // Hash passwords and create an array of user objects with hashed passwords
  const usersWithHashedPasswords = await Promise.all(
    users.map(async (user) => ({
      username: user.username,
      hashedPassword: await hashPassword(user.password),
      favourites:[]
    }))
  );

  // Convert the array to JSON
  const jsonData = JSON.stringify(usersWithHashedPasswords, null, 2);

  // Write the JSON data to a file (users.json)
  fs.writeFileSync('users.json', jsonData);

  console.log('Users JSON file created successfully.');
};

// Call the asynchronous function
generateUsersJson();
