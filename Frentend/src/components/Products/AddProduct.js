// import { Button } from "react-bootstrap";
// import MyInput from "../MyInputs/MyInput"
// import { useState } from "react";
// import axios from "axios";
// import { DOMAIN } from "../MyForms/Configs";
// import AddProduct_val from "../../Validations/AddProduct_val";
// import { useDispatch, useSelector } from "react-redux";
// import { hideloading, showloading } from "../../Redux/AlertSclice";

// const AddProduct = () => {
//     const token = useSelector((state) => state.auth.token)
//     const dispatch = useDispatch();
//     const [userData, setUsrData] = useState({});
//     const [err, setErr] = useState();

//     const onChangeData = ({ id, value }) => {
//         setErr("")
//         setUsrData((lastValue) => {
//             lastValue[id] = value
//             return lastValue
//         })
//     }
//     const AddProduct = async (e) => {
//         const Token = JSON.parse(token);
//         try {
//             const { error, value } = AddProduct_val({ data: userData });
//             if (error) {
//                 const errObj = {};
//                 error.details.forEach(obj => {
//                     errObj[obj.path] = obj.message;

//                 })
//                 return setErr(errObj);
//             }
//             setErr({})
//             dispatch(showloading())
//             await axios.post(`${DOMAIN}products/addProducts`, value, {
//                 headers: {
//                     Authorization: `Bearer ${Token}`
//                 }
//             })
//             dispatch(hideloading());
//             alert("Successfull Add Product");
//             setUsrData(null);
//         } catch (error) {
//             console.log('err', error.response.data);
//             const match = error.response.data.match(/dup key: \{ (\w+):/);
//             if (match && match[1]) {
//                 const field = match[1]
//                 setErr({ [field]: `${field} is already exist` })

//             }
//         }
//     }

//     return (
//         <div className="form-container">
//             <div className=" fs-5">Add Product</div>
//             <MyInput
//                 placeholder="name"
//                 id="name"
//                 onChange={onChangeData}
//                 err={err}
//             />
//             <MyInput
//                 placeholder="price"
//                 id="price"
//                 type = "Number"
//                 onChange={onChangeData}
//                 err={err}
//             />
//             <MyInput
//                 placeholder="quantity"
//                 id="quantity"
//                 type = "Number"
//                 onChange={onChangeData}
//                 err={err}
//             />
//             <MyInput
//                 placeholder="category"
//                 id="category"
//                 onChange={onChangeData}
//                 err={err}
//             />
//             <MyInput
//                 placeholder="description"
//                 id="description"
//                 onChange={onChangeData}
//                 err={err}
//             />
//             <MyInput
//                 placeholder="Image Link"
//                 id="image"
//                 onChange={onChangeData}
//                 err={err}
//             />
//             <br></br>
//             <Button onClick={AddProduct}>Add Product</Button>
//         </div>
//     )
// }
// export default AddProduct;

import axios from "axios";
import { DOMAIN } from "../MyForms/Configs";
import AddProduct_val from "../../Validations/AddProduct_val"
import { useForm } from "antd/es/form/Form";
import { MyForms } from "../MyForms/MyForms"
import { Button, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { hideloading, showloading } from "../../Redux/AlertSclice";
import { useState } from "react";


const AddProduct = () => {
    const token = useSelector((state) => state.auth.token)
    const dispatch = useDispatch();
    const [form] = useForm();
    const [err, setErr] = useState();


    const handleForm = async (values) => {
        const Token = JSON.parse(token);
        try {
            console.log("b")
            const { error, value } = AddProduct_val({ data: values });
            console.log(error)
            if (error) {
                const errObj = {};
                error.details.forEach(obj => {
                    errObj[obj.path] = obj.message;


                })
                return setErr(errObj);

            }
            setErr({})
            dispatch(showloading())
            await axios.post(`${DOMAIN}products/addProducts`, value, {
                headers: {
                    Authorization: `Bearer ${Token}`
                }
            })
            dispatch(hideloading());
            notification.success({
                message: 'Product Add',
                description: 'Product Add successfully!',
                placement: 'topRight',
                duration: 3,
              });
        } catch (error) {
            console.log('err', error.response.data);
            const match = error.response.data.match(/dup key: \{ (\w+):/);
            if (match && match[1]) {
                const field = match[1]
                setErr({ [field]: `${field} is already exist` })

            }
            notification.error({
                message: 'Product Add',
                description: 'Product Add Filed!',
                placement: 'topRight',
                duration: 3,
              });
        }

        console.log("formValues", values);
        form.resetFields();
    }


    return (
        <>
            <MyForms
                form={form}
                onFinish={handleForm}
                fields={[
                    {
                        name: "name",
                        // label: "Product",
                        placeholder: " Enter product Name",
                        rules: [{ required: true, message: "Please Enter Procut Name!" }],
                    },
                    {
                        name: "price",
                        // label: "Price",
                        placeholder: "Enter product price",
                        type: 'number',
                        rules: [{ required: true, message: "Please enter the price!" }],
                    },
                    {
                        name: "quantity",
                        // label: "Quantity",
                        type: "number",
                        placeholder: "Enter product quantity",
                        rules: [{ required: true, message: "Please enter the quantity!" }],
                    },
                    {
                        name: "category",
                        // label: "Category",
                        placeholder: "Enter product Category",
                        rules: [{ required: true, message: "Please enter the Category!" }],
                    },
                    {
                        name: "image",
                        // label: "uploade",
                        placeholder: "uploade ",
                        rules: [{ required: true, message: "Please upload File!" }],
                    },
                    {
                        name: "description",
                        // label: "Description",
                        placeholder: "Description ",
                        rules: [{ required: true, message: "Please Enter Description!" }],
                    },
                ]}
            >
                <Button
                    type="primary" htmlType="submit" className="w-100 btn btn-secondary"
                >
                    Add Product
                </Button>
            </MyForms>
            
        </>
    )
}

export default AddProduct;