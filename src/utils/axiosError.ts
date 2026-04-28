import axios from "axios";

export const getAxiosErrorMessage = (
  error: unknown,
  defaultMessage = "Something went wrong"
) => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as {
      message?: string;
      error?: string;
    };

    return data?.message || data?.error || defaultMessage;
  }

  return defaultMessage;
};