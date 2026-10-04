import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // ========================================
  // GET FOOD ID
  // ========================================

  const getFoodId = (food) => {
    return food._id || food.id;
  };

  // ========================================
  // ADD TO CART
  // ========================================

  const addToCart = (food) => {
    const foodId = getFoodId(food);

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => getFoodId(item) === foodId
      );

      if (existingItem) {
        return currentItems.map((item) =>
          getFoodId(item) === foodId
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          ...food,
          quantity: 1,
        },
      ];
    });
  };

  // ========================================
  // INCREASE QUANTITY
  // ========================================

  const increaseQuantity = (foodId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        getFoodId(item) === foodId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // ========================================
  // DECREASE QUANTITY
  // ========================================

  const decreaseQuantity = (foodId) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          getFoodId(item) === foodId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ========================================
  // REMOVE FROM CART
  // ========================================

  const removeFromCart = (foodId) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => getFoodId(item) !== foodId
      )
    );
  };

  // ========================================
  // CLEAR CART
  // ========================================

  const clearCart = () => {
    setCartItems([]);
  };

  // ========================================
  // CART COUNT
  // ========================================
  // Counts different food items,
  // not total quantity.
  //
  // Example:
  // Grilled Fish × 3
  // Jollof Rice × 2
  //
  // Cart (2)
  // ========================================

  const cartCount = useMemo(
    () => cartItems.length,
    [cartItems]
  );

  // ========================================
  // CART TOTAL
  // ========================================

  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total +
          Number(item.price) * item.quantity,
        0
      ),
    [cartItems]
  );

  // ========================================
  // CART CONTEXT VALUE
  // ========================================

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// ========================================
// USE CART HOOK
// ========================================

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}