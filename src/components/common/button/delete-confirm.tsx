import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Popconfirm } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

interface OnConfirm {
  (): () => {}
}
interface IProps {
  children?: ReactNode
  onConfirm: () => {}
  title?: string
  okText?: string
  cancelText?: string
}

const Delete: FC<IProps> = memo((props) => {
  const { children, onConfirm, title, okText, cancelText } = props
  return (
    <div>
      <Popconfirm title={title ?? '确认删除?'} onConfirm={onConfirm} okText="确认" cancelText="取消">
        <button
          className="group1 group/item absolute right-2 
   top-2 hidden h-8 w-8 items-center justify-center rounded-md bg-transparent hover:bg-stone-400/60 group-hover:flex"
        >
          <DeleteOutlined className="group-hover/item:text-white" />
        </button>
      </Popconfirm>
    </div>
  )
})

export default Delete

Delete.displayName = 'Delete'
