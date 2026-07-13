const fileInput = document.getElementById("fileInput");
const gallery = document.getElementById("gallery");
const countBadge = document.getElementById("countBadge");
const progressBar = document.getElementById("progressBar");
const progressFill = document.getElementById("progressFill");
const toast = document.getElementById("toast");
const librarySection = document.getElementById("library");
const libraryConnector = document.querySelector(".library-connector");

const dropZone = document.getElementById("drop-zone-group");
const dropPulse = document.getElementById("drop-pulse");
const animMotion = document.getElementById("upload-motion");
const animOpacity = document.getElementById("upload-opacity");

//loadImages();

dropZone.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0) {
    triggerUploadAnimation();
    uploadFiles(fileInput.files);
  }
  fileInput.value = "";
});

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropPulse.setAttribute("opacity", "0.25");
});

dropZone.addEventListener("dragleave", (e) => {
  e.preventDefault();
  dropPulse.setAttribute("opacity", "0");
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropPulse.setAttribute("opacity", "0");

  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
    triggerUploadAnimation();
    uploadFiles(e.dataTransfer.files);
  }
});

async function uploadFiles(files) {
  const imageFiles = [...files].filter((file) => file.type.startsWith("image/"));

  if (!imageFiles.length) {
    showToast("Invalid file");
    return;
  }

  progressBar.style.display = "block";
  progressFill.style.width = "0%";

  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    const formData = new FormData();
    formData.append("image", file);

    try {
      progressFill.style.width = `${(i / imageFiles.length) * 100}%`;

      const res = await fetch("/upload", {
        method: "POST",
        body: formData
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      progressFill.style.width = `${((i + 1) / imageFiles.length) * 100}%`;
      addImageRow(data.url, data.filename);
      showLibraryArrival();
    } catch (error) {
      showToast("Upload failed");
    }
  }

  setTimeout(() => {
    progressBar.style.display = "none";
    progressFill.style.width = "0%";
  }, 500);

  updateCount();
}

function showLibraryArrival() {
  libraryConnector.classList.remove("is-active");
  librarySection.classList.remove("receiving");
  void libraryConnector.offsetWidth;
  libraryConnector.classList.add("is-active");
  librarySection.classList.add("receiving");
  setTimeout(() => {
    libraryConnector.classList.remove("is-active");
    librarySection.classList.remove("receiving");
  }, 1500);
}

function addImageRow(url, filename) {
  const emptyState = gallery.querySelector(".empty-state");
  if (emptyState) emptyState.remove();

  const row = document.createElement("div");
  row.className = "image-row";

  row.innerHTML = `
    <img src="${url}" alt="${filename}" class="image-thumb" loading="lazy">
    <div class="image-meta">
      <span class="image-name">${filename}</span>
      <span class="image-sub">Image file</span>
    </div>
    <div class="row-actions">
      <button class="copy-btn" type="button">Copy</button>
    </div>
  `;

  row.querySelector(".copy-btn").addEventListener("click", () => {
    copyLink(`${window.location.origin}${url}`);
  });

  gallery.prepend(row);
  updateCount();
}

async function  loadImages() {
  try {
    const res = await fetch("/images");
    if (!res.ok) throw new Error("Load failed");

    const data = await res.json();

    if (!data.images || data.images.length === 0) {
      updateCount();
      return;
    }

    gallery.innerHTML = "";

    data.images.forEach((url) => {
      const filename = decodeURIComponent(url.split("/").pop());
      addImageRow(url, filename);
    });
  } catch (error) {
    updateCount();
  }
}

function updateCount() {
  const count = gallery.querySelectorAll(".image-row").length;
  countBadge.textContent = `${count} file${count !== 1 ? "s" : ""}`;
}

 async function copyLink(url) {
  try {
    await navigator.clipboard.writeText(url);
    showToast("Copied");
  } catch {
    const el = document.createElement("textarea");
    el.value = url;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    showToast("Copied");
  }
}
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

function triggerUploadAnimation() {
  try {
    animMotion.endElement();
    animOpacity.endElement();
  } catch (err) {}

  setTimeout(() => {
    try {
      animMotion.beginElement();
      animOpacity.beginElement();
    } catch (err) {}
  }, 10);
}
const bgCanvas = document.getElementById("bgCanvas");
const bgContext = bgCanvas.getContext("2d");
const backgroundMouse = { x: -1000, y: -1000 };
const gridSpacing = 50;
let backgroundWidth;
let backgroundHeight;
let backgroundGrid = [];

function initBackground() {
  backgroundWidth = bgCanvas.width = window.innerWidth;
  backgroundHeight = bgCanvas.height = window.innerHeight;
  backgroundGrid = [];

  for (let x = 0; x < backgroundWidth; x += gridSpacing) {
    for (let y = 0; y < backgroundHeight; y += gridSpacing) {
      backgroundGrid.push({ x, y, homeX: x, homeY: y });
    }
  }
}

function drawBackground() {
  bgContext.clearRect(0, 0, backgroundWidth, backgroundHeight);

  backgroundGrid.forEach((point) => {
    const dx = backgroundMouse.x - point.x;
    const dy = backgroundMouse.y - point.y;
    const distance = Math.hypot(dx, dy);
    const maxDistance = 200;

    if (distance < maxDistance) {
      const force = (maxDistance - distance) / maxDistance;
      point.x -= dx * force * 0.05;
      point.y -= dy * force * 0.05;
    }

    point.x += (point.homeX - point.x) * 0.1;
    point.y += (point.homeY - point.y) * 0.1;

    const alpha = 0.05 + (distance < maxDistance ? 0.15 * (1 - distance / maxDistance) : 0);
    bgContext.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    bgContext.beginPath();
    bgContext.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
    bgContext.fill();
  });

  requestAnimationFrame(drawBackground);
}

window.addEventListener("resize", initBackground);
window.addEventListener("mousemove", (event) => {
  backgroundMouse.x = event.clientX;
  backgroundMouse.y = event.clientY;
});

initBackground();
drawBackground();