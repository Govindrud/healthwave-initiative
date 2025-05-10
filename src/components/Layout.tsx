
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title, description }) => {
  return <MainLayout title={title} description={description}>{children}</MainLayout>;
};

export default Layout;
