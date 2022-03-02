import React, { Component } from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import Reservations from './pages/Reservations';
import MakeReservation from './pages/ChooseResource';
import History from './pages/History'
import HelpUser from './pages/HelpUser'
import ReserveDateTime from './components/ReserveDateTime'
import "./assets/grid.css";
import "./assets/index.css";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiResponse: "",
        };
    }
    render() {
        return (
            <BrowserRouter>
                <div className="layout">
                    <Sidebar />
                    <div className="layout__content">
                        <TopNav />
                        <div className="layout__content-main">
                            <Routes>
                                <Route path='/' exact element={<Reservations />} />
                                <Route path='/user/resources' element={<MakeReservation />} />
                                <Route path='/user/history' exact element={<History />} />
                                <Route path='/user/help' element={<HelpUser />} />
                                <Route path='/user/choose-time/:id' element={<ReserveDateTime />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    };
}

