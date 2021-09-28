import React from 'react'
import Navbar from '../../components/UserNavbar/userNavbar'

const myProfile = () => {
   return (
     <>
       <Navbar />
       <div className="text-indigo-600 flex flex-column mt-7 w-11/12 sm:w-3/6 mx-auto p-6 bg-gray-300 rounded-md shadow-xl">
         <form
           action=""
           className="space-y-3 mx-auto text-gray-900 w-5/6 lg:w-4/6"
         >
       <p className="mx-auto text-indigo-600 text-lg">Tell us more about you</p>
           <input
             className="w-full border-2 border-indigo-600 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
             type="text"
             name="FullName"
             placeholder="Full name"
           />
           <br />
           <input
             className="w-full border-2 border-indigo-600 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
             type="text"
             name="UserId"
             placeholder="User ID"
           />
           <br />
           <input
             className="w-full border-2 border-indigo-600 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
             type="number"
             name="contact"
             placeholder="Contact number"
           />
           <br />
           <input
             className="w-full border-2 border-indigo-600 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
             type="email"
             name="email"
             placeholder="Email id"
           />
           <br />
           {/* <label
            className="w-full border-2 border-indigo-600 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            for="img"
          >
            Upload your profile picture
          </label>
          <input
            className="w-full border-2 border-indigo-600 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            type="file"
            id="img"
            name="img"
            accept="image/*"
          /> */}
           <button
             className="px-5 py-2 shadow-lg bg-indigo-600 text-white rounded-md uppercase tracking-wider font-semibold text-sm"
             type="submit"
           >
             Submit
           </button>
         </form>
       </div>
     </>
   );
}

export default myProfile;
