import React, { useState } from 'react'
import Axios from "axios";

const Register = () => {
    const [user, setUser] = useState({
        name: "",
        username: "",
        password: "",
        userbiokey: 200, // Default user biokey
        Threshold: null, // Threshold for password length
    })
    // Function to handle changes in input fields
    const handleChange = (key, e) => {
        var value = e
        if (key !== "userbiokey" && key !== "Threshold") {
            value = e.target.value
        }
        setUser({
            ...user,//spread operator
            [key]: value,
        })
    }
    // Function to create a new user
    const onCreateUser = async() => {
        const isDataAvailable = !!(user.name && user.username && user.password && user.userbiokey && user.Threshold)
        if (isDataAvailable) {
            // Send a POST request to register the user
            Axios.post("http://localhost:3000/register", user)
                .then(res => alert("successful create"))
            // Redirect to login page
            window.href = "/login"
        }
        else {
            alert("invalid input")
        };
    }

    // Function to handle user registration
    const handleRegister = (e) => {
        e.preventDefault()
        // Determine the threshold based on password length
        if (user.password.length > 7 && user.password.length < 11){ //8-10
            user.Threshold = 20
        } else if (user.password.length > 10 && user.password.length < 21){ //11-20
            console.log("here");
            user.Threshold = 30
        } else if (user.password.length > 20 && user.password.length < 31){ //21-30
            user.Threshold = 40
        } else {
            alert("Error: Password length should be between 8 to 30 characters.");
            return;
        }
        console.log(user.Threshold); 
        onCreateUser() // Call function to create user
    }

    return (
        <div class="flex flex-col w-full max-w-md px-4 py-8 bg-gray-900 rounded-lg shadow sm:px-6 md:px-8 lg:px-10 text-white">
            <div class="self-center mb-6 text-2xl font-bold sm:text-3xl">
                Create a new account
            </div>
            
            <div class="p-5 mt-1">
                <form action="#" onSubmit={handleRegister}>
                    <div class="flex flex-col mb-2">
                        <div class=" relative ">
                            <input type="text" id="create-account-name" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="name" value={user.name} onChange={e => handleChange("name", e)} placeholder="Enter name" />
                        </div>
                    </div>
                    <div class="flex flex-col mb-2">
                        <div class=" relative ">
                            <input type="text" id="create-account-username" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="username" value={user.username} onChange={e => handleChange("username", e)} placeholder="Enter username" />
                        </div>

                    </div>
                    <div class="flex flex-col mb-2">
                        <div class=" relative ">
                            <input id="create-password" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="password" value={user.password} onChange={e => handleChange("password", e)} placeholder="Enter password" />
                        </div>
                    </div>
                    
                    
                    <div class="flex flex-col mb-2">
                        <div class=" relative ">
                            <input id="create-password" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="password" value={user.password} onChange={e => handleChange("password", e)} placeholder="Confirm password" />
                        </div>
                    </div>
                    
                    <div class="flex w-full my-4">
                        <button type="submit" class="py-2 px-4  bg-black hover:bg-gray-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg " >
                            Register
                        </button>
                    </div>
                    <span class="flex justify-end text-sm text-center items-center text-gray-400">
                        Already have an account ?
                        <a href="/" class="text-sm text-blue-500 underline hover:text-blue-700">
                            Sign in
                        </a>
                    </span>

                </form>
            </div>
        </div>
    )
}


export default Register