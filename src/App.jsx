import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Offers from './pages/Offers';
import Spa from './pages/Spa';
import Contact from './pages/Contact';
import Rooms from './pages/Rooms';
import RoomDetails from './pages/RoomDetails';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="offers" element={<Offers />} />
        <Route path="spa" element={<Spa />} />
        <Route path="contact" element={<Contact />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="rooms/:slug" element={<RoomDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

