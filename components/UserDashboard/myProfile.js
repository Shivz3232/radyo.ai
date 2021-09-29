import React from 'react'

const myProfile = () => {
   return (
     <>
       <div className="text-indigo-600 flex flex-column mt-7 w-11/12 sm:w-3/6 mx-auto p-6 bg-gray-300 rounded-md shadow-xl">
         <form
           action=""
           className="space-y-3 mx-auto text-gray-900 w-11/12 lg:w-4/6"
         >
           <p className="text-center text-indigo-600 text-lg font-semibold">
             Tell us more about you!
           </p>
           <input
             className="w-full border-2 border-indigo-500 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-600"
             type="text"
             name="FullName"
             placeholder="Full name"
           />
           <br />
           <input
             className="w-full border-2 border-indigo-500 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-600"
             type="text"
             name="UserId"
             placeholder="User ID"
           />
           <br />
           <input
             className="w-full border-2 border-indigo-500 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-600"
             type="tel"
             pattern="[0-9]{10}"
             name="contact"
             placeholder="Contact number"
           />
           <br />
           <input
             className="w-full border-2 border-indigo-500 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-600"
             type="email"
             name="email"
             placeholder="Email id"
           />
           <br />
           <p className="mx-auto text-indigo-600 font-semibold">
             Upload your profile picture:
           </p>
           <input
             className="w-full bg-white border-2 border-indigo-500 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-600"
             type="file"
             id="img"
             name="img"
             accept="image/*"
           />
           <textarea
             className="w-full border-2 border-indigo-500 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600 p-2"
             name="about"
             id=""
             rows="4"
             placeholder="About yourself (50 words)"
           ></textarea>
           <br />
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
