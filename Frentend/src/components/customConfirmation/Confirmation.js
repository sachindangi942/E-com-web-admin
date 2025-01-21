import { Modal } from 'antd';

export const ConfirmationModal = ({ visible, onOk, onCancel, title, description }) => {
  return (
    <Modal
      title={title || "Confirm Action"}
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      okText="Yes, Delete"
      cancelText="Cancel"
    >
      
      <p>{description || "Are you sure you want to proceed?"}</p>
    </Modal>
  );
};
