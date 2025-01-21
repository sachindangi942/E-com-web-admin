import { Button, Card, Image, notification, } from "antd";
import Meta from "antd/es/card/Meta";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { AddToCardUtil } from "../components/Utils/AddToCartUtils";
import { DOMAIN } from "../components/MyForms/Configs";
import { addToCart } from "../Redux/Fetures/CartSlice";
import { Link } from "react-router-dom";

export const ViewDetails = () => {
    const dispatch = useDispatch();
    const ProductDetails = useSelector(state => state.cart.Details);
    const {Product}  = useSelector((state)=>state.cart)
    let token = useSelector(state => state.auth.token);
    token = JSON.parse(token);

    const handleAddToCard = async () => {
        try {
            const { data } = await AddToCardUtil(DOMAIN, token, ProductDetails);
            dispatch(addToCart(data));
            notification.success({
                message: 'Product Added',
                description: 'Product added to cart',
                placement: 'topRight',
                duration: 3,
            });
        } catch (error) {
            console.log(error)
            notification.error({
                message: 'Server Error',
                description: 'Something went wrong',
                placement: 'topRight',
                duration: 3,
            });
        }
    }

    return (
        <Container fluid className="mt-4">
            <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                    <Row className="g-4">
                        <Col xs={12} sm={6} md={6} lg={6}>
                            <Card
                                hoverable
                                className="product-card shadow-sm rounded "
                                cover={
                                    <Image
                                        width="100%"
                                        height={400}
                                        alt={ProductDetails.name}
                                        src={ProductDetails.image}

                                    />
                                }
                            >
                            </Card>
                        </Col>

                        <Col xs={12} sm={6} md={6} lg={6}>
                            <Meta
                                className="fw-bolder fs-5"
                                title={ProductDetails.name}
                            />
                            <p>description : {ProductDetails.description}</p>
                            <div
                                className="mt-10 fw-bolder fs-5 text-danger text-center"
                            >
                                ₹{ProductDetails.price}
                            </div>
                            <Button
                            className = {!Product.find((item)=> item.id === ProductDetails._id)?
                                 "bg-warning btn-warning rounded-pill w-100 rounded" :
                                 "rounded rounded-pill w-100 fw-bold text-muted"
                                }
                                onClick={() => {
                                    if (!Product.find((item)=> item.id === ProductDetails._id)) {
                                        handleAddToCard();
                                    }
                                }}
                            >
                                {Product.find((item)=> item.id === ProductDetails._id) ? <Link to={"/cartdata"}
                                className=" w-100 text-decoration-none text-info"
                                >
                                    Edit in Cart
                                </Link> : 'Add to Cart'}
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}