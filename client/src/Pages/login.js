import React, { useEffect, useState } from 'react'; // Import React and necessary hooks
import axios from 'axios'; // Import axios for making HTTP requests
import { useHistory } from "react-router-dom"; // Import useHistory hook for navigation

const Login = () => { // Define Login component
    const history = useHistory(); // Initialize useHistory hook to manage navigation
    const [user, setUser] = useState({ // Initialize state for user data
        username: "", // Initialize username field
        password: "", // Initialize password field
        userbiokey: -1 // Initialize user bio key field
    });
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle the state to show/hide password
    };
    const [keyevent, setkeyevent] = useState({ // Initialize state for key events
        //Dwell time refers to the duration between pressing and releasing a specific key. It measures how long a key is held down before being released.
        DT: [], // Initialize array for dwell time
        //Flight time, also known as key transition time, is the duration between releasing one key and pressing the next key.
        FT: [], // Initialize array for flight time
        //Type speed, often calculated as words per minute (WPM), is a measure of how fast a user can type.
        TS: [], // Initialize array for type speed
    });

    var lastup = -1; // Initialize variable to track last key up event
    var lastdown= -1; // Initialize variable to track last key down event

    const handleChange = (key, e) => { // Define function to handle input change
        var value = e; // Initialize value variable
        if (key !== "userbiokey") { // Check if key is not userbiokey
            value = e.target.value; // Assign input value
        }
        setUser({ // Update user state with new value
            ...user, // Spread existing user state
            [key]: value, // Update specified key with new value
        });
    };

    

    const handleSetkeyevent = (key, value) => { // Define function to set key events
        setkeyevent({ // Update keyevent state with new value
            ...keyevent, // Spread existing keyevent state
            [key]: value, // Update specified key with new value
        });
    };

    const captureKeyEvent = (e) => { // Define function to capture key events
        if (e.key.length > 1) { // Check if key is a special key
            if (e.key === "Backspace") { // Check if key is Backspace
                handleSetkeyevent("DT", []); // Reset dwell time array
                handleSetkeyevent("FT", []); // Reset flight time array
                handleSetkeyevent("TS", []); // Reset type speed array
                return; // Exit function
            }
        }

        if (e.type === "keydown") { // Check if event type is keydown
            if (lastup >= 0) { // Check if last key up event exists
                const flight = e.timeStamp - lastup; // Calculate flight time
                keyevent.FT.push(flight); // Add flight time to array
                console.log("Flight ", keyevent.FT, "key ", e.key); // Log flight time
            }
            if (lastdown >= 0) { // Check if last key down event exists
                const typespeed = e.timeStamp - lastdown; // Calculate type speed
                keyevent.TS.push(typespeed); // Add type speed to array
                console.log("Type Speed ", keyevent.TS, "key ", e.key); // Log type speed
            }
            lastdown = e.timeStamp; // Update last key down event
            console.log("lastdown ", lastdown); // Log last key down event
        } else { // If event type is not keydown
            if (lastdown >= 0) { // Check if last key down event exists
                const dwel = e.timeStamp - lastdown; // Calculate dwell time
                keyevent.DT.push(dwel); // Add dwell time to array
            }
            lastup = e.timeStamp; // Update last key up event
            console.log("lastup ", lastup); // Log last key up event
            console.log("Dwell ", keyevent.DT, "key ", e.key); // Log dwell time
        }
    };

    useEffect(() => { // useEffect hook to handle component side effects
        const passwordfeild = document.getElementById('sign-in-password'); // Get password field element
        passwordfeild.onkeydown = captureKeyEvent; // Attach keydown event listener
        passwordfeild.onkeyup = captureKeyEvent; // Attach keyup event listener
    }, []); // Empty dependency array to run effect only once

    const handleRegister = async(e) => { // Define function to handle registration
        e.preventDefault(); // Prevent default form submission behavior
        try {
            await axios.post("http://localhost:3001/login", user).then((res) => { // Send POST request to login endpoint
                var user = res.data; // Get user data from response
                alert(`Welcome ${user.name}` + ', your login success!'); // Show alert with user's name
                console.log({ user }); // Log user data
                history.push("/"); // Navigate to home page
            });
        } catch(err) { // Catch any errors
            if (axios.isAxiosError(err)) { // Check if error is an Axios error
                console.log({err}); // Log error
                alert(err.response.data.message); // Show alert with error message
                console.log(user.userbiokey, " not match with existing biokey"); // Log bio key mismatch
                history.push("/"); // Navigate to home page
            }
        }
    };
    function handlelogin(e) {
        e.preventDefault(); // Prevent default form submission behavior
        let sum = 0;
        const numDwellFlight = keyevent.DT.length; // Number of keystrokes with dwell time and flight time
        const numTypeSpeed = keyevent.TS.length; // Number of keystrokes with type speed
        
        // Calculate sum of dwell times and flight times
        for (let i = 0; i < numDwellFlight; i++) {
            sum += keyevent.DT[i] + keyevent.FT[i];
        }
        
        // Add sum of type speeds
        for (let i = 0; i < numTypeSpeed; i++) {
            sum += keyevent.TS[i];
        }
        
        // Calculate total number of keystrokes
        const totalKeystrokes = numDwellFlight + numTypeSpeed;
        
        // Calculate biokey
        user.userbiokey = sum / totalKeystrokes;
        
        console.log("userbiokey", user.userbiokey); // Log user bio key
        handleRegister(e); // Call handleRegister function
    }
    

    return (
        <div className="flex flex-col w-full max-w-md px-4 py-8 bg-gray-900 rounded-lg shadow sm:px-6 md:px-8 lg:px-10 text-white"> {/* Login form container"> {/* Login form container */}
            <div className="self-center mb-6 text-2xl font-bold sm:text-3xl"> {/* Login header */}
                Login To Your Account
            </div>
            <div className="mt-8"> {/* Form container */}
                <form action="#" autoComplete="off" onSubmit={handlelogin}> {/* Form element */}
                    <div className="flex flex-col mb-8"> {/* Username field container */}
                        <div className="flex relative "> {/* Username field */}
                            <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm"> {/* Username field icon */}
                                <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z">
                                    </path>
                                </svg>
                            </span>
                            <input type="text" id="sign-in-name" className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="username" value={user.username} onChange={e => handleChange('username', e)} placeholder="Enter your username" /> {/* Username input field */}
                        </div>
                    </div>
                    <div className="flex flex-col mb-6"> {/* Password field container */}
                        <div className="flex relative "> {/* Password field */}
                            <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm"> {/* Password field icon */}
                                <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z">
                                    </path>
                                </svg>
                            </span>
                            {/* Password Box*/}
                            <input id="sign-in-password" className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="password" value={user.password} onChange={e => handleChange('password', e)} placeholder="Enter your password" /> {/* Password input field */}
                            {/* <input type="password" id="sign-in-password" class=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="password" value={user.password} onChange={captureInputEvent} placeholder="Your password" /> */}
                        </div>
                    </div>
                    <div className="flex w-full"> {/* Submit button container */}
                        <button type="submit" className="py-2 px-4  bg-black hover:bg-gray-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"> {/* Submit button */}
                            Login
                        </button>
                    </div>
                </form>
            </div>
            
            <span class="flex justify-end text-sm text-center items-center text-gray-400 pt-4">
                Don't have account?
                <a href="/register" class="text-sm text-blue-500 underline hover:text-blue-700">
                    Sign up
                </a>
            </span>

        </div>
    ); // Close Login form container
}; // Close Login component

export default Login; // Export Login component
