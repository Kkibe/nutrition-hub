// Add to cart button component
const AddToCartButton = ({ product }) => {
    const db = getFirestore();
    const user = getAuth().currentUser;
  
    const addToCart = async () => {
      const cartRef = doc(db, "carts", user.uid);
      await updateDoc(cartRef, {
        products: FieldValue.arrayUnion(product.id),
      });
    };
  
    return (
      <button onClick={addToCart}>Add to cart</button>
    );
  };
  
  // Cart component
  export const MyCart = () => {
    const db = getFirestore();
    const user = getAuth().currentUser;
  
    const [cart, setCart] = useState([]);
  
    useEffect(() => {
      const cartRef = doc(db, "carts", user.uid);
  
      const unsubscribe = onSnapshot(cartRef, (doc) => {
        setCart(doc.data().products);
      });
  
      return () => unsubscribe();
    }, [user.uid]);
  
    const removeFromCart = async (product) => {
      const cartRef = doc(db, "carts", user.uid);
      await updateDoc(cartRef, {
        products: FieldValue.arrayRemove(product),
      });
    };
  
    return (
      <ul>
        {cart.map((product) => (
          <li key={product}>
            {product}
            <button onClick={() => removeFromCart(product)}>Remove</button>
          </li>
        ))}
      </ul>
    );
  };
  
  // Save cart function
  const saveCart = () => {
    const cart = getCart();
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  
  // Load cart function
  const loadCart = () => {
    const cart = localStorage.getItem("cart");
    return JSON.parse(cart);
  };
  
  // Send notification function
  const sendNotification = (cart) => {
    const messaging = getMessaging();
  
    const notification = {
      title: "Cart items pending checkout",
      body: `You have ${cart.length} items in your cart that have not been ordered or are pending checkout.`,
    };
  
    messaging.sendNotification(notification);
  };
  



  //when not signed in
  // Add to cart button component
const AddToCartButton = ({ product }) => {
    const db = getFirestore();
    const guestUserId = generateGuestUserId();
  
    const addToCart = async () => {
      const guestCartRef = doc(db, "guest_carts", guestUserId);
      await updateDoc(guestCartRef, {
        products: FieldValue.arrayUnion(product.id),
      });
    };
  
    return (
      <button onClick={addToCart}>Add to cart</button>
    );
  };
  
  // Save cart function
  const saveCart = async () => {
    const db = getFirestore();
    const user = getAuth().currentUser;
    const guestUserId = generateGuestUserId();
  
    const guestCartRef = doc(db, "guest_carts", guestUserId);
    const userCartRef = doc(db, "carts", user.uid);
  
    const guestCart = await getDoc(guestCartRef);
    const userCart = await getDoc(userCartRef);
  
    if (userCart.exists()) {
      // Merge the guest cart with the user cart
      await updateDoc(userCartRef, {
        products: FieldValue.arrayUnion(...guestCart.data().products),
      });
    } else {
      // Create a new cart for the user
      await setDoc(userCartRef, {
        products: guestCart.data().products,
      });
    }
  
    // Delete the guest cart
    await deleteDoc(guestCartRef);
  };