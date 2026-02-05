import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: [
      "@fortawesome/react-fontawesome",
      "@fortawesome/free-solid-svg-icons",
      "framer-motion",
    ],
  },

  async redirects() {
    return [
      { source: "/porcaheOrder", destination: "/purchase-order", permanent: true },
      { source: "/statusDelivery", destination: "/status-delivery", permanent: true },
      { source: "/warehouseTransfer", destination: "/warehouse-transfer", permanent: true },
      { source: "/stagging/:path*", destination: "/staging/:path*", permanent: true },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/checklistStaging/:type/:idPo/:idMesin/count",
        destination: "/api/checklistStaging/type/:type/:idPo/:idMesin/count",
      },
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
      {
        source: "/api/master-spekmesin/:type/datas",
        destination: "/api/master-spekmesin/type/:type/datas",
      },
      { source: "/api/getListTypeValues", destination: "/api/get-list-typeValues" },
      { source: "/api/picMitra", destination: "/api/pic-mitra" },
      {
        source: "/api/purchaseOrder/:dateFrom/:dateTo/ranges",
        destination: "/api/purchaseOrder/date/:dateFrom/:dateTo/ranges",
      },
      {
        source: "/api/settingPreStaging/:types/:rowPerPage",
        destination: "/api/settingPreStaging/type/:types/:rowPerPage",
      },
      {
        source: "/api/statusDelivery/:id",
        destination: "/api/statusDelivery/id/:id",
      },
    ];
  },
};

export default nextConfig;
