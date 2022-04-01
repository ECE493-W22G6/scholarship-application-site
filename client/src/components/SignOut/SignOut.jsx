import React from 'react';
import Button from "../Button/Button";
import {useNavigate} from "react-router-dom";

const SignOut = () => {

    const navigate = useNavigate();

    const deleteSession = async () => {
        // const result = await fetch("/api/v1/auth/logout", {
        //     method: "DELETE",
        //     // body: JSON.stringify({
        //     //     token: res.tokenId
        //     // }),
        //     // headers: {
        //     //     "Content-Type": "application/json"
        //     // }
        // })
        // const data = await result.json()
        // // store returned user somehow
        // console.log("data", data);
    }

    const onLogoutSuccess = async (res) => {
        await deleteSession();
        alert("logged out successfully!");
        navigate("/signin");
    }

    const onFailure = (res) => {
        alert("Log out failed! Please try again.");
    }

    const { signOut } = useGoogleLogout({
        clientId,
        onLogoutSuccess,
        onFailure
    })

    return (
        <Button text="Sign out" className="signout-btn" onClick={signOut} />
    );
}


export default SignOut;