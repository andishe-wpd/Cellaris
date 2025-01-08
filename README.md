# Cellaris React Table

A flexible and type-safe React table component built with TypeScript.

## Installation


npm install cellaris-react-table


## Usage


import { Table } from 'cellaris-react-table';

const columns = [
  { accessor: 'name', header: 'Name' },
  { accessor: 'age', header: 'Age' },
];

const data = [
  { name: 'John', age: 25 },
  { name: 'Jane', age: 30 },
];

function App() {
  return <Table columns={columns} data={data} />;
}

