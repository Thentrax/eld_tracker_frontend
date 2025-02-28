import { LocalShipping } from '@mui/icons-material';
import * as S from './styles'
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import RegisterModal from '../RegisterModal';
import { useState } from 'react';

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  const goToLogs = () => {
    navigate('/logs');
  };

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  }

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
          <Button title='New Register' onClick={handleOpenModal} size='md'/>
        </S.NavContainer>
      </S.Row>
      <RegisterModal onModalOpen={openModal} onClose={handleCloseModal}/>
    </S.StyledHeader>
  );
};

export default Header;