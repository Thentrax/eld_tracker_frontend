import { GitHub } from '@mui/icons-material';
import * as S from './styles'

interface FooterProps {
}

const Footer: React.FC<FooterProps> = () => {

  const openGitHubPage = () => {
    window.open('https://github.com/Thentrax?tab=repositories');
  }

  return (
    <S.StyledFooter>
      <S.Row>
        <S.Text>
          Developed by Thiago Cardoso
        </S.Text>
        <GitHub onClick={openGitHubPage}  style={{ cursor: 'pointer'}}/>
      </S.Row>
    </S.StyledFooter>
  );
};

export default Footer;