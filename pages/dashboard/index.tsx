import { TaskAltOutlined } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AlertContext } from "../../src/provider/AlertProvider";
import ProtectedPage from "../../src/template/ProtectedPage";
import { Property, SidebarContext } from "../../src/provider/SidebarProvider";
import { fetchData } from "../../src/lib/dataFetcher";

function Dashboard() {
  const theme = useTheme();
  const { isReady } = useRouter();
  const { setAlert } = useContext(AlertContext);
  const { activeProperty, setActiveProperty } = useContext(SidebarContext);

  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    if (isReady) {
      (async () => {
        const { error, data } = await fetchData("/api/dashboard");
        if (error) {
          setAlert({
            message: {
              severity: "error",
              content: error.message,
            },
          });
          return;
        }
        setProperties(data!.items);
      })();
    }
  }, [isReady, setAlert]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {properties.length > 0 &&
          properties.map((property, key) => {
            const isActive = activeProperty?.id === property.id;
            const gradient = theme.palette.gradients.primary;
            const contrastText = theme.palette.info.contrastText;
            const lightText = theme.palette.info.light;
            const primaryText = theme.palette.text.primary;
            const secondaryText = theme.palette.text.secondary;

            return (
              <Grid key={key} item md={4} sm={12}>
                <Card>
                  <CardActionArea
                    sx={{
                      backgroundImage: isActive ? gradient : "none",
                    }}
                    onClick={() => setActiveProperty(property)}
                  >
                    <Box p={3}>
                      <Stack direction="row">
                        <Box flex={1} justifyContent="space-between">
                          <Typography
                            variant="subtitle1"
                            color={isActive ? contrastText : undefined}
                          >
                            {property.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color={isActive ? contrastText : secondaryText}
                          >
                            {property.address}
                          </Typography>
                        </Box>
                        {isActive && (
                          <Box>
                            <TaskAltOutlined
                              sx={{
                                color: isActive ? lightText : contrastText,
                              }}
                            />
                          </Box>
                        )}
                      </Stack>
                      <Stack direction="row" gap={2} mt={2}>
                        <Stack>
                          <Typography
                            variant="h5"
                            color={isActive ? lightText : primaryText}
                          >
                            {property.total_unit}
                          </Typography>
                          <Typography
                            variant="body2"
                            color={isActive ? lightText : secondaryText}
                          >
                            Jumlah Unit
                          </Typography>
                        </Stack>
                        <Stack>
                          <Typography
                            variant="h5"
                            color={isActive ? lightText : primaryText}
                          >
                            {property.total_unit}
                          </Typography>
                          <Typography
                            variant="body2"
                            color={isActive ? lightText : secondaryText}
                          >
                            Jumlah{" "}
                            {property.type.match(/apartment|office*|mall/i)
                              ? "Tower"
                              : "Klaster"}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
}

Dashboard.getLayout = (page: any) => <ProtectedPage>{page}</ProtectedPage>;

export default Dashboard;
