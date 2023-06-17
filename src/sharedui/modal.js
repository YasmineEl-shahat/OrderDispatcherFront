import Modal from "react-modal";
const CustomModal = ({
  isModalOpen,
  handleCancelDelete,
  handleConfirmDelete,
  name,
}) => {
  const customStyles = {
    overlay: {
      backgroundColor: "transparent",
    },
    content: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "400px",
      height: "150px",
      margin: "0 auto",
      padding: "20px",
      borderRadius: "5px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    },
  };
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={handleCancelDelete}
      style={customStyles}
    >
      <h2>Are you sure you want to delete {name}?</h2>
      <div className="modal-btns">
        <button className="btn--cancel" onClick={handleCancelDelete}>
          Cancel
        </button>
        <button className="btn--confirm" onClick={handleConfirmDelete}>
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default CustomModal;
