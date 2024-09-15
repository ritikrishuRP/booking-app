function handleFormSubmit(event){
    event.preventDefault()
    const name=event.target.name.value;
    const email=event.target.email.value;
    const phonenumber=event.target.phonenumber.value;
    const obj={
      name,
      email,
      phonenumber
    }
  
    //store data into crud crud data base using network call and axios
    //post request and store data
    axios.post('http://localhost:3000/user/add-users',obj)
    .then((response) => {
        console.log(response.data)
        showNewUser(response.data.newUserDetail)
      //console.log(response)
    }).catch((error) => {
      document.body.innerHTML = document.body.innerHTML + '<h4>Something Went Wrong</h4>'
      console.log(error)
    });
  
  
    //localStorage.setItem('userDetails',JSON.stringify(obj));
    //showNewUser(obj)
  }
  
  window.addEventListener('DOMContentLoaded',()=>{
  
    //get the data from crud crud or server storage and show it in screen and then after refresh data not go 
    axios.get('http://localhost:3000/user/get-users')
    .then((response)=>{
      console.log(response)
      for (let i = 0; i< response.data.allUsers.length;i++) {
        showNewUser(response.data.allUsers[i])
      }
    }).catch((error)=>{
      console.log(error)
    })
  
 
  
  })
  
  
  function showNewUser(user){
    document.getElementById('email').value=''
    document.getElementById('name').value=''
    // if(localStorage.getItem(user.email)!==null){
    //   removeUserFromScreen(user.email)
    // }
  
    // we change user.email to user._id becouse to get oerfect delete id
    const parentNode = document.getElementById('listOfItems')
    const childNode = `<li id=${user.id}> ${user.name}-${user.email}
                      <button onclick=deleteUser('${user.id}')> Delete User </button>
                      <button onclick=editUserdetails('${user.email}','${user.name}','${user.phonenumber}','${user.id}')> Edit User </button>
                      </li>`
    parentNode.innerHTML = parentNode.innerHTML + childNode
  }
  
  
  function editUserdetails(email,name,phonenumber,userId){
    document.getElementById('email').value = email
    document.getElementById('name').value = name
    document.getElementById('phonenumber').value = phonenumber
    deleteUser(userId)
    //console.log(userId)
  }
  
  
  function deleteUser(userId){
    // userId = 1;
    axios.delete(`http://localhost:3000/user/delete-user/${userId}`)
    .then((response)=>{
      removeUserFromScreen(userId)
    }).catch((error)=>{
      console.log(error)
    })
  
  
    // console.log(email)
    // localStorage.removeItem(email)
    // removeUserFromScreen(email)
  }
  
  
  function removeUserFromScreen(userId){
    const parentNode=document.getElementById('listOfItems')
    const childNodeToRemoved=document.getElementById(userId)
    if(childNodeToRemoved){
      parentNode.removeChild(childNodeToRemoved)
    }
  }
  
  
  // function showNewUser(obj){
  //   const parentElem=document.getElementById('listOfItems')
  //   const childElem=document.createElement('li')
  //   childElem.textContent=obj.name+'-'+obj.email+'-'+obj.phone
  //   const deleteButton=document.createElement('input')
  //   deleteButton.type="button"
  //   deleteButton.value='Delete'
  //   deleteButton.onclick=()=>{
  //     localStorage.removeItem(obj.email)
  //     parentElem.removeChild(childElem)
  //   }
  
  // const editButton=document.createElement('input')
  //   editButton.type="button"
  //   editButton.value='Edit'
  //  editButton.onclick=()=>{
  //     localStorage.removeItem(obj.email)
  //     parentElem.removeChild(childElem)
  //    document.getElementById('username').value=obj.name
  //    document.getElementById('email').value=obj.email
  //    document.getElementById('phone').value=obj.phone
  //   }
  //   childElem.appendChild(deleteButton)
  //   childElem.appendChild(editButton)
  //   parentElem.appendChild(childElem)
  // }