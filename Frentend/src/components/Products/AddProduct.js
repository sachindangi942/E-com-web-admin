import { Button } from "react-bootstrap";
import MyInput from "../MyInputs/MyInput"
import { useState } from "react";
import axios from "axios";
import { DOMAIN } from "../MyForms/Configs";
import AddProduct_val from "../../Validations/AddProduct_val";
import { useDispatch, useSelector } from "react-redux";
import { hideloading, showloading } from "../../Redux/AlertSclice";


const AddProduct = () => {
    const token = useSelector((state) => state.auth.token)
    const dispatch = useDispatch();
    const [userData, setUsrData] = useState({});
    const [err, setErr] = useState();

    const onChangeData = ({ id, value }) => {
        setErr("")
        setUsrData((lastValue) => {
            lastValue[id] = value
            return lastValue
        })
    }
    const AddProduct = async (e) => {
        const Token = JSON.parse(token);
        try {
            const { error, value } = AddProduct_val({ data: userData });
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
            alert("Successfull Add Product");
            setUsrData(null);
        } catch (error) {
            console.log('err', error.response.data);
            const match = error.response.data.match(/dup key: \{ (\w+):/);
            if (match && match[1]) {
                const field = match[1]
                setErr({ [field]: `${field} is already exist` })

            }
        }
    }

    return (
        <div className="form-container">
            <div className=" fs-5">Add Product</div>
            <MyInput
                placeholder="name"
                id="name"
                onChange={onChangeData}
                err={err}
            />
            <MyInput
                placeholder="price"
                id="price"
                type = "Number"
                onChange={onChangeData}
                err={err}
            />
            <MyInput
                placeholder="quantity"
                id="quantity"
                type = "Number"
                onChange={onChangeData}
                err={err}
            />
            <MyInput
                placeholder="category"
                id="category"
                onChange={onChangeData}
                err={err}
            />
            <MyInput
                placeholder="description"
                id="description"
                onChange={onChangeData}
                err={err}
            />
            <MyInput
                placeholder="Image Link"
                id="image"
                onChange={onChangeData}
                err={err}
            />
            <br></br>
            <Button onClick={AddProduct}>Add Product</Button>
        </div>
    )
}
export default AddProduct;