// import { Button, Card, Form, Popconfirm, Space } from "antd";
// import { Col, Container, Row } from "react-bootstrap";
// import { MyForms } from "../components/MyForms/MyForms";
// import { useDispatch, useSelector } from "react-redux";
// import { MyTables } from "../components/MyTables/MyTables";
// import { useState } from "react";
// import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
// import { BillData } from "../Redux/Fetures/ProductsSlice";

// export const Billing = () => {
//     const dispatch = useDispatch();
//     const { products } = useSelector(state => state.product);
//     const [form] = Form.useForm();
//     const [billData, setBillData] = useState([]);
//     const [editingKey, setEditingKey] = useState(null);

//     const productOptions = Array.isArray(products)
//         ? products.map((product, index) => ({
//             value: product.name || index,
//             label: product.name || "Unknown",
//             price: product.price || "0"
//         }))
//         : [];

//     const handleProductChange = (Values) => {
//         const selectedProduct = productOptions.find(product => product.value === Values);
//         if (selectedProduct) form.setFieldsValue({ price: selectedProduct.price });
//     };

//     const handleForm = (values) => {
//         const totalPrice = values.price * values.quantity;

//         if (editingKey !== null) {
//             setBillData((prevData) =>
//                 prevData.map((item) =>
//                     item.key === editingKey
//                         ? { ...item, ...values, Totaleprice: totalPrice }
//                         : item
//                 )
//             );
//             setEditingKey(null);
//         } else {
//             dispatch(BillData(
//                 {

//                     product: values.Product,
//                     price: values.price,
//                     quantity: values.quantity,
//                     Totaleprice: totalPrice,
//                 }
//             ))
//             setBillData((prevData) => [
//                 ...prevData,
//                 {
//                     key: prevData.length + 1,
//                     product: values.Product,
//                     price: values.price,
//                     quantity: values.quantity,
//                     Totaleprice: totalPrice,
//                 },
//             ]);
//         }

//         form.resetFields();
//     };

//     const handleDelete = (key) => {
//         setBillData((prevData) => prevData.filter((item) => item.key !== key));
//     };

//     const handleEdit = (record) => {
//         form.setFieldsValue({
//             Product: record.product,
//             price: record.price,
//             quantity: record.quantity,
//         });
//         setEditingKey(record.key);
//     };

//     const totalBill = billData.reduce((acc, item) => acc + item.Totaleprice, 0);

//     return (
//         <Container fluid className="py-4">
//             <Row>
//                 <Col xs={12} md={5} lg={4} className="mb-4">
//                     <MyForms
//                         form={form}
//                         onFinish={handleForm}
//                         fields={[
//                             {
//                                 name: "Product",
//                                 label: "Product",
//                                 type: "select",
//                                 options: productOptions,
//                                 showSearch: true,
//                                 placeholder: "Select a product",
//                                 filterOption: (input, option) =>
//                                     option && option.children
//                                         ? option.children.toLowerCase().includes(input.toLowerCase())
//                                         : false,
//                                 onChange: handleProductChange,
//                                 rules: [{ required: true, message: "Please select the product!" }],
//                             },
//                             {
//                                 name: "price",
//                                 label: "Price",
//                                 placeholder: "Enter product price",
//                                 disabled: true,
//                                 rules: [{ required: true, message: "Please enter the price!" }],
//                             },
//                             {
//                                 name: "quantity",
//                                 label: "Quantity",
//                                 placeholder: "Enter product quantity",
//                                 rules: [{ required: true, message: "Please enter the quantity!" }],
//                             },
//                         ]}
//                     >
//                         <div className="d-flex justify-content-between gap-2">
//                             <Button type="primary" htmlType="submit" className="w-50 btn btn-secondary">
//                                 {editingKey !== null ? "Update Product" : "Add Product"}
//                             </Button>
//                             <Button type="primary" className="w-50 btn btn-secondary">
//                                Generate Bill
//                             </Button>
//                         </div>
//                     </MyForms>
//                 </Col>

//                 <Col xs={12} md={7} lg={8}>
//                     <MyTables
//                         columns={[
//                             { title: "Product", dataIndex: "product", key: "product" },
//                             { title: "Price", dataIndex: "price", key: "price" },
//                             { title: "Quantity", dataIndex: "quantity", key: "quantity" },
//                             { title: "Total Price", dataIndex: "Totaleprice", key: "Totaleprice" },
//                             {
//                                 title: "Actions",
//                                 key: "actions",
//                                 render: (text, record) => (
//                                     <Space size="middle">
//                                         {/* <Button type="link" onClick={() => handleEdit(record)}>
//                                             <EditOutlined/>
//                                         </Button> */}
//                                         <EditOutlined type="link" onClick={() => handleEdit(record)} />
//                                         <Popconfirm
//                                             title="Are you sure to delete this product?"
//                                             onConfirm={() => handleDelete(record.key)}
//                                             okText="Yes"
//                                             cancelText="No"
//                                         >
//                                             <DeleteOutlined />
//                                         </Popconfirm>
//                                     </Space>
//                                 ),
//                             },
//                         ]}
//                         data={billData}
//                     />

//                     <Card
//                         className="mt-3 text-end fw-bold fs-5 border border-secondary rounded"
//                         styles={{ backgroundColor: "#f8f9fa", padding: "15px" }}
//                     >
//                         Total Bill: ₹{totalBill}
//                     </Card>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };





import { Button, Card, Form, Popconfirm, Space } from "antd";
import { Col, Container, Row } from "react-bootstrap";
import { MyForms } from "../components/MyForms/MyForms";
import { useDispatch, useSelector } from "react-redux";
import { MyTables } from "../components/MyTables/MyTables";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { BillData } from "../Redux/Fetures/ProductsSlice";

export const Billing = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.product);
    const [form] = Form.useForm();
    const [billData, setBillData] = useState([]);
    const [editingKey, setEditingKey] = useState(null);
    const [showBill, setShowBill] = useState(false); // State to toggle bill view

    const productOptions = Array.isArray(products)
        ? products.map((product, index) => ({
            value: product.name || index,
            label: product.name || "Unknown",
            price: product.price || "0"
        }))
        : [];

    const handleProductChange = (Values) => {
        const selectedProduct = productOptions.find(product => product.value === Values);
        if (selectedProduct) form.setFieldsValue({ price: selectedProduct.price });
    };

    const handleForm = (values) => {
        const totalPrice = values.price * values.quantity;

        if (editingKey !== null) {
            setBillData((prevData) =>
                prevData.map((item) =>
                    item.key === editingKey
                        ? { ...item, ...values, Totaleprice: totalPrice }
                        : item
                )
            );
            setEditingKey(null);
        } else {
            dispatch(BillData({
                product: values.Product,
                price: values.price,
                quantity: values.quantity,
                Totaleprice: totalPrice,
            }));
            setBillData((prevData) => [
                ...prevData,
                {
                    key: prevData.length + 1,
                    product: values.Product,
                    price: values.price,
                    quantity: values.quantity,
                    Totaleprice: totalPrice,
                },
            ]);
        }

        form.resetFields();
    };

    const handleDelete = (key) => {
        setBillData((prevData) => prevData.filter((item) => item.key !== key));
    };

    const handleEdit = (record) => {
        form.setFieldsValue({
            Product: record.product,
            price: record.price,
            quantity: record.quantity,
        });
        setEditingKey(record.key);
    };

    const totalBill = billData.reduce((acc, item) => acc + item.Totaleprice, 0);

    return (
        <Container fluid className="py-4">
            <Row>
                <Col xs={12} md={5} lg={4} className="mb-4">
                    {!showBill && (
                        <MyForms
                            form={form}
                            onFinish={handleForm}
                            fields={[
                                {
                                    name: "Product",
                                    label: "Product",
                                    type: "select",
                                    options: productOptions,
                                    showSearch: true,
                                    placeholder: "Select a product",
                                    filterOption: (input, option) =>
                                        option && option.children
                                            ? option.children.toLowerCase().includes(input.toLowerCase())
                                            : false,
                                    onChange: handleProductChange,
                                    rules: [{ required: true, message: "Please select the product!" }],
                                },
                                {
                                    name: "price",
                                    label: "Price",
                                    placeholder: "Enter product price",
                                    disabled: true,
                                    rules: [{ required: true, message: "Please enter the price!" }],
                                },
                                {
                                    name: "quantity",
                                    label: "Quantity",
                                    placeholder: "Enter product quantity",
                                    rules: [{ required: true, message: "Please enter the quantity!" }],
                                },
                            ]}
                        >
                            <div className="d-flex justify-content-between gap-2">
                                <Button type="primary" htmlType="submit" className="w-50 btn btn-secondary">
                                    {editingKey !== null ? "Update Product" : "Add Product"}
                                </Button>
                                <Button
                                    type="primary"
                                    className="w-50 btn btn-secondary"
                                    onClick={() => setShowBill(true)}
                                    disabled={billData.length === 0} 
                                >
                                    Generate Bill
                                </Button>
                            </div>
                        </MyForms>
                    )}
                </Col>

                <Col xs={12} md={7} lg={8}>
                    <MyTables
                        columns={[
                            { title: "Product", dataIndex: "product", key: "product" },
                            { title: "Price", dataIndex: "price", key: "price" },
                            { title: "Quantity", dataIndex: "quantity", key: "quantity" },
                            { title: "Total Price", dataIndex: "Totaleprice", key: "Totaleprice" },
                            {
                                title: "Actions",
                                key: "actions",
                                render: (text, record) => (
                                    <Space size="middle">
                                        <EditOutlined type="link" onClick={() => handleEdit(record)} />
                                        <Popconfirm
                                            title="Are you sure to delete this product?"
                                            onConfirm={() => handleDelete(record.key)}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <DeleteOutlined />
                                        </Popconfirm>
                                    </Space>
                                ),
                            },
                        ]}
                        data={billData}
                    />

                    {showBill && (
                        <Card
                            className="mt-3 text-end fw-bold fs-5 border border-secondary rounded"
                            style={{ backgroundColor: "#f8f9fa", padding: "15px" }}
                        >
                            Total Bill: ₹{totalBill}
                        </Card>
                    )}
                </Col>
            </Row>
        </Container>
    );
};
