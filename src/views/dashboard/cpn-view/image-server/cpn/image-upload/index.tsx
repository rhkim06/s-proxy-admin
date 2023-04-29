import React, {
  ChangeEvent,
  DetailedHTMLProps,
  HTMLAttributes,
  memo,
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState
} from 'react'
import type { FC, ReactNode } from 'react'
import { Button, Empty, Input, message, Modal, RefSelectProps, Upload, UploadFile } from 'antd'
import { RcFile, UploadProps } from 'antd/es/upload'
import { PlusOutlined } from '@ant-design/icons'
import Delete from '@/components/common/button/delete-confirm'

interface IProps {
  children?: ReactNode
}

const ImageUpload: FC<IProps> = memo(() => {
  // refs
  const formRef = useRef<HTMLFormElement>(null)
  // states
  const [files, setFiles] = useState<Blob[]>([])
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
    console.log(files, 'files')
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
  // refs
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader()
    setFiles(Object.entries(e.target.files!).map((item) => item[1]))
    setIsFirst(false)
    // for (let i = 0; i < files.length; i++) {
    //   const file = files[i]
    //   fileReader.readAsDataURL(file)
    //   fileReader.onload = function () {
    //     setFileListUrl([...fileListUrl, getObjectURL(file)])
    //   }
    // }
    // files.forEach(async (item) => {
    //   return await new Promise((resolve) => {
    //     fileReader.readAsDataURL(item)
    //     fileReader.onload = function () {
    //       setFileListUrl([...fileListUrl, getObjectURL(item)])
    //     }
    //     fileReader.onloadend = function () {
    //       resolve()
    //     }
    //   })
    // })
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
    return new Promise((resolve) => {
      formRef.current?.submit()
      resolve('')
    }).then((res) => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings]
        newLoadings[index] = false
        return newLoadings
      })
    })
  }
  const formResetClickHandler = () => {
    setFiles([])
    setFileListUrl([])
    setIsFirst(true)
    formRef.current?.reset()
  }
  return (
    <div>
      {contextHolder}
      <form
        ref={formRef}
        action="http://45.92.158.200:8084/image/mutiUpload"
        method="post"
        encType="multipart/form-data"
        target="frameName"
      >
        {/* <Upload {...props}>{fileList.length >= 8 ? null : uploadButton}</Upload> */}
        <div className="">
          <span>以选择 {fileListUrl.length} 个图片</span>
          <label className="ml-4 inline-block cursor-pointer rounded-md bg-indigo-500 px-4 py-2 shadow-md hover:text-white hover:shadow-indigo-950">
            选择图片
            <input
              className="hidden"
              onChange={(e) => handleChange(e)}
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

          <Button className="ml-4" loading={loadings[0]} onClick={() => formSubmitClickHandler(0)}>
            提交
          </Button>
          <Button className="ml-4" onClick={formResetClickHandler}>
            清空
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
      <iframe className="hidden" name="frameName"></iframe>
    </div>
  )
})

export default ImageUpload

ImageUpload.displayName = 'ImageUpload'
