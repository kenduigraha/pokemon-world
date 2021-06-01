import styled from 'styled-components';
import { Col, Icon, Typography } from 'antd';

const { Text } = Typography;

const TextLinkDetailPage = styled(Text)`
  color: #00d451 !important;
`;

const CharactersCardCol = styled(Col)`
  margin-bottom: 30px;
  position: relative;
`;

const IconHeart = styled(Icon)`
  position: absolute;
  z-index: 10;
  right: 20px;
  top: 10px;
  cursor: pointer;
  font-size: 24px;
`;

export { TextLinkDetailPage, CharactersCardCol, IconHeart };
