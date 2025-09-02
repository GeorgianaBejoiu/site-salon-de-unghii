window.onload = () => {
  const mesaj = document.getElementById("welcome-msg");
  const texte = [
    "La salonul nostru, frumusețea",
    "începe cu detaliile."
  ];

  let textIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < texte[textIndex].length) {
      mesaj.innerHTML = texte
        .slice(0, textIndex)
        .map(t => t + "<br>")
        .join("") +
        texte[textIndex].substring(0, charIndex + 1);

      charIndex++;
      setTimeout(type, 100);
    } else if (textIndex < texte.length - 1) {
      textIndex++;
      charIndex = 0;
      setTimeout(type, 500);
    }
  }

  type();
};
document.addEventListener("DOMContentLoaded", function () {
  const imagini = document.querySelectorAll("#despre img.magictime");

  function restartAnimation(el, anim) {
    el.classList.remove("magictime", anim);
    void el.offsetWidth; // hack reflow
    el.classList.add("magictime", anim);
  }

  // Observer pentru fiecare imagine
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const anim = Array.from(img.classList).find(c => c !== "magictime");

        // aplicăm animația doar o singură dată per imagine
        if (!img.dataset.scrolled) {
          restartAnimation(img, anim);
          img.dataset.scrolled = "true"; // marcam imaginea ca animată la scroll
        }
      }
    });
  }, { threshold: 0.3 });

  imagini.forEach(img => observer.observe(img));

  // Când apăsăm pe linkul „Despre mine” animăm doar prima imagine
  document.querySelectorAll('a[href="#despre"]').forEach(link => {
    link.addEventListener("click", () => {
      if (imagini.length > 0) {
        const firstImg = imagini[0];
        const anim = Array.from(firstImg.classList).find(c => c !== "magictime");

        // Repornim animația doar la click pe link
        restartAnimation(firstImg, anim);
        // Atenție: nu setăm `dataset.scrolled = true` aici,
        // ca să se mai poată anima și la scroll dacă trebuie
      }
    });
  });
});

// Lista recenziilor
const recenzii = [
  {
    text: "Ador unghiile făcute de tine, mereu sunt finuțe, bine lucrate și rezistente!",
    autor: "- Olivia M."
  },
  {
    text: "De fiecare dată plec super încântată! Recomand cu drag, profesionalism și creativitate!",
    autor: "- Daiana P."
  },
  {
    text: "Cea mai frumoasă experiență! Atmosferă relaxantă și unghiile ies perfecte de fiecare dată.",
    autor: "- Antonia L."
  },
  {
    text: "Unghiile rezistă săptămâni întregi și primesc mereu complimente pentru ele!",
    autor: "- Mălina D."
  }
];

// Elemente din HTML
const recenzieText = document.getElementById("recenzie-text");
const recenzieAutor = document.getElementById("recenzie-autor");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let index = 0;

// Funcție pentru afișarea recenziei curente
function afiseazaRecenzie(i) {
  recenzieText.style.opacity = 0;
  recenzieAutor.style.opacity = 0;

  setTimeout(() => {
    recenzieText.textContent = recenzii[i].text;
    recenzieAutor.textContent = recenzii[i].autor;
    recenzieText.style.opacity = 1;
    recenzieAutor.style.opacity = 1;
  }, 300);
}

// Butoane navigare
nextBtn.addEventListener("click", () => {
  index = (index + 1) % recenzii.length;
  afiseazaRecenzie(index);
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + recenzii.length) % recenzii.length;
  afiseazaRecenzie(index);
});

// Auto-play la fiecare 5 secunde
setInterval(() => {
  index = (index + 1) % recenzii.length;
  afiseazaRecenzie(index);
}, 5000);

// Elemente modal
const openFormBtn = document.getElementById("openForm");
const modal = document.getElementById("formModal");
const closeFormBtn = document.getElementById("closeForm");
const form = document.getElementById("programareForm");
const oraSelect = document.getElementById("ora");

// Ore ocupate (exemplu)
let oreOcupate = ["11:00", "14:00"];

// Afișăm doar orele libere
function actualizeazaOre() {
  for (let i = 0; i < oraSelect.options.length; i++) {
    let ora = oraSelect.options[i].value;
    if (oreOcupate.includes(ora)) {
      oraSelect.options[i].disabled = true; // dezactivează orele ocupate
      oraSelect.options[i].text += " (ocupat)";
    }
  }
}

// Deschide modal
openFormBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "block";
  actualizeazaOre();
});

// Închide modal
closeFormBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Închide dacă apeși în afara formularului
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Când trimite formularul
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let nume = document.getElementById("nume").value;
  let ora = document.getElementById("ora").value;

  alert(`Mulțumim, ${nume}! Programarea ta la ora ${ora} a fost trimisă.`);

  // Marchează ora ca ocupată
  oreOcupate.push(ora);

  // Resetăm formularul și închidem
  form.reset();
  modal.style.display = "none";
});
