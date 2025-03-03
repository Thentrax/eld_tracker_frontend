import { Layout } from "antd";
import Header from "../Header";
import { Content } from "antd/es/layout/layout";
import * as S from './styles'
import Footer from "../Footer";

interface SkeletonProps {
  children: React.ReactNode;
}

const Skeleton: React.FC<SkeletonProps> = ({
  children,
}) => {
  return (
    <Layout>
      <Header />
      <Content style={{ height: '90vh'}}>
        <S.Container style={{ overflow: 'auto' }}>
          {children}
        </S.Container>
      </Content>
      <Footer />
    </Layout>
  );
};

export default Skeleton;
