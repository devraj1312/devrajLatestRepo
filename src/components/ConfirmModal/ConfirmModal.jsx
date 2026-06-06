import "./ConfirmModal.scss";

const ConfirmModal = ({
  isOpen,
  message,
  onConfirm,
  onClose,
}) => {

  if (!isOpen) return null;

  return (
    <div className="confirm-overlay">

      <div className="confirm-modal">

        <h3>Confirm</h3>

        <p>{message}</p>

        <div className="confirm-actions">

          <button
            className="btn-no"
            onClick={onClose}
          >
            No
          </button>

          <button
            className="btn-yes"
            onClick={onConfirm}
          >
            Yes
          </button>

        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;