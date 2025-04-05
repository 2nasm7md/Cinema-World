import { useState } from "react";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
};

const starContainerStyle = {
  display: "flex",
  gap: "0",
};
const textStyle = {
  lineHeight: "1",
  margin: "0",
  color: "var(--color-text-dark)",
  fontSize: `${32 / 1.875}px`,
};
const starStyle = {
  width: `28px`,
  height: `28px`,
  display: "block",
  cursor: "pointer",
  fill: "transparent",
};

export default function RatingStars({ maxNum = 5, onSetRating }) {
  const [rate, setRate] = useState(0);
  const [clickedRate, setclickedRate] = useState(0);
  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxNum }, (_, i) => (
          <Stars
            rate={rate}
            onRating={setRate}
            num={i + 1}
            key={i}
            clickedRate={clickedRate}
            onAddClickedRate={setclickedRate}
            onSetRating={onSetRating}
          />
        ))}
      </div>
      <p style={textStyle}>{rate || ""}</p>
    </div>
  );
}

function Stars({
  rate,
  onRating,
  num,
  clickedRate,
  onAddClickedRate,
  onSetRating,
}) {
  return (
    <span
      style={starStyle}
      role="button"
      onClick={() => {
        onAddClickedRate(num);
        onRating(num);
        onSetRating(num);
      }}
      onMouseEnter={() => {
        onRating(num);
      }}
      onMouseLeave={() => {
        clickedRate ? onRating(clickedRate) : onRating("");
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        stroke="var(--color-primary)"
        fill={num <= rate ? "var(--color-primary)" : "transparent"}
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </span>
  );
}
