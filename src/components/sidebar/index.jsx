import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  VStack,
  IconButton,
  useDisclosure,
  Stack,
  Heading,
  Text,
  Button,
  Icon,
} from "@chakra-ui/react";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import {
  AiOutlineHistory,
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
} from "react-icons/ai";
import { FaUserAlt, FaNewspaper } from "react-icons/fa";
import { MdBedroomParent, MdBedtime } from "react-icons/md";
import { X, AlignCenter } from "react-feather";
import NavItem from "./fragments/NavItem";
import { useDispatch, useSelector } from "react-redux";
import { handleCiutkan } from "../../utils/store/reducers/globalSlice";
import Logout from "./fragments/Logout";
import { getLocalStorage } from "../../utils/helper/localStorage";
import { LOCAL_STORAGE_USER } from "../../utils/constants";

export default function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const ciutkan = useSelector((state) => state.global.ciutkan);
  const dataUser = getLocalStorage(LOCAL_STORAGE_USER);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenWidth > 992) {
      dispatch(handleCiutkan(false));
    }
  }, [screenWidth]);

  return (
    <Box
      w={ciutkan ? { base: "full", md: "5rem" } : { base: "full", md: "15rem" }}
      h={{ base: "auto", md: "full" }}
      bgColor={"white"}
      px={{ base: 4, md: 0 }}
      py={2}
      zIndex={10}
      boxShadow={"2px 0px 20px 2px rgba(0, 0, 0, 0.1)"}
      position={"fixed"}
    >
      <Flex h={16} alignItems={"center"} flexDir={"column"}>
        <Flex
          justifyContent={{
            base: "flex-end",
            md: "space-between",
          }}
          w={"full"}
          my="auto"
          justifyItems={"center"}
          alignItems={"center"}
          mt={{ base: 4, md: 4 }}
          position={"relative"}
        >
          <Box display={{ base: "none", md: "block" }}></Box>
          <Heading
            mx={"auto"}
            color={"blue.400"}
            fontSize={"xl"}
            display={"block"}
            fontFamily={"Poppins"}
          >
            {ciutkan ? "SH" : "Sentolove Hotel"}
          </Heading>
          <IconButton
            size={"md"}
            p={2}
            my="auto"
            icon={isOpen ? <X /> : <AlignCenter />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            right={{ base: 6, md: 10 }}
            position={"absolute"}
          />
        </Flex>
        <VStack
          mt={{ base: 4, md: 4 }}
          alignItems={"center"}
          display={{ base: "none", md: "flex" }}
        >
          <Stack w={"full"}>
            <Box w={"full"}>
              {dataUser?.role === "admin" && (
                <>
                  <NavItem
                    link={"/dashboard/admin/"}
                    label={"Dashboard"}
                    icon={BsFillGrid1X2Fill}
                  />
                  <NavItem
                    link={"/dashboard/admin/kamar"}
                    label={"Kamar"}
                    icon={MdBedroomParent}
                  />
                  <NavItem
                    link={"/dashboard/admin/tipe-kamar"}
                    label={"Tipe Kamar"}
                    icon={MdBedtime}
                  />
                  <NavItem
                    link={"/dashboard/admin/User"}
                    label={"Pengguna"}
                    icon={FaUserAlt}
                  />
                </>
              )}
              {dataUser?.role === "resepsionis" && (
                <>
                  <NavItem
                    link={"/dashboard/resepsionis/"}
                    label={"Dashboard"}
                    icon={BsFillGrid1X2Fill}
                  />
                  <NavItem
                    link={"/dashboard/resepsionis/pemesanan"}
                    label={"Pemesanan"}
                    icon={FaNewspaper}
                  />
                </>
              )}
              {(dataUser?.role === undefined || dataUser?.role === "tamu") && (
                <>
                  <NavItem
                    link={"/dashboard/tamu/"}
                    label={"Dashboard"}
                    icon={BsFillGrid1X2Fill}
                  />
                  <NavItem
                    link={"/dashboard/tamu/kamar"}
                    label={"Kamar"}
                    icon={MdBedroomParent}
                  />
                  {dataUser?.role === "tamu" && (
                    <>
                      <NavItem
                        link={"/dashboard/tamu/histori-pemesanan"}
                        label={"Histori Pemesanan"}
                        icon={AiOutlineHistory}
                      />
                      <NavItem
                        link={"/dashboard/tamu/cek-pemesanan"}
                        label={"Cek Pemesanan"}
                        icon={FaNewspaper}
                      />
                    </>
                  )}
                </>
              )}
              <Logout />
              <Button
                transition="200ms"
                my={[1, 2, 3]}
                px={[2, 3, 6]}
                fontWeight={500}
                justifyContent={ciutkan ? "center" : "flex-start"}
                alignItems="center"
                w="full"
                _hover={{ color: "blue.500", borderColor: "transparent" }}
                color={"gray.500"}
                onClick={() => dispatch(handleCiutkan(!ciutkan))}
                bgColor={"transparent"}
                position={"absolute"}
                bottom={10}
                left={0}
              >
                <Icon
                  as={ciutkan ? AiOutlineDoubleRight : AiOutlineDoubleLeft}
                  w={{ base: 4, md: 3.5 }}
                  h={{ base: 4, md: 3.5 }}
                />
                {!ciutkan && (
                  <Text fontSize={"sm"} fontWeight={"normal"} ml={4}>
                    Tutup
                  </Text>
                )}
              </Button>
            </Box>
          </Stack>
        </VStack>
      </Flex>

      {/* Mobile */}
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={[4]}>
            {dataUser?.role === "admin" && (
              <>
                <NavItem
                  link={"/dashboard/admin/"}
                  label={"Dashboard"}
                  icon={BsFillGrid1X2Fill}
                />
                <NavItem
                  link={"/dashboard/admin/kamar"}
                  label={"Kamar"}
                  icon={MdBedroomParent}
                />
                <NavItem
                  link={"/dashboard/admin/tipe-kamar"}
                  label={"Tipe Kamar"}
                  icon={MdBedtime}
                />
                <NavItem
                  link={"/dashboard/admin/User"}
                  label={"Pengguna"}
                  icon={FaUserAlt}
                />
              </>
            )}
            {dataUser?.role === "resepsionis" && (
              <>
                <NavItem
                  link={"/dashboard/resepsionis/"}
                  label={"Dashboard"}
                  icon={BsFillGrid1X2Fill}
                />
                <NavItem
                  link={"/dashboard/resepsionis/pemesanan"}
                  label={"Pemesanan"}
                  icon={FaNewspaper}
                />
              </>
            )}
            {(dataUser?.role === undefined || dataUser?.role === "tamu") && (
              <>
                <NavItem
                  link={"/dashboard/tamu/"}
                  label={"Dashboard"}
                  icon={BsFillGrid1X2Fill}
                />
                <NavItem
                  link={"/dashboard/tamu/kamar"}
                  label={"Kamar"}
                  icon={MdBedroomParent}
                />
                {dataUser?.role === "tamu" && (
                  <>
                    <NavItem
                      link={"/dashboard/tamu/cek-pemesanan"}
                      label={"Cek Pemesanan"}
                      icon={FaNewspaper}
                    />
                    <NavItem
                      link={"/dashboard/tamu/histori-pemesanan"}
                      label={"Histori Pemesanan"}
                      icon={AiOutlineHistory}
                    />
                  </>
                )}
              </>
            )}
            <Logout />
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
