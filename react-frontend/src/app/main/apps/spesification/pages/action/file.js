/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
const { showMessage } = require('app/store/fuse/messageSlice');
const { useEffect } = require('react');

const dataLopp = [];
const dataHeader = [];
const data = [];
const body = [];

useEffect(() => {
  if (dataHeader?.model?.id === 5) {
    // setBodyPdf(null);
    if (data?.length !== 0) {
      for (let index = 0; index < data?.length; index++) {
        dataLopp.push({
          ...body,
          name:
            index === 3
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                ]
              : index === 4
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                ]
              : index === 5
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                  data[index]?.fill_description[2]?.description,
                  data[index]?.fill_description[3]?.description,
                ]
              : index === 12
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                ]
              : index === 21
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                ]
              : // : index === 30
                // ? data[index]?.fill_description?.description,
                data[index]?.fill_description || data[index]?.fill_description?.description,
        });
      }
    }
  } else if (dataHeader?.model?.id === 2) {
    // setBodyPdf(null);
    if (data?.length !== 0) {
      for (let index = 0; index < data.length; index++) {
        dataLopp.push({
          ...body,
          name:
            index === 3
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                ]
              : index === 4
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                ]
              : index === 5
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                  data[index]?.fill_description[2]?.description,
                  data[index]?.fill_description[3]?.description,
                ]
              : index === 11
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                ]
              : index === 12
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                ]
              : index === 13
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                ]
              : index === 14
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                ]
              : index === 17
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                  data[index]?.fill_description[2]?.description,
                ]
              : index === 23
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                ]
              : index === 31
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                  data[index]?.fill_description[2]?.description,
                ]
              : // : index === 30
                // ? data[index]?.fill_description?.description,
                data[index]?.fill_description || data[index]?.fill_description?.description,
        });
      }
    }
  } else if (
    dataHeader?.model?.id === 4 ||
    dataHeader?.model?.id === 6 ||
    // dataHeader?.model?.id === 7 ||
    dataHeader?.model?.id === 8
  ) {
    // setBodyPdf(null);
    if (data?.length !== 0) {
      for (let index = 0; index < data.length; index++) {
        dataLopp.push({
          ...body,
          name:
            index === 3
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                ]
              : index === 4
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                ]
              : index === 5
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                  data[index]?.fill_description[2]?.description,
                  data[index]?.fill_description[3]?.description,
                ]
              : index === 11
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                ]
              : index === 12
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                ]
              : index === 13
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                ]
              : index === 12
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                ]
              : index === 15
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                ]
              : index === 19
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                  data[index]?.fill_description[2]?.description,
                ]
              : index === 27
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                ]
              : index === 35
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                  data[index]?.fill_description[2]?.description,
                ]
              : data[index]?.fill_description || data[index]?.fill_description?.description,
        });
      }
    }
  } else if (dataHeader?.model?.id === 7) {
    if (data?.length !== 0) {
      for (let index = 0; index < data.length; index++) {
        dataLopp.push({
          ...body,
          name:
            index === 3
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                ]
              : index === 4
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                ]
              : index === 5
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                  data[index]?.fill_description[2]?.description,
                  data[index]?.fill_description[3]?.description,
                ]
              : index === 11
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                ]
              : index === 12
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                ]
              : index === 13
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                ]
              : index === 12
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                ]
              : index === 15
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                ]
              : index === 19
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                  data[index]?.fill_description[2]?.description,
                ]
              : index === 27
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                ]
              : index === 35
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                  data[index]?.fill_description[2]?.description,
                ]
              : index === 39
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                  data[index]?.fill_description[2]?.description,
                ]
              : index === 40
              ? [
                  data[index]?.fill_description[0]?.description,
                  data[index]?.fill_description[1]?.description,
                ]
              : data[index]?.fill_description || data[index]?.fill_description?.description,
        });
      }
    }
  } else {
    dispatchEvent(
      showMessage({
        message: `Mesin ${dataHeader?.model?.name} The format doesn't exist yet from Datindo!`,
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        variant: 'warning',
      })
    );
  }
  const newData = [];
  if (dataLopp.length !== 0) {
    dataLopp.map((item, index) => {
      if (item?.name && !Array.isArray(item?.name)) {
        newData.push(item?.name?.description);
      } else if (Array.isArray(item?.name)) {
        newData.push(item?.name.join(', '));
      } else {
        newData.push('-');
      }
      //   setBodyPdf(newData);
    });
    // console.log(dataLopp, 'dataLopp')
    // console.log(newData, 'newData')
  }
  // console.log(dataLopp, 'dataLoop');
}, [data, dataHeader?.model?.id]);
