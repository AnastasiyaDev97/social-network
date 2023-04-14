import { conversionDate } from "utils/handles";

export const EMPTY_STRING = "";

export const PAGE_SIZE = 10;

export const FIRST_PAGE = 1;

export const initialUserAvatar =
  "http://pm1.narvii.com/7812/ed9961348bc94cd31227151dd9aa1f918c40cff5r1-869-968v2_uhq.jpg";

export const currentMonth = conversionDate(
  (new Date().getMonth() + 1).toString()
);
export const currentDay = conversionDate(new Date().getDate().toString());

export const currentDate = `${currentDay}.${currentMonth}.${new Date().getFullYear()}`;
