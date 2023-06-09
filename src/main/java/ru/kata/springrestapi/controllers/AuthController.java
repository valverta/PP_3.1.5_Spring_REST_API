package ru.kata.springrestapi.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.springrestapi.DTO.UserDTO;
import ru.kata.springrestapi.models.User;
import ru.kata.springrestapi.services.UserService;

import java.security.Principal;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final ModelMapper modelMapper;
    private final UserService userService;

    @Autowired
    public AuthController(ModelMapper modelMapper, UserService userService) {
        this.modelMapper = modelMapper;
        this.userService = userService;
    }

    @GetMapping("/auth")
    public UserDTO getAuth(Principal principal) {
        UserDTO userDTO = convertToUserDTO(userService.findByUsername(principal.getName()).get());
        return userDTO;
    }

    private UserDTO convertToUserDTO(User user) {
        return modelMapper.map(user, UserDTO.class);
    }
}
