import { LocalShipping } from '@mui/icons-material';
import * as S from './styles'
import Button from '../Button';

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = () => {

  return (
    <S.StyledHeader>
      <S.Row>
        <S.TitleContainer>
          <S.Icon><LocalShipping/></S.Icon>
          <S.Title>Trip Safer</S.Title>
        </S.TitleContainer>
        <S.NavContainer>
          <S.NavContent>
            Logs
          </S.NavContent>
          <Button title='New Log' onClick={() => console.log('/logs')}/>
        </S.NavContainer>
      </S.Row>
    </S.StyledHeader>
  );
};

export default Header;