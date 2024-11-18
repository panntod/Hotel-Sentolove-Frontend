import ActionButton from "./ActionButton";

const columns = [
  {
    title: "Nama Tamu",
    dataIndex: "nama_tamu",
    key: "nama_tamu",
    width: "15%",
  },
  {
    title: "Tanggal Check In",
    dataIndex: "tgl_check_in",
    key: "tgl_check_in",
    width: "15%",
    render: (tgl_check_in) => (
      <span>
        {new Date(tgl_check_in).toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
    ),
  },
  {
    title: "Tanggal Check Out",
    dataIndex: "tgl_check_out",
    key: "tgl_check_out",
    width: "15%",
    render: (tgl_check_out) => (
      <span>
        {new Date(tgl_check_out).toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
    ),
  },
  {
    title: "Tipe Kamar",
    dataIndex: "nama_tipe_kamar",
    key: "nama_tipe_kamar",
    width: "15%",
  },
  {
    title: "Nomor Kamar",
    dataIndex: "nomor_kamar",
    key: "nomor_kamar",
    width: "10%",
  },
  {
    title: "Status",
    dataIndex: "status_pemesanan",
    key: "status_pemesanan",
    width: "10%",
    render: (status) => (
      <span>
        {status === "check_in"
          ? "Checkin"
          : status === "check_out"
            ? "Checkout"
            : "Baru"}
      </span>
    ),
  },
  {
    title: "Aksi",
    dataIndex: "id_pemesanan",
    key: "aksi",
    width: "6%",
    render: (record) => <ActionButton payload={record} />,
  },
];

export { columns };
