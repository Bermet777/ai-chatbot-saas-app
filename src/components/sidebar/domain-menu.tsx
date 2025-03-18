// import { useState, useEffect } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { AddDomainSchema, AddDomainInput } from "@/schemas/settings.schema";
// import { UploadClient } from "@uploadcare/upload-client";
// import { onIntegrateDomain } from "@/actions/settings";
// import { useToast } from "@/hooks/use-toast";
// import { cn } from "@/lib/utils";
// import React from "react";
// import { PlusCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import Image from "next/image";
// // You can use UploadButton or FormGenerator if needed

// const upload = new UploadClient({
//   publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string,
// });

// const DomainMenu = ({ domains, min }: { min?: boolean; domains: { id: string; name: string; icon: string | null }[] | null | undefined; }) => {
//   // Use the inferred type from your schema instead of FieldValues
//   const { register, handleSubmit, formState: { errors }, reset } = useForm<AddDomainInput>({
//     resolver: zodResolver(AddDomainSchema),
//   });

//   const pathname = usePathname();
//   const { toast } = useToast();
//   const [loading, setLoading] = useState<boolean>(false);
//   const [isDomain, setIsDomain] = useState<string | undefined>(undefined);
//   const router = useRouter();
  
//   // State to control modal open/close
//   const [openModal, setOpenModal] = useState(false);

//   useEffect(() => {
//     setIsDomain(pathname.split("/").pop());
//   }, [pathname]);

//   const onAddDomain = handleSubmit(async (values: AddDomainInput) => {
//     setLoading(true);
//     try {
//       // Here we assume values.icon is a FileList; if not, adjust accordingly.
//       const iconFile = (values as any).icon[0];
//       let iconUrl = "";
      
//       if (iconFile) {
//         // Upload image to UploadCare
//         const result = await upload.uploadFile(iconFile);
//         if (result.cdnUrl) {
//           iconUrl = result.cdnUrl;
//         } else {
//           throw new Error("Failed to upload icon");
//         }
//       }
//       // Use values.name (instead of values.domain) to integrate domain
//       const response = await onIntegrateDomain(values.name, iconUrl);
      
//       toast({ title: response.status === 200 ? "Success" : "Error", description: response.message });
      
//       if (response.status === 200) {
//         reset();
//         setOpenModal(false); // Close modal on success
//         router.refresh();
//       }
//     } catch (error) {
//       console.error(error);
//       toast({ title: "Error", description: "Something went wrong" });
//     } finally {
//       setLoading(false);
//     }
//   });

//   return (
//     <div className={cn("flex flex-col gap-3", min ? "mt-6" : "mt-3")}>
//       {/* Header with Add Domain Button */}
//       <div className="flex justify-between w-full items-center">
//         {!min && <p className="text-xs text-gray-500">DOMAINS</p>}
//         <PlusCircle className="cursor-pointer" size={25} onClick={() => setOpenModal(true)} />
//       </div>

//       {/* Modal: Form to add a new domain */}
//       {openModal && (
//         <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded shadow-md w-96">
//             <h2 className="text-lg font-bold mb-4">Add New Domain</h2>
//             <form onSubmit={onAddDomain}>
//               <div className="mb-4">
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700">Domain Name</label>
//                 <input
//                   id="name"
//                   type="text"
//                   {...register("name")}
//                   className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                 />
//                 {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message as string}</p>}
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="icon" className="block text-sm font-medium text-gray-700">Domain Icon</label>
//                 <input
//                   id="icon"
//                   type="file"
//                   {...register("icon")}
//                   className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                 />
//                 {errors.icon && <p className="text-red-500 text-xs mt-1">{errors.icon.message as string}</p>}
//               </div>
//               {/* You can add campaignId here if needed */}
//               <div className="flex justify-end gap-2">
//                 <Button type="button" variant="outline" onClick={() => setOpenModal(false)}>Cancel</Button>
//                 <Button type="submit" disabled={loading}>Add Domain</Button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Render Existing Domains */}
//       <div className="flex flex-col gap-2">
//         {domains && domains.length > 0 ? (
//           domains.map((domain) => (
//             <Link key={domain.id} href={`/domain/${domain.id}`} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
//               {domain.icon ? (
//                 <Image src={domain.icon} alt={`${domain.name} icon`} width={20} height={20} className="rounded-full" />
//               ) : (
//                 <div className="w-5 h-5 bg-gray-300 rounded-full" />
//               )}
//               <span>{domain.name}</span>
//             </Link>
//           ))
//         ) : (
//           <p className="text-sm text-gray-500">No domains available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DomainMenu;





//version using use-domain hook:

// src/components/sidebar/domain-menu.tsx
// import { useDomain } from "@/hooks/use-domain";
// import { cn } from "@/lib/utils";
// import React, { useState } from "react";
// import { PlusCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import Image from "next/image";

// type Props = {
//   min?: boolean;
//   domains: { id: string; name: string; icon: string | null }[] | null | undefined;
// };

// const DomainMenu = ({ domains, min }: Props) => {
//   const { register, onAddDomain, loading, errors, isDomain } = useDomain();
//   const [openModal, setOpenModal] = useState(false);

//   return (
//     <div className={cn("flex flex-col gap-3", min ? "mt-6" : "mt-3")}>
//       {/* Header with Add Domain Button */}
//       <div className="flex justify-between w-full items-center">
//         {!min && <p className="text-xs text-gray-500">DOMAINS</p>}
//         <PlusCircle className="cursor-pointer" size={25} onClick={() => setOpenModal(true)} />
//       </div>

//       {/* Modal: Form to add a new domain */}
//       {openModal && (
//         <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded shadow-md w-96">
//             <h2 className="text-lg font-bold mb-4">Add New Domain</h2>
//             <form onSubmit={onAddDomain}>
//               <div className="mb-4">
//                 <label htmlFor="domain" className="block text-sm font-medium text-gray-700">Domain Name</label>
//                 <input
//                   id="domain"
//                   type="text"
//                   {...register("domain")}
//                   className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                 />
//                 {errors.domain && <p className="text-red-500 text-xs mt-1">{errors.domain.message as string}</p>}
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="icon" className="block text-sm font-medium text-gray-700">Domain Icon</label>
//                 <input
//                   id="icon"
//                   type="file"
//                   {...register("icon")}
//                   className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                 />
//                 {errors.icon && <p className="text-red-500 text-xs mt-1">{errors.icon.message as string}</p>}
//               </div>
//               <div className="flex justify-end gap-2">
//                 <Button type="button" variant="outline" onClick={() => setOpenModal(false)}>Cancel</Button>
//                 <Button type="submit" disabled={loading}>Add Domain</Button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Render Existing Domains */}
//       <div className="flex flex-col gap-2">
//         {domains && domains.length > 0 ? (
//           domains.map((domain) => (
//             <Link key={domain.id} href={`/domain/${domain.id}`} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
//               {domain.icon ? (
//                 <Image src={domain.icon} alt={`${domain.name} icon`} width={20} height={20} className="rounded-full" />
//               ) : (
//                 <div className="w-5 h-5 bg-gray-300 rounded-full" />
//               )}
//               <span>{domain.name}</span>
//             </Link>
//           ))
//         ) : (
//           <p className="text-sm text-gray-500">No domains available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DomainMenu;


//version with upload-button and button files included

// src/components/sidebar/domain-menu.tsx
// import { useDomain } from "@/hooks/use-domain";
// import { cn } from "@/lib/utils";
// import React, { useState } from "react";
// import { PlusCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import Image from "next/image";
// import UploadButton from "@/components/upload-button";
// import FormGenerator from "@/components/forms/form-generator";

// type Props = {
//   min?: boolean;
//   domains: { id: string; name: string; icon: string | null }[] | null | undefined;
// };

// const DomainMenu = ({ domains, min }: Props) => {
//   const { register, onAddDomain, loading, errors, isDomain } = useDomain();
//   const [openModal, setOpenModal] = useState(false);

//   return (
//     <div className={cn("flex flex-col gap-3", min ? "mt-6" : "mt-3")}>
//       {/* Header with Add Domain Button */}
//       <div className="flex justify-between w-full items-center">
//         {!min && <p className="text-xs text-gray-500">DOMAINS</p>}
//         <PlusCircle className="cursor-pointer" size={25} onClick={() => setOpenModal(true)} />
//       </div>
      
//       {/* Form to add a new domain */}
//       {openModal && (
//         <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded shadow-md w-96">
//             <h2 className="text-lg font-bold mb-4">Add New Domain</h2>
//             <FormGenerator
//               onSubmit={onAddDomain}
//               loading={loading}
//               // In domain-menu.tsx, in your fields array
//               fields={[
//                 {
//                   name: "domain",
//                   label: "Domain Name",
//                   type: "text",
//                   placeholder: "example.com",
//                   register: register,
//                   error: errors.domain
//                 },
//                 {
//                   name: "icon",
//                   label: "Domain Icon",
//                   type: "custom",
//                   register: register,
//                   error: null, // Set to null so FormGenerator doesn't show the error
//                   render: () => (
//                     <UploadButton
//                       register={register}
//                       name="icon"
//                       error={errors.icon} // Pass the error here only
//                     />
//                   )
//                 }
//               ]}
//               buttons={[
//                 {
//                   label: "Cancel",
//                   type: "button",
//                   variant: "outline",
//                   onClick: () => setOpenModal(false)
//                 },
//                 {
//                   label: "Add Domain",
//                   type: "submit",
//                   variant: "primary",
//                   disabled: loading
//                 }
//               ]}
//             />
//           </div>
//         </div>
//       )}
      
//       {/* Render existing domains */}
//       <div className="flex flex-col gap-2">
//         {domains && domains.length > 0 ? (
//           domains.map((domain) => (
//             <Link 
//               key={domain.id} 
//               href={`/domain/${domain.id}`} 
//               className={cn(
//                 "flex items-center gap-2 p-2 hover:bg-gray-100 rounded",
//                 isDomain === domain.id && "bg-gray-100"
//               )}
//             >
//               {domain.icon ? (
//                 <Image 
//                   src={domain.icon} 
//                   alt={`${domain.name} icon`} 
//                   width={20} 
//                   height={20} 
//                   className="rounded-full" 
//                 />
//               ) : (
//                 <div className="w-5 h-5 bg-gray-300 rounded-full" />
//               )}
//               <span>{domain.name}</span>
//             </Link>
//           ))
//         ) : (
//           <p className="text-sm text-gray-500">No domains available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DomainMenu;





// // src/components/sidebar/domain-menu.tsx
// import { useDomain } from "@/hooks/use-domain";
// import { cn } from "@/lib/utils";
// import React, { useState } from "react";
// import { PlusCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import Image from "next/image";
// import UploadButton from "@/components/upload-button";
// import FormGenerator from "@/components/forms/form-generator";

// type Props = {
//   min?: boolean;
//   domains: { id: string; name: string; icon: string | null }[] | null | undefined;
// };

// const DomainMenu = ({ domains, min }: Props) => {
//   const { register, onAddDomain, loading, errors, isDomain } = useDomain();
//   const [openModal, setOpenModal] = useState(false);

//   return (
//     <div className={cn("flex flex-col gap-3", min ? "mt-6" : "mt-3")}>
//       {/* Header with Add Domain Button */}
//       <div className="flex justify-between w-full items-center">
//         {!min && <p className="text-xs text-gray-500">DOMAINS</p>}
//         <PlusCircle className="cursor-pointer" size={25} onClick={() => setOpenModal(true)} />
//       </div>
      
//       {/* Form to add a new domain */}
//       {openModal && (
//         <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded shadow-md w-96">
//             <h2 className="text-lg font-bold mb-4">Add New Domain</h2>
//             <FormGenerator
//               onSubmit={onAddDomain}
//               loading={loading}
//               fields={[
//                 {
//                   name: "domain",
//                   label: "Domain Name",
//                   type: "text",
//                   placeholder: "example.com",
//                   register: register,
//                   error: errors.domain
//                 },
//                 {
//                   name: "icon",
//                   label: "Domain Icon",
//                   type: "file", // Changed from "custom" to "file"
//                   register: register,
//                   error: errors.icon
//                 }
//               ]}
//               buttons={[
//                 {
//                   label: "Cancel",
//                   type: "button",
//                   variant: "outline",
//                   onClick: () => setOpenModal(false)
//                 },
//                 {
//                   label: loading ? "Adding..." : "Add Domain",
//                   type: "submit",
//                   variant: "primary",
//                   disabled: loading
//                 }
//               ]}
//             />
//           </div>
//         </div>
//       )}
      
//       {/* Render existing domains */}
//       <div className="flex flex-col gap-2">
//         {domains && domains.length > 0 ? (
//           domains.map((domain) => (
//             <Link 
//               key={domain.id} 
//               href={`/domain/${domain.id}`} 
//               className={cn(
//                 "flex items-center gap-2 p-2 hover:bg-gray-100 rounded",
//                 isDomain === domain.id && "bg-g  ray-100"
//               )}
//             >
//               {domain.icon ? (
//                 <Image 
//                   src={domain.icon} 
//                   alt={`${domain.name} icon`} 
//                   width={20} 
//                   height={20} 
//                   className="rounded-full" 
//                 />
//               ) : (
//                 <div className="w-5 h-5 bg-gray-300 rounded-full" />
//               )}
//               <span>{domain.name}</span>
//             </Link>
//           ))
//         ) : (
//           <p className="text-sm text-gray-500">No domains available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DomainMenu;





// import { useDomain } from "@/hooks/use-domain";
// import { cn } from "@/lib/utils";
// import React, { useState } from "react";
// import { PlusCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import Image from "next/image";
// import UploadButton from "@/components/upload-button";
// import FormGenerator from "@/components/forms/form-generator";

// type Props = {
//   min?: boolean;
//   domains: { id: string; name: string; icon: string | null }[] | null | undefined;
// };

// const DomainMenu = ({ domains, min }: Props) => {
//   const { register, onAddDomain, loading, errors, isDomain } = useDomain();
//   const [openModal, setOpenModal] = useState(false);

//   const closeModal = () => setOpenModal(false);

//   // Add this to your hook or make a separate function
//   const wrappedOnAddDomain = async (e: React.FormEvent) => {
//     await onAddDomain(e);
//     if (!errors.domain && !errors.icon) {
//       closeModal();
//     }
//   };

//   return (
//     <div className={cn("flex flex-col gap-3", min ? "mt-6" : "mt-3")}>
//       {/* Header with Add Domain Button */}
//       <div className="flex justify-between w-full items-center">
//         {!min && <p className="text-xs text-gray-500">DOMAINS</p>}
//         <PlusCircle className="cursor-pointer" size={25} onClick={() => setOpenModal(true)} />
//       </div>
      
//       {/* Form to add a new domain */}
//       {openModal && (
//         <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded shadow-md w-96">
//             <h2 className="text-lg font-bold mb-4">Add New Domain</h2>
//             <FormGenerator
//               onSubmit={wrappedOnAddDomain}
//               loading={loading}
//               fields={[
//                 {
//                   name: "domain",
//                   label: "Domain Name",
//                   type: "text",
//                   placeholder: "example.com",
//                   register: register,
//                   error: errors.domain
//                 },
//                 {
//                   name: "icon",
//                   label: "Domain Icon",
//                   type: "custom",
//                   register: register,
//                   error: errors.icon,
//                   render: () => (
//                     <UploadButton 
//                       register={register} 
//                       name="icon" 
//                       error={errors.icon}
//                     />
//                   )
//                 }
//               ]}
//               buttons={[
//                 {
//                   label: "Cancel",
//                   type: "button",
//                   variant: "outline",
//                   onClick: closeModal
//                 },
//                 {
//                   label: loading ? "Adding..." : "Add Domain",
//                   type: "submit",
//                   variant: "primary",
//                   disabled: loading
//                 }
//               ]}
//             />
//           </div>
//         </div>
//       )}
      
//       {/* Render existing domains */}
//       <div className="flex flex-col gap-2">
//         {domains && domains.length > 0 ? (
//           domains.map((domain) => {
//             console.log("Rendering domain:", domain);
//             return (
//               <Link 
//                 key={domain.id} 
//                 href={`/domain/${domain.id}`} 
//                 className={cn(
//                   "flex items-center gap-2 p-2 hover:bg-gray-100 rounded",
//                   isDomain === domain.id && "bg-gray-100"
//                 )}
//               >
//                 {domain.icon ? (
//                   <img 
//                     src={domain.icon} 
//                     alt={`${domain.name} icon`} 
//                     width="20" 
//                     height="20" 
//                     className="rounded-full" 
//                     onError={(e) => {
//                       console.error(`Error loading image: ${domain.icon}`);
//                       const target = e.target as HTMLImageElement;
//                       target.style.display = 'none';
//                       const fallback = document.createElement('div');
//                       fallback.className = 'w-5 h-5 bg-gray-300 rounded-full';
//                       target.parentNode?.insertBefore(fallback, target.nextSibling);
//                     }}
//                   />
//                 ) : (
//                   <div className="w-5 h-5 bg-gray-300 rounded-full" />
//                 )}
//                 <span>{domain.name}</span>
//               </Link>
//             );
//           })
//         ) : (
//           <p className="text-sm text-gray-500">No domains available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DomainMenu;






import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddDomainSchema } from "@/schemas/settings.schema";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { UploadClient } from "@uploadcare/upload-client";
import { onIntegrateDomain } from "@/actions/settings";

// Initialize upload client directly here
const upload = new UploadClient({
  publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string
});

type Props = {
  min?: boolean;
  domains: { id: string; name: string; icon: string | null }[] | null | undefined;
};

const DomainMenu = ({ domains, min }: Props) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(AddDomainSchema)
  });
  
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isDomain, setIsDomain] = useState(pathname.split("/").pop());

  // Handle form submission directly here
  const onAddDomain = handleSubmit(async (values) => {
    setLoading(true);
    
    try {
      const iconFile = values.icon?.[0];
      let iconUrl = "";
      
      if (iconFile) {
        const result = await upload.uploadFile(iconFile);
        if (result.cdnUrl) {
          iconUrl = result.cdnUrl;
          console.log("Uploaded icon URL:", iconUrl);
        }
      }
      
      const response = await onIntegrateDomain(values.domain, iconUrl);
      
      toast({
        title: response.status === 200 ? "Success" : "Error",
        description: response.message
      });
      
      if (response.status === 200) {
        reset();
        setOpenModal(false);
        router.refresh();
      }
    } catch (error) {
      console.error("Error adding domain:", error);
      toast({
        title: "Error",
        description: "Failed to add domain"
      });
    } finally {
      setLoading(false);
    }
  });

  return (
    <div className={cn("flex flex-col gap-3", min ? "mt-6" : "mt-3")}>
      {/* Header with Add Domain Button */}
      <div className="flex justify-between w-full items-center">
        {!min && <p className="text-xs text-gray-500">DOMAINS</p>}
        <PlusCircle className="cursor-pointer" size={25} onClick={() => setOpenModal(true)} />
      </div>
      
      {/* Simple form without using FormGenerator or UploadButton */}
      {openModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-lg font-bold mb-4">Add New Domain</h2>
            <form onSubmit={onAddDomain}>
              <div className="mb-4">
                <label htmlFor="domain" className="block text-sm font-medium text-gray-700">
                  Domain Name
                </label>
                <input
                  id="domain"
                  type="text"
                  {...register("domain")}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                {errors.domain && (
                  <p className="text-red-500 text-xs mt-1">{errors.domain.message?.toString()}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label htmlFor="icon" className="block text-sm font-medium text-gray-700">
                  Domain Icon
                </label>
                <input
                  id="icon"
                  type="file"
                  {...register("icon")}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                {errors.icon && (
                  <p className="text-red-500 text-xs mt-1">{errors.icon.message?.toString()}</p>
                )}
              </div>
              
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Domain"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Render existing domains */}
      <div className="flex flex-col gap-2">
        {domains && domains.length > 0 ? (
          domains.map((domain) => (
            <Link 
              key={domain.id} 
              href={`/domain/${domain.id}`} 
              className={cn(
                "flex items-center gap-2 p-2 hover:bg-gray-100 rounded",
                isDomain === domain.id && "bg-gray-100"
              )}
            >
              {domain.icon ? (
                <Image 
                  src={domain.icon} 
                  alt={`${domain.name} icon`} 
                  width={20} 
                  height={20} 
                  className="rounded-full" 
                />
              ) : (
                <div className="w-5 h-5 bg-gray-300 rounded-full" />
              )}
              <span>{domain.name}</span>
            </Link>
          ))
        ) : (
          <p className="text-sm text-gray-500">No domains available</p>
        )}
      </div>
    </div>
  );
};

export default DomainMenu;