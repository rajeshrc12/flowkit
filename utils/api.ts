import axios from "axios";

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

type SheetRowObject = {
  [key: string]: string;
};

export const convertSheetData = (values: string[][]): SheetRowObject[] => {
  console.log(values);
  if (!values) return [];
  return values?.map((row) => {
    const obj: SheetRowObject = {};

    row?.forEach((cell, index) => {
      const colLetter = String.fromCharCode(65 + index); // 65 = 'A'
      obj[`col${colLetter}`] = cell;
    });

    return obj;
  });
};
