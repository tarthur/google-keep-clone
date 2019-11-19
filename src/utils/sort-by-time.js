const sortByTime = (a, b) => {
  if (a.time > b.time) return -1;
  if (a.time == b.time) return 0;
  if (a.time < b.time) return 1;
}

export default sortByTime;
