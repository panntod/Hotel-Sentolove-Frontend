import { Table } from "antd";

export default function index({ data, columns, pagination }) {
  return (
    <Table
      rowKey={(data) =>
        data.id_kamar || data.id_tipe_kamar || data.id_pemesanan
      }
      columns={columns}
      dataSource={data}
      sortDirections={"descend"}
      pagination={pagination}
      scroll={{
        x: 500,
      }}
    />
  );
}
