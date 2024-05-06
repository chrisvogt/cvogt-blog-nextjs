import { ReactNode, useState } from 'react';

import Sidebar from '../sidebar';
import Header from '../header';

interface LayoutPropsInterface {
  children: ReactNode;
}

// This layout is based on the Light Sidear With Header template from
// https://tailwindui.com/components/application-ui/application-shells/sidebar
export const Layout = ({ children }: LayoutPropsInterface) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      {/*
        This layout requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="lg:pl-72">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
};
