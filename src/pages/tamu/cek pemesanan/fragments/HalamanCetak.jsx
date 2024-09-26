import React, { useEffect } from "react";
import { Table, Tbody, Tr, Td, Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { pemesananSelector } from "../../../../utils/store/reducers/pemesananSlice";
import TextPoppins from "../../../../components/text/TextPoppins";

export default function HalamanCetak() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pemesanan = useSelector((state) =>
    pemesananSelector.selectById(state, id),
  );

  useEffect(() => {
    window.print();
    navigate("/dashboard/tamu/cek-pemesanan/");
  }, [pemesanan]);

  return (
    <Box w={"100vw"} h={"100vh"}>
      <Table variant="simple" maxW={"100%"} mx={"auto"}>
        <Tbody>
          <Tr>
            <Td colSpan={2} textAlign={"center"}>
              <TextPoppins
                text={`Cetak Pemesanan`}
                fontSize={"md"}
                fontWeight={600}
              />
            </Td>
          </Tr>
          <Tr>
            <Td>
              <TextPoppins text={"Nama:"} fontSize={"md"} fontWeight={400} />
            </Td>
            <Td>{pemesanan.nama_pemesan}</Td>
          </Tr>
          <Tr>
            <Td>
              <TextPoppins text={`Email:`} fontSize={"md"} fontWeight={400} />
            </Td>
            <Td>{pemesanan.email_pemesan}</Td>
          </Tr>
          <Tr>
            <Td>
              <TextPoppins
                text={"Nomor Pemesan:"}
                fontSize={"md"}
                fontWeight={400}
              />
            </Td>
            <Td>{pemesanan.nomor_pemesanan}</Td>
          </Tr>
          <Tr>
            <Td>
              <TextPoppins
                text={"Tanggal Pemesan:"}
                fontSize={"md"}
                fontWeight={400}
              />
            </Td>
            <Td>
              {new Date(pemesanan.tgl_pemesanan).toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Td>
          </Tr>
          <Tr>
            <Td>
              <TextPoppins
                text={"Tanggal Check In:"}
                fontSize={"md"}
                fontWeight={400}
              />
            </Td>
            <Td>
              {new Date(pemesanan.tgl_check_in).toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Td>
          </Tr>
          <Tr>
            <Td>
              <TextPoppins
                text={"Tanggal Check Out:"}
                fontSize={"md"}
                fontWeight={400}
              />
            </Td>
            <Td>
              {new Date(pemesanan.tgl_check_out).toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Td>
          </Tr>
          <Tr>
            <Td>
              <TextPoppins
                text={"Nama Tamu:"}
                fontSize={"md"}
                fontWeight={400}
              />
            </Td>
            <Td>{pemesanan.nama_tamu}</Td>
          </Tr>
          <Tr>
            <Td>
              <TextPoppins
                text={"Jumlah Kamar:"}
                fontSize={"md"}
                fontWeight={400}
              />
            </Td>
            <Td>{pemesanan.jumlah_kamar}</Td>
          </Tr>
          <Tr>
            <Td>
              <TextPoppins
                text={"Tipe Kamar:"}
                fontSize={"md"}
                fontWeight={400}
              />
            </Td>
            <Td>{pemesanan.nama_tipe_kamar}</Td>
          </Tr>
          <Tr>
            <Td>
              <TextPoppins
                text={"Nomor Kamar:"}
                fontSize={"md"}
                fontWeight={400}
              />
            </Td>
            <Td>
              {Array.isArray(pemesanan.nomor_kamar)
                ? pemesanan.nomor_kamar.join(", ")
                : pemesanan.nomor_kamar}
            </Td>
          </Tr>
          <Tr>
            <Td>
              <TextPoppins text={"Harga:"} fontSize={"md"} fontWeight={400} />
            </Td>
            <Td>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(pemesanan.harga)}
            </Td>
          </Tr>
          <Tr>
            <Td>
              <TextPoppins
                text={"Status Pemesanan:"}
                fontSize={"md"}
                fontWeight={400}
              />
            </Td>
            <Td>
              {pemesanan.status_pemesanan === "check_in"
                ? "Check In"
                : pemesanan.status_pemesanan === "check_out"
                  ? "Check Out"
                  : "Baru"}
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
}
