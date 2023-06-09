package ru.kata.springrestapi.services;


import ru.kata.springrestapi.models.Role;

import java.util.List;

public interface RoleService {

    public List<Role> getAllRoles();

    Role getById(long id);
}
