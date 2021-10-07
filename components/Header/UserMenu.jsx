import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useRef } from 'react';
import HeaderAvatar from './HeaderAvatar';
import { userMenuLinks } from './menuData';
import firebase from 'firebase';

export default function UserMenu({ data }) {
  const router = useRouter();
  const signOutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        router.push('/');
      });
  };
  return (
    <div>
      <Menu as="div" className="relative -mb-1 mt-1">
        <div>
          <Menu.Button>
            <HeaderAvatar data={data} />
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
          <Menu.Items className="absolute right-0 w-max mt-2 origin-top-right bg-white  rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div>
              {userMenuLinks.map((data, i) => {
                return (
                  <div key={i}>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => {
                            router.push(data.url);
                          }}
                          className={`px-4 py-3 text-left text-lg hover:bg-gray-200 cursor-pointer w-full ${
                            i === 0
                              ? 'rounded-t-md'
                              : i === userMenuLinks.length - 1
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
            <div key="logout">
              <Menu.Item>
                <button
                  onClick={signOutHandler}
                  className={
                    'px-4 py-3 text-left text-lg hover:bg-gray-200 cursor-pointer w-full rounded-b-md'
                  }
                >
                  Logout
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
