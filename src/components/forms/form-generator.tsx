// // src/components/forms/form-generator.tsx
// import React from "react";
// import { Button } from "@/components/ui/button";

// type FieldProps = {
//   name: string;
//   label: string;
//   type: string;
//   placeholder?: string;
//   register: Function;
//   error?: any;
//   render?: () => React.ReactNode;
// };

// // Update this type to match your Button component's variants
// type ButtonProps = {
//   label: string;
//   type: "button" | "submit" | "reset";
//   variant?: "outline" | "primary"; // Changed to match your Button component
//   onClick?: () => void;
//   disabled?: boolean;
// };

// type FormGeneratorProps = {
//   onSubmit: (e: React.FormEvent) => void;
//   loading: boolean;
//   fields: FieldProps[];
//   buttons: ButtonProps[];
// };

// const FormGenerator = ({ onSubmit, loading, fields, buttons }: FormGeneratorProps) => {
//   return (
//     <form onSubmit={onSubmit}>
//       {fields.map((field) => (
//         <div key={field.name} className="mb-4">
//           <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
//             {field.label}
//           </label>
          
//           {field.type === "custom" && field.render ? (
//             field.render()
//           ) : (
//             <input
//               id={field.name}
//               type={field.type}
//               placeholder={field.placeholder}
//               {...field.register(field.name)}
//               className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//             />
//           )}
          
//           {field.type !== 'custom' && field.error && (
//             <p className="text-red-500 text-xs mt-1">
//             {typeof field.error.message === 'string' ? field.error.message : 'Invalid input'}
//             </p>
//           )}
//             </div>
//       ))}
      
//       <div className="flex justify-end gap-2 mt-4">
//         {buttons.map((button, index) => (
//           <Button
//             key={index}
//             type={button.type}
//             variant={button.variant}
//             onClick={button.onClick}
//             disabled={button.disabled}
//           >
//             {button.label}
//           </Button>
//         ))}
//       </div>
//     </form>
//   );
// };

// export default FormGenerator;


// src/components/forms/form-generator.tsx
// src/components/forms/form-generator.tsx
import React from "react";
import { Button } from "@/components/ui/button";

type FieldProps = {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  register: Function;
  error?: any;
  render?: () => React.ReactNode;
};

type ButtonProps = {
  label: string;
  type: "button" | "submit" | "reset";
  variant?: "outline" | "primary";
  onClick?: () => void;
  disabled?: boolean;
};

type FormGeneratorProps = {
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  fields: FieldProps[];
  buttons: ButtonProps[];
};

const FormGenerator = ({ onSubmit, loading, fields, buttons }: FormGeneratorProps) => {
  return (
    <form onSubmit={onSubmit}>
      {fields.map((field) => (
        <div key={field.name} className="mb-4">
          <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>
          
          {field.type === "custom" && field.render ? (
            // For custom components like UploadButton
            <div className="mt-1 w-full">
              {field.render()}
            </div>
          ) : field.type === "file" ? (
            // For regular file inputs
            <input
              id={field.name}
              type="file"
              {...field.register(field.name)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          ) : (
            // For text and other regular inputs
            <input
              id={field.name}
              type={field.type}
              placeholder={field.placeholder}
              {...field.register(field.name)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          )}
          
          {/* Only show errors for non-custom fields */}
          {field.type !== "custom" && field.error && (
            <p className="text-red-500 text-xs mt-1">{field.error.message}</p>
          )}
        </div>
      ))}
      
      <div className="flex justify-end gap-2 mt-4">
        {buttons.map((button, index) => (
          <Button
            key={index}
            type={button.type}
            variant={button.variant}
            onClick={button.onClick}
            disabled={button.disabled}
          >
            {button.label}
          </Button>
        ))}
      </div>
    </form>
  );
};

export default FormGenerator;