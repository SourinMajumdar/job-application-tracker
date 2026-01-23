export function getDaysDiff(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);

  return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
}

export function getStatusFromDate(dateStr) {
  const daysLeft = getDaysDiff(dateStr);

  if (daysLeft < 0) return "past";
  if (daysLeft <= 7) return "soon";
  return "upcoming";
}