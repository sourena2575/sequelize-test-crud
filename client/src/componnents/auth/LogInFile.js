import React, { useState } from "react";
import {
  Modal,
  NavLink,
  Container,
  Input,
  Form,
  Alert,
  Button,
} from "reactstrap";
import axios from "axios";
const LoginFile = () => {
  const [modal, setmodal] = useState(false);
  const [msg, setmsg] = useState(null);
  const handleSub = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const body = { email, password };
    axios
      .post("http://localhost:4000/user/auth", body)
      .then((res) => {
        const email = res.data.email;
        localStorage.setItem("userEmail", email);
        setmodal(!modal);
        window.location = "/";
      })
      .catch((er) => {
        setmsg(er.response.data.msg);
      });
  };
  return (
    <div>
      <NavLink
        onClick={() => {
          setmsg(null);
          setmodal(!modal);
        }}
      >
        ورود
      </NavLink>
      <Modal isOpen={modal}>
        <p className=" text-muted mt-3 text-center">مشخصات خود را وارد کنید</p>
        <Container className="my-3">
          {msg && (
            <Alert color="danger" className="text-center">
              {msg}
            </Alert>
          )}
          <Form onSubmit={handleSub}>
            <Input
              type="email"
              name="email"
              placeholder="ایمیل"
              className="text-center my-4"
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="رمز"
              className="text-center mb-4"
              required
            />
            <Button
              type="submit"
              color="dark"
              className="btn btn-block w-50 mx-auto"
            >
              ورود
            </Button>
            <Input
              onClick={() => setmodal(!modal)}
              defaultValue=" انصراف"
              className="btn btn-block w-50 mx-auto btn-outline-danger my-3"
            />
          </Form>
        </Container>
      </Modal>
    </div>
  );
};

export default LoginFile;
