/**
 * Google Apps Script for Shoe Store Orders
 * يربط صفحة الهبوط مباشرة بجدول Google Sheet
 * 
 * الأعمدة في جدولك (من الصورة):
 * عمود A: الاسم الكامل
 * عمود B: رقم الهاتف
 * عمود C: المدينة
 * عمود D: العنوان
 * عمود E: تفاصيل المنتج (اللون ، المقاس ، الكمية)
 */

function doPost(e) {
  // استخدام LockService لتفادي تداخل الطلبات المتزامنة
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // قراءة البيانات المرسلة من الموقع (سواء كانت JSON أو Form Parameters)
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var fullName = data.fullName || data.name || data['الاسم الكامل'] || "";
    // إضافة علامة ' قبل رقم الهاتف لضمان عدم حذف الصفر الأول في جوجل شيت
    var rawPhone = data.phone || data.tel || data['رقم الهاتف'] || "";
    var phone = rawPhone ? "'" + rawPhone.toString() : "";
    var city = data.city || data['المدينة'] || "";
    var address = data.address || data['العنوان'] || "";
    
    // تفاصيل المنتج (اللون ، المقاس ، الكمية)
    var productDetails = data.productDetails || data['تفاصيل المنتج'] || "";
    if (!productDetails) {
      if (data.quantity === 2 || data.quantity === "2") {
        productDetails = "2 أزواج [ الزوج 1: " + (data.color || "") + " مقاس " + (data.size || "") + " EU | الزوج 2: " + (data.color2 || "") + " مقاس " + (data.size2 || "") + " EU ]";
      } else {
        productDetails = "زوج واحد [ اللون: " + (data.color || "") + " | المقاس: " + (data.size || "") + " EU ]";
      }
    }

    // إضافة سطر جديد بالترتيب المطابق لجدولك (A, B, C, D, E)
    sheet.appendRow([
      fullName,       // عمود A: الاسم الكامل
      phone,          // عمود B: رقم الهاتف
      city,           // عمود C: المدينة
      address,        // عمود D: العنوان
      productDetails  // عمود E: تفاصيل المنتج (اللون ، المقاس ، الكمية)
    ]);

    // تنسيق محاذاة النص والاتجاه للسطر المضاف
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1, 1, 5).setVerticalAlignment("middle");

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "تم تسجيل الطلب بنجاح في Google Sheet",
      row: lastRow
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Google Sheets Web App is running successfully!");
}
