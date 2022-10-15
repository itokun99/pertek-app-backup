import { TableProps } from '@mui/material/Table';
import React from 'react'

export type KeyTypeString = { [key: string]: string }

/**
 * base table columns type
 */
export type ColumnType = {
  title: string,
  selector: string
  render?: (text: string, record: object) => React.ReactNode,
  align?: 'inherit' | 'left' | 'right' | 'center' | 'justify',
  width?: number | string
}

export interface IBaseTableProperties extends TableProps {
  field: object[]
  columns: ColumnType[]
  loading?: boolean
  isRowSelection?: boolean
  rowSelection?: {
    /**
     * it should filled with unique row such as id
     */
    selector: string
    onSelected: (p: object) => void
  }
}

