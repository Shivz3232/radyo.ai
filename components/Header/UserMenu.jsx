import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useRef } from 'react';
import HeaderAvatar from './HeaderAvatar';
import { userMenuLinks } from './menuData';

// export function UsearMenu({ data }) {
//   return (
//     <div className="">
//       <Popover className="relative -mb-1 mt-1">
//         {({ open }) => (
//           <>
//             <Popover.Button>
//               <HeaderAvatar data={data} />
//             </Popover.Button>
//             <Transition
//               as={Fragment}
//               enter="transition ease-out duration-100"
//               enterFrom="transform opacity-0 scale-95"
//               enterTo="transform opacity-100 scale-100"
//               leave="transition ease-in duration-75"
//               leaveFrom="transform opacity-100 scale-100"
//               leaveTo="transform opacity-0 scale-95"
//             >
//               <Popover.Panel className="absolute z-10 w-auto max-w-sm px-4 transform -translate-x-1/2 sm:px-0 lg:max-w-3xl">
//                 {/* <Popover.Panel className="h-screen w-screen bg-gray-50 bg-opacity-50 backdrop-blur backdrop-filter fixed top-0 left-0 z-10 transform flex items-center justify-center"> */}
//                 <div className="h-auto w-auto min-w-max bg-white rounded-lg shadow-lg flex flex-row items-center justify-center mr-0">
//                   <div>
//                     <div></div>
//                     {userMenuLinks.map((data, i) => {
//                       return (
//                         <div
//                           key={i}
//                           className={`px-4 py-2 hover:bg-gray-200 cursor-pointer ${
//                             i === 0
//                               ? 'rounded-t-lg'
//                               : i === userMenuLinks.length - 1
//                               ? 'rounded-b-lg'
//                               : ''
//                           }`}
//                         >
//                           <Link href={data.url}>
//                             <a
//                               style={{
//                                 textDecoration: 'none',
//                                 color: 'inherit',
//                               }}
//                             >
//                               {data.label}
//                             </a>
//                           </Link>
//                         </div>
//                       );
//                     })}
//                     <div></div>
//                   </div>
//                 </div>
//               </Popover.Panel>
//             </Transition>
//           </>
//         )}
//       </Popover>
//     </div>
//   );
// }

export default function UserMenu({ data }) {
  const router = useRouter();
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
                          className={`px-6 py-3 text-left text-lg hover:bg-gray-200 cursor-pointer w-full ${
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
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
