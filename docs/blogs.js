const blogsContainer = document.querySelector(".blogs-container");

fetch("http://localhost:5000/api/blogs")
    .then(response => response.json())
    .then(blogs => {
        console.log("Blogs received:", blogs);

        blogsContainer.innerHTML = blogs.map(blog => `
            <article class="blog-card" onclick="openBlog('${blog._id}')">
                <h2>${blog.title}</h2>
                <p>${blog.description}</p>
                <span>${blog.date}</span>
            </article>
        `).join("");
    })
    .catch(error => {
        console.error("Error fetching blogs:", error);
    });

function openBlog(id) {
    window.location.href = `blog.html?id=${id}`;
}