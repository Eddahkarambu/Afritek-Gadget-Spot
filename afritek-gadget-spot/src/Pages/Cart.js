import React from "react";

const Cart = ({ cart, setCart }) => {
  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const total = cart.reduce((acc, item) => {
    const price = parseInt(item.price.replace(/[^0-9]/g, ""));
    return acc + price;
  }, 0);

  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-10">
        Your <span className="text-blue-500">Cart</span>
      </h1>

      {cart.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-[#111827] p-6 rounded-2xl"
              >
                <div>
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-gray-400">{item.price}</p>
                </div>

                <button
                  onClick={() => removeFromCart(index)}
                  className="bg-red-500 px-4 py-2 rounded-xl text-white"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-10 text-right">
            <h2 className="text-2xl font-bold">
              Total: KSh {total.toLocaleString()}
            </h2>

            <button className="mt-6 bg-blue-500 px-8 py-4 rounded-xl font-bold">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
