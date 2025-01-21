import { Form, Input } from "antd"

export const MyForms = (form) => {
    return (
        <Form form={form} layout="vertical" name="editProductForm">
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please enter the product name!' }]}
            >
                <Input placeholder="Enter product name" />
            </Form.Item>
            <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: 'Please enter the price!' }]}
            >
                <Input placeholder="Enter product price" />
            </Form.Item>
            <Form.Item
                label="Quantity"
                name="quantity"
                rules={[{ required: true, message: 'Please enter the quantity!' }]}
            >
                <Input placeholder="Enter product quantity" />
            </Form.Item>
        </Form>
    )
}

