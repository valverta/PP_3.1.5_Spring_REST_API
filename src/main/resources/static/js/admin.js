const authUrl = 'http://localhost:8080/api/auth';
const apiAdmUrl = 'http://localhost:8080/api/admin/';

fetch(authUrl)
    .then(res => res.json())
    .then(data => {
        document.querySelector('.username-head').innerHTML = `
                <strong><a class="nav-link disabled"
                           style="color: #FFFFFF; font-size: 20px; margin: 2px; padding: 2px;">
                        ${data.username}
                </a></strong>
        `;
        let rolesInHeader = `<a class="nav-link disabled" style="color: #FFFFFF; font-size: 20px; margin: 2px; padding: 2px;">`;
        data.roles.forEach(role => {
            rolesInHeader += `${role.roleName.substring(5)} `;
        });
        rolesInHeader += `</a>`;
        document.querySelector('.roles-head').innerHTML = rolesInHeader;
    });

const tableTr = document.getElementById('table-admin')
let output = '';
fetch(apiAdmUrl)
    .then(res => res.json())
    .then(data => {
        data.forEach(tab => {
            output += `
                    <tr>
                        <td>${tab.id}</td>
                        <td>${tab.firstName}</td>
                        <td>${tab.lastName}</td>
                        <td>${tab.age}</td>
                        <td>${tab.username}</td>
                        <td>
                            <div style="display: inline-block;">
                                <txt>`;
            tab.roles.forEach(role => {
                output += `${role.roleName.substring(5)} `;
            })
            output += `</txt>
                            </div>
                        </td>
                        <td>
                            <button type="button" class="btn btn-info btn-sm" data-id="${tab.id}" data-bs-toggle="modal"
                                    th:data-target="#exampleModal" id="edit-btn">
                                Edit
                            </button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-danger btn-sm" data-id="${tab.id}" data-bs-toggle="modal"
                                    id="delete-btn">
                                Delete
                            </button>
                        </td>
                    </tr>`;
        });
        tableTr.innerHTML = output;
    });

tableTr.addEventListener("click", (e) => {
    const id = e.target.dataset.id;

    if (e.target.id === 'delete-btn') {
        fetch(apiAdmUrl + id)
            .then(data => data.json())
            .then(data => {
                $("#disabledHide").attr('value', data.id);
                $("#disabledFirstName").attr('value', data.firstName);
                $("#disabledLastName").attr('value', data.lastName);
                $("#disabledAge").attr('value', data.age);
                $("#disabledEmail").attr('value', data.username);
                let option = '';
                data.roles.forEach(role => {
                    option += `
                        <option>${role.roleName.substring(5)}
                        </option>
                    `;
                });
                document.getElementById('disabledRoles').innerHTML = option;

                $('#exampleModal2').modal();
            });
        const deleteButton = document.getElementById('deleteButton');
        deleteButton.addEventListener('click', (e) => {
            e.preventDefault();
            fetch(apiAdmUrl + id, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(() => location.reload());
        })
    } else if (e.target.id === 'edit-btn') {
        // let userBtnPressed;
        // let adminBtnPressed;
        let formEdit = document.forms['form-edit-modal'];

        fetch(apiAdmUrl + id)
            .then(data => data.json())
            .then(data => {
                $("#disabledId").attr('value', data.id);
                $("#first_name").attr('value', data.firstName);
                $("#last_name").attr('value', data.lastName);
                $("#age").attr('value', data.age);
                $("#email").attr('value', data.username);
                $("#password").attr('value', data.password);

                $('#exampleModal').modal();

                // document.getElementById('roles').addEventListener("click", (click) => {
                //     userBtnPressed = click.target.id === 'roles-option1';
                //     adminBtnPressed = click.target.id === 'roles-option2';
                // })
            });
        document.getElementById('edit-submit').addEventListener('click', (submit) => {
           submit.preventDefault();
            let rolesArray = [];

            for (let i = 0; i < formEdit.roles.options.length; i++) {
                if (formEdit.roles.options[i].selected) {
                    rolesArray.push({
                        id: formEdit.roles.options[i].value,
                        roleName: 'ROLE_' + formEdit.roles.options[i].text,
                    });
                }
            }
           // let roleId;
           // let roleName;
           // if (userBtnPressed) {
           //     roleId = 1;
           //     roleName = 'ROLE_USER';
           // } else if (adminBtnPressed) {
           //     roleId = 2;
           //     roleName = 'ROLE_ADMIN';
           // }
           fetch(apiAdmUrl, {
               method: 'PATCH',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                   id: document.getElementById('disabledId').value,
                   firstName: document.getElementById('first_name').value,
                   lastName: document.getElementById('last_name').value,
                   age: document.getElementById('age').value,
                   username: document.getElementById('email').value,
                   password: document.getElementById('password').value,
                   roles: rolesArray,
               })
           })
               .then(edit => edit.json())
               .then(() => location.reload())
        });
    }
});

let formAdd = document.forms['form-add-new'];

document.getElementById('add-new-user').addEventListener('click', (event) => {
    event.preventDefault();
    let rolesArray = [];

    for (let i = 0; i < formAdd.roles1.options.length; i++) {
        if (formAdd.roles1.options[i].selected) {
            rolesArray.push({
                id: formAdd.roles1.options[i].value,
                roleName: 'ROLE_' + formAdd.roles1.options[i].text,
            });
        }
    }
    fetch(apiAdmUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: document.getElementById('first_name1').value,
            lastName: document.getElementById('last_name1').value,
            age: document.getElementById('age1').value,
            username: document.getElementById('Email1').value,
            password: document.getElementById('Password1').value,
            roles: rolesArray,
        })
    }).then(newUser => newUser.json())
        .then(() => location.reload());
});