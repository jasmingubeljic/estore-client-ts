import { FC } from "react";
import Placeholder from "react-bootstrap/Placeholder";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import styles from "./ProductCard.module.scss";

const ProductCard: FC = () => {
  return (
    <Col>
      <Card /*border="info"*/ className="shadow-sm overflow-hidden">
        <Placeholder as={Card.Image} animation="glow" className={`${styles["image-sizing"]}`}>
          <Placeholder xs={12} className="h-100" />
        </Placeholder>
        <Card.Body className="p-2 pb-0">
          <Stack gap={1}>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={8} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow" className="mb-2">
              <Placeholder xs={{ span: 4 }} />
              <Placeholder xs={{ span: 4, offset: 4 }} />
            </Placeholder>
          </Stack>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductCard;
