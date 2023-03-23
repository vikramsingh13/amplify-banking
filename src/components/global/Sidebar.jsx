import { useContext } from "react";
import NavbarContext from "../../contexts/NavbarContexts";
import { TbPigMoney } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

const Sidebar = () => {
    const activeLink = "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-blue-500 text-md m-2 bg-gray-100";
    const normalLink = "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-gray-100 m-2";

    return (
        <aside className={`flex flex-col bg-gray-200 h-screen p-4 overflow-auto gap-5 basis-1/2`}>
            <div className="items-center text-center justify-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
                <TbPigMoney />
                AWS Bank
            </div>
            <div>
                <div className="flex flex-col">
                    <NavLink className={({ isActive }) => 
                                        isActive ? activeLink : normalLink} to="/">Home</NavLink>
                    <NavLink className={({ isActive }) => 
                                        isActive ? activeLink : normalLink} to="/dashboard">Dashboard</NavLink>
                </div>
            </div>
            <div>
                <div className=" text-gray-400 m-3 mt-4 uppercase">Move Money</div>
                    <NavLink className={({ isActive }) => 
                                        isActive ? activeLink : normalLink} to="/deposit">Deposit</NavLink>
                
                    <NavLink className={({ isActive }) => 
                                        isActive ? activeLink : normalLink} to="/withdraw">Withdraw</NavLink>
                
            </div>
            <div>
                <div className=" text-gray-400 m-3 mt-4 uppercase">Transactions</div>
                
                    <NavLink className={({ isActive }) => 
                                        isActive ? activeLink : normalLink} to="/pasttransactions">Past Transactions</NavLink>
                
            </div>
        </aside>
    );
};

export default Sidebar;
