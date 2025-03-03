import { useEffect, useState } from 'react';
import * as S from './styles'
import ModalDefaultTab from './Tabs/Default';
import ModalLogTab from './Tabs/Log';
import ModalCycleHoursTab from './Tabs/CycleHours';

interface RegisterModalProps {
  onModalOpen: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
  onModalOpen,
  onClose
}) => {
  const [currentTab, setCurrentTab] = useState<'default' | 'log' | 'register'>('default');

  useEffect(() => {
    if(onModalOpen){
      setCurrentTab('default');
    }
  }, [onModalOpen]);  

  return (
    <S.StyledRegisterModal
      open={onModalOpen}
      onCancel={onClose}
      footer={false}
    >
      <S.Title>
        {currentTab === 'log' ? 'New Log' :
        currentTab === 'register' ? 'New Hour Register' :
        'Register Modal'
        }
      </S.Title>

      {currentTab === 'default' && (
        <ModalDefaultTab setTab={setCurrentTab}/>
      )}

      {currentTab === 'log' && (
        <ModalLogTab isOpen={currentTab === 'log'} onClose={onClose}/>
      )}

      {currentTab === 'register' && (
        <ModalCycleHoursTab isOpen={currentTab === 'register'} onClose={onClose}/>
      )}

    </S.StyledRegisterModal>
  );
};

export default RegisterModal;
