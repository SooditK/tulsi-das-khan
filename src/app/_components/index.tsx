"use client";

import { cn } from "@/lib/utils";
import type { IconType } from "react-icons";
import { BsBarChart, BsCursor } from "react-icons/bs";
import { CiMoneyBill } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import { GrAppsRounded } from "react-icons/gr";
import { HiMenuAlt2, HiOutlineClipboardList, HiSearch } from "react-icons/hi";
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdOutlineGroup } from "react-icons/md";
import { PiLightningDuotone } from "react-icons/pi";
import { TbDiscount2, TbSpeakerphone, TbTruck } from "react-icons/tb";
import { UserNav } from "./profile-dropdown";
import TeamSwitcher from "./account-switcher";
import { MarketingNav } from "./marketing-dropdown";
import { Input } from "@/components/ui/input";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";

const navigation = [
  { name: "Home", href: "#", icon: GoHome as IconType, current: false },
  {
    name: "Orders",
    href: "#",
    icon: HiOutlineClipboardList as IconType,
    current: false,
  },
  {
    name: "Products",
    href: "#",
    icon: GrAppsRounded as IconType,
    current: false,
  },
  { name: "Delivery", href: "#", icon: TbTruck as IconType, current: false },
  {
    name: "Marketing",
    href: "#",
    icon: TbSpeakerphone as IconType,
    current: false,
  },
  {
    name: "Analytics",
    href: "#",
    icon: BsBarChart as IconType,
    current: false,
  },
  {
    name: "Payments",
    href: "#",
    icon: CiMoneyBill as IconType,
    current: true,
  },
  { name: "Tools", href: "#", icon: BsCursor as IconType, current: false },
  {
    name: "Discounts",
    href: "#",
    icon: TbDiscount2 as IconType,
    current: false,
  },
  {
    name: "Audience",
    href: "#",
    icon: MdOutlineGroup as IconType,
    current: false,
  },
  {
    name: "Appearance",
    href: "#",
    icon: IoColorPaletteOutline as IconType,
    current: false,
  },
  {
    name: "Plugins",
    href: "#",
    icon: PiLightningDuotone as IconType,
    current: false,
  },
];

export default function Dashboard() {
  return (
    <>
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex-1 flex flex-col min-h-0 bg-dark">
          <div className="flex items-center h-18 flex-shrink-0 p-2 bg-dark">
            <TeamSwitcher />
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  )}
                >
                  <item.icon
                    className={cn(
                      item.current
                        ? "text-gray-300"
                        : "text-gray-400 group-hover:text-gray-300",
                      "mr-3 flex-shrink-0 h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="md:pl-64 flex flex-col">
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset  md:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <HiMenuAlt2 className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="ml-4 space-x-4 flex items-center md:ml-6">
              <span className="inline-flex">Payments</span>
              <div className="flex justify-center items-center">
                <QuestionMarkCircledIcon className="h-5 w-5 text-gray-400 mr-1" />
                <span className="text-xs text-gray-600">How it works</span>
              </div>
            </div>
            <div className="flex h-full">
              <form className="my-auto">
                <label className="relative block">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <HiSearch className="h-5 w-5 text-gray-400" />
                  </span>
                  <Input
                    className="h-10 w-80 rounded-lg text-gray-900 bg-white border border-slate-300 py-2 pl-10 pr-4"
                    placeholder="Search features, tutorials, etc."
                    type="text"
                  />
                </label>
              </form>
            </div>

            <div className="ml-4 space-x-4 flex items-center md:ml-6">
              {/* Marketing dropdown */}
              <MarketingNav />
              {/* Profile dropdown */}
              <UserNav />
            </div>
          </div>
        </div>

        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">
                Dashboard
              </h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Replace with your content */}
              <div className="py-4">
                <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
              </div>
              {/* /End replace */}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
