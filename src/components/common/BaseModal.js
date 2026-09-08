import { themes } from "@/constants/Themes";
import { Close } from "@mui/icons-material";
import { CircularProgress, DialogTitle } from "@mui/joy";
import styled from "styled-components";
import {
  CustomButton,
  StyledModal,
  StyledModalDialog,
  StyledModalFooter,
  StyledModalTitle
} from "../StyledElements";

const StyledModalSubtitle = styled.span`
  font-size: ${themes.tableHeaderFontSize};
  font-weight: 400;
`;

const BaseModal = ({
  open,
  title,
  subTitle,
  onClose,
  onOk,
  loading,
  children,
  okText = "Submit",
  cancelText = "Cancel",
  hideFooter = false,
  width = "min(740px, 90%)"
}) => {
  return (
    <StyledModal open={open} onClose={onClose}>
      <StyledModalDialog
        sx={{
          width,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: "8px",
            top: 0,
            zIndex: 1
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <StyledModalTitle>{title}</StyledModalTitle>
            {subTitle && <StyledModalSubtitle>{subTitle}</StyledModalSubtitle>}
          </div>
          <Close sx={{ cursor: "pointer" }} onClick={onClose} />
        </DialogTitle>
        <div style={{ overflowY: "auto" }}>{children}</div>

        {!hideFooter && (
          <StyledModalFooter
            style={{
              bottom: 0,
              zIndex: 1,
              paddingTop: "8px"
            }}
          >
            <CustomButton primary onClick={onOk} disabled={loading}>
              {loading ?
                <CircularProgress size="sm" />
              : okText}
            </CustomButton>
            <CustomButton onClick={onClose}>{cancelText}</CustomButton>
          </StyledModalFooter>
        )}
      </StyledModalDialog>
    </StyledModal>
  );
};

export default BaseModal;
