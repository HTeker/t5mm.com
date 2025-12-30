const isProdLike = () =>
  process.env.NODE_ENV === "production" || process.env.NODE_ENV === "qa";

export default isProdLike;
