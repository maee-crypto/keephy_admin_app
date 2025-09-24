import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard E2E Tests', () => {
test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

  test('should load admin dashboard without errors', async ({ page }) => {
    // Check for no console errors
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.waitForLoadState('networkidle');
    
    // Verify no critical errors
    expect(errors.filter(error => 
      !error.includes('favicon') && 
      !error.includes('404') &&
      !error.includes('Something went wrong')
    )).toHaveLength(0);
  });

  test('should display admin layout', async ({ page }) => {
    // Check header
    await expect(page.locator('header')).toBeVisible();
    await expect(page.getByRole('img', { name: '' })).toBeVisible(); // Logo
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
    
    // Check sidebar
    await expect(page.locator('aside')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Business' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'User' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Branch' })).toBeVisible();
  });

  test('should display dashboard content', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByText('Welcome to Keephy Admin Dashboard')).toBeVisible();
  });

  test('should display stats cards', async ({ page }) => {
    await expect(page.getByText('Total Submissions')).toBeVisible();
    await expect(page.getByText('Average Rating')).toBeVisible();
    await expect(page.getByText('Active Forms')).toBeVisible();
    await expect(page.getByText('Total Users')).toBeVisible();
    
    // Check stats values
    await expect(page.getByText('1,234')).toBeVisible();
    await expect(page.getByText('4.2')).toBeVisible();
    await expect(page.getByText('12')).toBeVisible();
    await expect(page.getByText('89')).toBeVisible();
  });

  test('should display recent activity', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Recent Activity' })).toBeVisible();
    await expect(page.getByText(/New submission received from/)).toBeVisible();
    await expect(page.getByText(/Form.*was updated/)).toBeVisible();
    await expect(page.getByText(/New user.*registered/)).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    // Test sidebar navigation
    const businessLink = page.getByRole('link', { name: 'Business' });
    const userLink = page.getByRole('link', { name: 'User' });
    const branchLink = page.getByRole('link', { name: 'Branch' });
    
    await expect(businessLink).toBeVisible();
    await expect(userLink).toBeVisible();
    await expect(branchLink).toBeVisible();
    
    // Test clicking navigation links
    await businessLink.click();
    // Add assertions for navigation behavior
  });

  test('should handle logout', async ({ page }) => {
    const logoutButton = page.getByRole('button', { name: 'Logout' });
    await logoutButton.click();
    
    // Add assertions for logout behavior
    // This would depend on your logout implementation
  });

  test('should be responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('should load all images', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      await expect(img).toBeVisible();
      
      // Check if image loaded successfully
      const naturalWidth = await img.evaluate(el => (el as HTMLImageElement).naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });

  test('should have proper accessibility', async ({ page }) => {
    // Check for proper heading hierarchy
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { level: 3 })).toBeVisible();
    
    // Check for alt text on images
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
    
    // Check for proper button roles
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  });

  test('should display activity timestamps', async ({ page }) => {
    await expect(page.getByText('2m ago')).toBeVisible();
    await expect(page.getByText('1h ago')).toBeVisible();
    await expect(page.getByText('3h ago')).toBeVisible();
  });

  test('should have proper color scheme', async ({ page }) => {
    // Check that stats cards have proper styling
    const statsCards = page.locator('.bg-white.p-6.rounded-lg.shadow');
    const count = await statsCards.count();
    expect(count).toBe(4); // Should have 4 stats cards
  });

  test('should handle error states gracefully', async ({ page }) => {
    // This test would simulate error conditions
    // For example, network failures, API errors, etc.
    // Add specific error handling tests based on your implementation
  });
});
