export const getApiErrorMessage = (error, fallback = "Something went wrong. Please try again.") => {
  const data = error?.response?.data;

  if (!data) {
    return fallback;
  }

  if (typeof data === "string") {
    return data;
  }

  if (typeof data.message === "string") {
    return data.message;
  }

  if (typeof data.error === "string") {
    return data.error;
  }

  const normalized = Object.entries(data)
    .map(([field, msg]) => {
      if (Array.isArray(msg)) {
        return `${field}: ${msg.join(", ")}`;
      }
      return `${field}: ${msg}`;
    })
    .join(" | ");

  return normalized || fallback;
};
