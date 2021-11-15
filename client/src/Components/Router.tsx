import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Member from '../Routes/Member';
import Home from '../Routes/Home';
import Dictionary from '../Routes/Dictionary';
import Community from '../Routes/Community';
import Introduction from '../Routes/Introduction';
import Login from '../Routes/Login';
import Contact from '../Routes/Contact';

export default function AppRouter(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/member" element={<Member />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/community" element={<Community />} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
