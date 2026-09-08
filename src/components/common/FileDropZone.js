import { useSnackbar } from "@/contexts/SnackbarProvider";
import { Box, SvgIcon, Typography } from "@mui/joy";
import { useRef, useState } from "react";

export default function FileDropZone({
  acceptedType,
  displayText,
  handleFileChange,
  isExcelupload = false,
  hideCount = false,
  showCloud = true
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileCount, setFileCount] = useState(0);
  const fileInputRef = useRef(null);
  const showSnackbar = useSnackbar();

  const isValidFiles = (files) => {
    if (isExcelupload) {
      const file = files[0];
      if (!file) {
        return false;
      }
    }
    return true;
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const files = event.dataTransfer.files;
    if (!isValidFiles(files)) {
      return;
    }
    setFileCount(files.length);
    handleFileChange(files);
  };

  const handleInputChange = (event) => {
    const files = event.target.files;
    if (!isValidFiles(files)) {
      return;
    }
    setFileCount(files.length);
    handleFileChange(files);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Box
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      sx={{
        border: "2px dashed",
        borderColor: isDragging ? "primary.500" : "neutral.400",
        borderRadius: "md",
        p: 3,
        textAlign: "center",
        cursor: "pointer",
        bgcolor: isDragging ? "primary.softBg" : "background.surface",
        transition: "background-color 0.2s ease-in-out"
      }}
    >
      {showCloud && (
        <>
          <SvgIcon sx={{ color: "inherit", fontSize: "50px", opacity: 0.7 }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
          </SvgIcon>
        </>
      )}
      <Typography level="body-md" color="text.secondary">
        {isDragging ?
          "Drop files here..."
        : displayText || "Drag and drop files here, or click to select"}
      </Typography>

      <input
        type="file"
        multiple
        ref={fileInputRef}
        accept={acceptedType || "*.*"}
        onChange={handleInputChange}
        style={{ display: "none" }}
      />

      {!hideCount && fileCount > 0 && (
        <Box mt={2}>
          <Typography level="body-sm" color="success.plainColor">
            {fileCount} file{fileCount > 1 ? "s" : ""} selected
          </Typography>
        </Box>
      )}
    </Box>
  );
}
