import { getFirestore } from "firebase/firestore";

// Like button component
const LikeButton = ({ postOrProductId }) => {
    const db = getFirestore();
    const postOrProductRef = doc(db, "posts", postOrProductId);
  
    const incrementLikes = async () => {
      await updateDoc(postOrProductRef, {
        likes: FieldValue.increment(1),
      });
    };
  
    return (
      <button onClick={incrementLikes}>Like</button>
    );
  };
  
  // Comment form component
export const CommentForm = ({ postOrProductId }) => {
    const db = getFirestore();
    const postOrProductRef = doc(db, "posts", postOrProductId);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const comment = e.target.comment.value;
  
      await updateDoc(postOrProductRef, {
        comments: FieldValue.arrayUnion({
          text: comment,
          timestamp: Timestamp.now(),
        }),
      });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" name="comment" />
        <button type="submit">Comment</button>
      </form>
    );
  };
  
  // Comments list component
  const CommentsList = ({ postOrProductId }) => {
    const db = getFirestore();
    const postOrProductRef = doc(db, "posts", postOrProductId);
  
    const [comments, setComments] = useState([]);
  
    useEffect(() => {
      const unsubscribe = onSnapshot(postOrProductRef, (doc) => {
        setComments(doc.data().comments);
      });
  
      return () => unsubscribe();
    }, [postOrProductId]);
  
    return (
      <ul>
        {comments.map((comment) => (
          <li key={comment.timestamp}>{comment.text}</li>
        ))}
      </ul>
    );
  };
  