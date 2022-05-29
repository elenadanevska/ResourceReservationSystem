import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import Reservations from './pages/Reservations';
import MakeReservation from './pages/ChooseResource';
import History from './pages/History';
import HelpUser from './pages/HelpUser';
import UserProfile from './pages/UserProfile';
import AdminPage from './pages/AdminPage';
import ReserveDateTime from './components/ReserveDateTime';
import Login from "./pages/Login";
import Axios from "axios";
import "./assets/grid.css";
import "./assets/index.css";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiResponse: "",
            isLogin: false,
            isAdmin: false,
            token: "",
            validToken: false
        };
        this.login = this.login.bind(this)
    }


    login({ token, isLogin, isAdmin }) {
        this.setState({ token, isLogin, isAdmin })
    }

    checkLoggedIn() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            this.setState({ isLogin: true, token: user.token, isAdmin: user.isAdmin });
            Axios.post('http://localhost:3001/users/tokenIsValid', null, { headers: { "x-auth-token": user.token } }).then((response) => {
                this.setState({ validToken: response.data });
            });
        } else {
            this.setState({ isLogin: false, user: null })
        }
    }

    componentDidMount() {
        this.checkLoggedIn();
    }

    render() {
        if (this.state.isLogin === true && this.state.validToken) {
            if (!this.state.isAdmin) {
                return (
                    <BrowserRouter>
                        <div className="layout">
                            <Sidebar classes="sidebar" />
                            <div className="content">
                                <TopNav />
                                <div className="content-main">
                                    <Routes>
                                        <Route path='/user/reservations' exact element={<Reservations />} />
                                        <Route path='/user/resources' element={<MakeReservation />} />
                                        <Route path='/user/history' exact element={<History />} />
                                        <Route path='/user/help' element={<HelpUser />} />
                                        <Route path='/user/profile' exact element={<UserProfile />} />
                                        <Route path='/user/choose-time/:id' element={<ReserveDateTime />} />
                                        <Route path="/login" element={<Navigate replace to="/user/reservations" />} />
                                    </Routes>
                                </div>
                            </div>
                        </div>
                    </BrowserRouter>
                );
            } else {
                return (
                    <BrowserRouter>
                        <div className="layout">
                            <Sidebar classes="sidebar" />
                            <div className="content">
                                <TopNav />
                                <div className="content-main">
                                    <Routes>
                                        <Route path='/user/reservations' exact element={<Reservations />} />
                                        <Route path='/user/resources' element={<MakeReservation />} />
                                        <Route path='/user/history' exact element={<History />} />
                                        <Route path='/user/choose-time/:id' element={<ReserveDateTime />} />
                                        <Route path="/adminpage" element={<AdminPage />} />
                                    </Routes>
                                </div>
                            </div>
                        </div>
                    </BrowserRouter>
                );
            }
        } else {
            return (
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" exact element={<Login login={this.login} />} />
                        <Route path="/" element={<Navigate replace to="/login" />} />
                    </Routes>
                </BrowserRouter>
            );
        }
    };
}

