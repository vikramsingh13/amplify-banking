import React from "react";
import { useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillBell } from "react-icons/ai";
import { MdKeyboardArrowDown } from 'react-icons/md';
import NavbarContext from "../../contexts/NavbarContexts";

const Navbar = () => {
    const { login, sidebarState } = useContext(NavbarContext);
    const [userLoggedin, setUserLoggedIn] = login;
    const [sidebarActive, setSidebarActive] = sidebarState;

    const handleSidebarToggle = () => {
        setSidebarActive(!sidebarActive);
    }
    
    return (
        <div className="flex relative p-4 justify-between bg-red-200 items-center">
            <div>
                <button onClick={handleSidebarToggle}>
                    <GiHamburgerMenu className="w-8 h-8"/>
                </button>
            </div>
            <div className="flex justify-around items-center">
                <AiFillBell className="w-8 h-8"/>
                <div
                    className="flex item-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
                    
                >
                    <img src="images/profile.jpg" className="rounded-full w-8 h-8" />
                    <p>
                        <span className="text-gray-400 text-14">Hi, </span>{" "}
                        <span className="text-gray-400 font-bold ml-1 text-14">
                            John
                        </span>
                    </p>
                    <MdKeyboardArrowDown className="text-gray-400 text-14" />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
