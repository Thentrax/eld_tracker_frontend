import * as S from '../../../styles'

interface DetailInfoCardProps {
  title: string;
  value: string | number;
}

const DetailInfoCard: React.FC<DetailInfoCardProps> = ({
  title, value
}) => {
 return (
  <S.Col>
    <S.DetailInfoCard>
      <S.DetailInfoTitle>{title}</S.DetailInfoTitle>
      <S.DetailInfoValue>{value}</S.DetailInfoValue>
    </S.DetailInfoCard>
  </S.Col>
 )
}

export default DetailInfoCard;