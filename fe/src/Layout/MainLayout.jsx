import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Footer from '../components/Footer';

export default function MainLayout() {
  return (
    <>
      <Header></Header>
      <Banner></Banner>
      <div className="w-[60vw] h-[80vh] m-auto">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </>
  );
}
