import { useEffect, useState } from 'react';
import * as S from './styles'
import ModalDefaultTab from './Tabs/Default';
import ModalLogTab from './Tabs/Log';

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
        currentTab === 'register' ? 'New Register in Log' :
        'Register Modal'
        }
      </S.Title>

      {currentTab === 'default' && (
        <ModalDefaultTab setTab={setCurrentTab}/>
      )}

      {currentTab === 'log' && (
        <ModalLogTab isOpen={currentTab === 'log'} setTab={setCurrentTab} onClose={onClose}/>
      )}


    </S.StyledRegisterModal>
  );
};

export default RegisterModal;
