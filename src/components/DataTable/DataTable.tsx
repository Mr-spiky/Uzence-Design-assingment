import React, { useState, useMemo } from 'react';

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  render?: (value: any, record: T) => React.ReactNode;
}

export interface DataTableProps<T extends { id: string }> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: 'single' | 'multiple';
  onRowSelect?: (selectedRows: T[]) => void;
}

function DataTable<T extends { id: string }>({ 
  data, 
  columns, 
  loading = false, 
  selectable, 
  onRowSelect 
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{ key: keyof T | null; direction: 'ascending' | 'descending' }>({
    key: null,
    direction: 'ascending',
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState<Set<string>>(new Set());

  const requestSort = (key: keyof T) => {
    if (!columns.find(col => col.key === key)?.sortable) return;

    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const handleRowSelect = (row: T) => {
    const rowKey = row.id;
    const newSelectedKeys = new Set(selectedRowKeys);

    if (selectable === 'single') {
      newSelectedKeys.clear();
    }

    if (newSelectedKeys.has(rowKey)) {
      newSelectedKeys.delete(rowKey);
    } else {
      newSelectedKeys.add(rowKey);
    }

    setSelectedRowKeys(newSelectedKeys);
    const selectedRows = data.filter(row => newSelectedKeys.has(row.id));
    onRowSelect?.(selectedRows);
  };

  return (
    <div className="overflow-x-auto shadow rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {selectable && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Select</th>}
            {columns.map((column) => {
              const isSorted = sortConfig.key === column.dataIndex;
              const isSortable = column.sortable;
              return (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${isSortable ? 'cursor-pointer hover:bg-gray-100' : ''}`}
                  onClick={() => isSortable && requestSort(column.dataIndex)}
                >
                  <div className="flex items-center">
                    {column.title}
                    {isSorted && (
                      <span className="ml-1">
                        {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-6 py-4 text-center">
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              </td>
            </tr>
          ) : sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-6 py-4 text-center text-gray-500">
                No data available.
              </td>
            </tr>
          ) : (
            sortedData.map((row, index) => {
              const isSelected = selectedRowKeys.has(row.id);
              return (
                <tr
                  key={index}
                  className={`${isSelected ? 'bg-blue-50' : ''} ${selectable ? 'cursor-pointer hover:bg-gray-50' : ''}`}
                  onClick={() => selectable && handleRowSelect(row)}
                >
                  {selectable && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type={selectable === 'multiple' ? 'checkbox' : 'radio'}
                        checked={isSelected}
                        onChange={() => {}}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                  )}
                  {columns.map((column) => {
                    const value = row[column.dataIndex];
                    return (
                      <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {typeof column.render === 'function' ? column.render(value, row) : (value as React.ReactNode) ?? ''}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;