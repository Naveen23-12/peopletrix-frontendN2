export const getCurrentYear = () => {
  return new Date().getFullYear();
};

export const getWeekDayFromDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
  });
};

export const formatDateToInputValue = (date: string | Date) => {
  const formattedDate = new Date(date);

  const year = formattedDate.getFullYear();
  const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
  const day = String(formattedDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const formatDateReadable = (date: string | Date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatTime12Hour = (time: string) => {
  if (!time) return "";

  const [hours, minutes] = time.split(":");

  const date = new Date();
  date.setHours(Number(hours));
  date.setMinutes(Number(minutes));

  return date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatTimeRange = (startTime: string, endTime: string) => {
  if (!startTime || !endTime) return "";

  return `${formatTime12Hour(startTime)} - ${formatTime12Hour(endTime)}`;
};