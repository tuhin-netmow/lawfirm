"use client";

import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "./ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import React, { type ReactNode } from "react";
import { useAppSelector } from "@/store/store";

// Type for sub-menu items
export interface NavSubItem {
  title: string;
  url: string;
  icon?: React.ElementType;
  allowedPermissions: string[];
  items?: NavSubItem[];
}

// Type for main menu items
export interface NavItem {
  title: string;
  url?: string;
  icon?: React.ElementType;
  items?: NavSubItem[];
  isActive?: boolean;
  layout?: ReactNode;
  allowedPermissions: string[];
}

// Props type
interface NavMainProps {
  items: NavItem[];
}

export function NavMain({ items }: NavMainProps) {
  const userPermissions = useAppSelector((state) => state.auth.user?.role.permissions || []);
  const location = useLocation();

  // Recursive helper for sub-items
  const renderSubItem = (item: NavSubItem) => {
    const isHide = item.allowedPermissions && !item.allowedPermissions.some((p) => userPermissions.includes(p));
    if (!item.title || isHide) return null;

    const hasSubItems = Array.isArray(item.items) && item.items.length > 0;
    const isExpanded = hasSubItems && item.items!.some(sub => location.pathname.startsWith(sub.url));

    if (hasSubItems) {
      return (
        <SidebarMenuSubItem key={item.title}>
          <Collapsible className="group/sub" defaultOpen={isExpanded}>
            <CollapsibleTrigger asChild>
              <SidebarMenuSubButton className="cursor-pointer">
                {item.icon && <item.icon />}
                <span>{item.title}</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/sub:rotate-90" />
              </SidebarMenuSubButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.items!.map(renderSubItem)}
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        </SidebarMenuSubItem>
      );
    }

    // Leaf node
    return (
      <SidebarMenuSubItem key={item.title}>
        <SidebarMenuSubButton asChild isActive={location.pathname === item.url}>
          <Link to={item.url}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
          </Link>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    );
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>General</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isHide = item.allowedPermissions && !item.allowedPermissions.some((p) => userPermissions.includes(p));
          if (!item.title || isHide) return null;

          const hasSubItems = Array.isArray(item.items) && item.items.length > 0;

          // Special logic: skip children if layout and url exist (Root items that act as direct links)
          if (item.layout && item.url) {
            return (
              <SidebarMenuItem key={item.title} className="cursor-pointer">
                <SidebarMenuButton asChild tooltip={item.title} isActive={location.pathname === item.url}>
                  <Link to={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          // Root Item with Sub-items -> Collapsible
          if (hasSubItems) {
            // Check if any child is active to defaultOpen
            // We need to recursively check for active state if we want auto-expanded on deeply nested routes
            // For now, simple check on direct children URLs or just strict true/false from config?
            // Config has isActive, but dynamic path check is better.
            const isChildActive = (subItems: NavSubItem[]): boolean => {
              return subItems.some(sub => {
                if (location.pathname.startsWith(sub.url) && sub.url !== '#') return true;
                if (sub.items) return isChildActive(sub.items);
                return false;
              });
            }
            const isOpen = item.isActive || (item.items && isChildActive(item.items));

            return (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={isOpen}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger className="cursor-pointer" asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items!.map(renderSubItem)}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          }

          // Root Item leaf
          return (
            <SidebarMenuItem key={item.title} className="cursor-pointer">
              <SidebarMenuButton asChild tooltip={item.title} isActive={location.pathname === item.url}>
                <Link to={item.url!}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}



















// "use client";

// import { ChevronRight } from "lucide-react";
// import { Link } from "react-router";
// import {
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
// } from "./ui/sidebar";
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
// import React from "react";

// // Type for sub-menu items
// export interface NavSubItem {
//   title: string;
//   url: string;
//   icon?: React.ElementType;
// }

// // Type for main menu items
// export interface NavItem {
//   title: string;
//   url?: string;
//   icon?: React.ElementType;
//   items?: NavSubItem[];
//   isActive?: boolean;
// }

// // Props type
// interface NavMainProps {
//   items: NavItem[];
// }

// export function NavMain({ items }: NavMainProps) {
//   return (
//     <SidebarGroup>
//       <SidebarGroupLabel>General</SidebarGroupLabel>
//       <SidebarMenu>
//         {items.map((item) => {
//           const hasSubItems = Array.isArray(item.items) && item.items.length > 0;

//           // CASE 1: With sub-items -> collapsible
//           if (hasSubItems) {
//             return (
//               <Collapsible
//                 key={item.title}
//                 asChild
//                 defaultOpen={item.isActive}
//                 className="group/collapsible"
//               >
//                 <SidebarMenuItem>
//                   <CollapsibleTrigger className="cursor-pointer" asChild>
//                     <SidebarMenuButton tooltip={item.title}>
//                       {item.icon && <item.icon />}
//                       <span>{item.title}</span>
//                       <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
//                     </SidebarMenuButton>
//                   </CollapsibleTrigger>

//                   <CollapsibleContent>
//                     <SidebarMenuSub>
//                       {item.items!.map((subItem) => (
//                         <SidebarMenuSubItem key={subItem.title}>
//                           <SidebarMenuSubButton asChild>
//                             <Link to={subItem.url}>
//                               {subItem.icon && <subItem.icon />}
//                               <span>{subItem.title}</span>
//                             </Link>
//                           </SidebarMenuSubButton>
//                         </SidebarMenuSubItem>
//                       ))}
//                     </SidebarMenuSub>
//                   </CollapsibleContent>
//                 </SidebarMenuItem>
//               </Collapsible>
//             );
//           }

//           // CASE 2: No sub-items -> simple menu link
//           return (
//             <SidebarMenuItem key={item.title} className="cursor-pointer">
//               <SidebarMenuButton asChild tooltip={item.title}>
//                 <Link to={item.url!}>
//                   {item.icon && <item.icon />}
//                   <span>{item.title}</span>
//                 </Link>
//               </SidebarMenuButton>
//             </SidebarMenuItem>
//           );
//         })}
//       </SidebarMenu>
//     </SidebarGroup>
//   );
// }
