function getModelInfo(modelName) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var xmlDoc = this.responseXML;
            if (!xmlDoc) {
                console.error("Не удалось загрузить XML файл");
                return;
            }
            var product = Array.from(xmlDoc.getElementsByTagName("product")).find(product => product.querySelector("name").textContent === modelName);
            if (!product) {
                console.error("Не найден продукт с именем " + modelName);
                return;
            }

            var modelElements = product.getElementsByTagName("model");
            if (modelElements.length !== 2) {
                console.error("Неверное количество моделей для продукта " + modelName);
                return;
            }

            for (var i = 0; i < 2; i++) {
                var model = modelElements[i];
                var modelNameElement = model.getElementsByTagName("name")[0].textContent;
                var modelDescription = model.getElementsByTagName("description")[0].textContent;
                var modelImage = model.getElementsByTagName("image")[0].textContent;
                var modelPrice = model.getElementsByTagName("price")[0].textContent;

                document.getElementById("smallh" + (i+1)).innerText = modelNameElement;
                document.getElementById("description" + (i+1)).innerText = modelDescription;
                document.getElementById("smallimg" + (i+1)).src = modelImage;
                document.getElementById("price" + (i+1)).innerText = modelPrice;
            }

            var productName = product.getElementsByTagName("name")[0].textContent;
            var productDescription = product.getElementsByTagName("description")[0].textContent;
            var productImage = product.getElementsByTagName("image")[0].textContent;

            document.getElementById("smallh").innerText = productName;
            document.getElementById("description").innerText = productDescription;
            document.getElementById("bigimg").src = productImage;
        }
    };
    xhttp.open("GET", "xml_page/thirdPage.xml", true);
    xhttp.send();
}

function getModelInfoAndUpdateActive(modelName) {
    getModelInfo(modelName);
    updateActive(event.target);
}

function updateActive(target) {
    let modelButtons = document.getElementsByClassName('button-car');
    for (let i = 0; i < modelButtons.length; i++) {
        modelButtons[i].classList.remove('active_for_cars');
    }
    target.classList.add('active_for_cars');
}

document.addEventListener("DOMContentLoaded", function() {
    const modelButtons = document.querySelectorAll('.button-car');
    modelButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            getModelInfoAndUpdateActive(event.target.dataset.model);
        });
    });
});

