import { Typography } from 'antd'
import { Modal } from 'antd'
import React from 'react'

const ConfirmDelete = ({open, handleDelete,onCancel}) => {
  return (
    <Modal open={open} onOk={handleDelete} onCancel={onCancel}>
        <Typography.Title level={3}>Are you sure ?</Typography.Title>
        <Typography.Title level={4}>You will not be able to recover this record</Typography.Title>
    </Modal>
  )
}

export default ConfirmDelete