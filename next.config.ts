import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/getStatusDelivery/:idPo/:snMesin/:id_customer/:warehouse/:tgl_tiba",
        destination:
          "/api/get-status-delivery/:idPo/:snMesin/:id_customer/:warehouse/:tgl_tiba",
      },
      {
        source: "/api/getWarehouseTransfer/:idPo/:snMesin/:from_warehouse/:tgl_keluar",
        destination:
          "/api/get-warehouse-transfer/:idPo/:snMesin/:from_warehouse/:tgl_keluar",
      },
      { source: "/api/statusPo", destination: "/api/status-po" },
      { source: "/api/masterPo", destination: "/api/master-po" },
      { source: "/api/masterPo/:id", destination: "/api/master-po/:id" },
      { source: "/api/masterStyle", destination: "/api/master-style" },
      { source: "/api/masterStyle/:id", destination: "/api/master-style/:id" },
      { source: "/api/masterUser", destination: "/api/master-user" },
      { source: "/api/getListTypeValues", destination: "/api/get-list-typeValues" },
      { source: "/api/picMitra", destination: "/api/pic-mitra" },
    ];
  },
};

export default nextConfig;
