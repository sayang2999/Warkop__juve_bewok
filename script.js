const inputbox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// 🔊 SOUND
function playSound(){
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = "sine";
    osc.frequency.value = 700;
    gain.gain.value = 0.1;

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
}

// ➕ TAMBAH
function Addtask(){
    if(inputbox.value.trim() === '') return;

    playSound();

    let li = document.createElement("li");
    li.classList.add("fade-in");


    let now = new Date();
    let tanggal = now.toLocaleDateString("id-ID");
    let jam = now.getHours().toString().padStart(2,'0') + ":" +
              now.getMinutes().toString().padStart(2,'0');

    li.innerHTML = `
        <span class="task-text">${inputbox.value}</span>
        <div class="right">
            <span class="date-time">${tanggal} • ${jam}</span>
            <span class="delete">✖</span>
        </div>
    `;

    listContainer.appendChild(li);
    saveData();
    inputbox.value = "";
}

// ✔️ / ❌
listContainer.addEventListener("click", function(e){
    if(e.target.classList.contains("task-text")){
        e.target.parentElement.classList.toggle("checked");
        playSound();
        saveData();
    }
    else if(e.target.classList.contains("delete")){
    playSound();

    let li = e.target.parentElement.parentElement;

    li.classList.add("fade-out"); // 🔥 jalankan animasi dulu

    setTimeout(()=>{
        li.remove(); // ❌ hapus setelah animasi selesai
        saveData();
    }, 300);
}
});

// ⌨️ ENTER
inputbox.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        Addtask();
    }
});

// 💾
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

// 🔄
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data") || "";
}
showTask();


