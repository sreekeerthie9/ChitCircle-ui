import { themes } from "@/constants/Themes";
import { MuiOtpInput } from "mui-one-time-password-input";

const OtpInput = ({ length = 6, value, onChange, ...props }) => {
  return (
    <MuiOtpInput
      {...props}
      length={length}
      value={value}
      onChange={onChange}
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: { xs: "6px", sm: "10px" },
        width: "100%",
        maxWidth: `${length * 54}px`,
        marginInline: "auto",

        "& .MuiOtpInput-TextField": {
          flex: 1
        },

        "& .MuiInputBase-root": {
          height: { xs: 40, sm: 48 },
          borderRadius: "6px",
          backgroundColor: "#fff",
          transition: "all 0.2s ease",
          border: `1px solid ${themes.tertiaryColor}`
        },

        "& input": {
          textAlign: "center",
          padding: 0,
          fontSize: { xs: "16px", sm: "18px" },
          fontWeight: 500,
          color: themes.tertiaryColor
        },

        "& fieldset": {
          borderColor: themes.lightgray
        },

        "& .Mui-focused fieldset": {
          borderColor: themes.primaryColor,
          borderWidth: "1.5px"
        },

        "& .MuiInputBase-root:hover fieldset": {
          borderColor: themes.primaryColor
        }
      }}
    />
  );
};

export default OtpInput;
