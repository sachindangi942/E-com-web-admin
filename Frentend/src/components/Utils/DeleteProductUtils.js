import axios from "axios"
import { DOMAIN } from "../MyForms/Configs"

export const DeleteProductUtils = async (token, obj) => {
    const { description, name, price, category, image,_id } = obj
    try {
        const res = await axios.post(`${DOMAIN}products/deleteProduct`,
            {
                description, name, price, category, image,_id
            }
            ,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        return res
    } catch (err) {
        console.log(err)
    }

}