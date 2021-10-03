import React from 'react'

const myProfile = () => {
   return (
     <>
       <div className="text-indigo-650 flex flex-column w-11/12 sm:w-3/6 mx-auto p-6 bg-gray-300 rounded-md shadow-xl">
         <form
           action="/api/userProfile"
           method="POST"
           encType="multipart/form-data"
           className="space-y-3 mx-auto text-gray-900 w-11/12 lg:w-4/6"
         >
           <p className="text-center text-indigo-650 text-lg font-semibold">
             Tell us more about you!
           </p>
           <input
             className="input"
             type="text"
             name="fullName"
             placeholder="Full name"
           />
           <br />
           <input
             className="input"
             type="text"
             name="userId"
             placeholder="User ID"
           />
           <br />
           <input
             className="input"
             type="tel"
             pattern="[0-9]{10}"
             name="contact"
             placeholder="Contact number"
           />
           <br />
           <input
             className="input"
             type="email"
             name="email"
             placeholder="Email id"
           />
           <br />
           <p className="mx-auto text-indigo-650 font-semibold">
             Upload your profile picture:
           </p>
           <input
             className="input bg-white"
             type="file"
             id="img"
             name="profile_img"
             accept="image/*"
           />
           <textarea
             className="input p-2"
             name="about"
             id=""
             rows="4"
             placeholder="About yourself (50 words)"
           ></textarea>
           <br />
           <button
             className="submit-btn"
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
