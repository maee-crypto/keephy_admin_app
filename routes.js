// Centralized Routes Configuration for Admin App
export const ADMIN_ROUTES = {
  // Dashboard
  DASHBOARD: {
    path: '/',
    component: 'Dashboard',
    requiresAuth: true,
    allowedRoles: ['admin', 'super_admin', 'manager'],
    meta: {
      title: 'Dashboard - Keephy Admin',
      description: 'Overview of your Keephy platform',
      icon: 'dashboard'
    }
  },
  
  // Business Management
  BUSINESS: {
    path: '/business',
    component: 'BusinessManagement',
    requiresAuth: true,
    allowedRoles: ['admin', 'super_admin'],
    meta: {
      title: 'Business Management - Keephy Admin',
      description: 'Manage businesses and locations',
      icon: 'business'
    }
  },
  BUSINESS_DETAILS: {
    path: '/business/:id',
    component: 'BusinessDetails',
    requiresAuth: true,
    allowedRoles: ['admin', 'super_admin'],
    meta: {
      title: 'Business Details - Keephy Admin',
      description: 'View and edit business details',
      icon: 'business'
    }
  },
  
  // User Management
  USERS: {
    path: '/user',
    component: 'UserManagement',
    requiresAuth: true,
    allowedRoles: ['admin', 'super_admin'],
    meta: {
      title: 'User Management - Keephy Admin',
      description: 'Manage users and permissions',
      icon: 'user'
    }
  },
  USER_DETAILS: {
    path: '/user/:id',
    component: 'UserDetails',
    requiresAuth: true,
    allowedRoles: ['admin', 'super_admin'],
    meta: {
      title: 'User Details - Keephy Admin',
      description: 'View and edit user details',
      icon: 'user'
    }
  },
  
  // Branch Management
  BRANCHES: {
    path: '/branch',
    component: 'BranchManagement',
    requiresAuth: true,
    allowedRoles: ['admin', 'super_admin', 'manager'],
    meta: {
      title: 'Branch Management - Keephy Admin',
      description: 'Manage branches and locations',
      icon: 'branch'
    }
  },
  BRANCH_DETAILS: {
    path: '/branch/:id',
    component: 'BranchDetails',
    requiresAuth: true,
    allowedRoles: ['admin', 'super_admin', 'manager'],
    meta: {
      title: 'Branch Details - Keephy Admin',
      description: 'View and edit branch details',
      icon: 'branch'
    }
  },
  
  // Form Management
  FORMS: {
    path: '/forms',
    component: 'FormManagement',
    requiresAuth: true,
    allowedRoles: ['admin', 'super_admin', 'manager'],
    meta: {
      title: 'Form Management - Keephy Admin',
      description: 'Create and manage feedback forms',
      icon: 'forms'
    }
  },
  FORM_DETAILS: {
    path: '/forms/:id',
    component: 'FormDetails',
    requiresAuth: true,
    allowedRoles: ['admin', 'super_admin', 'manager'],
    meta: {
      title: 'Form Details - Keephy Admin',
      description: 'View and edit form details',
      icon: 'forms'
    }
  },
  
  // Analytics
  ANALYTICS: {
    path: '/analytics',
    component: 'Analytics',
    requiresAuth: true,
    allowedRoles: ['admin', 'super_admin', 'manager', 'analyst'],
    meta: {
      title: 'Analytics - Keephy Admin',
      description: 'View detailed analytics and reports',
      icon: 'analytics'
    }
  },
  
  // Settings
  SETTINGS: {
    path: '/settings',
    component: 'Settings',
    requiresAuth: true,
    allowedRoles: ['admin', 'super_admin'],
    meta: {
      title: 'Settings - Keephy Admin',
      description: 'Configure platform settings',
      icon: 'settings'
    }
  },
  
  // Reports
  REPORTS: {
    path: '/reports',
    component: 'Reports',
    requiresAuth: true,
    allowedRoles: ['admin', 'super_admin', 'manager', 'analyst'],
    meta: {
      title: 'Reports - Keephy Admin',
      description: 'Generate and view reports',
      icon: 'reports'
    }
  }
};

// Route validation helper
export const validateAdminRoute = (path, userRole = null) => {
  const route = Object.values(ADMIN_ROUTES).find(r => 
    r.path === path || r.path.replace(':id', '\\d+').test(path)
  );
  
  if (!route) {
    return { isValid: false, error: `Admin route ${path} not found` };
  }
  
  if (route.requiresAuth && !userRole) {
    return { isValid: false, error: 'Authentication required' };
  }
  
  if (route.allowedRoles && userRole && !route.allowedRoles.includes(userRole)) {
    return { isValid: false, error: 'Insufficient permissions' };
  }
  
  return { isValid: true, route };
};

// Get navigation menu items
export const getNavigationMenu = (userRole = null) => {
  return Object.values(ADMIN_ROUTES)
    .filter(route => 
      !route.requiresAuth || 
      !route.allowedRoles || 
      route.allowedRoles.includes(userRole)
    )
    .filter(route => !route.path.includes(':')) // Exclude dynamic routes
    .map(route => ({
      path: route.path,
      title: route.meta.title.split(' - ')[0],
      icon: route.meta.icon,
      description: route.meta.description
    }));
};

// Get routes by role
export const getAdminRoutesByRole = (role) => {
  return Object.values(ADMIN_ROUTES).filter(route => 
    !route.requiresAuth || !route.allowedRoles || route.allowedRoles.includes(role)
  );
};

// Check if user can access route
export const canAccessRoute = (path, userRole) => {
  const validation = validateAdminRoute(path, userRole);
  return validation.isValid;
};
