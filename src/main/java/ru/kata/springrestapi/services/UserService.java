package ru.kata.springrestapi.services;


import ru.kata.springrestapi.DTO.UserDTO;
import ru.kata.springrestapi.models.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    public Optional<User> findByUsername(String username);

    public void save(User user);

    public List<User> getAllUsers();

    public User getUserById(long id);

    public void update(User user);

    public void removeById(long id);

    public User convertToUser(UserDTO userDTO);

    public UserDTO convertToUserDTO(User user);
}
