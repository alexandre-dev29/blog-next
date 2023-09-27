'use client';

import { ActionType, ResourceType } from '@/types/uiTypes';

export const CanAccess = ({
  Action,
  resource,
  children,
}: {
  children: React.ReactNode;
  resource: ResourceType;
  Action: ActionType;
}) => {
  return <>{children}</>;
};
