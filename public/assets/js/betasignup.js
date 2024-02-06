var signupEntry = '';
var thanks = false;
var error = false;
var loading = false;

function resetFlags() {
  document.querySelector('#thanks').style.display = 'none';
  document.querySelector('#error').style.display = 'none';
}

function invalid() {
  var patpee = new RegExp(/^~[a-z-]*$/);
  var email = new RegExp(/^.*@.*\..*$/);

  if (!patpee.test(signupEntry) && !email.test(signupEntry)) {
    showError();
    return true;
  }
  return false;
}

function submitForm(event) {
  event.preventDefault();
  loading = true;

  signupEntry = document.querySelector('#input-entry').value;
  if (invalid()) {
    return;
  }

  let formData = new FormData();
  formData.append('entry.113990400', signupEntry);

  const url =
    'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdsfxSy-wdou7qcTKM2o8oOY6kTt-Sxfp1k1uo-gVJZUIbXcg/formResponse';
  // "from the google sheet that has enabled form responses";

  fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    body: formData,
  })
    .then((r) => {
      console.log('done ', r);
      document.querySelector('#input-entry').value = '';
      showThanks();
    })
    .catch((e) => {
      console.log('bad ', { e });
      showError();
    })
    .finally(() => {
      loading = false;
    });
}

function showThanks() {
  document.querySelector('#thanks').style.display = 'block';
  document.querySelector('#submitbutton').style.display = 'none';
  setTimeout(() => {
    document.querySelector('#thanks').style.display = 'none';
    document.querySelector('#submitbutton').style.display = 'block';
  }, 3500);
}
function showError() {
  document.querySelector('#error').style.display = 'block';
  document.querySelector('#submitbutton').style.display = 'none';
  setTimeout(() => {
    document.querySelector('#error').style.display = 'none';
    document.querySelector('#submitbutton').style.display = 'block';
  }, 5000);
}
