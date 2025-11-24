import { Link, Outlet } from '@tanstack/react-router';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StorageIcon from '@mui/icons-material/Storage';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SettingsIcon from '@mui/icons-material/Settings';

export function SideDrawer() {
  console.log('SideDrawer is rendering'); // Debug log
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
            <MenuIcon />
          </label>
          <div className="px-4">Data Intensive System</div>
        </nav>
        {/* Page content here */}
        <div className="p-4">
          <h2>Content Area</h2>
          <Outlet />
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* Dashboard */}
            <li>
              <Link
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Dashboard"
                activeProps={{ className: 'active' }}
                activeOptions={{ exact: true }}
              >
                <DashboardIcon />
                <span className="is-drawer-close:hidden">Dashboard</span>
              </Link>
            </li>

            {/* Database Management */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Database"
              >
                <StorageIcon />
                <span className="is-drawer-close:hidden">Database</span>
              </button>
            </li>

            {/* Analytics */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Analytics"
              >
                <TrendingUpIcon />
                <span className="is-drawer-close:hidden">Analytics</span>
              </button>
            </li>

            {/* Settings */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                <SettingsIcon />
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}