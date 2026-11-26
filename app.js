const WHATSAPP_NUMBER = "/201013640404";

const products = [
    {
        id: 1,
        category: "tv",
        badge: "ترابيزات شاشة",
        name: "ترابيزة شاشة مودرن خشبي في أبيض",
        desc: "تصميم عملي بأدراج تخزين وأرفف وسطى للرسيفر، خشب عالي الجودة.",
        img: "images/tv1.jpg",
        colors: ["خشبي فاتح × أبيض", "بني × أبيض", "أبيض سادة"],
        sizes: ["140 سم", "160 سم", "180 سم"]
    },
    {
        id: 2,
        category: "shoes",
        badge: "جزامات مودرن",
        name: "جزامة رخامي بإطار ذهبي ومقابض دائرية",
        desc: "تشطيب رخامي فاخر مقاوم للخدش مع إطارات ذهبية تضيف لمسة ملكية للمدخل.",
        img: "images/shoe4.jpg",
        colors: ["رخامي فاتح × ذهبي", "رخامي غامق × ذهبي"],
        sizes: ["80 سم", "100 سم"]
    },
    {
        id: 3,
        category: "bundles",
        badge: "عروض الباكدجات",
        name: "باكدج تأسيس مكتب أو عيادة متكامل",
        desc: "يشمل مكتب مدير فاخر + كرسي هيدروليك طبي + خزنة مصفحة بسعر خاص للتسليم الفوري.",
        img: "https://placehold.com",
        colors: ["بني غامق × أسود", "خشبي × أسود", "رمادي مودرن"],
        sizes: ["باكدج 140 سم", "باكدج 160 سم", "باكدج 180 سم"]
    }
];

let cart = [];
let favorites = JSON.parse(localStorage.getItem("attia_favs")) || [];
let currentCategory = "all";
let showingFavoritesOnly = false;
let activeModalProduct = null;

function buildWhatsAppUrl(text) {
    return "https://wa.me" + encodeURIComponent(text);
}

function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.innerText = msg;
    toast.className = "toast show";
    setTimeout(function() {
        toast.className = toast.className.replace("show", "");
    }, 2500);
}

function updateFavCount() {
    document.getElementById("favCount").innerText = favorites.length;
}

function toggleFavorite(id, event) {
    event.stopPropagation();
    if (favorites.includes(id)) {
        favorites = favorites.filter(function(favId) {
            return favId !== id;
        });
        showToast("تمت الإزالة من المفضلة");
    } else {
        favorites.push(id);
        showToast("تم الحفظ في المفضلة");
    }
    localStorage.setItem("attia_favs", JSON.stringify(favorites));
    updateFavCount();
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
        const emptyTitle = showingFavoritesOnly ? "قائمة المفضلة فارغة حالياً" : "مفيش منتجات في القسم ده حالياً";
        grid.innerHTML = "<div style='grid-column: 1/-1; text-align:center; padding:40px; color:#64748b;'><h3>" + emptyTitle + "</h3></div>";
        return;
    }

    let htmlContent = "";
    list.forEach(function(p) {
        const isFav = favorites.includes(p.id);
        const favIcon = isFav ? "❤️" : "🤍";

        htmlContent += "<div class='card' onclick='openModal(" + p.id + ")' style='cursor:pointer;'>";
        htmlContent += "<button class='fav-btn' onclick='toggleFavorite(" + p.id + ", event)' title='أضف للمفضلة'>" + favIcon + "</button>";
        htmlContent += "<div class='img-wrapper'>";
        htmlContent += "<span class='badge'>" + p.badge + "</span>";
        htmlContent += "<img src='" + p.img + "' alt='" + p.name + "' onerror=\"this.src='https://placehold.co'\">";
        htmlContent += "<span class='zoom-hint'>اضغط للتفاصيل والطلب</span>";
        htmlContent += "</div>";
        htmlContent += "<div class='card-body'>";
        htmlContent += "<h3>" + p.name + "</h3>";
        htmlContent += "<p>" + p.desc + "</p>";
        htmlContent += "<button class='btn-cart-full' style='margin-top:auto;'>عرض التفاصيل والطلب</button>";
        htmlContent += "</div></div>";
    });

    grid.innerHTML = htmlContent;
}

function filterCategory(cat, btn) {
    showingFavoritesOnly = false;
    document.getElementById("favFilterBtn").classList.remove("active");
    currentCategory = cat;
    document.querySelectorAll(".cat-btn").forEach(function(b) {
        b.classList.remove("active");
    });
    btn.classList.add("active");
    handleSearch();
}

function handleSearch() {
    const query = document.getElementById("searchInput").value.toLowerCase().trim();
    const filtered = products.filter(function(p) {
        if (showingFavoritesOnly && !favorites.includes(p.id)) {
            return false;
        }
        const matchCat = currentCategory === "all" || p.category === currentCategory;
        const matchText = p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query) || p.badge.toLowerCase().includes(query);
        return matchCat && matchText;
    });
    renderProducts(filtered);
}

function addToCartFromModal(id) {
    const product = products.find(function(p) {
        return p.id === id;
    });
    const color = document.getElementById("modalColor").value;
    const size = document.getElementById("modalSize").value;
    cart.push({ id: product.id, name: product.name, color: color, size: size, img: product.img });
    updateCartUI();
    document.getElementById("productModal").style.display = "none";
    showToast("تمت الإضافة لقائمة طلباتك");
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function validateCart(event) {
    if (cart.length === 0) {
        event.preventDefault();
        showToast("ضيف منتجات للقائمة الأول!");
        return false;
    }
    return true;
}

function updateCartUI() {
    document.getElementById("cartCount").innerText = cart.length;
    const container = document.getElementById("cartItems");
    const orderLink = document.getElementById("cartOrderLink");
    const askLink = document.getElementById("cartAskLink");

    if (cart.length === 0) {
        container.innerHTML = "<p class='empty-msg'>القائمة فارغة حالياً.. ضيف المنتجات اللي عجبتك!</p>";
        orderLink.href = "#";
        askLink.href = "#";
        return;
    }

    let cartHtml = "";
    let orderText = "[طلب شراء قائمة]\n\n";
    let askText = "[استفسار قائمة]\n\n";

    cart.forEach(function(item, idx) {
        cartHtml += "<div class='cart-item'>";
        cartHtml += "<div class='cart-item-info'>";
        cartHtml += "<h4>" + item.name + " (كود: " + item.id + ")</h4>";
        cartHtml += "<span>اللون: " + item.color + " | المقاس: " + item.size + "</span>";
        cartHtml += "</div>";
        cartHtml += "<button class='remove-item' onclick='removeFromCart(" + idx + ")'>حذف</button>";
        cartHtml += "</div>";

        const itemLine = (idx + 1) + ". كود: " + item.id + " | " + item.name + "\n اللون: " + item.color + " | المقاس: " + item.size + "\n الصورة: " + item.img + "\n\n";
        orderText += itemLine;
        askText += itemLine;
    });

    orderText += "محتاج أعرف خطوات الاستلام والتوصيل.";
    askText += "ممكن أعرف الأسعار والتفاصيل؟";

    container.innerHTML = cartHtml;
    orderLink.href = buildWhatsAppUrl(orderText);
    orderLink.target = "_blank";
    askLink.href = buildWhatsAppUrl(askText);
    askLink.target = "_blank";
}

function toggleCart(forceOpen) {
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("overlay");
    if (forceOpen === true) {
        drawer.classList.add("open");
        overlay.classList.add("active");
    } else {
        drawer.classList.toggle("open");
        overlay.classList.toggle("active");
    }
}

function updateModalLinks() {
    if (!activeModalProduct) return;
    const p = activeModalProduct;
    const color = document.getElementById("modalColor").value;
    const size = document.getElementById("modalSize").value;

    const orderText = "[طلب شراء]\nكود: " + p.id + "\nالمنتج: " + p.name + "\nاللون: " + color + "\nالمقاس: " + size + "\nكود الصورة: " + p.img;
    const askText = "[استفسار]\nكود: " + p.id + "\nالمنتج: " + p.name + "\nاللون: " + color + "\nالمقاس: " + size + "\nكود الصورة: " + p.img;

    const orderBtn = document.getElementById("modalOrderBtn");
    const askBtn = document.getElementById("modalAskBtn");

    orderBtn.href = buildWhatsAppUrl(orderText);
    orderBtn.target = "_blank";
    askBtn.href = buildWhatsAppUrl(askText);
    askBtn.target = "_blank";
}

function openModal(id) {
    const p = products.find(function(item) {
        return item.id === id;
    });
    activeModalProduct = p;

    document.getElementById("modalImg").src = p.img;
    document.getElementById("modalBadge").innerText = p.badge;
    document.getElementById("modalTitle").innerText = p.name;
    document.getElementById("modalDesc").innerText = p.desc;

    document.getElementById("modalColor").innerHTML = p.colors.map(function(c) {
        return "<option value='" + c + "'>" + c + "</option>";
    }).join("");
    document.getElementById("modalSize").innerHTML = p.sizes.map(function(s) {
        return "<option value='" + s + "'>" + s + "</option>";
    }).join("");

    updateModalLinks();

    document.getElementById("modalCartBtn").onclick = function() {
        addToCartFromModal(p.id);
    };

    document.getElementById("productModal").style.display = "flex";
}

function closeModal(e) {
    if (e.target.id === "productModal") {
        document.getElementById("productModal").style.display = "none";
    }
}

updateFavCount();
renderProducts(products);

