// Centralized Route Checker for Admin App
export interface AdminRouteConfig {
  path: string;
  component: string;
  requiresAuth: boolean;
  allowedRoles: string[];
  meta?: {
    title: string;
    description?: string;
    icon?: string;
  };
}

export const ADMIN_ROUTES: AdminRouteConfig[] = [
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
    path: '/settings',
    component: 'Settings',
    requiresAuth: true,
    allowedRoles: ['admin', 'super_admin'],
    meta: {
      title: 'Settings - Keephy Admin',
      description: 'Configure platform settings',
      icon: 'settings'
    }
  }
];

export class AdminRouteChecker {
  private static instance: AdminRouteChecker;
  private errors: string[] = [];

  static getInstance(): AdminRouteChecker {
    if (!AdminRouteChecker.instance) {
      AdminRouteChecker.instance = new AdminRouteChecker();
    }
    return AdminRouteChecker.instance;
  }

  validateRoute(path: string, userRole?: string): { isValid: boolean; errors: string[] } {
    this.errors = [];
    
    // Check if route exists
    const route = ADMIN_ROUTES.find(r => r.path === path);
    if (!route) {
      this.errors.push(`Admin route ${path} not found in route configuration`);
      return { isValid: false, errors: this.errors };
    }

    // Check component exists
    this.checkComponentExists(route.component);
    
    // Check authentication requirements
    this.checkAuthRequirements(route, path);
    
    // Check role permissions
    this.checkRolePermissions(route, userRole);
    
    // Check meta information
    this.checkMetaInformation(route);

    return { isValid: this.errors.length === 0, errors: this.errors };
  }

  private checkComponentExists(componentName: string): void {
    const validComponents = [
      'Dashboard', 'BusinessManagement', 'UserManagement', 'BranchManagement',
      'FormManagement', 'Analytics', 'Settings'
    ];
    if (!validComponents.includes(componentName)) {
      this.errors.push(`Admin component ${componentName} not found or not properly exported`);
    }
  }

  private checkAuthRequirements(route: AdminRouteConfig, path: string): void {
    if (route.requiresAuth) {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (!token) {
          this.errors.push(`Admin route ${path} requires authentication but no token found`);
        }
      }
    }
  }

  private checkRolePermissions(route: AdminRouteConfig, userRole?: string): void {
    if (userRole && route.allowedRoles.length > 0) {
      if (!route.allowedRoles.includes(userRole)) {
        this.errors.push(`User role ${userRole} not authorized for route ${route.path}`);
      }
    }
  }

  private checkMetaInformation(route: AdminRouteConfig): void {
    if (!route.meta?.title) {
      this.errors.push(`Admin route ${route.path} missing required meta title`);
    }
  }

  validateAllRoutes(userRole?: string): { totalRoutes: number; validRoutes: number; errors: string[] } {
    const allErrors: string[] = [];
    let validCount = 0;

    ADMIN_ROUTES.forEach(route => {
      const validation = this.validateRoute(route.path, userRole);
      if (!validation.isValid) {
        allErrors.push(...validation.errors);
      } else {
        validCount++;
      }
    });

    return {
      totalRoutes: ADMIN_ROUTES.length,
      validRoutes: validCount,
      errors: allErrors
    };
  }

  checkApiEndpoint(endpoint: string): Promise<{ status: number; error?: string }> {
    return fetch(endpoint, { method: 'HEAD' })
      .then(response => ({ status: response.status }))
      .catch(error => {
        this.errors.push(`Admin API endpoint ${endpoint} is not accessible: ${error.message}`);
        return { status: 0, error: error.message };
      });
  }

  checkImageExists(imagePath: string): Promise<boolean> {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve(false);
        return;
      }

      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => {
        this.errors.push(`Admin image ${imagePath} failed to load`);
        resolve(false);
      };
      img.src = imagePath;
    });
  }

  getErrors(): string[] {
    return [...this.errors];
  }

  clearErrors(): void {
    this.errors = [];
  }
}

// Global error handler for admin
export const setupAdminGlobalErrorHandling = () => {
  if (typeof window === 'undefined') return;

  // Unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Admin unhandled promise rejection:', event.reason);
    AdminRouteChecker.getInstance().errors.push(`Admin unhandled promise rejection: ${event.reason}`);
  });

  // JavaScript errors
  window.addEventListener('error', (event) => {
    console.error('Admin JavaScript error:', event.error);
    AdminRouteChecker.getInstance().errors.push(`Admin JavaScript error: ${event.error?.message || 'Unknown error'}`);
  });

  // Resource loading errors
  window.addEventListener('error', (event) => {
    if (event.target !== window) {
      console.error('Admin resource loading error:', event.target);
      AdminRouteChecker.getInstance().errors.push(`Admin resource loading error: ${(event.target as any)?.src || 'Unknown resource'}`);
    }
  }, true);
};
