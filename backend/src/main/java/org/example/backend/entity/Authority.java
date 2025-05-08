package org.example.backend.entity;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;


@Entity
@Table(name = "authorities")
public class Authority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToMany(mappedBy = "authority")
    private Set<User> users;

    private String authority;

    public String getAuthority() {
        return authority;
    }

}