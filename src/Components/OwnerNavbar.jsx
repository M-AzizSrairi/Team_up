import { Fragment, useState, useRef, useEffect } from 'react';
import { BiSolidBellRing } from 'react-icons/bi';
import { TbCircleLetterA } from 'react-icons/tb';

const OwnerNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const menuRef = useRef();
  const profileMenuRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleProfileMenuToggle = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  return (
    <nav className="bg-gray">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="text-emerald font-bold text-2xl">Team Up</div>
            <div className="relative group ml-4" ref={menuRef}>
              <button
                type="button"
                className="text-neutral hover:bg-gray hover:text-emerald rounded-md px-3 py-2 text-sm font-medium focus:outline-none"
                onClick={handleMenuToggle}
              >
                Venues
              </button>
              {menuOpen && (
                <div className="absolute z-10 bg-neutral text-gray mt-2 space-y-2 py-2">
                  <a href="#" className="block px-4 py-2 text-gray text-sm hover:bg-gray hover:text-neutral">
                    Your Venues
                  </a>
                  <a href="#" className="block px-4 py-2 text-gray text-sm hover:bg-gray hover:text-neutral">
                    Add Venue
                  </a>
                </div>
              )}
            </div>
            <a
              href="#"
              className="text-neutral hover:bg-gray hover:text-emerald rounded-md px-3 py-2 text-sm font-medium ml-4"
            >
              Analytics
            </a>
          </div>
          <div className="flex items-center ml-4">
            <button
              type="button"
              className="relative rounded-full p-1 text-neutral hover:text-emerald focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <BiSolidBellRing className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="relative mt-1" ref={profileMenuRef}>
              <button
                type="button"
                className="ml-4 h-8 w-8 text-neutral rounded-full hover:text-emerald focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                onClick={handleProfileMenuToggle}
              >
                <TbCircleLetterA className="h-8 w-8" />
              </button>
              {profileMenuOpen && (
                <div className="absolute z-10 bg-neutral text-gray mt-2 space-y-2 py-2">
                  <a href="#" className="block px-4 py-2 text-gray text-sm hover:bg-gray hover:text-neutral">
                    Your Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-gray text-sm hover:bg-gray hover:text-neutral">
                    Log Out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default OwnerNavbar;
