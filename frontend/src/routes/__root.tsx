import { Link, createRootRoute, Outlet } from '@tanstack/react-router'
import { Shop, Dashboard, Storage, Analytics, Settings, ViewSidebarOutlined, Man } from '@mui/icons-material'

export const Route = createRootRoute({
    component: RootComponent,
    notFoundComponent: () => {
        return (
            <div>
                <p>This is the notFoundComponent configured on root route</p>
                <Link to="/">Start Over</Link>
            </div>
        )
    },
})

function RootComponent() {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            {/* Main content */}
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="navbar bg-base-300">

                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        <ViewSidebarOutlined className="my-1.5 inline-block size-4" />
                    </label>

                    <div className="flex-1">
                        <span className="text-lg font-bold">Data Intensive System</span>
                    </div>
                </div>

                {/* Page content */}
                <main className="flex-1 p-4">
                    <Outlet />
                </main>
            </div>

            {/* Sidebar */}
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
                            >
                                <Dashboard className="my-1.5 inline-block size-4" />
                                <span className="is-drawer-close:hidden">Dashboard</span>
                            </Link>
                        </li>

                        {/* Shop */}
                        <li>
                            <Link 
                                to="/shop" 
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right" 
                                data-tip="Shop"
                            >
                                <Shop className="my-1.5 inline-block size-4" />
                                <span className="is-drawer-close:hidden">Shop</span>
                            </Link>
                        </li>

                        {/* Analytics */}
                        <li>
                            <Link 
                                to="/analytics" 
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right" 
                                data-tip="Analytics"
                            >
                                <Analytics className="my-1.5 inline-block size-4" />
                                <span className="is-drawer-close:hidden">Analytics</span>
                            </Link>
                        </li>

                        {/* Users */}
                        <li>
                            <Link
                                to="/"
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                data-tip="Users"
                            >
                                <Man className="my-1.5 inline-block size-4" />
                                <span className="is-drawer-close:hidden">Users</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}