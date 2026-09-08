import { themes } from "@/constants/Themes";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
  ReadOutlined,
  VideoCameraOutlined
} from "@ant-design/icons";
import {
  Autocomplete,
  Button,
  Checkbox,
  Input,
  Modal,
  ModalDialog,
  Radio,
  Select,
  Textarea
} from "@mui/joy";
import { Chip, Pagination, Slider, Switch } from "@mui/material";
import styled, { css } from "styled-components";

export const FormItemStyled = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  width: 100% !important;
  padding-right: 10px;

  .ant-form-item-label {
    flex: 0 0 48%;
    text-align: left;
    margin-right: 5px;
  }

  .ant-form-item-control {
    flex: 1;
    width: 100% !important;
  }

  .ant-row {
    width: 100% !important;
  }
`;

export const PlayListTypeStyled = styled.div`
  align-items: center;
  margin-bottom: 16px;
  width: 20% !important;
  padding-right: 10px;

  .ant-form-item-label {
    text-align: left;
    margin-right: 5px;
  }

  .ant-form-item-control {
    width: 100% !important;
  }

  .ant-row {
    width: 100% !important; /* Force full width */
  }
`;

export const AddBtn = styled.button`
  height: 32px;
  width: 32px;
  border-radius: 50%;
  font-size: 20px;
  font-weight: 300 !important;
  border: none;
  background-color: ${themes.tertiaryColor};
  color: ${themes.quinaryColor};
  cursor: pointer;
`;

export const StyledForm = styled.div`
  display: flex;
  gap: 5px;
  padding-right: 10px;
  flex-direction: column;
`;

export const StyledModalDialog = styled(ModalDialog)`
  &::-webkit-scrollbar {
    width: 4px !important;
    height: 8px !important;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #e0e0e0 !important;
    border-radius: 20px !important;
  }
  &::-webkit-scrollbar-track {
    background: white !important;
  }
`;

export const AddButton = styled(Button)`
  display: flex;
  gap: 6px;
  box-shadow: none !important;
  outline: none !important;
  height: ${themes.searchBarHeight} !important;
  padding: 0 1rem !important;
  font-size: ${themes.tableHeaderFontSize} !important;
  font-weight: 600 !important;
  font-family: "poppins" !important;
  min-width: 140px;
  background: linear-gradient(
    315deg,
    ${themes.primaryColor} 0%,
    ${themes.okHighlightColor}
  ) !important;
  color: ${themes.quinaryColor} !important;
  border: none !important;
  &:hover {
    border-radius: 25px !important;
  }
`;

export const StyledSlider = styled(Slider)(() => ({
  color: themes.primaryColor,

  "& .MuiSlider-track": {
    backgroundColor: themes.primaryColor,
    border: "none"
  },

  "& .MuiSlider-thumb": {
    backgroundColor: themes.tertiaryColor,
    border: `4px solid ${themes.tertiaryColor} !important`,
    boxShadow: "none !important",

    "&:hover, &.Mui-focusVisible, &.Mui-active": {
      boxShadow: "none !important"
    }
  }
}));

export const StyledSwitch = styled(Switch)(() => ({
  // backgroundColor: `${themes.inactivePaginationColor}`
  "& .MuiSwitch-track": {
    backgroundColor: `${themes.inactivePaginationColor}`
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: `${themes.tertiaryColor} !important`
  },
  "& .Mui-checked + .MuiSwitch-track": {
    backgroundColor: `${themes.darkPrimaryColor}`
  }
}));

export const StyledSelect = styled(Select)`
  width: 100% !important;
  font-size: ${themes.baseFontSize};
  box-shadow: none !important;
  border: 1px solid ${themes.tertiaryColor} !important;
  background-color: ${themes.backgroundColor} !important;
  color: ${themes.tertiaryColor} !important;
  & .MuiSelect-button {
    font-size: ${themes.baseFontSize};
    &::placeholder {
      opacity: 0.4;
    }
  }

  & .MuiSelect-endDecorator svg,
  & .MuiSelect-indicator svg {
    font-size: ${themes.baseFontSize};
  }
  &.Mui-disabled {
    background-color: ${themes.disabledColor} !important;
    color: ${themes.tertiaryColor} !important;
    cursor: not-allowed;
  }
  ${(props) =>
    props.editmode === "true"
    && css`
      width: 96% !important;
      margin-left: 15px !important;
    `}
`;

export const StyledCheckbox = styled(Checkbox)`
  align-items: flex-start;
  // & .MuiSvgIcon-root {
  //   font-size: ${themes.baseFontSize};
  // }
  & .MuiCheckbox-checkbox {
    border: 1px solid ${themes.tertiaryColor};
  }
  & .MuiCheckbox-label {
    line-height: 1.7;
    font-size: ${themes.baseFontSize};
  }
  & .Mui-checked {
    border: none;
  }
`;

export const StyledRadio = styled(Radio)(() => ({
  "& .MuiRadio-radio": {
    backgroundColor: themes.backgroundColor,
    border: `2px solid ${themes.tertiaryColor}`
  },
  "&.Mui-checked .MuiRadio-radio": {
    backgroundColor: themes.primaryColor,
    borderColor: themes.primaryColor
  }
}));

export const StyledInput = styled(Input)`
  font-size: 0.75rem !important; /* smaller font */
  border: 1px solid ${themes.tertiaryColor} !important;
  background-color: ${themes.backgroundColor} !important;
  box-shadow: none !important;
  color: ${themes.tertiaryColor} !important;

  & input {
    font-size: ${themes.baseFontSize}; /* ensure inner input is smaller */
  }

  & input::placeholder {
    opacity: 0.4;
    font-size: ${themes.baseFontSize};
  }

  &.MuiInput-sizeMd {
    min-height: 32px;
  }

  &.Mui-disabled {
    background-color: ${themes.disabledColor} !important;
    color: ${themes.tertiaryColor} !important;
    cursor: not-allowed;
  }
`;

export const StyledAutoComplete = styled(Autocomplete)`
  background-color: ${themes.backgroundColor} !important;
  font-size: ${themes.baseFontSize} !important;
  border: 1px solid ${themes.tertiaryColor} !important;
  & input::placeholder {
    opacity: 0.4;
  }
`;

export const StyledPagination = styled(Pagination)(() => ({
  "& .MuiPaginationItem-root": {
    border: `1px solid ${themes.addButtonBorderColor}`,
    backgroundColor: `${themes.addButtonBorderColor}`,
    color: `${themes.inactivePaginationColor}`,
    outline: "none"
  },

  "& .MuiPaginationItem-root.Mui-selected": {
    backgroundColor: `${themes.primaryColor}`,
    color: `${themes.quinaryColor}`,
    fontWeight: 500
  },

  "& .MuiPaginationItem-root:hover": {
    backgroundColor: `${themes.secondaryColor}`
  }
}));

export const StyledTextArea = styled(Textarea)`
  background-color: ${themes.backgroundColor} !important;
  font-size: ${themes.baseFontSize} !important;
  box-shadow: none !important;
  border: 1px solid ${themes.tertiaryColor} !important;
  color: ${themes.tertiaryColor} !important;
  & textarea::placeholder {
    opacity: 0.4;
  }

  &.Mui-disabled {
    background  -color: ${themes.disabledColor} !important;
    color: ${themes.tertiaryColor} !important;
    cursor: not-allowed !important;
  }
`;

export const Span = styled.span`
  font-size: ${themes.baseFontSize};
`;

export const SearchBar = styled(Input)`
  color: ${themes.tertiaryColor} !important;
  box-shadow: none !important;
  border: none !important;
  background-color: ${themes.backgroundColor} !important;
  border: 1px solid ${themes.primaryColor} !important;
  height: ${themes.searchBarHeight} !important;
  font-size: ${themes.tableHeaderFontSize} !important;
  background-color: ${themes.backgroundColor} !important;
  .ant-input {
    font-size: ${themes.tableHeaderFontSize} !important;
  }
`;

export const SelectFilter = styled(Select)`
  height: ${themes.searchBarHeight};
  box-shadow: none !important;
  & .MuiSelect-endDecorator svg {
    font-size: ${themes.baseFontSize};
  }
  & .MuiSelect-indicator svg {
    font-size: ${themes.baseFontSize};
  }
`;

export const CustomButton = styled(Button)`
  color: ${themes.quinaryColor} !important;
  font-weight: 600 !important;
  border: none !important;
  ${(props) =>
    !props.primary
    && css`
      background: linear-gradient(
        94deg,
        ${themes.cancelButtonColor} 0%,
        ${themes.cancelButtonHighlightColor} 100%
      ) !important;
      border: 1px solid ${themes.darkCancelColor} !important;
    `}
  ${(props) =>
    props.primary
    && css`
      background: linear-gradient(
        315deg,
        ${themes.primaryColor} 0%,
        ${themes.okHighlightColor} 100%
      ) !important;
      border: 1px solid ${themes.addButtonBorderColor} !important;
    `}
`;

export const StyledModalTitle = styled.span`
  font-size: ${themes.ModalTitleFontSize};
  color: ${themes.tertiaryColor};
`;

export const StyledModalFooter = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 10px !important;
`;
export const titleStyle = {
  color: `${themes.tertiaryColor}`,
  fontSize: `${themes.tableHeaderFontSize}`
};

export const DetailsPageForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const SearchContainer = styled.div`
  display: grid;
  grid-template-columns: ${(props) => `${props.$searchWidth || "450px"} 1fr`};
  align-items: center;
  gap: 16px;
`;
export const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
`;

export const EditOutlinedIcon = styled(EditOutlined)`
  color: ${themes.okHighlightColor};
  font-size: ${themes.ModalTitleFontSize};
  outline: none !important;
`;

export const DetailOutlinedIcon = styled(ReadOutlined)`
  color: ${themes.okHighlightColor};
  font-size: ${themes.ModalTitleFontSize};
`;

export const CheckIcon = styled(CheckCircleOutlined)`
  color: ${themes.okHighlightColor};
  font-size: ${themes.ModalTitleFontSize};
`;

export const VideoCameraOutlinedIcon = styled(VideoCameraOutlined)`
  color: ${themes.okHighlightColor};
  font-size: ${themes.ModalTitleFontSize};
`;

export const InfoCircleOutlinedIcon = styled(InfoCircleOutlined)`
  color: ${themes.okHighlightColor};
  font-size: ${themes.ModalTitleFontSize};
`;

export const SubmitLoadingOutlined = styled(LoadingOutlined)`
  color: ${themes.quinaryColor};
`;

export const DeleteOutlinedIcon = styled(DeleteOutlined)`
  color: ${themes.darkCancelColor};
  font-size: ${themes.ModalTitleFontSize};
  outline: none !important;
`;

export const ActionsContainer = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  height: 100%;
`;

export const SelectSpan = styled.span`
  font-size: 15px;
  background-color: ${themes.backgroundColor};
`;

export const StyledModal = styled(Modal)`
  .MuiModal-backdrop {
    backdrop-filter: blur(0px);
  }
`;

export const StyledTag = styled(Chip)(() => ({
  "& .MuiChip-label": {
    fontSize: themes.baseFontSize
  }
}));

// export const StyledTag = styled(Tag)`
//   padding: 3px 15px;
//   font-size: 15px;
//   margin: 0 5px 5px 0 !important;
//   background-color: #fffffd !important;
//   cursor: pointer;
//   &:hover {
//     background-color: #e1e3e4 !important;
//   }
//   /* color: rgba(30, 144, 255, 1) !important;
//   background: rgba(30, 144, 255, 0.06) !important;
//   box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1) !important;
//   backdrop-filter: blur(5px) !important;
//   -webkit-backdrop-filter: blur(5px) !important;
//   border: 1px solid rgba(30, 144, 255, 0.3) !important; */
// `;
