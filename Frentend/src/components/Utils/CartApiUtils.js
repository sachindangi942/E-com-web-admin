import { notification } from 'antd';
import axios from 'axios';


export const fetchCartData = async (token, DOMAIN) => {
    try {
        const res = await axios.get(`${DOMAIN}products/cartData`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const updatedData = res.data.map(item => ({ ...item,item}));
        const totalBill = updatedData.reduce((sum, item) => sum + item.price*item.quantity, 0);
        return { updatedData, totalBill };
    } catch (error) {
        console.error("Error fetching cart data:", error);
        return {error};
    }
};


export const updateProductQuantity = async (id, delta, token, DOMAIN, setCartData, setTotalBill) => {
    try {
        const response = await axios.post(
            `${DOMAIN}products/updateProductQuantity`,
            { _id: id, quantity: delta },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const updatedItem = response.data;

        setCartData((prevData) => {
            const updatedData = prevData.map((item) => {
                return item._id === id ? { ...item, quantity: updatedItem.quantity } : item
            });
            const totalBill = updatedData.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );
            setTotalBill(totalBill);
            return updatedData;
        });
        notification.success({
            message: 'Quantity Updated',
            description: `Quantity updated to ${updatedItem.quantity}`,
            placement: 'topRight',
        });
    } catch (error) {
        console.error("Error updating quantity:", error);
        notification.error({
            message: 'Update Failed',
            description: 'Failed to update quantity. Please try again.',
            placement: 'topRight',
        });
    }
};
