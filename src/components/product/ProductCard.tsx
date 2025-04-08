import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Badge from "react-bootstrap/Badge";
import { prodDir } from "../../appInfo";
import FormattedPrice from "../price/FormattedPrice";
import TimeAgo from "react-timeago";
import styles from "./ProductCard.module.scss";

interface Props {
  product: {
    id: number;
    title: string;
    image: string;
    price: number;
    createdAt: string;
  };
}

const ProductCard = ({ product }: Props) => {
  return (
    <Col>
      <Card /*border="info"*/ className="shadow-sm overflow-hidden">
        <Link className={styles["link-style"]} to={"/products/" + product.id}>
          <Card.Img
            variant="top"
            src={prodDir + product.image}
            className={styles["image-sizing"]}
            // className="ratio ratio-1x1"
          />
          <Card.Body className="p-2 pb-0">
            <Stack gap={1}>
              <Card.Title className={`text-dark text-truncate ${styles["card-title"]}`}>{product.title}</Card.Title>
              <Stack direction="horizontal" gap={1}>
                <Card.Text className={`my-auto text-info text-truncate ${styles["time-ago"]}`}>
                  <TimeAgo date={product.createdAt} />
                </Card.Text>
                <Badge className="ms-auto my-auto py-2 px-2 bg-white text-info fs-6">
                  {/* {
                    <FormattedPrice
                      price={product.price}
                      locale="en-US"
                      currency="USD"
                    />
                  } */}

                  {<FormattedPrice price={product.price} locale="bs-BA" currency="BAM" />}
                </Badge>
              </Stack>
            </Stack>
          </Card.Body>
        </Link>
      </Card>
    </Col>
  );
};

export default ProductCard;
