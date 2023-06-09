fetch('http://localhost:8080/api/auth')
    .then(res => res.json())
    .then(data => {
        document.querySelector('.username-head').innerHTML = `
                <strong><a class="nav-link disabled"
                           style="color: #FFFFFF; font-size: 20px; margin: 2px; padding: 2px;">
                        ${data.username}
                </a></strong>
        `;
        document.querySelector('.roles-head').innerHTML = `
            <a class="nav-link disabled"
               style="color: #FFFFFF; font-size: 20px; margin: 2px; padding: 2px;">
                    ${data.roles.map(role => role.roleName.substring(5))}
            </a>
       `;
        if (data.roles.length === 1 && data.roles[0].roleName === 'ROLE_USER') {
            document.querySelector('.sidebar-block').innerHTML = `
                <a class="nav-link disabled" style="height: 20px"></a>
                <a class="nav-link disabled" id="user-board">User</a>
            `;
        } else {
            document.querySelector('.sidebar-block').innerHTML = `
                <a class="nav-link disabled" style="height: 20px"></a>
                <a class="nav-link active" href="/admin" id="admin-board">Admin</a>
                <a class="nav-link disabled" id="user-board">User</a>
            `;
        }
        fetch('http://localhost:8080/api/admin/' + data.id)
            .then(user => user.json())
            .then(user => {
                document.getElementById('table-user').innerHTML = `
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.firstName}</td>
                            <td>${user.lastName}</td>
                            <td>${user.age}</td>
                            <td>${user.username}</td>
                            <td>
                                <div style="display: inline-block;">
                                    <txt>${user.roles.map(role => role.roleName.substring(5))}</txt>
                                </div>
                            </td>
                        </tr>
                `;
            })
    });