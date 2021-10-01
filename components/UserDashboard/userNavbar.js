import { useState } from 'react';
import { Tab } from '@headlessui/react';
import MyProfile from './myProfile';
import AddAudio from './addAudio';
import MySubmissions from './mySubmissions';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const userNavbar = () => {
  let [categories] = useState({
    'My Profile': {
      id: 1,
      content: MyProfile,
    },
    'Add Audio': {
      id: 2,
      content: AddAudio,
    },
    'My Submissions': {
      id: 3,
      content: MySubmissions,
    },
  });

  return (
    <Tab.Group>
      <div className="w-full max-w-md px-4 py-5 sm:px-0 mx-auto">
        <Tab.List className="flex p-1 space-x-1 bg-indigo-650 rounded-xl">
          {Object.keys(categories).map(category => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
      </div>
      <Tab.Panels className="">
        {Object.values(categories).map((Tabs, idx) => (
          <Tab.Panel
            key={idx}
          >
            {<Tabs.content key={Tabs.id} />}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default userNavbar;
