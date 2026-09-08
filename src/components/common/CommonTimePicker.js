import { themes } from "@/constants/Themes";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export default function CommonTimePicker({
  value,
  onChange,
  disabled,
  format = "HH:mm",
  ampm,
  sx
}) {
  const handleChange = (newValue) => {
    if (!onChange) return;
    onChange(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        value={value || null}
        onChange={handleChange}
        disabled={disabled}
        ampm={ampm}
        format={format}
        timeSteps={{ minutes: 1 }}
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
            }
          },
          desktopPaper: {
            sx: {
              width: "180px",
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
        sx={{ ...sx }}
      />
    </LocalizationProvider>
  );
}
