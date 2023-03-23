import { useState, useEffect } from "react";
import "./App.css";
import { Debit, Credit, Dashboard, Home, PastTransactions } from "./pages";
import { Navbar, Sidebar } from "./components";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink,
} from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";
import { Amplify, Auth } from "aws-amplify";
import awsmobile from "./aws-exports";
import NavbarContext from "./contexts/NavbarContexts";

Amplify.configure(awsmobile);

const App = () => {
    const [sidebarActive, setSidebarActive] = useState(false);
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    useEffect(() => {
        let userInfo;
        (async (userInfo) =>
            (userInfo = await Auth.currentAuthenticatedUser().catch((err) => {
                userInfo = { error: "Not logged in." };
            })))();

        setTimeout(() => {}, 1000);

        if (!userInfo) {
            setUserLoggedIn(false);
        } else {
            setUserLoggedIn(true);
        }
    }, []);

    return (
        <div className="App bg-gray-100 h-screen">
            <Router>
                <NavbarContext.Provider
                    value={{
                        login: [userLoggedIn, setUserLoggedIn],
                        sidebarState: [sidebarActive, setSidebarActive],
                    }}
                >
                    <div className=" flex flex-row">
                        {sidebarActive && <Sidebar />}

                        <div className="w-screen flex-col">
                            <Navbar />

                            <Routes>
                                <Route path="/" element={<Home />}></Route>
                                <Route
                                    path="/Dashboard"
                                    element={<Dashboard />}
                                ></Route>
                                <Route
                                    path="/Deposit"
                                    element={<Debit type="deposit" />}
                                ></Route>
                                <Route
                                    path="/Withdraw"
                                    element={<Debit type="withdraw" />}
                                ></Route>
                                <Route
                                    path="/Pasttransactions"
                                    element={<PastTransactions />}
                                ></Route>
                            </Routes>
                        </div>
                    </div>
                </NavbarContext.Provider>
            </Router>
        </div>
    );
};

export default App;
