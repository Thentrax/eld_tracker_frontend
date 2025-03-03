import { LocalShipping } from '@mui/icons-material';
import * as S from './styles'
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import RegisterModal from '../RegisterModal';
import { useModal } from '../../context/ModalContext/provider';

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = () => {
  const { isOpen, openModal, closeModal} = useModal();
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  const goToLogs = () => {
    navigate('/logs');
  };

  return (
    <S.StyledHeader>
      <S.Row>
        <S.TitleContainer onClick={goToHome}>
          <S.Icon><LocalShipping/></S.Icon>
          <S.Title>Trip Safer</S.Title>
        </S.TitleContainer>
        <S.NavContainer>
          <S.NavContent onClick={goToLogs}>
            Logs
          </S.NavContent>
          <Button title='New Register' onClick={openModal} size='md'/>
        </S.NavContainer>
      </S.Row>
      <RegisterModal onModalOpen={isOpen} onClose={closeModal}/>
    </S.StyledHeader>
  );
};

export default Header;