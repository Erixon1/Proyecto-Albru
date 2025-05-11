package org.example.backend.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class CustomUserDetails implements UserDetails {

    private String username;
    private String password;
    private boolean enabled;
    private Collection<? extends GrantedAuthority> authorities;

    private String fullName;

    public CustomUserDetails(String username, String password, boolean enabled,
                                Collection<? extends GrantedAuthority> authorities,
                                    String fullName) {
                                            this.username = username;
                                            this.password = password;
                                            this.enabled = enabled;
                                            this.authorities = authorities;
                                            this.fullName = fullName;
                                        }

    public String getFullName() {
        return fullName;
    }

    @Override public Collection<? extends GrantedAuthority> getAuthorities() { return authorities; }
    @Override public String getPassword() { return password; }
    @Override public String getUsername() { return username; }
    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return enabled; }
}
