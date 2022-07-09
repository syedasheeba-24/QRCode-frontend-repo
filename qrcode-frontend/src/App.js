import { useState } from "react";
import "./App.css";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

function App() {
  const [shortURL, setShortURL] = useState("");
  const [testUrl, settestUrl] = useState("");

  var url = "";
  const handleURLChange = (event) => {
    event.preventDefault();
    url = event.target.value;
    axios.get("/barcodes/zxing/" + url).then((res) => {
      event.preventDefault();
      setShortURL(res.data);
      settestUrl(url);
    });
  };

  const handleValidation = (event) => {
    event.preventDefault();
    var validity = false;
    axios.get("/barcodes/validateUrl/" + testUrl).then((res) => {
      validity = res.data;
      if (validity) {
        alert("URL is valid");
        event.preventDefault();
      } else {
        alert("URL is invalid");
        event.preventDefault();
      }
    });
  };
  return (
    <div class="container mt-4">
      <p>HEYYY</p>
      <div class="row">
        <div class="col-md-8 pr-0 mpr-15">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>URL</Form.Label>
              <Form.Control
                placeholder="Enter the URL"
                onChange={handleURLChange}
              />
            </Form.Group>
            <Button
              className="submitButton"
              variant="primary"
              type="submit"
              onClick={handleValidation}
            >
              Validate URL
            </Button>
          </Form>
        </div>
        <div class="col-md-4">
          <img
            src={
              "https://api.qrserver.com/v1/create-qr-code/?data=" +
              testUrl +
              ";size=100x100"
            }
            alt="hey"
          ></img>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8 pr-0 mpr-15"></div>
        <div class="col-md-4">
          <a
            href={
              "https://api.qrserver.com/v1/create-qr-code/?data=" +
              testUrl +
              ";size=100x100"
            }
            download="QRCode"
          >
            <button type="button">Download</button>
          </a>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8 pr-0 mpr-15"></div>
        <div class="col-md-4">
          <a href={"https://" + testUrl} style={{ paddingTop: 40 }}>
            {shortURL}
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
