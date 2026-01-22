const taskInput = document.getElementById('taskInput');
const dateInput = document.getElementById('dateInput');
const addBtn = document.getElementById('addBtn');
const todoBody = document.getElementById('todoBody');
const deleteAllBtn = document.getElementById('deleteAllBtn');
const filterBtn = document.getElementById('filterBtn');

let todos = [];

// Fungsi untuk menampilkan data ke tabel
function renderTodos(data = todos) {
    todoBody.innerHTML = '';

    if (data.length === 0) {
        todoBody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #94a3b8; padding: 20px;">No task found</td></tr>';
        return;
    }

    data.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.task}</td>
            <td>${item.date}</td>
            <td><span style="color: #818cf8; font-weight: bold;">Pending</span></td>
            <td>
                <button onclick="deleteTask(${index})" style="background: none; border: 1px solid #ef4444; color: #ef4444; padding: 5px 10px; border-radius: 6px; cursor: pointer;">Delete</button>
            </td>
        `;
        todoBody.appendChild(tr);
    });
}

// Tambah Tugas
addBtn.addEventListener('click', () => {
    // 1. Ambil data dari input
    const task = taskInput.value.trim(); // .trim() menghapus spasi kosong di awal/akhir
    const date = dateInput.value;

    // 2. Cek Validasi
    if (task === "") {
        // Cek apakah Task kosong
        alert("Peringatan: Nama tugas tidak boleh kosong!");
    } 
    else if (date === "") {
        // Cek apakah Tanggal belum diisi
        alert("Peringatan: Silakan pilih tanggal jatuh tempo!");
    } 
    else {
        // 3. Jika Valid:
        // Simpan data To-Do ke dalam array
        todos.push({ task, date });
        
        // Bersihkan input setelah berhasil
        taskInput.value = '';
        dateInput.value = '';
        
        // Perbarui daftar To-Do di layar
        renderTodos();
    }
});

// Hapus Satu Tugas
function deleteTask(index) {
    todos.splice(index, 1);
    renderTodos();
}

// Hapus Semua
deleteAllBtn.addEventListener('click', () => {
    if (todos.length > 0) {
        if (confirm("Hapus semua daftar tugas?")) {
            todos = [];
            renderTodos();
        }
    }
});

// Filter Hari Ini
filterBtn.addEventListener('click', () => {
    const today = new Date().toISOString().split('T')[0];
    
    if (filterBtn.innerText === "FILTER") {
        const filtered = todos.filter(todo => todo.date === today);
        renderTodos(filtered);
        filterBtn.innerText = "SHOW ALL";
    } else {
        renderTodos();
        filterBtn.innerText = "FILTER";
    }
});