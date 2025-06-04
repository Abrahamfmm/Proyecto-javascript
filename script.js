const students=[];

const nameInput = document.getElementById("name");
const lastNameInput = document.getElementById("lastName");
const gradeInput = document.getElementById("grade");
const promedios = document.getElementById("average");
const tableBody = document.querySelector("#studentTable tbody");
const statsDiv = document.getElementById("stats");
document.getElementById("studentForm").addEventListener("submit",function(e){
    e.preventDefault();

const name=document.getElementById("name").value.trim();
const lastName=document.getElementById("lastName").value.trim();
const grade=parseFloat (document.getElementById("grade").value);

if( !name || !lastName || isNaN(grade) || grade<1 || grade>7){
    alert("Error al ingresar los datos")
    return
}
const student={name,lastName,grade}
students.push(student)
console.log(students)
addStudentToTable(student)
calcularPromedio()
this.reset();
});

function addStudentToTable(student) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${student.name}</td>
    <td>${student.lastName}</td>
    <td>${student.grade.toFixed(1)}</td>
    <td>
        <button class="edit">Editar</button>
        <button class="delete">Eliminar</button>
    </td>
    `;

row.querySelector(".delete").addEventListener("click",function(){
    deleteEstudiante(student,row);
});

row.querySelector(".edit").addEventListener("click", function () {
    editarEstudiante(student, row);
});

tableBody.appendChild(row);
calcularPromedio();
updateStats();
}


function deleteEstudiante(student,row){
    const index=students.indexOf(student);
    if(index>-1){
        students.splice(index,1);
        row.remove();
        calcularPromedio();
        updateStats();
    }
}

function calcularPromedio(){
    if (students.length==0){
        promedios.textContent="Promedio General del Curso: N/A"
    return;
    }
    const total=students.reduce((sum,student)=>sum+student.grade,0);
    const prom=total/students.length;
    promedios.textContent="Promedio General del Curso :"+prom.toFixed(2);
}

function editarEstudiante(student, row) {
    nameInput.value = student.name;
    lastNameInput.value = student.lastName;
    gradeInput.value = student.grade;
    const index = students.indexOf(student);
    if (index > -1) {
        students.splice(index, 1);
    }
    row.remove();
    calcularPromedio();
}
function updateStats() {
    const total = students.length;
    const mustTakeExam = students.filter(s => s.grade < 5.0).length;
    const exempted = students.filter(s => s.grade >= 5.0).length;
    statsDiv.innerHTML = `
      <p>Total de estudiantes: ${total}</p>
      <p>Estudiantes que deben rendir examen: ${mustTakeExam}</p>
      <p>Estudiantes eximidos: ${exempted}</p>
    `;
  }