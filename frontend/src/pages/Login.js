import React, { useState } from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button";
import { Alert } from "react-bootstrap";
import user_image from '../assets/images/userpng1.png';
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const ErrorMessage = ({ variant = "danger", children }) => {
    return (
        <Alert variant={variant} style={{ fontSize: 15 }}>
            {children}
        </Alert>
    );
}

export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            }
            await Axios.post(`http://localhost:3001/users/signin`, { email, password }, config).then((res) => {
                console.log(res.data);
                localStorage.setItem("user", JSON.stringify(res.data))
                navigate("/user/reservations");
                window.location.reload();
            });
        } catch (error) {
            console.log(error);
            setError(true);
            setErrorMessage(error.response.data.error);
        };
    }

    return (
        <div className="logInWrapper fadeInDown position-absolute bgImage">
            <div className="formContent position-absolute">
                <div className="Login">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group size="lg" controlId="email" className="mb-1">
                            <div style={{ fontSize: "23px", fontWeight: "bold", textAlign: "center", marginBottom: "5%" }}>LOG IN</div>
                            <div className="fadeIn first mb-5">
                                <img src={user_image} id="userIcon" alt="User Icon" />
                            </div>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                autoFocus
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button block size="lg" type="submit" disabled={!validateForm()} className="mt-3">
                            Login
                        </Button>
                    </Form>
                    <div style={{ marginTop: "2%" }}>
                        {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
                    </div>
                </div>
                <div id="formFooter">
                    <a className="underlineHover" href="#">Learn more</a>
                </div>
            </div>
        </div>
    );
}
