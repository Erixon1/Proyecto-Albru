package org.example.backend.entity;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;


@Entity
@Table(name = "authorities", schema = "albru")
public class Authority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToMany(mappedBy = "authority")
    @JsonManagedReference
    private Set<User> users = new LinkedHashSet<>();

    @Column(name = "authority", length = 50)
    private String authority;

    public Integer getId() {
        return id;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    public Set<User> getUsers() {
        return users;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }
}