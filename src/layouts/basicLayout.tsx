import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from '@/pages/home';

export default function BasicLayout() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
    </Routes>
  );
}
