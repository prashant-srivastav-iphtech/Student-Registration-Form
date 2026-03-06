let students = [];
let editIndex = -1;
let type = "form";

let inputField = document.getElementById("input-field");
let dataField = document.getElementById("data-field");
let floatingBtn = document.getElementById("floating-btn");
let nodata = document.getElementById("nodata");
showData(type);

document.getElementById("form-reg").addEventListener("submit", function (e) {
  e.preventDefault();

  document.querySelectorAll(".error").forEach((el) => (el.textContent = ""));
  document
    .querySelectorAll("input, select")
    .forEach((el) => el.classList.remove("error-border"));

  let isValid = true;

  function setError(id, message) {
    document.getElementById(id + "Error").textContent = message;
    document.getElementById(id)?.classList.add("error-border");
    isValid = false;
  }

  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let date = document.getElementById("date").value.trim();
  let school = document.getElementById("school").value.trim();
  let course = document.getElementById("course").value.trim();
  let yop = document.getElementById("yop").value.trim();
  let grade = document.getElementById("grade").value.trim();
  let address = document.getElementById("address").value.trim();
  let city = document.getElementById("city").value.trim();
  let state = document.getElementById("state").value.trim();
  let postalCode = document.getElementById("postal-code").value.trim();
  let fatherName = document.getElementById("father-name").value.trim();
  let motherName = document.getElementById("mother-name").value.trim();
  let parentContact = document.getElementById("parent-contact").value.trim();
  let parentEmail = document.getElementById("parent-email").value.trim();
  let gender = document.querySelector('input[name="gender"]:checked');

  let namePattern = /^[A-Za-z ]{3,50}$/;
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  let phonePattern = /^[6-9][0-9]{9}$/;
  let postalPattern = /^[0-9]{6}$/;
  let gradePattern = /^(\d{1,2}(\.\d{1,2})?|100)$/;

  let currentYear = new Date().getFullYear();

  name = name.replace(/\s+/g, " ");
  fatherName = fatherName.replace(/\s+/g, " ");
  motherName = motherName.replace(/\s+/g, " ");

  if (name === "") {
    setError("name", "Full name is required");
  } else if (!namePattern.test(name)) {
    setError("name", "Only letters allowed (3-50 characters)");
  }

  if (email === "") {
    setError("email", "Email is required");
  } else if (!emailPattern.test(email)) {
    setError("email", "Enter valid email format");
  }

  if (phone === "") {
    setError("phone", "Phone number required");
  } else if (!phonePattern.test(phone)) {
    setError("phone", "Enter valid 10-digit Indian number");
  }

  if (date === "") {
    setError("date", "Date of birth required");
  } else {
    let birthDate = new Date(date);
    let age = new Date().getFullYear() - birthDate.getFullYear();
    if (age < 15) {
      setError("date", "Minimum age should be 15");
    }
  }

  if (!gender) {
    document.getElementById("genderError").textContent = "Please select gender";
    isValid = false;
  }

  if (school === "") {
    setError("school", "Please select college");
  }

  if (course === "") {
    setError("course", "Please select course");
  }

  if (yop === "") {
    setError("yop", "Year of passing required");
  } else if (yop < 1950 || yop > currentYear) {
    setError("yop", "Enter valid year");
  }

  if (grade === "") {
    setError("grade", "Grade required");
  } else if (!gradePattern.test(grade) || grade > 100) {
    setError("grade", "Enter valid percentage (0-100)");
  }

  if (address.length < 5) {
    setError("address", "Address must be at least 5 characters");
  }

  if (city === "" || !namePattern.test(city)) {
    setError("city", "Enter valid city name");
  }

  if (state === "" || !namePattern.test(state)) {
    setError("state", "Enter valid state name");
  }

  if (postalCode === "") {
    setError("postal-code", "Postal code required");
  } else if (!postalPattern.test(postalCode)) {
    setError("postal-code", "Postal code must be 6 digits");
  }

  if (fatherName === "") {
    setError("father-name", "Father name required");
  } else if (!namePattern.test(fatherName)) {
    setError("father-name", "Only letters allowed");
  }

  if (motherName === "") {
    setError("mother-name", "Mother name required");
  } else if (!namePattern.test(motherName)) {
    setError("mother-name", "Only letters allowed");
  }

  if (parentContact === "") {
    setError("parent-contact", "Parent contact required");
  } else if (!phonePattern.test(parentContact)) {
    setError("parent-contact", "Enter valid 10-digit number");
  } else if (parentContact === phone) {
    setError("parent-contact", "Parent number cannot match student number");
  }

  if (parentEmail === "") {
    setError("parent-email", "Parent email required");
  } else if (!emailPattern.test(parentEmail)) {
    setError("parent-email", "Enter valid email");
  } else if (parentEmail === email) {
    setError("parent-email", "Parent email cannot match student email");
  }

  if (!isValid) return;

  const studentData = {
    name,
    email,
    phone,
    date,
    gender: gender ? gender.value : "",
    school,
    course,
    yop,
    grade,
    address,
    city,
    state,
    postalCode,
    fatherName,
    motherName,
    parentContact,
    parentEmail,
  };

  if (editIndex === -1) {
    students.push(studentData);
    showToast("Success", "Application submitted successfully");
  } else {
    students[editIndex] = studentData;
    editIndex = -1;
    showToast("Success", "Application updated successfully");
  }

  document.getElementById("form-reg").reset();
  displayStudents();
});

document.querySelectorAll("input, select").forEach((input) => {
  input.addEventListener("input", function () {
    const errorElement = document.getElementById(this.id + "Error");

    if (errorElement) {
      errorElement.textContent = "";
    }

    this.classList.remove("error-border");
  });
});

function editStudent(index) {
  const student = students[index];

  editIndex = index;

  document.getElementById("name").value = student.name;
  document.getElementById("email").value = student.email;
  document.getElementById("phone").value = student.phone;
  document.getElementById("date").value = student.date;
  document.getElementById("school").value = student.school;
  document.getElementById("course").value = student.course;
  document.getElementById("yop").value = student.yop;
  document.getElementById("grade").value = student.grade;
  document.getElementById("address").value = student.address;
  document.getElementById("city").value = student.city;
  document.getElementById("state").value = student.state;
  document.getElementById("postal-code").value = student.postalCode;
  document.getElementById("father-name").value = student.fatherName;
  document.getElementById("mother-name").value = student.motherName;
  document.getElementById("parent-contact").value = student.parentContact;
  document.getElementById("parent-email").value = student.parentEmail;

  if (student.gender) {
    document.querySelector(
      `input[name="gender"][value="${student.gender}"]`,
    ).checked = true;
  }

  showData("form");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function displayStudents() {
  const tbody = document.getElementById("studentTableBody");
  tbody.innerHTML = "";

  students.forEach((student, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.email}</td>
      <td>${student.phone}</td>
      <td>${student.date}</td>
      <td>${student.gender}</td>
      <td>${student.school}</td>
      <td>${student.course}</td>
      <td>${student.yop}</td>
      <td>${student.grade}</td>
      <td>${student.city}</td>
      <td>${student.state}</td>
      <td>
        <button onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this student?")) {
    students.splice(index, 1);
    showToast("Success", "Application deleted successfully");
    displayStudents();
    renderNoData();
  }
}

// ----------------------------
// College - System
// ----------------------------

const collegeSelect = document.getElementById("school");
const addCollegeBtn = document.getElementById("addCollegeBtn");

const defaultColleges = ["BBDU", "LU", "DU"];

function loadColleges() {
  let colleges = JSON.parse(localStorage.getItem("colleges"));

  if (!colleges) {
    colleges = defaultColleges;
    localStorage.setItem("colleges", JSON.stringify(colleges));
  }

  collegeSelect.innerHTML = '<option value="">Select College</option>';

  colleges.forEach((college) => {
    const option = document.createElement("option");
    option.value = college;
    option.textContent = college;
    collegeSelect.appendChild(option);
  });
}

addCollegeBtn.addEventListener("click", function () {
  const newCollege = prompt("Enter new college name:");

  if (!newCollege || newCollege.trim() === "") return;

  let colleges = JSON.parse(localStorage.getItem("colleges")) || [];

  if (colleges.includes(newCollege.trim())) {
    alert("College already exists!");
    return;
  }

  colleges.push(newCollege.trim());
  localStorage.setItem("colleges", JSON.stringify(colleges));

  loadColleges();
  collegeSelect.value = newCollege.trim();
});

loadColleges();

function showToast(title, message) {
  const toast = document.getElementById("toast");

  toast.querySelector(".toast-title").textContent = title;
  toast.querySelector(".toast-message").textContent = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

floatingBtn.addEventListener("click", () => {
  showData(type === "form" ? "data" : "form");
});

function showData(t) {
  if (t === "data") {
    inputField.style.display = "none";
    dataField.style.display = "block";
    floatingBtn.innerHTML = `<img src="./assets/icons/add-user.png" height="30" width="30" alt="" />`;
  } else {
    inputField.style.display = "grid";
    dataField.style.display = "none";
    floatingBtn.innerHTML = `<img src="./assets/icons/database.png" height="30" width="30" alt="" />`;
  }
  type = t;
  renderNoData();
}

function renderNoData() {
  nodata.style.display = students.length > 0 ? "none" : "flex";
}
