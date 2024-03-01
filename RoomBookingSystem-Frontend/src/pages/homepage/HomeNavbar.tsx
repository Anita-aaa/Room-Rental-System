import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../css/HomeNavbar.css";
import UserProfileView from "../UserProfileView/UserProfileView";
import {FaCircleUser} from "react-icons/fa6";

interface Props {
    showLogin: () => void;
}

const HomeNavbar: React.FC<Props> = ({ showLogin }) => {
    const [userProfileVisible, setUserProfileVisible] = useState(false); // State to manage the visibility of the user profile

    const toggleUserProfile = () => {
        setUserProfileVisible(!userProfileVisible); // Toggle the visibility of the user profile
    };

    const user = localStorage.getItem("userDetails");

    return (
        <>
            <div className={"wrapper"}>
                <div className={"nav-logo"}>
                    <img className={"logo"} src={"src/assets/image1/HotelLogo.jpg"} width={"80px"} />
                </div>
                <div className={"nav-options"}>
                    <ul>
                        <Link to={"/"}>Home</Link>
                        <Link to={"/OurRoom"}>Rooms</Link>
                    </ul>
                </div>
                <div className={"login-btn"}>
                    {!user && (
                        <button className={"head-btn"} onClick={showLogin}>Login</button>
                    )}
                </div>

                {user && (
                    <span className={"fullnamedisplay"} onClick={toggleUserProfile}>
                        <FaCircleUser style={{ fontSize: "3rem", marginBottom: "-3px", marginRight: "30px" }} />
                    </span>
                )}
            </div>

            {userProfileVisible && <UserProfileView />}
        </>
    );
}

export default HomeNavbar;