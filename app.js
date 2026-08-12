class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UI {
    addProduct(product) {
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');

        element.innerHTML = `
        <div class="card text-center mb-4">
            <div class="card-body">
                <strong>Nombre del producto</strong>: ${product.name}
                <strong>Precio del producto</strong>: ${product.price}
                <strong>Año del producto</strong>: ${product.year}
                <a href="#" class="btn btn-danger" name="delete">Eliminar</a>
            </div>
        </div>
        `;

        productList.appendChild(element);
    }

    resetForm() {
        document.getElementById('product-form').reset();
    }

    deleteProducto(element) {
        if (element.name === 'delete') {
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Producto eliminado correctamente.', 'info');
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-4`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');
        const app = document.querySelector('#App');

        container.insertBefore(div, app);

        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 2000);
    }
}

document.getElementById('product-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;

    const product = new Product(name, price, year);
    const ui = new UI();

    if (name === '' || price === '' || year === '') {
        ui.showMessage('Complete todos los campos, por favor.', 'danger');
        return;
    }

    ui.addProduct(product);
    ui.resetForm();
    ui.showMessage('Producto agregado correctamente.', 'success');
});

document.getElementById('product-list').addEventListener('click', function (e) {
    const ui = new UI();
    ui.deleteProducto(e.target);
});