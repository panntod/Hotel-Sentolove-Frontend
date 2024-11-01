import Sidebar from "../sidebar";
import { Navigate, Outlet } from "react-router-dom";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { userAuth } from "../../utils/helper/getAuth";

export default function AdminLayout() {
  const ciutkan = useSelector((state) => state.global.ciutkan);
  const { role } = userAuth();

  if (role !== "admin") {
    return <Navigate to={`dashboard/${role}`} />;
  }

  return (
    <Box w={"100vw"} maxW="100%" bgColor={"white"}>
      <Grid
        templateColumns={ciutkan ? { md: "5rem auto" } : { md: "15rem auto" }}
        minH={"100vh"}
        bgColor={"white"}
      >
        <GridItem position={"relative"}>
          <Sidebar />
        </GridItem>
        <GridItem>
          <Outlet />
        </GridItem>
      </Grid>
    </Box>
  );
}
