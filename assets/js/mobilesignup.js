var mobileEntry = '';
var thanks = false;
var error = false;
var loading = false;

function resetFlags() {
  document.querySelector('#mobile-thanks').style.display = 'none';
  document.querySelector('#mobile-error').style.display = 'none';
}

function invalid() {
  var patpee = new RegExp(/^~[a-z-]*$/);
  var email = new RegExp(/^.*@.*\..*$/);

  if (!patpee.test(mobileEntry) && !email.test(mobileEntry)) {
    showMobileError();
    return true;
  }
  return false;
}

function submitBetaForm(event) {
  event.preventDefault();
  loading = true;

  mobileEntry = document.querySelector('#mobile-entry').value;
  if (invalid()) {
    return;
  }

  let formData = new FormData();
  formData.append('entry.113990400', mobileEntry);

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
      document.querySelector('#mobile-entry').value = '';
      showMobileThanks();
    })
    .catch((e) => {
      console.log('bad ', { e });
      showMobileError();
    })
    .finally(() => {
      loading = false;
    });
}

function showMobileThanks() {
  document.querySelector('#mobile-thanks').style.display = 'block';
  document.querySelector('#mobile-submitbutton').style.display = 'none';
  setTimeout(() => {
    document.querySelector('#mobile-thanks').style.display = 'none';
    document.querySelector('#mobile-submitbutton').style.display = 'block';
  }, 3500);
}
function showMobileError() {
  document.querySelector('#mobile-error').style.display = 'block';
  document.querySelector('#mobile-submitbutton').style.display = 'none';
  setTimeout(() => {
    document.querySelector('#mobile-error').style.display = 'none';
    document.querySelector('#mobile-submitbutton').style.display = 'block';
  }, 5000);
}
