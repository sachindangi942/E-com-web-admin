import axios from 'axios'
import { DOMAIN } from '../MyForms/Configs'
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import { Button, Card, Image, Spin } from 'antd';
import Meta from 'antd/es/card/Meta';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';



export const ProductList = (e) => {
    const [ProductList, setProductList] = useState([]);
    let token = useSelector((state) => state.auth.token)
    token = JSON.parse(token);
    const { loading } = useSelector(state => state.loading)

    const fetchData = useCallback(async () => {
        try {
            const res = await axios.post(`${DOMAIN}products/getProducts`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setProductList(res.data);
            console.log(res.data)
        } catch (error) {
            console.log("catchError", error)
        }

    }, [token])
    useEffect(() => {
        fetchData();
    }, [fetchData])
    return (
        <Container className="mt-4">
            {loading ? (
                <div className="text-center" style={{ marginTop: '180px' }}>
                    <Spin size="large" />
                </div>
            ) : (
                <Row className='g-4'>
                    <Col>
                        {
                            ProductList.map((obj, index) => (
                                <Col xs={12} sm={3} md={3} lg={3} key={index}>
                                    <Card
                                        hoverable
                                        className="product-card"
                                        style={{
                                            width: '100%',
                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                                            borderRadius: '10px',
                                            overflow: 'hidden',
                                        }}
                                        cover={
                                            <Image
                                                height={200}
                                                width="100%"
                                                alt={obj.Title}
                                                src={obj.Image}
                                                style={{ objectFit: 'fill' }}
                                            />
                                        }
                                    >
                                        <Meta
                                            title={obj.Title}
                                            description={obj.Description}
                                        />
                                        <div className="text-center mt-2 fw-bold text-danger">
                                            ₹{obj.Price} x {obj.Quantity}
                                        </div>
                                        <div
                                            className="mt-2 d-flex justify-content-between"
                                        >
                                            <Button>
                                                <DeleteOutlined className='text-danger' />
                                            </Button>
                                            <Button>
                                                <EditOutlined/>
                                            </Button>
                                        </div>
                                    </Card>
                                </Col>
                            ))}
                    </Col>
                </Row>
            )}
        </Container>
    )
}
