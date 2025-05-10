// "use client";

// import React from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// // import { signOut, auth } from "@/auth";
// import { useRouter } from "next/navigation";
// import { Skeleton } from "@/components/ui/skeleton";
// import Link from "next/link";

// interface UserProfileData {
//   name: string;
//   // Add other user profile properties as needed
// }

// interface UserProfileResponse {
//   response?: {
//     data?: UserProfileData;
//   };
// } 
// import { signOut } from "next-auth/react";
// import Image from "next/image";

// interface Props {
//   loading: boolean;
//   userProfile: UserProfileResponse | null;
// }

// function getInitials(inputString: string): string {
//   const words = inputString.split(" ");
//   const initials = words.map((word) => word.charAt(0).toUpperCase()).join("");
//   return initials;
// }

// function DashboardNavBar({ loading, userProfile }:Props) {
//   const handleLogout = async () => {
//     await signOut({ redirectTo: "/auth/login" });
//   };

//   const userName = userProfile?.response?.data?.name || "";

//   return (
    
//     <nav className="flex  justify-end pt-3 pb-3 px-6">
//        {/* <div >
//        <Image
//         src="/college/logo.jpeg"
//         alt="Logo"
//         width={40}
//         height={40}
//         className="rounded-full"
        
//         />
//        </div> */}
//       <Popover>
//         <PopoverTrigger asChild>
//           <button className="flex items-center gap-4 focus:outline-none">
//             {loading ? (
//               <Skeleton className="w-[2.07463rem] h-[2.07463rem] rounded-full" />
//             ) : (
//               <Avatar className="w-[2.07463rem] h-[2.07463rem]">
                
//                 <AvatarImage
//                   src="/images/user_alt_icon.png"
//                   alt="User avatar"
//                   className="object-cover"
//                 />
//                 <AvatarFallback>{getInitials(userName)}</AvatarFallback>
//               </Avatar>
//             )}
//             <img src="/images/chevron_down_icon.png" alt="Open menu" className="w-4 h-4" />
//           </button>
//         </PopoverTrigger>
//         <PopoverContent className="w-48">
//           <div className="flex flex-col">
//             {/* <Link
//               href="/dashboard/manager/updateProfile"
//               className="block p-2 hover:bg-gray-100 transition-colors duration-200"
//             >
//               Update Profile
//             </Link> */}
//             <button
//               onClick={handleLogout}
//               className="p-2 text-left hover:bg-gray-100 transition-colors duration-200 w-full"
//             >
//               Logout
//             </button>
//           </div>
//         </PopoverContent>
//       </Popover>
//     </nav>
   
//   );
// };

// export default DashboardNavBar;

import React from 'react'

const DashboardNavBar = () => {
  return (
    <div>DashboardNavBar</div>
  )
}

export default DashboardNavBar