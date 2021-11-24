import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Member from 'Components/Member/index';
import Home from '../Routes/Home';
import Dictionary from 'Components/Dictionary/index';
import Analysis from 'Components/Analysis/index';
import Community from '../Routes/Community';
import Introduction from 'Components/Introduction/index';
import Result from '../Routes/Result';
import Contact from 'Components/Contact/index';
import * as Auth from 'Components/Auth/index';
import Mypage from 'Components/Mypage/index';

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
        <Route path="/login" element={<Auth.Login />} />
        <Route path="/register" element={<Auth.Register />} />
        <Route path="/socialloginpopup" element={<Auth.SocialLoginPopUp />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}
