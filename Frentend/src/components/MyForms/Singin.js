import React, { useState } from "react";
import MyInput from "../MyInputs/MyInput";
import "./style.css"
import axios from "axios";
import { DOMAIN } from "./Configs";
import { Link, useNavigate } from "react-router-dom";
import Login_val from "../../Validations/Login_Val";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../Redux/Fetures/Authslice";
import { setErr } from "../../Redux/Fetures/ErrSlice";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Loading } from "../../Redux/Fetures/LoadingSlice";

const Singin = () => {
    const [usrdata, setUsrData] = useState({})
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const err = useSelector(state => state.err.err);
    const {loading} = useSelector(state=>state.loading)

    const onChangeData = (obj) => {
        dispatch(setErr(""))
        setUsrData((lastValue) => {
            lastValue[obj.id] = obj.value;
            return lastValue;
        })
    }

    const login = async (e) => {
        e.preventDefault();
        try {
            const { error, } = Login_val(usrdata);
            if (error) {
                let errObj = {};
                error.details.forEach(detail => {
                    errObj[detail.path[0]] = detail.message;

                });
                return dispatch(setErr(errObj));
            }
            dispatch(setErr({}));
            dispatch(Loading(true));
            const res = await axios.post(`${DOMAIN}user/login`, usrdata,);
            dispatch(Loading(false))
            if (res?.status === 200 ?? res.data.token) {
                const token = JSON.stringify(res.data.token);
                const username = res.data.user.Email
                dispatch(setToken({ token, username }));
                navigate("/")
            }

        } catch (error) {
            dispatch(Loading(false));
            if (error.response) {
                dispatch(setErr(error.response.data));
            } else {
                dispatch(setErr("Server error. Please try again later."));
            }
        }
    }
    return (
        <div className="form-container">
            <h5>Welcome Back! Please Login</h5>

            <MyInput
                placeholder="Enter UserName"
                id="Email"
                onChange={onChangeData}
                err={err}
            />


            <MyInput
                placeholder="Enter password"
                id="password"
                type="passwo-rd"
                onChange={onChangeData}
                err={err}
            />

            <br />
            <Button
            disabled = {loading}
             className={loading ? "btn border border-info w-25" : " btn btn-info border border-info w-25"}
              onClick={login}
              >
             {loading ? <Spin indicator={<LoadingOutlined spin  className="text-info"/>}/> : "Login"}
            </Button>
            <Link className="m-4" to={"/forgotpassword"}>forgot password</Link>
            <br />
            <br />
        </div>
    )
}
export default Singin