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

// navigation items add
if (window.location.href.includes("/sic")) {
  let nav = document.getElementById("dolphinnav").children[0];
  nav.insertBefore(create_nav_item('/sic/Transcript.php', 'Transcript'), nav.children[2]);
  nav.insertBefore(create_nav_item('/sic/examresult.php', 'Result'), nav.children[3]);
}


function create_nav_item (url, title) {
  let a = document.createElement('a');
  a.setAttribute('title', title);
  a.setAttribute('href', url);
  a.textContent = title;
  
  let li = document.createElement('li');
  li.appendChild(a);

  return li;
}

if (window.location.href === "https://iulms.edu.pk/sic/sic.php") {
  // removing modals
  Array.from(document.getElementsByClassName("modal")).forEach(e => { /*e.remove()*/ e.classList.add('hide') });
  let mb = document.querySelector(".modal-backdrop");
  if (mb != undefined) {
    mb.remove()
  }

  let sic_links_to_remove = ['Curriculum', 'Survey', 'Exam Schedule', 'IU Email', 'IU Digital Library']
  Array.from(document.getElementsByTagName('a')).forEach((el)=>{ if(sic_links_to_remove.includes(el.getAttribute('title'))) { el.parentElement.remove() } });
}

if (window.location.href === "https://iulms.edu.pk/sic/Transcript.php") {
  let d_s = document.getElementById("degreeSelection");
  d_s.setAttribute("style", "");
  d_s.parentElement.setAttribute("style", "");
  
  let grades = {};
  setInterval(() => {
    grades_tmp = {'C': 0,'C+': 0, 'B': 0, 'B+': 0, 'A': 0};
    let tcs = Array.from(document.getElementsByClassName('transcript-content'));
    tcs.forEach(tc => {
      let g = tc.children[3].textContent.trim();
      grades_tmp[g]++;
    });
    if (JSON.stringify(grades) != JSON.stringify(grades_tmp)) {
      grades = grades_tmp;
      let o_el = document.getElementsByClassName('grades-row');
      if (o_el.length) { o_el[0].remove(); }
      let el = create_grades_div(grades);
      document.getElementById("transcript").parentElement.insertBefore(el, document.getElementById("transcript"))
    }
  }, 1000);
  
  function create_grades_div (grades) {
    let div = document.createElement('div');
    div.classList.add('grades-row');
    
    div.appendChild(create_grade_box('C', grades['C']));
    div.appendChild(create_grade_box('C+', grades['C+']));
    div.appendChild(create_grade_box('B', grades['B']));
    div.appendChild(create_grade_box('B+', grades['B+']));
    div.appendChild(create_grade_box('A', grades['A']));

    return div;
  }

  function create_grade_box (name, score) {
    let div = document.createElement('div');
    div.classList.add('grades-row-box');
    
    let p = document.createElement('p');
    p.textContent = name;

    let h3 = document.createElement('h3');
    h3.textContent = score;

    div.appendChild(h3);
    div.appendChild(p);

    return div;
  }


  // setInterval(() => {
  //   
  // }, 2000);

}

if (window.location.href === "https://iulms.edu.pk/sic/examresult.php") {
  let ex_t = document.getElementsByClassName('tblAttendance');
  // title
  ex_t[0].parentElement.children[0].classList.add('page-title');
  ex_t[0].parentElement.children[0].children[1].remove();
  
  // table
  ex_t[0].classList.add('exam_result_table');
  Array.from(document.getElementsByClassName('tableHeaderStyle')[0].children).forEach(el => {el.setAttribute('style', '')} )

  let ros = document.getElementsByClassName('tableHeaderStyle')[0].parentElement.children;
  Array.from(ros).forEach((ro, i) => { 
    if(i !== 0 && i !== ros.length-1) { 
      let tds =  Array.from(ro.children);
      tds.forEach((td, ii) => { if (ii === 6 && td.textContent.trim() !== '') { td.setAttribute('class', 'grade') } else if (ii === 6 && td.textContent.trim() === '') { td.parentElement.classList.add('dim') } })
    } else if ( i === ros.length-1) {
      ro.children[0].setAttribute('style', '')
    }
  })
}
