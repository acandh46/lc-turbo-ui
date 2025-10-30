'use client';

import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import { useAgentConfigStore } from '@/store/useAgentConfigStore';
import { useModalStore } from '@/store/useModalStore';
import React from 'react';

interface ProtectedLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

export const ProtectedLink = ({ children, href, ...props }: ProtectedLinkProps) => {
  const router = useRouter();
  const { isDirty } = useAgentConfigStore();
  const { onOpen } = useModalStore();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only intercept if there are unsaved changes
    if (isDirty) {
      e.preventDefault();
      
      // Open the confirmation modal
      onOpen('unsavedChanges', {
        onConfirm: () => {
          // If user confirms, navigate to the link
          router.push(href.toString());
        },
      });
    }
  };

  return (
    <Link href={href} {...props} onClick={handleClick}>
      {children}
    </Link>
  );
};
