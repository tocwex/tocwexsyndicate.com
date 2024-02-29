var signupEntry = '';
var thanks = false;
var error = false;
var loading = false;

function resetHeaderFlags() {
  document.querySelector('#header-thanks').style.display = 'none';
  document.querySelector('#header-error').style.display = 'none';
}

function invalidHeader() {
  var patpee = new RegExp(/^~[a-z-]*$/);
  var email = new RegExp(/^.*@.*\..*$/);

  if (!patpee.test(signupEntry) && !email.test(signupEntry)) {
    showError();
    return true;
  }
  return false;
}

function submitHeaderForm(event) {
  event.preventDefault();
  loading = true;

  signupEntry = document.querySelector('#header-input-entry').value;
  if (invalidHeader()) {
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
      document.querySelector('#header-input-entry').value = '';
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
  document.querySelector('#header-thanks').style.display = 'block';
  document.querySelector('#header-submitbutton').style.display = 'none';
  setTimeout(() => {
    document.querySelector('#header-thanks').style.display = 'none';
    document.querySelector('#header-submitbutton').style.display = 'block';
  }, 3500);
}
function showError() {
  document.querySelector('#header-error').style.display = 'block';
  document.querySelector('#header-submitbutton').style.display = 'none';
  setTimeout(() => {
    document.querySelector('#header-error').style.display = 'none';
    document.querySelector('#header-submitbutton').style.display = 'block';
  }, 5000);
}
