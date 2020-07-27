import React, { Fragment, useState } from "react";
import { v4 as uuid } from "uuid";

import { Grid, Typography, Button } from "@material-ui/core";
import GiftForm from "./GiftForm";

const App = () => {
  const [currentGifts, setCurrentGifts] = useState([
    {
      id: uuid(),
      name: "PS5",
      recipient: "Mark",
    },
    {
      id: uuid(),
      name: "Dank shoes",
      recipient: "Megan",
    },
  ]);

  const handleReset = () => {
    setCurrentGifts([]);
  };

  const childClick = (newGift) => {
    console.log(newGift);
    setCurrentGifts([...currentGifts, newGift]);
  };

  const removeGift = (giftId) => {
    setCurrentGifts(currentGifts.filter((gift) => gift.id !== giftId));
  };

  return (
    <Fragment>
      <Typography id="test" variant="h5">
        Test
      </Typography>
      <Grid container>
        <Grid item>
          {currentGifts.map((gift) => (
            <Grid container key={gift.id}>
              <Typography
                id="gift"
                variant="body2"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0.5rem",
                }}
              >
                Gift: {gift.name} for {gift.recipient}
              </Typography>
              <Button
                id="removeGift"
                variant="outlined"
                color="secondary"
                onClick={() => removeGift(gift.id)}
              >
                {"  "}x
              </Button>
            </Grid>
          ))}
          <GiftForm
            currentGifts={currentGifts}
            setCurrentGifts={setCurrentGifts}
            handleChildClick={childClick}
          />
          <Button
            id="resetGifts"
            onClick={handleReset}
            color="default"
            variant="outlined"
            disabled={currentGifts.length > 0 ? false : true}
          >
            Reset
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default App;
