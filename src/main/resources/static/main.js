// window.addEventListener("DOMContentLoaded", req)
// function req () {
//     getResource('http://localhost:8080/admin/')
//         .then(data => console.log(data))
//         .catch(err => console.error(err));
// }
// async function getResource(url) {
//     const res = await fetch(`${url}`);
//     if (!res.ok) {
//         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
//     }
//     return await res.json();
// }

const shapka = document.querySelector('.shapka');
let output = '';

fetch('http://localhost:8080/api/auth')
    .then(data => data.json())
    .then(data => {
        output += `
           <li class="nav-item">
                <strong><a class="nav-link disabled"
                           style="color: #FFFFFF; font-size: 20px; margin: 2px; padding: 2px;">
                        ${data.username}
                </a></strong>
            </li>
            <li class="nav-item">
                <a class="nav-link disabled"
                   style="color: #FFFFFF; font-size: 20px; margin: 2px; padding: 2px;">with roles:</a>
            </li>
            <li class="nav-item">
                <a class="nav-link disabled"
                   style="color: #FFFFFF; font-size: 20px; margin: 2px; padding: 2px;">
                        ${data.roles.map(role => role.roleName.substring(5))}
                </a>
            </li>
           `;
        shapka.innerHTML = output;
        const pageBlock = document.querySelector('.page-block');

        if (data.roles.length > 1) {
            fetch('http://localhost:8080/api/admin/')
                .then(res => res.json())
                .then(res => {
                    document.getElementById('sidebar').innerHTML = `
                                <div class="col-12 col-md-3 col-xl-2 bd-sidebar sidebar-block"
                                style="background-color: #FFFFFF; width: 100%; height: 100vh; padding-right: 0px;">
                                    <a class="nav-link disabled" style="height: 20px"></a>
                                    <a class="nav-link disabled" id="admin-board"
                                    style="color: #FFFFFF; background-color: #007BFF; border-radius: 3px;">
                                        Admin
                                    </a>
                                    <a class="nav-link active" href="/user/" id="user-board"
                                    style="color: #007BFF; background-color: #FFFFFF; border-radius: 3px;">
                                        User
                                    </a>
                                </div>
                    `;
                    document.getElementById('h1-div').innerHTML = `
                                <h1 style="padding-bottom: 10px">Admin panel</h1>
                                <ul className="nav nav-tabs">
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">Users table</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/registration">New User</a>
                                    </li>
                                </ul>
                    `;
                    document.getElementById('h5-div').innerHTML = `
                                <h5 className="card-header">All users</h5>
                    `;
                    document.getElementById('table-thead').innerHTML = `
                                <tr>
                                    <th>Id</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Age</th>
                                    <th>Email</th>
                                    <th>Roles</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                    `;

                    // res.forEach(tab => {
                    //     output = `
                    //             <tr>
                    //                 <td>${tab.id}</td>
                    //                 <td>${tab.firstName}</td>
                    //                 <td>${tab.lastName}</td>
                    //                 <td>${tab.age}</td>
                    //                 <td>${tab.username}</td>
                    //                 <td>
                    //                     <div style="display: inline-block;">
                    //                         <txt>${tab.roles.map(role => role.roleName.substring(5))}</txt>
                    //                     </div>
                    //                 </td>
                    //                 <td>
                    //                     <button type="button" className="btn btn-info btn-sm" data-toggle="modal"
                    //                             th:data-target="#exampleModal">
                    //                         Edit
                    //                     </button>
                    //                 </td>
                    //                 <td>
                    //                     <button type="button" class="btn btn-danger btn-sm" data-toggle="modal"
                    //                             th:data-target="#exampleModal2">
                    //                         Delete
                    //                     </button>
                    //                 </td>
                    //             </tr>
                    //     `;
                    // });
                    // document.getElementById('table-tbody').innerHTML = output;
                });
        } else {
            fetch('http://localhost:8080/api/admin/' + data.id)
                .then(res => res.json())
                .then(res => {

                    output = `
                        <div class="col-12 col-md-3 col-xl-2 bd-sidebar sidebar-block">
                        <a class="nav-link disabled" style="height: 20px"></a>
            <!--            <a class="nav-link active" href="/admin/" id="admin-board" sec:authorize="hasRole('ADMIN')">Admin</a>-->
                        <a class="nav-link disabled"
                        style="color: #FFFFFF; background-color: #007BFF; border-radius: 3px;">User</a>
                        </div>
                
                        <main class="col-12 col-md-9 py-md-3 pl-md-5 bd-content" role="main">
                            <h1 style="padding-bottom: 10px">User information-page</h1>
                
                            <div class="card">
                                <h5 class="card-header">About user</h5>
                                <div class="card-body w-100">
                                    <table class="table table-striped">
                                        <!--                    <thead class="thead-inverse">-->
                                        <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Age</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>${res.id}</td>
                                            <td>${res.firstName}</td>
                                            <td>${res.lastName}</td>
                                            <td>${res.age}</td>
                                            <td>${res.username}</td>
                                            <td>
                                                <div style="display: inline-block;">
                                                    <txt>${res.roles.map(role => role.roleName.substring(5))}</txt>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </main>
                    `;
                    pageBlock.innerHTML = output;
                });
        }
    });