export const validateJsonString = (jsonString: string) => {
  try {
    JSON.parse(jsonString);
    return true;
  } catch {
    return false;
  }
};

export const formatJsonString = (jsonString: string) => {
  try {
    return JSON.stringify(JSON.parse(jsonString), null, 2);
  } catch {
    return jsonString;
  }
};
