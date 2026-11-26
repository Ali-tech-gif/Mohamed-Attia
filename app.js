/* ===== الإعدادات ===== */
const WA_NUMBER = "201013640404";
// بعد ما تعمل الشيت: File > Share > Publish to web > CSV، وحط اللينك هنا. سيبه فاضي لو لسه.
const SHEET_CSV_URL = "";
const PLACEHOLDER = "https://placehold.co/600x400?text=Mohamed+Attia";

/* ===== المنتجات الاحتياطية (تظهر لو الشيت فاضي أو فشل) ===== */
let products = [
    { id: 1, category: "chairs", badge: "كراسي مكتب", name: "كرسي مدير طبي هيدروليك فاخر",
      desc: "تصميم مريح للظهر مع مساند مبطنة وقاعدة معدنية قوية وعجل مستورد.",
      img: "images/1.jpg", colors: ["بني × أسود", "أسود ملكي", "جملي"], sizes: ["ظهر عالي", "ظهر متوسط"], price: "" },
    { id: 2, category: "shoes", badge: "جزامات مودرن", name: "جزامة رخامي بإطار ذهبي ومقابض دائرية",
      desc: "تشطيب رخامي فاخر مقاوم للخدش مع إطارات ذهبية تضيف لمسة ملكية للمدخل.",
      img: "images/2.jpg", colors: ["رخامي فاتح × ذهبي", "رخامي غامق × ذهبي"], sizes: ["80 سم", "100 سم"], price: "" },
    { id: 3, category: "bundles", badge: "عروض الباكدجات", name: "باكدج تأسيس مكتب أو عيادة متكامل",
      desc: "يشمل مكتب مدير فاخر + كرسي هيدروليك طبي + خزنة مصفحة بسعر خاص للتسليم الفوري.",
      img: "images/3.jpg", colors: ["بني غامق × أسود", "خشبي × أسود", "رمادي مودرن"], sizes: ["باكدج 140 سم", "باكدج 160 سم", "باكدج 180 سم"], price: "" }
];

/* ===== أدوات مساعدة ===== */
function load(k) { try { return JSON.parse(localStorage.getItem(k)) || []; } catch (e) { return []; } }
function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
}
function $(id) { return document.getElementById(id); }
function productLink(id) { return location.origin + location.pathname + "#p" + id; }
function waLink(text) { return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text); }
function setLink(a, text) { a.href = waLink(text); a.target = "_blank"; a.rel = "noopener"; }

let cart = load("attia_cart");
let favorites = load("attia_favs");
let currentCategory = "all";
let showingFavoritesOnly = false;
let currentProduct = null;
let toastTimer;

function showToast(msg) {
    const t = $("toast");
    t.textContent = msg;
    t.className = "toast show";
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.className = "toast"; }, 2500);
}

/* ===== قراءة الشيت (CSV) =====
   أعمدة الشيت بالإنجليزي في الصف الأول:
   id, name, category, badge, desc, img, colors, sizes, price, available
   الألوان والمقاسات بينهم علامة |   مثال: بني|أسود|جملي
   أي أعمدة تانية (زي "اسم أبويا") بيتجاهلها الموقع. */
function parseCSV(t) {
    const rows = []; let r = [], c = "", q = false;
    for (let i = 0; i < t.length; i++) {
        const ch = t[i];
        if (q) {
            if (ch === '"') { if (t[i + 1] === '"') { c += '"'; i++; } else q = false; }
            else c += ch;
        } else if (ch === '"') q = true;
        else if (ch === ",") { r.push(c); c = ""; }
        else if (ch === "\n") { r.push(c); rows.push(r); r = []; c = ""; }
        else if (ch !== "\r") c += ch;
    }
    if (c || r.length) { r.push(c); rows.push(r); }
    return rows;
}

function loadSheet() {
    if (!SHEET_CSV_URL) return Promise.resolve();
    return fetch(SHEET_CSV_URL).then(function (r) { return r.text(); }).then(function (txt) {
        const rows = parseCSV(txt);
        const head = rows.shift().map(function (h) { return h.trim().toLowerCase(); });
        const list = rows.map(function (row) {
            const o = {};
            head.forEach(function (h, i) { o[h] = (row[i] || "").trim(); });
            return o;
        }).filter(function (o) {
            return o.id && o.name && !/^(لا|no|false|0)$/i.test(o.available || "");
        }).map(function (o) {
            return {
                id: Number(o.id), category: o.category || "all", badge: o.badge || "", name: o.name,
                desc: o.desc || "", img: o.img || PLACEHOLDER, price: o.price || "",
                colors: (o.colors || "غير محدد").split("|"), sizes: (o.sizes || "غير محدد").split("|")
            };
        });
        if (list.length) products = list;
    }).catch(function () { /* لو فشل بنكمل بالمنتجات الاحتياطية */ });
}

/* ===== المفضلة والبحث والأقسام ===== */
function updateFavBadge() { $("favCount").textContent = favorites.length; }

function toggleFavorite(id) {
    if (favorites.includes(id)) {
        favorites = favorites.filter(function (x) { return x !== id; });
        showToast("تمت الإزالة من المفضلة");
    } else {
        favorites.push(id);
        showToast("تم الحفظ في المفضلة");
    }
    save("attia_favs", favorites);
    updateFavBadge();
    handleSearch();
}

function filterFavorites(btn) {
    showingFavoritesOnly = !showingFavoritesOnly;
    btn.classList.toggle("active", showingFavoritesOnly);
    handleSearch();
}

function filterCategory(cat, btn) {
    showingFavoritesOnly = false;
    $("favFilterBtn").classList.remove("active");
    currentCategory = cat;
    document.querySelectorAll(".cat-btn").forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    handleSearch();
}

function handleSearch() {
    const q = $("searchInput").value.toLowerCase().trim();
    renderProducts(products.filter(function (p) {
        if (showingFavoritesOnly && !favorites.includes(p.id)) return false;
        const okCat = currentCategory === "all" || p.category === currentCategory;
        const okText = !q || (p.name + " " + p.desc + " " + p.badge).toLowerCase().includes(q);
        return okCat && okText;
    }));
}

function renderProducts(list) {
    const grid = $("productsGrid");
    if (!list.length) {
        grid.innerHTML = "<p style='grid-column:1/-1;text-align:center;padding:40px;color:#64748b;'>لا توجد منتجات مطابقة حالياً</p>";
        return;
    }
    grid.innerHTML = list.map(function (p) {
        const heart = favorites.includes(p.id) ? "❤️" : "🤍";
        return "<div class='card' data-id='" + p.id + "'>" +
            "<button class='fav-icon' data-fav='" + p.id + "' aria-label='المفضلة'>" + heart + "</button>" +
            "<div class='card-img'><span class='tag'>" + esc(p.badge) + "</span>" +
            "<img loading='lazy' src='" + esc(p.img) + "' alt='" + esc(p.name) + "'></div>" +
            "<div class='card-info'><h3>" + esc(p.name) + "</h3><p>" + esc(p.desc) + "</p>" +
            (p.price ? "<div class='price'>" + esc(p.price) + " جنيه</div>" : "") +
            "<button class='btn btn-dark full-width' style='margin-top:auto;'>التفاصيل والطلب</button></div></div>";
    }).join("");
}

$("productsGrid").addEventListener("click", function (e) {
    const fav = e.target.closest("[data-fav]");
    if (fav) { e.stopPropagation(); toggleFavorite(Number(fav.dataset.fav)); return; }
    const card = e.target.closest(".card");
    if (card) openModal(Number(card.dataset.id));
});

// لو الصورة مش موجودة تظهر صورة بديلة
document.addEventListener("error", function (e) {
    if (e.target.tagName === "IMG" && e.target.src !== PLACEHOLDER) e.target.src = PLACEHOLDER;
}, true);

/* ===== نافذة المنتج ===== */
function itemText(p, color, size) {
    return "الكود: " + p.id + "\nالمنتج: " + p.name + "\nاللون: " + color + "\nالمقاس: " + size +
        (p.price ? "\nالسعر: " + p.price + " جنيه" : "") + "\nالرابط: " + productLink(p.id);
}

function refreshModalLinks() {
    if (!currentProduct) return;
    const t = itemText(currentProduct, $("modalColor").value, $("modalSize").value);
    setLink($("modalOrderBtn"), "[طلب شراء]\n" + t);
    setLink($("modalAskBtn"), "[استفسار]\n" + t);
}

function openModal(id) {
    const p = products.find(function (x) { return x.id === id; });
    if (!p) return;
    currentProduct = p;
    $("modalImg").src = p.img;
    $("modalImg").alt = p.name;
    $("modalBadge").textContent = p.badge;
    $("modalTitle").textContent = p.name;
    $("modalDesc").textContent = p.desc;
    $("modalPrice").textContent = p.price ? "السعر: " + p.price + " جنيه" : "";
    $("modalColor").innerHTML = p.colors.map(function (c) { return "<option>" + esc(c) + "</option>"; }).join("");
    $("modalSize").innerHTML = p.sizes.map(function (s) { return "<option>" + esc(s) + "</option>"; }).join("");
    refreshModalLinks();
    $("modalCartBtn").onclick = function () {
        cart.push({ id: p.id, color: $("modalColor").value, size: $("modalSize").value });
        save("attia_cart", cart);
        updateCart();
        closeModal();
        showToast("تمت الإضافة لقائمة طلباتي");
    };
    $("productModal").style.display = "flex";
    history.replaceState(null, "", "#p" + id);
}

function closeModal(e) {
    if (e && e.target && e.target.id !== "productModal") return;
    $("productModal").style.display = "none";
    history.replaceState(null, "", location.pathname);
}

document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });

function openFromHash() {
    const m = location.hash.match(/^#p(\d+)$/);
    if (m) openModal(Number(m[1]));
}

/* ===== السلة ===== */
function toggleCart() {
    $("cartDrawer").classList.toggle("open");
    $("overlay").classList.toggle("active");
}

function removeFromCart(i) {
    cart.splice(i, 1);
    save("attia_cart", cart);
    updateCart();
}

function checkCart(e) {
    if (!cart.length) { e.preventDefault(); showToast("القائمة فارغة!"); return false; }
    return true;
}

function updateCart() {
    // لو منتج اتشال من الشيت نشيله من السلة
    cart = cart.filter(function (c) { return products.some(function (p) { return p.id === c.id; }); });
    $("cartCount").textContent = cart.length;
    const box = $("cartItems");
    if (!cart.length) {
        box.innerHTML = "<p class='empty-text'>القائمة فارغة حالياً</p>";
        $("cartOrderLink").href = "#"; $("cartAskLink").href = "#";
        return;
    }
    let msg = "";
    box.innerHTML = cart.map(function (c, i) {
        const p = products.find(function (x) { return x.id === c.id; });
        msg += (i + 1) + ". " + itemText(p, c.color, c.size) + "\n\n";
        return "<div class='cart-item'><div><h4>" + esc(p.name) + "</h4><span>" + esc(c.color) + " | " + esc(c.size) + "</span></div>" +
            "<button class='remove-btn' onclick='removeFromCart(" + i + ")'>حذف</button></div>";
    }).join("");
    setLink($("cartOrderLink"), "[طلب شراء قائمة]\n\n" + msg);
    setLink($("cartAskLink"), "[استفسار قائمة]\n\n" + msg);
}

/* ===== التشغيل ===== */
updateFavBadge();
renderProducts(products);
updateCart();
openFromHash();
loadSheet().then(function () { handleSearch(); updateCart(); openFromHash(); });
