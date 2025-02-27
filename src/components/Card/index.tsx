import Button from '../Button';
import * as S from './styles'

interface CardProps {
  title: string;
  onClick: (param?: any) => void;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  onClick ,
  children,
}) => {
  return (
    <S.StyledCard>
      <S.Title>
        {title}
      </S.Title>
      <S.ChildrenContainer>
        {children}
        <Button title='Details' onClick={onClick}/>
      </S.ChildrenContainer>
    </S.StyledCard>
  );
};

export default Card;
