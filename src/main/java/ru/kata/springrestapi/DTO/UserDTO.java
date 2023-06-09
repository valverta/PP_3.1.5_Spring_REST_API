package ru.kata.springrestapi.DTO;

import ru.kata.springrestapi.models.Role;

import javax.validation.constraints.*;
import java.util.List;

public class UserDTO {
    private long id;
    @NotEmpty(message = "Имя не должно быть пустым")
    @Size(min = 2, max = 20, message = "Имя должно быть от 2 до 20 символов длинной")
    @Pattern(regexp = "[A-Za-zА-Яа-яЁё]+", message = "Имя должно состоять только из букв английского или русского алфавита")
    private String firstName;

    @NotEmpty(message = "Фамилия не должна быть пустой")
    @Size(min = 2, max = 30, message = "Фамилия должна быть от 2 до 30 символов длинной")
    @Pattern(regexp = "[A-Za-zА-Яа-яЁё]+", message = "Фамилия должна состоять только из букв английского или русского алфавита")
    private String lastName;

    @Min(value = 0, message = "Возраст не должен быть меньше 0")
    @Max(value = 122, message = "Возраст не должен быть больше 122")
    private byte age;

    @Email
    @NotEmpty(message = "Email не должен быть пустым")
    private String username;

    @NotEmpty(message = "Пароль не должен быть пустым")
    private String password;

    private List<Role> roles;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public byte getAge() {
        return age;
    }

    public void setAge(byte age) {
        this.age = age;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }
}
