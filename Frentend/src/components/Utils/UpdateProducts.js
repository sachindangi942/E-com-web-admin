import axios from "axios"
import { DOMAIN } from "../MyForms/Configs"

export const UpdateProducts = async (obj, token) => {
    const { _id, quantity, price } = obj
    try {
        const res = await axios.post(`${DOMAIN}products/updateProducts`, {
            _id,
            quantity,
            price
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return res
    } catch (err) {
        console.log(err);
    }
}