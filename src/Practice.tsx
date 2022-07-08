import { useState, useEffect } from "react";

const Practice = () => {
  const [myName, setMyName] = useState([]);

  const dummyArr = [
    {
      name: "ron",
      lastname: "hey",
    },
    { name: "hila", lastname: "hey" },
  ];

  const ronName = useEffect(() => {
    const convertArrayToObject = (array, key) => {
      const initialValue = {};
      const obj = array.reduce((obj, item) => {
        return {
          ...obj,
          [item[key]]: item,
        };
      }, initialValue);
      return obj;
    };
    const countriesObj = convertArrayToObject(dummyArr, "name");
    setMyName(countriesObj.ron.name);
  }, [myName, dummyArr]);

  console.log(myName);

  // const theObjName = () => {
  //   return myName.map((item, index) => {
  //     let theName = countriesObj[item.hila]?.name || ''
  //     return theName;
  //   });
  // };
  // console.log(theObjName);
  return <div>{myName}</div>;
};

export default Practice;
