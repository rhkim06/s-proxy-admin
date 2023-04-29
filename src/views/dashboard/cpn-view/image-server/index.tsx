import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Tabs, TabsProps } from 'antd'
import ImageDownload from './cpn/image-download/indes'
import ImageManagement from './cpn/image-management'
import ImageUpload from './cpn/image-upload'

interface IProps {
  children?: ReactNode
}

const ImageServer: FC<IProps> = memo(() => {
  // tabs
  const items: TabsProps['items'] = [
    {
      key: 'image-download',
      label: '图片下载',
      children: <ImageDownload />
    },
    {
      key: 'image-upload',
      label: '图片上传',
      children: <ImageUpload />
    },
    {
      key: 'image-management',
      label: '图片管理',
      children: <ImageManagement />
    }
  ]
  // handlers
  const tabChangeHandler = () => {}
  return (
    <div className="w-1065">
      <Tabs defaultActiveKey="1" items={items} onChange={tabChangeHandler} />
    </div>
  )
})

export default ImageServer

ImageServer.displayName = 'ImageServer'
