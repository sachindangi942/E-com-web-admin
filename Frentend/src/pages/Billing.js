import { Button, Form,} from "antd";
import { Col, Container, Row } from "react-bootstrap";
import { MyForms } from "../components/MyForms/MyForms";
import { useSelector } from "react-redux";
import { MyTables } from "../components/MyTables/MyTables";

export const Billing = () => {
    const { products } = useSelector(state => state.product);
    const [form] = Form.useForm();

    const productOptions = Array.isArray(products)
        ? products.map((product, index) => ({
            value: product._id || index,
            label: product.name || "Unknown",
            price: product.price || "0"
        }))
        : [];

    const handleProductChange = (Values) => {
        const selectedProduct = productOptions.find(product => product.value === Values);
        if (selectedProduct) form.setFieldsValue({ price: selectedProduct.price })
    }

    const handleForm = (values) => {
        console.log("Form Values:", values);
        form.resetFields();
    };

    return (
        <Container fluid className="py-4">
            <Row>
                <Col xs={12} md={5} lg={4} className="mb-4">
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
                        <Button type="primary" htmlType="submit" className="w-100 btn btn-info">
                            Add Products
                        </Button>
                    </MyForms>
                </Col>
                <Col xs={12} md={7} lg={8}>
                   <MyTables 
                   
                   />
                </Col>
            </Row>
        </Container>
    );
};
