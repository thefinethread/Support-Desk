const Modal = ({ isOpen, toggleModal, children }) => {
  return isOpen ? (
    <div className="fixed left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-zinc-800/70 px-3">
      {children}
    </div>
  ) : null;
};

export default Modal;
