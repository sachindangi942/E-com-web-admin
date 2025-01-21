import React, { useEffect, useState } from 'react';
import { DOMAIN } from '../components/MyForms/Configs';
import { Col, Container, Row } from 'react-bootstrap';
import { Button, Card, Image, notification, Modal, Spin } from 'antd';
import Meta from 'antd/es/card/Meta';
import { PlusOutlined, MinusOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../Redux/Fetures/CartSlice';
import { fetchCartData, updateProductQuantity } from '../components/Utils/CartApiUtils';

export const Cart = () => {
    const dispatch = useDispatch();
    let token = useSelector(state => state.auth.token);
    token = JSON.parse(token);
    const [cartData, setCardData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalBill, setTotalBill] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [productToRemove, setProductToRemove] = useState(null);
    const [buttonLoadin, setButtonLoading] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { updatedData, totalBill } = await fetchCartData(token, DOMAIN);
                setTotalBill(totalBill);
                setCardData(updatedData);
                setLoading(false);
            } catch (error) {
                console.log("fetchin cart data error", error);
                setLoading(false);
            }
        };
        fetchData();
    }, [token]);

    const handleQuantityChange = async (_id, delta) => {
        try {
            setButtonLoading((prev) => ({ ...prev, [_id]: true }))
            await updateProductQuantity(_id, delta, token, DOMAIN, setCardData, setTotalBill);
        } catch (error) {
            console.log(error);
        } finally {
            setButtonLoading((prev) => ({ ...prev, [_id]: false }));
        }

    };

    const showModal = (product) => {
        setProductToRemove(product);
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        if (productToRemove) {
            await RemoveProducts(productToRemove);
        }
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const RemoveProducts = async ({ _id }) => {
        try {
            await axios.post(`${DOMAIN}products/removecart`, { _id }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            notification.success({
                message: 'Item Removed',
                description: 'Product removed from your cart.',
                placement: 'topRight',
                duration: 2,
            });
            setCardData((prevData) => {
                const updatedData = prevData.filter(item => item._id !== _id);
                setTotalBill(updatedData.reduce((sum, item) => sum + item.price * item.quantity, 0));
                return updatedData;
            });
            dispatch(removeFromCart(_id));
        } catch (err) {
            notification.error({
                message: 'Server Error',
                description: 'Cart data fetching failed.',
                placement: 'topRight',
                duration: 3,
            });
        }
    };

    return (
        <Container fluid className="mt-4">
            {loading ? (
                <div className="text-center" style={{ marginTop: '180px' }}>
                    <Spin size="large" />
                </div>
            ) : (
                <Row>
                    <Col xs={12} sm={6} md={6} lg={6}>
                        <Row className="g-4">
                            {cartData.map((obj, index) => (
                                <Col xs={12} key={index}>
                                    <Card
                                        hoverable
                                        className="product-card shadow-sm rounded "
                                        cover={
                                            <Image
                                                height={200}
                                                width="100%"
                                                alt={obj.name}
                                                src={obj.image}
                                                style={{ objectFit: 'fill' }}
                                            />
                                        }
                                    >
                                        <Meta
                                            title={obj.name}
                                            description={obj.description.substring(0, 500) + '...'}
                                        />
                                        <div className="text-center mt-2 fw-bold text-danger">
                                            ₹{obj.price} x {obj.quantity}
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mt-2">
                                            {obj.quantity > 1 ? (
                                                <Button
                                                    disabled={buttonLoadin[obj._id]}
                                                    icon={buttonLoadin[obj._id] ? <Spin indicator={<LoadingOutlined />} /> : <MinusOutlined />}
                                                    type="primary"
                                                    danger
                                                    onClick={() => handleQuantityChange(obj._id, -1)}
                                                />
                                            ) : (
                                                <Button
                                                    icon={<DeleteOutlined />}
                                                    type="primary"
                                                    danger
                                                    onClick={() => showModal(obj)}
                                                />
                                            )}
                                            <div className="px-3 fw-bold text-secondary">
                                                {obj.quantity}
                                            </div>
                                            <Button
                                                disabled={buttonLoadin[obj._id]}
                                                icon={buttonLoadin[obj._id] ? <Spin indicator={<LoadingOutlined />} /> : <PlusOutlined />}
                                                type="primary"
                                                onClick={() => handleQuantityChange(obj._id, 1)}
                                            />
                                        </div>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={6}>
                        <div className="p-3 shadow-sm rounded bg-light">
                            <h4 className="text-center text-dark mb-3">Total Bill</h4>
                            <p className="fs-5 fw-bold text-center text-danger">
                                Total Bill: ₹{totalBill}
                            </p>
                            <Button
                                type="primary"
                                className="w-100 btn-view-details"
                            >
                                Pay
                            </Button>
                        </div>
                    </Col>
                </Row>
            )}

            <Modal
                title="Are you sure you want to remove this product?"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Yes"
                cancelText="No"
            >
                <p>Click Yes to confirm the removal of the product.</p>
            </Modal>
        </Container>
    );
};
