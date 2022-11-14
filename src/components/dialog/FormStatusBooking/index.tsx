import React, { useCallback } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import {
  AccessTimeFilled,
  Cancel,
  CheckCircle,
  GppGood,
  PlayCircle,
  RemoveCircle,
} from "@mui/icons-material";

// additional
import Button from "@mui/material/Button";
import BaseDialogForm from "../BaseDialogForm";
import Step from "@mui/material/Step/Step";
import StepConnector from "@mui/material/StepConnector/StepConnector";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper/Stepper";
import StepButton from "@mui/material/StepButton/StepButton";
import StepLabel from "@mui/material/StepLabel/StepLabel";
import { IBooking } from "@types";
import { useTheme } from "@mui/material";

interface IForStatusBookingProps {
  visible: boolean;
  onClose: () => void;
  booking: IBooking | null;
  onUpdateState: (id: number, state: string) => void;
}

const FormStatusBooking: React.FC<IForStatusBookingProps> = ({
  visible,
  onClose,
  booking,
  onUpdateState,
}) => {
  const theme = useTheme();
  const shouldBeDisabled = useCallback(
    (state: string, booking?: IBooking): { isTrue: boolean; isPositive: boolean } => {
      let isTrue = true;
      const isPositive = ["Requested", "Ongoing", "Done", "Booked"].includes(booking?.status ?? "");

      if (booking?.status === "Ongoing" && state === "Done") {
        isTrue = false;
      }

      if (booking?.status === "Requested" && state !== "Requested") {
        isTrue = false;
      }

      if (booking?.status === "Booked" && state !== "Requested") {
        isTrue = false;
      }

      return { isTrue, isPositive };
    },
    []
  );
  return (
    <BaseDialogForm visible={visible} title="Update Status Booking" onClose={onClose}>
      <Stack sx={{ px: 2, py: 3, width: "100%" }} alignItems="start" justifyContent="start">
        <Stepper
          nonLinear
          activeStep={0}
          orientation="horizontal"
          alternativeLabel
          connector={<StepConnector />}
          sx={{ width: "100%" }}
        >
          {[
            { label: "Requested", icon: AccessTimeFilled },
            { label: "Booked", icon: GppGood },
            { label: "Ongoing", icon: PlayCircle },
            { label: "No Show", icon: RemoveCircle },
            { label: "Canceled", icon: Cancel },
            { label: "Done", icon: CheckCircle },
          ].map((state) => {
            const shouldDisabled = shouldBeDisabled(state.label, booking!);
            return (
              <Step
                key={state.label}
                style={{
                  color:
                    state.label === booking?.status
                      ? shouldDisabled.isPositive
                        ? theme.palette.success.main
                        : theme.palette.error.main
                      : shouldDisabled.isTrue
                      ? theme.palette.grey[400]
                      : theme.palette.success.light,
                }}
                active={booking?.status === state.label}
              >
                <StepButton
                  disableRipple
                  disabled={shouldDisabled.isTrue}
                  onClick={() => {
                    onUpdateState(booking!.id, state.label);
                    onClose?.();
                  }}
                >
                  <StepLabel StepIconComponent={state.icon}>{state.label}</StepLabel>
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
      </Stack>
    </BaseDialogForm>
  );
};

export default React.memo(FormStatusBooking);
