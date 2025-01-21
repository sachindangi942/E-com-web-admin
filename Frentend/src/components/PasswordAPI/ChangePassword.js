import { Button, notification, Spin } from "antd"
import MyInput from "../MyInputs/MyInput"
import { useState } from "react"
import axios from "axios"
import { DOMAIN } from "../MyForms/Configs"
import { useDispatch, useSelector } from "react-redux"
import { setErr } from "../../Redux/Fetures/ErrSlice"
import { ChangePassword_val } from "../../Validations/ChangePassword_val"
import { useNavigate } from "react-router-dom"

export const ChangePassword = () => {
    const dispatch = useDispatch();
    const [changePassword, setChangePassword] = useState({});
    const [loading, setLoading] = useState(false);
    const err = useSelector(state => state.err.err);
    let token = useSelector(state => state.auth.token);
    token = JSON.parse(token);
    const navigate = useNavigate()

    const onChange = ({ id, value }) => {
        setChangePassword((Prevalue) => {
            Prevalue[id] = value;
            return Prevalue;
        })

    }
    const submit = async (e) => {
        e.preventDefault();
        try {
            const { error } = ChangePassword_val(changePassword);
            if (error) {
                let errObj = {};
                error.details.forEach(element => {
                    errObj[element.path[0]] = element.message;

                });
                return dispatch(setErr(errObj))
            }
            setLoading(true);
            await axios.post(`${DOMAIN}user/changePassword`, changePassword, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setLoading(false);
            notification.success({
                message: "Successfully changed password",
                placement: "topRight",
                duration: 3,
            });
            navigate("/singIn");

        } catch (err) {
            console.log(err);

            notification.error({
                message: 'something went wrong',
                description: err?.response?.data ?? "unsuccessfull ",
                placement: 'topRight',
                duration: 3,
            });
        }
    }
    return (
        <>
            {loading ? (
                <div className="text-center" style={{ marginTop: '180px' }}>
                    <Spin size="large" />
                </div>
            ) :
                <div className="form-container">
                    <h6>change password</h6>
                    <MyInput
                        placeholder="Enter old Password"
                        id="oldPassword"
                        onChange={onChange}
                        err={err}
                    />
                    <MyInput
                        placeholder="Enter new password"
                        id="newPassword"
                        onChange={onChange}
                        err={err}
                    />
                    <MyInput
                        placeholder="Enter confirm Password"
                        id="confirmPassword"
                        onChange={onChange}
                        err={err}
                    />
                    <br />
                    <Button className="bg-info" onClick={submit}>change password</Button>

                </div>
            }
        </>
    )
}
