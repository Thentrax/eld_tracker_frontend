import * as S from './styles'

interface ButtonProps {
  title: string;
  onClick: (param?: any) => void;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
}) => {
  return (
    <S.StyledButton onClick={() => onClick()}>
      {title}
    </S.StyledButton>
  );
};

export default Button;
