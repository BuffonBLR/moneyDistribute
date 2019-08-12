import React, { Component } from "react";

const GenerateService = {
  generateTable: function(users) {
    let table = [];
    let header = [
      {title: 'Name', dataIndex: 'name', key: 'name'}, 
      {title: 'Summ', dataIndex: 'summ', key: 'summ'},
      {title: 'Diff', dataIndex: 'diff', key: 'diff'}
    ];
    users.forEach(el1 => {
      let obj2 = {};
      users.forEach(el2 => {
        let property = el2.key;
        obj2[property] = {value: 0, isInclude: true};
      });
      var obj1 = {key: el1.key, name: el1.name, summ: 0, diff: 0};
      let obj3 = {...obj1, ...obj2}
      table.push(obj3);
      header.push({
        title: el1.name, 
        dataIndex: el1.key, 
        key: el1.key,
        render: (obj) => {
          let color = obj.isInclude ? 'black' : 'grey';
          return (
            <span color={color}>
              {obj.value}
            </span>
          )
        }
      });
    });
    return {header: header, dataTable: table};
  },

  addMoneyToUser: function(dataTable, users, user, value) {
    let totalMoneySumm = 0;
    let averageСheck = 0;
    dataTable.forEach(element => {
      if(element.key === user.key) {
        element.summ = parseInt(value);
        users.forEach(item => {
          let property = item.key;
          element[property] = {value: value/users.length, isInclude: true};
        });
      }
      totalMoneySumm += (typeof element.summ === 'number') ? element.summ : 0;
    });
    averageСheck = totalMoneySumm/dataTable.length;
    dataTable.forEach(element => {
      element.diff = element.summ - averageСheck;
    });

    console.log(dataTable);
    return {dataTable: dataTable, totalMoneySumm: totalMoneySumm, averageСheck: averageСheck};
  }
};

export default GenerateService;
