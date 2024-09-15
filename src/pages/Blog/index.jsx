import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/css/style.css";
import Img from "../../assets/Frame.png";
import ImgLeft1 from "../../assets/image1.png";
import ImgLeft2 from "../../assets/image2.png";
import ImgLeft3 from "../../assets/image3.png";
import GridIcon from "../../assets/grid.svg";
import MenuIcon from "../../assets/menu.svg";

const Index = () => {
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  useEffect(() => {
    // Fetch data from DummyJSON API
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/posts");
        setBlogs(response.data.posts);
        setFilteredBlogs(response.data.posts);
        // Mengambil tag unik dari data yang diambil
        const allTags = response.data.posts.flatMap((post) => post.tags);
        const uniqueTags = Array.from(new Set(allTags));
        setTags(uniqueTags);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter blogs berdasarkan search term
    const filtered = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBlogs(filtered);
    setCurrentPage(1); // Reset ke halaman pertama saat melakukan pencarian
  }, [searchTerm, blogs]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleTagClick = (tag) => {
    if (tag === "All Topics") {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(
        (blog) => blog.tags && blog.tags.includes(tag)
      );
      setFilteredBlogs(filtered);
    }
    setCurrentPage(1); // Reset ke halaman pertama saat memilih tag
  };

  // Logika Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);

  return (
    <div className="blog-index">
      {/* Section 1 */}
      <section className="bg-light">
        <div className="container d-flex ps-0">
          <div className="container ps-0 align-content-center">
            <div className="row">
              <div className="col-md-8 bg-light">
                <div className="card border-0 bg-light">
                  <div className="card-body">
                    <h4 className="card-title main-title mb-3 fw-bold">
                      Read Blogs
                    </h4>
                    <p className="card-text mb-4">
                      Displays information, visualizations, graphics and text
                      with a display that is
                      <br /> more interesting to explore.
                    </p>
                    <a href="##" className="write-blog btn btn-dark">
                      Write Blog
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img src={Img} alt="Banner" />
          </div>
        </div>
      </section>

      {/* Form Search Section */}
      <section className="container d-flex">
        <form className="mt-3 col-md-3">
          <div className="input-group mb-3">
            <span className="input-group-text bg-white border-1">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
            <input
              type="search"
              className="form-control border-start-0"
              id="search"
              placeholder="Search blogs..."
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </form>
        <div className="border mt-3 ms-4 mb-3 rounded-1">
          <button className="button-1 btn rounded-0 border-0" type="button">
            <img src={GridIcon} alt="Grid View" />
          </button>
          <button className="btn button-2 rounded-0 border-0" type="button">
            <img src={MenuIcon} alt="List View" />
          </button>
        </div>
      </section>

      {/* Main Content */}
      <section className="container d-flex">
        <div className="left-content pe-5 w-75 border-end">
          <div>
            <div className="d-flex align-items-center mb-2">
              <i className="fa-solid fa-plus me-3"></i>
              <a
                className="category me-3"
                href="##"
                onClick={() => handleTagClick("All Topics")}
              >
                All Topics
              </a>
              {tags.map((tag) => (
                <a
                  key={tag}
                  className="category me-3"
                  href="##"
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </a>
              ))}
            </div>
            <hr className="category-line" />
          </div>

          <div className="row row-cols-1 row-cols-md-3 g-4">
            {currentPosts.map((post) => (
              <div key={post.id} className="col">
                <div className="card border-0">
                  {/* Pilih gambar berdasarkan ID atau gunakan placeholder */}
                  <img
                    src={
                      post.id % 3 === 1
                        ? ImgLeft1
                        : post.id % 3 === 2
                        ? ImgLeft2
                        : ImgLeft3
                    }
                    className="card-img-top"
                    alt={post.title}
                  />
                  <div className="card-body">
                    <h6 className="card-title">{post.title}</h6>
                    <p className="card-text">
                      {post.body.length > 100
                        ? `${post.body.substring(0, 100)}...`
                        : post.body}
                    </p>

                    {/* Icon */}
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex text-body-tertiary">
                        <i className="fa-solid fa-calendar-check pe-1"></i>
                        <p className="desc-icon me-4">
                          {new Date().toLocaleDateString()}{" "}
                          {/* Tanggal dummy */}
                        </p>

                        <i className="fa-solid fa-thumbs-up pe-1"></i>
                        <p className="desc-icon me-3">{post.reactions.likes}</p>

                        <i className="fa-solid fa-comment pe-1"></i>
                        <p className="desc-icon">23</p>
                      </div>
                      <div>
                        <p>
                          <i className="fa-regular fa-bookmark me-2"></i>
                          <i className="fa-solid fa-ellipsis"></i>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="right-content w-25 ps-3">
          <h5>Recommended Tags</h5>
          <div className="d-flex flex-wrap">
            {tags.slice(0, 6).map((tag) => (
              <p
                key={tag}
                className="label me-2 mb-2 px-3"
                style={{ cursor: "pointer" }}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </p>
            ))}
          </div>

          <div className="recently-saved mt-3">
            <h5>Recently Saved</h5>
            {blogs.slice(0, 2).map((blog) => (
              <div key={blog.id} className="d-flex align-items-center mb-3">
                <img
                  src={
                    blog.id % 3 === 1
                      ? ImgLeft1
                      : blog.id % 3 === 2
                      ? ImgLeft2
                      : ImgLeft3
                  }
                  className="rounded-circle me-2"
                  alt={blog.title}
                  width="40"
                  height="40"
                />
                <p className="mb-0">{blog.title}</p>
              </div>
            ))}
          </div>
          <button className="bg-body border-1 w-100 px-5">See All</button>
        </div>
      </section>

      {/* Pagination */}
      <section className="container">
        <div className="pagination-container w-75">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="pagination-text">
              Showing {currentPosts.length} of {filteredBlogs.length} Blogs
            </span>
            <nav aria-label="Page navigation">
              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    aria-label="Previous"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <span aria-hidden="true">&lt;</span>
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    key={i + 1}
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    aria-label="Next"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <span aria-hidden="true">&gt;</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
