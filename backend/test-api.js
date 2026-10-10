console.log("Test started");

fetch("http://localhost:5000/api/contact", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: "Manish",
        email: "manish@example.com",
        message: "Hello from my portfolio!"
    })
})
.then(response => response.json())
.then(data => {
    console.log("Response:", data);
})
.catch(error => {
    console.error("Error:", error);
});