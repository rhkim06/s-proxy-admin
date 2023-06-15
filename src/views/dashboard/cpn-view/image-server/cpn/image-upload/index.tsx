import React, { ChangeEvent, memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Button, Empty, Input, message } from 'antd'
import Delete from '@/components/common/button/delete-confirm'
import { request } from 'https'
import appRequest from '@/request'
import axios from 'axios'

interface IProps {
  children?: ReactNode
}
const ImageUpload: FC<IProps> = memo(() => {
  // refs
  const formRef = useRef<HTMLFormElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  // states
  const [files, setFiles] = useState<Blob[]>([])
  const [filesForSubmit, setFilesForSubmit] = useState<Blob[]>([])
  const [isFirst, setIsFirst] = useState(true)
  const [imageType, setImageType] = useState('1')
  const [fileListUrl, setFileListUrl] = useState<string[]>([])
  const [loadings, setLoadings] = useState<boolean[]>([])
  // hooks
  const [messageApi, contextHolder] = message.useMessage()
  // effects
  useEffect(() => {
    if (isFirst) return
    if (files.length <= 0) {
      return
    } else {
      setFiles([
        ...files.filter((item, index) => {
          if (files.length === 1) {
            return false
          } else {
            return index !== 0
          }
        })
      ])
    }
  }, [fileListUrl])
  function read(files: Blob[]) {
    const fileReader = new FileReader()
    if (files.length <= 0) return
    const file = files[0]
    fileReader.readAsDataURL(file)
    fileReader.onload = function () {
      setFileListUrl([...fileListUrl, getObjectURL(file)])
    }
  }
  useEffect(() => {
    if (isFirst) return
    if (files.length > 0) {
      read(files)
    }
  }, [files])
  /*useEffect(() => {
    const iframeListener = (e: any) => {
      console.log(2)
    }
    iframeRef.current?.addEventListener('load', iframeListener)
    return () => {
      iframeRef.current?.removeEventListener('load', iframeListener)
    }
  })*/
  // refs
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFiles(Object.entries(e.target.files!).map((item) => item[1]))

    setFilesForSubmit(Object.entries(e.target.files!).map((item) => item[1]))
    setIsFirst(false)
  }

  function getObjectURL(file: any) {
    var url = ''
    // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
    if (window.URL != undefined) {
      // mozilla(firefox)
      url = window.URL.createObjectURL(file)
    } else if (window.webkitURL != undefined) {
      // webkit or chrome
      url = window.webkitURL.createObjectURL(file)
    }
    return url
  }
  const deleteImageOneHandler = async (url: string) => {
    setFileListUrl([...fileListUrl.filter((item) => item !== url)])
  }
  const formSubmitClickHandler = (index: number) => {
    if (!/^[0-9]*$/.test(imageType) || imageType === '0') {
      messageApi.open({
        type: 'warning',
        content: '图片类型必须为不等于 0 的数字！'
      })
      return
    }
    if (fileListUrl.length <= 0) {
      messageApi.open({
        type: 'warning',
        content: '请选择需要上传的图片！'
      })
      return
    }
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings]
      newLoadings[index] = true
      return newLoadings
    })
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings]
      newLoadings[index] = false
      return newLoadings
    })
  }
  const formResetClickHandler = () => {
    setFiles([])
    setFileListUrl([])
    setIsFirst(true)
    formRef.current?.reset()
  }
  const submitFormHandler = async () => {
    const data = new FormData(formRef.current!)
    filesForSubmit.forEach((item, index) => {
      data.append('file', item)
    })

    const res = await axios.request({
      method: 'POST',
      // headers: { 'content-type': 'application/x-www-form-urlencoded' },
      // headers: { 'content-type': 'multipart/form-data' },
      data,
      url: 'http://45.76.231.188:4001/image-server/upload'
    })
    console.log(data.get('file'))
  }
  return (
    <div>
      {contextHolder}
      <form
        ref={formRef}
        // action="http://45.76.231.188:4001/image-server/upload"
        action="http://45.92.158.200:8084/image/mutiUpload"
        method="post"
        encType="multipart/form-data"
        target="frameName"
        onSubmit={(e) => formSubmitClickHandler(0)}
      >
        <div className="">
          <span>以选择 {fileListUrl.length} 个图片</span>
          <label className="ml-4 inline-block cursor-pointer rounded-md bg-indigo-500 px-4 py-2 shadow-md hover:text-white hover:shadow-indigo-950">
            选择图片
            <input
              className="hidden"
              onChange={handleChange}
              type="file"
              name="multipartFile"
              accept="image/*"
              multiple={true}
            />
          </label>

          <Input
            onChange={(e) => setImageType(e.target.value)}
            value={imageType}
            className="ml-4 w-12"
            type="text"
            name="projectType"
          />
          <Button htmlType="submit" className="ml-4" loading={loadings[0]}>
            提交
          </Button>
          <Button className="ml-4" onClick={formResetClickHandler}>
            清空
          </Button>
          <Button className="ml-4" loading={loadings[0]} onClick={submitFormHandler}>
            另一个提交
          </Button>
        </div>
      </form>
      <div className="show-data-box relative mb-12 mt-8 flex !w-full flex-wrap items-center justify-center">
        {fileListUrl.length !== 0 ? (
          fileListUrl.map((item, index) => {
            return (
              <div
                key={index}
                className={`image-list-item out } group relative
                border-red-500`}
              >
                <img src={item} alt="wait to upload images" />
                {/* <img src="http://45.92.158.200:8888/group1/M00/00/0C/CgAAAmPUuA-AF8A4AAEahhKI0oc913.jpg" /> */}
                <Delete onConfirm={() => deleteImageOneHandler(item)} />
              </div>
            )
          })
        ) : (
          <Empty />
        )}
      </div>
      <iframe ref={iframeRef} width="500" height="500" className="" name="frameName"></iframe>
    </div>
  )
})

export default ImageUpload

ImageUpload.displayName = 'ImageUpload'
