const authenticatedActions: string[] = [];

const publicActions: string[] = [
  'plugin::users-permissions.auth.callback',
  'plugin::users-permissions.auth.forgotPassword',
  'plugin::users-permissions.auth.resetPassword',
  'plugin::users-permissions.auth.refreshToken',
  'plugin::users-permissions.auth.verify2fa',
  'plugin::users-permissions.auth.generate2fa',
];

export default [
  {
    name: 'Public',
    description: 'Default role given to unauthenticated user.',
    type: 'public',
    actions: publicActions,
  },
  {
    name: 'Authenticated',
    description: 'Default role given to authenticated user.',
    type: 'authenticated',
    actions: [...publicActions, ...authenticatedActions],
  },
];
