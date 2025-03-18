// // import * as z from "zod";

// // export const AddDomainSchema = z.object({
// //   name: z
// //     .string()
// //     .min(1, "Domain name is required")
// //     .regex(
// //       /^([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
// //       "Please enter a valid domain name (e.g.,example.com)"
// //     ),
// //   icon: z.string().min(1, "Domain icon is required"),
// //   campaignId: z.string().optional(),  
// // });

// // export type AddDomainInput = z.infer<typeof AddDomainSchema>;


// import * as z from "zod";

// export const AddDomainSchema = z.object({
//   name: z
//     .string()
//     .min(1, "Domain name is required")
//     .regex(
//       /^([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
//       "Please enter a valid domain name (e.g., example.com)"
//     ),
//   // Updated icon field: expect a FileList and require at least one file.
//   icon: z
//     .instanceof(FileList, { message: "Icon must be a file" })
//     .refine((files) => files.length > 0, { message: "Domain icon is required" }),
//   campaignId: z.string().optional(),
// });

// export type AddDomainInput = z.infer<typeof AddDomainSchema>;





// import * as z from "zod";

// // Use a conditional schema for file inputs based on whether FileList is available
// const fileListSchema = typeof FileList !== "undefined"
//   ? z.instanceof(FileList, { message: "Icon must be a file" })
//   : z.any();

// export const AddDomainSchema = z.object({
//   name: z
//     .string()
//     .min(1, "Domain name is required")
//     .regex(
//       /^([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
//       "Please enter a valid domain name (e.g., example.com)"
//     ),
//   // Use the conditional fileListSchema and require at least one file
//   icon: fileListSchema.refine(
//     (files) => files && files.length > 0,
//     { message: "Domain icon is required" }
//   ),
//   campaignId: z.string().optional(),
// });

// export type AddDomainInput = z.infer<typeof AddDomainSchema>;




// import * as z from "zod";

// // Use a conditional schema for file inputs based on whether FileList is available
// const fileListSchema = typeof FileList !== "undefined"
//   ? z.instanceof(FileList, { message: "Icon must be a file" })
//   : z.any();

// export const AddDomainSchema = z.object({
//   name: z
//     .string()
//     .min(1, "Domain name is required")
//     .regex(
//       /^([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
//       "Please enter a valid domain name (e.g., example.com)"
//     ),
//   // Use the conditional fileListSchema and require at least one file
//   icon: fileListSchema.refine(
//     (files) => files && files.length > 0,
//     { message: "Domain icon is required" }
//   ),
//   campaignId: z.string().optional(),
// });

// export type AddDomainInput = z.infer<typeof AddDomainSchema>;



//version after usinguse-domain hook
// src/schemas/settings.schema.ts
// import { z } from "zod";

// export const AddDomainSchema = z.object({
//   domain: z.string().min(1, { message: "Domain is required" }),
//   icon: z.any()
//     .refine((files) => files?.length > 0, { message: "Domain icon is required" })
//     .refine((files) => files[0]?.size <= 5 * 1024 * 1024, {
//       message: "Icon must be less than 5MB",
//     })
// });

// export type AddDomainInput = z.infer<typeof AddDomainSchema>;

// import { z } from "zod";

// export const AddDomainSchema = z.object({
//   domain: z.string().min(1, { message: "Domain is required" }),
//   icon: z.any()
//     .refine((files) => {
//       // First check if files exists and is an array with at least one item
//       return files && files.length > 0;
//     }, { 
//       message: "Domain icon is required" 
//     })
//     .refine((files) => {
//       // Only check size if files exists and has items
//       if (!files || files.length === 0) return false;
//       return files[0].size <= 5 * 1024 * 1024;
//     }, {
//       message: "Icon must be less than 5MB",
//     })
// });

// export type AddDomainInput = z.infer<typeof AddDomainSchema>;



// src/schemas/settings.schema.ts
// import { z } from "zod";

// export const AddDomainSchema = z.object({
//   domain: z.string().min(1, { message: "Domain is required" }),
//   icon: z.any()
//     .refine((files) => {
//       // Check if files exists and has items - only display this error
//       return files && files.length > 0;
//     }, { 
//       message: "Domain icon is required" 
//     })
//     .refine((files) => {
//       // Only validate size if files exist
//       if (!files || files.length === 0) return true; // Skip this validation if no file
//       return files[0].size <= 5 * 1024 * 1024;
//     }, {
//       message: "Icon must be less than 5MB",
//     })
// });

// export type AddDomainInput = z.infer<typeof AddDomainSchema>;




// // src/schemas/settings.schema.ts
// import { z } from "zod";

// export const AddDomainSchema = z.object({
//   domain: z.string().min(1, { message: "Domain is required" }),
//   icon: z.any()
//     .optional() // Make it optional at first validation
//     .refine((files) => {
//       // If submission is attempted, require a file
//       if (files === undefined) return true; // Don't validate until form is submitted
//       return files && files.length > 0;
//     }, { 
//       message: "Domain icon is required" 
//     })
// });

// export type AddDomainInput = z.infer<typeof AddDomainSchema>;


// src/schemas/settings.schema.ts
// import { z } from "zod";

// export const AddDomainSchema = z.object({
//   domain: z.string().min(1, { message: "Domain is required" }),
//   icon: z.any()
//     .optional()
//     .nullable()
//     .refine((files) => {
//       // Allow null or undefined (will be caught by server validation if needed)
//       if (files === null || files === undefined) return true;
//       // Check if it's a FileList with items
//       return files && files.length > 0;
//     }, { 
//       message: "Domain icon is required" 
//     })
// });

// export type AddDomainInput = z.infer<typeof AddDomainSchema>;


// src/schemas/settings.schema.ts
// import { z } from "zod";

// export const AddDomainSchema = z.object({
//   domain: z.string().min(1, { message: "Domain is required" }),
//   icon: z.any()
//     .refine(file => file?.[0]?.size <= 5 * 1024 * 1024, {
//       message: "Icon must be less than 5MB",
//     })
// });

// export type AddDomainInput = z.infer<typeof AddDomainSchema>;



// src/schemas/settings.schema.ts
import { z } from "zod";

export const AddDomainSchema = z.object({
  domain: z.string().min(1, { message: "Domain is required" }),
  icon: z.any()
    .refine(files => {
      // Skip validation if no files
      if (!files || !files.length) return true;
      
      // Check if size is available and validate
      const file = files[0];
      // Add debug logging to see what's happening
      console.log("File validation:", {
        fileName: file?.name,
        fileSize: file?.size,
        sizeLimit: 5 * 1024 * 1024
      });
      
      return !file.size || file.size <= 5 * 1024 * 1024;
    }, {
      message: "Icon must be less than 5MB"
    })
});

export type AddDomainInput = z.infer<typeof AddDomainSchema>;