import React from "react";
import StarRatting from "react-star-ratings";

const StarRattingMenu = ({ clickedStar, numberOfStars }) => {
  return (
    <>
      <StarRatting
        changeRating={() => clickedStar(numberOfStars)}
        numberOfStars={numberOfStars}
        starDimension="20px"
        starSpacing="2px"
        starHoverColor="red"
        starEmptyColor="red"
      />
      <br />
    </>
  );
};

export default StarRattingMenu;
