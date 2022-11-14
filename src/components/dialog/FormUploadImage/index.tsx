import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

// additional
import Button from "@mui/material/Button";
import BaseDialogForm from "../BaseDialogForm";
import ImageInput from "@components/input/ImageInput";

interface IFormUploadImageProps {
  visible: boolean;
  Preview: {
    image: string;
    name: string | undefined;
  };
  loading: boolean;
  onClose: () => void;
  onSubmit: () => void;
  handleChangeImage: (p1: File | null, p2: string) => void;
  handleRemoveImage: () => void;
}

const FormUploadImage: React.FC<IFormUploadImageProps> = ({
  visible,
  onClose,
  handleChangeImage,
  handleRemoveImage,
  onSubmit,
  Preview,
  loading,
}) => {
  return (
    <BaseDialogForm
      visible={visible}
      title="Upload Image"
      onClose={onClose}
      action={
        <>
          <Button variant="outlined" color="error" onClick={onClose}>
            Cancel
          </Button>
          <LoadingButton
            color="primary"
            onClick={onSubmit}
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
          >
            Upload
          </LoadingButton>
        </>
      }
    >
      <ImageInput
        onChange={handleChangeImage}
        handleRemove={handleRemoveImage}
        image={Preview?.image}
        imageName={Preview?.name}
      />
    </BaseDialogForm>
  );
};

export default React.memo(FormUploadImage);
