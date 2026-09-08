import { themes } from "@/constants/Themes";
import { DeleteOutline } from "@mui/icons-material";
import { Box, IconButton, styled, Typography } from "@mui/joy";
import Button from "@mui/joy/Button";
import SvgIcon from "@mui/joy/SvgIcon";
import { useRef, useState } from "react";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const FileItem = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  word-break: break-word;
`;

export default function FileUploadButton({
  value = [],
  accept = "*",
  multiple = false,
  onChange,
  children = "Upload file",
  sx
}) {
  const inputRef = useRef(null);
  const [files, setFiles] = useState(value || []);

  const handleChange = (e) => {
    const selectedFiles =
      multiple ? Array.from(e.target.files) : [e.target.files[0]];

    setFiles(selectedFiles);
    onChange?.(selectedFiles);
  };

  const handleRemoveFiles = (removeIndex) => {
    const updatedFiles = files?.filter((_, index) => index !== removeIndex);

    setFiles(updatedFiles);
    onChange?.(updatedFiles);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  return (
    <Box>
      <Button
        component="label"
        role={undefined}
        tabIndex={-1}
        variant="outlined"
        color="neutral"
        startDecorator={
          <SvgIcon sx={{ color: "inherit" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
          </SvgIcon>
        }
        sx={{
          border: `1px solid ${themes.tertiaryColor}`,
          color: themes.tertiaryColor,
          ...sx
        }}
      >
        {children}

        <VisuallyHiddenInput
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
        />
      </Button>
      {files.map((file, index) => (
        <FileItem key={index}>
          <Typography level="body-sm">{file.name}</Typography>
          <IconButton onClick={() => handleRemoveFiles(index)}>
            <DeleteOutline fontSize="10px" />
          </IconButton>
        </FileItem>
      ))}
    </Box>
  );
}
