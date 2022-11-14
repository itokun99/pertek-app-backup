/* eslint-disable @next/next/no-img-element */
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";

export interface ImageInputInterface {
  image?: string;
  imageName?: string;
  onChange: (p1: File | null, p2: string) => void;
  handleRemove: () => void;
}

const ImageInput: React.FC<ImageInputInterface> = ({
  image,
  onChange,
  handleRemove,
  imageName = "image.png",
}) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const reader = new FileReader();
    const file: File | null = event.target.files ? event.target.files[0] : null;

    reader.onloadend = () => {
      setTimeout(() => {
        if (reader.result) {
          onChange(file, reader.result as string);
        }
      }, 100);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      {!image ? (
        <Box
          component="div"
          sx={{
            p: 2,
            border: "1px dashed #ddd",
            borderRadius: 2,
            minHeight: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Box sx={{ diplay: "flex", justifyContent: "center", textAlign: "center" }}>
            <Typography>Click or drag file to this area to upload</Typography>
            <input
              type="file"
              style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }}
              onChange={handleImageChange}
            />
          </Box>
        </Box>
      ) : (
        <>
          <Image src={image} alt={imageName} width="100%" height="80%" layout="responsive" />
          <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={handleRemove} fullWidth>
            Delete
          </Button>
        </>
      )}
    </>
  );
};

export default ImageInput;
