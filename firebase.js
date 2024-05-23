import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { ref } from "firebase/database";
//import { collection, addDoc, ref, uploadBytes, getDoc, enableIndexedDbPersistence, getFirestore } from "firebase/firestore";
import {addDoc, collection, deleteDoc, doc, enableIndexedDbPersistence, getDoc, getDocs, getFirestore, limit, orderBy, query, updateDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC6naHphemz813TZnXuPClKMROleuDPxIw",
  authDomain: "mynutrition-72ada.firebaseapp.com",
  projectId: "mynutrition-72ada",
  storageBucket: "mynutrition-72ada.appspot.com",
  messagingSenderId: "1029593263014",
  appId: "1:1029593263014:web:4348ce8a6dfce7919dfd67",
  measurementId: "G-ZCENKRJEGB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const storage = getStorage(app);
//const functionsInstance = functions(app);
export const auth = getAuth(app);
// Enable offline persistence
await enableIndexedDbPersistence(db);
//additional features
const analytics = getAnalytics(app);
//const remoteConfig = getRemoteConfig(app);
//const messaging = getMessaging(app);


//user data & caches
const usersCollectionRef = collection(db, "users");
const addUser = async (userData) => {
  await addDoc(usersCollectionRef, userData);
};

export const createUser = (username, email, password, setToast, setError) => {
  createUserWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {
    const user = userCredential.user;
    setToast(user.displayName);
    addUser({ 
      name: user.displayName, 
      username,
      email: user.email,
      photoURL: user.photoURL,
      isPremium: false,
      cart: null,
    });
  })
  .catch(async (error) => {
    const errorMessage = await error.message;
    setError(errorMessage);
  });
}

export const signInUser = (email, password, setToast, setError) => {
  signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
    const user = userCredential.user;
    setToast(user.displayName);
  }).catch(async (error) => {
    const errorMessage = await error.message;
    setError(errorMessage);
  });
  return null;
}


export const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    //addUser(user);
    console.log(user);
    // IdP data available using getAdditionalUserInfo(result)
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
}


export const handleGoogleLogin = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    await firebase.auth().signInWithPopup(provider);
  } catch (error) {
    console.error(error.message);
  }
};


export const readUser = () => {
  onAuthStateChanged(auth, (user) => {
      if (user) {
        return user;
      } else {
        return null;
      }
    });
}

export const signOutUser = () => {
  signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
}


export const updateUser = (data) => {
  updateProfile(auth.currentUser, data).then((userCredential) => {
    const userDoc = doc(db, "users", auth.currentUser.uid);
    const newFields = { marks: 1 };
    updateDoc(userDoc, newFields);
  }).catch((error) => {
    alert(error.message);
  });
}
//products
const productsCollectionRef = collection(db, "products");
export const getProducts= async (pagination, setProducts) => {
  const q = query(productsCollectionRef, orderBy("name"), limit(pagination));
  /*await productsCollectionRef.onSnapshot((querySnapShot) => {
    const products = [];
    querySnapShot.forEach((doc) => {
      products.push(doc.data());
    });
    return products;
  });*/
  
  const products = [];
  const documentsSnapshot = await getDocs(q).then((data) => {
    data.forEach((doc) => {
      products.push({id: doc.id,...doc.data()});
    })
  }).then(() => {
    setProducts(products);
  }).catch(() => {
    return null;
  });
};

export const getProduct = async (productId, setProducts) => {
  const productDocRef = doc(db, "products", productId);
  const productDoc = await getDoc(productDocRef);
  if (productDoc.exists()) {
    setProducts({id: productDoc.id, ...productDoc.data()})
  } else {
    console.log("No such document!");
  }
  return null;
};
//cart
const removeFromCart = async (itemId) => {
  await firebase.firestore().collection('carts').doc(auth.currentUser.uid).collection('items').doc(itemId).delete();
  //setCartItems(cartItems.filter(item => item.id !== itemId));
};
  
const fetchCartItems = async () => {
  const userId = firebase.auth().currentUser.uid;
  const snapshot = await firebase.firestore().collection('carts').doc(userId).collection('items').get();
  const itemsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return itemsData;
};

//blog posts
const blogPostsCollectionRef = collection(db, "blogs");
export const getBlogs= async (pagination, setBlogs) => {
  var q = query(blogPostsCollectionRef);
  /*if(categories.length > 0 && pagination){
    q = query(blogPostsCollectionRef, limit(pagination));//orderBy(() => categories), limit(pagination));
  } else if(!categories.length > 0 && pagination){
    q = query(blogPostsCollectionRef, limit(pagination));
  }*/
  
  q = query(blogPostsCollectionRef, limit(pagination));
  const blogs = [];
  const querySnapshot = await getDocs(q).then((data) => {
    data.forEach((doc) => {
      blogs.push({id: doc.id,...doc.data()});
    });
  }).then(() => {
    setBlogs(blogs);
  });
};


export const getBlogPost = async (blogId, setBlog) => {
  const blogDocRef = doc(db, "blogs", blogId);
  const blogDoc = await getDoc(blogDocRef);
  if (blogDoc.exists()) {
    setBlog({id: blogDoc.id, ...blogDoc.data()})
  } else {
    console.log("No such document!");
  }
  return null;
};

//recipes
const recipesCollectionRef = collection(db, "recipes");
/*
//recipe downloads
const generatePdfFunction = functionsInstance.httpsCallable("generatePdf");
const downloadRecipePdf = async (recipeId) => {
  const pdfUrl = await generatePdfFunction({ recipeId });
  // Download PDF file
  window.open(pdfUrl, "_blank");
};

*/

//contacts
export const addContact = async (data, setToast, setError) => {
  const contactsDocRef = doc(db, "contacts");
  await addDoc(contactsDocRef, data).then(async (userCredential) => {
    setToast("Thank you for contacting us! We will get back to you soon");
  })
  .catch(async (error) => {
    const errorMessage = await error.message;
    setError(errorMessage);
  });
};

const getUser = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);
  return userDoc.data();
};

const getUsers = async () => {
  const data = await getDocs(usersCollectionRef);
  //setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  return data.docs;
};

const deleteUser = async (id) => {
  const userDoc = doc(db, "users", id);
  await deleteDoc(userDoc);
};


const addProduct = async (productData) => {
  await addDoc(productsCollectionRef, productData);
};

const addRecipe = async (recipeData) => {
  await addDoc(recipesCollectionRef, recipeData);
  
  // Upload recipe video to storage
  const storageRef = ref(storage, `recipes/${recipeData.id}.mp4`);
  await uploadBytes(storageRef, recipeData.video);
};
    
const addBlogPost = async (blogPostData) => {
  await addDoc(blogPostsCollectionRef, blogPostData);
  // Generate audio file for blog post
  const generateAudioFunction = functionsInstance.httpsCallable("generateAudio");
  await generateAudioFunction({ blogPostId: blogPostData.id });
};
  
  // documentTags is an ALPHABETICALLY SORTED array of tags we are querying for
  async function queryDocuments(documentTags){
    let indexCollectionRef = db.collection("tag-tree")
    for (const tag of documentTags) {
        indexCollectionRef = indexCollectionRef.doc("index").collection(tag)
    }
    // returns all documents that are tagged 
    //  ordering can be applied to the query on any one of the sorting fields
    return await indexCollectionRef.get()
}

