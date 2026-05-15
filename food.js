
const STORAGE_KEY = 'healthyfood_products';

const defaultProducts = [
    {
        id: '1',
        name: "Quinoa & Roasted Veg",
        price: 12.00,
        img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
        kg: "0.35 kg",
        kcal: "410 kcal",
        desc: "Yallig'lanishga qarshi, oqsillarga boy kinoa va sabzavotlar."
    },
    {
        id: '2',
        name: "Wild Salmon & Greens",
        price: 15.50,
        img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500",
        kg: "0.40 kg",
        kcal: "450 kcal",
        desc: "Omega-3 yog' kislotalariga boy, mushaklarni tiklovchi baliq taomi."
    },
    {
        id: '3',
        name: "health salad & protein",
        price: 14.99,
        img: "./image.png",
        kg: "0.40 kg",
        kcal: "450 kcal",
        desc: "faqat protein va bu zararsiz!"
    },
    {
        id: '4',
        name: "Premium Dragon Fruit",
        price: 8.50,
        img: "./image copy.png",
        kg: "0.50 kg",
        kcal: "60 kcal",
        desc: "Pushti rangli bu ekzotik meva ovqat hazm qilish tizimini yaxshilaydi."
    }
];

const ORDER_KEY = 'healthyfood_orders';
const USER_KEY = 'healthyfood_users';

const defaultOrders = [
    { id: '#ORD-7721', customer: 'Ali Valiyev', total: 45.00, status: 'Completed', date: '2025-01-1' },
    { id: '#ORD-7722', customer: 'Guli Rahimova', total: 12.50, status: 'Pending', date: '2026-05-9' },
    { id: '#ORD-7723', customer: 'Abubakr Tuechiev', total: 49.50, status: 'Pending', date: '2026-05-12' },
    { id: '#ORD-7724', customer: 'Turaeva Aziza', total: 45.00, status: 'Completed', date: '2025-01-1' },
    { id: '#ORD-7725', customer: 'Muhomadali Akimov', total: 12.50, status: 'Canceled', date: '2026-05-9' }
];

const defaultUsers = [
    { name: 'Admin', email: 'admin@healthyfood.uz', role: 'Admin', status: 'Online' },
    { name: 'John Doe', email: 'john@example.com', role: 'Customer', status: 'Offline' },
    { name: 'Muhomadali Akimov', email: 'Muhamadali@example.com', role: 'Moderator', status: 'Offline' },
    { name: 'Jane Doe', email: 'Jane@example.com', role: 'Customer', status: 'Offline' },
    { name: 'Aziza Azizova', email: 'Aziza@example.com', role: 'Pre-moderator', status: 'Offline' }
];

const ACTIVITY_KEY = 'healthyfood_activities';

const defaultActivities = [
    { action: 'New Order', details: 'Order #ORD-7723 placed by Abubakr', time: '2 mins ago' },
    { action: 'Product Added', details: 'Royal Mangosteen added to shop', time: '1 hour ago' },
    { action: 'System', details: 'Backup completed successfully', time: '3 hours ago' }
];

function getActivities() {
    const stored = localStorage.getItem(ACTIVITY_KEY);
    if (!stored) {
        localStorage.setItem(ACTIVITY_KEY, JSON.stringify(defaultActivities));
        return defaultActivities;
    }
    return JSON.parse(stored);
}

function logActivity(action, details) {
    const activities = getActivities();
    activities.unshift({
        action,
        details,
        time: 'Just now'
    });
    // Keep only last 10
    if (activities.length > 10) activities.pop();
    localStorage.setItem(ACTIVITY_KEY, JSON.stringify(activities));
}

function getProducts() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts));
        return defaultProducts;
    }
    return JSON.parse(stored);
}

function getOrders() {
    const stored = localStorage.getItem(ORDER_KEY);
    if (!stored) {
        localStorage.setItem(ORDER_KEY, JSON.stringify(defaultOrders));
        return defaultOrders;
    }
    return JSON.parse(stored);
}

function getUsers() {
    const stored = localStorage.getItem(USER_KEY);
    if (!stored) {
        localStorage.setItem(USER_KEY, JSON.stringify(defaultUsers));
        return defaultUsers;
    }
    return JSON.parse(stored);
}

function saveProduct(product) {
    const products = getProducts();
    const index = products.findIndex(p => p.id === product.id);
    
    if (index !== -1) {
        products[index] = product;
        logActivity('Product Updated', `${product.name} tahrirlandi`);
    } else {
        products.push(product);
        logActivity('Product Added', `${product.name} qo'shildi`);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

function deleteProduct(id) {
    let products = getProducts();
    const p = products.find(item => item.id === id);
    if (p) logActivity('Product Deleted', `${p.name} o'chirildi`);
    
    products = products.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

function addToCart(name, price) {
    console.log(`Added to cart: ${name} - $${price}`);
   
    if (typeof showCartModal === 'function') {
        showCartModal(name);
    }
}
