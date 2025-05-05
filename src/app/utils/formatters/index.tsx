import { Gender } from "../api/users/types";

export const formatGender = (gender: Gender): string => {
  if (!gender) return "-";
  if (gender === "male") {
    return "Masculino";
  }
  if (gender === "female") {
    return "Femenino";
  }
  return gender;
};

export const formatBirthDate = (date: string): string => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return "-";
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};
