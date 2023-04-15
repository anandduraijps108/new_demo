import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import {
  TableCell,
  TableRow,
  Table,
  TableBody,
  TableHead,
  Card,
  IconButton,
  Button,
  InputLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalComponent from "../../Components/Modal";
import CustomInputFeild from "../../Components/CustomInputs";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successView, setSuccessView] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [inputValues, setInputValues] = useState({
    date: "",
    description: "",
    amount: "",
  });
  const [inputErrors, setInputErrors] = useState({
    date: "",
    description: "",
    amount: "",
  });

  const inputRef = useRef({});

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setInputValues({
      date: "",
      description: "",
      amount: "",
    });
    setSuccessView(false);
    setOpen(false);
    setEditStatus(false);
  };

  const handleChange = (e) => {
    setInputErrors("");
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const isNumber = (value) => {
    let pattern = /^\d+\.?\d*$/;
    return pattern.test(value);
  };

  const formValidation = () => {
    if (inputValues?.date === "") {
      inputRef.current.date.focus();
      setInputErrors({ ...inputErrors, date: "Enter the date." });
    } else if (inputValues?.description === "") {
      inputRef.current.description.focus();
      setInputErrors({ ...inputErrors, description: "Enter the description." });
    } else if (inputValues?.amount === "") {
      inputRef.current.amount.focus();
      setInputErrors({
        ...inputErrors,
        amount: "Enter the amount.",
      });
    } else if (!isNumber(inputValues?.amount)) {
      inputRef.current.amount.focus();
      setInputErrors({
        ...inputErrors,
        amount: "amount must be a number.",
      });
    }
  };

  const handleEditFormOpen = (id) => {
    setEditStatus(true);
    localStorage.setItem("id", id);
    const prevValues = paymentDetails.filter((el) => el.id === id);
    setInputValues({
      date: prevValues[0]?.date,
      description: prevValues[0]?.description,
      amount: prevValues[0]?.amount,
    });
    handleOpen();
  };

  const handleEdit = () => {
    const id = parseInt(localStorage.getItem("id"));
    setLoading(true);
    const data = {
      date: inputValues?.date,
      description: inputValues?.description,
      amount: inputValues?.amount,
    };
    axios
      .put(`http://localhost:3000/posts/${id}`, data)
      .then((res) => {
        setUpdateStatus(!updateStatus);
        setSuccessView(true);
        setLoading(false);
        setEditStatus(false);
        setInputValues({
          date: "",
          description: "",
          amount: "",
        });
        localStorage.removeItem("id");
      })
      .catch((err) => {
        setLoading(false);
        setEditStatus(false);
        localStorage.removeItem("id");
      });
  };

  const handleSave = () => {
    setLoading(true);
    const data = {
      date: inputValues?.date,
      description: inputValues?.description,
      amount: inputValues?.amount,
    };
    axios
      .post("http://localhost:3000/posts", data)
      .then((res) => {
        setUpdateStatus(!updateStatus);
        setSuccessView(true);
        setLoading(false);
        setInputValues({
          date: "",
          description: "",
          amount: "",
        });
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
      .then((res) => {
        setPaymentDetails(res.data);
      })
      .catch((err) => {
        console.log("res", err);
      });
  }, [updateStatus]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      inputValues?.date &&
      inputValues?.description &&
      inputValues?.amount &&
      isNumber(inputValues?.amount)
    ) {
      if (editStatus) {
        handleEdit();
      } else {
        handleSave();
      }
    } else {
      formValidation();
    }
  };

  const handleDelete = (id) => {
    setLoading(true);
    axios
      .delete(`http://localhost:3000/posts/${id}`)
      .then((res) => {
        setUpdateStatus(!updateStatus);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const successMessage = (
    <>
      <Button
        onClick={handleClose}
        style={{ width: "20px", marginLeft: "370px", color: "black" }}
      >
        X
      </Button>
      <div>
        <span style={{ color: "green", marginLeft: "80px" }}>
          New data's updated successfuly...
        </span>
      </div>
    </>
  );

  const accountDetails = (
    <div style={{ textAlign: "center", paddingTop: "20px" }}>
      <h2>{editStatus ? "Update details." : "Add details."}</h2>
      <form onSubmit={handleSubmit}>
        <InputLabel style={{ color: "black", marginRight: "250px" }}>
          Date:
        </InputLabel>
        <CustomInputFeild
          label="Date:"
          name="date"
          type="date"
          value={inputValues?.date}
          onChange={(e) => handleChange(e)}
          inputRef={(ref) => (inputRef.current.date = ref)}
          style={{ width: "284px" }}
        />
        <span style={{ color: "red", fontSize: "12px" }}>
          {inputErrors.date}
        </span>
        <br />
        <InputLabel style={{ color: "black", marginRight: "200px" }}>
          Description:
        </InputLabel>
        <CustomInputFeild
          label="Description:"
          name="description"
          type="text"
          value={inputValues?.description}
          onChange={(e) => handleChange(e)}
          inputRef={(ref) => (inputRef.current.description = ref)}
          style={{ width: "284px" }}
        />
        <span style={{ color: "red", fontSize: "12px" }}>
          {inputErrors.description}
        </span>
        <br />
        <InputLabel style={{ color: "black", marginRight: "210px" }}>
          amount:
        </InputLabel>
        <CustomInputFeild
          label="amount:"
          name="amount"
          type="text"
          value={inputValues?.amount}
          onChange={(e) => handleChange(e)}
          inputRef={(ref) => (inputRef.current.amount = ref)}
          style={{ width: "284px" }}
        />
        <span style={{ color: "red", fontSize: "12px" }}>
          {inputErrors.amount}
        </span>
        <br />
        <Button
          style={{ textTransform: "none" }}
          type="submit"
          disabled={loading}
          color="primary"
          variant="contained"
        >
          {loading ? "Loading..." : editStatus ? "Update" : "Submit"}
        </Button>
      </form>
    </div>
  );

  return (
    <div>
      <Card
        style={{
          width: "800px",
          textAlign: "center",
          marginTop: "50px",
          marginLeft: "90px",
        }}
      >
        <Table style={{ width: "800px", textAlign: "center" }}>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell colSpan={2} align="center">
                <IconButton
                  onClick={handleOpen}
                  style={{ backgroundColor: "green", width: 30, height: 30 }}
                >
                  <AddIcon style={{ color: "white" }} />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paymentDetails.map((el) => (
              <>
                <TableRow>
                  <TableCell>{el.id}</TableCell>
                  <TableCell>{el.date}</TableCell>
                  <TableCell>{el.description}</TableCell>
                  <TableCell>{el.amount}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEditFormOpen(el.id)}
                      style={{
                        backgroundColor: "white",
                        width: 30,
                        height: 30,
                      }}
                    >
                      <EditIcon style={{ color: "orange" }} />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleDelete(el.id)}
                      style={{
                        backgroundColor: "white",
                        width: 30,
                        height: 30,
                      }}
                    >
                      <DeleteIcon style={{ color: "red" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </Card>
      <ModalComponent
        open={open}
        handleClose={handleClose}
        value={successView ? successMessage : accountDetails}
      />
    </div>
  );
}
