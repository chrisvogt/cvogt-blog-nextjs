import { ReactNode } from 'react';

import { Fragment, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  BellIcon,
  Cog6ToothIcon,
  NewspaperIcon,
  MusicalNoteIcon,
  PhotoIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

// import { Footer } from '../footer';
// import { Header } from '../header';

interface LayoutPropsInterface {
  children: ReactNode;
}

{
  /* <Header />
{children}
<Footer /> */
}

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon, current: true },
  { name: 'About', href: '#', icon: UsersIcon, current: false },
  { name: 'Blog', href: '#', icon: NewspaperIcon, current: false },
  { name: 'Photography', href: '/photography', icon: PhotoIcon, current: false },
  { name: 'Music', href: '#', icon: MusicalNoteIcon, current: false },
  // { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
];
const teams = [
  { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
  { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
  { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
];
const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

// This layout is based on the Light Sidear With Header template from
// https://tailwindui.com/components/application-ui/application-shells/sidebar
export const Layout = ({ children }: LayoutPropsInterface) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="bg-gray900/80 fixed inset-0" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul className="-mx-2 space-y-1">
                            {navigation.map(item => (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? 'bg-gray50 text-indigo-600'
                                      : 'text-gray700 hover:bg-gray50 hover:text-indigo-600',
                                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current
                                        ? 'text-indigo-600'
                                        : 'text-gray400 group-hover:text-indigo-600',
                                      'h-6 w-6 shrink-0',
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <div className="text-gray400 text-xs font-semibold leading-6">
                            Your teams
                          </div>
                          <ul className="-mx-2 mt-2 space-y-1">
                            {teams.map(team => (
                              <li key={team.name}>
                                <Link
                                  href={team.href}
                                  className={classNames(
                                    team.current
                                      ? 'bg-gray50 text-indigo-600'
                                      : 'text-gray700 hover:bg-gray50 hover:text-indigo-600',
                                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                  )}
                                >
                                  <span
                                    className={classNames(
                                      team.current
                                        ? 'border-indigo-600 text-indigo-600'
                                        : 'text-gray400 border-gray200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium',
                                    )}
                                  >
                                    {team.initial}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className="mt-auto">
                          <Link
                            href="#"
                            className="text-gray700 hover:bg-gray50 group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 hover:text-indigo-600"
                          >
                            <Cog6ToothIcon
                              className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                              aria-hidden="true"
                            />
                            Settings
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="border-gray200 flex grow flex-col gap-y-5 overflow-y-auto border-r bg-white px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul className="-mx-2 space-y-1">
                    {navigation.map(item => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray50 text-indigo-600'
                              : 'text-gray700 hover:bg-gray50 hover:text-indigo-600',
                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? 'text-indigo-600'
                                : 'text-gray400 group-hover:text-indigo-600',
                              'h-6 w-6 shrink-0',
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-gray400 text-xs font-semibold leading-6">Your teams</div>
                  <ul className="-mx-2 mt-2 space-y-1">
                    {teams.map(team => (
                      <li key={team.name}>
                        <Link
                          href={team.href}
                          className={classNames(
                            team.current
                              ? 'bg-gray50 text-indigo-600'
                              : 'text-gray700 hover:bg-gray50 hover:text-indigo-600',
                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                          )}
                        >
                          <span
                            className={classNames(
                              team.current
                                ? 'border-indigo-600 text-indigo-600'
                                : 'text-gray400 border-gray200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                              'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium',
                            )}
                          >
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="mt-auto">
                  <Link
                    href="#"
                    className="text-gray700 hover:bg-gray50 group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 hover:text-indigo-600"
                  >
                    <Cog6ToothIcon
                      className="text-gray400 h-6 w-6 shrink-0 group-hover:text-indigo-600"
                      aria-hidden="true"
                    />
                    Settings
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="border-gray200 sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="text-gray700 -m-2.5 p-2.5 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div className="bg-gray200 h-6 w-px lg:hidden" aria-hidden="true" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form className="relative flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <MagnifyingGlassIcon
                  className="text-gray400 pointer-events-none absolute inset-y-0 left-0 h-full w-5"
                  aria-hidden="true"
                />
                <input
                  id="search-field"
                  className="text-gray900 placeholder:text-gray400 block h-full w-full border-0 py-0 pl-8 pr-0 focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  type="search"
                  name="search"
                />
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button type="button" className="text-gray400 hover:text-gray500 -m-2.5 p-2.5">
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Separator */}
                <div className="lg:bg-gray200 hidden lg:block lg:h-6 lg:w-px" aria-hidden="true" />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="bg-gray50 h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        className="text-gray900 ml-4 text-sm font-semibold leading-6"
                        aria-hidden="true"
                      >
                        Tom Cook
                      </span>
                      <ChevronDownIcon className="text-gray400 ml-2 h-5 w-5" aria-hidden="true" />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="ring-gray900/5 absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 focus:outline-none">
                      {userNavigation.map(item => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Link
                              href={item.href}
                              className={classNames(
                                active ? 'bg-gray50' : '',
                                'text-gray900 block px-3 py-1 text-sm leading-6',
                              )}
                            >
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              {/* <Header /> */}
              {children}
              {/* <Footer /> */}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
