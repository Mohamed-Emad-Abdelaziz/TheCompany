// Replace with your Google Apps Script Web App URL
const scriptURL = 'https://script.google.com/macros/s/AKfycbw5d_bOLvbZm9GGaeQSqmgnZbOgSd-1r76qS1WvmO3s3_sC-A6l0uVj9wkF7mQaHtbzgw/exec';

// Handle submission for حساب ممدوح
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

// Handle submission for حساب شركه الأمير
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

// Handle submission for دفعات حساب شركه الأمير
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

// Retrieve data from Google Sheets
const btnRetrieve = document.getElementById('btn-retrieve');
btnRetrieve.addEventListener('click', () => {
  // We add a query parameter (action=read) to differentiate GET requests.
  fetch(scriptURL + '?action=read')
    .then(response => response.json())
    .then(data => {
      const outputDiv = document.getElementById('data-output');
      outputDiv.innerHTML = ''; // Clear previous results

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
            <hr>
          `;
          outputDiv.appendChild(div);
        });
      }
    })
    .catch(error => console.error('Error!', error.message));
});
