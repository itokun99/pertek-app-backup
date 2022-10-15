import React, { useEffect, useState } from 'react'
import BaseTable from '../src/components/tables/BaseTable';
import ProtectedPage from '../src/template/ProtectedPage';


const jsonData = [
  {
    id: 1,
    name: 'Muhammad Irva',
    email: 'justirva@gmail.com',
  },
  {
    id: 2,
    name: 'Indrawan Lisanto',
    email: 'indrawan@gmail.com'
  },
  {
    id: 3,
    name: 'Prawito',
    email: 'prawito@gmail.com',
  }
]

const columns = [
  {
    title: 'Name',
    selector: 'name',
  },
  {
    title: 'Field 2',
    selector: 'email',
    render: (text: string, record: object) => <button onClick={() => console.info({ text: text, record: record })}>{text}</button>
  },
]

const Component = () => {

  const [selectedRow, onSelectedRow] = React.useState<object | null>(null)

  console.info(`ss:`, selectedRow)


  return (
    <ProtectedPage>
      <BaseTable
        columns={columns}
        field={jsonData}
        isRowSelection
        rowSelection={{
          selector: 'id',
          onSelected: (p) => onSelectedRow(p)
        }} />
    </ProtectedPage>
  )
}

export default Component