import React from 'react';
import { styled } from '@nextui-org/react';

interface Props {
    children: React.ReactNode;
}

const WrapperLayout = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh'
});

export const LoginLayout = ({ children }: Props) => {
    return (
        <WrapperLayout>
            {children}
        </WrapperLayout>
    );
};
