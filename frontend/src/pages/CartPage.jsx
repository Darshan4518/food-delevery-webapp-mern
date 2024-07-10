import React, { useContext, useState } from "react";
import { Container, Typography, Button, Modal } from "@mui/material";
import { FaMinus, FaPlus, FaTrashAlt, FaTag } from "react-icons/fa";
import { Context } from "../store/Strore";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const CartPage = () => {
  const { cart, removeFromCart, updateCartItemQuantity, setCart } =
    useContext(Context);
  const [open, setOpen] = useState(false); // State to manage modal open/close

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCart([]);
  };

  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const calculateDiscount = (subtotal) => {
    return subtotal * 0.12;
  };

  const calculateTotal = (subtotal, discount) => {
    return subtotal - discount;
  };

  const handleQuantityChange = (itemId, quantity) => {
    updateCartItemQuantity(itemId, quantity);
  };

  const handleRemoveItem = (itemId, name) => {
    removeFromCart(itemId);
    toast.success(`${name} delete Successfully`);
  };

  const handleOrder = () => {
    handleOpen();
  };

  const subtotal = calculateSubtotal();
  const discount = calculateDiscount(subtotal);
  const total = calculateTotal(subtotal, discount);

  return (
    <Container>
      <Toaster position="top-right" reverseOrder={false} />
      {cart.length === 0 ? (
        <div className="max-w-screen-xl h-[60vh] flex justify-center items-center">
          <div>
            <h3 className="my-10 font-bold text-2xl text-center capitalize">
              No items in the cart
            </h3>
            <Link to="/">
              <button className="p-3 px-4 bg-blue-500 text-white font-bold rounded-lg mx-10">
                Back To Home
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <header className="text-center">
                <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                  Your Cart
                </h1>
              </header>

              <div className="mt-8 p-2">
                <ul className="space-y-4">
                  {cart.map((item) => (
                    <div key={item._id}>
                      <li className="flex items-center gap-4">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-20 h-16 rounded object-cover"
                        />
                        <div>
                          <h3 className="text-sm text-gray-900 line-clamp-2 font-bold">
                            {item.name}
                          </h3>
                          <dl className="mt-0.5 space-y-1 text-[10px] text-gray-600 font-bold">
                            <div>
                              <dt className="inline">Type:</dt>
                              <dd className="inline px-2">{item.foodType}</dd>
                            </div>
                            <div>
                              <dt className="inline">Price:</dt>
                              <dd className="inline px-2">Rs {item.price}</dd>
                            </div>
                          </dl>
                        </div>
                      </li>
                      <div className="flex flex-1 items-center justify-end gap-2">
                        <Button
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          size="small"
                        >
                          <FaMinus />
                        </Button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600"
                          readOnly
                        />
                        <Button
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity + 1)
                          }
                          size="small"
                        >
                          <FaPlus />
                        </Button>
                        <Button
                          onClick={() => handleRemoveItem(item._id, item.name)}
                          size="small"
                          color="error"
                        >
                          <FaTrashAlt />
                        </Button>
                      </div>
                    </div>
                  ))}
                </ul>

                <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                  <div className="w-screen max-w-lg space-y-4">
                    <dl className="space-y-0.5 text-sm text-gray-700">
                      <div className="flex justify-between">
                        <dt>Subtotal</dt>
                        <dd>Rs {subtotal.toFixed(2)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>Discount </dt>
                        <dd>-Rs {discount.toFixed(2)}</dd>
                      </div>
                      <div className="flex justify-between !text-base font-medium">
                        <dt>Total</dt>
                        <dd>Rs {total.toFixed(2)}</dd>
                      </div>
                    </dl>

                    <div className="flex justify-end">
                      <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700">
                        <FaTag className="mr-1" />
                        <p className="whitespace-nowrap text-xs">
                          1 Discount Applied
                        </p>
                      </span>
                    </div>

                    <div className="flex justify-end">
                      <Link to={"/order"}>
                        <Button className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600">
                          Change Address
                        </Button>
                      </Link>
                      <Button
                        onClick={handleOrder}
                        className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                      >
                        Order
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <section className="rounded-3xl shadow-2xl mx-auto mt-20 p-8 bg-white w-full max-w-md">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-widest text-pink-500">
                  Your order is on the way
                </p>

                <h2 className="mt-6 text-3xl font-bold">
                  Thanks for your purchase, we're getting it ready!
                </h2>

                <Link
                  className="mt-8 inline-block w-full rounded-full bg-pink-600 py-4 text-sm font-bold text-white shadow-xl"
                  to="/"
                  onClick={() => setCart([])}
                >
                  Track Order
                </Link>

                <Button
                  onClick={handleClose}
                  className="mt-4 rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                >
                  Close
                </Button>
              </div>
            </section>
          </Modal>
        </section>
      )}
    </Container>
  );
};

export default CartPage;
