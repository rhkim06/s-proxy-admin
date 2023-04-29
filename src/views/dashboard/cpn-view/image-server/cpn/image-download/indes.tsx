import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Button, Select } from 'antd'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { fetchImageDownload } from '@/store/module/image-server'
import { shallowEqual } from 'react-redux'
import { fetchName } from '@/store/module/create-profile'
import Paragraph from 'antd/es/typography/Paragraph'

interface IProps {
  children?: ReactNode
}

const ImageDownload: FC<IProps> = memo(() => {
  // store
  const dispatch = useAppDispatch()

  const { imagesForDown, name } = useAppSelector((state) => {
    return {
      imagesForDown: state.imageServer.imagesForDown,
      name: state.createProfile.name
    }
  }, shallowEqual)
  // state
  const [imageCount, setImageCount] = useState(1)
  const [loadings, setLoadings] = useState<boolean[]>([])
  const [nameLoadings, setNameLoadings] = useState<boolean[]>([])
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
  const getNameBtnHandler = async (index: number) => {
    setNameLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings]
      newLoadings[index] = true
      return newLoadings
    })
    await dispatch(fetchName())
    setNameLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings]
      newLoadings[index] = false
      return newLoadings
    })
  }
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center">
        <div className="show-data-box flex items-center ">
          {/*<span className="mr-3 text-indigo-900">获取</span>
          <Select defaultValue={imageCount} style={{ width: 120 }} onChange={optionChangeHandler} options={options} />
  <span className="ml-3 mr-8 text-indigo-900">个图片</span>*/}
          <Button className="flex-1" type="primary" loading={loadings[0]} onClick={() => getImageBtnHandler(0)}>
            获取图片
          </Button>
        </div>
        <div className="show-data-box ml-12 flex items-center">
          <Paragraph copyable className="!mb-0 mr-4">
            {name}
          </Paragraph>
          <Button className="flex-1" type="primary" loading={nameLoadings[0]} onClick={() => getNameBtnHandler(0)}>
            获取姓名
          </Button>
        </div>
      </div>

      <div className="show-data-box mb-12 mt-8 flex w-fit flex-wrap">
        {imagesForDown.length > 0 &&
          imagesForDown.map((item, index) => {
            return (
              <div onClick={(e) => imageClickHandler(item)} key={index} className="image-list-item">
                <img className="block" src={item} />
              </div>
            )
          })}
        {imagesForDown.length <= 0 && (
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
