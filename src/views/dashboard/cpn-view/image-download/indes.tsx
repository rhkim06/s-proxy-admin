import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Button, Select } from 'antd'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { fetchImageDownload } from '@/store/module/image-download'

interface IProps {
  children?: ReactNode
}

const ImageDownload: FC<IProps> = memo(() => {
  // store
  const dispatch = useAppDispatch()
  const { images } = useAppSelector((state) => {
    return {
      images: state.imageDownload.images
    }
  })
  // state
  const [imageCount, setImageCount] = useState(5)
  const [loadings, setLoadings] = useState<boolean[]>([])
  const options = []

  for (let i = 1; i <= 10; i++) {
    options.push({ value: i, lable: i.toString() })
  }
  // handlers
  const optionChangeHandler = (value: number) => {
    setImageCount(value)
  }
  const getImageBtnHandler = async (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings]
      newLoadings[index] = true
      return newLoadings
    })
    await dispatch(fetchImageDownload(imageCount))

    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings]
      newLoadings[index] = false
      return newLoadings
    })
  }
  const imageClickHandler = (url: string) => {
    const a = document.createElement('a')
    a.href = url
    a.target = '_blank'
    a.click()
  }
  return (
    <div className="flex flex-col items-center">
      <div className="show-data-box flex items-center ">
        <span className="mr-3 text-indigo-900">获取</span>
        <Select defaultValue={imageCount} style={{ width: 120 }} onChange={optionChangeHandler} options={options} />
        <span className="ml-3 mr-8 text-indigo-900">个图片</span>
        <Button className="flex-1" type="primary" loading={loadings[0]} onClick={() => getImageBtnHandler(0)}>
          立即获取
        </Button>
      </div>
      <div className="show-data-box mb-12 mt-8 flex w-fit flex-wrap">
        {images.length > 0 &&
          images.map((item, index) => {
            return (
              <div
                onClick={(e) => imageClickHandler(item)}
                key={index}
                className="relative mb-4 ml-4 cursor-pointer overflow-hidden rounded-md hover:shadow-md hover:shadow-stone-600"
              >
                <img className="block" width={200} src={item} />
              </div>
            )
          })}
        {images.length <= 0 && (
          <p className="text-stone-400">
            <span className="text-orange-500">提示：</span>请点击 &lt;立即获取&gt; 按钮！
          </p>
        )}
      </div>
    </div>
  )
})

export default ImageDownload

ImageDownload.displayName = 'ImageDownload'
