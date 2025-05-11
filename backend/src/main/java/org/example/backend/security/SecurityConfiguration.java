package org.example.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
public class SecurityConfiguration {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.
                authorizeHttpRequests(
                auth -> auth
                        .requestMatchers("/css/**", "/images/**", "/").permitAll()
                        .anyRequest().authenticated()
        )
        .formLogin(form -> form
                        .loginPage("/login")
                        .permitAll()
                        .defaultSuccessUrl("/user/", true)
                        .failureUrl("/login?error=true")
        )
        .exceptionHandling(handling -> handling.accessDeniedPage("/access-denied"));
        return http.build();
    }


    @Bean
public UserDetailsService userDetailsService() {
    return new CustomUserDetailsService();
}


    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

}
