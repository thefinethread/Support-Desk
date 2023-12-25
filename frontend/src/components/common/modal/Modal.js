const Modal = ({ isOpen, toggleModal, children }) => {
  return isOpen ? (
    <div className="fixed px-3 flex items-center justify-center left-0 top-0 w-full h-full z-20 bg-zinc-800/70">
      {children}
    </div>
  ) : null;
};

export default Modal;
