import { themes } from "@/constants/Themes";
import { Box, FormControl, FormHelperText, FormLabel } from "@mui/joy";
import { Controller } from "react-hook-form";

function FormItemStyled({
  label,
  name,
  required = false,
  errors,
  control,
  rules,
  render,
  sx,
  children,
  gap = 2,
  labelWidth = 230,
  layout = "flex",
  colon = true
}) {
  const error = errors?.[name];

  return (
    <FormControl sx={{ width: "100%", mb: 2, ...sx }}>
      <Box
        sx={
          layout === "grid" ?
            {
              display: "grid",
              gridTemplateColumns: `${labelWidth}px 1fr`,
              columnGap: gap,
              alignItems: "center"
            }
          : layout === "column" ?
            {
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 0.5,
              width: "100%"
            }
          : {
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 0.5
            }

        }
      >
        {label && (
          <FormLabel
            sx={{
              minWidth: layout === "flex" ? labelWidth : undefined,
              color: themes.darkTextColor,
              alignSelf: layout === "column" ? "flex-start" : "center"
            }}
          >
            {label}
            {(required || rules?.required) && (
              <span
                style={{
                  color: themes.darkCancelColor,
                  marginLeft: 2
                }}
              >
                *
              </span>
            )}
            {colon && ":"}
          </FormLabel>
        )}
        <Box sx={{ width: "100%", minHeight: themes.searchBarHeight }}>
          {control && render ?
            <Controller
              name={name}
              control={control}
              rules={rules}
              render={(fieldProps) => render(fieldProps)}
            />
          : children}

          {error && (
            <FormHelperText sx={{ color: themes.darkCancelColor, mt: 0.5 }}>
              {error.message}
            </FormHelperText>
          )}
        </Box>
      </Box>
    </FormControl>
  );
}

export default FormItemStyled;
