import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Footer from '../components/Footer';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Banner />

      <div className="flex-1 w-[60vw] m-auto">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
