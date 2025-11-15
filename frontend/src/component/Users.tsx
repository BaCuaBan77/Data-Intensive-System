import { useState, useMemo } from 'react';
import { Search, MoreVert } from '@mui/icons-material';

// Mock data based on the users table schema
const mockUsers = [
  { id: 1, email: 'alice.johnson@email.com', password: 'pass123', full_name: 'Alice Johnson', role: 'player', match_wins: 15, match_losses: 10, match_ties: 5, total_matches: 30, status: 'active', currency_balance: 1250.50, purchased_items: ['skin1', 'skin2'], rating: 1850.5 },
  { id: 2, email: 'bob.smith@email.com', password: 'pass456', full_name: 'Bob Smith', role: 'player', match_wins: 20, match_losses: 8, match_ties: 2, total_matches: 30, status: 'active', currency_balance: 2100.75, purchased_items: ['skin3'], rating: 1920.3 },
  { id: 3, email: 'charlie.brown@email.com', password: 'pass789', full_name: 'Charlie Brown', role: 'admin', match_wins: 12, match_losses: 15, match_ties: 3, total_matches: 30, status: 'active', currency_balance: 980.25, purchased_items: [], rating: 1750.8 },
  { id: 4, email: 'diana.prince@email.com', password: 'pass101', full_name: 'Diana Prince', role: 'player', match_wins: 18, match_losses: 9, match_ties: 3, total_matches: 30, status: 'active', currency_balance: 1650.00, purchased_items: ['skin4', 'skin5', 'skin6'], rating: 1880.2 },
  { id: 5, email: 'edward.norton@email.com', password: 'pass202', full_name: 'Edward Norton', role: 'player', match_wins: 10, match_losses: 18, match_ties: 2, total_matches: 30, status: 'inactive', currency_balance: 750.50, purchased_items: ['skin7'], rating: 1680.5 },
  { id: 6, email: 'fiona.apple@email.com', password: 'pass303', full_name: 'Fiona Apple', role: 'player', match_wins: 22, match_losses: 5, match_ties: 3, total_matches: 30, status: 'active', currency_balance: 2300.25, purchased_items: ['skin8', 'skin9'], rating: 1950.7 },
  { id: 7, email: 'george.washington@email.com', password: 'pass404', full_name: 'George Washington', role: 'player', match_wins: 14, match_losses: 12, match_ties: 4, total_matches: 30, status: 'active', currency_balance: 1100.75, purchased_items: [], rating: 1800.1 },
  { id: 8, email: 'hannah.montana@email.com', password: 'pass505', full_name: 'Hannah Montana', role: 'player', match_wins: 16, match_losses: 11, match_ties: 3, total_matches: 30, status: 'active', currency_balance: 1400.50, purchased_items: ['skin10'], rating: 1820.4 },
  { id: 9, email: 'isaac.newton@email.com', password: 'pass606', full_name: 'Isaac Newton', role: 'admin', match_wins: 19, match_losses: 8, match_ties: 3, total_matches: 30, status: 'active', currency_balance: 1950.00, purchased_items: ['skin11', 'skin12'], rating: 1900.6 },
  { id: 10, email: 'julia.roberts@email.com', password: 'pass707', full_name: 'Julia Roberts', role: 'player', match_wins: 11, match_losses: 16, match_ties: 3, total_matches: 30, status: 'active', currency_balance: 850.25, purchased_items: ['skin13'], rating: 1720.3 },
  { id: 11, email: 'kevin.hart@email.com', password: 'pass808', full_name: 'Kevin Hart', role: 'player', match_wins: 17, match_losses: 10, match_ties: 3, total_matches: 30, status: 'active', currency_balance: 1500.75, purchased_items: ['skin14', 'skin15'], rating: 1850.9 },
  { id: 12, email: 'lisa.simpson@email.com', password: 'pass909', full_name: 'Lisa Simpson', role: 'player', match_wins: 13, match_losses: 14, match_ties: 3, total_matches: 30, status: 'active', currency_balance: 1050.50, purchased_items: [], rating: 1780.2 },
  { id: 13, email: 'michael.jackson@email.com', password: 'pass010', full_name: 'Michael Jackson', role: 'player', match_wins: 21, match_losses: 6, match_ties: 3, total_matches: 30, status: 'active', currency_balance: 2200.25, purchased_items: ['skin16', 'skin17', 'skin18'], rating: 1930.5 },
  { id: 14, email: 'nancy.drew@email.com', password: 'pass111', full_name: 'Nancy Drew', role: 'player', match_wins: 9, match_losses: 19, match_ties: 2, total_matches: 30, status: 'inactive', currency_balance: 650.75, purchased_items: ['skin19'], rating: 1650.8 },
  { id: 15, email: 'oscar.wilde@email.com', password: 'pass212', full_name: 'Oscar Wilde', role: 'player', match_wins: 15, match_losses: 12, match_ties: 3, total_matches: 30, status: 'active', currency_balance: 1300.00, purchased_items: ['skin20'], rating: 1810.4 }
];

export function Users() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  // Filter users based on search term and filters
  const filteredUsers = useMemo(() => {
    return mockUsers.filter(user => {
      const matchesSearch = 
        user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toString().includes(searchTerm);
      
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      
      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [searchTerm, statusFilter, roleFilter]);

  const handleAdminAction = (action: string, userId: number, userName: string) => {
    // TODO: Implement API calls for admin actions
    console.log(`Performing ${action} on user ${userId} (${userName})`);
  };

  const getWinRate = (wins: number, totalMatches: number): string => {
    if (totalMatches === 0) return '0%';
    return `${Math.round((wins / totalMatches) * 100)}%`;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">User Management</h1>
        <p className="text-base-content/70">Manage and monitor user accounts</p>
      </div>

      {/* Filters and Search */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="form-control w-full lg:flex-1">
              <label className="label">
                <span className="label-text font-semibold">Search Users</span>
              </label>
              <div className="input-group flex">
                <input 
                  type="text" 
                  placeholder="Search by name, email, or ID..." 
                  className="input input-bordered w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="btn btn-square btn-ghost">
                  <Search className="w-5 h-5" />
                </span>
              </div>
            </div>

            {/* Status Filter */}
            <div className="form-control w-full lg:max-w-xs">
              <label className="label">
                <span className="label-text font-semibold">Status</span>
              </label>
              <select 
                className="select select-bordered w-full"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Role Filter */}
            <div className="form-control w-full lg:max-w-xs">
              <label className="label">
                <span className="label-text font-semibold">Role</span>
              </label>
              <select 
                className="select select-bordered w-full"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="player">Player</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="stats stats-horizontal shadow mb-6 w-full">
        <div className="stat">
          <div className="stat-title">Total Users</div>
          <div className="stat-value text-primary">{filteredUsers.length}</div>
          <div className="stat-desc">of {mockUsers.length} total</div>
        </div>
        
        <div className="stat">
          <div className="stat-title">Active Users</div>
          <div className="stat-value text-success">
            {filteredUsers.filter(u => u.status === 'active').length}
          </div>
          <div className="stat-desc">Currently online</div>
        </div>
        
        <div className="stat">
          <div className="stat-title">Admins</div>
          <div className="stat-value text-warning">
            {filteredUsers.filter(u => u.role === 'admin').length}
          </div>
          <div className="stat-desc">Admin accounts</div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Users</h2>
          
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Rating</th>
                  <th>Win Rate</th>
                  <th>Balance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id} className="hover">
                    <td className="font-mono text-sm">{user.id}</td>
                    <td>
                      <div>
                        <div className="font-bold">{user.full_name}</div>
                        <div className="text-sm text-base-content/70">{user.email}</div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${
                        user.role === 'admin' ? 'badge-warning' : 'badge-info'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${
                        user.status === 'active' ? 'badge-success' : 'badge-error'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="font-semibold">{user.rating.toFixed(1)}</td>
                    <td>
                      <div className="text-sm">
                        <div>{getWinRate(user.match_wins, user.total_matches)}</div>
                        <div className="text-xs text-base-content/60">
                          {user.match_wins}W / {user.match_losses}L / {user.match_ties}T
                        </div>
                      </div>
                    </td>
                    <td className="font-semibold text-success">
                      ${user.currency_balance.toFixed(2)}
                    </td>
                    <td>
                      {/* Admin Actions Dropdown */}
                      <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-sm btn-ghost btn-circle">
                          <MoreVert className="w-4 h-4" />
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                          <li>
                            <a onClick={() => handleAdminAction('view_profile', user.id, user.full_name)}>
                              View Profile
                            </a>
                          </li>
                          <li>
                            <a onClick={() => handleAdminAction('view_matches', user.id, user.full_name)}>
                              View Match History
                            </a>
                          </li>
                          <li>
                            <a onClick={() => handleAdminAction('adjust_balance', user.id, user.full_name)}>
                              Adjust Balance
                            </a>
                          </li>
                          <li>
                            <a onClick={() => handleAdminAction('reset_password', user.id, user.full_name)}>
                              Reset Password
                            </a>
                          </li>
                          {user.status === 'active' ? (
                            <li>
                              <a 
                                className="text-error"
                                onClick={() => handleAdminAction('suspend', user.id, user.full_name)}
                              >
                                Suspend User
                              </a>
                            </li>
                          ) : (
                            <li>
                              <a 
                                className="text-success"
                                onClick={() => handleAdminAction('activate', user.id, user.full_name)}
                              >
                                Activate User
                              </a>
                            </li>
                          )}
                          {user.role === 'player' && (
                            <li>
                              <a onClick={() => handleAdminAction('promote_admin', user.id, user.full_name)}>
                                Promote to Admin
                              </a>
                            </li>
                          )}
                          <div className="divider my-1"></div>
                          <li>
                            <a 
                              className="text-error"
                              onClick={() => handleAdminAction('delete', user.id, user.full_name)}
                            >
                              Delete User
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="text-center py-8">
                <div className="text-base-content/50 mb-2">No users found</div>
                <div className="text-sm text-base-content/40">
                  {searchTerm ? 'Try adjusting your search term or filters' : 'No users match the current filters'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
