import { LocalShipping } from '@mui/icons-material';
import * as S from './styles'
import Button from '../Button';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = () => {
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
          <Button title='New Register' onClick={() => console.log('/logs')}/>
        </S.NavContainer>
      </S.Row>
    </S.StyledHeader>
  );
};

export default Header;