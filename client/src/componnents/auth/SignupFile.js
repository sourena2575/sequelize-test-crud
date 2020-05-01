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
const SignupFile = () => {
  const [modal, setmodal] = useState(false);
  const [msg, setmsg] = useState(null);
  const handleSub = (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const password1 = e.target.elements.password1.value;
    if (password !== password1) {
      setmsg("رمز های وارد شده تطابق ندارند");
    } else {
      const body = { name, email, password };
      axios
        .post("http://localhost:4000/user/", body)
        .then((res) => {
          const email = res.data.email;
          localStorage.setItem("userEmail", email);
          setmodal(!modal);
          window.location = "/";
        })
        .catch((er) => {
          if (er.response.data.errors[0].message === "email must be unique") {
            setmsg("این ایمیل قبلا ثبت شده است");
          } else if (
            er.response.data.errors[0].message ===
            "Length Of Password must be atleast 6"
          ) {
            setmsg("رمز ورودی باید دست کم شش حرف یا عدد داشته باشد");
          } else {
            setmsg(er.response.data.errors[0].message);
          }
        });
    }
  };
  return (
    <div>
      <NavLink
        onClick={() => {
          setmsg(null);
          setmodal(!modal);
        }}
      >
        ثبت نام
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
              type="text"
              name="name"
              placeholder="نام"
              className="text-center"
              required
            />
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
            <Input
              type="password"
              name="password1"
              placeholder="تکرار رمز"
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

export default SignupFile;
