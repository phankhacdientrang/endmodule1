let students = JSON.parse(localStorage.getItem("dataStudent")) || [];
let isEditing = false;

function save() {
  let fullName = document.getElementById("fullName").value.trim();
  let email = document.getElementById("email").value.trim();
  let phoneNumber = document.getElementById("phoneNumber").value.trim();
  let address = document.getElementById("address").value.trim();
  let gender = document.querySelector('input[name="gender"]:checked').value;

  if (fullName === "") {
    alert("Họ và tên không được để trống");
    return;
  }

  // Kiểm tra định dạng email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Email không hợp lệ");
    return;
  }

  // Kiểm tra định dạng số điện thoại
  const phoneNumberPattern = /^0\d{9}$/;
  if (!phoneNumberPattern.test(phoneNumber)) {
    alert("Số điện thoại không hợp lệ");
    return;
  }

  if (address === "") {
    alert("Quê quán không được để trống");
    return;
  }

  // Nếu đã qua được tất cả các kiểm tra, tiếp tục lưu thông tin
  if (isEditing) {
    updateStudent();
    isEditing = false;
  } else {
    let student = {
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
      gender: gender,
    };

    students.push(student);
    localStorage.setItem("dataStudent", JSON.stringify(students));
  }

  renderStudent();
}

function renderStudent() {
  let tableStudent = document.getElementById("tableStudent");
  tableStudent.innerHTML = "";

  students.forEach((student, index) => {
    let row = tableStudent.insertRow();
    let values = [
      index + 1,
      student.fullName,
      student.email,
      student.phoneNumber,
      student.address,
      student.gender,
      `<a onclick="editStudent(${index})" href="#">Edit</a>
          <a onclick="deleteStudent(${index})" href="#">Delete</a>`,
    ];
    for (let i = 0; i < values.length; i++) {
      let cell = row.insertCell(i);
      cell.innerHTML = values[i];
    }
  });
}

function deleteStudent(index) {
  let confirmDelete = confirm("Bạn có muốn xoá hay không");
  if (!confirmDelete) {
    return;
  }

  students.splice(index, 1);
  localStorage.setItem("dataStudent", JSON.stringify(students));
  renderStudent();
}

function editStudent(index) {
  let student = students[index];
  if (student) {
    let oldFullName = document.getElementById("fullName").value;
    let oldEmail = document.getElementById("email").value;
    let oldPhoneNumber = document.getElementById("phoneNumber").value;
    let oldAddress = document.getElementById("address").value;
    let oldGender = document.querySelector(
      'input[name="gender"]:checked'
    ).value;

    document.getElementById("fullName").value = student.fullName;
    document.getElementById("email").value = student.email;
    document.getElementById("phoneNumber").value = student.phoneNumber;
    document.getElementById("address").value = student.address;
    document.querySelector(
      `input[name="gender"][value="${student.gender}"]`
    ).checked = true;
    isEditing = true;
  }
}

function updateStudent() {
  let updatedFullName = document.getElementById("fullName").value;
  let updatedEmail = document.getElementById("email").value;
  let updatedPhoneNumber = document.getElementById("phoneNumber").value;
  let updatedAddress = document.getElementById("address").value;
  let updatedGender = document.querySelector(
    'input[name="gender"]:checked'
  ).value;

  let index = students.findIndex(
    (item) =>
      item.fullName === updatedFullName &&
      item.email === updatedEmail &&
      item.phoneNumber === updatedPhoneNumber &&
      item.address === updatedAddress &&
      item.gender === updatedGender
  );

  students[index].fullName = updatedFullName;
  students[index].email = updatedEmail;
  students[index].phoneNumber = updatedPhoneNumber;
  students[index].address = updatedAddress;
  students[index].gender = updatedGender;

  localStorage.setItem("dataStudent", JSON.stringify(students));
}

function arrange() {
  students.sort((a, b) => a.fullName.localeCompare(b.fullName));
  localStorage.setItem("dataStudent", JSON.stringify(students));
  renderStudent();
}

function search() {
  let searchStudent = document
    .getElementById("searchStudent")
    .value.toUpperCase();

  let filteredStudents = students.filter((item) =>
    item.fullName.toUpperCase().includes(searchStudent)
  );

  if (filteredStudents.length > 0) {
    students = filteredStudents;
    renderStudent();
  } else {
    alert("Không tìm thấy học viên.");
  }
}

renderStudent();
