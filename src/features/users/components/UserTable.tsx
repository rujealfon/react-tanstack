import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import type { UserData } from '../schemas/userSchema';
import useUsersStore from '../store/userStore';

interface UserTableProps {
  users: UserData[];
  isLoading?: boolean;
  onEdit?: (user: UserData) => void;
  onDelete?: (userId: string) => void;
}

/**
 * Component to display users in a table
 */
export function UserTable({ users, isLoading = false, onEdit, onDelete }: UserTableProps) {
  const { filters, setFilters } = useUsersStore();
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleSort = (column: string) => {
    if (filters.sort === column) {
      // Toggle order if already sorting by this column
      setFilters({ order: filters.order === 'asc' ? 'desc' : 'asc' });
    } else {
      // Set new sort column with default desc order
      setFilters({ sort: column, order: 'desc' });
    }
  };

  const getSortIcon = (column: string) => {
    if (filters.sort !== column) return null;
    
    return filters.order === 'asc' ? (
      <span className="ml-1">↑</span>
    ) : (
      <span className="ml-1">↓</span>
    );
  };

  const handleDeleteClick = (userId: string) => {
    setConfirmDelete(userId);
  };

  const handleConfirmDelete = (userId: string) => {
    onDelete?.(userId);
    setConfirmDelete(null);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading users...</p>
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
        <h3 className="mb-2 text-lg font-medium">No users found</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          {filters.search
            ? `No users matching "${filters.search}"`
            : "There are no users to display"}
        </p>
        <a
          href="/users/new"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Add User
        </a>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/50">
            <th
              className="cursor-pointer px-4 py-3 text-left text-sm font-medium"
              onClick={() => handleSort('name')}
            >
              Name {getSortIcon('name')}
            </th>
            <th
              className="cursor-pointer px-4 py-3 text-left text-sm font-medium"
              onClick={() => handleSort('email')}
            >
              Email {getSortIcon('email')}
            </th>
            <th
              className="cursor-pointer px-4 py-3 text-left text-sm font-medium"
              onClick={() => handleSort('role')}
            >
              Role {getSortIcon('role')}
            </th>
            <th
              className="cursor-pointer px-4 py-3 text-left text-sm font-medium"
              onClick={() => handleSort('createdAt')}
            >
              Created {getSortIcon('createdAt')}
            </th>
            <th className="px-4 py-3 text-right text-sm font-medium">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b bg-card transition-colors hover:bg-muted/50"
            >
              <td className="px-4 py-3 text-sm">
                <div className="flex items-center gap-3">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-medium uppercase text-primary">
                      {user.name.charAt(0)}
                    </div>
                  )}
                  <span>{user.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-sm">{user.email}</td>
              <td className="px-4 py-3 text-sm">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    user.role === 'admin'
                      ? 'bg-primary/10 text-primary'
                      : user.role === 'user'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {user.role}
                </span>
              </td>
              <td className="px-4 py-3 text-sm">
                {formatDate(user.createdAt)}
              </td>
              <td className="px-4 py-3 text-right text-sm">
                {confirmDelete === user.id ? (
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleConfirmDelete(user.id)}
                      className="rounded bg-destructive px-2 py-1 text-xs font-medium text-destructive-foreground"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={handleCancelDelete}
                      className="rounded bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit?.(user)}
                      className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary hover:bg-primary/20"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(user.id)}
                      className="rounded bg-destructive/10 px-2 py-1 text-xs font-medium text-destructive hover:bg-destructive/20"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
