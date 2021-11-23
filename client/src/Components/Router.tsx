import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Member from './Member';
import Home from '../Routes/Home';
<<<<<<< HEAD
import Dictionary from '../Routes/Dictionary';
import Analysis from '../Routes/Analysis';
import Community from './Community/Main';
import Post from './Community/Post';
import Board from './Community/Board';
import Introduction from '../Routes/Introduction';
=======
import Dictionary from './Dictionary';
import Analysis from './Analysis';
import Community from '../Routes/Community';
import Introduction from './Introduction';
>>>>>>> 3337563f4a456010442d88a519dbc3619f9972ff
import Login from '../Routes/Login';
import Result from '../Routes/Result';
import Contact from './Contact';

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
