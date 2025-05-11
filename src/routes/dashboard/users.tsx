import { createRoute } from '@tanstack/react-router';
import { Route as DashboardRoute } from './route';
import { useState, useEffect } from 'react';
import { useApi } from '@/hooks/useApi';

export const Route = createRoute({
  getParentRoute: () => DashboardRoute,
  path: 'users',
  component: UsersPage,
});

// Define the DummyJSON user type
interface DummyJSONUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  image: string;
  gender: string;
  age: number;
  company: {
    name: string;
    department: string;
    title: string;
  };
}

interface DummyJSONUsersResponse {
  users: DummyJSONUser[];
  total: number;
  skip: number;
  limit: number;
}

function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<DummyJSONUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<DummyJSONUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use the useApi hook to fetch users from DummyJSON
  const { execute: fetchUsers } = useApi<DummyJSONUsersResponse>(
    'https://dummyjson.com/users',
    'GET'
  );

  // Fetch users on component mount
  useEffect(() => {
    const getUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetchUsers();
        setUsers(response.users);
        setFilteredUsers(response.users);
        setError(null);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    getUsers();
  }, [fetchUsers]);

  // Filter users when search term changes
  useEffect(() => {
    if (users.length > 0) {
      const filtered = users.filter(user => 
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);
  
  // Handle user deletion
  const handleDeleteUser = (userId: number) => {
    alert('Delete functionality is not implemented for the DummyJSON API');
    // In a real app, you would call an API endpoint to delete the user
    // and then update the local state
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full p-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={isLoading}
          />
        </div>
        
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600 mb-2"></div>
            <p className="text-gray-600">Loading users...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age/Gender</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={user.image} alt={`${user.firstName} ${user.lastName}`} />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-500">@{user.username}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-500">{user.age} / {user.gender}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-500">{user.company.title}</div>
                      <div className="text-xs text-gray-400">{user.company.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-2">View</button>
                      <button 
                        className="text-red-600 hover:text-red-900" 
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredUsers.length === 0 && !isLoading && (
              <div className="p-8 text-center">
                <p className="text-gray-500">No users found matching your search criteria.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
