import { SetStateAction } from 'react';
import * as S from '../../styles'
import { Description, Schedule } from '@mui/icons-material';

interface ModalDefaultTabProps {
  setTab: React.Dispatch<SetStateAction<"default" | "log" | "register">>
}

const ModalDefaultTab: React.FC<ModalDefaultTabProps> = ({
  setTab,
}) => {

  return (
    <S.OptionsContainer>
    <div>
      Select what do you want to register
    </div>
    <S.OptionsRow>
      <S.Option onClick={() => setTab('log')}>
        <S.OptionTitle>Log</S.OptionTitle>
        <S.OptionIcon>
          <Description sx={{ fontSize: 64 }}/>
        </S.OptionIcon>
        <S.OptionDescription>
          Create a log for the new workday.
        </S.OptionDescription>
      </S.Option>
      <S.Option onClick={() => setTab('register')}>
      <S.OptionTitle>Hour Register</S.OptionTitle>
      <S.OptionIcon>
          <Schedule sx={{ fontSize: 64 }}/>
        </S.OptionIcon>
      <S.OptionDescription>
          Register a new hour in you log.
        </S.OptionDescription>
      </S.Option>
    </S.OptionsRow>
    </S.OptionsContainer>
  );
};

export default ModalDefaultTab;
