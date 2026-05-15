window.onscroll = function() {
    const navbar = document.getElementById("navbar");
    if (window.pageYOffset > 50) {
        navbar.style.padding = "10px 8%";
        navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    } else {
        navbar.style.padding = "20px 8%";
        navbar.style.boxShadow = "none";
    }
};


document.querySelector('.search-bar button').addEventListener('click', () => {
    const query = document.querySelector('.search-bar input').value;
    if(query) {
        alert("Searching for the healing benefits of " + query + "...");
    } else {
        alert("Please enter a food or ingredient!");
    }
});

function openModal(recipeKey) {
    const modal = document.getElementById("recipeModal");
    const body = document.getElementById("modalBody");
    const data = recipeData[recipeKey];

    body.innerHTML = `
        <h2 style="color:var(--dark-green)">${data.title}</h2>
        <hr style="margin:15px 0; border:0; border-top:1px solid #eee;">
        <h4>Ingredients:</h4>
        <ul style="margin-bottom:20px; padding-left:20px;">
            ${data.ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
        <h4>Instructions:</h4>
        <p style="line-height:1.6; color:#555;">${data.instructions}</p>
    `;

    modal.style.display = "block";
}

function closeModal() {
    document.getElementById("recipeModal").style.display = "none";
}


window.onclick = function(event) {
    const modal = document.getElementById("recipeModal");
    if (event.target == modal) {
        closeModal();
    }
}

window.addEventListener('mousemove', (e) => {
    basketX = e.clientX - canvas.getBoundingClientRect().left - 25;
});

function draw() {
    ctx.clearRect(0, 0, 600, 400);
    

    ctx.font = '50px Arial';
    ctx.fillText('🧺', basketX, 350);


    items.forEach((item, index) => {
        item.y += 3;
        ctx.fillText(item.char, item.x, item.y);


        if (item.y > 330 && item.y < 360 && item.x > basketX - 20 && item.x < basketX + 40) {
            score += (item.type === 'h' ? 10 : -20);
            scoreElement.innerText = score;
            items.splice(index, 1);
        }
        
        if (item.y > 400) items.splice(index, 1);
    });

    requestAnimationFrame(draw);
}

setInterval(spawnItem, 1000);
draw();

function filterRecipes(category) {
    const cards = document.querySelectorAll('.food-card');
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

const recipeDatacenter = {
    quinoa: {
        title: "Quinoa Power Bowl",
        ingredients: ["1 cup Quinoa", "Black beans", "Avocado", "Lime juice"],
        instructions: "Boil quinoa for 15 mins. Mix with beans and top with avocado slices.",
        cost: "$3.50",
        difficulty: "Easy"
    },
    turmeric_curry: {
        title: "Anti-Inflammatory Turmeric Curry",
        ingredients: ["Chickpeas", "Fresh Turmeric", "Coconut Milk", "Spinach"],
        instructions: "Sauté turmeric with onions, add chickpeas and coconut milk. Simmer until creamy and fold in spinach.",
        cost: "$4.20",
        difficulty: "Medium"
    },
};

function openModal(recipeKey) {
    const modal = document.getElementById("recipeModal");
    const body = document.getElementById("modalBody");
    const data = recipeDatacenter[recipeKey];

    body.innerHTML = `
        <h2 style="color:var(--dark-green)">${data.title}</h2>
        
        <div style="display: flex; gap: 20px; margin: 15px 0; color: #666;">
            <span><strong>Cost:</strong> ${data.cost}</span>
            <span><strong>Difficulty:</strong> ${data.difficulty}</span>
        </div>
        
        <hr style="margin:15px 0; border:0; border-top:1px solid #eee;">
        
        <h4>Ingredients:</h4>
        <ul style="margin-bottom:20px; padding-left:20px;">
            ${data.ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
        
        <h4>Instructions:</h4>
        <p style="line-height:1.6; color:#555;">${data.instructions}</p>
    `;

    modal.style.display = "block";
}
async function startScan() {
    const video = document.getElementById('video');
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    
    document.getElementById('results').style.display = 'block';
    document.getElementById('foodName').innerText = "Identifying...";
    
    setTimeout(() => {
        document.getElementById('foodName').innerText = "Somehing";
        document.getElementById('foodKg').innerText = "0.25";
        document.getElementById('foodKcal').innerText = "160";
    }, 2000); 
}


function handleFileUpload(files) {
    if (files && files[0]) {
        const reader = new FileReader();
        const preview = document.getElementById('uploadPreview');
        const video = document.getElementById('video');
        
        reader.onload = function(e) {
            
            preview.src = e.target.result;
            preview.style.display = 'block';
            
            
            video.style.display = 'none';
            if(video.srcObject) {
                video.srcObject.getTracks().forEach(track => track.stop());
            }

            
            simulateAnalysis("Processing Image...");
        };
        reader.readAsDataURL(files[0]);
    }
}


async function startScan() {
    const video = document.getElementById('video');
    const preview = document.getElementById('uploadPreview');
    
    
    preview.style.display = 'none';

    try {
        
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }); 
        video.srcObject = stream;
        video.style.display = 'block';

        
        simulateAnalysis("Analyzing Video Feed...");
    } catch (err) {
        alert("Unable to access camera: " + err);
    }
}


function simulateAnalysis(loadingMessage) {
    document.getElementById('results').style.display = 'block';
    document.getElementById('foodName').innerText = loadingMessage;
    
    setTimeout(() => {
        
        document.getElementById('foodName').innerText = "Somehing";
        document.getElementById('foodKg').innerText = "0.25";
        document.getElementById('foodKcal').innerText = "150";
    }, 2500); 
}
function simulateAnalysis(loadingMessage) {
    document.getElementById('results').style.display = 'block';
    document.getElementById('foodName').innerText = loadingMessage;
    
    setTimeout(() => {
        const foodType = 1; 
        const gauge = document.getElementById('healthGauge');
        const statusText = document.getElementById('healthStatus');

        
        if (foodType === 1) { 
            gauge.style.width = '100%';
            gauge.style.backgroundColor = '#4CAF50'; 
            statusText.innerText = "Excellent Choice! (Healing Food)";
            statusText.style.color = '#4CAF50';
        } else if (foodType === 2) { 
            gauge.style.width = '60%';
            gauge.style.backgroundColor = '#FFC107'; 
            statusText.innerText = "Neutral Choice";
            statusText.style.color = '#FFC107';
        } else { 
            gauge.style.width = '30%';
            gauge.style.backgroundColor = '#F44336'; 
            statusText.innerText = "Caution: Processed Food";
            statusText.style.color = '#F44336';
        }

        document.getElementById('foodName').innerText = "Human";
        document.getElementById('foodKg').innerText = "0.22";
        document.getElementById('foodKcal').innerText = "142";
    }, 2500);
}

function displayRealData(foodObject) {
    const gauge = document.getElementById('healthGauge');
    const statusText = document.getElementById('healthStatus');
    const results = document.getElementById('results');

    results.style.display = 'block';
    document.getElementById('foodName').innerText = foodObject.name;
    document.getElementById('foodKg').innerText = foodObject.weight;
    document.getElementById('foodKcal').innerText = foodObject.calories;

    
    if (foodObject.type === 'healthy') {
        gauge.style.width = '100%';
        gauge.style.backgroundColor = '#4CAF50';
        statusText.innerText = "Excellent Choice!";
        statusText.style.color = '#4CAF50';
    } else if (foodObject.type === 'normal') {
        gauge.style.width = '60%';
        gauge.style.backgroundColor = '#FFC107';
        statusText.innerText = "Neutral Choice";
        statusText.style.color = '#FFC107';
    } else {
        gauge.style.width = '30%';
        gauge.style.backgroundColor = '#F44336';
        statusText.innerText = "Caution: Fast Food";
        statusText.style.color = '#F44336';
    }
}
async function analyzeImage(imageData) {
    document.getElementById('foodName').innerText = "Analyzing...";
    
    

    const mockDatabase = [
        { name: "Fresh Apple", weight: "0.15", calories: "52", type: "healthy" },
        { name: "Burger", weight: "0.30", calories: "600", type: "fastfood" },
        { name: "Rice Bowl", weight: "0.40", calories: "350", type: "normal" }
    ];
    
    const randomResult = mockDatabase[Math.floor(Math.random() * mockDatabase.length)];
    
    setTimeout(() => {
        displayRealData(randomResult);
    }, 1500);
}
let cart = [];

function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('active');
}

function addToCart(name, price) {
    
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }
    
    updateCartUI();
    if(!document.getElementById('cartSidebar').classList.contains('active')) {
        toggleCart();
    }
}

function updateCartUI() {
    const container = document.getElementById('cartItems');
    const totalEl = document.getElementById('cartTotal');
    const countEl = document.getElementById('cartCount');
    
    container.innerHTML = '';
    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        count += item.quantity;
        
        container.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>$${item.price} x ${item.quantity}</small>
                </div>
                <button onclick="removeFromCart(${index})" style="background:none; border:none; color:red; cursor:pointer;">&times;</button>
            </div>
        `;
    });

    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-msg">Your basket is empty.</p>';
    }

    totalEl.innerText = `$${total.toFixed(2)}`;
    countEl.innerText = count;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function checkout() {
    if (cart.length === 0) return alert("Savat bo'sh!");
    alert("Xarid uchun rahmat! Made in Uzbekistan 🇺🇿");
    cart = [];
    updateCartUI();
    toggleCart();
}