import { themes } from "@/constants/Themes";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

export default function CommonDatePicker({
  value,
  onChange,
  label,
  placeholder,
  disabled,
  minDate,
  maxDate,
  shouldDisableDate,
  format = "YYYY-MM-DD",
  sx
}) {
  const handleChange = (newValue) => {
    if (!onChange) return;
    onChange(newValue);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value ? dayjs(value) : null}
        onChange={handleChange}
        disabled={disabled}
        minDate={minDate ? dayjs(minDate) : undefined}
        maxDate={maxDate ? dayjs(maxDate) : undefined}
        shouldDisableDate={shouldDisableDate}
        format={format}
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
          }
        }}
        sx={{ ...sx }}
      />
    </LocalizationProvider>
  );
}
