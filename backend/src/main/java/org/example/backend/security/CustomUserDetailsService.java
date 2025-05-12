package org.example.backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;

import java.util.List;

public class CustomUserDetailsService implements UserDetailsService {

        @Autowired
        private JdbcTemplate jdbcTemplate;

        @Override
        public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

                // Consulta al usuario
                String userQuery = "SELECT dni, password, enabled, nombres, apellidos FROM user WHERE dni = ?";
                var userRow = jdbcTemplate.queryForObject(userQuery, (rs, rowNum) -> new Object[] {
                                rs.getString("dni"),
                                rs.getString("password"),
                                rs.getBoolean("enabled"),
                                rs.getString("nombres"),
                                rs.getString("apellidos")
                }, username);

                String fullName = userRow[3] + " " + userRow[4];

                // Consulta a roles
                String rolesQuery = "SELECT a.authority FROM authorities a INNER JOIN user u ON u.authority_id = a.id WHERE u.dni = ?";
                List<GrantedAuthority> authorities = jdbcTemplate.query(rolesQuery,
                                (rs, rowNum) -> new SimpleGrantedAuthority(rs.getString("authority")), username);

                return new CustomUserDetails(
                                (String) userRow[0],
                                (String) userRow[1],
                                (Boolean) userRow[2],
                                authorities,
                                fullName);
        }
}
