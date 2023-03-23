import {useState} from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { getUser, createUser } from "../api/transactions";

const Dashboard = ({signOut, user}) => {
    const [message, setMessage] = useState("");
    const handleCreateUser = async(e) => {
        e.preventDefault();

        const userInfo = await getUser();

        if(userInfo){
            setMessage("User already exists.")
        } else {
            const newUser = await createUser();
            setMessage("User created")
        }


    };
    return (
        <div>
            <div>Dashboard</div>
            <div>
                <button className=" capitalize bg-red-200 hover:bg-red-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleCreateUser}>
                    Create User
                </button>
            </div>
            <div>
                {message}
            </div>

            <div><button type="button" onClick={signOut}>Sign Out</button></div>
        </div>
    );
};

export default withAuthenticator(Dashboard);
