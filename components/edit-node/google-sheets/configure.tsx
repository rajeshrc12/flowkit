import React from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Configure = ({ data, setData }: { data: any; setData: any }) => {
  const { data: sheets, isLoading } = useSWR(
    data.account ? `/api/google/sheets/${data.account}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
    }
  );

  return (
    <div className="flex flex-col text-sm gap-4">
      {/* Spreadsheet Select */}
      <div className="flex flex-col gap-2">
        <div>Spreadsheet</div>
        <Select
          value={data?.spreadsheet}
          onValueChange={(value) =>
            setData({
              ...data,
              spreadsheet: value,
              worksheet: "", // reset worksheet when spreadsheet changes
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select spreadsheet" />
          </SelectTrigger>
          <SelectContent>
            {isLoading && (
              <SelectItem value="__loading_spreadsheet" disabled>
                Loading...
              </SelectItem>
            )}
            {sheets &&
              !isLoading &&
              sheets?.map((sheet: any) => (
                <SelectItem key={sheet.id} value={sheet.id}>
                  {sheet.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      {/* Worksheet Select */}
      <div className="flex flex-col gap-2">
        <div>Worksheets</div>
        <Select
          value={data?.worksheet}
          onValueChange={(value) =>
            setData({
              ...data,
              worksheet: value,
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select worksheet" />
          </SelectTrigger>
          <SelectContent>
            {isLoading && (
              <SelectItem value="__loading_worksheet" disabled>
                Loading...
              </SelectItem>
            )}
            {data.spreadsheet &&
              !isLoading &&
              sheets
                ?.find((sheet: any) => sheet.id === data.spreadsheet)
                ?.sheets?.map((sheet: any) => (
                  <SelectItem key={sheet} value={sheet}>
                    {sheet}
                  </SelectItem>
                ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Configure;
