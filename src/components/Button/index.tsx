import * as S from './styles'

interface ButtonProps {
  title: string;
  onClick: (param?: any) => void;
  size?: 'sm' | 'md' | 'lg'
}

const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  size = 'sm'
}) => {
  return (
    <S.StyledButton onClick={() => onClick()} buttonSize={size}>
      {title}
    </S.StyledButton>
  );
};

export default Button;
