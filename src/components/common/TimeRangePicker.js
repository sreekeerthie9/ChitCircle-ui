import { MESSAGE_TYPE } from "@/constants/Common";
import { themes } from "@/constants/Themes";
import { useSnackbar } from "@/contexts/SnackbarProvider";
import { Box, Typography } from "@mui/joy";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useState } from "react";

export default function TimeRangePicker({
  value = [null, null],
  onChange,
  disabled
}) {
  const [error, setError] = useState("");
  const message = useSnackbar();
  const startTime = value?.[0] ?? null;
  const endTime = value?.[1] ?? null;

  const validate = (start, end) => {
    if (!start || !end) {
      setError("Both times are required");
      message("Both times are required", MESSAGE_TYPE.error);
      return false;
    }

    if (end.isBefore(start)) {
      setError("End time must be after start time");
      message("End time must be after start time", MESSAGE_TYPE.error);
      return false;
    }

    setError("");
    return true;
  };

  const handleStartChange = (newValue) => {
    validate(newValue, endTime);

    if (onChange) {
      onChange([newValue, endTime]);
    }
  };

  const handleEndChange = (newValue) => {
    validate(startTime, newValue);

    if (onChange) {
      onChange([startTime, newValue]);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" width={310} gap={2} alignItems="center">
        <TimePicker
          value={startTime}
          onChange={handleStartChange}
          disabled={disabled}
          timeSteps={{ minutes: 1 }}
          ampm={false}
          format="HH:mm"
          minutesStep={1}
          slotProps={{
            textField: {
              size: "small",
              sx: {
                "& .MuiPickersInputBase-root": {
                  height: themes.searchBarHeight,
                  borderRadius: "5px",
                  fontSize: themes.baseFontSize
                },
                "& .MuiPickersInputBase-root svg": {
                  fontSize: "18px"
                }
              },
              error: !!error
            },
            desktopPaper: {
              sx: {
                width: "150px",
                "& .MuiList-root": {
                  width: "40px",
                  p: "10px"
                },
                "& .MuiButtonBase-root": {
                  width: "35px",
                  fontSize: themes.baseFontSize,
                  height: "30px",
                  borderRadius: "5px"
                }
              }
            }
          }}
        />

        <Typography>-</Typography>

        <TimePicker
          value={endTime}
          onChange={handleEndChange}
          disabled={disabled}
          ampm={false}
          format="HH:mm"
          minutesStep={1}
          minTime={startTime || undefined}
          slotProps={{
            textField: {
              size: "small",
              sx: {
                "& .MuiPickersInputBase-root": {
                  height: themes.searchBarHeight,
                  borderRadius: "5px",
                  fontSize: themes.baseFontSize
                },
                "& .MuiPickersInputBase-root svg": {
                  fontSize: "18px"
                }
              },
              error: !!error
            },
            desktopPaper: {
              sx: {
                width: "150px",
                "& .MuiList-root": {
                  width: "40px",
                  p: "10px"
                },
                "& .MuiButtonBase-root": {
                  width: "35px",
                  fontSize: themes.baseFontSize,
                  height: "30px",
                  borderRadius: "5px"
                }
              }
            }
          }}
        />
      </Box>
    </LocalizationProvider>
  );
}
