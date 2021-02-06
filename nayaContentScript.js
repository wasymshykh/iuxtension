// redirecting irrelevent homepage
if (window.location.href === "https://iulms.edu.pk/") {
  window.location.href = "https://iulms.edu.pk/sic/sic.php";
}

// rearranging old css files
document.body.querySelectorAll('link[rel="stylesheet"]').forEach((e) => { let t = e; e.remove(); document.head.appendChild(e) });

// adding new css
let style = document.createElement('link');
style.rel = 'stylesheet';
style.type = 'text/css';
style.href = chrome.runtime.getURL('style/nayaStyle.css');
(document.head||document.documentElement).appendChild(style);

// removing modals
Array.from(document.getElementsByClassName("modal")).forEach(e => { e.remove() });
let mb = document.querySelector(".modal-backdrop");
if (mb != undefined) {
  mb.remove()
}
