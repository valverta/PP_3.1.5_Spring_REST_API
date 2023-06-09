package ru.kata.springrestapi.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.springrestapi.DTO.UserDTO;
import ru.kata.springrestapi.models.User;
import ru.kata.springrestapi.repositories.UserRepository;
import ru.kata.springrestapi.utils.UserNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserDetailsService, UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Transactional
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User not found!");
        }
        return user.get();
//        return new org.springframework.security.core.userdetails.User(user.get().getUsername(), user.get().getPassword(), user.get().getAuthorities());
    }

    @Transactional(readOnly = true)
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Transactional
    public void save(User user) {
        userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Transactional
    public User getUserById(long id) {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(String.format("User with id=%d wasn`t found!", id)));
    }

    @Transactional
    public void update(User user) {
        userRepository.save(user);
    }

    @Transactional
    public void removeById(long id) {
        userRepository.delete(getUserById(id));
    }

    public User convertToUser(UserDTO userDTO) {
        return modelMapper.map(userDTO, User.class);
    }

    public UserDTO convertToUserDTO(User user) {
        return modelMapper.map(user, UserDTO.class);
    }
}
