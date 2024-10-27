import { Center, Container, Grid, GridItem, Image } from "@chakra-ui/react";
import LoginForm from "./fragments/LoginForm";
import ImageLogin from "../../assets/hotel-image.png";

export default function index() {
  return (
    <Container maxW="80%" gridTemplateRows="repeat(2, 1fr)" py={14} p={0}>
      <Center>
        <Grid
          gap={{ base: "5", lg: "90" }}
          h="100vh"
          w="base: 100%"
          templateColumns={{ lg: "repeat(2, 1fr)" }}
          justifyContent="center"
        >
          <GridItem
            display={{ base: "none", lg: "block" }}
            margin={{ base: "5", lg: "auto 0" }}
          >
            <Center>
              <Image
                src={ImageLogin}
                height={600}
                width={1200}
                alt="image login"
              />
            </Center>
          </GridItem>
          <GridItem margin={{ base: "auto", lg: "auto 0" }}>
            <LoginForm />
          </GridItem>
        </Grid>
      </Center>
    </Container>
  );
}
