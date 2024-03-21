import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Logo from '../../assets/logo.png'
import { Link, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { UserContext } from '../UserContext'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap'
import axios from 'axios';
import Avatar from 'react-avatar'
import SnackBar from "../SnackBar.jsx";

const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'About us', href: '/aboutus', current: false },
  { name: 'Accommodation', href: '/accommodation', current: false },
  { name: 'Sale off', href: '/saleoff', current: false },
  { name: 'Contact', href: '/contact-info', current: false },
  { name: 'News', href: '/new', current: false }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar({ getData }) {

  const { user, logout } = useContext(UserContext);
  const [accountUser, setAccountUser] = useState(null);

  const fetchDataUser = async (getData) => {
    // console.log(getData);
    try {
      const [accountResponse, imagesResponse] = await Promise.all([
        axios.get(`http://localhost:8080/api/users/viewDetail/${user.id}`),
      ]);
      setAccountUser(accountResponse.data);
      // console.log(accountResponse.data.imgName);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (getData) {
      fetchDataUser(getData);
    }
  }, [getData]);

  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState('success');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSignOut = () => {
    logout();
    setSnackbarMessage('Logout successfully !!!');
    setSnackbarColor("success");
    setSnackbarOpen(true);
    setAccountUser(null);
  };

  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(null);


  // const handleItemClick = (index) => {
  //   setSelectedItem(index);
  // };
  return (


    <Disclosure as="nav" className="bg-white-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-17 items-center justify-between ">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

                <div className="flex flex-shrink-0 items-center">

                  {/* <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  /> */}

                  <img

                    className="h-11 w-auto"
                    src={Logo}
                    alt="Your Company"
                  />
                  <div className='navbar-title'>
                    <Link to="/">
                      <h1 className='navbar-brand'>Booking Homestay</h1>
                      <p className='navbar-slogan'>Good for your choice</p>
                    </Link>
                  </div>

                </div>

                <div className="hidden sm:ml-12 sm:block ">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link to={item.href}
                        key={item.name}
                        // href={item.href}
                        className={classNames(
                          (location.pathname === item.href || (location.pathname === "/" && item.href === "#")) ? 'bg-gray-900 text-white' : 'text-black-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium', 'mt-4'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      // onClick={() => handleItemClick(index)} 
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">

                  {accountUser ? ( //ktra neu account co ton tai

                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>

                      {/* <img
                          className="h-8 w-8 rounded-full"
                          src={accountUser.imgName}
                          alt=""
                        /> */}
                      <Avatar
                        src={accountUser.imgName}
                        size={50} // Đặt kích thước avatar là 32x32
                        round={true}
                      />
                    </Menu.Button>

                  ) : (
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <Avatar
                        src="../../image/defaultavatar.jpg"
                        size={50} // Đặt kích thước avatar là 32x32
                        round={true}
                      />
                    </Menu.Button>
                  )}
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link to='/profile'>
                            <a
                              href="#"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Your Profile
                            </a>
                          </Link>

                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <Link to={'/view-booking-history'} className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                            Booking
                          </Link>

                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {user && user.auth === true ? (
                          ({ active }) => (
                            <Link onClick={handleSignOut} className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                              Sign out
                            </Link>
                          )
                        ) : (
                          ({ active }) => (
                            <Link to="/login" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                              Login
                            </Link>
                          )
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <SnackBar open={snackbarOpen} message={snackbarMessage} onClose={handleSnackbarClose} color={snackbarColor} />

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )
      }
    </Disclosure >



  )
}
