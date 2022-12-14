let producService = new ProductService();
const getEle = (id) => document.getElementById(id);
const validation = new Validations();

// Call all list data from API
function getListProduct() {
  producService
    .getListProductApi()
    .then((rs) => {
      renderHTML(rs.data);
      console.log(rs.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
// Call func get list data from link API
getListProduct();

// Render list data ra UI
function renderHTML(data) {
  let content = "";
  data.forEach(function (product, index) {
    content += `
        <tr>
            <td>${index + 1}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.backCamera}</td>
            <td>${product.frontCamera}</td>
            <td>${product.type}</td>
            <td>
                <button class="btn btn-primary" data-toggle="modal" data-target="#myModal" onclick="editProduct('${
                  product.id
                }')">Edit</button>
                <button class="btn btn-danger" onclick="deleteProduct('${
                  product.id
                }')">Delete</button>
            </td>
        </tr>
        `;
  });
  getEle("tblDanhSachSanPham").innerHTML = content;
}

// Delete Product by Id
function deleteProduct(id) {
  producService
    .deleteProductApi(id)
    .then((rs) => {
      alert(`Delete Complete : ${rs.data.name}`);
      getListProduct();
    })
    .catch((error) => {
      console.log(error);
    });
}

getEle("btnThemSanPham").onclick = function () {
  let content = "Add Product";
  document.getElementsByClassName("modal-title")[0].innerHTML = content;
  let button = `<button class="btn btn-primary" onclick="addProduct()">ADD</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = button;
};

// Add Product
function addProduct() {
  let name = getEle("tenSP").value;
  let price = getEle("price").value;
  let screen = getEle("screen").value;
  let backCamera = getEle("backCamera").value;
  let frontCamera = getEle("frontCamera").value;
  let img = getEle("hinhAnh").value;
  let desc = getEle("moTa").value;
  let type = getEle("dongSanPham").value;
  var product = new Products(
    "",
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );
  //Flag
  let flag = true;
  //Check Validation T??n S???n Ph???m
  flag &= validation.kiemTraRong(
    name,
    "errorNameSP",
    "(*) Kh??ng ????? tr???ng t??n s???n ph???m"
  );
  //Check Validation gi?? ti???n
  flag &=
    validation.kiemTraRong(
      price,
      "errorPrice",
      "(*) Kh??ng ????? tr???ng gi?? ti???n"
    ) &&
    validation.kiemTraChiDuocNhapSo(
      price,
      "errorPrice",
      "(*) Gi?? ti???n ch??? ???????c nh???p s???"
    ); //Check Validation screen
  flag &= validation.kiemTraRong(
    screen,
    "errorScreen",
    "(*) Kh??ng ????? tr???ng th??ng s??? m??n h??nh"
  ); //Check Validation backCamera
  flag &= validation.kiemTraRong(
    backCamera,
    "errorBack",
    "(*) Kh??ng ????? tr???ng th??ng s??? Camera Sau"
  ); //Check Validation FrontCamera
  flag &= validation.kiemTraRong(
    frontCamera,
    "errorFront",
    "(*) Kh??ng ????? tr???ng th??ng s??? Camera Tr?????c"
  ); //Check Validation H??nh ???nh
  flag &= validation.kiemTraRong(
    img,
    "errorPic",
    "(*) Kh??ng ????? tr???ng h??nh ???nh"
  ); //Check Validation M?? T???
  flag &= validation.kiemTraRong(
    desc,
    "errorMoTa",
    "(*) Kh??ng ????? tr???ng m?? t??? c???a s???n ph???m"
  ); //Check Validation D??ng s???n ph???m
  flag &= validation.kiemTraSelect(
    "dongSanPham",
    "errorDSP",
    "(*) Vui l??ng ch???n ????ng d??ng s???n ph???m"
  );

  if (flag) {
    producService
      .addProductApi(product)
      .then((rs) => {
        alert("Add Complete !");
        getListProduct();
        document.getElementsByClassName("close")[0].click();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

// Edit Product
function editProduct(id) {
  let content = "Edit Product";
  document.getElementsByClassName("modal-title")[0].innerHTML = content;
  let button = `<button class="btn btn-warning" onclick="updateProduct('${id}')">Update</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = button;
  producService
    .getProductByIdApi(id)
    .then((rs) => {
      let editProduct = rs.data;
      getEle("tenSP").value = editProduct.name;
      getEle("price").value = editProduct.price;
      getEle("screen").value = editProduct.screen;
      getEle("backCamera").value = editProduct.backCamera;
      getEle("frontCamera").value = editProduct.frontCamera;
      getEle("hinhAnh").value = editProduct.img;
      getEle("moTa").value = editProduct.desc;
      getEle("dongSanPham").value = editProduct.type;
    })
    .catch((error) => {
      console.log(error);
    });
}

// // Update Product
function updateProduct(id) {
  let name = getEle("tenSP").value;
  let price = getEle("price").value;
  let screen = getEle("screen").value;
  let backCamera = getEle("backCamera").value;
  let frontCamera = getEle("frontCamera").value;
  let img = getEle("hinhAnh").value;
  let desc = getEle("moTa").value;
  let type = getEle("dongSanPham").value;
  let product = new Products(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );
  producService
    .updateProductByIdApi(product)
    .then(() => {
      alert("Update Complete!");
      getListProduct();
      document.getElementsByClassName("close")[0].click();
    })
    .catch((error) => {
      console.log(error);
    });
}
