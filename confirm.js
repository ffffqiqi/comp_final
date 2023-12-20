document.getElementById('generateButton').addEventListener('click', function () {
    const prompt = 'your_prompt'; // Replace with your actual prompt
    fetch(`http://localhost:3000/generate?prompt=${prompt}`)
        .then(response => response.blob())
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob);
            const img = document.createElement('img');
            img.src = imageUrl;
            document.getElementById("output1").appendChild(img)
            // Do something with the image URL...
        })
        .catch(error => console.error(error));
});
