import React, { Component } from "react";
import users from "./data";
import { Table } from "antd";
import tableGenerator from "./../services/generate.service";
import UserCheckBoxGroup from "./CheckBoxGroup";
import { Checkbox, InputNumber, Row, Col } from 'antd';

const CheckboxGroup = Checkbox.Group;
class Layout extends Component {

  constructor() {
    super()
    this.state = {
      data: users,
      plainOptions: [],
      checkedList: [],
      columns: [],
      dataSource: [],
      total: 0,
      middle: 0
    }
  }

  addMoney = (currentUser, moneuCount) => {
    let tableData = tableGenerator.addMoneyToUser(this.state.dataSource, users, currentUser, moneuCount);
    this.setState({
      dataSource: tableData.dataTable,
      total: tableData.totalMoneySumm,
      middle: tableData.averageСheck
    });
  }

  createEmptyTable = () => {
    let userNames = users.map(function(el) {return el.name});
    let table = tableGenerator.generateTable(users);
    this.setState({
      columns: table.header,
      dataSource: table.dataTable,
      checkedList: userNames,
      plainOptions: userNames
    });
  }

  onChangeCheckbox = (element, value) => {
    this.setState({
      checkedList: value
    });
  };

  componentDidMount() {
    this.createEmptyTable();
  }

  render() {
    
    return (
      <div>
        
        <button className='button' onClick={this.createEmptyTable}>
          createEmptyTable
        </button>

        <div>TOTAL: {this.state.total}</div>
        <div>MIDLE: {this.state.middle}</div>

        <Table dataSource={this.state.dataSource} columns={this.state.columns} />

        {Array.from(this.state.dataSource, (el, i) =>
          <Row gutter={24} key={'form-money-' + el.key}>
            <Col span={4}>
              {el.name}</Col>
            <Col span={4}>
              <InputNumber
                defaultValue={0}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                onChange={value => this.addMoney(el, value)}
              />
            </Col>
            <Col span={16}>
            <Checkbox value="A">A</Checkbox>
              <CheckboxGroup
                options={this.state.plainOptions}
                value={this.state.checkedList}
                onChange={e => { 
                  this.onChangeCheckbox(el , e);
                }}
              />
            </Col>
          </Row>
          // <div key={'form-money-' + el.key}>
          //   {el.name}
          //   <input 
          //     type="number"
          //     id={'input-money-' + el.key} 
          //     key={'input-money-' + el.key} 
          //     onChange={(e) => this.addMoney(el, e.target.value)}>
          //   </input>
          //   <CheckboxGroup
          //     options={this.state.plainOptions}
          //     value={this.state.checkedList}
          //     onChange={this.onChange}
          //   />
          //   {/* <UserCheckBoxGroup></UserCheckBoxGroup> */}
          // </div> 
        )}
      </div>
    );
  }
}

export default Layout;
