// Require the UserModel module
const UserModel = require("./models/Users");

// Function to get a user by username
async function getByUsername(userParam) {
    // Log searching message
    console.log("seaching for username...");
    // Find user by username and password
    const response = await UserModel.findOne({ username: userParam.username,  password: userParam.password });
    return response;
}

// Function to create a new user
async function create(userParam) {
    // Log creating message
    console.log("creating...");
    // Validate if the username is already taken
    if (await UserModel.findOne({ username: userParam.username })) {
        // Throw an error if username is taken
        throw 'Username "' + userParam.username + '" is already taken';
    }
    // Create a new user instance
    const user = new UserModel(userParam);

    // Save the user
    await user.save();
}

// Export the functions
module.exports = {
    getByUsername,
    create,
};
