import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

const AboutMe = () => {
    useEffect(() => {
        UserService.getPublicContent().then((response) => {
            setContent(response.data);
        },
        (error) => {
            const _content =
            (error.response && error.response.data) || error.message || error.toString();
            setContent(_content);
        }
        );
    }, []);
    return (
        <div className="aboutMe">
            <h1>Garrett Noel</h1>

        </div>
    );
};
export default AboutMe;