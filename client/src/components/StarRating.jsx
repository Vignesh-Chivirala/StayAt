import { assets } from "../assets/assets";

const StarRating = ({ rating = 4, size = 18 }) => {
  const roundedRating = Math.round(rating * 2) / 2; // allows half stars

  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5`}>
      {Array(5).fill("").map((_, index) => {
        const starValue = index + 1;

        let starIcon = assets.starIconOutlined;
        if (roundedRating >= starValue) {
          starIcon = assets.starIconFilled;
        } else if (roundedRating + 0.5 === starValue) {
          starIcon = assets.starIconHalf; // <- requires half-star asset
        }

        return (
          <img
            key={index}
            src={starIcon}
            alt="star-icon"
            className="transition-transform duration-200"
            style={{ width: size, height: size }}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
