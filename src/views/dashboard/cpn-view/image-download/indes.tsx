import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Button, Select } from 'antd'

interface IProps {
  children?: ReactNode
}

const ImageDownload: FC<IProps> = memo(() => {
  const [imageCount, setImageCount] = useState(1)
  const options = []

  for (let i = 1; i <= 10; i++) {
    options.push({ value: i, lable: i.toString() })
  }
  // handlers
  const optionChangeHandler = (value: number) => {
    setImageCount(value)
  }
  return (
    <div className="flex flex-col items-center">
      <div className="show-data-box flex items-center ">
        <span className="mr-3 text-indigo-900">获取</span>
        <Select defaultValue={imageCount} style={{ width: 120 }} onChange={optionChangeHandler} options={options} />
        <span className="ml-3 mr-8 text-indigo-900">个图片</span>
        <Button className="flex-1">立即获取</Button>
      </div>
      <div className="show-data-box mt-12 w-fit"></div>
    </div>
  )
})

export default ImageDownload

ImageDownload.displayName = 'ImageDownload'
