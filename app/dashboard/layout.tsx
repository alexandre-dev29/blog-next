import React from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className={'h-full md:w-[85vw] mx-auto '}>{children}</main>;
};
export default DashboardLayout;
