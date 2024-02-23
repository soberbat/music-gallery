export default (time: number | undefined) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${Math.floor(seconds)}`;
};
