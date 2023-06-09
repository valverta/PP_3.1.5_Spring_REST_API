package ru.kata.springrestapi.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import ru.kata.springrestapi.DTO.UserDTO;
import ru.kata.springrestapi.models.User;
import ru.kata.springrestapi.services.UserService;
import ru.kata.springrestapi.utils.UserNotCreatedException;
import ru.kata.springrestapi.utils.UserValidator;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/admin")
public class Controller {

    private final UserService userService;
    private final UserValidator validator;

    @Autowired
    public Controller(UserService userService, UserValidator validator) {
        this.userService = userService;
        this.validator = validator;
    }

    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers().stream()
                .map(user -> userService.convertToUserDTO(user))
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public UserDTO getUser(@PathVariable("id") Long id) {
        return userService.convertToUserDTO(userService.getUserById(id));
    }

    @PostMapping
    public ResponseEntity<HttpStatus> createUser(@RequestBody @Valid UserDTO userDTO,
                                                 BindingResult bindingResult) {
        validator.validate(userService.convertToUser(userDTO), bindingResult);

        if (bindingResult.hasErrors()) {
            StringBuilder errorMsg = new StringBuilder();
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();

            for (int i = 0; i < fieldErrors.size(); i++) {
                errorMsg.append(fieldErrors.get(i).getField())
                        .append(" - ").append(fieldErrors.get(i).getDefaultMessage());
                if (i != (fieldErrors.size() - 1))
                    errorMsg.append("; ");
            }
            throw new UserNotCreatedException(errorMsg.toString());
        }
        userDTO.setPassword(new BCryptPasswordEncoder().encode(userDTO.getPassword()));
        userService.save(userService.convertToUser(userDTO));
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PatchMapping
    public ResponseEntity<HttpStatus> updateUser(@RequestBody @Valid UserDTO userDTO,
                                                 BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            StringBuilder errorMsg = new StringBuilder();
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();

            for (int i = 0; i < fieldErrors.size(); i++) {
                errorMsg.append(fieldErrors.get(i).getField())
                        .append(" - ").append(fieldErrors.get(i).getDefaultMessage());
                if (i != (fieldErrors.size() - 1))
                    errorMsg.append("; ");
            }
            throw new UserNotCreatedException(errorMsg.toString());
        }
        String pass = userDTO.getPassword();
        if (pass.length() < 30 && !pass.startsWith("$"))
            userDTO.setPassword(new BCryptPasswordEncoder().encode(pass));
        userService.update(userService.convertToUser(userDTO));
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") Long id) {
        userService.removeById(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
