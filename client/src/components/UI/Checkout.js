import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../stores/cart";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  CardMedia,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import axios from "axios";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleCheckout = async () => {
    const orderData = {
      userId: "user123", // replace with actual user ID
      products: cartItems.map((item) => ({
        productId: item._id,
        name: item.name,
        quantity: item.quantity,
        color: item.selectedVariation.color,
        size: item.selectedVariation.size,
        price: item.selectedVariation.price,
      })),

      totalAmount: totalAmount,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/orders/create",
        orderData
      );
      const { _id, newOrder, totalAmount } = response.data;
      console.log(response.data);

      const options = {
        key: "rzp_test_NgcF7K5H1NJRAn",
        amount: totalAmount * 100,
        currency: "INR",
        name: "Your Shop",
        description: "Order Payment",
        order_id: _id,
        handler: async (response) => {
          try {
            await axios.post("http://localhost:5000/order/confirm", {
              orderId: newOrder._id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });
            alert("Payment successful!");
            dispatch(clearCart());
          } catch (error) {
            console.error("Payment confirmation error:", error);
            alert("Payment confirmation failed. Please try again.");
          }
        },
        prefill: {
          name: "John Doe",
          email: "john.doe@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#F37254",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Order creation error:", error);
      alert("Order creation failed. Please try again.");
    }
  };

  return (
    <Container sx={{ py: 5 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 5,
        }}
      >
        {/* Order Summary */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" gutterBottom>
            Pay
          </Typography>
          <Typography variant="h3" gutterBottom>
            ₹{totalAmount.toFixed(2)}
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow
                    key={`${item._id}-${item.selectedVariation.color}-${item.selectedVariation.size}`}
                  >
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CardMedia
                          component="img"
                          sx={{ width: 50, height: 50, marginRight: 2 }}
                          image={
                            item.selectedVariation.images &&
                            item.selectedVariation.images.length > 0
                              ? `http://localhost:5000/${item.selectedVariation.images[0]}`
                              : "https://via.placeholder.com/100"
                          }
                          alt={item.name}
                        />
                        <Box>
                          <Typography>{item.name}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            Qty {item.quantity}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Color: {item.selectedVariation.color}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Size: {item.selectedVariation.size}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      ₹{item.selectedVariation.price.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>Subtotal</TableCell>
                  <TableCell align="right">₹{totalAmount.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Shipping</TableCell>
                  <TableCell align="right">₹5.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total due</TableCell>
                  <TableCell align="right">
                    ₹{(totalAmount + 5).toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Payment Details */}
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Shipping Information
            </Typography>
            <TextField fullWidth label="Email" margin="normal" sx={{ mb: 2 }} />
            <TextField fullWidth label="Name" margin="normal" sx={{ mb: 2 }} />
            <TextField
              fullWidth
              label="Shipping address"
              margin="normal"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Country"
              margin="normal"
              sx={{ mb: 2 }}
            />
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" gutterBottom>
              Payment Details
            </Typography>
            <TextField
              fullWidth
              label="Card Number"
              margin="normal"
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField label="MM / YY" margin="normal" sx={{ flex: 1 }} />
              <TextField label="CVC" margin="normal" sx={{ flex: 1 }} />
            </Box>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Billing address is same as shipping"
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleCheckout}
              sx={{ py: 1.5 }}
            >
              Pay ₹{(totalAmount + 5).toFixed(2)}
            </Button>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default Checkout;
