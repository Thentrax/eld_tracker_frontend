import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Skeleton from "../../components/Skeleton";
import * as S from "./styles"

const Home: React.FC = () => {
  const navigate = useNavigate();

  const goToLogs = () => {
    navigate('/logs')
  }

  return (
    <Skeleton>
      <S.Container>
        <S.Slogan>
          The Easiest way to save your Logs
        </S.Slogan>
        <Button title="Start saving now!" onClick={goToLogs} size="lg"/>
        <S.ImageRow>
          <S.Image src="/assets/orange-truck.png" alt="Orange Truck"/>
          <S.Image src="/assets/writing-in-paper.webp" alt="Writing in paper"/>
        </S.ImageRow>
      </S.Container>
    </Skeleton>
  );
};

export default Home;