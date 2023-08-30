import { useEffect, useState } from 'react';
import { fetch } from 'whatwg-fetch';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const fetchAllPosts = () => {
    fetch('https://codebuddy.review/posts', {
      method: 'GET',
    }).then(async response => {
      const { data } = await response.json();
      setPosts(data.posts);
    });
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <div className="container">
      <p className="fs-3"> Showing all posts</p>
      <hr />
      <div className="row">
        {posts.map(post => (
          <div key={post.id} className="col-12 col-md-6 col-lg-4 h-100 mb-4">
            <div className="card h-100">
              <img src={post.image} className="card-img-top" alt="post" />
              <div className="card-body">
                <div className="flex mb-3 align-center">
                  <img src={post.avatar} className="avatar border me-2" alt="avatar" />
                  <strong>
                    {post.firstName} {post.lastName}
                  </strong>
                </div>
                <p className="card-desc">{post.writeup}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
