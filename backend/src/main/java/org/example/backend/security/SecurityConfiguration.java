package org.example.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import javax.sql.DataSource;
import java.net.http.HttpRequest;
import java.security.SecurityPermission;

@Configuration
public class SecurityConfiguration {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.
                authorizeHttpRequests(
                        auth->auth
                                .requestMatchers("/css/**","/images/**","/").permitAll()
                                .anyRequest().authenticated()
                )
                .formLogin(form->form
                        .loginPage("/login")
                        .permitAll()
                        .defaultSuccessUrl("/user/",true)

                );
        return http.build();
    }


    @Bean
    public UserDetailsManager userDetailsManager(DataSource dataSource) {
        JdbcUserDetailsManager jdbcUserDetailsManager = new JdbcUserDetailsManager(dataSource);

        jdbcUserDetailsManager.setUsersByUsernameQuery(
                "SELECT dni AS username, password, enabled FROM user WHERE dni=?");

        jdbcUserDetailsManager.setAuthoritiesByUsernameQuery(
                "SELECT user.dni AS username, authorities.authority " +
                        "FROM user INNER JOIN authorities ON user.authority_id = authorities.id " +
                        "WHERE user.dni = ?");

        return jdbcUserDetailsManager;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

}
