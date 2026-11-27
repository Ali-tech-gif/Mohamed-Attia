/* ===== الإعدادات ===== */
const WA_NUMBER = "201013640404";
// بعد ما تعمل الشيت: File > Share > Publish to web > CSV، وحط اللينك هنا. سيبه فاضي لو لسه.
const SHEET_CSV_URL = "";
const PLACEHOLDER = "https://placehold.co/600x400?text=Mohamed+Attia";

/* ===== المنتجات الاحتياطية (تظهر لو الشيت فاضي أو فشل) ===== */
let products = [
  { id: 1, category: "office", badge: "فاخر", name: "مكتب مدير مودرن 160 سم أكريليك", desc: "مكتب إداري فاخر بلمعة أكريليك مقاومة للخدش وتصميم عصري يناسب مكاتب الإدارة العليا.", img: "images/1 (1).jpg", colors: ["بني", "أوف وايت", "رمادي", "أسود"], sizes: ["160 سم (قياسي)", "مقاسات أخرى حسب الطلب"], prices: "" },
  { id: 2, category: "office", badge: "عملي", name: "مكتب عمل 120 سم ميلامين بدرج ودرفة", desc: "مكتب عملي أنيق بخامة ميلامين متينة مزود بدرج ودرفة تخزين لحفظ الملفات والأدوات.", img: "images/1 (2).jpg", colors: ["بني", "أوف وايت", "رمادي", "أسود"], sizes: ["120 سم (قياسي)", "مقاسات أخرى حسب الطلب"], prices: "" },
  { id: 3, category: "office", badge: "مميز", name: "مكتبة كتب وملفات مفتوحة", desc: "مكتبة أرفف مفتوحة بتصميم عصري لتنظيم الكتب والديكورات والملفات في المكاتب والشركات.", img: "images/1 (3).jpg", colors: ["بني", "أوف وايت", "أسود"], sizes: ["مقاس قياسي", "مقاسات أخرى حسب الطلب"], prices: "" },
  { id: 4, category: "office", badge: "عملي", name: "مكتب موظفين 120 سم ميلامين بدرج ودرفة", desc: "مكتب موظفين واستقبال مدمج بخامة ميلامين عالية الجودة ووحدة تخزين جانبية.", img: "images/1 (4).jpg", colors: ["بني", "أوف وايت", "رمادي", "أسود"], sizes: ["120 سم (قياسي)", "مقاسات أخرى حسب الطلب"], prices: "" },
  { id: 5, category: "office", badge: "الأفخم", name: "مكتب مدير تنفيذي 180 سم أكريليك", desc: "مكتب رئاسي واسع 180 سم بتشطيب أكريليك لامع وفخامة استثنائية لأصحاب الشركات.", img: "images/1 (5).jpg", colors: ["بني", "أوف وايت", "رمادي", "أسود"], sizes: ["180 سم (قياسي)", "مقاسات أخرى حسب الطلب"], prices: "" },
  { id: 6, category: "office", badge: "", name: "وحدة أدراج شانون 4 درج أبيض", desc: "وحدة تخزين وملفات رأسية 4 أدراج باللون الأبيض الأنيق لتنظيم الأوراق في المكاتب والعيادات.", img: "images/1 (6).jpg", colors: ["أبيض", "رمادي", "أسود"], sizes: ["4 درج"], prices: "" },
  { id: 7, category: "office", badge: "", name: "شانون ملفات 4 درج أبيض مودرن", desc: "وحدة أدراج مكتبية 4 درج بتصميم عصري ومقابض متينة لحفظ المستندات بأمان.", img: "images/1 (7).jpg", colors: ["أبيض", "رمادي", "أسود"], sizes: ["4 درج"], prices: "" },
  { id: 8, category: "office", badge: "", name: "وحدة تخزين شانون 2 درج ودرفة", desc: "وحدة تنظيم مكتبية عملية تجمع بين درجين علويين ودرفة سفلية واسعة للملفات.", img: "images/1 (8).jpg", colors: ["أبيض", "بني", "رمادي"], sizes: ["2 درج + درفة"], prices: "" },
  { id: 9, category: "chairs", badge: "الأكثر مبيعاً", name: "كرسي جيمنج ومكتب احترافي (Gaming)", desc: "كرسي مريح بظهر عالي ودعم للفقرات والرقبة، مثالي لساعات العمل الطويلة والألعاب.", img: "images/1 (9).jpg", colors: ["أسود × أحمر", "أسود × أزرق", "أسود سادة", "أبيض × أسود"], sizes: [], prices: "" },
  { id: 10, category: "chairs", badge: "اقتصادي", name: "كرسي انتظار وزوار موديل تفاحة", desc: "كرسي خفيف ومتين بتصميم عملي مناسب لقاعات الانتظار والعيادات والمكاتب.", img: "images/1 (10).jpg", colors: ["أسود", "كحلي", "نبيتي", "رمادي"], sizes: [], prices: "" },
  { id: 11, category: "chairs", badge: "", name: "كرسي بار وكافيهات عالي (بيتزا)", desc: "كرسي مرتفع بتصميم شبابي عصري مناسب للكاونترات، الكافيهات، والمطاعم.", img: "images/1 (11).jpg", colors: ["أسود", "أبيض", "أحمر", "رمادي"], sizes: [], prices: "" },
  { id: 12, category: "chairs", badge: "للمراكز", name: "كرسي محاضرات وتدريب موديل تفاحة", desc: "كرسي قاعات المحاضرات والسناتر التعليمية مزود بمسند للكتابة وهيكل معدني قوي.", img: "images/1 (12).jpg", colors: ["أسود", "كحلي", "نبيتي", "رمادي"], sizes: [], prices: "" },
  { id: 13, category: "chairs", badge: "شيك", name: "كرسي زوار تفاحة شاسيه مدهب", desc: "كرسي انتظار أنيق بشاسيه معدني مطلي باللون الذهبي يضفي لمسة فخامة على المكان.", img: "images/1 (13).jpg", colors: ["أسود", "كحلي", "أوف وايت", "نبيتي"], sizes: [], prices: "" },
  { id: 14, category: "chairs", badge: "فاخر", name: "كرسي مدير طيارة جلد فاخر", desc: "كرسي مديرين بتنجيد جلد فخم وقاعدة قوية تمنح أقصى درجات الراحة والهيبة.", img: "images/1 (14).jpg", colors: ["أسود", "بني", "هافان", "أوف وايت"], sizes: [], prices: "" },
  { id: 15, category: "chairs", badge: "كلاسيك", name: "كرسي مدير طيارة خشب كلاسيك", desc: "كرسي مديرين فاخر بمساند وقاعدة مطعمة بالخشب الطبيعي لمحبي الطابع الكلاسيكي الراقي.", img: "images/1 (15).jpg", colors: ["بني", "أسود", "هافان"], sizes: [], prices: "" },
  { id: 16, category: "chairs", badge: "طبي", name: "كرسي مكتب طبي موديل تويوتا (Toyota)", desc: "كرسي مكتب ظهر شبك طبي يدعم أسفل الظهر ومصمم للعمل المريح طوال اليوم.", img: "images/1 (16).jpg", colors: ["أسود", "رمادي", "كحلي"], sizes: [], prices: "" },
  { id: 17, category: "office", badge: "", name: "مكتب عمل 120 سم درج ودرفة", desc: "مكتب عملي مقاس 120 سم بتصميم أنيق ووحدة تخزين جانبية تناسب المساحات المتوسطة.", img: "images/1 (17).jpg", colors: ["بني", "أوف وايت", "رمادي", "أسود"], sizes: ["120 سم (قياسي)", "مقاسات أخرى حسب الطلب"], prices: "" },
  { id: 18, category: "office", badge: "استقبال", name: "كاونتر استقبال مودرن 120 سم", desc: "كاونتر استقبال أنيق للشركات والعيادات والمحلات بتشطيب راقٍ وواجهة جذابة.", img: "images/1 (18).jpg", colors: ["أبيض × بني", "أوف وايت × أسود", "رمادي"], sizes: ["120 سم (قياسي)", "مقاسات أخرى حسب الطلب"], prices: "" },
  { id: 19, category: "office", badge: "", name: "مكتب إداري 120 سم درج ودرفة", desc: "مكتب خشبي متين مقاس 120 سم مزود بدرج ودرفة لحفظ المستلزمات المكتبية.", img: "images/1 (19).jpg", colors: ["بني", "أوف وايت", "رمادي", "أسود"], sizes: ["120 سم (قياسي)", "مقاسات أخرى حسب الطلب"], prices: "" },
  { id: 20, category: "office", badge: "الأكثر طلباً", name: "مكتب مدير 160 سم فك وتركيب", desc: "مكتب إداري عملي 160 سم سهل الفك والتركيب والنقل بخامة متينة وتشطيب مميز.", img: "images/1 (20).jpg", colors: ["بني", "أوف وايت", "رمادي", "أسود"], sizes: ["160 سم (قياسي)", "مقاسات أخرى حسب الطلب"], prices: "" },
  { id: 21, category: "office", badge: "", name: "مكتب مدير 180 سم فك وتركيب", desc: "مكتب كبير مقاس 180 سم بتصميم عملي سهل الفك والتركيب ومساحة عمل واسعة.", img: "images/1 (21).jpg", colors: ["بني", "أوف وايت", "رمادي", "أسود"], sizes: ["180 سم (قياسي)", "مقاسات أخرى حسب الطلب"], prices: "" },
  { id: 22, category: "office", badge: "", name: "مكتب مدير خشب كلاسيك", desc: "مكتب خشبي متين بتصميم أنيق يناسب المكاتب الإدارية والمنزلية.", img: "images/1 (22).jpg", colors: ["بني", "أسود", "أوف وايت"], sizes: ["مقاس قياسي", "مقاسات أخرى حسب الطلب"], prices: "" },
  { id: 23, category: "safes", badge: "أمان عالي", name: "خزنة مصفحة إلكترونية 40 سم", desc: "خزنة حديدية مصفحة مقاس 40 سم لحفظ الأموال والمستندات الهامة بأمان تام.", img: "images/1 (23).jpg", colors: ["أسود", "رمادي", "أوف وايت"], sizes: ["40 سم"], prices: "" },
  { id: 24, category: "safes", badge: "أمان عالي", name: "خزنة ديجيتال مصفحة 40 سم", desc: "خزنة مصفحة مقاس 40 سم مزودة بقفل رقمي ومفتاح طوارئ للمكاتب والمنازل.", img: "images/1 (24).jpg", colors: ["أسود", "رمادي", "أوف وايت"], sizes: ["40 سم"], prices: "" },
  { id: 26, category: "chairs", badge: "مريح جداً", name: "كرسي مدير طبي مسند رأس (Toyota Head)", desc: "كرسي مكتب شبك طبي مزود بمسند رأس مريح ودعم كامل للظهر والذراعين.", img: "images/1 (26).jpg", colors: ["أسود", "رمادي", "كحلي"], sizes: [], prices: "" },
  { id: 28, category: "chairs", badge: "", name: "كرسي محاضرات تفاحة عملي", desc: "كرسي تدريب ومحاضرات خفيف ومتين بقرص كتابة جانبي مناسب للمعاهد والمدارس.", img: "images/1 (28).jpg", colors: ["أسود", "كحلي", "نبيتي", "رمادي"], sizes: [], prices: "" },
   { id: 29, category: "office", badge: "", name: "مكتب إداري 160 سم فك وتركيب", desc: "مكتب عمل وإدارة 160 سم بتصميم عصري وسهولة في النقل والتركيب.", img: "images/1 (29).jpg", colors: ["بني", "أوف وايت", "رمادي", "أسود"], sizes: ["160 سم (قياسي)", "مقاسات أخرى حسب الطلب"], prices: "" },
  { id: 30, category: "office", badge: "مودرن", name: "مكتب أتانلي إيطالي 60 سم", desc: "مكتب مدمج بتصميم إيطالي أنيق مناسب للمساحات الصغيرة والمذاكرة.", img: "images/1 (30).jpg", colors: ["بني", "أوف وايت", "رمادي", "أسود"], sizes: ["60 سم (قياسي)", "مقاسات أخرى حسب الطلب"], prices: "" },
  { id: 31, category: "office", badge: "", name: "كاونتر استقبال مدمج 60 سم", desc: "كاونتر استقبال صغير 60 سم مثالي للمحلات والعيادات ذات المساحات المحدودة.", img: "images/1 (31).jpg", colors: ["أبيض × بني", "أوف وايت", "رمادي"], sizes: ["60 سم (قياسي)", "مقاسات أخرى حسب الطلب"], prices: "" },
  { id: 32, category: "office", badge: "مودرن", name: "مكتب أتانلي إيطالي 80 سم", desc: "مكتب عصري بتصميم إيطالي مقاس 80 سم يجمع بين الشياكة واستغلال المساحة.", img: "images/1 (32).jpg", colors: ["بني", "أوف وايت", "رمادي", "أسود"], sizes: ["80 سم (قياسي)", "مقاسات أخرى حسب الطلب"], prices: "" },
  { id: 33, category: "safes", badge: "بصمة", name: "خزنة مصفحة ببصمة الإصبع 50 سم", desc: "خزنة ذكية مقاس 50 سم تعمل ببصمة الإصبع والرقم السري لأعلى درجات الحماية.", img: "images/1 (33).jpg", colors: ["أسود", "رمادي", "ذهبي"], sizes: ["50 سم"], prices: "" },
  { id: 34, category: "safes", badge: "بصمة", name: "خزنة شخصية ببصمة الإصبع 25 سم", desc: "خزنة مدمجة 25 سم ببصمة الإصبع مثالية للمنازل والغرف وحفظ المقتنيات الثمينة.", img: "images/1 (34).jpg", colors: ["أسود", "رمادي", "أوف وايت"], sizes: ["25 سم"], prices: "" },
  { id: 35, category: "safes", badge: "شديدة التحمل", name: "خزنة مصفحة ثقيلة 50 سم (2 كالون)", desc: "خزنة مصفحة فائقة المتانة مقاس 50 سم مزودة بـ 2 كالون أمان مزدوج ضد السرقة.", img: "images/1 (35).jpg", colors: ["أسود", "رمادي", "أوف وايت"], sizes: ["50 سم"], prices: "" },
  { id: 36, category: "safes", badge: "الأقوى", name: "خزنة بنكية مصفحة 60 سم (2 كالون)", desc: "خزنة مصفحة كبيرة 60 سم بـ 2 كالون أمان مزدوج وتصفيح سميك للشركات والمحلات.", img: "images/1 (36).jpg", colors: ["أسود", "رمادي", "أوف وايت"], sizes: ["60 سم"], prices: "" },
  { id: 38, category: "office", badge: "فاخر", name: "مكتب رئاسي 180 سم أكريليك", desc: "مكتب مديرين 180 سم بسطح أكريليك فاخر مقاوم للخدوش وتصميم يخطف الأنظار.", img: "images/1 (38).jpg", colors: ["بني", "أوف وايت", "رمادي", "أسود"], sizes: ["180 سم (قياسي)", "مقاسات أخرى حسب الطلب"], prices: "" },
  { id: 39, category: "office", badge: "فاخر", name: "مكتب مدير مودرن 180 سم أكريليك", desc: "مكتب إداري كبير 180 سم بخامة أكريليك عالية الجودة لمكاتب كبار التنفيذيين.", img: "images/1 (39).jpg", colors: ["بني", "أوف وايت", "رمادي", "أسود"], sizes: ["180 سم (قياسي)", "مقاسات أخرى حسب الطلب"], prices: "" },
  { id: 41, category: "chairs", badge: "الأكثر مبيعاً", name: "كرسي مكتب دوار موديل فوكس", desc: "كرسي مكتب عملي ومريح بظهر متوسط وشاسيه قوي مناسب للموظفين والطلاب.", img: "images/1 (41).jpg", colors: ["أسود", "رمادي", "كحلي", "نبيتي"], sizes: [], prices: "" },
  { id: 42, category: "chairs", badge: "تخصصي", name: "كرسي معمل وعيادات دوار", desc: "كرسي مخصص للمعامل والعيادات والمختبرات بارتفاع قابل للتعديل وسهولة في الحركة.", img: "images/1 (42).jpg", colors: ["أسود", "أبيض", "أزرق"], sizes: [], prices: "" },
  { id: 43, category: "chairs", badge: "مريح", name: "كرسي مكتب أوبرا بمسند رأس (Opera Head)", desc: "كرسي مكتب أنيق مزود بمسند رأس مريح وتصميم عصري يدعم الجلوس لفترات طويلة.", img: "images/1 (43).jpg", colors: ["أسود", "رمادي", "بني"], sizes: [], prices: "" },
  { id: 44, category: "chairs", badge: "مودرن", name: "كرسي فايبر مستورد بتصميم عصري", desc: "كرسي فايبر عالي المتانة بتصميم مودرن أنيق يناسب المكاتب، الكافيهات، وغرف الانتظار.", img: "images/1 (44).jpg", colors: ["أبيض", "أسود", "رمادي", "بيج"], sizes: [], prices: "" },
  { id: 45, category: "safes", badge: "ماركة Eid", name: "خزنة مصفحة 40 سم (Eid)", desc: "خزنة مصفحة أصلية ماركة Eid مقاس 40 سم بجودة تصنيع عالية وقفل أمان محكم.", img: "images/1 (45).jpg", colors: ["أسود", "رمادي"], sizes: ["40 سم"], prices: "" },
  { id: 46, category: "safes", badge: "حماية مضاعفة", name: "خزنة نصف مصفحة 40 سم", desc: "خزنة نصف مصفحة مقاس 40 سم بجدار سميك ومفصلات داخلية مخفية لزيادة الأمان.", img: "images/1 (46).jpg", colors: ["أسود", "رمادي", "أوف وايت"], sizes: ["40 سم"], prices: "" },
  { id: 47, category: "safes", badge: "حماية مضاعفة", name: "خزنة نصف مصفحة 50 سم", desc: "خزنة نصف مصفحة مقاس 50 سم بمساحة داخلية واسعة وتصفيح قوي لحماية المستندات.", img: "images/1 (47).jpg", colors: ["أسود", "رمادي", "أوف وايت"], sizes: ["50 سم"], prices: "" },
  { id: 48, category: "safes", badge: "ماركة Eid", name: "خزنة مصفحة 25 سم (Eid)", desc: "خزنة مصفحة عملية ماركة Eid مقاس 25 سم سهلة التثبيت في الحائط أو الدولاب.", img: "images/1 (48).jpg", colors: ["أسود", "رمادي"], sizes: ["25 سم"], prices: "" },
  { id: 50, category: "office", badge: "", name: "مكتب اداري 180 سم كلاسيك", desc: "مكتب واسع مقاس 180 سم بتصميم متين وتشطيب راقٍ يناسب كافة المكاتب.", img: "images/1 (50).jpg", colors: ["بني", "أوف وايت", "رمادي", "أسود"], sizes: ["180 سم (قياسي)", "مقاسات أخرى حسب الطلب"], prices: "" },
  { id: 51, category: "office", badge: "فخامة", name: "مكتبة كتب وملفات كبيرة 160 سم", desc: "مكتبة إدارية كبيرة بعرض 160 سم لحفظ الكتب والموسوعات والديكورات في مكاتب الإدارة.", img: "images/1 (51).jpg", colors: ["بني", "أوف وايت", "أسود"], sizes: ["160 سم (قياسي)", "مقاسات أخرى حسب الطلب"], prices: "" },
  { id: 52, category: "office", badge: "", name: "مكتب إداري 160 سم مودرن", desc: "مكتب عمل مقاس 160 سم بتصميم متوازن يجمع بين المساحة المريحة والشكل العصري.", img: "images/1 (52).jpg", colors: ["بني", "أوف وايت", "رمادي", "أسود"], sizes: ["160 سم (قياسي)", "مقاسات أخرى حسب الطلب"], prices: "" },
  { id: 53, category: "office", badge: "هابكو", name: "ترابيزه شاشه 160 سم موديل هابكو", desc: "ترابيزة شاشه مميزه 160 سم بتشطيب هابكو الفاخر ومتانة عالية تدوم لسنوات.", img: "images/1 (53).jpg", colors: ["بني", "أوف وايت", "رمادي", "أسود"], sizes: ["160 سم (قياسي)", "مقاسات أخرى حسب الطلب"], prices: "" },
  { id: 54, category: "office", badge: "", name: "مكتب 160 سم فك وتركيب عملي", desc: "مكتب إداري 160 سم بنظام الفك والتركيب السريع لسهولة النقل والتجميع في أي مكان.", img: "images/1 (54).jpg", colors: ["بني", "أوف وايت", "رمادي", "أسود"], sizes: ["160 سم (قياسي)", "مقاسات أخرى حسب الطلب"], prices: "" },
  { id: 55, category: "office", badge: "", name: "مكتب مدير 160 سم فك وتركيب", desc: "مكتب عمل 160 سم بتصميم عصري وخامات قوية سهلة الفك والتركيب.", img: "images/1 (55).jpg", colors: ["بني", "أوف وايت", "رمادي", "أسود"], sizes: ["160 سم (قياسي)", "مقاسات أخرى حسب الطلب"], prices: "" },
  { id: 56, category: "office", badge: "هابكو", name: "ترابيزه شاشه 180 سم موديل هابكو", desc: "ترابيزه شاشه رمز للشياكه 180 سم بتصميم هابكو الراقي ومساحة .", img: "images/1 (56).jpg", colors: ["بني", "أوف وايت", "رمادي", "أسود"], sizes: ["180 سم (قياسي)", "مقاسات أخرى حسب الطلب"], prices: "" },
  { id: 57, category: "chairs", badge: "الأكثر مبيعاً", name: "كرسي جيمنج ومكتب رياضي (Gaming)", desc: "كرسي جيمنج مريح بتصميم رياضي عصري ومخدات دعم للرقبة وأسفل الظهر.", img: "images/1 (57).jpg", colors: ["أسود × أحمر", "أسود × أزرق", "أسود سادة", "أبيض × أسود"], sizes: [], prices: "" },
  { id: 58, category: "chairs", badge: "مودرن", name: "كرسي بار وكافيهات موديل مانجو", desc: "كرسي بار عالي بتصميم مانجو العصري الأنيق، مثالي للكافيهات والمطاعم والكاونترات.", img: "images/1 (58).jpg", colors: ["أسود", "أبيض", "أحمر", "رمادي"], sizes: [], prices: "" },
  { id: 59, category: "chairs", badge: "شيك", name: "كرسي زوار بمخدعين بتنجيد مربعات", desc: "كرسي انتظار مريح بمسندين لليد وتنجيد مربعات أنيق يناسب العيادات ومكاتب الاستقبال.", img: "images/1 (59).jpg", colors: ["أسود", "بني", "رمادي", "كحلي"], sizes: [], prices: "" }
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
