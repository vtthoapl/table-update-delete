const getId = (id) => document.getElementById(id);
const baseUrl = 'https://6388bbe1d94a7e5040a569e9.mockapi.io/test/';
//uuid javascript google san tu stackoverflow: Universally Unique IDentifier
/* let uniqueId =
  Date.now().toString(36) + Math.random().toString(36).substring(2); */
let data = [
  {
    id: 1,
    name: 'a',
    img: 'https://images.pexels.com/photos/7946466/pexels-photo-7946466.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 2,
    name: 'a2',
    img: 'https://images.pexels.com/photos/4052752/pexels-photo-4052752.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 3,
    name: 'aasdfsa2',
    img: 'https://images.pexels.com/photos/6897766/pexels-photo-6897766.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
];
/* 
Dung async() de khai bao ham bat dong bo
await : co nghia la cho doi cai url chay thanh cong
neu that bai thi chay dong error
*/

(renderToTable = async () => {
  try {
    const res = await axios.get(baseUrl);
    const data = res.data;

    let content = '';
    for (let i = 0; i < data.length; i++) {
      const { id, name, img } = data[i];
      content += `<tr>
              <td>${id}</td>
                <td>${name}</td>
                <td>
                  <img
                    class="imgCustom"
                    src=${img}
                    alt="#"
                  />
                   <td><button class='btn btn-success' onclick='handleUpdate("${id}")' data-bs-toggle="modal"
                   data-bs-target="#exampleModalUpdate" >update</button> </td>
                  <td><button class='btn btn-danger' onclick='handleDelete("${id}")'>delete</button> </td> 
                </td>
                </tr>
       `;
    }
    getId('body').innerHTML = content;
  } catch (error) {
    console.log(error);
  }
})(); /* phai nho goi ham oi chay ()() */
//them async o truoc chu function, neu la dung addeventlistener de bien doi thanh ham bat dong bo
//!go tryc de hien ra: try.catch
getId('save_btn').addEventListener('click', async function () {
  try {
    //b1: lay du lieu dau vao
    const name = getId('nameModalAdd').value;
    const img = getId('imgModalAdd').value;

    // b2: kiem tra data, va chuyen doi data phu hop
    const newData = { /* id: uniqueId, */ name, img }; // coding id= unique() tu dong so 3
    // const newData = { id: 'uniqueId', name: name, img: img };
    //b3 them vao data
    await axios.post(baseUrl, newData);
    //data.push(newData);
    //b4: render ra ngoai man hinh
    renderToTable();
  } catch (error) {
    console.log(error);
  }
});

//closurefunction: Goi ham lai trong noi dung cua ham khac
/* Lam nut xoa 
b1: kiem vi tri id
b2: xoa id do
*/
/* Cach dung co lo xi, gio khong dung nua
const handleDelete = (value) => {
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    if (element.id == value) {
      data.splice(i, 1);
      renderToTable();
    }
  }
}; */

//for in (tim vi tri) for off (tra lai chinh element do)
/* const handleDelete = (value) => {
    for (let i in data){
        if(data[i].id == value) {
            data.splice(i, 1)
            renderToTable()
        }
    }
} */

//ES6 findIndex
/* const handleDelete = (value) => {
  // const index = data.findIndex((item) => item.id == value);
  //findINdex la 1 ham mac dinh de tim index, bat buoc phai co pararam
  //data.splice(index, 1); 
  const dataFilter = data.filter((item) => item.id != value);
  data = dataFilter;
  renderToTable();
}; */
const handleDelete = async (id) => {
  try {
    await axios.delete(baseUrl + '/' + id);
    renderToTable();
  } catch (error) {
    console.log(error);
  }
};

const handleUpdate = async (value) => {
  //const index = data.findIndex((item) => item.id == value);
  //destructuring: boc tach du lieu
  try {
    const res = await axios.get(baseUrl + '/' + value);
    const { id, name, img } = res.data;
    getId('nameModalUpdate').value = name;
    getId('imgModalUpdate').value = img;
    //setattribute: dung de luu tru
    getId('submitUpdateModal').setAttribute('dataid', id); //id = line 128/ co the doi la name hoac img;
  } catch (error) {
    console.log(error);
  }
  //closure: ham trong ham, callback
  getId('submitUpdateModal').addEventListener('click', async () => {
    try {
      const valueId = getId('submitUpdateModal').getAttribute('dataId');
      const newData = {
        name: getId('nameModalUpdate').value,
        img: getId('imgModalUpdate').value,
      };
      await axios.put(`${baseUrl}/${valueId}`, newData);
      // data[index] = newData;
      getId('closeUpdateModal').click();
      renderToTable();
    } catch (error) {
      console.log(error);
    }
  });
};
