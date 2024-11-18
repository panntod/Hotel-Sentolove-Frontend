import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Grid,
  Container,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  Button,
  Heading,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTipeKamar,
  tipeKamarSelectors,
  updateTipeKamar,
} from "../../../../utils/store/reducers/tipeKamarSlice";
import AlertNotification from "../../../../components/alert";

export default function ModalAdd({ isOpen, onClose, payload }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const tipeKamar = useSelector((state) =>
    tipeKamarSelectors.selectById(state, payload),
  );
  const { register, handleSubmit, reset } = useForm();

  const submitHandler = async (values) => {
    setIsLoading(true);
    const form = new FormData();

    const fieldsToUpdate = [
      { key: "nama_tipe_kamar", value: values.nama_tipe_kamar },
      { key: "harga", value: values.harga },
      { key: "deskripsi", value: values.deskripsi },
      { key: "foto", value: values.foto[0] },
    ];

    fieldsToUpdate.forEach(({ key, value }) => {
      if (tipeKamar[key] !== value) {
        form.append(key, value);
      }
    });

    const fileType = values.foto[0]?.type;

    if (fileType) {
      const isImage = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
      ].includes(fileType);

      if (!isImage) {
        setMessage("File harus berupa gambar");
        setStatus("error");
        setIsLoading(false);
        return;
      }
    }

    if (values.harga < 0) {
      setMessage("Masukan Nominal Harga yang benar");
      setStatus("error");
      setIsLoading(false);
      return;
    } else {
      const res = await dispatch(
        updateTipeKamar({ values: form, id: payload }),
      );
      setMessage(res.payload.message);
      setStatus(res.payload.status);
      setIsLoading(false);

      if (res.payload.status === "success") {
        await dispatch(getAllTipeKamar());
        setTimeout(() => {
          onClose(), reset(), setStatus(""), setMessage("");
        }, 1200);
      }
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  useEffect(() => {
    if (tipeKamar) {
      reset(tipeKamar);
    }
  }, [tipeKamar]);

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      blockScrollOnMount={false}
      motionPreset="scale"
      size={{ base: "sm", md: "xl" }}
    >
      <ModalOverlay />
      <ModalContent borderRadius="20px">
        <ModalBody p={8}>
          <Heading fontSize={20}>Tambah Tipe Kamar</Heading>
          <Box mt={4}>
            <AlertNotification status={status} message={message} />
          </Box>
          <FormControl method="POST">
            <Container gridTemplateRows="repeat(2,1fr)" p={0} my={6}>
              <Grid templateColumns="repeat(2, 1fr)" gap={5} my={3}>
                <Flex direction="column">
                  <Input
                    name="nama_tipe_kamar"
                    id="nama_tipe_kamar"
                    borderRadius="lg"
                    focusBorderColor="blue.500"
                    placeholder="Nama"
                    {...register("nama_tipe_kamar")}
                  />
                </Flex>
                <Flex direction="column">
                  <InputGroup>
                    <Input
                      type={"number"}
                      name="harga"
                      id="harga"
                      borderRadius="lg"
                      focusBorderColor="blue.500"
                      placeholder="Harga"
                      {...register("harga")}
                    />
                    <InputLeftElement pointerEvents="none" children="Rp." />
                  </InputGroup>
                </Flex>
                <Flex direction="column">
                  <Input
                    type={"file"}
                    name="foto"
                    id="foto"
                    borderRadius="lg"
                    focusBorderColor="blue.500"
                    placeholder="Foto"
                    {...register("foto")}
                  />
                </Flex>
                <Flex direction="column">
                  <Textarea
                    name="deskripsi"
                    id="deskripsi"
                    borderRadius="lg"
                    focusBorderColor="blue.500"
                    placeholder="Deskripsi"
                    minH={10}
                    {...register("deskripsi")}
                  />
                </Flex>
              </Grid>
            </Container>
            <Button
              variant="outline"
              colorScheme={"blue"}
              fontWeight={500}
              px={6}
              borderRadius="lg"
              onClick={handleClose}
            >
              Batal
            </Button>
            <Button
              type="submit"
              ml={4}
              px={6}
              colorScheme={"blue"}
              borderRadius="lg"
              fontWeight={500}
              onClick={handleSubmit(async (values) => {
                await submitHandler(values);
              })}
              isLoading={isLoading}
            >
              Simpan
            </Button>
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
