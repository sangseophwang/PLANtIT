import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Member from 'Components/Member/index';
import Home from '../Routes/Home';
import Dictionary from 'Components/Dictionary/index';
import Analysis from 'Components/Analysis/index';
import Community from '../Routes/Community';
import Introduction from 'Components/Introduction/index';
import Login from '../Routes/Login';
import Result from '../Routes/Result';
import Contact from 'Components/Contact/index';

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
        <Route path="/contact" element={<Contact />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}
