import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { UserTable } from '../components/UserTable';
import useUsersStore from '../store/userStore';
import type { UserData } from '../schemas/userSchema';
import useDebounce from '@/hooks/useDebounce';

/**
 * Users page component
 * Displays a list of users with filtering and pagination
 */
export function UsersPage() {
  const {
    users,
    pagination,
    filters,
    isLoading,
    error,
    fetchUsers,
    setFilters,
    deleteUser,
  } = useUsersStore();
  
  const [searchInput, setSearchInput] = useState(filters.search);
  const debouncedSearch = useDebounce(searchInput, 300);
  
  // Fetch users on mount and when debounced search changes
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  
  // Update search filter when debounced search changes
  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      setFilters({ search: debouncedSearch });
      // Reset to page 1 when search changes
      fetchUsers({ page: 1 });
    }
  }, [debouncedSearch, filters.search, setFilters, fetchUsers]);
  
  const handleRoleFilter = (role: string) => {
    setFilters({ role: role === 'all' ? '' : role });
    // Reset to page 1 when role filter changes
    fetchUsers({ page: 1 });
  };
  
  const handlePageChange = (page: number) => {
    fetchUsers({ page });
  };
  
  const handleEdit = (user: UserData) => {
    // Navigate to edit user page
    window.location.href = `/users/${user.id}/edit`;
  };
  
  const handleDelete = async (userId: string) => {
    try {
      await deleteUser(userId);
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Users</h1>
          <a
            href="/users/new"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Add User
          </a>
        </div>
        
        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}
        
        <div className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="search"
                  placeholder="Search users..."
                  className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-4 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
            </div>
            
            {/* Role filter */}
            <div className="w-full sm:w-48">
              <select
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                value={filters.role || 'all'}
                onChange={(e) => handleRoleFilter(e.target.value)}
              >
                <option value="all">All roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="guest">Guest</option>
              </select>
            </div>
          </div>
          
          {/* Users table */}
          <UserTable
            users={users}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          
          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {(pagination.currentPage - 1) * pagination.pageSize + 1}-
                {Math.min(
                  pagination.currentPage * pagination.pageSize,
                  pagination.totalItems
                )}{' '}
                of {pagination.totalItems} users
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="rounded-md border border-input p-2 disabled:opacity-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                  .filter(
                    (page) =>
                      page === 1 ||
                      page === pagination.totalPages ||
                      Math.abs(page - pagination.currentPage) <= 1
                  )
                  .map((page, index, array) => {
                    // Add ellipsis
                    const showEllipsisBefore =
                      index > 0 && page - array[index - 1] > 1;
                    const showEllipsisAfter =
                      index < array.length - 1 && array[index + 1] - page > 1;
                    
                    return (
                      <div key={page} className="flex items-center">
                        {showEllipsisBefore && (
                          <span className="px-2 text-muted-foreground">...</span>
                        )}
                        <button
                          onClick={() => handlePageChange(page)}
                          className={`h-8 w-8 rounded-md text-sm ${
                            pagination.currentPage === page
                              ? 'bg-primary text-primary-foreground'
                              : 'border border-input hover:bg-accent'
                          }`}
                        >
                          {page}
                        </button>
                        {showEllipsisAfter && (
                          <span className="px-2 text-muted-foreground">...</span>
                        )}
                      </div>
                    );
                  })}
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="rounded-md border border-input p-2 disabled:opacity-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default UsersPage;
