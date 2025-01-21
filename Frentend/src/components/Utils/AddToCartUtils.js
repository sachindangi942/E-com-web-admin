import axios from "axios";

export const AddToCardUtil = async ( DOMAIN, token ,{ _id:id, name, price, description, image,}) => {
    let CartProduct = { name, price, description, id, image };
    try {
        const res = await axios.post(
            `${DOMAIN}products/addToCard`,
            CartProduct,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res
    } catch (err) {
        console.log(err)
        throw new Error(err.response?.data?.message || 'Failed to add to cart');

    }
};