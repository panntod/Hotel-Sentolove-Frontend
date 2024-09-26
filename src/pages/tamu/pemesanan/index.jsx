import { useEffect, useState } from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import { Input, DatePicker, Alert } from "antd";
import TextPoppins from "../../../components/text/TextPoppins";
import Heading from "../../../components/text/Heading";
import Container from "../../../components/container/Container";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {
  getAllTipeKamar,
  tipeKamarSelectors,
} from "../../../utils/store/reducers/tipeKamarSlice";
import { addPemesanan } from "../../../utils/store/reducers/pemesananSlice";
import { LOCAL_STORAGE_USER } from "../../../utils/constants";
import { getLocalStorage } from "../../../utils/helper/localStorage";
import { userAuth } from "../../../utils/helper/getAuth";

export default function index() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { id_tipe_kamar } = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const data = getLocalStorage(LOCAL_STORAGE_USER);
    setUser(data);
  }, []);
  
  const tipeKamar = useSelector((state) =>
    tipeKamarSelectors.selectById(state, id_tipe_kamar),
  );

  const getData = async () => {
    dispatch(getAllTipeKamar());
  };

  const { auth } = userAuth();

  if (!auth) {
    return <Navigate to={"/login"} replace />;
  }

  const submitHandler = async (value) => {
    setLoading(true);
    const tgl1 = new Date(value.selectedDate[0]).toISOString();
    const tgl2 = new Date(value.selectedDate[1]).toISOString();

    if (value.jumlah_kamar <= 0) {
      setMessage("Masukan jumlah kamar yang valid");
      setStatus("error");
      setLoading(false);
    } else {
      const valuesPemesanan = {
        ...value,
        email_pemesan: user.email,
        tipe_kamar: tipeKamar.nama_tipe_kamar,
        status_pemesanan: "baru",
        check_in: tgl1,
        check_out: tgl2,
      };
      const response = await dispatch(addPemesanan(valuesPemesanan));

      if (response.payload.status === "success") {
        setMessage("Pemesanan berhasil");
        setStatus("success");
        setLoading(false);
        setTimeout(() => {
          navigate("/dashboard/tamu/histori-pemesanan");
        }, 1000);
      } else {
        setMessage(response.payload.message);
        setStatus("error");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getData();
  }, [dispatch]);

  return (
    <Container>
      <Heading
        text={`Pemesanan Tipe Kamar ${tipeKamar?.nama_tipe_kamar}`}
        textTransform={"capitalize"}
      />
      <Box my={10} maxW={"100%"}>
        {message && (
          <Alert
            message={message}
            type={status}
            showIcon
            closable
            onClose={() => {
              setMessage(""), setStatus("");
            }}
            style={{ marginBottom: 10 }}
          />
        )}
        <Flex gap={4} flexDir={"column"}>
          <Box>
            <TextPoppins text="Nama Pemesan" />
            <Controller
              name="nama_pemesan"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Nama Pemesan"
                  style={{ width: "100%" }}
                />
              )}
            />
            {errors.nama_pemesan?.type === "required" && (
              <TextPoppins
                text={"Nama pemesan tidak boleh kosong"}
                color={"red.500"}
                fontSize={"xs"}
                fontWeight={"400"}
              />
            )}
          </Box>
          <Box>
            <TextPoppins text="Email Pemesan" />
            <Controller
              name="email_pemesan"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  value={user?.email}
                  style={{ width: "100%" }}
                  type={"email"}
                  disabled
                />
              )}
            />
          </Box>
          <Box>
            <TextPoppins text="Tanggal Check In dan Check Out" />
            <Controller
              name="selectedDate"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker.RangePicker
                  style={{
                    width: "100%",
                  }}
                  {...field}
                  value={field.value}
                />
              )}
            />
          </Box>
          <Box>
            <TextPoppins text="Nama Tamu" />
            <Controller
              name="nama_tamu"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Nama Tamu"
                  style={{ width: "100%" }}
                />
              )}
            />
            {errors.nama_tamu?.type === "required" && (
              <TextPoppins
                text={"Nama tamu tidak boleh kosong"}
                color={"red.500"}
                fontSize={"xs"}
                fontWeight={"400"}
              />
            )}
          </Box>
          <Box>
            <TextPoppins text="Jumlah Kamar" />
            <Controller
              name="jumlah_kamar"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Jumlah Kamar"
                  style={{ width: "100%" }}
                  type={"number"}
                />
              )}
            />
            {errors.jumlah_kamar?.type === "required" && (
              <TextPoppins
                text={"Jumlah kamar tidak boleh kosong"}
                color={"red.500"}
                fontSize={"xs"}
                fontWeight={"400"}
              />
            )}
          </Box>
          <Button
            colorScheme={"green"}
            size={"sm"}
            onClick={handleSubmit(submitHandler)}
            isLoading={loading}
          >
            <TextPoppins text="Pesan" />
          </Button>
        </Flex>
      </Box>
    </Container>
  );
}
