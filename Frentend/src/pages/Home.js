// import React, { useCallback, useEffect, useState } from 'react';
// import axios from 'axios';
// import { Button, Card, Image, notification, Spin } from 'antd';
// import { Container, Row, Col } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import { DOMAIN } from '../components/MyForms/Configs';
// import { addToCart } from '../Redux/Fetures/CartSlice';
// import { fetchCartData } from '../components/Utils/CartApiUtils';
// import { DeleteOutlined, EditOutlined, } from '@ant-design/icons';
// import { DeleteProductUtils } from '../components/Utils/DeleteProductUtils';
// import { ConfirmationModal } from '../components/customConfirmation/Confirmation';
// import { UpdateProducts } from '../components/Utils/UpdateProducts';
// const { Meta } = Card;

// export const Home = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   let token = useSelector((state) => state.auth.token);
//   token = JSON.parse(token);
//   const dispatch = useDispatch();

//   const productData = useCallback(async () => {
//     try {
//       setLoading(true);
//       // const res = await axios.get("https://api.escuelajs.co/api/v1/products");
//       const res = await axios.post(`${DOMAIN}products/getProducts`, {}, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         }
//       });
//       setLoading(false);
//       setProducts(res.data);
//     } catch (error) {
//       setLoading(false);
//       notification.error({
//         message: 'Server Error',
//         description: 'Something went wrong',
//         placement: 'topRight',
//         duration: 3,
//       });
//     }
//   }, [token]);

//   const CartData = useCallback(async () => {
//     try {
//       const { updatedData, } = await fetchCartData(token, DOMAIN);
//       updatedData.forEach((product) => dispatch(addToCart(product)))
//     } catch (error) {
//       console.log("error", error);
//     }

//   }, [dispatch, token]);

//   const handleDelteProduct = useCallback(async () => {
//     try {
//       // console.log("selectedProduct",selectedProduct)
//       await DeleteProductUtils(token, selectedProduct);
//       await productData();
//       setIsModalVisible(false);
//       notification.success({
//         message: 'Product Deleted',
//         description: 'Product deleted successfully!',
//         placement: 'topRight',
//         duration: 3,
//       });
//     } catch (err) {
//       console.log(err)
//       notification.error({
//         message: 'Server Error',
//         description: 'Something went wrong',
//         placement: 'topRight',
//         duration: 3,
//       });
//     }
//   }, [token, productData, selectedProduct])

//   useEffect(() => {
//     productData();
//     CartData();
//   }, [productData, CartData]);



//   const showModal =(obj) => {
//     // console.log("showMOdel Obj",obj)
//     setSelectedProduct(obj);
//     setIsModalVisible(true);
//   };
//   const handleCancel = () => {
//     setSelectedProduct(null);
//     setIsModalVisible(false);
//   };

//   const UpdateProduct =async(obj)=>{
// try {
//   const data = await UpdateProducts(obj,token);
//   console.log(data)
// } catch (err) {
//   console.log("err",err)
// }
//   }

//   return (
//     <Container className="mt-4">
//       {loading ? (
//         <div style={{ textAlign: 'center', marginTop: '180px' }}>
//           <Spin size="large" />
//         </div>
//       ) : (
//         <Row className="g-4">
//           {products.map((obj, index) => (

//             <Col xs={12} sm={6} md={4} lg={3} key={index}>
//               <Card
//                 hoverable
//                 className="product-card"
//                 style={{
//                   width: '100%',
//                   boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
//                   borderRadius: '10px',
//                   overflow: 'hidden',
//                 }}
//                 cover={
//                   <Image
//                     width="100%"
//                     height={200}
//                     alt={obj.Title}
//                     src={obj.image}
//                     style={{ objectFit: 'cover' }}
//                   />
//                 }
//               >
//                 <Meta
//                   title={obj.name}
//                   description={
//                     obj.description.length > 50
//                       ? `${obj.description.substring(0, 50)}...`
//                       : obj.description
//                   }
//                 />

//                 <div
//                   style={{
//                     marginTop: 10,
//                     fontWeight: 'bold',
//                     fontSize: '16px',
//                     textAlign: 'center',
//                     color: '#ff5722',
//                   }}
//                 >
//                   Price ₹{obj.price}
//                 </div>
//                 <div className="text-center mt-2 fw-bold text-danger">
//                   Quantity {obj.quantity}
//                 </div>
//                 <div
//                   className=" d-flex justify-content-between mt-2"
//                 >
//                   <Button onClick={() => showModal(obj)}>
//                     <DeleteOutlined className='text-danger' />
//                   </Button>
//                   <Button onClick={()=>UpdateProduct(obj)}>
//                     <EditOutlined />
//                   </Button>
//                 </div>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       )}
//       <ConfirmationModal
//         visible={isModalVisible}
//         onOk={handleDelteProduct}
//         onCancel={handleCancel}
//         title="Confirm Delete"
//         description="Are you sure you want to delete this product?"
//       />
//     </Container>
//   );
// };





import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Image, notification, Spin, Form, } from 'antd';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { DOMAIN } from '../components/MyForms/Configs';
import { addToCart } from '../Redux/Fetures/CartSlice';
import { fetchCartData } from '../components/Utils/CartApiUtils';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { DeleteProductUtils } from '../components/Utils/DeleteProductUtils';
import { CustomeModel } from '../components/customConfirmation/CustomeModel';
import { UpdateProducts } from '../components/Utils/UpdateProducts';
import { MyForms } from '../components/MyForms/MyForms';
import { Loading } from '../Redux/Fetures/LoadingSlice';

const { Meta } = Card;

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  let token = useSelector((state) => state.auth.token);
  token = JSON.parse(token);
  const dispatch = useDispatch();

  const productData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${DOMAIN}products/getProducts`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setLoading(false);
      setProducts(res.data);
    } catch (error) {
      setLoading(false);
      notification.error({
        message: 'Server Error',
        description: 'Something went wrong',
        placement: 'topRight',
        duration: 3,
      });
    }
  }, [token]);

  const CartData = useCallback(async () => {
    try {
      const { updatedData } = await fetchCartData(token, DOMAIN);
      updatedData.forEach((product) => dispatch(addToCart(product)));
    } catch (error) {
      console.log("error", error);
    }
  }, [dispatch, token]);

  const handleDeleteProduct = useCallback(async () => {
    try {
      await DeleteProductUtils(token, selectedProduct);
      await productData();
      setIsDeleteModalVisible(false);
      notification.success({
        message: 'Product Deleted',
        description: 'Product deleted successfully!',
        placement: 'topRight',
        duration: 3,
      });
    } catch (err) {
      console.log(err);
      notification.error({
        message: 'Server Error',
        description: 'Something went wrong',
        placement: 'topRight',
        duration: 3,
      });
    }
  }, [token, productData, selectedProduct]);

  useEffect(() => {
    productData();
    CartData();
  }, [productData, CartData]);

  const showDeleteModal = (obj) => {
    setSelectedProduct(obj);
    setIsDeleteModalVisible(true);
  };

  const showEditModal = (obj) => {
    dispatch(Loading(true))
    setSelectedProduct(obj);
    form.setFieldsValue(obj);
    dispatch(Loading(false));
    setIsEditModalVisible(true);
  };

  const handleCancelEdit = () => {
    setSelectedProduct(null);
    setIsEditModalVisible(false);
    form.resetFields();
  };

  const handleUpdateProduct = async () => {
    try {
      const values = await form.validateFields();
      await UpdateProducts({ ...selectedProduct, ...values }, token);
      await productData();
      notification.success({
        message: 'Product Updated',
        description: 'Product updated successfully!',
        placement: 'topRight',
        duration: 3,
      });
      setIsEditModalVisible(false);
    } catch (err) {
      console.log("Update Error:", err);
      notification.error({
        message: 'Update Error',
        description: 'Failed to update the product!',
        placement: 'topRight',
        duration: 3,
      });
    }
  };

  return (
    <Container className="mt-4">
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '180px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row className="g-4">
          {products.map((obj, index) => (
            <Col xs={12} sm={6} md={4} lg={3} key={index}>
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
                    width="100%"
                    height={200}
                    alt={obj.Title}
                    src={obj.image}
                    style={{ objectFit: 'cover' }}
                  />
                }
              >
                <Meta
                  title={obj.name}
                  description={
                    obj.description.length > 50
                      ? `${obj.description.substring(0, 50)}...`
                      : obj.description
                  }
                />
                <div
                  style={{
                    marginTop: 10,
                    fontWeight: 'bold',
                    fontSize: '16px',
                    textAlign: 'center',
                    color: '#ff5722',
                  }}
                >
                  Price ₹{obj.price}
                </div>
                <div className="text-center mt-2 fw-bold text-danger">
                  Quantity {obj.quantity}
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <Button onClick={() => showDeleteModal(obj)}>
                    <DeleteOutlined className="text-danger" />
                  </Button>
                  <Button onClick={() => showEditModal(obj)}>
                    <EditOutlined />
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      <CustomeModel
        visible={isDeleteModalVisible || isEditModalVisible}
        onOk={handleDeleteProduct}
        onCancel={() => setIsDeleteModalVisible(false)}
        title={isEditModalVisible ? "Edit Product" : "Confirm Delete"}
        description={
          isEditModalVisible
            ? "Update the product details."
            : "Are you sure you want to delete this product?"
        }
        isEditModalVisible={isEditModalVisible}
        handleUpdateProduct={handleUpdateProduct}
        handleCancelEdit={handleCancelEdit}
      >
        {isEditModalVisible &&
          <MyForms
            form={form}
            fields={[

              {
                name: "price",
                label: "Price",
                placeholder: "Enter product price",
                rules: [{ required: true, message: "Please enter the price!" }],
              },
              {
                name: "quantity",
                label: "Quantity",
                placeholder: "Enter product quantity",
                rules: [{ required: true, message: "Please enter the quantity!" }],
              },
            ]}
          />

        }
      </CustomeModel>


    </Container>
  );
};
