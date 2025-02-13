// استبدل YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL بالـ URL الخاص بمشروع Google Apps Script
const scriptURL = 'https://script.google.com/macros/s/AKfycbyTrPXDSpzMq592ae3LMGDO7NJRszyrKuaEYZcnAacRMUmmzqKvF-2fXNol8hhB3vjlRw/exec';

// دالة لتحميل البيانات وعرضها مع إمكانية الحذف
function loadData() {
  fetch(scriptURL + '?action=read')
    .then(response => response.json())
    .then(data => {
      const outputDiv = document.getElementById('data-output');
      outputDiv.innerHTML = ''; // مسح البيانات القديمة

      if (data.length === 0) {
        outputDiv.innerHTML = '<p>لا توجد بيانات</p>';
      } else {
        data.forEach(entry => {
          const div = document.createElement('div');
          div.className = 'data-entry';
          div.innerHTML = `
            <p><strong>نوع النموذج:</strong> ${entry.formType || ''}</p>
            <p><strong>التاريخ:</strong> ${entry.date || ''}</p>
            <p><strong>الكميه:</strong> ${entry.quantity || ''}</p>
            <p><strong>الحساب:</strong> ${entry.account || ''}</p>
            <p><strong>المدفوع:</strong> ${entry.paid || ''}</p>
            <button onclick="deleteInvoice(${entry.row})">حذف الفاتورة</button>
            <hr>
          `;
          outputDiv.appendChild(div);
        });
      }
    })
    .catch(error => console.error('Error!', error.message));
}

// التعامل مع إرسال بيانات حساب ممدوح
const formMamdouh = document.getElementById('form-mamdouh');
formMamdouh.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(formMamdouh);
  formData.append('formType', 'mamdouh');

  fetch(scriptURL, { method: 'POST', body: formData })
    .then(response => response.json())
    .then(result => {
      alert('تم إرسال بيانات حساب ممدوح بنجاح');
      formMamdouh.reset();
    })
    .catch(error => console.error('Error!', error.message));
});

// التعامل مع إرسال بيانات حساب شركه الأمير
const formAmir = document.getElementById('form-amir');
formAmir.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(formAmir);
  formData.append('formType', 'amir');

  fetch(scriptURL, { method: 'POST', body: formData })
    .then(response => response.json())
    .then(result => {
      alert('تم إرسال بيانات حساب شركه الأمير بنجاح');
      formAmir.reset();
    })
    .catch(error => console.error('Error!', error.message));
});

// التعامل مع إرسال بيانات دفعات حساب شركه الأمير
const formInstallments = document.getElementById('form-installments');
formInstallments.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(formInstallments);
  formData.append('formType', 'installment');

  fetch(scriptURL, { method: 'POST', body: formData })
    .then(response => response.json())
    .then(result => {
      alert('تم إرسال بيانات الدفعات بنجاح');
      formInstallments.reset();
    })
    .catch(error => console.error('Error!', error.message));
});

// استرجاع البيانات عند الضغط على الزر
const btnRetrieve = document.getElementById('btn-retrieve');
btnRetrieve.addEventListener('click', loadData);

// دالة لحذف الفاتورة بناءً على رقم الصف
function deleteInvoice(row) {
  if (confirm('هل أنت متأكد انك عايز تحذف الفاتورة؟')) {
    fetch(scriptURL + '?action=delete&row=' + row)
      .then(response => response.json())
      .then(result => {
        if (result.result === 'success') {
          alert('تم حذف الفاتورة');
          loadData(); // إعادة تحميل البيانات بعد الحذف
        } else {
          alert('فشلت عملية الحذف: ' + result.message);
        }
      })
      .catch(error => console.error('Error!', error.message));
  }
}

// التعامل مع استرجاع الفاتورة الشهرية
const btnMonthlyInvoice = document.getElementById('btn-monthly-invoice');
btnMonthlyInvoice.addEventListener('click', () => {
  fetch(scriptURL + '?action=monthlySummary')
    .then(response => response.json())
    .then(data => {
      const invoiceDiv = document.getElementById('invoice-output');
      invoiceDiv.innerHTML = '';
      if (Object.keys(data).length === 0) {
        invoiceDiv.innerHTML = '<p>لا توجد بيانات فاتورة شهرية</p>';
      } else {
        // عرض كل شهر مع الإجماليات
        for (const month in data) {
          const monthData = data[month];
          const entryDiv = document.createElement('div');
          entryDiv.className = 'invoice-entry';
          entryDiv.innerHTML = `
            <h3>${month}</h3>
            <p><strong>مجموع كميه ممدوح:</strong> ${monthData.mamdouh}</p>
            <p><strong>مجموع كميه أمير:</strong> ${monthData.amir}</p>
            <hr>
          `;
          invoiceDiv.appendChild(entryDiv);
        }
      }
    })
    .catch(error => console.error('Error!', error.message));
});
