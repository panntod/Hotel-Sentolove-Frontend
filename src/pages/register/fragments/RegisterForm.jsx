import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "react-feather";
import {
  Button,
  Box,
  Heading,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  FormHelperText,
  Text,
} from "@chakra-ui/react";
import registerHandler from "./RegisterHandler";
import AlertNotification from "../../../components/alert";

export default function RegisterForm() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submitHandler = async (values) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("nama_user", values.nama_user);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("foto", file);
    formData.append("role", "tamu");

    const res = await registerHandler(formData);
    setMessage(res.message);
    setStatus(res.status);

    setTimeout(() => {
      if (res.status === "success") {
        navigate("/login/");
      }
      setMessage("");
      setStatus("");
      setIsLoading(false);
    }, 1200);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <Box width={{ lg: "70%" }} mx={"auto"}>
      <AlertNotification status={status} message={message} />
      <Box mt={4}>
        <Heading fontWeight={700} color="blue.500">
          Daftar
        </Heading>
        <Text fontSize="md" my={3}>
          Daftar untuk mendapatkan akses penuh sebagai{" "}
          <Text fontSize="md" color="blue.500">
            Customer kami!
          </Text>
        </Text>
      </Box>
      <Box>
        <FormControl method="POST">
          <Input
            type="text"
            name="nama_user"
            id="nama_user"
            borderRadius="full"
            focusBorderColor="blue.500"
            placeholder="Nama Pengguna"
            {...register("nama_user", { required: true })}
          />
          {errors.nama_user?.type === "required" && (
            <FormHelperText textColor="red" mb={4}>
              Masukkan nama pengguna
            </FormHelperText>
          )}
          <Input
            type="file"
            name="foto"
            id="foto"
            accept="image/*"
            borderRadius="full"
            my={4}
            focusBorderColor="blue.500"
            onChange={handleFileChange}
            required
          />
          {errors.foto && (
            <FormHelperText textColor="red" mb={4}>
              Masukkan foto
            </FormHelperText>
          )}
          <Input
            type="email"
            name="email"
            id="email"
            borderRadius="full"
            focusBorderColor="blue.500"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email?.type === "required" && (
            <FormHelperText textColor="red" mb={4}>
              Masukkan email
            </FormHelperText>
          )}
          <InputGroup mt={4}>
            <Input
              type={show ? "text" : "password"}
              name="password"
              id="password"
              borderRadius="full"
              focusBorderColor="blue.500"
              placeholder="Password"
              {...register("password", {
                required: true,
                minLength: 8,
              })}
            />
            <InputRightElement>
              <IconButton
                borderRadius="full"
                size="sm"
                variant="ghost"
                mr={[2, 6, 10]}
                onClick={handleClick}
                aria-label={"whod hide"}
                icon={show ? <EyeOff /> : <Eye />}
              />
            </InputRightElement>
          </InputGroup>
          {errors.password?.type === "required" && (
            <FormHelperText textColor="red">Masukkan password</FormHelperText>
          )}
          {errors.password?.type === "minLength" && (
            <FormHelperText textColor="red">
              Password minimal 8 karakter
            </FormHelperText>
          )}
          <Button
            mt={8}
            bg="blue.500"
            color="white"
            isLoading={isLoading}
            type="submit"
            w="full"
            borderRadius="full"
            borderWidth={2}
            borderColor="blue.500"
            _hover={{ bg: "white", color: "blue.500" }}
            onClick={handleSubmit(submitHandler)}
          >
            Daftar
          </Button>
        </FormControl>
        <Text fontSize="md" textAlign={"center"} my={3}>
          Sudah punya akun?{" "}
          <Text
            color="blue.500"
            as="span"
            cursor="pointer"
            onClick={() => navigate("/login")}
          >
            Masuk
          </Text>
        </Text>
      </Box>
    </Box>
  );
}
