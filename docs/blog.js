const params = new URLSearchParams(window.location.search);
const blogId = params.get("id");

const title = document.getElementById("blog-title");
const date = document.getElementById("blog-date");
const description = document.getElementById("blog-description");
const content = document.getElementById("blog-content");

if (!blogId) {
    title.textContent = "Blog not found";
} else {
    fetch(`http://localhost:5000/api/blogs/${blogId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Blog not found");
            }

            return response.json();
        })
        .then(blog => {
            title.textContent = blog.title;
            date.textContent = blog.date;
            description.textContent = blog.description;
            content.textContent = blog.content;
        })
        .catch(error => {
            console.error(error);
            title.textContent = "Blog not found";
        });
}