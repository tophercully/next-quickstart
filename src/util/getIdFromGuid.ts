export const getIdFromGuid = (guid: string): string => {
  const parts = guid.split("/");
  return parts[parts.length - 1];
};
