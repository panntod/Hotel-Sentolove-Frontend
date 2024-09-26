const columns = [
  {
    title: "No Pemesanan",
    dataIndex: "nomor_pemesanan",
    key: "nomor_pemesanan",
    width: "12%",
  },
  {
    title: "Nama Pemesan",
    dataIndex: "nama_pemesan",
    key: "nama_pemesan",
    width: "12%",
  },
  {
    title: "Email",
    dataIndex: "email_pemesan",
    key: "email_pemesan",
    width: "10%",
  },
  {
    title: "Tanggal Check In",
    dataIndex: "tgl_check_in",
    key: "tgl_check_in",
    width: "12%",
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
    width: "12%",
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
    width: "10%",
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
    width: "8%",
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
    title: "Harga",
    dataIndex: "harga",
    key: "harga",
    width: "12%",
    render: (harga) => (
      <span>
        {new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(harga)}
      </span>
    ),
  },
];

export { columns };
