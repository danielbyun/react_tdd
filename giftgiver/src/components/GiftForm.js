import React, { useState, Fragment } from "react";
import { TextField, DialogActions, Button } from "@material-ui/core";
import { v4 as uuid } from "uuid";

const GiftForm = ({ currentGifts, handleChildClick }) => {
  const [canSubmit, setCanSubmit] = useState(false);
  const [newGift, setNewGift] = useState({
    name: "",
    recipient: "",
  });
  const [hasError, setHasError] = useState({
    message: [],
    status: [],
  });

  const isFormValid = (form) => {
    const { name, recipient } = form;

    let newError = {
      message: [],
      status: [],
    };

    let submitStatus = false;

    if (name === "") {
      newError.message.push("Name can't be empty");
      newError.status.push("nameError");
      submitStatus = false;
    }
    if (recipient === "") {
      newError.message.push("Recipient's name can't be empty");
      newError.status.push("recipientError");
      submitStatus = false;
    }
    if (name !== "" && recipient !== "") {
      newError = { message: [], status: [] };
      submitStatus = true;
    }

    setHasError(newError);
    setCanSubmit(submitStatus);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const giftToTest = {
      ...newGift,
      id: uuid(),
      [name]: value,
    };

    if (isFormValid(giftToTest)) {
      setCanSubmit(true);
    }

    setNewGift({
      ...newGift,
      id: uuid(),
      [name]: value,
    });
  };

  const handleAddGift = () => {
    isFormValid(newGift);

    if (canSubmit === false) {
    } else if (canSubmit === true) {
      setNewGift({
        ...newGift,
        name: "",
        recipient: "",
      });
      handleChildClick(newGift);
    }
  };

  return (
    <Fragment>
      <TextField
        inputProps={{
          "data-testid": "giftRecipient",
        }}
        id="giftRecipient"
        label="Gift Recipient Name"
        name="recipient"
        type="text"
        variant="outlined"
        onChange={handleChange}
        value={newGift.recipient}
        fullWidth
        error={
          hasError.status.length > 0 && hasError.status[1] === "recipientError"
        }
        helperText={
          hasError.status.map((status) => status === "recipientError") &&
          hasError.message[1]
        }
        htmlFor="Gift Recipient Name"
      />
      <TextField
        inputProps={{
          "data-testid": "giftName",
        }}
        label="Gift Name"
        id="giftName"
        name="name"
        type="text"
        variant="outlined"
        onChange={handleChange}
        value={newGift.name}
        fullWidth
        error={hasError.status.length > 0 && hasError.status[0] === "nameError"}
        helperText={
          hasError.status.map((status) => status === "nameError") &&
          hasError.message[0]
        }
        aria-labelledby="Gift Name"
      />
      <DialogActions>
        <Button
          id="addGift"
          onClick={handleAddGift}
          color="primary"
          variant="outlined"
        >
          Add gift
        </Button>
      </DialogActions>
    </Fragment>
  );
};

export default GiftForm;
