import { Table } from "antd"

export const MyTables =({columns,data})=>{
    return <Table columns={columns} dataSource={data} />
}