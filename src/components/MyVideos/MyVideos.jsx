// Post video form
const PostVideoForm = () => {
    const db = getFirestore();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const video = {
        categories: e.target.categories.value.split(","),
        datePosted: Timestamp.now(),
        numberOfViews: 0,
        length: e.target.length.value,
        thumbnail: e.target.thumbnail.value,
        video: e.target.video.value,
        title: e.target.title.value,
        description: e.target.description.value,
        ratings: [],
        comments: [],
      };
  
      await addDoc(collection(db, "videos"), video);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" name="categories" placeholder="Categories" />
        <input type="datetime-local" name="datePosted" placeholder="Date Posted" />
        <input type="number" name="length" placeholder="Length" />
        <input type="text" name="thumbnail" placeholder="Thumbnail" />
        <input type="text" name="video" placeholder="Video" />
        <input type="text" name="title" placeholder="Title" />
        <input type="text" name="description" placeholder="Description" />
        <button type="submit">Post Video</button>
      </form>
    );
  };

  // Preview video component
const PreviewVideo = ({ video }) => {
    const [showPreview, setShowPreview] = useState(false);
  
    return (
      <div onMouseEnter={() => setShowPreview(true)} onMouseLeave={() => setShowPreview(false)}>
        <img src={video.thumbnail} alt={video.title} />
        {showPreview && <video src={video.preview} controls></video>}
      </div>
    );
  };
  
  // Videos page
  const VideosPage = () => {
    const db = getFirestore();
  
    const [videos, setVideos] = useState([]);
  
    useEffect(() => {
      const unsubscribe = onSnapshot(collection(db, "videos"), (snapshot) => {
        setVideos(snapshot.docs.map((doc) => doc.data()));
      });
  
      return () => unsubscribe();
    }, [db]);
  
    return (
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <PreviewVideo video={video} />
            <a href={`/videos/${video.id}`}>{video.title}</a>
          </li>
        ))}
      </ul>
    );
  };
  
  // Video details page
  const VideoDetailsPage = ({ videoId }) => {
    const db = getFirestore();
  
    const [video, setVideo] = useState(null);
  
    useEffect(() => {
      const unsubscribe = onSnapshot(doc(db, "videos", videoId), (doc) => {
        setVideo(doc.data());
      });
  
      return () => unsubscribe();
    }, [db, videoId]);
  
    return (
      <div>
        <h1>{video.title}</h1>
        <p>{video.description}</p>
        <video src={video.video} controls></video>
        <ul>
          {video.comments.map((comment) => (
            <li key={comment.timestamp}>{comment.text}</li>
          ))}
        </ul>
    </div>
    )
}
  