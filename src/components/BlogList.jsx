export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }
  
  return (
    <div className="blog-list">
      {posts.map(post => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}