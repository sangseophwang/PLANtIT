import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Member from 'Components/Member';
import Home from 'Components/Home';
import Community from 'Components/Community/Main';
import Post from 'Components/Community/Post';
import Board from 'Components/Community/Board';
import Dictionary from 'Components/Dictionary';
import Analysis from 'Components/Analysis/index';
import Introduction from 'Components/Introduction';
import Login from '../Routes/Login';
import Result from 'Components/Result';
import Contact from 'Components/Contact';

export default function AppRouter(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/member" element={<Member />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/post" element={<Post />} />
        <Route path="/community/:id" element={<Board />} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}
