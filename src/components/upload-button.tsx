// // src/components/upload-button.tsx
// import React, { useRef } from "react";

// type UploadButtonProps = {
//   register: Function;
//   name: string;
//   error?: any;
// };

// const UploadButton = ({ register, name, error }: UploadButtonProps) => {
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   return (
//     <div className="mt-1">
//       <input
//         id={name}
//         type="file"
//         {...register(name)}
//         className="hidden"
//         ref={fileInputRef}
//       />
//       <div className="flex flex-col gap-2">
//         <button
//           type="button"
//           onClick={() => fileInputRef.current?.click()}
//           className="px-4 py-2 bg-gray-100 border border-gray-300 rounded text-gray-700 hover:bg-gray-200 transition-colors text-sm"
//         >
//           Choose File
//         </button>
//         {error && (
//           <p className="text-red-500 text-xs">{error.message as string}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UploadButton;





// // src/components/upload-button.tsx
// import React, { useRef, useState } from "react";

// type UploadButtonProps = {
//   register: Function;
//   name: string;
//   error?: any;
// };

// const UploadButton = ({ register, name, error }: UploadButtonProps) => {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [fileName, setFileName] = useState<string>("");
  
//   // Create a custom onChange handler
//  // In upload-button.tsx
// const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const files = e.target.files;
//   if (files && files.length > 0) {
//     setFileName(files[0].name);
//     console.log("File selected:", files[0].name, "Size:", files[0].size);
//   } else {
//     setFileName("");
//     console.log("No file selected");
//   }
// };

//   return (
//     <div className="mt-1">
//       <input
//         id={name}
//         type="file"
//         {...register(name, {
//           onChange: handleFileChange // Add custom onChange handler
//         })}
//         className="hidden"
//         ref={fileInputRef}
//       />
//       <div className="flex flex-col gap-2">
//         <div className="flex items-center gap-2">
//           <button
//             type="button"
//             onClick={() => fileInputRef.current?.click()}
//             className="px-4 py-2 bg-gray-100 border border-gray-300 rounded text-gray-700 hover:bg-gray-200 transition-colors text-sm"
//           >
//             Choose File
//           </button>
//           {fileName && (
//             <span className="text-sm text-gray-600">
//               {fileName}
//             </span>
//           )}
//         </div>
//         {/* Only show error if no file is selected */}
//         {error && !fileName && (
//           <p className="text-red-500 text-xs">{error.message}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UploadButton;



// src/components/upload-button.tsx
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

type UploadButtonProps = {
  register: Function;
  name: string;
  error?: any;
};

const UploadButton = ({ register, name, error }: UploadButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileName(files[0].name);
      console.log("Selected file:", {
        name: files[0].name,
        size: files[0].size,
        type: files[0].type
      });
    } else {
      setFileName("");
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full mt-1">
      <input
        id={name}
        type="file"
        {...register(name, {
          onChange: handleFileChange
        })}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-2 w-full">
          <Button
            type="button"
            variant="outline"
            onClick={handleButtonClick}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700"
          >
            Choose File
          </Button>
          {fileName && (
            <span className="text-sm text-gray-600 truncate">
              {fileName}
            </span>
          )}
        </div>
        {error && (
          <p className="text-red-500 text-xs mt-1">{error.message}</p>
        )}
      </div>
    </div>
  );
};

export default UploadButton;