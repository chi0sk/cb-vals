import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0e0b18] text-white">
      {/* Header */}
      <header className="border-b border-[#291d45] py-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center">
            <Link to="/" className="mr-6">
              <img
                src="https://ext.same-assets.com/3519986169/3736915175.png"
                alt="Logo"
                className="h-8"
              />
            </Link>
            <div className="relative">
              <button
                className="flex items-center rounded-lg border border-[#291d45] bg-[#0e0b18] px-4 py-2 text-sm font-medium text-white"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span>Counter Blox</span>
                <svg
                  className={`ml-2 h-4 w-4 transform ${isOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <nav className="flex items-center space-x-1">
              <Link
                to="/calculator"
                className="flex flex-col items-center rounded px-3 py-2 text-xs hover:bg-[#291d45]"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.25 17H4.75C3.65 17 3 16.35 3 15.25V6.75C3 5.65 3.65 5 4.75 5H19.25C20.35 5 21 5.65 21 6.75V15.25C21 16.35 20.35 17 19.25 17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 14.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 14.5V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 14.5V12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 20L3 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Calculator</span>
              </Link>
              <Link
                to="/"
                className="flex flex-col items-center rounded px-3 py-2 text-xs hover:bg-[#291d45]"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.75 9.75L12 4.75L4.25 9.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19.75 9.75V19.25H4.25V9.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14.75 19.25V13.25H9.25V19.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.25 9.75L12 4.75L19.75 9.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Value List</span>
              </Link>
            </nav>
            <div className="flex items-center">
              <MagnifyingGlassIcon className="h-5 w-5 text-white" />
            </div>
            <button className="rounded-lg bg-purple-700 px-4 py-2 text-sm font-medium text-white hover:bg-purple-800">
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-4 px-4">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-8 bg-[#0e0b18] py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-4 flex items-center space-x-4">
              <a href="https://discord.gg/123d" className="text-gray-400 hover:text-white">
                <img src="https://ext.same-assets.com/3559057959/2845145498.png" alt="Discord" className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white">
                <img src="https://ext.same-assets.com/3559057959/1986376715.png" alt="Twitter" className="h-6 w-6" />
              </a>
              <a href="https://youtube.com" className="text-gray-400 hover:text-white">
                <img src="https://ext.same-assets.com/3559057959/3566361117.png" alt="YouTube" className="h-6 w-6" />
              </a>
            </div>
            <p className="text-center text-sm text-gray-400">
              © 2025 Counter Blox Values. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
