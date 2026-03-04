export const validateJsonString = (jsonString: string) => {
  try {
    JSON.parse(jsonString);
    return true;
  } catch {
    return false;
  }
};
