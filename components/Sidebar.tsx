'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const dashboardRoutes = [
  {
    title: "Dashboard",
    to: "/dashboard",
    src: "/imgs/dashboard_icon.png",
  },
  {
    title: "Business",
    to: "/business",
    src: "/imgs/business_icon.png",
  },
  {
    title: "Users",
    to: "/users",
    src: "/imgs/user_icon.png",
  },
  {
    title: "Branches",
    to: "/branch",
    src: "/imgs/branch_icon.png",
  },
  {
    title: "Plans",
    to: "/plans",
    src: "/imgs/plans_icon.png",
  },
  {
    title: "Live Submissions",
    to: "/live-submissions",
    src: "/imgs/submissions_icon.png",
  },
];

const SideNavLink = ({ to, imgSrc, title }: { to: string; imgSrc: string; title: string }) => {
  const pathname = usePathname();
  const isActive = pathname === to;

  return (
    <li>
      <Link
        className={
          isActive
            ? "mb-1 flex gap-2 items-center text-base font-medium transition-all duration-300 cursor-pointer hover:bg-gray-100 hover:border-black border-r-4 w-full py-3 px-6 bg-gray-200 border-black"
            : "mb-1 flex gap-2 items-center text-base font-medium transition-all duration-300 cursor-pointer hover:bg-gray-50 hover:border-black border-r-4 w-full py-3 px-6 border-white"
        }
        href={to}
      >
        <img src={imgSrc} alt={`${title} nav logo`} className="w-[30px]" />
        {title}
      </Link>
    </li>
  );
};

export default function Sidebar() {
  return (
    <aside className="sidebar w-[220px] fixed left-0 top-[60px] bg-white bottom-0 border-r border-black">
      <nav>
        <ul className="mt-2">
          {dashboardRoutes?.map((route, index) => (
            <SideNavLink
              key={`${route?.to}.${index}`}
              to={route?.to}
              imgSrc={route?.src}
              title={route?.title}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
}