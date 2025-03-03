import { ReactNode, useContext, useState } from "react";
import { ModalContext } from "./context";
import { Log } from "../../Models/Log";

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<Log | undefined>(undefined);

  const openModal = (log: Log) => {
    setSelectedLog(log);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedLog(undefined);
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isOpen, selectedLog, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
