import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { BiSortAlt2, BiSortDown, BiSortUp } from 'react-icons/bi';

const SortButton = ({ sortBy }) => {
  return (
    <div>
      <Menu as="div" className="relative mt-1">
        <div>
          <Menu.Button>
            <div className="flex items-center border border-indigo-650 rounded-md p-2">
              <BiSortAlt2
                fontSize="1.5rem"
                className={`text-indigo-650`}
                aria-hidden="true"
              />
              <span className="text-base text-indigo-650">Sort by</span>
            </div>
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
          <Menu.Items className="absolute z-40 right-0 w-auto mt-2 origin-top-right bg-white  rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div>
              {[
                {
                  label: () => {
                    return (
                      <div className="flex items-center justify-start">
                        <BiSortDown className="text-lg" />
                        <span className="ml-1">Play count</span>
                      </div>
                    );
                  },
                  sortFunc: () => sortBy('PLAY'),
                },
                {
                  label: () => {
                    return (
                      <div className="flex items-center justify-start">
                        <BiSortUp className="text-lg" />
                        <span className="ml-1">Play count (low to high)</span>
                      </div>
                    );
                  },
                  sortFunc: () => sortBy('PLAY-ASC'),
                },
                {
                  label: () => {
                    return (
                      <div className="flex items-center justify-start">
                        <BiSortDown className="text-lg" />
                        <span className="ml-1">Likes</span>
                      </div>
                    );
                  },
                  sortFunc: () => sortBy('LIKE'),
                },
                {
                  label: () => {
                    return (
                      <div className="flex items-center justify-start">
                        <BiSortUp className="text-lg" />
                        <span className="ml-1">Likes (low to high)</span>
                      </div>
                    );
                  },
                  sortFunc: () => sortBy('LIKE-ASC'),
                },
                {
                  label: () => {
                    return (
                      <div className="flex items-center justify-start">
                        <BiSortDown className="text-lg" />
                        <span className="ml-1">Newest first</span>
                      </div>
                    );
                  },
                  sortFunc: () => sortBy('NEWEST'),
                },
                {
                  label: () => {
                    return (
                      <div className="flex items-center justify-start">
                        <BiSortUp className="text-lg" />
                        <span className="ml-1">Oldest first</span>
                      </div>
                    );
                  },
                  sortFunc: () => sortBy('OLDEST'),
                },
              ].map((data, i) => {
                return (
                  <div key={i}>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={data.sortFunc}
                          className={`px-6 py-3 text-left text-base hover:bg-gray-200 cursor-pointer w-full min-w-max`}
                        >
                          {data.label()}
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default SortButton;
