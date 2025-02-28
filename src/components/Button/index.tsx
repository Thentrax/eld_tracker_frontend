import * as S from './styles'

interface ButtonProps {
  title: string;
  onClick?: (param?: any) => void;
  size?: 'sm' | 'md' | 'lg'
  variant?: 'base' | 'transparent'
  htmlType?: "button" | "submit" | "reset" | undefined
}

const Button: React.FC<ButtonProps> = ({
  title,
  onClick = () => {},
  size = 'sm',
  variant = 'base',
  htmlType= 'button'
}) => {

  return (
    <S.StyledButton onClick={() => onClick()} buttonSize={size} variant={variant} htmlType={htmlType}>
      {title}
    </S.StyledButton>
  );
};

export default Button;
