export const formatDateToDisplay = (isoDate: string): string => {
  if (!isoDate) return "";

  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  const weekDay = new Intl.DateTimeFormat("pt-BR", { weekday: "short" }).format(
    date
  );
  const formattedDate = date.toLocaleDateString("pt-BR");

  return `${
    weekDay.charAt(0).toUpperCase() + weekDay.slice(1)
  } ${formattedDate}`;
};
