import { createContext, } from 'react';
import { Log } from '../../Models/Log';

interface ModalContextProps {
  isOpen: boolean;
  selectedLog?: Log;
  openModal: (log: Log) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextProps | undefined>(undefined);