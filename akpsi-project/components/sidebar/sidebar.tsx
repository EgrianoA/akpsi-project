import React, { useState } from 'react';
import { Box } from '../styles/box';
import { Sidebar } from './sidebar.styles';
import { Flex } from '../styles/flex';
import { SidebarItem } from './sidebar-item';
import { SidebarMenu } from './sidebar-menu';
import { useSidebarContext } from '../layout/layout-context';
import { useRouter } from 'next/router';
import { HomeOutlined, UserOutlined, FolderOutlined, BookOutlined, ContainerOutlined, TeamOutlined, ReadOutlined } from '@ant-design/icons'

export const SidebarWrapper = () => {
   const router = useRouter();
   const { collapsed, setCollapsed } = useSidebarContext();

   return (
      <Box
         as="aside"
         css={{
            height: '100vh',
            zIndex: 202,
            position: 'sticky',
            top: '0',
         }}
      >
         {collapsed ? <Sidebar.Overlay onClick={setCollapsed} /> : null}

         <Sidebar collapsed={collapsed}>
            <Sidebar.Header>
               <img
                  src="bpk-full-logo.png"
               />
            </Sidebar.Header>
            <Flex
               direction={'column'}
               justify={'between'}
               css={{ height: '100%' }}
            >
               <Sidebar.Body className="body sidebar">
                  <SidebarItem
                     title="Beranda"
                     icon={<HomeOutlined />}
                     isActive={router.pathname === '/'}
                     href="/"
                  />
                  <SidebarMenu title="">
                     <SidebarItem
                        isActive={router.pathname === '/users'}
                        title="Daftar Pengguna"
                        icon={<UserOutlined />}
                        href="users"
                     />
                     <SidebarItem
                        isActive={router.pathname === '/team'}
                        title="Kelola Tim"
                        icon={<TeamOutlined />}
                        href="team"
                     />
                     <SidebarItem
                        isActive={router.pathname === '/taskCategory'}
                        title="Kelola Kategori Tugas"
                        icon={<ReadOutlined />}
                        href="taskCategory"
                     />
                     <SidebarItem
                        isActive={router.pathname === '/task'}
                        title="Daftar Tugas Investigasi"
                        icon={<BookOutlined />}
                        href="task"
                     />
                     <SidebarItem
                        isActive={router.pathname === '/taskTemplate'}
                        title="Kelola Template Tugas"
                        icon={<FolderOutlined />}
                        href="taskTemplate"
                     />
                     <SidebarItem
                        isActive={router.pathname === '/board'}
                        title="Tugas Investigasi"
                        icon={<ContainerOutlined />}
                        href="board"
                     />
                  </SidebarMenu>
               </Sidebar.Body>
            </Flex>
         </Sidebar>
      </Box>
   );
};
