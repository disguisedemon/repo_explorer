import React from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import useStyles from "./CardContainer.styled";
import styled from "@emotion/styled";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  margin: 10px;
`;

const Cards = (props) => {
  const { cardData } = props;
  const classes = useStyles();
  return (
    <GridContainer>
      {cardData?.map((val) => {
        return (
          <Card
            className={classes.cardContainer}
            sx={{ height: 420, width: 420 }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="240px"
                image={val.owner.avatar_url}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {`Name: ${val.name}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {`Stars: ${val.stargazers_count}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {`Description: ${val.description}`}
                </Typography>
                <Typography
                  style={{ marginTop: 12 }}
                  variant="body2"
                  color="text.secondary"
                >
                  {`Language: ${val.language}`}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        );
      })}
    </GridContainer>
  );
};

export default Cards;
