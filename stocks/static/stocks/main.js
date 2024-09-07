document.addEventListener('DOMContentLoaded', function () {
    const stockForm = document.getElementById('stockForm');
    const stockList = document.getElementById('stockList');
    const seeStocksBtn = document.getElementById('seeStocksBtn');
    const editStockForm = document.getElementById('editStockForm');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const editStockId = document.getElementById('editStockId');
    const editName = document.getElementById('editName');
    const editTickerSymbol = document.getElementById('editTickerSymbol');
    const editPrice = document.getElementById('editPrice');
    
    let stocksVisible = false;

    // Get CSRF token from cookie
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const csrftoken = getCookie('csrftoken');

    document.getElementById('editPrice').addEventListener('input', function(e) {
        if (this.value < 0) {
            this.value = 0; 
        }
    });

    // Function to fetch and display stocks
    async function fetchStocks() {
        const response = await fetch('/api/stocks/');
        const stocks = await response.json();
        
        stockList.innerHTML = '';  

        if (stocks.length === 0) {
            stockList.innerHTML = '<li>No stocks available</li>';
        } else {
            stocks.forEach(stock => {
                const li = document.createElement('li');
                li.innerHTML = `
                    ${stock.name} (${stock.ticker_symbol}) - ₹${stock.price}
                    <div class="button-container">
                        <button class="edit-btn" data-id="${stock.id}">Edit</button>
                        <button class="delete-btn" data-id="${stock.id}">Delete</button>
                    </div>
                `;
                stockList.appendChild(li);
            });

            attachEditAndDeleteEvents();
        }
    }

    // Function to toggle stock visibility
    function toggleStockVisibility() {
        if (stocksVisible) {
            stockList.innerHTML = '';
            seeStocksBtn.textContent = 'View Stocks';
        } else {
            fetchStocks();
            seeStocksBtn.textContent = 'Hide Stocks';
        }
        stocksVisible = !stocksVisible; 
    }

    seeStocksBtn.addEventListener('click', function () {
        toggleStockVisibility();
    });

    // Function to add new stock
    stockForm.addEventListener('submit', async function (e) {
        e.preventDefault();
    
        const name = document.getElementById('name').value;
        const ticker_symbol = document.getElementById('ticker_symbol').value;
        const price = document.getElementById('price').value;
    
        const response = await fetch('/api/stocks/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({ name, ticker_symbol, price })
        });
    
        const result = await response.json();
    
        if (response.ok) {
            stockForm.reset();
            if (!stocksVisible) {
                toggleStockVisibility();
            } else {
                fetchStocks();
            }
        } else {
            alert(result.ticker_symbol || "Failed to create stock");
        }
    });
    

    // Function to delete a stock
    async function deleteStock(id) {
        const response = await fetch(`/api/stocks/${id}/`, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': csrftoken
            }
        });
        if (response.ok) {
            fetchStocks(); 
        }
    }

    // Function to edit a stock
    async function editStock(id) {
        const response = await fetch(`/api/stocks/${id}/`);
        const stock = await response.json();
        
        editStockId.value = stock.id;
        editName.value = stock.name;
        editTickerSymbol.value = stock.ticker_symbol;
        editPrice.value = stock.price;

        document.querySelector('.form-section').style.display = 'none';
        document.querySelector('.see-stocks-section').style.display = 'none';
        document.querySelector('.stock-list').style.display = 'none';
        document.querySelector('.edit-form-section').style.display = 'block';
    }

    // Handle stock update
    editStockForm.addEventListener('submit', async function (e) {
        e.preventDefault();
    
        const id = editStockId.value;
        const name = editName.value;
        const ticker_symbol = editTickerSymbol.value;
        const price = editPrice.value;
    
        const response = await fetch(`/api/stocks/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({ name, ticker_symbol, price })
        });
    
        const result = await response.json(); 
    
        if (response.ok) {
            document.querySelector('.edit-form-section').style.display = 'none';
            document.querySelector('.form-section').style.display = 'block';
            document.querySelector('.see-stocks-section').style.display = 'block';
            document.querySelector('.stock-list').style.display = 'block';
    
            fetchStocks();
        } else {
            if (result.ticker_symbol) {
                alert(result.ticker_symbol);  
            } else {
                alert("Failed to update stock");
            }
        }
    });
    
    // Cancel editing
    cancelEditBtn.addEventListener('click', function () {
        document.querySelector('.edit-form-section').style.display = 'none';
        document.querySelector('.form-section').style.display = 'block';
        document.querySelector('.see-stocks-section').style.display = 'block';
        document.querySelector('.stock-list').style.display = 'block';
    });

    function attachEditAndDeleteEvents() {
        const editButtons = document.querySelectorAll('.edit-btn');
        const deleteButtons = document.querySelectorAll('.delete-btn');

        editButtons.forEach(button => {
            button.addEventListener('click', function () {
                const id = this.getAttribute('data-id');
                editStock(id);
            });
        });

        deleteButtons.forEach(button => {
            button.addEventListener('click', function () {
                const id = this.getAttribute('data-id');
                deleteStock(id);
            });
        });
    }
});
