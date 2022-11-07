import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import shareVideo from "../assets/login_bg_video.mp4";
import logo from "../assets/ShareMeWhite.png";
import { client } from "../client";
import { getUserDataFromToken } from "../utils";

const Login = () => {
    const navigate = useNavigate();

    const responseGoogle = async ({ credential }) => {
        try {
            localStorage.setItem("profile", credential);
            const { name, id, imageUrl } = getUserDataFromToken(credential);
            const doc = {
                _id: id,
                _type: "user",
                userName: name,
                image: imageUrl,
            };
            client.createIfNotExists(doc).then(() => {
                navigate("/", { replace: true });
            });
        } catch (error) {
            console.log(error);
        }
    };

    const responseGoogleError = (error) => {
        console.error(
            "Google Sign In was not successful. Try again later. Details: ",
            error
        );
    };

    return (
        <div className="flex justify-start items-center flex-col h-screen">
            <div className="relative w-full h-full">
                <video
                    src={shareVideo}
                    type="video/mp4"
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className="w-full h-full object-cover"
                />
                <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
                    <div className="p-2">
                        <img src={logo} width="130px" alt="logo" />
                    </div>
                    <div className="shadow-2xl">
                        <GoogleLogin
                            onSuccess={responseGoogle}
                            onError={responseGoogleError}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
