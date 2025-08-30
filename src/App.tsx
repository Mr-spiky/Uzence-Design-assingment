import { useState } from 'react';
import InputField from './components/InputField';
import type { Column } from './components/DataTable';
import './App.css';
import DataTable from './components/DataTable';

// Define a type for our demo data
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

function App() {
  // State for InputField
  const [inputValue, setInputValue] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for DataTable
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  // Sample data for DataTable
  const usersData: User[] = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'Developer', status: 'Active' },
    { id: '3', name: 'Carol Williams', email: 'carol@example.com', role: 'Designer', status: 'Inactive' },
    { id: '4', name: 'David Brown', email: 'david@example.com', role: 'Manager', status: 'Active' },
    { id: '5', name: 'Eva Davis', email: 'eva@example.com', role: 'Developer', status: 'Inactive' },
  ];

  // Columns configuration for DataTable
  const columns: Column<User>[] = [
    { key: 'name', title: 'Full Name', dataIndex: 'name', sortable: true },
    { key: 'email', title: 'Email Address', dataIndex: 'email', sortable: true },
    { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
    { key: 'status', title: 'Status', dataIndex: 'status', sortable: true },
    {
  key: 'actions',
  title: 'Actions',
  dataIndex: 'status',
  render: (_, record) => ( // ← Use underscore for unused parameter
    <button 
      className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
      onClick={() => alert(`Editing ${record.name}`)}
    >
      Edit
    </button>
  )
}
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Component Demo</h1>
        <p className="text-gray-600">Showcasing InputField and DataTable Components</p>
      </header>

      <main className="max-w-6xl mx-auto space-y-12">
        {/* InputField Demo Section */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">InputField Components</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Basic Input */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">Basic Input</h3>
              <InputField
                label="Username"
                placeholder="Enter your username"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                helperText="This is a helper text"
              />
            </div>

            {/* Email with Error */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">Email with Validation</h3>
              <InputField
                label="Email Address"
                type="text"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                invalid={email.length > 0 && !email.includes('@')}
                errorMessage={email.length > 0 && !email.includes('@') ? "Please enter a valid email" : undefined}
              />
            </div>

            {/* Password Input */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">Password Field</h3>
              <InputField
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                helperText="Must be at least 8 characters"
              />
            </div>

            {/* Disabled Input */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">Disabled State</h3>
              <InputField
                label="Disabled Field"
                placeholder="This is disabled"
                value="Can't edit this"
                disabled
              />
            </div>

            {/* Loading State */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">Loading State</h3>
              <InputField
                label="Loading..."
                placeholder="Checking availability"
                isLoading
              />
            </div>
          </div>
        </section>

        {/* DataTable Demo Section */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">DataTable Component</h2>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700 mb-2">User Management</h3>
            <p className="text-gray-600">
              {selectedUsers.length > 0 
                ? `Selected ${selectedUsers.length} user(s): ${selectedUsers.map(u => u.name).join(', ')}`
                : 'No users selected'
              }
            </p>
          </div>

          <DataTable
            data={usersData}
            columns={columns}
            selectable="multiple"
            onRowSelect={setSelectedUsers}
          />

          {/* Additional demo with single selection */}
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Single Selection Table</h3>
            <DataTable
              data={usersData.slice(0, 3)} // Only first 3 users
              columns={columns.filter(col => col.key !== 'actions')} // Remove actions column
              selectable="single"
              onRowSelect={(selected) => console.log('Selected:', selected)}
            />
          </div>
        </section>

        {/* Usage Code Example */}
        <section className="bg-gray-800 rounded-lg shadow p-6 text-white">
          <h2 className="text-2xl font-semibold mb-4">Usage Example</h2>
          <pre className="bg-gray-900 p-4 rounded overflow-x-auto">
            <code className="text-sm">
{`// InputField Usage
<InputField
  label="Email"
  type="email"
  placeholder="Enter email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  invalid={!email.includes('@')}
  errorMessage="Invalid email format"
/>

// DataTable Usage
<DataTable
  data={usersData}
  columns={columns}
  selectable="multiple"
  onRowSelect={setSelectedUsers}
/>`}
            </code>
          </pre>
        </section>
      </main>
    </div>
  );
}

export default App;