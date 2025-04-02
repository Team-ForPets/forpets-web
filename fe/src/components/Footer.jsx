import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Github, Instagram, Twitter } from 'lucide-react';

function Footer() {
  return (
    <footer className="h-[15vh] flex flex-col justify-center items-center gap-3 bg-gray-100 text-gray-700 shadow-md border-t border-gray-300">
      <div className="flex gap-4 text-gray-500 mb-2">
        <Link
          to="https://www.facebook.com/?locale=ko_KR/"
          className="hover:text-gray-700 transition"
          target="_blank"
        >
          <Facebook size={25} />
        </Link>
        <Link
          to="https://www.instagram.com/"
          className="hover:text-gray-700 transition"
          target="_blank"
        >
          <Instagram size={25} />
        </Link>
        <Link to="https://x.com/home" className="hover:text-gray-700 transition" target="_blank">
          <Twitter size={25} />
        </Link>
        <Link
          to="https://github.com/Team-ForPets/forpets-web"
          className="hover:text-gray-700 transition"
          target="_blank"
        >
          <Github size={25} />
        </Link>
      </div>
      <p className="text-sm">&copy; 2025 ForPets. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
