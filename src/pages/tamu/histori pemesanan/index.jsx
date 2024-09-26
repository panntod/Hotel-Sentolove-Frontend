import React, { useState, useEffect } from "react";
import { Box, Progress } from "@chakra-ui/react";
import Heading from "../../../components/text/Heading";
import Container from "../../../components/container/Container";
import Table from "../../../components/table";
import { columns } from "./fragments/dataTable";
import {
  pemesananSelector,
  getAllDataPemesananByIdUser,
} from "../../../utils/store/reducers/pemesananSlice";
import { useSelector, useDispatch } from "react-redux";
import { getLocalStorage } from "../../../utils/helper/localStorage.js";
import { LOCAL_STORAGE_USER } from "../../../utils/constants";

export default function index() {
  const dispatch = useDispatch();
  const user = getLocalStorage(LOCAL_STORAGE_USER);
  const dataPemesanan = useSelector(pemesananSelector.selectAll);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    await dispatch(getAllDataPemesananByIdUser(user.id_user));
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [dispatch]);

  return (
    <Container>
      <Heading text="Histori Pemesanan" />
      <Box my={10} maxW={"100%"}>
        {loading ? (
          <Progress size="xs" isIndeterminate />
        ) : (
          <Box w={"100%"}>
            <Table
              columns={columns}
              data={dataPemesanan}
              pagination={{
                position: ["bottomRight"],
                defaultPageSize: 5,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "15", "20"],
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} dari ${total} items`,
              }}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
}
