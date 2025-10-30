'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAgentConfigStore } from '@/store/useAgentConfigStore';
import { useModalStore } from '@/store/useModalStore';

export const NavigationInterceptor = () => {
  const router = useRouter();
  const { isDirty } = useAgentConfigStore();
  const { onOpen } = useModalStore();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      // If there are no unsaved changes, do nothing.
      if (!isDirty) {
        return;
      }

      // Find the closest <a> tag ancestor of the clicked element.
      const link = (event.target as HTMLElement).closest('a');

      // Check if a link was clicked and if it's an internal navigation link.
      if (
        link &&
        link.href &&
        link.target !== '_blank' && // Ignore links that open in a new tab
        new URL(link.href).origin === window.location.origin // Ensure it's not an external link
      ) {
        // Prevent the default navigation behavior.
        event.preventDefault();

        // Open the confirmation modal.
        onOpen('unsavedChanges', {
          onConfirm: () => {
            // If the user confirms, proceed with the navigation.
            router.push(link.href);
          },
        });
      }
    };

    // Add the event listener to the document.
    document.addEventListener('click', handleClick, true); // Use capture phase

    // Clean up the event listener when the component unmounts.
    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [isDirty, router, onOpen]);

  // This component does not render anything itself.
  return null;
};
