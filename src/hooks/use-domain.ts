// src/hooks/use-domain.ts
// import { useState, useEffect } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { FieldValues, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { AddDomainSchema, AddDomainInput } from "@/schemas/settings.schema";
// import { UploadClient } from "@uploadcare/upload-client";
// import { onIntegrateDomain } from "@/actions/settings";
// import { useToast } from "@/hooks/use-toast";

// const upload = new UploadClient({
//   publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string
// });

// export const useDomain = () => {

  
//   const { register, handleSubmit, formState: { errors }, reset } = useForm<AddDomainInput>({
//     resolver: zodResolver(AddDomainSchema),
//     mode: "onChange"  // Enable validation as user types
//   });
  
//   console.log("Form errors:", errors);

//   const pathname = usePathname();
//   const { toast } = useToast();
//   const [loading, setLoading] = useState<boolean>(false);
//   const [isDomain, setIsDomain] = useState<string | undefined>(undefined);
//   const router = useRouter();

//   useEffect(() => {
//     setIsDomain(pathname.split("/").pop()); // Extract domain from URL
//     console.log("Current pathname:", pathname);
//   }, [pathname]);

//   const onAddDomain = handleSubmit(async (values: FieldValues) => {
//     console.log("Form submission handler called", values);
//     setLoading(true);

//     try {
//       // Upload the domain icon image
//       const iconFile = values.icon[0];
//       let iconUrl = "";
      
//       if (iconFile) {
//         console.log("Uploading file:", iconFile.name);
        
//         // Upload image to UploadCare
//         const result = await upload.uploadFile(iconFile);
//         console.log("Upload result:", result);
        
//         if (result.cdnUrl) {
//           iconUrl = result.cdnUrl;
//         } else {
//           throw new Error("Failed to upload icon");
//         }
//       }

//       console.log("Calling server action with:", values.domain, iconUrl);
      
//       // Call the server action to add the domain
//       const response = await onIntegrateDomain(values.domain, iconUrl);
//       console.log("Server response:", response);
      
//       toast({ 
//         title: response.status === 200 ? "Success" : "Error", 
//         description: response.message 
//       });

//       if (response.status === 200) {
//         reset(); // Reset form after success
//         router.refresh(); // Refresh the UI
//       }
//     } catch (error) {
//       console.error("Error adding domain:", error);
//       toast({ 
//         title: "Error", 
//         description: "Failed to add domain. Please try again." 
//       });
//     } finally {
//       setLoading(false);
//     }
//   });

//   return { register, onAddDomain, errors, loading, isDomain };
// };






// src/hooks/use-domain.ts

// const upload = new UploadClient({
//   publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string
// });

// export const useDomain = () => {
//   const { register, handleSubmit, formState: { errors }, reset } = useForm<AddDomainInput>({
//     resolver: zodResolver(AddDomainSchema),
//     mode: "onChange"
//   });
  
//   const pathname = usePathname();
//   const { toast } = useToast();
//   const [loading, setLoading] = useState<boolean>(false);
//   const [isDomain, setIsDomain] = useState<string | undefined>(undefined);
//   const router = useRouter();

//   useEffect(() => {
//     setIsDomain(pathname.split("/").pop());
//   }, [pathname]);

//   const onAddDomain = handleSubmit(async (values: AddDomainInput) => {
//     console.log("Form submission values:", values);
//     setLoading(true);

//     try {
//       // Check if icon exists before trying to access it
//       const iconFile = values.icon && values.icon.length > 0 ? values.icon[0] : null;
//       let iconUrl = "";
      
//       if (iconFile) {
//         console.log("Uploading file:", iconFile.name);
        
//         // Upload image to UploadCare
//         const result = await upload.uploadFile(iconFile);
//         console.log("Upload result:", result);
        
//         if (result && result.cdnUrl) {
//           iconUrl = result.cdnUrl;
//           console.log("Icon URL set to:", iconUrl);
//         } else {
//           console.error("No CDN URL in upload result:", result);
//           throw new Error("Failed to upload icon");
//         }
//       } else {
//         console.warn("No icon file selected");
//       }

//       console.log("Calling server action with:", values.domain, iconUrl);
      
//       // Call the server action to add the domain
//       const response = await onIntegrateDomain(values.domain, iconUrl);
//       console.log("Server response:", response);
      
//       toast({ 
//         title: response.status === 200 ? "Success" : "Error", 
//         description: response.message 
//       });

//       if (response.status === 200) {
//         reset(); // Reset form after success
//         router.refresh(); // Refresh the UI
//       }
//     } catch (error) {
//       console.error("Error adding domain:", error);
//       toast({ 
//         title: "Error", 
//         description: "Failed to add domain. Please try again." 
//       });
//     } finally {
//       setLoading(false);
//     }
//   });

//   return { register, onAddDomain, errors, loading, isDomain };
// };




// // src/hooks/use-domain.ts
// import { useState, useEffect } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { AddDomainSchema, AddDomainInput } from "@/schemas/settings.schema";
// import { UploadClient } from "@uploadcare/upload-client";
// import { onIntegrateDomain } from "@/actions/settings";
// import { useToast } from "@/hooks/use-toast";

// const upload = new UploadClient({
//   publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string
// });

// export const useDomain = () => {
//   const { register, handleSubmit, formState: { errors }, reset } = useForm<AddDomainInput>({
//     resolver: zodResolver(AddDomainSchema)
//   });
  
//   const pathname = usePathname();
//   const { toast } = useToast();
//   const [loading, setLoading] = useState<boolean>(false);
//   const [isDomain, setIsDomain] = useState<string | undefined>(undefined);
//   const router = useRouter();

//   useEffect(() => {
//     setIsDomain(pathname.split("/").pop());
//   }, [pathname]);

//   const onAddDomain = handleSubmit(async (values) => {
//     setLoading(true);

//     try {
//       // Upload the domain icon image
//       const iconFile = values.icon?.[0];
//       let iconUrl = "";
      
//       if (iconFile) {
//         console.log("Uploading file:", {
//           name: iconFile.name,
//           size: iconFile.size,
//           type: iconFile.type
//         });
        
//         try {
//           // Explicitly create a new File object to ensure compatibility
//           const fileToUpload = new File(
//             [iconFile], 
//             iconFile.name, 
//             { type: iconFile.type }
//           );

//           const result = await upload.uploadFile(fileToUpload);
//           console.log("Upload result:", result);
          
//           if (result && result.cdnUrl) {
//             iconUrl = result.cdnUrl;
//             console.log("Icon URL:", iconUrl);
//           } else {
//             console.error("No CDN URL received");
//           }
//         } catch (uploadError) {
//           console.error("Error uploading file:", uploadError);
//         }
//       }
//       // Call the server action to add the domain
//       const response = await onIntegrateDomain(values.domain, iconUrl);
      
//       toast({ 
//         title: response.status === 200 ? "Success" : "Error", 
//         description: response.message 
//       });

//       if (response.status === 200) {
//         reset();
//         router.refresh();
//       }
//     } catch (error) {
//       console.error("Error adding domain:", error);
//       toast({ 
//         title: "Error", 
//         description: "Failed to add domain. Please try again." 
//       });
//     } finally {
//       setLoading(false);
//     }
//   });

//   return { register, onAddDomain, errors, loading, isDomain };
// };



// import { useState, useEffect } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { AddDomainSchema, AddDomainInput } from "@/schemas/settings.schema";
// import { UploadClient } from "@uploadcare/upload-client";
// import { onIntegrateDomain } from "@/actions/settings";
// import { useToast } from "@/hooks/use-toast";

// const upload = new UploadClient({
//   publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string
// });

// export const useDomain = () => {
//   const { register, handleSubmit, formState: { errors }, reset } = useForm<AddDomainInput>({
//     resolver: zodResolver(AddDomainSchema)
//   });
  
//   const pathname = usePathname();
//   const { toast } = useToast();
//   const [loading, setLoading] = useState<boolean>(false);
//   const [isDomain, setIsDomain] = useState<string | undefined>(undefined);
//   const router = useRouter();

//   useEffect(() => {
//     setIsDomain(pathname.split("/").pop());
//   }, [pathname]);

//   const onAddDomain = handleSubmit(async (values) => {
//     setLoading(true);

//     try {
//       // Get the file from the form values
//       const iconFile = values.icon?.[0];
//       let iconUrl = "";
      
//       if (iconFile) {
//         console.log("File to upload:", {
//           name: iconFile.name,
//           size: iconFile.size,
//           type: iconFile.type
//         });
        
//         // Create a specific file object for upload
//         const fileToUpload = new File([iconFile], iconFile.name, {
//           type: iconFile.type
//         });
        
//         // Upload to UploadCare
//         const result = await upload.uploadFile(fileToUpload);
//         console.log("Upload result:", result);
        
//         if (result && result.cdnUrl) {
//           iconUrl = result.cdnUrl;
//           console.log("Icon URL set to:", iconUrl);
//         } else {
//           console.error("No CDN URL in upload result");
//         }
//       } else {
//         console.warn("No file selected");
//       }

//       // Call server action
//       console.log("Calling onIntegrateDomain with:", {
//         domain: values.domain,
//         iconUrl: iconUrl
//       });
      
//       const response = await onIntegrateDomain(values.domain, iconUrl);
//       console.log("Server response:", response);
      
//       toast({ 
//         title: response.status === 200 ? "Success" : "Error", 
//         description: response.message 
//       });

//       if (response.status === 200) {
//         reset();
//         router.refresh();
//       }
//     } catch (error) {
//       console.error("Error adding domain:", error);
//       toast({ 
//         title: "Error", 
//         description: "Failed to add domain. Please try again." 
//       });
//     } finally {
//       setLoading(false);
//     }
//   });

//   return { register, onAddDomain, errors, loading, isDomain };
// };


// general working code without button files
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddDomainSchema, AddDomainInput } from "@/schemas/settings.schema";
import { UploadClient } from "@uploadcare/upload-client";
import { onIntegrateDomain } from "@/actions/settings";
import { useToast } from "@/hooks/use-toast";

const upload = new UploadClient({
  publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string
});

export const useDomain = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<AddDomainInput>({
    resolver: zodResolver(AddDomainSchema)
  });
  
  const pathname = usePathname();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [isDomain, setIsDomain] = useState<string | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    setIsDomain(pathname.split("/").pop());
  }, [pathname]);

  const onAddDomain = handleSubmit(async (values) => {
    setLoading(true);

    try {
      // Get the file from the form
      const iconFile = values.icon?.[0];
      let iconUrl = "";
      
      if (iconFile) {
        // Upload image to UploadCare - keep it simple
        const result = await upload.uploadFile(iconFile);
        
        if (result.cdnUrl) {
          iconUrl = result.cdnUrl;
          console.log("Icon URL:", iconUrl);
        } else {
          throw new Error("Failed to upload icon")
        }
      }

      // Call the server action
      const response = await onIntegrateDomain(values.domain, iconUrl);
      console.log("Server response:", response)
      toast({ 
        title: response.status === 200 ? "Success" : "Error", 
        description: response.message 
      });

      if (response.status === 200) {
        reset();
        router.refresh();
      }
    } catch (error) {
      console.error("Error adding domain:", error);
      toast({ 
        title: "Error", 
        description: "Failed to add domain. Please try again." 
      });
    } finally {
      setLoading(false);
    }
  });

  return { register, onAddDomain, errors, loading, isDomain };
};