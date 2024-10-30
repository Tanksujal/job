// import React, { useState, useRef } from 'react';
// import { PlusCircle } from 'lucide-react';

// const UserProfileImage = () => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [image, setImage] = useState("../../../public/user.png");
//   const fileInputRef = useRef(null);

//   const handleImageClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setImage(e.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div 
//       className="w-100"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       onClick={handleImageClick}
//     >
//       <img 
//         src={image} 
//         alt="User profile" 
//         className="w-100"
//       />
//       {isHovered && (
//         <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
//           <PlusCircle className="w-8 h-8 mb-2" />
//           <span className="text-sm">Add photo</span>
//         </div>
//       )}
//       <input 
//         type="file" 
//         ref={fileInputRef} 
//         onChange={handleFileChange} 
//         className="hidden" 
//         accept="image/*"
//       />
//     </div>
//   );
// };

// export default UserProfileImage;