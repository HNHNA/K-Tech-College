const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function loadItemToList() {
    fetch("news-item.html")
        .then((response) => response.text())
        .then((data) => {
            const listItem = Array.from(
                {
                    length: 4,
                },
                () => data
            ).join("");
            console.log(listItem);
            document.querySelector(".list-item").innerHTML = listItem;
        });

}