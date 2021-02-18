import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

export default function Login() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      accessToken: {
        value: string
      },
      region: {
        value: string
      },
      locale: {
        value: string
      }
    };

    localStorage.setItem("accessToken", target.accessToken.value);
    localStorage.setItem("region", target.region.value);
    localStorage.setItem("locale", target.locale.value);

    window.location.reload();
  }

  return (
    <div className="body">
      <Container fluid>
        <Row>
          <Col lg="auto" md="auto" sm="auto" xl="auto" xs="auto">
            <h1 className="h3">Log in</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formAccessToken">
                <Form.Label>Access Token</Form.Label>
                <Form.Control type="text" name="accessToken" placeholder="Enter access token" />
              </Form.Group>
              <Form.Group controlId="formRegion">
                <Form.Label>Region</Form.Label>
                <Form.Control as="select" defaultValue="us" name="region">
                  <option value="us">North America</option>
                  <option value="eu">Europe</option>
                  <option value="kr">Korea</option>
                  <option value="tw">Taiwan</option>
                </Form.Control>
                <Form.Text className="text-muted">
                  The China region is not supported.
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formLocale">
                <Form.Label>Locale</Form.Label>
                <Form.Control as="select" defaultValue="en_US" name="locale">
                  <option value="en_US">English (United States)</option>
                  <option value="es_MX">Spanish (Mexico)</option>
                  <option value="pt_BR">Portuguese</option>
                  <option value="de_DE">German</option>
                  <option value="en_GB">English (Great Britain)</option>
                  <option value="es_ES">Spanish (Spain)</option>
                  <option value="fr_FR">French</option>
                  <option value="it_IT">Italian</option>
                  <option value="ru_RU">Russian</option>
                  <option value="ko_KR">Korean</option>
                  <option value="zh_TW">Chinese (Traditional)</option>
                  <option value="zh_CN">Chinese (Simplified)</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit">Log in</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
