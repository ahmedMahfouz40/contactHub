var productNameInput = document.getElementById("productNameInput");
var productPhoneInput = document.getElementById("productPhoneInput");
var productEmailInput = document.getElementById("productEmailInput");
var productAddressInput = document.getElementById("productAddressInput");
var productGroupInput = document.getElementById("productGroupInput");
var productNotesInput = document.getElementById("productNotesInput");
var productFavInput = document.getElementById("productFavInput");
var productEmergencyInput = document.getElementById("productEmergencyInput");
var productToBeUpdated;
var imageInput = document.getElementById("imageInput");
var imageLivePrev = document.getElementById("imageLivePrev");
var saveBtn = document.getElementById("saveBtn");
var updateBtn = document.getElementById("updateBtn");
var EditContactMsg = document.getElementById("EditContactMsg");
var addNewContactMsg = document.getElementById("addNewContactMsg");
var allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];
displayProducts();
calcFavoriteAndEmergency();
displayFavoritesProducts();
displayEmergencyProducts();

function addProduct() {
  if (!validateForm()) return;

  if (imageInput.files[0]) {
    var reader = new FileReader();
    reader.readAsDataURL(imageInput.files[0]);
    reader.onload = function () {
      var newProduct = {
        id: Date.now(),
        name: productNameInput.value,
        phone: productPhoneInput.value,
        email: productEmailInput.value,
        address: productAddressInput.value,
        group: productGroupInput.value,
        notes: productNotesInput.value,
        isFavorite: productFavInput.checked,
        isEmergency: productEmergencyInput.checked,
        image: reader.result,
      };

      allProducts.push(newProduct);
      displayProducts();
      saveIntoLocalStorage();
      clearForm();
      calcFavoriteAndEmergency();
      displayFavoritesProducts();
      displayEmergencyProducts();
      Swal.fire({
        title: "Added!",
        text: "Contact has been added successfully.",
        icon: "success",
      });
    };
    var myModal = document.getElementById("staticBackdrop");
    var bootstrapModal = bootstrap.Modal.getInstance(myModal);
    bootstrapModal.hide();
  } else {
    var newProduct = {
      id: Date.now(),
      name: productNameInput.value,
      phone: productPhoneInput.value,
      email: productEmailInput.value,
      address: productAddressInput.value,
      group: productGroupInput.value,
      notes: productNotesInput.value,
      isFavorite: productFavInput.checked,
      isEmergency: productEmergencyInput.checked,
      image: "",
    };

    allProducts.push(newProduct);
    displayProducts();
    saveIntoLocalStorage();
    clearForm();
    calcFavoriteAndEmergency();
    displayFavoritesProducts();
    displayEmergencyProducts();
    Swal.fire({
      title: "Added!",
      text: "Contact has been added successfully.",
      icon: "success",
    });
    var myModal = document.getElementById("staticBackdrop");
    var bootstrapModal = bootstrap.Modal.getInstance(myModal);
    bootstrapModal.hide();
  }
}
// ? dispaly all products in html Page
function displayProducts(arr = allProducts) {
  var htmlMarkup = "";
  if (arr.length === 0) {
    htmlMarkup = `
   <div
                  class="w-100 d-flex flex-column gap-3 justify-content-center p-5 align-items-center"
                >
                  <i
                    style="background-color: rgb(240, 240, 240)"
                    class="fa-regular text-secondary fs-1 rounded-2 p-1 fa-address-book"
                  ></i>
                  <p class="text-secondary fw-bold">No Contacts Yet</p>
                </div>
   `;
  }
  for (var i = 0; i < arr.length; i++) {
    htmlMarkup += ` 
            <div class="col pb-4 card-profile">
                  <div class="Inner p-2 bg-white rounded-4">
                    <div class="head d-flex align-items-center">
                      <div
                        class="position-relative d-flex align-items-center  justify-content-center profile-icon rounded-4 me-3 text-white fs-5"
                      >
                        ${
                          arr[i].image
                            ? `<img class="w-100 h-100 rounded-4" src="${arr[i].image}" alt=""/>`
                            : `<span class="">${arr[i].name[0]}</span>`
                        }
                        <span
                          class=" ${
                            arr[i].isFavorite ? "d-flex" : "d-none"
                          } icon-fav-absolute  icon-absolute position-absolute d-flex align-items-center justify-content-center rounded-circle  bg-warning text-white"
                        >
                          <i class="fa-solid fa-star "></i>
                        </span>
                        <span 
                          class=" ${
                            arr[i].isEmergency ? "d-flex" : "d-none"
                          } icon-emer-absolute icon-absolute position-absolute d-flex align-items-center justify-content-center rounded-circle bg-danger text-white"
                        >
                          <i class="fa-solid fa-heart-pulse "></i>
                        </span>
                      </div>
                      <div>
                        <div class="name mb-2 fw-bold fs-5">${arr[i].name}</div>
                        <div class="phone">
                          <span class="profile-phone-icon p-1 rounded-2"
                            ><i class="fa-solid fa-phone small"></i
                          ></span>
                          <span class="profile-phone"> ${arr[i].phone}</span>
                        </div>
                      </div>
                    </div>
                    <div class="body my-3">
                      <div class="d-flex align-items-center column-gap-2">
                        <p class="mail-icon">
                          <i class="fa-solid fa-envelope"></i>
                        </p>
                        <p class="mail-desc">${arr[i].email}</p>
                      </div>
                      <div class="d-flex align-items-center column-gap-2">
                        <p class="loc-icon">
                          <i class="fa-solid fa-location-dot"></i>
                        </p>
                        <p class="loc-desc">${arr[i].address}</p>
                      </div>
                      <span
                        class="${
                          arr[i].group
                            ? "category loc-icon loc-desc px-2 py-1 fw-normal"
                            : ""
                        }"
                      >
                        ${arr[i].group}
                      </span>
                      <span
                        class="${
                          arr[i].isEmergency ? "d-inline" : "d-none"
                        } emergency px-2 py-1 fw-normal text-danger ms-1"
                      >
                        <i class="fa-solid fa-heart-pulse"></i>
                        Emergency
                      </span>
                    </div>
                    <div
                      class="footer d-flex justify-content-between mt-4 border-top"
                    >
                      <div>
                        <a href="tel:${arr[i].phone}" class="phone-icon border-0 text-decoration-none" title="Call">
                          <i class="fa-solid fa-phone"></i
                        ></a>
                        <a href="mailto:${arr[i].email}" class="mail-icon border-0 text-decoration-none" title="Email">
                          <i class="fa-solid fa-envelope"></i
                        ></a>
                      </div>

                      <div class="d-flex column-gap-3 pe-2">
                        <button  title="Favorite"  class="border-0 p-1 star-icon icon ">
                          <i onclick="toggleIconFav(this,'${
                            arr[i].id
                          }')" class=" ${
                            arr[i].isFavorite
                              ? "fa-solid text-warning "
                              : "fa-regular "
                          } fa-star"></i>
                            </button>
                            <button title="Emergency"   class="border-0 p-1 heart-icon  icon ">
                              <i  onclick="toggleIconEmer(this,'${
                                arr[i].id
                              }')" class="${
                                arr[i].isEmergency
                                  ? "fa-solid fa-heart-pulse text-danger"
                                  : "fa-regular fa-heart"
                              } "></i> 
                        </button>
                        <button 
                        title="Edit"  
                          data-bs-toggle="modal"  data-bs-target="#staticBackdrop" onclick="setProductToUpdated('${
                            arr[i].id
                          }')" class="border-0 p-1 pen-icon icon">
                          <i class="fa-solid fa-pen"></i>
                        </button>
                        <button title="Delete" onclick="deleteProduct(${
                          arr[i].id
                        })" class="border-0 p-1 trash-icon icon">
                          <i class="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
        `;
  }
  document.getElementById("profileCard").innerHTML = htmlMarkup;
}
// ? save data in local storage to display and use it after
function saveIntoLocalStorage() {
  localStorage.setItem("allProducts", JSON.stringify(allProducts));
}
// ? delete product from mail list
function deleteProduct(id) {
  Swal.fire({
    title: "Delete Contact?",
    text: `Are you sure you want to delete this contact? This action cannot be undone.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel!",
  }).then((result) => {
    if (result.isConfirmed) {
      allProducts = allProducts.filter(function (product) {
        return product.id != id;
      });
      displayProducts();
      saveIntoLocalStorage();
      calcFavoriteAndEmergency();
      displayFavoritesProducts();
      displayEmergencyProducts();

      Swal.fire("Deleted", "Contact has been deleted", "success");
    }
  });
}
// ? clear form after updating and addition and start Page
function clearForm() {
  productNameInput.value = "";
  productPhoneInput.value = "";
  productEmailInput.value = "";
  productAddressInput.value = "";
  productGroupInput.value = "";
  productNotesInput.value = "";
  productFavInput.checked = false;
  productEmergencyInput.checked = false;
  imageInput.value = "";
  imageLivePrev.setAttribute("src", "./images/default.png");
}
function search(term) {
  term = term.toLowerCase();
  var searchedList = allProducts.filter(function (product) {
    return (
      product.name.toLowerCase().includes(term) ||
      product.phone.includes(term) ||
      product.email.toLowerCase().includes(term)
    );
  });

  displayProducts(searchedList);
}
// ? data up on inputs to set it to update
function setProductToUpdated(id) {
  addNewContactMsg.classList.add("d-none");
  EditContactMsg.classList.remove("d-none");

  productToBeUpdated = allProducts.find(function (product) {
    return product.id == id;
  });
  productNameInput.value = productToBeUpdated.name;
  productPhoneInput.value = productToBeUpdated.phone;
  productEmailInput.value = productToBeUpdated.email;
  productAddressInput.value = productToBeUpdated.address;
  productGroupInput.value = productToBeUpdated.group;
  productNotesInput.value = productToBeUpdated.notes;
  productFavInput.checked = productToBeUpdated.isFavorite;
  imageLivePrev.setAttribute(
    "src",
    productToBeUpdated.image || "./images/default.png",
  );
  productEmergencyInput.checked = productToBeUpdated.isEmergency;

  saveBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}
// ? function for updating product
function updateProduct() {
  if (!validateForm()) return;
  if (imageInput.files[0]) {
    var reader = new FileReader();
    reader.readAsDataURL(imageInput.files[0]);
    reader.onload = function () {
      productToBeUpdated.name = productNameInput.value;
      productToBeUpdated.phone = productPhoneInput.value;
      productToBeUpdated.email = productEmailInput.value;
      productToBeUpdated.address = productAddressInput.value;
      productToBeUpdated.group = productGroupInput.value;
      productToBeUpdated.notes = productNotesInput.value;
      productToBeUpdated.isFavorite = productFavInput.checked;
      productToBeUpdated.isEmergency = productEmergencyInput.checked;
      productToBeUpdated.image = reader.result;

      displayProducts();
      saveIntoLocalStorage();
      displayEmergencyProducts();
      displayFavoritesProducts();
      calcFavoriteAndEmergency();
      clearForm();

      saveBtn.classList.remove("d-none");
      updateBtn.classList.add("d-none");
      addNewContactMsg.classList.remove("d-none");
      EditContactMsg.classList.add("d-none");
      Swal.fire({
        title: "Updated!",
        text: "Contact has been updated successfully.",
        icon: "success",
      });
      var myModal = document.getElementById("staticBackdrop");
      var bootstrapModal = bootstrap.Modal.getInstance(myModal);
      bootstrapModal.hide();
    };
  } else {
    productToBeUpdated.name = productNameInput.value;
    productToBeUpdated.phone = productPhoneInput.value;
    productToBeUpdated.email = productEmailInput.value;
    productToBeUpdated.address = productAddressInput.value;
    productToBeUpdated.group = productGroupInput.value;
    productToBeUpdated.notes = productNotesInput.value;
    productToBeUpdated.isFavorite = productFavInput.checked;
    productToBeUpdated.isEmergency = productEmergencyInput.checked;
    displayProducts();
    saveIntoLocalStorage();
    displayEmergencyProducts();
    displayFavoritesProducts();
    calcFavoriteAndEmergency();
    clearForm();
    saveBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
    addNewContactMsg.classList.remove("d-none");
    EditContactMsg.classList.add("d-none");
    Swal.fire({
      title: "Updated!",
      text: "Contact has been updated successfully.",
      icon: "success",
    });
    var myModal = document.getElementById("staticBackdrop");
    var bootstrapModal = bootstrap.Modal.getInstance(myModal);
    bootstrapModal.hide();
  }
}
// ? toggle favorite icon
function toggleIconFav(element, id) {
  var findFavoriteItem = allProducts.find(function (product) {
    return product.id == id;
  });
  findFavoriteItem.isFavorite = !findFavoriteItem.isFavorite;

  if (element.classList.contains("fa-regular")) {
    element.classList.replace("fa-regular", "fa-solid");
    element.classList.add("text-warning");
  } else {
    element.classList.replace("fa-solid", "fa-regular");
    element.classList.remove("text-warning");
  }
  displayProducts();
  displayFavoritesProducts();
  calcFavoriteAndEmergency();
  saveIntoLocalStorage();
}
//? toggle emergency icon
function toggleIconEmer(element, id) {
  var findEmergencyItems = allProducts.find(function (product) {
    return product.id == id;
  });
  findEmergencyItems.isEmergency = !findEmergencyItems.isEmergency;

  if (
    element.classList.contains("fa-heart") &&
    element.classList.contains("fa-regular")
  ) {
    element.classList.replace("fa-heart", "fa-heart-pulse");
    element.classList.replace("fa-regular", "fa-solid");
    element.classList.add("text-danger");
  } else {
    element.classList.replace("fa-heart-pulse", "fa-heart");
    element.classList.replace("fa-solid", "fa-regular");
    element.classList.remove("text-danger");
  }
  displayProducts();
  displayEmergencyProducts();
  calcFavoriteAndEmergency();
  saveIntoLocalStorage();
}
// ? display favorite items
function displayFavoritesProducts() {
  var filterdFavoriteProduct = allProducts.filter(function (product) {
    return product.isFavorite == true;
  });
  var htmlMarkup = "";
  for (var i = 0; i < filterdFavoriteProduct.length; i++) {
    htmlMarkup += `
                <div class="col-12 col-md-6 col-xl-12 p-2">
                    <div
                      style="background-color: rgb(248, 243, 243)"
                      class="  box d-flex px-2 rounded-3 cursor-pointer justify-content-between align-items-center"
                    >
                      <div class="d-flex column-gap-2 align-items-center">
                        <div
                          class="bg-info rounded-3 d-flex align-items-center justify-content-center text-white"
                          style="width: 40px; height: 40px"
                        >
                          ${
                            filterdFavoriteProduct[i].image
                              ? `<img class="w-100 h-100 rounded-3" src="${filterdFavoriteProduct[i].image}" alt=""/>`
                              : `<span class="">${filterdFavoriteProduct[i].name[0]}</span>`
                          }
                        </div>
                        <div>
                          <h4 class="mb-0 small fw-bold pt-2">${
                            filterdFavoriteProduct[i].name
                          }</h4>
                          <p class="phoneNumber small text-secondary">
                            ${filterdFavoriteProduct[i].phone}
                          </p>
                        </div>
                      </div>
                      <a
                      href="tel:${filterdFavoriteProduct[i].phone}"
                        class="call-icon  rounded-3 d-flex justify-content-center align-items-center text-decoration-none"
                      >
                        <i class="fa-solid fa-phone"></i>
                      </a>
                    </div>
                  </div>

    `;
  }
  document.getElementById("dFavoriteProducts").innerHTML = htmlMarkup;

  if (filterdFavoriteProduct.length == 0) {
    document.getElementById("dFavoriteProducts").innerHTML = `
    <div class="py-5">
                    <p class="text-center text-muted fw-semibold">
                      No Favorites Yet
                    </p>
                  </div>
    `;
  }
}
// ? display emergency items
function displayEmergencyProducts() {
  var filterdEmergencyProduct = allProducts.filter(function (product) {
    return product.isEmergency == true;
  });
  var htmlMarkup = "";
  for (var i = 0; i < filterdEmergencyProduct.length; i++) {
    htmlMarkup += `
      <div class="col-12 col-md-6 col-xl-12 p-2">
                    <div
                      style="background-color: rgb(248, 243, 243)"
                      class="box d-flex px-2 rounded-3 cursor-pointer justify-content-between align-items-center"
                    >
                      <div class="d-flex column-gap-2 align-items-center">
                        <div
                          class="bg-info rounded-3 d-flex align-items-center justify-content-center text-white"
                          style="width: 40px; height: 40px"
                        >
                          ${
                            filterdEmergencyProduct[i].image
                              ? `<img class="w-100 h-100 rounded-3" src="${filterdEmergencyProduct[i].image}" alt=""/>`
                              : `<span class="">${filterdEmergencyProduct[i].name[0]}</span>`
                          }
                        </div>
                        <div>
                          <h4 class="mb-0 small fw-bold pt-2">${
                            filterdEmergencyProduct[i].name
                          }</h4>
                          <p class="phoneNumber small text-secondary">
                           ${filterdEmergencyProduct[i].phone}
                          </p>
                        </div>
                      </div>
                      <a
                       href="tel:${filterdEmergencyProduct[i].phone}"
                        class="call-emergenct-icon border-0 rounded-3 d-flex justify-content-center align-items-center"
                      >
                        <i class="fa-solid fa-phone"></i>
                      </a>
                    </div>
                  </div>
    `;
  }
  document.getElementById("dEmergencyProducts").innerHTML = htmlMarkup;

  if (filterdEmergencyProduct.length == 0) {
    document.getElementById("dEmergencyProducts").innerHTML = `
    <div class="py-5">
                    <p class="text-center text-muted fw-semibold">
                      No Emergency Content
                    </p>
                  </div>
    `;
  }
}
// ? calc Total, favorite and emergency list to display their count
function calcFavoriteAndEmergency() {
  var countFav = 0;
  var countEmer = 0;
  for (var i = 0; i < allProducts.length; i++) {
    if (allProducts[i].isFavorite) countFav++;
    if (allProducts[i].isEmergency) countEmer++;
  }
  document.getElementById("is-favorite").innerHTML = countFav;
  document.getElementById("is-emergency").innerHTML = countEmer;
  document.getElementById("totalCount").innerHTML = allProducts.length;
  document.getElementById("allContDescription").innerHTML = `
   Manage and organize your ${allProducts.length} contacts
  `;
}
// ? validation function
function validation(element, msg) {
  var text = element.value;
  msg = document.getElementById(msg);
  regex = {
    productNameInput: /^[a-zA-Z\s]{2,50}$/,
    productPhoneInput: /^(02|\+2|002)?(01)(2|5|1|0)[0-9]{8}$/,
    productEmailInput: /^\w{2,50}@(gmail|yahoo)\.com$/,
  };

  if (regex[element.id].test(text) == false) {
    msg.classList.remove("d-none");
    element.classList.add("is-invalid");
    return false;
  } else {
    msg.classList.add("d-none");
    element.classList.remove("is-invalid");
    return true;
  }
}
// ? using validation function to control it and make it simple for using at add and update
function validateForm() {
  if (!validation(productNameInput, "nameMsg")) {
    Swal.fire({
      title: "Missing Name",
      text: "Please Enter a Name for the Contact!",
      icon: "error",
    });
    return false;
  }
  if (!validation(productPhoneInput, "phoneMsg")) {
    Swal.fire({
      title: "Invalid Phone",
      text: "Please enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)",
      icon: "error",
    });
    return false;
  }
  if (!validation(productEmailInput, "emailMsg")) {
    Swal.fire({
      title: "Invalid Email",
      text: "Please enter a valid email address",
      icon: "error",
    });
    return false;
  }
  return true;
}
// ?live Image (default)
imageInput.onchange = function () {
  var reader = new FileReader();
  reader.readAsDataURL(imageInput.files[0]);
  reader.onload = function () {
    imageLivePrev.setAttribute("src", reader.result);
  };
};
