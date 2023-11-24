import {Avatar, Dropdown, Navbar, Text} from '@nextui-org/react';
import React from 'react';
import {DarkModeSwitch} from './darkmodeswitch';
import allUserData from '../../public/dummyData/userList.json'

export const UserDropdown = () => {
   const personalUserData = allUserData[0]
   return (
      <Dropdown placement="bottom-right">
         <Navbar.Item>
            <Dropdown.Trigger>
               <Avatar
                  bordered
                  as="button"
                  color="success"
                  size="md"
                  src={personalUserData.profilePicture}
               />
            </Dropdown.Trigger>
         </Navbar.Item>
         <Dropdown.Menu
            aria-label="User menu actions"
            onAction={(actionKey) => console.log({actionKey})}
         >
            <Dropdown.Item key="settings" withDivider>
               Pengaturan Saya
            </Dropdown.Item>
            <Dropdown.Item key="logout" withDivider color="error">
               Keluar
            </Dropdown.Item>
            <Dropdown.Item key="switch" withDivider>
               <DarkModeSwitch />
            </Dropdown.Item>
         </Dropdown.Menu>
      </Dropdown>
   );
};
