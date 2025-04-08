import { FC } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { Stack } from "react-bootstrap";
import logoImage from "../../assets/images/logo-light.svg";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationPin } from "react-icons/fa6";
import { LiaFacebookF, LiaLinkedinIn } from "react-icons/lia";
import styles from "./Footer.module.scss";

const Footer: FC = () => {
  return (
    <footer className="bg-dark text-light mt-5">
      <Container>
        <Row className="pt-5 pb-5 g-1">
          <Col sm={12} lg={3}>
            <Stack>
              <h3 className="fs-6">
                <Image src={logoImage} alt="eStore logo" width="90px" className="opacity-75" />
              </h3>
            </Stack>
          </Col>
          <Col sm={12} lg={3}>
            <Stack>
              <h3 className={`text-uppercase fs-6 text-info mt-4 mt-lg-0 ${styles["wide-tracking"]}`}>Useful links</h3>
              <Stack direction="horizontal" gap={2} className="text-info">
                <p className="m-0">Products</p>
              </Stack>
            </Stack>
          </Col>
          <Col sm={12} lg={3}>
            <Stack>
              <h3 className={`text-uppercase fs-6 text-info mt-4 mt-lg-0 ${styles["wide-tracking"]}`}>Contact</h3>
              <Stack className="pt-1 gap-2">
                <Stack direction="horizontal" gap={2} className="text-info">
                  <FaPhoneAlt />
                  <p className="m-0">+1 (221) 456858</p>
                </Stack>
                <Stack direction="horizontal" gap={2} className="text-info">
                  <MdEmail />
                  <p className="m-0">info@estore.com</p>
                </Stack>
                <Stack direction="horizontal" gap={2} className="text-info">
                  <FaLocationPin />
                  <p className="m-0">Bosnia</p>
                </Stack>
              </Stack>
            </Stack>
          </Col>
          <Col sm={12} lg={3}>
            <Stack>
              <h3 className={`text-uppercase fs-6 text-info mt-4 mt-lg-0 ${styles["wide-tracking"]}`}>Follow Us</h3>
              <Stack className="pt-1">
                <Stack direction="horizontal" gap={2} className="text-info">
                  <LiaFacebookF className="fs-5 text-info" />
                  <LiaLinkedinIn className="fs-5 text-info" />
                </Stack>
              </Stack>
            </Stack>
          </Col>
        </Row>
      </Container>
      <div className="text-info text-center bg-black m-0 p-3">
        <p className="opacity-50">© 2024 eStore, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
