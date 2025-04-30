package org.example.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "authorities", schema = "albru")
public class Authority {
    @Id
    @Column(name = "dni", nullable = false, length = 8)
    private String dni;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "dni", nullable = false)
    private User user;

    @Column(name = "authority", length = 50)
    private String authority;

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

}