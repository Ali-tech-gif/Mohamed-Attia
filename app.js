const products = [
    {
        id: 1,
        category: "tv",
        badge: "ترابيزات شاشة",
        name: "ترابيزة شاشة مودرن خشبي في أبيض",
        desc: "تصميم عملي بأدراج تخزين وأرفف وسطى للرسيفر، خشب عالي الجودة.",
        img: "images/1.jpg",
        colors: ["خشبي فاتح × أبيض", "بني × أبيض", "أبيض سادة"],
        sizes: ["140 سم", "160 سم", "180 سم"]
    },
    {
        id: 2,
        category: "shoes",
        badge: "جزامات مودرن",
        name: "جزامة رخامي بإطار ذهبي ومقابض دائرية",
        desc: "تشطيب رخامي فاخر مقاوم للخدش مع إطارات ذهبية تضيف لمسة ملكية للمدخل.",
        img: "images/2.jpg",
        colors: ["رخامي فاتح × ذهبي", "رخامي غامق × ذهبي"],
        sizes: ["80 سم", "100 سم"]
    },
    {
        id: 3,
        category: "bundles",
        badge: "عروض الباكدجات",
        name: "باكدج تأسيس مكتب أو عيادة متكامل",
        desc: "يشمل مكتب مدير فاخر + كرسي هيدروليك طبي + خزنة مصفحة بسعر خاص للتسليم الفوري.",
        img: "https://placehold.co",
        colors: ["بني غامق × أسود", "خشبي × أسود", "رمادي مودرن"],
        sizes: ["باكدج 140 سم", "باكدج 160 سم", "باكدج 180 سم"]
    }
];

let cart = [];
let favorites = JSON.parse(localStorage.getItem("attia_favs")) || [];
let currentCategory = "all";
let showingFavoritesOnly = false;
let currentProduct = null;

function makeWhatsAppLink(message) {
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
}

function showToast(msg) {
    const t = document.getElementById("toast");
    t.innerText = msg;
    t.className = "toast show";
    setTimeout(function() {
        t.className = "toast";
    }, 2500);
}

function updateFavBadge() {
    document.getElementById("favCount").innerText = favorites.length;
}

function toggleFavorite(id, e) {
    e.stopPropagation();
    if (favorites.includes(id)) {
        favorites = favorites.filter(function(item) { return item !== id; });
        showToast("تمت الإزالة من المفضلة");
    } else {
        favorites.push(id);
        showToast("تم الحفظ في المفضلة");
    }
    localStorage.setItem("attia_favs", JSON.stringify(favorites));
    updateFavBadge();
    handleSearch();
}

function filterFavorites(btn) {
    showingFavoritesOnly = !showingFavoritesOnly;
    btn.classList.toggle("active");
    handleSearch();
}

function renderProducts(list) {
    const grid = document.getElementById("productsGrid");
    if (list.length === 0) {
        grid.innerHTML = "<p style='grid-column:1/-1; text-align:center; padding:40px; color:#6b7280;'>لا توجد منتجات مطابقة حالياً</p>";
        return;
    }

    let html = "";
    list.forEach(function(p) {
        const isFav = favorites.includes(p.id);
        html += "<div class='card' onclick='openModal(" + p.id + ")'>";
        html += "<button class='fav-icon' onclick='toggleFavorite(" + p.id + ", event)'>" + (isFav ? "❤️" : "🤍") + "</button>";
        html += "<div class='card-img'>";
        html += "<span class='tag'>" + p.badge + "</span>";
        html += "<img src='" + p.img + "' alt='" + p.name + "' onerror=\"this.src='https://placehold.co'\">";
        html += "</div>";
        html += "<div class='card-info'>";
        html += "<h3>" + p.name + "</h3>";
        html += "<p>" + p.desc + "</p>";
        html += "<button class='btn btn-dark full-width' style='margin-top:auto;'>التفاصيل والطلب</button>";
        html += "</div></div>";
    });
    grid.innerHTML = html;
}

function filterCategory(cat, btn) {
    showingFavoritesOnly = false;
    document.getElementById("favFilterBtn").classList.remove("active");
    currentCategory = cat;
    document.querySelectorAll(".cat-btn").forEach(function(b) { b.classList.remove("active"); });
    btn.classList.add("active");
    handleSearch();
}

function handleSearch() {
    const q = document.getElementById("searchInput").value.toLowerCase().trim();
    const res = products.filter(function(p) {
        if (showingFavoritesOnly && !favorites.includes(p.id)) return false;
        const matchCat = currentCategory === "all" || p.category === currentCategory;
        const matchText = p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
        return matchCat && matchText;
    });
    renderProducts(res);
}

function refreshModalLinks() {
    if (!currentProduct) return;
    const color = document.getElementById("modalColor").value;
    const size = document.getElementById("modalSize").value;
    const fullImageLink = window.location.origin + "/" + currentProduct.img;

    const orderMsg = "[طلب شراء]\nكود: " + currentProduct.id + "\nالمنتج: " + currentProduct.name + "\nاللون: " + color + "\nالمقاس: " + size + "\nرابط الصورة: " + fullImageLink;
    const askMsg = "[استفسار]\nكود: " + currentProduct.id + "\nالمنتج: " + currentProduct.name + "\nاللون: " + color + "\nالمقاس: " + size + "\nرابط الصورة: " + fullImageLink;

    document.getElementById("modalOrderBtn").href = makeWhatsAppLink(orderMsg);
    document.getElementById("modalAskBtn").href = makeWhatsAppLink(askMsg);
}

function openModal(id) {
    const p = products.find(function(item) { return item.id === id; });
    currentProduct = p;

    document.getElementById("modalImg").src = p.img;
    document.getElementById("modalBadge").innerText = p.badge;
    document.getElementById("modalTitle").innerText = p.name;
    document.getElementById("modalDesc").innerText = p.desc;

    document.getElementById("modalColor").innerHTML = p.colors.map(function(c) { return "<option value='" + c + "'>" + c + "</option>"; }).join("");
    document.getElementById("modalSize").innerHTML = p.sizes.map(function(s) { return "<option value='" + s + "'>" + s + "</option>"; }).join("");

    refreshModalLinks();

    document.getElementById("modalCartBtn").onclick = function() {
        const color = document.getElementById("modalColor").value;
        const size = document.getElementById("modalSize").value;
        cart.push({ id: p.id, name: p.name, color: color, size: size, img: p.img });
        updateCart();
        document.getElementById("productModal").style.display = "none";
        showToast("تمت الإضافة لقائمة طلباتي");
    };

    document.getElementById("productModal").style.display = "flex";
}

function closeModal(e) {
    if (e.target.id === "productModal") {
        document.getElementById("productModal").style.display = "none";
    }
}

function toggleCart() {
    document.getElementById("cartDrawer").classList.toggle("open");
    document.getElementById("overlay").classList.toggle("active");
}

function removeFromCart(idx) {
    cart.splice(idx, 1);
    updateCart();
}

function checkCart(e) {
    if (cart.length === 0) {
        e.preventDefault();
        showToast("القائمة فارغة!");
        return false;
    }
    return true;
}

function updateCart() {
    document.getElementById("cartCount").innerText = cart.length;
    const box = document.getElementById("cartItems");
    const orderLink = document.getElementById("cartOrderLink");
    const askLink = document.getElementById("cartAskLink");

    if (cart.length === 0) {
        box.innerHTML = "<p class='empty-text'>القائمة فارغة حالياً</p>";
        orderLink.href = "#";
        askLink.href = "#";
        return;
    }

    let html = "";
    let orderMsg = "[طلب شراء قائمة]\n\n";
    let askMsg = "[استفسار قائمة]\n\n";

    cart.forEach(function(item, i) {
        const fullImageLink = window.location.origin + "/" + item.img;
        html += "<div class='cart-item'>";
        html += "<div><h4>" + item.name + "</h4><span>" + item.color + " | " + item.size + "</span></div>";
        html += "<button class='remove-btn' onclick='removeFromCart(" + i + ")'>حذف</button>";
        html += "</div>";

        const line = (i + 1) + ". كود: " + item.id + " | " + item.name + " (" + item.color + " - " + item.size + ")\n رابط الصورة: " + fullImageLink + "\n";
        orderMsg += line;
        askMsg += line;
    });

    box.innerHTML = html;
    orderLink.href = makeWhatsAppLink(orderMsg);
    askLink.href = makeWhatsAppLink(askMsg);
}

updateFavBadge();
renderProducts(products);

