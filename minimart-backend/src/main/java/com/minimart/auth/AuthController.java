package com.minimart.auth;

import com.minimart.entity.User;
import com.minimart.repository.UserRepository;
import com.minimart.security.JwtService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;


    // =========================
    // REGISTER
    // =========================

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request) {

        // Check username
        if (request.getUsername() == null ||
                request.getUsername().trim().isEmpty()) {

            return ResponseEntity.badRequest()
                    .body(Map.of(
                            "message",
                            "Username is required"
                    ));
        }

        // Check email
        if (request.getEmail() == null ||
                request.getEmail().trim().isEmpty()) {

            return ResponseEntity.badRequest()
                    .body(Map.of(
                            "message",
                            "Email is required"
                    ));
        }

        // Check password
        if (request.getPassword() == null ||
                request.getPassword().isEmpty()) {

            return ResponseEntity.badRequest()
                    .body(Map.of(
                            "message",
                            "Password is required"
                    ));
        }

        // Check username already exists
        if (userRepository.existsByUsername(
                request.getUsername().trim())) {

            return ResponseEntity.status(409)
                    .body(Map.of(
                            "message",
                            "Username already exists"
                    ));
        }

        // Check email already exists
        if (userRepository.existsByEmail(
                request.getEmail().trim())) {

            return ResponseEntity.status(409)
                    .body(Map.of(
                            "message",
                            "Email already registered"
                    ));
        }

        // Create user
        User user = new User();

        user.setUsername(
                request.getUsername().trim()
        );

        user.setEmail(
                request.getEmail().trim()
        );

        // NEVER save plain password
        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        // Default role
        user.setRole("USER");

        userRepository.save(user);

        return ResponseEntity.status(201)
                .body(Map.of(
                        "message",
                        "Registration successful"
                ));
    }


    // =========================
    // LOGIN
    // =========================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request) {

        User user = userRepository
                .findByUsername(request.getUsername())
                .orElse(null);

        if (user == null) {

            return ResponseEntity.status(401)
                    .body(Map.of(
                            "message",
                            "User is not registered"
                    ));
        }

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            return ResponseEntity.status(401)
                    .body(Map.of(
                            "message",
                            "Invalid password"
                    ));
        }

        String token =
                jwtService.generateToken(
                        user.getUsername()
                );

        return ResponseEntity.ok(
                new AuthResponse(
                        token,
                        user.getUsername(),
                        user.getRole(),
                        user.getEmail()
                )
        );
    }
}