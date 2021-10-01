import { Menu, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { menuLinks } from './menuData';

export default function HamburgerMenu({ loggedIn }) {
  const router = useRouter();
  return (
    <div>
      <Menu as="div" className="relative mt-1">
        <div>
          <Menu.Button>
            <GiHamburgerMenu
              fontSize="1.75rem"
              className={`text-black ml-3`}
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-auto mt-2 origin-top-right bg-white  rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div>
              {menuLinks.map((data, i) => {
                return (
                  <div key={i}>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => {
                            router.push(data.url);
                          }}
                          className={`px-6 py-3 text-left text-lg  hover:bg-gray-200 cursor-pointer w-full ${
                            i === 0
                              ? 'rounded-t-md'
                              : loggedIn && i === menuLinks.length - 1
                              ? 'rounded-b-md'
                              : ''
                          }`}
                        >
                          {data.label}
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                );
              })}
            </div>
            {loggedIn ? null : (
              <div>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => {
                        router.push('/login');
                      }}
                      className={`px-6 py-3 text-left text-lg hover:bg-gray-200 cursor-pointer ${'rounded-b-md'}`}
                    >
                      Login/SignUp
                    </button>
                  )}
                </Menu.Item>
              </div>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
