import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Button, Empty, Input, message, Pagination, Popconfirm, Select } from 'antd'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { fetchImageList } from '@/store/module/image-server'
import { shallowEqual } from 'react-redux'
import { ImageListRecord } from '@/types/image-server'
import { deleteImageList } from '@/service/image-server'
import { Id } from '@reduxjs/toolkit/dist/tsHelpers'
import Delete from '@/components/common/button/delete-confirm'
import { rejects } from 'assert'

interface IProps {
  children?: ReactNode
}

const ImageManagement: FC<IProps> = memo(() => {
  // store
  const dispatch = useAppDispatch()
  const { imageList, total, size } = useAppSelector((state) => {
    return {
      imageList: state.imageServer.imageList.records,
      total: state.imageServer.imageList.total,
      size: state.imageServer.imageList.size
    }
  }, shallowEqual)
  // state
  const [imageType, setImageType] = useState('1')
  const [loadings, setLoadings] = useState<boolean[]>([])
  const [deleteManyloadings, setDeleteManyloadings] = useState<boolean[]>([])
  const [imageLoading, setImageLoading] = useState(false)
  const [refreshLoadings, setRefreshLoadings] = useState<boolean[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteImageArrList, setDeleteImageArrList] = useState<Pick<ImageListRecord, 'id' | 'imageUrl'>[]>([])
  // hooks
  const [messageApi, contextHolder] = message.useMessage()

  // handlers
  const changeImageType = (e: any) => {
    const value = e.target.value
    setImageType(value)
    setCurrentPage(1)
  }

  const searchImageClickHandler = async (index: number) => {
    if (!/^[0-9]*$/.test(imageType) || imageType === '0') {
      messageApi.open({
        type: 'warning',
        content: '图片类型必须为不等于 0 的数字！'
      })
      return
    }

    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings]
      newLoadings[index] = true
      return newLoadings
    })
    await dispatchImages(1)
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings]
      newLoadings[index] = false
      return newLoadings
    })
    setCurrentPage(1)
  }
  const paginationChangeHandler = async (page: number) => {
    setCurrentPage(page)
    await dispatchImages(page)
  }

  const deleteImageOneHandler = async (item: ImageListRecord) => {
    const res = await deleteImageList(item)
    await dispatchImages(currentPage)
  }
  const refreshImageArrList = async (index: number) => {
    setRefreshLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings]
      newLoadings[index] = true
      return newLoadings
    })
    await dispatchImages(currentPage)
    setRefreshLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings]
      newLoadings[index] = false
      return newLoadings
    })
  }
  const deleteImagetManyHandler = async (index: number) => {
    return new Promise((resolve, reject) => {
      if (deleteImageArrList.length <= 0) {
        messageApi.open({
          type: 'warning',
          content: '请先选择要删除的图片！'
        })
        reject()
      }
      setDeleteManyloadings((prevLoadings) => {
        const newLoadings = [...prevLoadings]
        newLoadings[index] = true
        return newLoadings
      })
      deleteImageArrList.forEach((item) => {
        deleteImageList(item)
      })
      setDeleteImageArrList([])
      setDeleteManyloadings((prevLoadings) => {
        const newLoadings = [...prevLoadings]
        newLoadings[index] = false
        return newLoadings
      })
      resolve('')
    })
      .then(() => {
        dispatchImages(currentPage)
      })
      .catch(() => {
        return
      })
  }
  const dispatchImages = async (page: number) => {
    setImageLoading(true)
    await dispatch(fetchImageList({ page, type: +imageType }))
    setImageLoading(false)
  }
  const imageClickHandler = (item: Pick<ImageListRecord, 'id' | 'imageUrl'>) => {
    let isIn = false
    let newList: Pick<ImageListRecord, 'id' | 'imageUrl'>[] = []
    deleteImageArrList.forEach((imageItem) => {
      if (imageItem.id === item.id) {
        isIn = true
        return
      }
    })
    if (isIn) {
      newList = deleteImageArrList.filter((imageItem) => imageItem.id !== item.id)
    } else {
      newList = [...deleteImageArrList, item]
    }
    setDeleteImageArrList(newList)
  }
  return (
    <div>
      {contextHolder}
      <div>
        <Input value={imageType} defaultValue="1" className="w-14" onChange={(e) => changeImageType(e)} />
        <span className="ml-4">号类型</span>
        <Button className="ml-4" type="primary" loading={loadings[0]} onClick={() => searchImageClickHandler(0)}>
          搜索图片
        </Button>
        <span className="ml-4">以选择 {deleteImageArrList.length} 个图片</span>
        <Popconfirm
          title={`确认批量删除?`}
          onConfirm={() => deleteImagetManyHandler(0)}
          okText="确认"
          cancelText="取消"
        >
          <Button className="ml-4" type="primary" loading={deleteManyloadings[0]}>
            删除以选图片
          </Button>
        </Popconfirm>
        <Button className="ml-4" onClick={() => setDeleteImageArrList([])}>
          重置选择图片
        </Button>
        <Button className="ml-4" loading={refreshLoadings[0]} onClick={() => refreshImageArrList(0)}>
          刷新
        </Button>
      </div>
      <div className="show-data-box relative mb-12 mt-8 flex !w-full flex-wrap items-center justify-center">
        {imageLoading && <div className="absolute left-0 top-0 z-10 h-full w-full bg-stone-950 opacity-50"></div>}
        {imageList.length ? (
          imageList.map((item) => {
            return (
              <div
                className={`image-list-item out group relative border-red-500 ${
                  deleteImageArrList.map((item) => item.id).includes(item.id) ? 'border-4' : ''
                }`}
                key={item.id}
                onClick={(e) => imageClickHandler(item)}
              >
                <img src={`http://45.92.158.200:8888/${item.imageUrl}`} alt="uploaded images" />
                {/* <img src="http://45.92.158.200:8888/group1/M00/00/0C/CgAAAmPUuA-AF8A4AAEahhKI0oc913.jpg" /> */}
                <Delete onConfirm={() => deleteImageOneHandler(item)} />
              </div>
            )
          })
        ) : (
          <Empty />
        )}
      </div>
      <Pagination
        current={currentPage}
        hideOnSinglePage
        defaultCurrent={1}
        onChange={paginationChangeHandler}
        pageSize={size}
        total={total}
        showSizeChanger={false}
        showQuickJumper={{ goButton: <button className="basic-button !py-0">确认</button> }}
        locale={{ jump_to: '跳到', page: '页' }}
      />
    </div>
  )
})

export default ImageManagement
