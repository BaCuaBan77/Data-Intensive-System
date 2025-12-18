import { useState, useMemo, useEffect } from 'react';
import { Search, MoreVert, Block } from '@mui/icons-material';
import { useUsersQuery } from '../hooks/queries';
import { BanUserModal } from './BanUserModal';
import type { User } from '../api';

const ITEMS_PER_PAGE = 15;

export function Users() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Ban Modal State
  const [selectedUserToBan, setSelectedUserToBan] = useState<User | null>(null);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Create search parameters
  const searchParams = useMemo(() => {
    const params: { email?: string; status?: string; role?: string } = {};
    if (debouncedSearchTerm.trim()) {
      params.email = debouncedSearchTerm.trim();
    }
    if (statusFilter !== 'all') {
      params.status = statusFilter;
    }
    if (roleFilter !== 'all') {
      params.role = roleFilter;
    }
    return params;
  }, [debouncedSearchTerm, statusFilter, roleFilter]);

  // Fetch users
  const { data: users = [], isLoading, error } = useUsersQuery(searchParams);

  // Filter users (client-side for now as API returns filtered list)
  const filteredUsers = users;

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page on filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, roleFilter]);

  const handleAdminAction = (action: string, userId: number, userName: string | null) => {
    console.log(`Performing ${action} on user ${userId} (${userName || 'Unknown User'})`);
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

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <span className="loading loading-spinner loading-lg"></span>
          <span className="ml-4 text-lg">Loading users...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="alert alert-error mb-6">
          <span>Error loading users: {error.message}</span>
        </div>
      )}

      {/* Content */}
      {!isLoading && !error && (
        <>
          {/* Filters */}
          <div className="card bg-base-100 shadow-xl mb-6">
            <div className="card-body">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="form-control w-full lg:flex-1">
                  <label className="label">
                    <span className="label-text font-semibold">Search by Email</span>
                  </label>
                  <div className="input-group flex">
                    <input
                      type="email"
                      placeholder="Enter email to search..."
                      className="input input-bordered w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="btn btn-square btn-ghost">
                      <Search className="w-5 h-5" />
                    </span>
                  </div>
                </div>

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

          {/* Users Table */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body p-0">
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>User</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Matches</th>
                      <th>Win Rate</th>
                      <th>Balance</th>
                      <th>Rating</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedUsers.map(user => (
                      <tr key={user.id} className="hover">
                        <th className="font-mono">{user.id}</th>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle h-12 w-12 bg-primary/10 flex items-center justify-center">
                                <span className="text-primary font-bold text-lg">
                                  {(user.full_name || user.email).charAt(0).toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">{user.full_name || 'Unknown User'}</div>
                              <div className="text-sm opacity-50">ID: {user.id}</div>
                            </div>
                          </div>
                        </td>
                        <td><span className="font-mono text-sm">{user.email}</span></td>
                        <td>
                          <div className={`badge ${user.role === 'admin' ? 'badge-info' : 'badge-ghost'}`}>
                            {user.role}
                          </div>
                        </td>
                        <td>
                          <div className={`badge ${user.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                            {user.status}
                          </div>
                        </td>
                        <td>
                          <div className="text-center">
                            <div className="text-lg font-bold">{user.total_matches}</div>
                            <div className="text-xs opacity-60">
                              W:{user.match_wins} L:{user.match_losses} T:{user.match_ties}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="text-center font-semibold">
                            {getWinRate(user.match_wins, user.total_matches)}
                          </div>
                        </td>
                        <td className="font-mono">${user.currency_balance.toFixed(2)}</td>
                        <td className="font-semibold">{user.rating ? user.rating.toFixed(1) : 'N/A'}</td>
                        <td>
                          <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-sm btn-ghost btn-circle">
                              <MoreVert className="w-4 h-4" />
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                              <li>
                                <a onClick={() => setSelectedUserToBan(user)} className="text-error">
                                  <Block fontSize="small" />
                                  Ban Management
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
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4">
              <div className="join">
                <button
                  className="join-item btn"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  «
                </button>
                <button className="join-item btn">
                  Page {currentPage} of {totalPages}
                </button>
                <button
                  className="join-item btn"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  »
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Ban Modal */}
      {selectedUserToBan && (
        <BanUserModal
          user={selectedUserToBan}
          onClose={() => setSelectedUserToBan(null)}
        />
      )}
    </div>
  );
}