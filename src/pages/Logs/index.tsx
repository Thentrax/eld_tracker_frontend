import Card from "../../components/Card";
import Skeleton from "../../components/Skeleton";
import * as S from "./styles"

const Logs: React.FC = () => {
  return (
    <Skeleton>
      <S.Container>
          <S.Title>
            Logs
          </S.Title>
          <S.SubTitle>
            Here you can see your logs, if you want to create a new log, please click in the "New Register" button in the header
          </S.SubTitle>
          <S.Row>
          <Card title="Example Log" onClick={() => console.log('card')}>
            <div> 
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            </div>
          </Card>
          </S.Row>
      </S.Container>
    </Skeleton>
  );
};

export default Logs;