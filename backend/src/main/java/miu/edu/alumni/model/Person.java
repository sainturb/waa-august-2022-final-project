package miu.edu.alumni.model;

import lombok.Data;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Data
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "person_type", discriminatorType = DiscriminatorType.STRING)
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(unique = true)
    private String email;
    private String firstName;
    private String lastname;
    @Column(unique = true)
    private String userId;
    private Boolean is_deleted = false;
    private Instant LastLoggedInAt;

    private String address;
    private String state;
    private String city;
    private String zipCode;
}
