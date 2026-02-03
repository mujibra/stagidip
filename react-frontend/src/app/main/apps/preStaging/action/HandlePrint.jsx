/* eslint-disable no-unused-expressions */
/* eslint-disable prettier/prettier */
/* eslint-disable no-constant-condition */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable new-cap */
import { Button } from "@mui/material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import moment from "moment";
import PrintIcon from "@mui/icons-material/Print";
import React, { useEffect, useState } from "react";
import { showMessage } from "app/store/fuse/messageSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver";

const HandlePrint = (props) => {
  // console.log(props?.dataHeader?.model?.id, 'props?.dataHeader?.model?.id');
  const [loading, setLoading] = useState(true);
  const doc = new jsPDF("l", "pt", "a4");
  const getAccessToken = localStorage.getItem("access_token");
  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };
  const [data, setdata] = useState([]);
  const dataHeader = props?.dataHeader;
  const [dataUpproveById, setDataUpproveById] = useState([]);

  const [loadingApprove, setLoadingApprove] = useState(true);
  const idPO = props?.idPO;
  const idMesin = props?.getIdMesin;
  const dataAllProps = props?.dataHeader;
  const dispatch = useDispatch();
  const [gAllCount, setGetAllCount] = useState([]);

  function createData(
    no,
    name,
    result_detail,
    test_desc,
    detail_staging,
    remark,
    problem,
    action,
    fill_columns
  ) {
    return {
      no,
      name,
      test_desc,
      result_detail,
      detail_staging,
      remark,
      action,
      problem,
      fill_columns,
    };
  }
  function createDataMV(
    no,
    unit,
    checkpoint_desc,
    part_number,
    detail_checklist,
    rev_final,
    results,
    sn_part,
    inspector_sign,
    fix_description
  ) {
    return {
      no,
      unit,
      checkpoint_desc,
      part_number,
      detail_checklist,
      rev_final,
      sn_part,
      results,
      inspector_sign,
      fix_description,
    };
  }
  const [status_checklist, setstatus_checklist] = useState(true);
  const [datasMP400, setDatasMV400] = useState([]);
  // console.log(datasMP400, 'datasMP400');

  const getAllCount = async () => {
    setLoading(true);

    const response = await axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklistStaging/${idPO}/${idMesin?.idMesin}/countDataResult/status`,
        config
      )
      .then((res) => {
        // console.log(res, 'resss');
        setGetAllCount(res?.data?.data_status);
        setLoading(false);
        // console.log(res.data);
      })
      .catch((err) => {
        setGetAllCount([]);
        setLoading(false);
        const errStatus = err.response.status;
        const errMessage = err.response.data.errorMessage;
        let messages = "";
        if (errStatus === 401) {
          messages = "Unauthorized!!";
          window.location.href = "/login";
          handleLogout();
        } else if (errStatus === 500) {
          messages = "Server Error!!";
        } else if (errStatus === 404) {
          messages = "Not Found Error!!!";
        } else if (errStatus === 408) {
          messages = "TimeOut Error!!";
        } else if (errStatus === 429) {
          messages = "Too Many Request!!";
        } else if (errStatus === 400) {
          messages = errMessage;
        } else {
          messages = "Something Wrong!!";
        }
        dispatch(
          showMessage({
            message: messages,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            variant: "error",
          })
        );
      });
  };

  const getData2 = async () => {
    setLoading(true);
    const response = await axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklistStagingReport/v2/${idPO}/${idMesin?.idMesin}`,
        config
      )
      .then((res) => {
        // console.log(res, 'res');
        setstatus_checklist(res?.data?.status_checklist);
        setdata(res?.data?.data);
        // setDetailPO(res?.data?.data?.detail_po);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        const errStatus = err.response.status;
        const errMessage = err.response.data.errorMessage;
        setdata([]);
        // setDetailPO([]);
        let messages = "";
        if (errStatus === 401) {
          messages = "Failed!";
        } else if (errStatus === 500) {
          messages = "Server Error!!";
        } else if (errStatus === 404) {
          messages = "Not Found Error!!!";
        } else if (errStatus === 408) {
          messages = "TimeOut Error!!";
        } else if (errStatus === 400) {
          messages = errMessage;
        } else {
          messages = "Something Wrong!!";
        }
        dispatch(
          showMessage({
            message: messages,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            variant: "error",
          })
        );
      });
  };
  const getData = async () => {
    setLoading(true);
    const response = await axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklistStagingMv400/v2/${idPO}/${idMesin?.idMesin}/spek`,
        config
      )
      .then((res) => {
        // console.log(res, 'res');
        setstatus_checklist(res?.data?.status_checklist);
        setDatasMV400(res?.data?.data);
        // setDetailPO(res?.data?.data?.detail_po);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        const errStatus = err.response.status;
        const errMessage = err.response.data.errorMessage;
        setDatasMV400([]);
        // setDetailPO([]);
        let messages = "";
        if (errStatus === 401) {
          messages = "Failed!";
        } else if (errStatus === 500) {
          messages = "Server Error!!";
        } else if (errStatus === 404) {
          messages = "Not Found Error!!!";
        } else if (errStatus === 408) {
          messages = "TimeOut Error!!";
        } else if (errStatus === 400) {
          messages = errMessage;
        } else {
          messages = "Something Wrong!!";
        }
        dispatch(
          showMessage({
            message: messages,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            variant: "error",
          })
        );
      });
  };
  const getDataTSS = async () => {
    // if (idMesin.idMesin !== undefined) {
    axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklist-approval/TSS/${idPO}/${idMesin.idMesin}`,
        config
      )
      .then((res) => {
        // console.log(res, 'res');
        setDataUpproveById(res?.data?.data[0]);
        setLoadingApprove(false);
        // console.log(res.data);
      })
      .catch((err) => {
        // setLoadingApprove(false);
        // setDataUpproveById([]);
        const errStatus = err.response.status;
        const errMessage = err.response.data.errorMessage;
        let messages = "";
        if (errStatus === 401) {
          messages = "Unauthorized!!";
          window.location.href = "/login";
          handleLogout();
        } else if (errStatus === 500) {
          messages = "Server Error!!";
        } else if (errStatus === 404) {
          messages = "Not Found Error!!!";
        } else if (errStatus === 408) {
          messages = "TimeOut Error!!";
        } else if (errStatus === 429) {
          messages = "Too Many Request!!";
        } else if (errStatus === 400) {
          messages = errMessage;
        } else {
          messages = "Something Wrong!!";
        }
        dispatch(
          showMessage({
            message: messages,
            autoHideDuration: 5000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            variant: "error",
          })
        );
      });
    // }
  };
  // console.log(getDataTSS, 'data tss');
  const getDataStaging = async () => {
    // if (IdMesin.idMesin !== undefined) {
    axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklist-approval/staging/${idPO}/${idMesin.idMesin}`,
        config
      )
      .then((res) => {
        // console.log(res, 'res');
        setDataUpproveById(res?.data?.data[0]);
        setLoadingApprove(false);
        // console.log(res.data);
      })
      .catch((err) => {
        setLoadingApprove(false);
        setDataUpproveById([]);
        const errStatus = err.response.status;
        const errMessage = err.response.data.errorMessage;
        let messages = "";
        if (errStatus === 401) {
          messages = "Unauthorized!!";
          window.location.href = "/login";
          // eslint-disable-next-line no-undef
          handleLogout();
        } else if (errStatus === 500) {
          messages = "Server Error!!";
        } else if (errStatus === 404) {
          messages = "Not Found Error!!!";
        } else if (errStatus === 408) {
          messages = "TimeOut Error!!";
        } else if (errStatus === 429) {
          messages = "Too Many Request!!";
        } else if (errStatus === 400) {
          messages = errMessage;
        } else {
          messages = "Something Wrong!!";
        }
        dispatch(
          showMessage({
            message: messages,
            autoHideDuration: 5000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            variant: "error",
          })
        );
      });
    // }
  };

  const [ok, setOK] = React.useState(0);
  const getOK = async () => {
    setLoading(true);

    const response = await axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklistStaging/OK/${idPO}/${idMesin?.idMesin}/count`,
        config
      )
      .then((res) => {
        setOK(res?.data?.totalDatas);
        setLoading(false);
        // console.log(res.data);
      })
      .catch((err) => {
        setDatas([]);
        setLoading(false);
        const errStatus = err.response.status;
        const errMessage = err.response.data.errorMessage;
        let messages = "";
        if (errStatus === 401) {
          messages = "Unauthorized!!";
          window.location.href = "/login";
          handleLogout();
        } else if (errStatus === 500) {
          messages = "Server Error!!";
        } else if (errStatus === 404) {
          messages = "Not Found Error!!!";
        } else if (errStatus === 429) {
          messages = "Too Many Request!!";
        } else if (errStatus === 408) {
          messages = "TimeOut Error!!";
        } else if (errStatus === 400) {
          messages = errMessage;
        } else {
          messages = "Something Wrong!!";
        }
        dispatch(
          showMessage({
            message: messages,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            variant: "error",
          })
        );
      });
  };
  const [ng, setNG] = React.useState(0);
  // console.log(ng, 'ng nih');
  const getNG = async () => {
    setLoading(true);

    const response = await axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklistStaging/NG/${idPO}/${idMesin?.idMesin}/count`,
        config
      )
      .then((res) => {
        setNG(res?.data?.totalDatas);
        setLoading(false);
        // console.log(res.data);
      })
      .catch((err) => {
        setLoading(false);
        const errStatus = err.response.status;
        const errMessage = err.response.data.errorMessage;
        let messages = "";
        if (errStatus === 401) {
          messages = "Unauthorized!!";
          window.location.href = "/login";
          handleLogout();
        } else if (errStatus === 500) {
          messages = "Server Error!!";
        } else if (errStatus === 404) {
          messages = "Not Found Error!!!";
        } else if (errStatus === 429) {
          messages = "Too Many Request!!";
        } else if (errStatus === 408) {
          messages = "TimeOut Error!!";
        } else if (errStatus === 400) {
          messages = errMessage;
        } else {
          messages = "Something Wrong!!";
        }
        dispatch(
          showMessage({
            message: messages,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            variant: "error",
          })
        );
      });
  };

  useEffect(() => {
    if (idMesin?.idMesin !== undefined) {
      getDataTSS();
      // getDataStaging();
      getOK();
      getNG();
      getData();
      getAllCount();
      getData2();
    }
    // console.log(data, 'datassss');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idMesin]);
  // console.log(props?.dataHeader?.model?.name, 'props?.dataHeader?.model?.name');
  let datas;
  if (props?.dataHeader?.model?.id !== 5) {
    datas = data?.map((item, index) =>
      createData(
        index + 1,
        item?.name,
        item?.result_detail,
        item?.test_desc,
        item?.result_detail === "attach here the vesion" ||
          item?.result_detail === "attach here the version information paper"
          ? item?.detail_staging?.fill_columns === null || undefined
            ? "-"
            : "-"
          : item?.result_detail === "M/B Bios Version= "
          ? item?.detail_staging?.fill_columns
          : item?.result_detail === "VDisplay"
          ? item?.detail_staging?.fill_columns === null
            ? null
            : [
                item?.detail_staging?.fill_columns[0] === null ||
                undefined ||
                ""
                  ? "-"
                  : item?.detail_staging?.fill_columns[0],
                item?.detail_staging?.fill_columns[1] === null ||
                undefined ||
                ""
                  ? "-"
                  : item?.detail_staging?.fill_columns[1],
              ]
          : item?.result_detail === "BCU: BCU20 / BCU24 / BCU53 / BCU54 / BCU"
          ? item?.detail_staging?.fill_columns?.description === null
            ? "-"
            : item?.detail_staging?.fill_columns?.description
          : item?.result_detail === "Dev. 1,2,3,4,5" ||
            item?.result_detail === "Dev. 1,2,3,4,5,6" ||
            item?.result_detail === "Dev. 1,2,3,4,5,6,7"
          ? item?.detail_staging?.fill_columns === null
            ? null
            : [
                item?.detail_staging?.fill_columns[0]?.description === null ||
                undefined ||
                ""
                  ? "-"
                  : item?.detail_staging?.fill_columns[0]?.description,
                item?.detail_staging?.fill_columns[1]?.description === null ||
                undefined ||
                ""
                  ? "-"
                  : item?.detail_staging?.fill_columns[1]?.description,
                item?.detail_staging?.fill_columns[2]?.description === null ||
                undefined ||
                ""
                  ? "-"
                  : item?.detail_staging?.fill_columns[2]?.description,
                item?.detail_staging?.fill_columns[3]?.description === null ||
                undefined ||
                ""
                  ? "-"
                  : item?.detail_staging?.fill_columns[3]?.description,
                item?.detail_staging?.fill_columns[4]?.description === null ||
                undefined ||
                ""
                  ? "-"
                  : item?.detail_staging?.fill_columns[4]?.description,
              ]
          : item?.result_detail ===
              "1.Booting time: Min. Sec. \n2.Check the Holding/Grapic status \n3.Use stand by switch in system and P/S" ||
            item?.result_detail ===
              "1.Booting time: Min. Sec. \r\n2.Check the Holding/Grapic status \r\n3.Use stand by switch in system and P/S"
          ? item?.detail_staging?.fill_columns === null
            ? null
            : [
                item?.detail_staging?.fill_columns[0] === null ||
                undefined ||
                ""
                  ? "-"
                  : item?.detail_staging?.fill_columns[0],
                item?.detail_staging?.fill_columns[1] === null ||
                undefined ||
                ""
                  ? "-"
                  : item?.detail_staging?.fill_columns[1],
                item?.detail_staging?.fill_columns[2] === null ||
                undefined ||
                ""
                  ? "-"
                  : item?.detail_staging?.fill_columns[2],
                item?.detail_staging?.fill_columns[3] === null ||
                undefined ||
                ""
                  ? "-"
                  : item?.detail_staging?.fill_columns[3],
              ]
          : item?.result_detail ===
              "1.Booting time: Min. Sec. \n2.Use stand by switch in system and P/S" ||
            item?.result_detail ===
              "1.Booting time: Min. Sec. \r\n2.Use stand by switch in system and P/S"
          ? item?.detail_staging?.fill_columns === null
            ? null
            : [
                item?.detail_staging?.fill_columns[0],
                item?.detail_staging?.fill_columns[1],
                item?.detail_staging?.fill_columns[2],
                item?.detail_staging?.fill_columns[3],
              ]
          : item?.detail_staging?.results === undefined ||
            item?.detail_staging?.results === null
          ? "-"
          : item?.detail_staging?.results,

        item?.detail_staging?.problem?.description === undefined ||
          item?.detail_staging?.problem?.description === null
          ? "-"
          : item?.detail_staging?.problem?.description,
        item?.detail_staging?.remark?.description === undefined ||
          item?.detail_staging?.remark?.description === null
          ? "- "
          : item?.detail_staging?.remark?.description,
        item?.detail_staging?.action?.description === undefined ||
          item?.detail_staging?.action?.description === null
          ? "-"
          : item?.detail_staging?.action?.description
      )
    );
  } else {
    datas = datasMP400?.map((item, index) =>
      createDataMV(
        index + 1,
        item?.unit === null ? "-" : item?.unit,
        item?.checkpoint_desc === null ? "-" : item?.checkpoint_desc,
        item?.part_number === null ? "-" : item?.part_number,
        item?.rev_final === null ? "-" : item?.rev_final,
        "-",
        item?.detail_checklist?.results === null
          ? "-"
          : item?.detail_checklist?.results,
        item?.detail_checklist?.sn_part === null
          ? "-"
          : item?.detail_checklist?.sn_part,
        item?.detail_checklist?.inspector_sign === null
          ? "-"
          : item?.detail_checklist?.inspector_sign,
        item?.detail_checklist?.fix_description === null
          ? "-"
          : item?.detail_checklist?.fix_description
      )
    );
  }

  const DataForBody = [];

  for (let index = 0; index < datas?.length; index++) {
    if (datas?.length !== 0) {
      DataForBody.push(Object.values(datas[index]));
    }
  }
  // console.log(DataForBody, 'DataForBody')

  const downloadPDF = () => {
    const startY = 95;
    const tableHeight = doc.internal.pageSize.getHeight() - startY - 20;
    // console.log(data, 'di dalem download pdf');

    doc.text(
      `Pre Staging No PO  : ${
        dataAllProps?.no_po === null ? "-" : dataAllProps?.no_po
      }`,
      20,
      20
    );
    doc.setFontSize(10);
    doc.text(
      `SN Mesin         : ${
        dataAllProps?.dataMesin[0]?.snMesin === null
          ? "-"
          : dataAllProps?.dataMesin[0]?.snMesin
      }`,
      20,
      40
    );
    doc.text(
      ` Model             : ${
        dataAllProps?.mesin?.type === undefined
          ? "-"
          : dataAllProps?.mesin?.type
      }`,
      20,
      55
    );
    doc.text(
      `PN System      : ${
        dataAllProps?.part_number === undefined
          ? "-"
          : dataAllProps?.part_number
      }`,
      20,
      70
    );
    doc.text(
      `PIC Datindo     : ${
        dataAllProps?.pic_staging.name === undefined
          ? "-"
          : dataAllProps?.pic_staging.name
      }`,
      20,
      85
    );
    if (
      props?.dataHeader?.model?.id === 1 ||
      props?.dataHeader?.model?.id === 2 ||
      props?.dataHeader?.model?.id === 3 ||
      props?.dataHeader?.model?.id === 4
    ) {
      doc.text(`OK : ${ok === null ? "-" : ok}`, 200, 40);
      doc.text(`NG : ${ng === null ? "-" : ng}`, 200, 55);
    } else if (props?.dataHeader?.model?.id === 5) {
      doc.text(
        `OK : ${gAllCount?.data_ok === null ? "-" : gAllCount?.data_ok}`,
        200,
        40
      );
      doc.text(
        `NG : ${gAllCount?.data_ng === null ? "-" : gAllCount?.data_ng}`,
        200,
        55
      );
      doc.text(
        `NA : ${gAllCount?.data_na === null ? "-" : gAllCount?.data_na}`,
        200,
        70
      );
    } else if (props?.dataHeader?.model?.id === 8) {
      doc.text(
        `OK : ${gAllCount?.data_ok === null ? "-" : gAllCount?.data_ok}`,
        200,
        40
      );
      doc.text(
        `NG : ${gAllCount?.data_ng === null ? "-" : gAllCount?.data_ng}`,
        200,
        55
      );
      doc.text(
        `NA : ${gAllCount?.data_na === null ? "-" : gAllCount?.data_na}`,
        200,
        70
      );
    } else {
      doc.text(
        `OK : ${gAllCount?.data_ok === null ? "-" : gAllCount?.data_ok}`,
        200,
        40
      );
      doc.text(
        `NG : ${gAllCount?.data_ng === null ? "-" : gAllCount?.data_ng}`,
        200,
        55
      );
      doc.text(
        `NA : ${gAllCount?.data_na === null ? "-" : gAllCount?.data_na}`,
        200,
        70
      );
    }

    const options = {
      didDrawPage(data) {
        if (data.pageCount === 1) {
          const startY = 95;

          // console.log(data, 'data');
          // Tampilkan autoTable hanya pada halaman pertama
          if (
            props?.dataHeader?.model?.id === 1 ||
            props?.dataHeader?.model?.id === 2 ||
            props?.dataHeader?.model?.id === 3 ||
            props?.dataHeader?.model?.id === 4 ||
            props?.dataHeader?.model?.id === 7 ||
            props?.dataHeader?.model?.id === 8
          ) {
            autoTable(doc, {
              theme: "striped",
              head: [
                [
                  "No",
                  "Name",
                  "Test",
                  "Expected result or result details",
                  "Result",
                  "Problem",
                  "Action",
                  "Remake",
                ],
              ],
              headStyles: { fontSize: 7, halign: "center" },
              startY,
              margin: { top: startY },
              columnStyles: {
                0: {
                  fontSize: 6,
                  halign: "center",
                  overflow: "linebreak",
                  cellWidth: "wrap",
                },
                1: { fontSize: 6, halign: "center" },
                2: { fontSize: 7, halign: "left" },
                3: { fontSize: 6, halign: "left" },
                4: { fontSize: 6, halign: "center" },
                5: { fontSize: 6, halign: "center" },
                6: { fontSize: 6, halign: "center" },
                7: { fontSize: 6, halign: "center" },
              },
              body: DataForBody,
            });
          } else if (props?.dataHeader?.model?.id === 5) {
            autoTable(doc, {
              theme: "striped",
              head: [
                [
                  "No",
                  "Unit",
                  "Check Point",
                  "Part Number",
                  "(Rev) Final",
                  "(Rev) Row",
                  "Serial Number",
                  "Result",
                  "Inspector Sign",
                  "Fix Description",
                ],
              ],
              headStyles: { fontSize: 7, halign: "center" },
              startY,
              margin: { top: startY },
              columnStyles: {
                0: {
                  fontSize: 6,
                  halign: "center",
                  overflow: "linebreak",
                  cellWidth: "wrap",
                },
                1: { fontSize: 7, halign: "center" },
                2: { fontSize: 7, halign: "left" },
                3: { fontSize: 7, halign: "center" },
                4: { fontSize: 7, halign: "center" },
                5: { fontSize: 7, halign: "center" },
                6: { fontSize: 7, halign: "center" },
                7: { fontSize: 7, halign: "center" },
                8: { fontSize: 7, halign: "center" },
                9: { fontSize: 7, halign: "center" },
              },
              body: DataForBody,
            });
          } else {
            autoTable(doc, {
              theme: "striped",
              head: [
                [
                  "No",
                  "Name",
                  "Test",
                  "Expected result or result details",
                  "Result",
                  "Problem",
                  "Action",
                  "Remake",
                ],
              ],
              headStyles: { fontSize: 7, halign: "center" },
              startY,
              margin: { top: startY },
              columnStyles: {
                0: {
                  fontSize: 6,
                  halign: "center",
                  overflow: "linebreak",
                  cellWidth: "wrap",
                },
                1: { fontSize: 6, halign: "center" },
                2: { fontSize: 7, halign: "left" },
                3: { fontSize: 6, halign: "left" },
                4: { fontSize: 6, halign: "center" },
                5: { fontSize: 6, halign: "center" },
                6: { fontSize: 6, halign: "center" },
                7: { fontSize: 6, halign: "center" },
              },
              body: DataForBody,
            });
          }
        }
      },
    };

    let height;
    doc.autoTable({
      ...options,
      createdCell(cell, data) {
        height = data.table.height;
      },
    });
    // if (
    //   props?.dataHeader?.model?.id === 1 ||
    //   (props?.dataHeader?.model?.id === 2 &&
    //     data[7].detail_staging.fill_columns !== null)
    // ) {
    //   doc.setPage(1);
    // } else if (
    //   props?.dataHeader?.model?.id === 3 ||
    //   (props?.dataHeader?.model?.id === 4 &&
    //     data[14].detail_staging.fill_columns !== null)
    // ) {
    //   doc.setPage(2);
    // } else {
    //   ('');
    // }

    // if (
    //   props?.dataHeader?.model?.id === 1 ||
    //   (props?.dataHeader?.model?.id === 2 &&
    //     data[7].detail_staging.fill_columns !== null)
    // ) {
    //   doc.addImage({
    //     imageData:
    //       data[7].detail_staging.fill_columns === null
    //         ? '-'
    //         : data[7].detail_staging.fill_columns,
    //     x: 620,
    //     y: 338,
    //     w: 37,
    //     h: 37,
    //   });
    // } else if (
    //   props?.dataHeader?.model?.id === 3 ||
    //   (props?.dataHeader?.model?.id === 4 &&
    //     data[14].detail_staging.fill_columns !== null)
    // ) {
    //   doc.addImage({
    //     imageData:
    //       data[14].detail_staging.fill_columns === null
    //         ? '-'
    //         : data[14].detail_staging.fill_columns,
    //     x: 628,
    //     y: 134,
    //     w: 37,
    //     h: 37,
    //   });
    // } else {
    //   ('');
    // }

    // doc.addImage({
    //   imageData:
    //     data[14].detail_staging.fill_columns === null
    //       ? '-'
    //       : data[14].detail_staging.fill_columns,
    //   x: 15,
    //   y: 40,
    //   w: 180,
    //   h: 160,
    // });
    doc.save(
      `Pre Staging No PO ${dataHeader?.no_po} on ${moment().format("LL")}.pdf`
    );
  };

  function exportExcel() {
    // console.log(datasMP400, 'datasMP400');
    // create workbook by api.
    const workbook = new Workbook();
    // must create one more sheet.
    const sheet = workbook.addWorksheet("SPECIFICATION");
    const worksheet = workbook.getWorksheet("SPECIFICATION");

    /* TITLE */
    worksheet.mergeCells("A1", "G1");
    worksheet.getCell("A1").value = `Pre Staging No PO : "
    ${dataAllProps?.no_po === null ? "-" : dataAllProps?.no_po}
    "  Date ${moment().format("LL")}`;
    worksheet.getCell("A1").alignment = { horizontal: "left" };

    worksheet.mergeCells("A3", "B3");
    worksheet.getCell("A3").value = `SN Mesin : ${
      dataAllProps?.dataMesin[0]?.snMesin === null
        ? "-"
        : dataAllProps?.dataMesin[0]?.snMesin
    }`;
    worksheet.getCell("A3").alignment = { horizontal: "left" };

    worksheet.mergeCells("A4", "B4");
    worksheet.getCell("A4").value = `Model : ${
      dataAllProps?.mesin?.type === undefined ? "-" : dataAllProps?.mesin?.type
    }`;
    worksheet.getCell("A4").alignment = { horizontal: "left" };

    worksheet.mergeCells("A5", "B5");
    worksheet.getCell("A5").value = `PN System : ${
      dataAllProps?.part_number === undefined ? "-" : dataAllProps?.part_number
    }`;
    worksheet.getCell("A5").alignment = { horizontal: "left" };

    worksheet.mergeCells("A6", "B6");
    worksheet.getCell("A6").value = `PIC Staging    : ${
      dataAllProps?.pic_staging.name === undefined
        ? "-"
        : dataAllProps?.pic_staging.name
    }`;
    worksheet.getCell("A6").alignment = { horizontal: "left" };

    if (props?.dataHeader?.model?.id === 5) {
      worksheet.mergeCells("C3", "D3");
      worksheet.getCell("C3").value = `OK   : ${
        gAllCount?.data_ok === null ? "-" : gAllCount?.data_ok
      }`;
      worksheet.mergeCells("C4", "D4");
      worksheet.getCell("C4").value = `NG    : ${
        gAllCount?.data_ng === null ? "-" : gAllCount?.data_ng
      }`;
      worksheet.mergeCells("C5", "D5");
      worksheet.getCell("C5").value = `NA   : ${
        gAllCount?.data_na === null ? "-" : gAllCount?.data_na
      }`;
      worksheet.getCell("C4").alignment = { horizontal: "left" };
    } else if (props?.dataHeader?.model?.id === 1 || 2 || 3 || 4) {
      worksheet.mergeCells("C3", "D3");
      worksheet.getCell("C3").value = `OK   : ${ok === null ? "-" : ok}`;
      worksheet.mergeCells("C4", "D4");
      worksheet.getCell("C4").value = `NG    : ${ng === null ? "-" : ng}`;
      worksheet.getCell("C4").alignment = { horizontal: "left" };
    }

    /* Header Table */
    if (props?.dataHeader?.model?.id === 5) {
      worksheet.getCell("A9").value = "NO";
      worksheet.getCell("A9").alignment = { horizontal: "center" };

      worksheet.getCell("B9").value = "Unit";
      worksheet.getCell("B9").alignment = { horizontal: "center" };

      worksheet.getCell("C9").value = "Check Point";
      worksheet.getCell("C9").alignment = { horizontal: "center" };

      worksheet.getCell("D9").value = "Part Number";
      worksheet.getCell("D9").alignment = { horizontal: "center" };
      worksheet.getCell("E9").value = "(Rev) Final ";
      worksheet.getCell("E9").alignment = { horizontal: "center" };
      worksheet.getCell("F9").value = "(Rev) row ";
      worksheet.getCell("F9").alignment = { horizontal: "center" };
      worksheet.getCell("G9").value = "Serial Number ";
      worksheet.getCell("G9").alignment = { horizontal: "center" };
      worksheet.getCell("H9").value = "Result ";
      worksheet.getCell("H9").alignment = { horizontal: "center" };
      worksheet.getCell("I9").value = "Inspector Sign";
      worksheet.getCell("I9").alignment = { horizontal: "center" };
      worksheet.getCell("J9").value = "Fix Description ";
      worksheet.getCell("J9").alignment = { horizontal: "center" };

      worksheet.getRow(8).values = [""];
      worksheet.columns = [
        { key: "data_a", width: 5 },
        { key: "data_b", width: 20 },
        { key: "data_c", width: 110 },
        { key: "data_d", width: 12 },
        { key: "data_e", width: 10 },
        { key: "data_f", width: 10 },
        { key: "data_g", width: 15 },
        { key: "data_h", width: 15 },
        { key: "data_i", width: 15 },
        { key: "data_j", width: 15 },
      ];
    } else if (props?.dataHeader?.model?.id === 1 || 2 || 3 || 4) {
      worksheet.getCell("A9").value = "NO";
      worksheet.getCell("A9").alignment = { horizontal: "center" };

      worksheet.getCell("B9").value = "Name";
      worksheet.getCell("B9").alignment = { horizontal: "center" };

      worksheet.getCell("C9").value = "Test";
      worksheet.getCell("C9").alignment = { horizontal: "center" };

      worksheet.getCell("D9").value = "Expected result or result details ";
      worksheet.getCell("D9").alignment = { horizontal: "center" };
      worksheet.getCell("E9").value = "Result ";
      worksheet.getCell("E9").alignment = { horizontal: "center" };
      worksheet.getCell("F9").value = "Problem ";
      worksheet.getCell("F9").alignment = { horizontal: "center" };
      worksheet.getCell("G9").value = "Action ";
      worksheet.getCell("G9").alignment = { horizontal: "center" };
      worksheet.getCell("H9").value = "Remake ";
      worksheet.getCell("H9").alignment = { horizontal: "center" };

      worksheet.getRow(8).values = [""];
      worksheet.columns = [
        { key: "data_a", width: 5 },
        { key: "data_b", width: 21 },
        { key: "data_c", width: 135 },
        { key: "data_d", width: 92 },
        { key: "data_e", width: 40 },
        { key: "data_f", width: 20 },
        { key: "data_g", width: 20 },
        { key: "data_h", width: 20 },
      ];
    }

    if (props?.dataHeader?.model?.id === 5) {
      datasMP400.forEach((data, index) => {
        worksheet.addRow({
          data_a: `${index + 1}.`,
          data_b: data?.unit === null ? "-" : data?.unit,
          data_c: data?.checkpoint_desc === null ? "-" : data?.checkpoint_desc,
          data_d: data?.part_number === null ? "-" : data?.part_number,
          data_e: data?.rev_final === null ? "-" : data?.rev_final,
          data_f: "-",
          data_g:
            data?.detail_checklist?.sn_part === null
              ? "-"
              : data?.detail_checklist?.sn_part,
          data_h:
            data?.detail_checklist?.results === null
              ? "-"
              : data?.detail_checklist?.results,
          data_i:
            data?.detail_checklist?.inspector_sign === null
              ? "-"
              : data?.detail_checklist?.inspector_sign,
          data_j:
            data?.detail_checklist?.fix_description === null
              ? "-"
              : data?.detail_checklist?.fix_description,
        });
      });
    } else {
      data.forEach((data, index) => {
        worksheet.addRow({
          data_a: `${index + 1}.`,
          data_b: data?.name === "" ? "-" : data?.name,
          // data_c:
          //   data?.fill_description?.description === null ? '-' : data?.fill_description?.description,
          data_c: data?.test_desc,
          data_d: data?.result_detail,
          data_e:
            data?.result_detail === "M/B Bios Version= "
              ? data?.detail_staging?.fill_columns
              : data?.result_detail === "VDisplay"
              ? data?.detail_staging?.fill_columns === null
                ? null
                : [
                    data?.detail_staging?.fill_columns[0] === null ||
                    undefined ||
                    ""
                      ? "-"
                      : data?.detail_staging?.fill_columns[0],
                    data?.detail_staging?.fill_columns[1] === null ||
                    undefined ||
                    ""
                      ? "-"
                      : data?.detail_staging?.fill_columns[1],
                  ].join(", ")
              : data?.result_detail === "attach here the vesion" ||
                data?.result_detail ===
                  "attach here the version information paper"
              ? data?.detail_staging?.fill_columns === null || undefined
                ? "-"
                : "-"
              : data?.result_detail ===
                "BCU: BCU20 / BCU24 / BCU53 / BCU54 / BCU"
              ? data?.detail_staging?.fill_columns?.description === null
                ? "-"
                : data?.detail_staging?.fill_columns?.description
              : data?.result_detail === "Dev. 1,2,3,4,5" ||
                data?.result_detail === "Dev. 1,2,3,4,5,6" ||
                data?.result_detail === "Dev. 1,2,3,4,5,6,7"
              ? data?.detail_staging?.fill_columns === null
                ? null
                : [
                    data?.detail_staging?.fill_columns[0]?.description ===
                      null ||
                    undefined ||
                    ""
                      ? "-"
                      : data?.detail_staging?.fill_columns[0]?.description,
                    data?.detail_staging?.fill_columns[1]?.description ===
                      null ||
                    undefined ||
                    ""
                      ? "-"
                      : data?.detail_staging?.fill_columns[1]?.description,
                    data?.detail_staging?.fill_columns[2]?.description ===
                      null ||
                    undefined ||
                    ""
                      ? "-"
                      : data?.detail_staging?.fill_columns[2]?.description,
                    data?.detail_staging?.fill_columns[3]?.description ===
                      null ||
                    undefined ||
                    ""
                      ? "-"
                      : data?.detail_staging?.fill_columns[3]?.description,
                    data?.detail_staging?.fill_columns[4]?.description ===
                      null ||
                    undefined ||
                    ""
                      ? "-"
                      : data?.detail_staging?.fill_columns[4]?.description,
                  ].join(", ")
              : data?.result_detail ===
                  "1.Booting time: Min. Sec. \n2.Check the Holding/Grapic status \n3.Use stand by switch in system and P/S" ||
                data?.result_detail ===
                  "1.Booting time: Min. Sec. \r\n2.Check the Holding/Grapic status \r\n3.Use stand by switch in system and P/S"
              ? data?.detail_staging?.fill_columns === null
                ? null
                : [
                    data?.detail_staging?.fill_columns[0],
                    data?.detail_staging?.fill_columns[1],
                    data?.detail_staging?.fill_columns[2],
                    data?.detail_staging?.fill_columns[3],
                  ].join(", ")
              : data?.result_detail ===
                  "1.Booting time: Min. Sec. \n2.Use stand by switch in system and P/S" ||
                data?.result_detail ===
                  "1.Booting time: Min. Sec. \r\n2.Use stand by switch in system and P/S"
              ? data?.detail_staging?.fill_columns === null
                ? null
                : [
                    data?.detail_staging?.fill_columns[0],
                    data?.detail_staging?.fill_columns[1],
                    data?.detail_staging?.fill_columns[2],
                    data?.detail_staging?.fill_columns[3],
                  ].join(", ")
              : data?.detail_staging?.results === undefined ||
                data?.detail_staging?.results === null
              ? "-"
              : data?.detail_staging?.results,
          data_f:
            data?.detail_staging?.problem?.description === undefined ||
            data?.detail_staging?.problem?.description === null
              ? "-"
              : data?.detail_staging?.problem?.description,
          data_g:
            data?.detail_staging?.action?.description === undefined ||
            data?.detail_staging?.action?.description === null
              ? "-"
              : data?.detail_staging?.action?.description,
          data_h:
            data?.detail_staging?.remark?.description === undefined ||
            data?.detail_staging?.remark?.description === null
              ? "-"
              : data?.detail_staging?.remark?.description,
        });
      });
    }

    (async () => {
      const buffer = await workbook.xlsx.writeBuffer();
      const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      const fileExtension = ".xlsx";

      const blob = new Blob([buffer], { type: fileType });

      saveAs(
        blob,
        `Pre Staging No PO_${dataHeader?.no_po} ${moment().format(
          "LL"
        )}${fileExtension}`
      );
    })();
  }
  return (
    <div className="flex justify-center">
      <Button color="success" onClick={downloadPDF} variant="contained">
        <PrintIcon className="mr-2" />
        Export PDF
      </Button>
      <Button color="primary" onClick={exportExcel} variant="contained">
        <PrintIcon className="mr-2" />
        Export Excel
      </Button>
    </div>
  );
};

export default HandlePrint;
