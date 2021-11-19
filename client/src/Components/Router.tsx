import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Member from '../Routes/Member';
import Home from '../Routes/Home';
import Dictionary from '../Routes/Dictionary';
import Analysis from '../Routes/Analysis';
import Community from '../Routes/Community';
import Introduction from '../Routes/Introduction';
import Login from '../Routes/Login';
import Result from '../Routes/Result';
import Contact from '../Routes/Contact';
import Register from '../Routes/Register';
import SocialLoginPopUp from '../Routes/SocialLoginPopUp';

export default function AppRouter(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/member" element={<Member />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/community" element={<Community />} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/socialloginpopup" element={<SocialLoginPopUp />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}
