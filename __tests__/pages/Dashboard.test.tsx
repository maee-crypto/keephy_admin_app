import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../../app/page';

// Mock localStorage
const mockGetItem = jest.fn();
Object.defineProperty(window, 'localStorage', {
  value: { getItem: mockGetItem },
  writable: true,
});

describe('Admin Dashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<Dashboard />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('displays welcome message', () => {
    render(<Dashboard />);
    expect(screen.getByText('Welcome to Keephy Admin Dashboard')).toBeInTheDocument();
  });

  it('renders all stats cards', () => {
    render(<Dashboard />);
    expect(screen.getByText('Total Submissions')).toBeInTheDocument();
    expect(screen.getByText('Average Rating')).toBeInTheDocument();
    expect(screen.getByText('Active Forms')).toBeInTheDocument();
    expect(screen.getByText('Total Users')).toBeInTheDocument();
  });

  it('displays correct stats values', () => {
    render(<Dashboard />);
    expect(screen.getByText('1,234')).toBeInTheDocument(); // Total Submissions
    expect(screen.getByText('4.2')).toBeInTheDocument(); // Average Rating
    expect(screen.getByText('12')).toBeInTheDocument(); // Active Forms
    expect(screen.getByText('89')).toBeInTheDocument(); // Total Users
  });

  it('renders recent activity section', () => {
    render(<Dashboard />);
    expect(screen.getByText('Recent Activity')).toBeInTheDocument();
  });

  it('displays activity items', () => {
    render(<Dashboard />);
    expect(screen.getByText(/New submission received from/)).toBeInTheDocument();
    expect(screen.getByText(/Form.*was updated/)).toBeInTheDocument();
    expect(screen.getByText(/New user.*registered/)).toBeInTheDocument();
  });

  it('shows activity timestamps', () => {
    render(<Dashboard />);
    expect(screen.getByText('2m ago')).toBeInTheDocument();
    expect(screen.getByText('1h ago')).toBeInTheDocument();
    expect(screen.getByText('3h ago')).toBeInTheDocument();
  });

  it('renders inline SVG icons', () => {
    const { container } = render(<Dashboard />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('has proper accessibility attributes', () => {
    render(<Dashboard />);
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading).toHaveTextContent('Dashboard');
  });

  it('has responsive grid layout', () => {
    render(<Dashboard />);
    const statsGrid = screen.getByText('Total Submissions').closest('.grid');
    expect(statsGrid).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4');
  });

  it('has proper color scheme', () => {
    render(<Dashboard />);
    const blueCard = screen.getByText('Total Submissions').closest('.bg-white');
    expect(blueCard).toHaveClass('bg-white', 'p-6', 'rounded-lg', 'shadow');
  });

  it('does not crash without localStorage token', () => {
    mockGetItem.mockReturnValue(null);
    render(<Dashboard />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
});
