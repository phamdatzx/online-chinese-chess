package com.pixelwave.spring_boot.controller;

import com.pixelwave.spring_boot.DTO.auth.LoginRequest;
import com.pixelwave.spring_boot.DTO.auth.LoginResponse;
import com.pixelwave.spring_boot.DTO.auth.RefreshTokenDTO;
import com.pixelwave.spring_boot.DTO.auth.RegisterRequest;
import com.pixelwave.spring_boot.service.AuthenticationService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthenticateController {

  private final AuthenticationService service;

    @Value("${refresh-token-expiry-time}")
    private Integer refreshTokenExpiryTime ;


  @PostMapping("/register")
  public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest registerRequest) {
    service.register(registerRequest);
    return ResponseEntity.ok("User registered successfully");
  }

  @RequestMapping("activate/{token}")
  public ResponseEntity<String> activateEmail(@PathVariable String token) {
      service.activeAccount(token);
      return ResponseEntity.ok("Account activated successfully");
  }

  @PostMapping("/login")
  public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
      var loginResponse = service.login(loginRequest);
      String refreshToken = loginResponse.getRefreshToken();

      Cookie refreshCookie = new Cookie("refreshToken", refreshToken);
      refreshCookie.setHttpOnly(true);
      refreshCookie.setSecure(true);
      refreshCookie.setPath("/auth/refresh-token"); // restrict refresh token to refresh endpoint
      refreshCookie.setMaxAge(refreshTokenExpiryTime);

      response.addCookie(refreshCookie);
      loginResponse.setRefreshToken(null);
      return ResponseEntity.ok(loginResponse);
  }

  @PostMapping("/refresh-token")
  public ResponseEntity<LoginResponse> refreshToken(@RequestBody RefreshTokenDTO refreshTokenDTO) {
      return ResponseEntity.ok(service.refreshToken(refreshTokenDTO.getRefreshToken()));
  }

  @GetMapping("/social-login")
  public ResponseEntity<String> socialLogin(@RequestParam String provider) {
    provider = provider.toLowerCase();
    String redirectUrl = service.generateSocialLoginUrl(provider);
    return ResponseEntity.status(HttpStatus.FOUND).location(URI.create(redirectUrl)).build();
  }

  @GetMapping("/social-login/callback")
  public ResponseEntity<LoginResponse> socialLoginCallback(@RequestParam String provider, @RequestParam String code) {
        provider = provider.toLowerCase();
        // using code from callback to authenticate and fetch user profile
        Map<String,Object> result = service.authenticateAndFetchProfile(provider, code);
        // check if user already exists in the database, and create a new user if not
        service.registerSocialUser(result);
        // generate access and refresh token for the user
        return ResponseEntity.ok(service.socialLogin(new LoginRequest(result.get("email").toString(),null, result.get("name").toString())));
  }
}
