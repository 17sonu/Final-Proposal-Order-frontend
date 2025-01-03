import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/navbar';
import AddClient from './components/AddClient';
import Home from './components/Home';
import DEhome from './pages/Design-Engnering/DE-home';
import DEproposallist from './pages/Design-Engnering/DE-proposallist';
import DEorderlist from './pages/Design-Engnering/DE-orderlist';
import PMChome from './pages/PMC/PMC-home';
import PMCproposallist from './pages/PMC/PMC-proposallist';
import PMCorderlist from './pages/PMC/PMC-orderlist';
import PBhome from './pages/Pre-Bid/PB-home';
import PBproposallist from './pages/Pre-Bid/PB-proposallist';
import PBorderlist from './pages/Pre-Bid/PB-orderlist';
import OMhome from './pages/Operational-Management/OM-home';
import OMproposallist from './pages/Operational-Management/OM-proposallist';
import OMorderlist from './pages/Operational-Management/OM-orderlist';
import KMhome from './pages/Knowledge-Management/KM-home';
import KMproposallist from './pages/Knowledge-Management/KM-proposallist';
import KMorderlist from './pages/Knowledge-Management/KM-orderlist';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      <Route
        path="/home"
        element={isAuthenticated ? <Navbar setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" replace />}
      >
        {/* Nested routes inside the Navbar layout */}
        <Route path="addclient" element={<AddClient />} />
        <Route path="home" element={<Home />} />
        <Route path="dehome" element={<DEhome/>} />
        <Route path="deallproposal" element={<DEproposallist/>} />
        <Route path="deallorder" element={<DEorderlist/>} />
        <Route path="pmchome" element={<PMChome/>} />
        <Route path="pmcallproposal" element={<PMCproposallist/>} />
        <Route path="pmcallorder" element={<PMCorderlist/>} />
        <Route path="pbhome" element={<PBhome/>} />
        <Route path="pballproposal" element={<PBproposallist/>} />
        <Route path="pballorder" element={<PBorderlist/>} />
        <Route path="omhome" element={<OMhome/>} />
        <Route path="omallproposal" element={<OMproposallist/>} />
        <Route path="omallorder" element={<OMorderlist/>} />
        <Route path="kmhome" element={<KMhome/>} />
        <Route path="kmallproposal" element={<KMproposallist/>} />
        <Route path="kmallorder" element={<KMorderlist/>} />
      </Route>
    </Routes>
  );
};

export default function MainApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}